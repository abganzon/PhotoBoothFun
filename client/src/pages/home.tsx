import React, { useState, useEffect } from "react";
import { PhotoBoothCamera } from "@/components/photo-booth/camera";
import { Countdown } from "@/components/photo-booth/countdown";
import { ColorPicker } from "@/components/photo-booth/color-picker";
import { PhotoStrip } from "@/components/photo-booth/photo-strip";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Camera, Trash2, Settings, Repeat, Download, ChevronLeft, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { StepProgress } from "@/components/photo-booth/step-progress";
import { useLocation } from 'wouter';

export default function Home() {
  const [photos, setPhotos] = useState<string[]>([]);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("#E1D9D1");
  const [stripName, setStripName] = useState("");
  const [showDate, setShowDate] = useState(true);
  const [showName, setShowName] = useState(true);
  const [nameColor, setNameColor] = useState("#000000");
  const [dateColor, setDateColor] = useState("#666666");
  const [layout, setLayout] = useState<"strip" | "collage">("strip");
  const [timerDuration, setTimerDuration] = useState(5);
  const [darkMode, setDarkMode] = useState(() => {
    // Initialize from localStorage if available
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('darkMode');
      return saved ? JSON.parse(saved) : false;
    }
    return false;
  });
  const { toast } = useToast();
  const [location, setLocation] = useLocation();
  const [currentStep, setCurrentStep] = useState(0);

  // Persist dark mode preference
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    // Apply dark mode to document
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleCapture = (photo: string) => {
    setPhotos((prev) => [...prev, photo]);
    setIsCountingDown(false);

    // If auto capture is in progress and we haven't reached 4 photos yet
    if (isCountingDown && photos.length < 3) {
      // Wait a moment before starting the next countdown
      setTimeout(() => {
        setIsCountingDown(true);
      }, 1500);
    }
  };

  const handleStartPhotoSequence = () => {
    if (photos.length >= 4) {
      toast({
        title: "Maximum photos reached",
        description: "Please clear the photos to start over.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    // Clear existing photos when starting a new sequence
    setPhotos([]);
    // Start the countdown for the first photo
    setIsCountingDown(true);
  };

  const handleClear = () => {
    setPhotos([]);
  };

  const handleRetakePhoto = (index: number) => {
    const updatedPhotos = [...photos];
    updatedPhotos.splice(index, 1);
    setPhotos(updatedPhotos);
    
    toast({
      title: "Photo removed",
      description: `Photo ${index + 1} has been removed. You can now capture a new one.`,
      variant: "default",
      duration: 2000,
    });
  };

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 1));
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className={`container mx-auto py-8 ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gradient-to-b from-blue-50 to-white text-gray-900'}`}>
      <div className="flex items-center gap-4 mb-8 justify-center">
        <div className={`w-12 h-12 ${darkMode ? 'bg-blue-500' : 'bg-primary'} rounded-lg flex items-center justify-center`}>
          <Camera className="h-8 w-8 text-white" />
        </div>
        <button onClick={() => setLocation('/')} className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} cursor-pointer`}>RoBooth</button>
      </div>

      <div className="mt-8">
        {currentStep === 0 ? (
          <div className={`space-y-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm p-6 max-w-5xl mx-auto`}>
            <div className="grid md:grid-cols-[1fr,300px] gap-6">
              {/* Camera Section */}
              <div className="space-y-4">
                <div className="relative">
                  <PhotoBoothCamera
                    onCapture={handleCapture}
                    isCountingDown={isCountingDown}
                    timerDuration={timerDuration}
                    photosLength={photos.length}
                    onMaxPhotos={() => {
                      toast({
                        title: "Maximum photos reached",
                        description: "Please clear the photos to start over.",
                        variant: "destructive",
                      });
                    }}
                  />
                  <Countdown
                    isActive={isCountingDown}
                    onComplete={handleCapture}
                    duration={timerDuration}
                  />
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    {photos.length < 4 ? (
                      <Button 
                        onClick={handleStartPhotoSequence} 
                        disabled={isCountingDown}
                        className="flex items-center gap-2"
                      >
                        <Camera className="h-4 w-4" />
                        Auto Capture
                      </Button>
                    ) : (
                      <Button 
                        onClick={handleNext}
                        className="flex items-center gap-2"
                      >
                        Next
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      onClick={handleClear}
                      disabled={photos.length === 0}
                      className="flex items-center gap-2"
                    >
                      <Repeat className="h-4 w-4" />
                      Retake
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="flex items-center justify-center w-10 h-10 p-0"
                        >
                          <Settings className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-bold text-left">RoBooth Settings</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-6 py-4">
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="timer-duration">Timer Duration (seconds)</Label>
                              <div className="flex items-center gap-4">
                                <Input
                                  id="timer-duration"
                                  type="number"
                                  min="1"
                                  max="10"
                                  value={timerDuration}
                                  onChange={(e) => setTimerDuration(parseInt(e.target.value) || 5)}
                                  className="w-24"
                                />
                                <span className="text-sm text-gray-500">Countdown time before each photo</span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between pt-2">
                              <div className="space-y-0.5">
                                <Label htmlFor="dark-mode">Dark Mode</Label>
                                <p className="text-sm text-gray-500">Enable dark theme</p>
                              </div>
                              <Switch
                                id="dark-mode"
                                checked={darkMode}
                                onCheckedChange={setDarkMode}
                              />
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>

              {/* Preview Grid */}
              
              <div className="space-y-3">
                  <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Photo Preview
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <div
                        key={index}
                        className={`aspect-[4/3] rounded-xl border-2 transition-all duration-300 ${
                          photos[index] 
                            ? 'border-green-400 bg-green-50 shadow-md hover:shadow-lg' 
                            : index === photos.length
                            ? 'border-blue-400 bg-blue-50 animate-pulse'
                            : 'border-gray-300 bg-gray-50 hover:border-gray-400'
                        } ${darkMode ? 'dark:border-gray-600 dark:bg-gray-800' : ''} 
                        flex items-center justify-center relative overflow-hidden group cursor-pointer`}
                        onClick={() => {
                          if (photos[index]) {
                            handleRetakePhoto(index);
                          }
                        }}
                      >
                        {photos[index] ? (
                          <>
                            <img
                              src={photos[index]}
                              alt={`Captured ${index + 1}`}
                              className="w-full h-full object-cover rounded-lg"
                            />
                            <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                              ✓
                            </div>
                            {/* Hover overlay for retake */}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center rounded-lg">
                              <div className="text-white text-center">
                                <Trash2 className="h-6 w-6 mx-auto mb-1" />
                                <span className="text-xs font-medium">Retake</span>
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="text-center">
                            <div className={`w-10 h-10 rounded-full ${
                              index === photos.length 
                                ? 'bg-blue-100 border-2 border-blue-400' 
                                : 'bg-gray-100 border-2 border-gray-300'
                            } flex items-center justify-center mb-2 transition-all duration-300`}>
                              <Camera className={`h-5 w-5 ${
                                index === photos.length ? 'text-blue-500' : 'text-gray-400'
                              }`} />
                            </div>
                            <span className={`text-xs font-medium ${
                              index === photos.length ? 'text-blue-600' : 'text-gray-500'
                            }`}>
                              {index === photos.length ? 'Next' : `Photo ${index + 1}`}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  {photos.length > 0 && (
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} text-center`}>
                      Click on any photo to retake it
                    </p>
                  )}
                </div>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            <div className={`space-y-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm p-6`}>
              <div className="flex items-center mb-4">
                <Button
                  onClick={handlePrevious}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="strip-name" className={darkMode ? 'text-white' : ''}>Strip Name</Label>
                  <Input
                    id="strip-name"
                    value={stripName}
                    onChange={(e) => setStripName(e.target.value)}
                    placeholder="Enter a name for your strip"
                    className={`${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' : 'bg-white'}`}
                  />
                </div>

                <div className="space-y-2">
                  <Label className={darkMode ? 'text-white' : ''}>Layout Style</Label>
                  <div className="flex gap-4">
                    <div 
                      className={`flex-1 p-4 border rounded-lg cursor-pointer transition-colors ${
                        layout === "strip" 
                          ? darkMode 
                            ? "border-blue-500 bg-blue-500/10" 
                            : "border-primary bg-primary/10"
                          : darkMode
                            ? "border-gray-600 hover:border-blue-500/50 bg-gray-700"
                            : "border-gray-200 hover:border-primary/50"
                      }`}
                      onClick={() => setLayout("strip")}
                    >
                      <div className="flex flex-col items-center gap-1">
                        <div className={`w-20 h-[120px] ${darkMode ? 'bg-gray-600' : 'bg-gray-200'} rounded flex flex-col gap-1 p-1`}>
                          {[...Array(4)].map((_, i) => (
                            <div key={i} className={`flex-1 ${darkMode ? 'bg-gray-700' : 'bg-white'} rounded`} />
                          ))}
                        </div>
                        <span className={`text-sm font-medium ${darkMode ? 'text-white' : ''}`}>Strip</span>
                        <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>1x4 Layout</span>
                      </div>
                    </div>
                    <div 
                      className={`flex-1 p-4 border rounded-lg cursor-pointer transition-colors ${
                        layout === "collage" 
                          ? darkMode 
                            ? "border-blue-500 bg-blue-500/10" 
                            : "border-primary bg-primary/10"
                          : darkMode
                            ? "border-gray-600 hover:border-blue-500/50 bg-gray-700"
                            : "border-gray-200 hover:border-primary/50"
                      }`}
                      onClick={() => setLayout("collage")}
                    >
                      <div className="flex flex-col items-center gap-1">
                        <div className={`w-24 h-24 ${darkMode ? 'bg-gray-600' : 'bg-gray-200'} rounded grid grid-cols-2 gap-1 p-1`}>
                          {[...Array(4)].map((_, i) => (
                            <div key={i} className={`aspect-[4/3] ${darkMode ? 'bg-gray-700' : 'bg-white'} rounded`} />
                          ))}
                        </div>
                        <span className={`text-sm font-medium ${darkMode ? 'text-white' : ''}`}>Collage</span>
                        <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>2x2 Grid</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className={darkMode ? 'text-white' : ''}>Display Options</Label>
                  <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-4 space-y-4`}>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="show-name" className={darkMode ? 'text-white' : ''}>Show Strip Name</Label>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Display name above photos</p>
                      </div>
                      <Switch
                        id="show-name"
                        checked={showName}
                        onCheckedChange={setShowName}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="show-date" className={darkMode ? 'text-white' : ''}>Show Date</Label>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Include today's date</p>
                      </div>
                      <Switch
                        id="show-date"
                        checked={showDate}
                        onCheckedChange={setShowDate}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className={darkMode ? 'text-white' : ''}>Colors</Label>
                  <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-4 space-y-4`}>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="background-color" className={darkMode ? 'text-white' : ''}>Background</Label>
                        <input
                          type="color"
                          value={backgroundColor}
                          onChange={(e) => setBackgroundColor(e.target.value)}
                          className="h-8 w-16 rounded cursor-pointer"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="name-color" className={darkMode ? 'text-white' : ''}>Name Color</Label>
                        <input
                          type="color"
                          value={nameColor}
                          onChange={(e) => setNameColor(e.target.value)}
                          className="h-8 w-16 rounded cursor-pointer"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="date-color" className={darkMode ? 'text-white' : ''}>Date Color</Label>
                        <input
                          type="color"
                          value={dateColor}
                          onChange={(e) => setDateColor(e.target.value)}
                          className="h-8 w-16 rounded cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className={`w-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-xl p-4`}>
                <div className={`mx-auto ${layout === 'strip' ? 'max-w-[300px]' : 'max-w-[600px]'}`}>
                  <PhotoStrip
                    photos={photos}
                    layout={layout}
                    name={stripName}
                    showDate={showDate}
                    showName={showName}
                    backgroundColor={backgroundColor}
                    nameColor={nameColor}
                    dateColor={dateColor}
                    darkMode={darkMode}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}