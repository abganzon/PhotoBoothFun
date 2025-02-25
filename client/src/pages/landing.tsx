
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Camera, Heart, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function Landing() {
  const [, setLocation] = useLocation();
  const [visitors, setVisitors] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setVisitors(prev => prev + 1);
  }, []);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-b from-blue-50 to-white'}`}>
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
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
            <Camera className="h-8 w-8 text-white" />
          </div>
        </div>
        <div className="flex gap-4">
          <Button
            size="icon"
            onClick={() => setLocation("/booth")}
            className="h-14 w-14 rounded-full"
          >
            <Camera className="h-8 w-8" />
          </Button>
        </div>
      </div>
    </div>
  );
}
