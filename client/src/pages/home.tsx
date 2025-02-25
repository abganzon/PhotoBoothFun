import React, { useState } from "react";
import { PhotoBoothCamera } from "@/components/photo-booth/camera";
import { Countdown } from "@/components/photo-booth/countdown";
import { StickerPicker } from "@/components/photo-booth/sticker-picker";
import { ColorPicker } from "@/components/photo-booth/color-picker";
import { PhotoStrip } from "@/components/photo-booth/photo-strip";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [photos, setPhotos] = useState<string[]>([]);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [stickerPositions, setStickerPositions] = useState<
    Array<{ id: string; x: number; y: number }>
  >([]);
  const { toast } = useToast();

  const handleCapture = (photo: string) => {
    setPhotos((prev) => [...prev, photo]);
    setIsCountingDown(false);

    if (photos.length === 3) {
      toast({
        title: "Photo strip complete!",
        description: "You can now add stickers and download your photos.",
      });
    }
  };

  const handleTakePhoto = () => {
    if (photos.length >= 4) {
      toast({
        title: "Maximum photos reached",
        description: "Please clear the strip to take more photos.",
        variant: "destructive",
      });
      return;
    }
    setIsCountingDown(true);
  };

  const handleClear = () => {
    setPhotos([]);
    setStickerPositions([]);
  };

  const handleAddSticker = (stickerId: string) => {
    setStickerPositions((prev) => [
      ...prev,
      { id: stickerId, x: 100, y: 100 },
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
              onComplete={() => handleCapture}
            />
          </div>

          <div className="flex justify-between items-center">
            <Button onClick={handleTakePhoto} disabled={photos.length >= 4}>
              Take Photo ({photos.length}/4)
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
            <ColorPicker
              color={backgroundColor}
              onChange={setBackgroundColor}
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
            stickerPositions={stickerPositions}
          />
        </div>
      </div>
    </div>
  );
}
