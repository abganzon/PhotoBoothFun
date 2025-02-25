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
    const padding = 30;
    const titleSpace = 100; // Space for title and date at bottom
    
    // Define placeholder dimensions for strip layout
    const placeholderWidth = 250; // Fixed width for placeholder images
    const placeholderHeight = Math.floor(placeholderWidth * 0.75);

    if (layout === "strip") {
      canvas.width = placeholderWidth + (padding * 2); // Set width to fit placeholder
      canvas.height = 800;
    } else {
      canvas.width = 800;
      canvas.height = 800;
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
      }
      
      tempCanvas.width = canvas.width;
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
        for (let i = 0; i < Math.min(photos.length, 4); i++) { // Limit to 4 images
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
              x = padding + (canvas.width - (padding * 2) - scaledWidth) / 2;
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
      }

      // Draw title section at the bottom
      const titleY = padding + gridHeight + 40;
      
      // Draw title
      tempCtx.font = "bold 36px Arial";
      tempCtx.fillStyle = nameColor;
      tempCtx.textAlign = "center";
      const titleText = name || "Photo Strip";
      tempCtx.fillText(titleText, canvas.width / 2, titleY);

      // Draw date if enabled
      if (showDate) {
        tempCtx.font = "20px Arial";
        tempCtx.fillStyle = dateColor;
        const dateText = format(new Date(), "MMMM dd, yyyy");
        tempCtx.fillText(dateText, canvas.width / 2, titleY + 30);
      }

      // Calculate final height and update canvas dimensions
      const finalHeight = titleY + (showDate ? 80 : 50);
      
      // Create new canvas with final dimensions
      const finalCanvas = document.createElement('canvas');
      finalCanvas.width = canvas.width;
      finalCanvas.height = finalHeight;
      const finalCtx = finalCanvas.getContext('2d');
      
      if (finalCtx) {
        // Fill background
        finalCtx.fillStyle = backgroundColor;
        finalCtx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);
        
        // Copy content from temp canvas
        finalCtx.drawImage(tempCanvas, 0, 0);
        
        // Update main canvas
        canvas.height = finalHeight;
        ctx.canvas.height = finalHeight;
        ctx.clearRect(0, 0, canvas.width, finalHeight);
        ctx.drawImage(finalCanvas, 0, 0);
      }
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