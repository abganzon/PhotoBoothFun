import React, { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { stickers } from "@/lib/stickers";

interface PhotoStripProps {
  photos: string[];
  backgroundColor: string;
  stickerPositions: Array<{ id: string; x: number; y: number }>;
  onDownload?: () => void;
}

export function PhotoStrip({
  photos,
  backgroundColor,
  stickerPositions,
  onDownload,
}: PhotoStripProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw photos
    photos.forEach((photo, index) => {
      const img = new Image();
      img.src = photo;
      img.onload = () => {
        ctx.drawImage(
          img,
          0,
          index * (canvas.height / 4),
          canvas.width,
          canvas.height / 4
        );
      };
    });

    // Draw stickers
    stickerPositions.forEach((pos) => {
      const sticker = stickers.find((s) => s.id === pos.id);
      if (sticker) {
        const img = new Image();
        img.src = sticker.url;
        img.onload = () => {
          ctx.drawImage(img, pos.x, pos.y, 50, 50);
        };
      }
    });
  }, [photos, backgroundColor, stickerPositions]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = "photo-strip.png";
    link.href = canvas.toDataURL();
    link.click();

    onDownload?.();
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <canvas
        ref={canvasRef}
        width={400}
        height={1600}
        className="w-full max-w-md border rounded-lg shadow-lg"
      />
      <Button onClick={handleDownload} size="lg">
        <Download className="mr-2 h-4 w-4" />
        Download Strip
      </Button>
    </div>
  );
}
