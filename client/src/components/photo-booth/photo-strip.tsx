import React, { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { format } from "date-fns";

interface PhotoStripProps {
  photos: string[];
  backgroundColor: string;
  name: string;
  showDate: boolean;
  layout: 'strip-vertical' | 'strip-horizontal' | 'collage-vertical' | 'collage-horizontal';
}

export function PhotoStrip({ photos, backgroundColor, name, showDate, layout }: PhotoStripProps) {
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
    let photoWidth, photoHeight, gridHeight;
    
    switch (layout) {
      case 'strip-vertical':
        photoWidth = canvas.width - (padding * 2);
        photoHeight = (canvas.width - (padding * 2)) * 0.75;
        gridHeight = (photoHeight * 4) + (padding * 5);
        break;
      case 'strip-horizontal':
        photoWidth = (canvas.width - (padding * 5)) / 4;
        photoHeight = photoWidth;
        gridHeight = photoHeight + (padding * 2);
        break;
      case 'collage-vertical':
        photoWidth = (canvas.width - (padding * 3)) / 2;
        photoHeight = photoWidth;
        gridHeight = (photoHeight * 2) + (padding * 3);
        break;
      case 'collage-horizontal':
        photoWidth = (canvas.width - (padding * 3)) / 2;
        photoHeight = photoWidth;
        gridHeight = (photoHeight * 2) + (padding * 3);
        break;
      default:
        photoWidth = (canvas.width - (padding * 3)) / 2;
        photoHeight = photoWidth;
        gridHeight = (photoHeight * 2) + (padding * 3);
    }
    
    const totalHeight = gridHeight + 150; // More space for title and date

    canvas.height = totalHeight; // Adjust canvas height
    tempCanvas.height = totalHeight;
    tempCtx.fillStyle = backgroundColor;
    tempCtx.fillRect(0, 0, canvas.width, totalHeight);

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
          let x, y;
          switch (layout) {
            case 'strip-vertical':
              x = padding;
              y = padding + i * (photoHeight + padding);
              break;
            case 'strip-horizontal':
              x = padding + i * (photoWidth + padding);
              y = padding;
              break;
            case 'collage-vertical':
            case 'collage-horizontal':
              const row = Math.floor(i / 2);
              const col = i % 2;
              x = padding + col * (photoWidth + padding);
              y = padding + row * (photoHeight + padding);
              break;
          }
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
      const titleY = canvas.height - 80;
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