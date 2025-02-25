import React, { useEffect, useState } from "react";

interface CountdownProps {
  isActive: boolean;
  onComplete: () => void;
}

export function Countdown({ isActive, onComplete }: CountdownProps) {
  const [count, setCount] = useState(5);

  useEffect(() => {
    if (!isActive) {
      setCount(5);
      return;
    }

    if (count === 0) {
      onComplete();
      return;
    }

    const timer = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [count, isActive, onComplete]);

  if (!isActive) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
      <span className="text-9xl font-bold text-white">{count}</span>
    </div>
  );
}
