import React, { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { stickers } from "@/lib/stickers";
import { format } from "date-fns";

interface PhotoStripProps {
  photos: string[];
  backgroundColor: string;
  stripName: string;
  showDate: boolean;
  stickerPositions: Array<{ id: string; x: number; y: number; color?: string }>;
  onDownload?: () => void;
}

export function PhotoStrip({
  photos,
  backgroundColor,
  stripName,
  showDate,
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

    const padding = 20; // Padding between photos
    const photoHeight = (canvas.height - 200 - (padding * 5)) / 4; // Reserve space for title and date

    // Draw photos
    photos.forEach((photo, index) => {
      const img = new Image();
      img.src = photo;
      img.onload = () => {
        const y = padding + index * (photoHeight + padding);
        ctx.drawImage(
          img,
          padding,
          y,
          canvas.width - (padding * 2),
          photoHeight
        );
      };
    });

    // Draw title
    ctx.font = "bold 48px Arial";
    ctx.fillStyle = "#000000";
    ctx.textAlign = "center";
    const titleY = canvas.height - 100;
    ctx.fillText(stripName || "Photo Strip", canvas.width / 2, titleY);

    // Draw date if enabled
    if (showDate) {
      ctx.font = "24px Arial";
      ctx.fillStyle = "#666666";
      const dateText = format(new Date(), "MMMM dd, yyyy");
      ctx.fillText(dateText, canvas.width / 2, titleY + 40);
    }

    // Draw stickers
    stickerPositions.forEach((pos) => {
      const sticker = stickers.find((s) => s.id === pos.id);
      if (sticker) {
        const img = new Image();
        img.src = sticker.url;
        img.onload = () => {
          ctx.save();
          if (pos.color) {
            ctx.fillStyle = pos.color;
            ctx.globalCompositeOperation = "source-in";
            ctx.fillRect(pos.x, pos.y, 50, 50);
          }
          ctx.drawImage(img, pos.x, pos.y, 50, 50);
          ctx.restore();
        };
      }
    });
  }, [photos, backgroundColor, stripName, showDate, stickerPositions]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = `${stripName || 'photo-strip'}.png`;
    link.href = canvas.toDataURL();
    link.click();

    onDownload?.();
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <canvas
        ref={canvasRef}
        width={400}
        height={1800}
        className="w-full max-w-md border rounded-lg shadow-lg"
      />
      <Button onClick={handleDownload} size="lg">
        <Download className="mr-2 h-4 w-4" />
        Download Strip
      </Button>
    </div>
  );
}