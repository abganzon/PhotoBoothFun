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
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      if (isMobile) {
        // Create a temporary link to download the image
        const link = document.createElement('a');
        link.href = imageSrc;
        link.download = `photo-${Date.now()}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      onCapture(imageSrc);
    }
  }, [onCapture, isMobile]);

  const toggleCamera = () => {
    setFacingMode(prev => prev === "user" ? "environment" : "user");
  };

  const handleSwitchCamera = () => {
    toggleCamera();
  };

  return (
    <div className="relative w-full max-w-[800px] mx-auto px-4 sm:px-6">
      <div className="aspect-square w-full">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/png"
          videoConstraints={{
            width: 1080,
            height: 1080,
            facingMode: facingMode,
          }}
          mirrored={mirrored}
          className="w-full h-full rounded-lg shadow-lg"
        />
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setMirrored(!mirrored)}
          className="bg-white/90 hover:bg-white"
        >
          <FlipHorizontal className="h-5 w-5" />
        </Button>
        <Button
          size="icon"
          onClick={capture}
          disabled={isCountingDown}
          className="w-16 h-16 bg-white/90 hover:bg-white rounded-full"
        >
          <CameraIcon className="h-8 w-8" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleSwitchCamera}
          className="bg-white/90 hover:bg-white"
        >
          <Repeat className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
