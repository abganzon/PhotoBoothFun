
import React, { useRef, useCallback, useState } from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import { Camera as CameraIcon, Repeat, FlipHorizontal } from "lucide-react";

interface CameraProps {
  onCapture: (photo: string) => void;
  isCountingDown: boolean;
  timerDuration: number;
}

export function PhotoBoothCamera({ onCapture, isCountingDown }: CameraProps) {
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
          className="h-12 w-12 rounded-full bg-white/90 hover:bg-white shadow-lg border-2"
        >
          <FlipHorizontal className="h-6 w-6" />
        </Button>
        
        <Button
          size="icon"
          onClick={capture}
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
  );
}
