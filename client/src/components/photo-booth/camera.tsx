
import React, { useRef, useCallback, useState } from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";

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
    <div className="relative w-full max-w-2xl mx-auto">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={{
          width: 1280,
          height: 720,
          facingMode: facingMode,
        }}
        className="w-full rounded-lg shadow-lg"
      />
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {isMobile && (
          <Button 
            onClick={toggleCamera} 
            variant="secondary"
            size="lg"
            className="opacity-75"
          >
            Flip Camera
          </Button>
        )}
        <Button
          onClick={capture}
          disabled={isCountingDown}
          size="lg"
        >
          <Camera className="mr-2 h-4 w-4" />
          Take Photo
        </Button>
      </div>
    </div>
  );
}
