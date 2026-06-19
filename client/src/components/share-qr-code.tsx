import { useEffect, useState } from "react";
import QRCode from "react-qr-code";

interface ShareQrCodeProps {
  value: string;
  maxSize?: number;
}

export function ShareQrCode({ value, maxSize = 256 }: ShareQrCodeProps) {
  const [size, setSize] = useState(maxSize);

  useEffect(() => {
    const updateSize = () => {
      setSize(Math.min(maxSize, window.innerWidth - 96));
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [maxSize]);

  return (
    <div className="flex w-full justify-center">
      <QRCode value={value} size={size} className="block h-auto max-w-full" />
    </div>
  );
}
