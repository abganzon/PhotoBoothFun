import React, { useRef, useCallback, useState } from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import { Camera as CameraIcon, Repeat, FlipHorizontal } from "lucide-react";

interface CameraProps {
  onCapture: (photo: string) => void;
  isCountingDown: boolean;
  timerDuration: number;
  photosLength: number;
  maxPhotos: number;
  recaptureIndex: number | null;
  onMaxPhotos: () => void;
}

export function PhotoBoothCamera({
  onCapture,
  isCountingDown,
  photosLength,
  maxPhotos,
  recaptureIndex,
  onMaxPhotos,
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

  const handleShutter = () => {
    if (recaptureIndex !== null) {
      capture();
    } else if (photosLength >= maxPhotos) {
      onMaxPhotos();
    } else {
      capture();
    }
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden shadow-xl ring-1 ring-slate-200/80 dark:ring-slate-700 bg-slate-900">
      <div className="aspect-[4/3] relative bg-slate-950">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/png"
          videoConstraints={{
            width: 1920,
            height: 1080,
            facingMode,
          }}
          mirrored={mirrored}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none" />

        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-4 z-10">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setMirrored(!mirrored)}
            disabled={isCountingDown}
            className="h-12 w-12 rounded-full bg-white/95 hover:bg-white border-0 shadow-lg backdrop-blur-sm transition-all"
            title="Mirror camera"
          >
            <FlipHorizontal className="h-5 w-5 text-slate-700" />
          </Button>

          <Button
            size="icon"
            onClick={handleShutter}
            disabled={isCountingDown}
            className="h-12 w-12 rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 border-2 border-white/30 shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:scale-100 transition-all duration-200"
            title="Take photo"
          >
            <CameraIcon className="h-5 w-5 text-white" />
          </Button>

          {isMobile && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => setFacingMode((prev) => (prev === "user" ? "environment" : "user"))}
              disabled={isCountingDown}
              className="h-12 w-12 rounded-full bg-white/95 hover:bg-white border-0 shadow-lg backdrop-blur-sm transition-all"
              title="Switch camera"
            >
              <Repeat className="h-5 w-5 text-slate-700" />
            </Button>
          )}
        </div>

        {isCountingDown && (
          <div className="absolute inset-0 bg-black/25 pointer-events-none z-[5]" />
        )}
      </div>
    </div>
  );
}
