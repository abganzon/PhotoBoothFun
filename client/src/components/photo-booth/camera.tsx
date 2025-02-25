import React, { useRef, useCallback, useState } from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import { Camera, RotateCw } from "lucide-react";

interface CameraProps {
  onCapture: (photo: string) => void;
  isCountingDown: boolean;
}

export function PhotoBoothCamera({ onCapture, isCountingDown }: CameraProps) {
  const webcamRef = useRef<Webcam>(null);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");
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

  return (
    <div className="relative w-full max-w-[800px] mx-auto px-4 sm:px-6">
      <div className="aspect-square w-full">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{
            width: 1080,
            height: 1080,
            facingMode: facingMode,
          }}
          className="w-full h-full rounded-lg shadow-lg"
        />
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {isMobile && (
          <Button 
            onClick={toggleCamera} 
            variant="secondary"
            size="icon"
            className="opacity-75 h-12 w-12"
          >
            <RotateCw className="h-6 w-6" />
          </Button>
        )}
        <Button
          onClick={capture}
          disabled={isCountingDown}
          size="lg"
          className="h-12"
        >
          <Camera className="mr-2 h-5 w-5" />
          Take Photo
        </Button>
      </div>
    </div>
  );
}
