import React, { useEffect, useState } from "react";

interface CountdownProps {
  isActive: boolean;
  onComplete: (image: string) => void;
  duration?: number;
}

export function Countdown({ isActive, onComplete, duration = 5 }: CountdownProps) {
  const [count, setCount] = useState(duration);

  useEffect(() => {
    if (!isActive) {
      setCount(duration);
      return;
    }

    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Trigger the webcam capture
          setTimeout(() => {
            const webcamElement = document.querySelector('video');
            if (webcamElement) {
              const canvas = document.createElement('canvas');
              canvas.width = webcamElement.videoWidth;
              canvas.height = webcamElement.videoHeight;
              const ctx = canvas.getContext('2d');
              if (ctx) {
                ctx.drawImage(webcamElement, 0, 0);
                const imageData = canvas.toDataURL('image/jpeg');
                onComplete(imageData);
              }
            }
          }, 0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, onComplete, duration]);

  if (!isActive) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
      <span className="text-9xl font-bold text-white">{count}</span>
    </div>
  );
}