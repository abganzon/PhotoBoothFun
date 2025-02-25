
import { useState, useEffect } from "react";
import { Camera, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [photos, setPhotos] = useState([]);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleStartPhotoSequence = () => {
    setIsCountingDown(true);
    // Add your photo sequence logic here
  };

  return (
    <div className={`container mx-auto py-8 transition-colors duration-200 ${
      isDarkMode 
        ? 'dark bg-gray-900 text-white' 
        : 'bg-white text-gray-900'
    }`}>
      <div className="absolute top-4 right-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`rounded-full p-2 ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
        >
          {isDarkMode ? (
            <Sun className="h-6 w-6 text-yellow-400" />
          ) : (
            <Moon className="h-6 w-6 text-gray-600" />
          )}
        </Button>
      </div>
      <div className="flex items-center gap-4 mb-8 justify-center">
        <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
          <Camera className="h-8 w-8 text-white" />
        </div>
      </div>
      <div className="flex justify-center gap-2">
        <Button 
          onClick={handleStartPhotoSequence} 
          disabled={isCountingDown}
          className="flex items-center gap-2"
        >
          <Camera className="h-5 w-5" />
          {photos.length === 0 ? "Auto Capture" : `Photos: ${photos.length}/4`}
        </Button>
      </div>
    </div>
  );
}
