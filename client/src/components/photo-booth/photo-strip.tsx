import React, { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { format } from "date-fns";

interface PhotoStripProps {
  photos: string[];
  backgroundColor: string;
  name: string;
  showDate: boolean;
  nameColor: string;
  dateColor: string;
  layout: "strip" | "collage";
}

export function PhotoStrip({ 
  photos, 
  backgroundColor = "#ffffff",
  name = "",
  showDate = true,
  nameColor = "#000000",
  dateColor = "#666666",
  layout = "strip"
}: PhotoStripProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Create a new canvas for photo composition
    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");
    if (!tempCtx) return;

    // Set initial canvas dimensions
    if (layout === "strip") {
      canvas.width = 500; // Initial width, will be adjusted based on content
      canvas.height = 1000;
    } else {
      canvas.width = 800;
      canvas.height = 1000;
    }
    
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;

    // Clear canvas and apply background
    tempCtx.fillStyle = backgroundColor;
    tempCtx.fillRect(0, 0, canvas.width, canvas.height);

    const padding = layout === "strip" ? 30 : 30;
    let photoWidth: number;
    let photoHeight: number;
    let gridHeight: number;
    let maxImageWidth = 0; // Track the maximum image width

    if (layout === "strip") {
      // Strip layout (1x4)
      photoWidth = canvas.width - (padding * 2);
      photoHeight = Math.floor(photoWidth * 0.75); // 4:3 aspect ratio for strip layout
      gridHeight = photos.length > 0 
        ? (photoHeight * 4) + (padding * 3)
        : 480;
    } else {
      // Collage layout (2x2)
      const availableWidth = canvas.width - (padding * 3);
      photoWidth = availableWidth / 2;
      photoHeight = photoWidth;
      gridHeight = photos.length > 0 
        ? (photoHeight * 2) + (padding * 3)
        : 480;
    }

    // Load and draw photos
    const loadImage = (src: string): Promise<HTMLImageElement> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        if (src.startsWith('data:')) {
          img.crossOrigin = '';
        }
        img.onload = () => resolve(img);
        img.onerror = (e) => reject(e);
        img.src = src;
      });
    };

    const drawAllPhotos = async () => {
      // First pass: calculate maximum image width
      if (layout === "strip") {
        for (let i = 0; i < photos.length; i++) {
          try {
            const img = await loadImage(photos[i]);
            const scale = Math.min(
              photoWidth / img.width,
              photoHeight / img.height
            );
            const scaledWidth = img.width * scale;
            maxImageWidth = Math.max(maxImageWidth, scaledWidth);
          } catch (error) {
            console.error("Error loading photo:", error);
          }
        }

        // Adjust canvas width based on maximum image width
        canvas.width = maxImageWidth + (padding * 2);
        tempCanvas.width = canvas.width;
        tempCtx.fillStyle = backgroundColor;
        tempCtx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Second pass: draw images
      for (let i = 0; i < photos.length; i++) {
        try {
          const img = await loadImage(photos[i]);
          let x: number;
          let y: number;

          if (layout === "strip") {
            // Strip layout (1x4)
            const scale = Math.min(
              photoWidth / img.width,
              photoHeight / img.height
            );
            const scaledWidth = img.width * scale;
            const scaledHeight = img.height * scale;
            
            // Center horizontally
            x = padding + (maxImageWidth - scaledWidth) / 2;
            y = padding + (i * (photoHeight + padding));
            
            // Draw image
            tempCtx.drawImage(
              img,
              x,
              y,
              scaledWidth,
              scaledHeight
            );
            
            // Draw borders exactly around the image
            tempCtx.strokeStyle = '#e5e5e5';
            tempCtx.lineWidth = 3;
            tempCtx.strokeRect(x, y, scaledWidth, scaledHeight);
            
            tempCtx.strokeStyle = '#f3f4f6';
            tempCtx.lineWidth = 1;
            tempCtx.strokeRect(
              x + 3,
              y + 3,
              scaledWidth - 6,
              scaledHeight - 6
            );
          } else {
            // Collage layout (2x2)
            const row = Math.floor(i / 2);
            const col = i % 2;
            x = padding + (col * (photoWidth + padding));
            y = padding + (row * (photoHeight + padding));
            
            // Calculate dimensions to maintain aspect ratio
            const scale = Math.min(
              photoWidth / img.width,
              photoHeight / img.height
            );
            const scaledWidth = img.width * scale;
            const scaledHeight = img.height * scale;
            
            // Center the image
            const xOffset = x + (photoWidth - scaledWidth) / 2;
            const yOffset = y + (photoHeight - scaledHeight) / 2;
            
            tempCtx.drawImage(
              img,
              xOffset,
              yOffset,
              scaledWidth,
              scaledHeight
            );
            
            // Simple border for collage layout
            tempCtx.strokeStyle = '#e5e5e5';
            tempCtx.lineWidth = 2;
            tempCtx.strokeRect(x, y, photoWidth, photoHeight);
          }
        } catch (error) {
          console.error("Error loading photo:", error);
        }
      }

      // Draw title section
      const titlePadding = padding;
      const titleY = gridHeight + titlePadding + 40; // Add space above title
      
      // Draw title with shadow
      tempCtx.shadowColor = 'rgba(0, 0, 0, 0.1)';
      tempCtx.shadowBlur = 3;
      tempCtx.shadowOffsetY = 2;
      tempCtx.font = "bold 36px Arial"; // Slightly smaller font
      tempCtx.fillStyle = nameColor;
      tempCtx.textAlign = "center";
      tempCtx.fillText(name || "Photo Strip", canvas.width / 2, titleY);
      
      // Reset shadow
      tempCtx.shadowColor = 'transparent';
      tempCtx.shadowBlur = 0;
      tempCtx.shadowOffsetY = 0;

      // Draw date if enabled
      if (showDate) {
        tempCtx.font = "20px Arial"; // Slightly smaller font
        tempCtx.fillStyle = dateColor;
        const dateText = format(new Date(), "MMMM dd, yyyy");
        tempCtx.fillText(dateText, canvas.width / 2, titleY + 30);
      }

      // Copy the final result to the main canvas
      const finalHeight = titleY + (showDate ? 80 : 50); // Add padding below
      canvas.height = finalHeight;
      ctx.canvas.height = finalHeight;
      ctx.clearRect(0, 0, canvas.width, finalHeight);
      ctx.drawImage(tempCanvas, 0, 0);
    };

    drawAllPhotos();
  }, [photos, backgroundColor, name, showDate, nameColor, dateColor, layout]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = `${name || 'photo-strip'}.png`;
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
    <div className="flex flex-col items-center gap-4 w-full px-4 sm:px-0">
      <canvas
        ref={canvasRef}
        className="w-full max-w-md border rounded-lg shadow-lg"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
      <Button onClick={handleDownload} size="lg">
        <Download className="mr-2 h-4 w-4" />
        Download Strip
      </Button>
    </div>
  );
}