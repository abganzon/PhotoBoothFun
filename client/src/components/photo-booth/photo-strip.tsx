import React, { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download, Image as ImageIcon } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();
  const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);

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
    const padding = 20; // Reduced padding for both layouts

    // Calculate text space needed for name and date with layout-specific spacing
    const hasText = showName || showDate;
    const textSpace = hasText ? (showName && showDate ? 80 : 40) : 0;

    // Define placeholder dimensions for strip layout
    const placeholderWidth = 200; // Reduced width for placeholder images
    const placeholderHeight = Math.floor(placeholderWidth * 0.75);

    let photoWidth: number;
    let photoHeight: number;
    let gridHeight: number;

    if (layout === "strip") {
      canvas.width = placeholderWidth + (padding * 2); // Set width to fit placeholder with padding
      gridHeight = (placeholderHeight * 4) + (padding * 3); // Height of just the photos and spacing between them
      // When no text, bottom padding matches side padding
      canvas.height = (hasText ? textSpace + padding : padding) + gridHeight + padding;
    } else {
      // For collage layout
      canvas.width = 450; // Reduced from 600 to 450 for collage layout
      const gridSize = canvas.width - (padding * 2); // Total space for grid
      const cellSize = (gridSize - padding) / 2; // Size for each image cell, accounting for middle padding
      gridHeight = (cellSize * 2) + padding; // Height of the 2x2 grid including middle padding
      photoWidth = cellSize;
      photoHeight = cellSize;

      // Set canvas height with text at top, when no text bottom padding matches sides
      canvas.height = (hasText ? textSpace + padding : padding) + gridHeight + padding;
    }

    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;

    // Clear canvas and apply background
    tempCtx.fillStyle = backgroundColor;
    tempCtx.fillRect(0, 0, canvas.width, canvas.height);

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

    // Calculate text position - now at the top
    const textStartY = padding * 2; // Start text from top with consistent padding
    const lineHeight = 38; // Consistent line height

    // Draw title with consistent styling
    if (showName) {
      const titleSize = layout === "strip" ? 24 : 28; // Reduced font sizes
      tempCtx.font = `${titleSize}px Arial`;
      tempCtx.fillStyle = nameColor;
      tempCtx.textAlign = "center";
      tempCtx.fillText(name || "Photo Strip", canvas.width / 2, textStartY);
    }

    // Draw date if enabled
    if (showDate) {
      const dateSize = layout === "strip" ? 16 : 18; // Reduced font sizes
      tempCtx.font = `${dateSize}px Arial`;
      tempCtx.fillStyle = dateColor;
      tempCtx.textAlign = "center";
      const dateText = format(new Date(), "MMMM dd, yyyy");
      const dateY = showName ? textStartY + lineHeight : textStartY;
      tempCtx.fillText(dateText, canvas.width / 2, dateY);
    }

    // Calculate grid starting position - now after text
    const gridStartY = hasText ? textSpace + padding : padding;

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
              x = padding;
              y = gridStartY + (i * (placeholderHeight + padding));
              
              // Calculate dimensions to maintain aspect ratio and fill placeholder
              const aspectRatio = img.width / img.height;
              let drawWidth = placeholderWidth;
              let drawHeight = placeholderHeight;
              let sourceX = 0;
              let sourceY = 0;
              let sourceWidth = img.width;
              let sourceHeight = img.height;

              if (aspectRatio > (placeholderWidth / placeholderHeight)) {
                // Image is wider - crop sides
                sourceWidth = Math.floor((placeholderWidth / placeholderHeight) * img.height);
                sourceX = Math.floor((img.width - sourceWidth) / 2);
              } else {
                // Image is taller - crop top/bottom
                sourceHeight = Math.floor((placeholderHeight / placeholderWidth) * img.width);
                sourceY = Math.floor((img.height - sourceHeight) / 2);
              }

              tempCtx.drawImage(img, sourceX, sourceY, sourceWidth, sourceHeight, x, y, drawWidth, drawHeight);
            } else {
              // For collage layout (2x2 grid)
              const col = i % 2;
              const row = Math.floor(i / 2);
              x = padding + (col * (photoWidth + padding));
              y = gridStartY + (row * (photoHeight + padding));

              // Create a temporary canvas for the covered image
              const tempImgCanvas = document.createElement('canvas');
              const tempImgCtx = tempImgCanvas.getContext('2d');
              tempImgCanvas.width = photoWidth;
              tempImgCanvas.height = photoHeight;

              if (tempImgCtx) {
                const scale = Math.max(photoWidth / img.width, photoHeight / img.height);
                const scaledWidth = img.width * scale;
                const scaledHeight = img.height * scale;
                const offsetX = (photoWidth - scaledWidth) / 2;
                const offsetY = (photoHeight - scaledHeight) / 2;

                tempImgCtx.drawImage(img, offsetX, offsetY, scaledWidth, scaledHeight);
                tempCtx.drawImage(tempImgCanvas, x, y);
              }
            }
          } catch (error) {
            console.error("Error loading photo:", error);
          }
        }
      }

      // Update main canvas with the final content
      ctx.canvas.width = canvas.width;
      ctx.canvas.height = canvas.height;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(tempCanvas, 0, 0);
    };

    drawAllPhotos();
  }, [photos, backgroundColor, name, showDate, showName, nameColor, dateColor, layout]);

  const handleDownload = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const fileName = `${name || 'photo'}-${format(new Date(), 'yyyy-MM-dd')}.png`;

    if (isMobile) {
      try {
        // Convert canvas to blob
        const blob = await new Promise<Blob>((resolve) => {
          canvas.toBlob((blob) => {
            resolve(blob!);
          }, 'image/png');
        });

        // Create a File object
        const file = new File([blob], fileName, { type: 'image/png' });

        // Check if the Web Share API is available
        if (navigator.share && navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: 'Photo Strip',
            text: 'Download or share your photo strip'
          });
          
          toast({
            title: "Success!",
            description: "Your photo strip is ready to be saved or shared",
            variant: "success",
            duration: 3000,
          });
        } else {
          // Fallback for browsers that don't support sharing files
          const downloadUrl = canvas.toDataURL();
          const link = document.createElement("a");
          link.download = fileName;
          link.href = downloadUrl;
          link.click();
          
          toast({
            title: "Photo Downloaded",
            description: "Check your device's download folder",
            variant: "success",
            duration: 3000,
          });
        }
      } catch (error) {
        console.error('Error sharing/downloading:', error);
        toast({
          title: "Download Failed",
          description: "There was an error downloading your photo",
          variant: "destructive",
          duration: 3000,
        });
      }
    } else {
      // Desktop download behavior
      const link = document.createElement("a");
      link.download = fileName;
      link.href = canvas.toDataURL();
      link.click();
      
      toast({
        title: "Photo Downloaded",
        description: "Check your downloads folder",
        variant: "success",
        duration: 3000,
      });
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 w-full px-2 sm:px-0">
      <Button
        onClick={handleDownload}
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
      >
        {isMobile ? <ImageIcon className="h-7 w-7" /> : <Download className="h-7 w-7" />}
        {isMobile ? "Save to Gallery" : "Download"}
      </Button>
      <canvas
        ref={canvasRef}
        className="w-full max-w-[250px] border-0 rounded-lg shadow-lg"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </div>
  );
};