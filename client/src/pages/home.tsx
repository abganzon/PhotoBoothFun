import React, { useState } from "react";
import { PhotoBoothCamera } from "@/components/photo-booth/camera";
import { Countdown } from "@/components/photo-booth/countdown";
import { StickerPicker } from "@/components/photo-booth/sticker-picker";
import { ColorPicker } from "@/components/photo-booth/color-picker";
import { PhotoStrip } from "@/components/photo-booth/photo-strip";
import { FramePicker } from "@/components/photo-booth/frame-picker";
import { frames, type Frame } from "@/lib/frames";
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
  const [selectedFrame, setSelectedFrame] = useState<Frame>(frames[0]);
  const [stickerPositions, setStickerPositions] = useState<
    Array<{ id: string; x: number; y: number; color?: string }>
  >([]);
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
    setStickerPositions([]); // Clear stickers
    setIsCountingDown(true); // Start the countdown for first photo
  };

  const handleClear = () => {
    setPhotos([]);
    setStickerPositions([]);
  };

  const handleAddSticker = (stickerId: string, color?: string) => {
    setStickerPositions((prev) => [
      ...prev,
      { id: stickerId, x: 100, y: 100, color },
    ]);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-pink-500 to-violet-500 text-transparent bg-clip-text">
        Fun Photo Booth
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
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

          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Customize Your Strip</h2>

            <div className="space-y-2">
              <Label htmlFor="strip-name">Strip Name</Label>
              <Input
                id="strip-name"
                value={stripName}
                onChange={(e) => setStripName(e.target.value)}
                placeholder="Enter a name for your strip"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="show-date"
                checked={showDate}
                onCheckedChange={setShowDate}
              />
              <Label htmlFor="show-date">Show Date</Label>
            </div>

            <ColorPicker
              color={backgroundColor}
              onChange={setBackgroundColor}
            />

            <FramePicker
              selectedFrame={selectedFrame}
              onSelectFrame={setSelectedFrame}
            />

            <div>
              <h3 className="text-sm font-medium mb-2">Add Stickers</h3>
              <StickerPicker onSelectSticker={handleAddSticker} />
            </div>
          </div>
        </div>

        <div>
          <PhotoStrip
            photos={photos}
            backgroundColor={backgroundColor}
            stripName={stripName}
            showDate={showDate}
            selectedFrame={selectedFrame}
            stickerPositions={stickerPositions}
          />
        </div>
      </div>
    </div>
  );
}