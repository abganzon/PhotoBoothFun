import React, { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { format } from "date-fns";

interface PhotoStripProps {
  photos: string[];
  backgroundColor: string;
  name: string;
  showDate: boolean;
}

export function PhotoStrip({ photos, backgroundColor, name, showDate }: PhotoStripProps) {
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
    tempCtx.fillStyle = backgroundColor;
    tempCtx.fillRect(0, 0, canvas.width, canvas.height);

    const padding = 20;
    const photoWidth = (canvas.width - (padding * 3)) / 2; // 2 columns
    const photoHeight = photoWidth * 0.75; // Maintain 4:3 aspect ratio
    const gridHeight = photos.length > 0 
      ? (photoHeight * 2) + (padding * 3) // 2x2 grid height
      : 480; // Default camera height when no photos

    // Adjust canvas height based on content
    const titleSpace = 100;
    canvas.height = gridHeight + titleSpace;
    tempCanvas.height = canvas.height;
    tempCtx.fillStyle = backgroundColor;
    tempCtx.fillRect(0, 0, canvas.width, canvas.height);

    // Load and draw photos
    const loadImage = (src: string): Promise<HTMLImageElement> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        // Set crossOrigin before src to avoid CORS issues
        if (src.startsWith('data:')) {
          img.crossOrigin = '';
        }
        img.onload = () => resolve(img);
        img.onerror = (e) => reject(e);
        img.src = src;
      });
    };

    const drawAllPhotos = async () => {
      for (let i = 0; i < photos.length; i++) {
        try {
          const img = await loadImage(photos[i]);
          const row = Math.floor(i / 2);
          const col = i % 2;
          const x = padding + (col * (photoWidth + padding));
          const y = padding + (row * (photoHeight + padding));
          tempCtx.drawImage(
            img,
            x,
            y,
            photoWidth,
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
      const titleY = gridHeight + padding + 20;
      tempCtx.fillText(name || "Photo Strip", canvas.width / 2, titleY);

      // Draw date if enabled
      if (showDate) {
        tempCtx.font = "24px Arial";
        tempCtx.fillStyle = "#666666";
        const dateText = format(new Date(), "MMMM dd, yyyy");
        tempCtx.fillText(dateText, canvas.width / 2, titleY + 40);
      }


      // Copy the final result to the main canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(tempCanvas, 0, 0);
    };

    drawAllPhotos();
  }, [photos, backgroundColor, name, showDate]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Create a temporary link and trigger download
    const link = document.createElement("a");
    link.download = `${name || 'photo-strip'}.png`;
    // Convert the canvas to a blob
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
      }
    }, 'image/png');
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <canvas
        ref={canvasRef}
        width={400}
        height={600}
        className="w-full max-w-md border rounded-lg shadow-lg"
      />
      <Button onClick={handleDownload} size="lg">
        <Download className="mr-2 h-4 w-4" />
        Download Strip
      </Button>
    </div>
  );
}