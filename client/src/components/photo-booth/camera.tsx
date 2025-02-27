import React, { useRef, useCallback, useState } from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import { Camera as CameraIcon, Repeat, FlipHorizontal, ZoomIn, ZoomOut } from "lucide-react";

interface CameraProps {
  onCapture: (photo: string) => void;
  isCountingDown: boolean;
  timerDuration: number;
  photosLength: number;
  onMaxPhotos: () => void;
}

export function PhotoBoothCamera({ onCapture, isCountingDown, photosLength, onMaxPhotos }: CameraProps) {
  const webcamRef = useRef<Webcam>(null);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");
  const [mirrored, setMirrored] = useState(true);
  const [zoom, setZoom] = useState(1);
  const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);

  const capture = useCallback(() => {
    const webcam = webcamRef.current;
    if (webcam) {
      const photo = webcam.getScreenshot();
      if (photo) {
        onCapture(photo);
      }
    }
  }, [onCapture]);

  const toggleCamera = () => {
    setFacingMode(prev => prev === "user" ? "environment" : "user");
  };

  const toggleZoom = () => {
    setZoom(prev => prev === 1 ? 0.5 : 1);
  };

  return (
    <div className="relative w-full max-w-[800px] mx-auto">
      <div className="aspect-[4/3] bg-black rounded-xl overflow-hidden shadow-2xl border-4 border-white/10">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/png"
          videoConstraints={{
            width: 1920,
            height: 1080,
            facingMode: facingMode,
            zoom: zoom,
            advanced: [{ zoom: zoom }]
          }}
          mirrored={mirrored}
          className="w-full h-full object-cover"
          style={{ transform: `scale(${zoom})` }}
        />
      </div>
      
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-3 sm:gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setMirrored(!mirrored)}
          className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white/90 hover:bg-white shadow-lg border-2"
        >
          <FlipHorizontal className="h-5 w-5 sm:h-6 sm:w-6" />
        </Button>
        
        <div className="flex flex-col gap-2 items-center">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleZoom}
            className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-white/90 hover:bg-white shadow-lg border-2 mb-1"
          >
            {zoom === 1 ? (
              <ZoomOut className="h-4 w-4 sm:h-5 sm:w-5" />
            ) : (
              <ZoomIn className="h-4 w-4 sm:h-5 sm:w-5" />
            )}
          </Button>
          
          <Button
            size="icon"
            onClick={() => {
              if (photosLength >= 4) {
                onMaxPhotos();
              } else {
                capture();
              }
            }}
            disabled={isCountingDown}
            className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white shadow-lg hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <CameraIcon className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
          </Button>
        </div>
        
        {isMobile && (
          <Button
            variant="outline"
            size="icon"
            onClick={toggleCamera}
            className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white/90 hover:bg-white shadow-lg border-2"
          >
            <Repeat className="h-5 w-5 sm:h-6 sm:w-6" />
          </Button>
        )}
      </div>
    </div>
  );
}
