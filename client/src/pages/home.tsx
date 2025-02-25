import React, { useState } from "react";
import { PhotoBoothCamera } from "@/components/photo-booth/camera";
import { Countdown } from "@/components/photo-booth/countdown";
import { ColorPicker } from "@/components/photo-booth/color-picker";
import { PhotoStrip } from "@/components/photo-booth/photo-strip";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [photos, setPhotos] = useState<string[]>([]);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [stripName, setStripName] = useState("");
  const [showDate, setShowDate] = useState(true);
  const [showName, setShowName] = useState(true);
  const [nameColor, setNameColor] = useState("#000000");
  const [dateColor, setDateColor] = useState("#666666");
  const [layout, setLayout] = useState<"strip" | "collage">("strip");
  const { toast } = useToast();

  const handleCapture = (photo: string) => {
    setPhotos((prev) => [...prev, photo]);
    setIsCountingDown(false);

    // Start next photo capture if not reached maximum
    if (photos.length < 3) { // Check for 3 since the new photo hasn't been added to state yet
      setTimeout(() => {
        setIsCountingDown(true);
      }, 1000); // Wait 1 second before starting next countdown
    } else {
      toast({
        title: "Photo strip complete!",
        description: "You can now customize your strip with frames and stickers.",
      });
    }
  };

  const handleStartPhotoSequence = () => {
    if (photos.length >= 4) {
      toast({
        title: "Maximum photos reached",
        description: "Please clear the strip to take more photos.",
        variant: "destructive",
      });
      return;
    }
    setPhotos([]); // Clear existing photos
    setIsCountingDown(true); // Start the countdown for first photo
  };

  const handleClear = () => {
    setPhotos([]);
  };


  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-pink-500 to-violet-500 text-transparent bg-clip-text">
        Fun Photo Booth
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6 bg-white rounded-lg shadow-sm p-6">
          <div className="relative">
            <PhotoBoothCamera
              onCapture={handleCapture}
              isCountingDown={isCountingDown}
            />
            <Countdown
              isActive={isCountingDown}
              onComplete={handleCapture}
            />
          </div>

          <div className="flex justify-between items-center">
            <Button 
              onClick={handleStartPhotoSequence} 
              disabled={isCountingDown}
            >
              {photos.length === 0 ? "Start Photo Sequence" : `Photos: ${photos.length}/4`}
            </Button>
            <Button
              variant="destructive"
              onClick={handleClear}
              disabled={photos.length === 0}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Clear Strip
            </Button>
          </div>

          <div className="space-y-4 bg-gray-50 rounded-lg p-6">
            <h2 className="text-lg font-semibold">Customize Your Strip</h2>

            <div className="flex flex-col gap-4 p-4">
              <div className="flex items-center gap-2">
                <label htmlFor="layout" className="text-gray-700">Layout:</label>
                <select
                  id="layout"
                  value={layout}
                  onChange={(e) => setLayout(e.target.value as "strip" | "collage")}
                  className="border border-gray-300 rounded px-2 py-1"
                >
                  <option value="strip">Strip</option>
                  <option value="collage">Collage</option>
                </select>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="showDate"
                    checked={showDate}
                    onChange={(e) => setShowDate(e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <label htmlFor="showDate" className="text-gray-700">Show Date</label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="showName"
                    checked={showName}
                    onChange={(e) => setShowName(e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <label htmlFor="showName" className="text-gray-700">Show Name</label>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <label htmlFor="stripName" className="text-gray-700">Strip Name:</label>
                <input
                  type="text"
                  id="stripName"
                  value={stripName}
                  onChange={(e) => setStripName(e.target.value)}
                  placeholder="Enter strip name"
                  className="border border-gray-300 rounded px-2 py-1 flex-1"
                />
              </div>
            </div>

            <div className="space-y-4">
              <ColorPicker
                color={backgroundColor}
                onChange={setBackgroundColor}
                label="Strip Color"
              />
              <ColorPicker
                color={nameColor}
                onChange={setNameColor}
                label="Name Color"
              />
              <ColorPicker
                color={dateColor}
                onChange={setDateColor}
                label="Date Color"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <PhotoStrip
            photos={photos}
            layout={layout}
            name={stripName}
            showDate={showDate}
            showName={showName}
            backgroundColor={backgroundColor}
            nameColor={nameColor}
            dateColor={dateColor}
          />
        </div>
      </div>
    </div>
  );
}