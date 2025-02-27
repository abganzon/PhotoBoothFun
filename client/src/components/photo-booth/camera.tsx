import React, { useRef, useCallback, useState } from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import { Camera as CameraIcon, Repeat, FlipHorizontal } from "lucide-react";

interface CameraProps {
  onCapture: (photo: string) => void;
  isCountingDown: boolean;
  timerDuration: number;
  photosLength: number;
  onMaxPhotos: () => void;
  photos: string[];
  onClear: () => void;
}

export function PhotoBoothCamera({ 
  onCapture, 
  isCountingDown, 
  photosLength, 
  onMaxPhotos,
  photos,
  onClear
}: CameraProps) {
  const webcamRef = useRef<Webcam>(null);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");
  const [mirrored, setMirrored] = useState(true);
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

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Camera Section */}
      <div className="flex-1 space-y-4">
        <div className="relative">
          <div className="aspect-[4/3] bg-black rounded-xl overflow-hidden shadow-2xl border-4 border-white/10">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/png"
              videoConstraints={{
                width: 1920,
                height: 1080,
                facingMode: facingMode,
              }}
              mirrored={mirrored}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setMirrored(!mirrored)}
              className="h-12 w-12 rounded-full bg-white/90 hover:bg-white shadow-lg border-2"
            >
              <FlipHorizontal className="h-6 w-6" />
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
              className="h-12 w-12 rounded-full bg-white shadow-lg hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <CameraIcon className="h-8 w-8 text-primary" />
            </Button>
            
            {isMobile && (
              <Button
                variant="outline"
                size="icon"
                onClick={toggleCamera}
                className="h-12 w-12 rounded-full bg-white/90 hover:bg-white shadow-lg border-2"
              >
                <Repeat className="h-6 w-6" />
              </Button>
            )}
          </div>
        </div>

        {/* Camera Controls */}
        <div className="flex justify-between items-center px-4">
          <div className="text-sm font-medium">
            {photos.length === 0 ? "Click camera to start" : `Photos: ${photos.length}/4`}
          </div>
          <Button
            variant="destructive"
            onClick={onClear}
            disabled={photos.length === 0}
            size="sm"
            className="flex items-center gap-2"
          >
            <Repeat className="h-4 w-4" />
            Clear Photos
          </Button>
        </div>
      </div>

      {/* Preview Grid Section */}
      <div className="w-full lg:w-[300px] bg-gray-50 rounded-xl p-4">
        <div className="grid grid-cols-2 gap-3">
          {[0, 1, 2, 3].map((index) => (
            <div
              key={index}
              className="aspect-[4/3] rounded-lg overflow-hidden border-2 border-white/10 bg-black/50 shadow-md"
            >
              {photos[index] ? (
                <img
                  src={photos[index]}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/30 text-lg">
                  {index + 1}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
