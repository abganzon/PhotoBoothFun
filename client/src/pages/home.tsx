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

            <div className="space-y-2">
              <Label htmlFor="strip-name">Strip Name</Label>
              <Input
                id="strip-name"
                value={stripName}
                onChange={(e) => setStripName(e.target.value)}
                placeholder="Enter a name for your strip"
                className="bg-white"
              />
            </div>

            <div className="space-y-2">
              <Label>Layout Style</Label>
              <div className="flex gap-4">
                <div 
                  className={`flex-1 p-4 border rounded-lg cursor-pointer transition-colors ${
                    layout === "strip" 
                      ? "border-primary bg-primary/10" 
                      : "border-gray-200 hover:border-primary/50"
                  }`}
                  onClick={() => setLayout("strip")}
                >
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-16 h-24 bg-gray-200 rounded"></div>
                    <span className="text-sm font-medium">Strip</span>
                    <span className="text-xs text-gray-500">1x4 Layout</span>
                  </div>
                </div>
                <div 
                  className={`flex-1 p-4 border rounded-lg cursor-pointer transition-colors ${
                    layout === "collage" 
                      ? "border-primary bg-primary/10" 
                      : "border-gray-200 hover:border-primary/50"
                  }`}
                  onClick={() => setLayout("collage")}
                >
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-20 h-20 bg-gray-200 rounded"></div>
                    <span className="text-sm font-medium">Collage</span>
                    <span className="text-xs text-gray-500">2x2 Layout</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label>Display Options</Label>
              <div className="flex flex-col gap-3 bg-white rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-medium text-sm">Show Strip Name</span>
                    <span className="text-xs text-gray-500">Display the name above your photos</span>
                  </div>
                  <Switch
                    id="show-name"
                    checked={showName}
                    onCheckedChange={setShowName}
                  />
                </div>

                <div className="h-px bg-gray-200"></div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-medium text-sm">Show Date</span>
                    <span className="text-xs text-gray-500">Include today's date</span>
                  </div>
                  <Switch
                    id="show-date"
                    checked={showDate}
                    onCheckedChange={setShowDate}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Label>Colors</Label>
              <div className="space-y-3 bg-white rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Background</span>
                  <input
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="w-10 h-10 rounded cursor-pointer"
                  />
                </div>
                <div className="h-px bg-gray-200"></div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Name Color</span>
                  <input
                    type="color"
                    value={nameColor}
                    onChange={(e) => setNameColor(e.target.value)}
                    className="w-10 h-10 rounded cursor-pointer"
                  />
                </div>
                <div className="h-px bg-gray-200"></div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Date Color</span>
                  <input
                    type="color"
                    value={dateColor}
                    onChange={(e) => setDateColor(e.target.value)}
                    className="w-10 h-10 rounded cursor-pointer"
                  />
                </div>
              </div>
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