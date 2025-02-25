
import React, { useRef, useCallback, useState } from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import { Camera as CameraIcon, Repeat, FlipHorizontal } from "lucide-react";

interface CameraProps {
  onCapture: (photo: string) => void;
  isCountingDown: boolean;
}

export function PhotoBoothCamera({ onCapture, isCountingDown }: CameraProps) {
  const webcamRef = useRef<Webcam>(null);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");
  const [mirrored, setMirrored] = useState(true);
  const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);

  const capture = useCallback(() => {
    const webcam = webcamRef.current;
    if (!webcam) return;

    const photo = webcam.getScreenshot();
    if (photo) {
      onCapture(photo);
    }
  }, [onCapture]);

  const toggleCamera = () => {
    setFacingMode(prev => prev === "user" ? "environment" : "user");
  };

  const handleSwitchCamera = () => {
    toggleCamera();
  };

  return (
    <div className="relative w-full max-w-[600px] mx-auto px-4 sm:px-6">
      <div className="aspect-video bg-black rounded-lg overflow-hidden">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/png"
          videoConstraints={{
            width: 1280,
            height: 720,
            facingMode: facingMode,
          }}
          mirrored={mirrored}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-6">
        <Button
          variant="secondary"
          size="icon"
          onClick={() => setMirrored(!mirrored)}
          className="bg-white/95 hover:bg-white shadow-lg"
        >
          <FlipHorizontal className="h-5 w-5 text-gray-700" />
        </Button>
        <Button
          size="icon"
          onClick={capture}
          disabled={isCountingDown}
          className="w-20 h-20 bg-white/95 hover:bg-white shadow-lg rounded-full border-4 border-primary"
        >
          <CameraIcon className="h-10 w-10 text-primary" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          onClick={handleSwitchCamera}
          className="bg-white/95 hover:bg-white shadow-lg"
        >
          <Repeat className="h-5 w-5 text-gray-700" />
        </Button>
      </div>
    </div>
  );
}
