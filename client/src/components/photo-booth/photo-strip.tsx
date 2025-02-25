import React, { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { format } from "date-fns";

interface PhotoStripProps {
  photos: string[];
  layout: "strip" | "collage";
  name?: string;
  showDate?: boolean;
  showName?: boolean;
  backgroundColor?: string;
  nameColor?: string;
  dateColor?: string;
}

export const PhotoStrip: React.FC<PhotoStripProps> = ({
  photos,
  layout,
  name,
  showDate = true,
  showName = true,
  backgroundColor = "#ffffff",
  nameColor = "#000000",
  dateColor = "#666666",
}) => {
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
    const padding = 25; // Consistent padding for both layouts
    
    // Calculate text space needed for name and date with layout-specific spacing
    const hasText = showName || showDate;
    const textSpace = hasText ? (showName && showDate ? 
      (layout === "strip" ? 100 : 120) : // More space for collage when both are shown
      (layout === "strip" ? 50 : 70) // More space for collage when only one is shown
    ) : 0;
    
    // Define placeholder dimensions for strip layout
    const placeholderWidth = 250; // Fixed width for placeholder images
    const placeholderHeight = Math.floor(placeholderWidth * 0.75);

    if (layout === "strip") {
      canvas.width = placeholderWidth + (padding * 2); // Set width to fit placeholder with padding
      const gridHeight = (placeholderHeight * 4) + (padding * 3); // Height of just the photos and spacing between them
      canvas.height = gridHeight + (hasText ? textSpace + padding : padding); // Add padding above text
    } else {
      // For collage layout
      canvas.width = 800;
      const gridSize = canvas.width - (padding * 2); // Total space for grid
      const cellSize = (gridSize - padding) / 2; // Size for each image cell, accounting for middle padding
      const gridHeight = (cellSize * 2) + padding; // Height of the 2x2 grid including middle padding
      
      // Set canvas height to maintain aspect ratio plus text space and padding
      canvas.height = gridHeight + padding + (hasText ? textSpace + padding : 0);
    }
    
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;

    // Clear canvas and apply background
    tempCtx.fillStyle = backgroundColor;
    tempCtx.fillRect(0, 0, canvas.width, canvas.height);

    let photoWidth: number;
    let photoHeight: number;
    let gridHeight: number;

    if (layout === "strip") {
      photoWidth = placeholderWidth;
      photoHeight = placeholderHeight;
      gridHeight = (photoHeight * 4) + (padding * 3);
    } else {
      // For collage, calculate cell size from total width minus outer and middle padding
      const availableWidth = canvas.width - (padding * 2); // Space between outer borders
      photoWidth = (availableWidth - padding) / 2; // Width of each cell
      photoHeight = photoWidth; // Keep cells square
      gridHeight = (photoHeight * 2) + padding;
    }

    // Calculate grid starting position - for strip it's centered, for collage it starts at padding
    const gridStartY = layout === "strip" 
      ? (canvas.height - textSpace + padding - gridHeight) / 2 
      : padding;

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
      // Draw placeholder borders for empty layout
      if (photos.length === 0) {
        if (layout === "strip") {
          // Strip layout placeholders
          for (let i = 0; i < 4; i++) {
            const x = padding;
            const y = gridStartY + (i * (placeholderHeight + padding));
            
            tempCtx.strokeStyle = '#e5e5e5';
            tempCtx.lineWidth = 2;
            tempCtx.strokeRect(x, y, placeholderWidth, placeholderHeight);
          }
        } else {
          // Collage layout placeholders (2x2)
          for (let row = 0; row < 2; row++) {
            for (let col = 0; col < 2; col++) {
              const x = padding + (col * (photoWidth + padding));
              const y = gridStartY + (row * (photoHeight + padding));
              
              tempCtx.strokeStyle = '#e5e5e5';
              tempCtx.lineWidth = 2;
              tempCtx.strokeRect(x, y, photoWidth, photoHeight);
            }
          }
        }
      }

      // Draw actual images
      if (photos.length > 0) {
        const imagesToDraw = Math.min(photos.length, layout === "strip" ? 4 : 4);
        for (let i = 0; i < imagesToDraw; i++) {
          try {
            const img = await loadImage(photos[i]);
            let x: number;
            let y: number;

            if (layout === "strip") {
              const scale = Math.min(
                photoWidth / img.width,
                photoHeight / img.height
              );
              const scaledWidth = img.width * scale;
              const scaledHeight = img.height * scale;
              
              x = padding + ((canvas.width - (padding * 2) - scaledWidth) / 2);
              y = gridStartY + (i * (photoHeight + padding));
              
              tempCtx.drawImage(img, x, y, scaledWidth, scaledHeight);
              tempCtx.strokeStyle = '#e5e5e5';
              tempCtx.lineWidth = 2;
              tempCtx.strokeRect(x, y, scaledWidth, scaledHeight);
            } else {
              const row = Math.floor(i / 2);
              const col = i % 2;
              x = padding + (col * (photoWidth + padding));
              y = gridStartY + (row * (photoHeight + padding));

              const scale = Math.min(
                photoWidth / img.width,
                photoHeight / img.height
              );
              const scaledWidth = img.width * scale;
              const scaledHeight = img.height * scale;
              
              const xOffset = (photoWidth - scaledWidth) / 2;
              const yOffset = (photoHeight - scaledHeight) / 2;
              
              tempCtx.drawImage(
                img,
                x + xOffset,
                y + yOffset,
                scaledWidth,
                scaledHeight
              );
              
              tempCtx.strokeStyle = '#e5e5e5';
              tempCtx.lineWidth = 2;
              tempCtx.strokeRect(x, y, photoWidth, photoHeight);
            }
          } catch (error) {
            console.error("Error loading photo:", error);
          }
        }
      }

      // Calculate text position with layout-specific spacing
      const namePadding = layout === "strip" ? padding * 2 : padding * 2; // Consistent padding for strip
      const datePadding = layout === "strip" ? padding * 2 : padding * 1.5; // Consistent padding for strip
      
      const textStartY = layout === "strip"
        ? canvas.height - textSpace + namePadding // Add consistent padding for strip
        : canvas.height - textSpace + namePadding;
      
      const lineHeight = layout === "strip" ? 50 : 50; // Consistent line height
      
      // Draw title with consistent styling
      if (showName) {
        const titleSize = layout === "strip" ? 28 : 36;
        tempCtx.font = `${titleSize}px Arial`;
        tempCtx.fillStyle = nameColor;
        tempCtx.textAlign = "center";
        tempCtx.fillText(name || "Photo Strip", canvas.width / 2, textStartY);
      }

      // Draw date if enabled
      if (showDate) {
        const dateSize = layout === "strip" ? 18 : 22;
        tempCtx.font = `${dateSize}px Arial`;
        tempCtx.fillStyle = dateColor;
        tempCtx.textAlign = "center";
        const dateText = format(new Date(), "MMMM dd, yyyy");
        const dateY = showName ? textStartY + lineHeight : textStartY;
        tempCtx.fillText(dateText, canvas.width / 2, dateY);
      }

      // Update main canvas with the final content
      ctx.canvas.width = canvas.width;
      ctx.canvas.height = canvas.height;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(tempCanvas, 0, 0);
    };

    drawAllPhotos();
  }, [photos, backgroundColor, name, showDate, showName, nameColor, dateColor, layout]);

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