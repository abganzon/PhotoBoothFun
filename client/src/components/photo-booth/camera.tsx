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
}

export function PhotoBoothCamera({ onCapture, isCountingDown, photosLength, onMaxPhotos, photos }: CameraProps) {
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
    <div className="flex gap-6">
      <div className="relative w-full max-w-[800px]">
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
          {isMobile && (
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full"
              onClick={toggleCamera}
            >
              <Repeat className="h-5 w-5" />
            </Button>
          )}
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full"
            onClick={() => setMirrored(!mirrored)}
          >
            <FlipHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Preview Section */}
      <div className="w-[220px] flex flex-col gap-3">
        {photos.map((photo, index) => (
          <div
            key={index}
            className="w-[220px] h-[165px] rounded-lg overflow-hidden border-2 border-white/10"
          >
            <img
              src={photo}
              alt={`Preview ${index + 1}`}
              className="w-full h-full object-contain bg-black"
            />
          </div>
        ))}
        {Array.from({ length: 4 - photos.length }).map((_, index) => (
          <div
            key={`empty-${index}`}
            className="w-[220px] h-[165px] rounded-lg border-2 border-white/10 bg-black/50"
          />
        ))}
      </div>
    </div>
  );
}
