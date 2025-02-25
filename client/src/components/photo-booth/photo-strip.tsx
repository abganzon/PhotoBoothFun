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
    const padding = layout === "strip" ? 20 : 30; // Smaller padding for strip layout
    const bottomPadding = layout === "strip" ? 60 : 80; // Space for title and date at bottom
    
    // Define placeholder dimensions for strip layout
    const placeholderWidth = 250; // Fixed width for placeholder images
    const placeholderHeight = Math.floor(placeholderWidth * 0.75);

    if (layout === "strip") {
      canvas.width = placeholderWidth + (padding * 2); // Set width to fit placeholder
      canvas.height = (placeholderHeight * 4) + (padding * 5) + bottomPadding; // Include space for title
    } else {
      canvas.width = 800;
      canvas.height = (placeholderHeight * 2) + (padding * 3) + bottomPadding;
    }
    
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;

    // Clear canvas and apply background
    tempCtx.fillStyle = backgroundColor;
    tempCtx.fillRect(0, 0, canvas.width, canvas.height);

    let photoWidth: number;
    let photoHeight: number;
    let gridHeight: number;
    let maxImageWidth = 0; // Track the maximum image width

    if (layout === "strip") {
      // Strip layout (1x4)
      photoWidth = placeholderWidth; // Use placeholder width for consistency
      photoHeight = placeholderHeight;
      gridHeight = (photoHeight * 4) + (padding * 3); // Fixed height for 4 images
    } else {
      // Collage layout (2x2)
      const availableWidth = canvas.width - (padding * 3);
      photoWidth = availableWidth / 2;
      photoHeight = photoWidth;
      gridHeight = (photoHeight * 2) + (padding * 3);
    }

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
      // First pass: calculate maximum image width for strip layout
      if (layout === "strip" && photos.length > 0) {
        for (let i = 0; i < Math.min(photos.length, 4); i++) {
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
      }
      
      tempCtx.fillStyle = backgroundColor;
      tempCtx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw placeholder borders for empty layout
      if (photos.length === 0) {
        if (layout === "strip") {
          // Draw placeholder borders for strip layout
          for (let i = 0; i < 4; i++) {
            const x = padding;
            const y = padding + (i * (placeholderHeight + padding));
            
            // Draw outer border
            tempCtx.strokeStyle = '#e5e5e5';
            tempCtx.lineWidth = 3;
            tempCtx.strokeRect(x, y, placeholderWidth, placeholderHeight);
            
            // Draw inner border
            tempCtx.strokeStyle = '#f3f4f6';
            tempCtx.lineWidth = 1;
            tempCtx.strokeRect(
              x + 3,
              y + 3,
              placeholderWidth - 6,
              placeholderHeight - 6
            );
          }
        } else {
          // Draw placeholder borders for collage layout
          for (let i = 0; i < 4; i++) {
            const row = Math.floor(i / 2);
            const col = i % 2;
            const x = padding + (col * (photoWidth + padding));
            const y = padding + (row * (photoHeight + padding));
            
            tempCtx.strokeStyle = '#e5e5e5';
            tempCtx.lineWidth = 2;
            tempCtx.strokeRect(x, y, photoWidth, photoHeight);
          }
        }
      }

      // Second pass: draw images if they exist
      if (photos.length > 0) {
        const imagesToDraw = Math.min(photos.length, 4);
        for (let i = 0; i < imagesToDraw; i++) {
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
              x = padding + ((canvas.width - (padding * 2) - scaledWidth) / 2);
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
              
              // Center the image within its cell
              const xOffset = (photoWidth - scaledWidth) / 2;
              const yOffset = (photoHeight - scaledHeight) / 2;
              
              tempCtx.drawImage(
                img,
                x + xOffset,
                y + yOffset,
                scaledWidth,
                scaledHeight
              );
              
              // Draw border
              tempCtx.strokeStyle = '#e5e5e5';
              tempCtx.lineWidth = 2;
              tempCtx.strokeRect(x, y, photoWidth, photoHeight);
            }
          } catch (error) {
            console.error("Error loading photo:", error);
          }
        }
      }

      // Draw title section at the bottom
      const titleY = padding + gridHeight + (layout === "strip" ? 25 : 40);
      
      // Draw title with different sizes based on layout
      tempCtx.font = layout === "strip" ? "bold 24px Arial" : "bold 36px Arial";
      tempCtx.fillStyle = nameColor;
      tempCtx.textAlign = "center";
      tempCtx.fillText(name || "Photo Strip", canvas.width / 2, titleY);

      // Draw date if enabled
      if (showDate) {
        tempCtx.font = layout === "strip" ? "16px Arial" : "20px Arial";
        tempCtx.fillStyle = dateColor;
        const dateText = format(new Date(), "MMMM dd, yyyy");
        tempCtx.fillText(dateText, canvas.width / 2, titleY + (layout === "strip" ? 25 : 30));
      }

      // Update main canvas with the final content
      ctx.canvas.width = canvas.width;
      ctx.canvas.height = canvas.height;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
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