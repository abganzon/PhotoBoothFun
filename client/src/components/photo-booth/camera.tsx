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
}

export function PhotoBoothCamera({ onCapture, isCountingDown, photosLength, onMaxPhotos }: CameraProps) {
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
          }}
          mirrored={mirrored}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setMirrored(!mirrored)}
          className="h-14 w-14 rounded-full bg-white/95 hover:bg-white shadow-xl border-2 border-gray-200 hover:border-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-600 transition-all duration-300"
          title="Mirror camera"
        >
          <FlipHorizontal className="h-6 w-6 dark:text-white" />
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
          className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-300"
        >
          <CameraIcon className="h-8 w-8 text-white" />
        </Button>
        
        {isMobile && (
          <Button
            variant="outline"
            size="icon"
            onClick={toggleCamera}
            className="h-14 w-14 rounded-full bg-white/95 hover:bg-white shadow-xl border-2 border-gray-200 hover:border-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-600 transition-all duration-300"
            title="Switch camera"
          >
            <Repeat className="h-6 w-6 dark:text-white" />
          </Button>
        )}
      </div>
    </div>
  );
}
