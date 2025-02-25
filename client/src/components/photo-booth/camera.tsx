import React, { useRef, useCallback } from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";

interface CameraProps {
  onCapture: (photo: string) => void;
  isCountingDown: boolean;
}

export function PhotoBoothCamera({ onCapture, isCountingDown }: CameraProps) {
  const webcamRef = useRef<Webcam>(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      onCapture(imageSrc);
    }
  }, [onCapture]);

  return (
    <div className="relative">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={{
          width: 1280,
          height: 720,
          facingMode: "user",
        }}
        className="w-full rounded-lg shadow-lg"
      />
      <Button
        onClick={capture}
        disabled={isCountingDown}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
        size="lg"
      >
        <Camera className="mr-2 h-4 w-4" />
        Take Photo
      </Button>
    </div>
  );
}
