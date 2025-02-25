import React, { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { stickers } from "@/lib/stickers";
import { format } from "date-fns";
import { type Frame } from "@/lib/frames";

interface PhotoStripProps {
  photos: string[];
  backgroundColor: string;
  stripName: string;
  showDate: boolean;
  selectedFrame: Frame;
  stickerPositions: Array<{ id: string; x: number; y: number; color?: string }>;
  onDownload?: () => void;
}

export function PhotoStrip({
  photos,
  backgroundColor,
  stripName,
  showDate,
  selectedFrame,
  stickerPositions,
  onDownload,
}: PhotoStripProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Create a new canvas for photo composition
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tempCtx = tempCanvas.getContext("2d");
    if (!tempCtx) return;

    // Clear canvas and apply background
    tempCtx.fillStyle = selectedFrame.backgroundColor;
    tempCtx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw border
    const borderWidth = 10;
    tempCtx.strokeStyle = selectedFrame.borderColor;
    tempCtx.lineWidth = borderWidth;
    tempCtx.strokeRect(borderWidth/2, borderWidth/2, canvas.width - borderWidth, canvas.height - borderWidth);

    const padding = 30;
    const photoHeight = (canvas.height - 300 - (padding * 5)) / 4; // Reserve space for title, date, and decorations

    // Draw decorations
    const decorationSize = 30;
    const drawDecorations = (decorations: string[] | undefined, x: number, y: number) => {
      if (!decorations) return;
      tempCtx.font = `${decorationSize}px Arial`;
      decorations.forEach((decoration, i) => {
        tempCtx.fillText(decoration, x + (i * decorationSize * 1.5), y);
      });
    };

    // Top decorations
    if (selectedFrame.decorations.top) {
      drawDecorations(selectedFrame.decorations.top, padding * 2, padding);
    }

    // Load and draw photos
    const loadImage = (src: string): Promise<HTMLImageElement> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
      });
    };

    const drawAllPhotos = async () => {
      for (let i = 0; i < photos.length; i++) {
        try {
          const img = await loadImage(photos[i]);
          const y = padding * 2 + i * (photoHeight + padding);
          tempCtx.drawImage(
            img,
            padding * 2,
            y,
            canvas.width - (padding * 4),
            photoHeight
          );
        } catch (error) {
          console.error("Error loading photo:", error);
        }
      }

      // Draw title
      tempCtx.font = "bold 48px Arial";
      tempCtx.fillStyle = "#000000";
      tempCtx.textAlign = "center";
      const titleY = canvas.height - 120;
      tempCtx.fillText(stripName || "Photo Strip", canvas.width / 2, titleY);

      // Draw date if enabled
      if (showDate) {
        tempCtx.font = "24px Arial";
        tempCtx.fillStyle = "#666666";
        const dateText = format(new Date(), "MMMM dd, yyyy");
        tempCtx.fillText(dateText, canvas.width / 2, titleY + 40);
      }

      // Bottom decorations
      if (selectedFrame.decorations.bottom) {
        drawDecorations(
          selectedFrame.decorations.bottom,
          padding * 2,
          canvas.height - padding
        );
      }

      // Draw stickers
      for (const pos of stickerPositions) {
        const sticker = stickers.find((s) => s.id === pos.id);
        if (sticker) {
          try {
            const img = await loadImage(sticker.url);
            tempCtx.save();
            if (pos.color) {
              tempCtx.fillStyle = pos.color;
              tempCtx.globalCompositeOperation = "source-in";
              tempCtx.fillRect(pos.x, pos.y, 50, 50);
            }
            tempCtx.drawImage(img, pos.x, pos.y, 50, 50);
            tempCtx.restore();
          } catch (error) {
            console.error("Error loading sticker:", error);
          }
        }
      }

      // Copy the final result to the main canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(tempCanvas, 0, 0);
    };

    drawAllPhotos();
  }, [photos, backgroundColor, stripName, showDate, selectedFrame, stickerPositions]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Create a temporary link and trigger download
    const link = document.createElement("a");
    link.download = `${stripName || 'photo-strip'}.png`;
    // Convert the canvas to a blob
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
      }
    }, 'image/png');

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