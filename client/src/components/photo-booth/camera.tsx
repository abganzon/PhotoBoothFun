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
  onStartPhotoSequence: () => void;
  onClear: () => void;
}

export function PhotoBoothCamera({ 
  onCapture, 
  isCountingDown, 
  photosLength, 
  onMaxPhotos, 
  photos,
  onStartPhotoSequence,
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
    <div className="grid grid-cols-2 gap-6">
      {/* Left Column - Camera and Controls */}
      <div className="space-y-6">
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

        {/* Camera Controls */}
        <div className="flex gap-4 items-center">
          <Button 
            onClick={onStartPhotoSequence}
            disabled={isCountingDown}
            className="flex-1 flex items-center justify-center gap-2"
          >
            <CameraIcon className="h-4 w-4" />
            {photos.length === 0 ? "Start Photo Session" : `Photos: ${photos.length}/4`}
          </Button>
          <Button
            variant="destructive"
            onClick={onClear}
            disabled={photos.length === 0}
            className="flex items-center gap-2"
          >
            <Repeat className="h-4 w-4" />
            Clear
          </Button>
        </div>
      </div>

      {/* Right Column - Photo Preview Grid */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Photo Preview</h3>
        <div className="grid grid-cols-2 gap-4">
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
                <div className="w-full h-full flex items-center justify-center text-white/30">
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
