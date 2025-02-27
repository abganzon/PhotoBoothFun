import React, { useRef, useCallback, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import { Camera as CameraIcon, Repeat, FlipHorizontal } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CameraProps {
  onCapture: (photo: string) => void;
  isCountingDown: boolean;
  timerDuration: number;
  photosLength: number;
  onMaxPhotos: () => void;
}

interface VideoDevice {
  deviceId: string;
  label: string;
}

export function PhotoBoothCamera({ onCapture, isCountingDown, photosLength, onMaxPhotos, timerDuration }: CameraProps) {
  const webcamRef = useRef<Webcam>(null);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");
  const [mirrored, setMirrored] = useState(true);
  const [devices, setDevices] = useState<VideoDevice[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<string>("");
  const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);

  useEffect(() => {
    async function getVideoDevices() {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices
          .filter(device => device.kind === "videoinput")
          .map(device => ({
            deviceId: device.deviceId,
            label: device.label || `Camera ${devices.indexOf(device) + 1}`
          }));
        setDevices(videoDevices);
        if (videoDevices.length > 0 && !selectedDevice) {
          setSelectedDevice(videoDevices[0].deviceId);
        }
      } catch (error) {
        console.error("Error getting video devices:", error);
      }
    }

    // Request permission and get devices
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(() => getVideoDevices())
      .catch(err => console.error("Error accessing camera:", err));
  }, []);

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

  const handleDeviceSelect = (deviceId: string) => {
    setSelectedDevice(deviceId);
  };

  return (
    <div className="relative w-full max-w-[800px] mx-auto">
      {!isMobile && devices.length > 1 && (
        <div className="absolute top-4 left-4 z-10 w-64">
          <Select value={selectedDevice} onValueChange={handleDeviceSelect}>
            <SelectTrigger className="bg-white/90 backdrop-blur-sm">
              <SelectValue placeholder="Select Camera" />
            </SelectTrigger>
            <SelectContent>
              {devices.map((device) => (
                <SelectItem key={device.deviceId} value={device.deviceId}>
                  {device.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="aspect-[4/3] bg-black rounded-xl overflow-hidden shadow-2xl border-4 border-white/10">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/png"
          videoConstraints={{
            width: 1920,
            height: 1080,
            facingMode: isMobile ? facingMode : undefined,
            deviceId: !isMobile ? selectedDevice : undefined,
          }}
          mirrored={mirrored}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setMirrored(!mirrored)}
          className="h-12 w-12 rounded-full bg-white/90 hover:bg-white shadow-lg border-2"
        >
          <FlipHorizontal className="h-6 w-6" />
        </Button>
        
        <Button
          size="icon"
          onClick={() => {
            if (photosLength >= 4) {
              onMaxPhotos();
            } else {
              capture();
            }
          }}
          disabled={isCountingDown}
          className="h-12 w-12 rounded-full bg-white shadow-lg hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <CameraIcon className="h-8 w-8 text-primary" />
        </Button>
        
        {isMobile && (
          <Button
            variant="outline"
            size="icon"
            onClick={toggleCamera}
            className="h-12 w-12 rounded-full bg-white/90 hover:bg-white shadow-lg border-2"
          >
            <Repeat className="h-6 w-6" />
          </Button>
        )}
      </div>
    </div>
  );
}
