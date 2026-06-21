import React, { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Share2, Save } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { downloadCanvasAsPng } from "@/lib/download-image";
import {
  DEFAULT_DATE_FONT,
  DEFAULT_DATE_FONT_SIZE,
  DEFAULT_NAME_FONT,
  DEFAULT_NAME_FONT_SIZE,
  drawStripText,
  getStripTextSpace,
  waitForStripFonts,
  type FontType,
  type StripFontStyle,
} from "@/lib/strip-text-styles";
import { ShareModal } from "./share-modal";
import {
  type PhotoLayout,
  getLayoutPhotoCount,
  isVerticalStackLayout,
} from "@shared/layouts";

interface PhotoStripProps {
  photos: string[];
  layout: PhotoLayout;
  name?: string;
  showDate?: boolean;
  showName?: boolean;
  backgroundColor?: string;
  nameColor?: string;
  dateColor?: string;
  nameFont?: StripFontStyle;
  dateFont?: StripFontStyle;
  nameFontSize?: number;
  dateFontSize?: number;
  hideButtons?: boolean;
  darkMode?: boolean;
  showShareButton?: boolean;
  onShare?: () => void;
  onSaveToGallery?: () => void;
  isShareLoading?: boolean;
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
  nameFont = DEFAULT_NAME_FONT,
  dateFont = DEFAULT_DATE_FONT,
  nameFontSize = DEFAULT_NAME_FONT_SIZE,
  dateFontSize = DEFAULT_DATE_FONT_SIZE,
  hideButtons = false,
  darkMode = false,
  showShareButton = false,
  onShare,
  onSaveToGallery,
  isShareLoading = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();
  const [photoStripId, setPhotoStripId] = useState<number | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Ensure photos is an array
    if (!Array.isArray(photos)) {
      console.error("Photos prop is not an array:", photos);
      return;
    }

    // Create a new canvas for photo composition
    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");
    if (!tempCtx) return;

    // Set initial canvas dimensions
    const padding = 20; // Reduced padding for both layouts

    // Calculate text space needed for name and date with layout-specific spacing
    const hasText = showName || showDate;
    const textSpace = getStripTextSpace({
      showName,
      showDate,
      nameFontSize,
      dateFontSize,
    });

    const photoCount = getLayoutPhotoCount(layout);

    // Define placeholder dimensions for vertical layouts
    const placeholderWidth = 200;
    const placeholderHeight = Math.floor(placeholderWidth * 0.75);

    let photoWidth: number;
    let photoHeight: number;
    let gridHeight: number;

    if (isVerticalStackLayout(layout)) {
      canvas.width = placeholderWidth + (padding * 2);
      gridHeight = (placeholderHeight * photoCount) + (padding * (photoCount - 1));
      canvas.height = padding + gridHeight + (hasText ? padding + textSpace : padding);
    } else {
      // For collage layout
      canvas.width = 450;
      const gridSize = canvas.width - (padding * 2);
      const cellSize = (gridSize - padding) / 2;
      gridHeight = (cellSize * 2) + padding;
      photoWidth = cellSize;
      photoHeight = cellSize;

      canvas.height = padding + gridHeight + (hasText ? padding + textSpace : padding);
    }

    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;

    if (isVerticalStackLayout(layout)) {
      photoWidth = placeholderWidth;
      photoHeight = placeholderHeight;
      gridHeight = (photoHeight * photoCount) + (padding * (photoCount - 1));
    } else {
      const availableWidth = canvas.width - (padding * 2);
      photoWidth = (availableWidth - padding) / 2;
      photoHeight = photoWidth;
      gridHeight = (photoHeight * 2) + padding;
    }

    // Calculate grid starting position - now at top when no text, or with padding when text exists
    const gridStartY = padding;
    const textAreaStartY = gridStartY + gridHeight + padding;

    const loadImage = (src: string): Promise<HTMLImageElement> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        // Don't set crossOrigin for data URLs
        if (!src.startsWith('data:')) {
          img.crossOrigin = "anonymous";
        }
        img.onload = () => {
          console.log("Image loaded successfully");
          resolve(img);
        };
        img.onerror = (e) => {
          console.error("Error loading image:", e, "Source:", src.substring(0, 100) + "...");
          reject(e);
        };
        img.src = src;
      });
    };

    const drawAllPhotos = async () => {
      // Clear canvas and apply background
      tempCtx.fillStyle = backgroundColor;
      tempCtx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw placeholder borders for empty layout
      if (photos.length === 0) {
        if (isVerticalStackLayout(layout)) {
          for (let i = 0; i < photoCount; i++) {
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
        const imagesToDraw = Math.min(photos.length, photoCount);
        for (let i = 0; i < imagesToDraw; i++) {
          try {
            const img = await loadImage(photos[i]);
            let x: number;
            let y: number;

            if (isVerticalStackLayout(layout)) {
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

      await waitForStripFonts({
        showName,
        showDate,
        nameFont,
        dateFont,
        nameFontSize,
        dateFontSize,
      });

      drawStripText(tempCtx, {
        canvasWidth: canvas.width,
        textAreaStartY,
        name,
        dateText: format(new Date(), "MMMM dd, yyyy").toUpperCase(),
        showName,
        showDate,
        nameColor,
        dateColor,
        nameFont,
        dateFont,
        nameFontSize,
        dateFontSize,
      });

      ctx.canvas.width = canvas.width;
      ctx.canvas.height = canvas.height;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(tempCanvas, 0, 0);
    };

    drawAllPhotos();
  }, [photos, backgroundColor, name, showDate, showName, nameColor, dateColor, nameFont, dateFont, nameFontSize, dateFontSize, layout]);

  const handleDownload = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const fileName = `${name || "photo"}-${format(new Date(), "yyyy-MM-dd")}.png`;

    try {
      const result = await downloadCanvasAsPng(canvas, fileName);
      toast({
        title: result === "opened" ? "Image opened" : "Photo downloaded",
        description:
          result === "opened"
            ? "Tap and hold the image, then choose Save to Photos."
            : "Check your device's downloads folder.",
        variant: "success",
        duration: 3000,
      });
    } catch (error) {
      console.error("Error downloading photo:", error);
      toast({
        title: "Download failed",
        description: "There was an error saving your photo strip.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const handleShare = () => {
    if (onShare && typeof onShare === 'function') {
      onShare();
    } else {
      toast({
        title: "Share not available",
        description: "Share functionality is not available for this photo strip",
        variant: "default",
        duration: 2000,
      });
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full px-2 sm:px-0">
      <div className="w-full max-w-[280px] bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-4 border border-slate-100 dark:border-slate-700">
        <canvas
          ref={canvasRef}
          className="w-full rounded-lg shadow-sm"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      </div>

      {!hideButtons && (
        <div className="flex gap-3 mt-2 flex-wrap justify-center">
          <Button onClick={handleDownload} className="px-4 py-2">
            <Download className="h-4 w-4" />
            <span className="ml-2">Download</span>
          </Button>

          {onSaveToGallery && photos.length > 0 && (
            <Button onClick={onSaveToGallery} variant="outline" className="px-4 py-2">
              <Save className="h-4 w-4" />
              <span className="ml-2">Save</span>
            </Button>
          )}

          {showShareButton && photos.length > 0 && (
            <Button
              onClick={handleShare}
              variant="outline"
              className="px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isShareLoading}
            >
              <Share2 className="h-4 w-4" />
              <span className="ml-2">{isShareLoading ? 'Generating...' : 'Share'}</span>
            </Button>
          )}
        </div>
      )}

      {photoStripId && (
        <ShareModal
          isOpen={showShareModal}
          onClose={() => setShowShareModal(false)}
          photoStripId={photoStripId}
          darkMode={darkMode}
        />
      )}
    </div>
  );
};

export type { FontType, StripFontStyle };