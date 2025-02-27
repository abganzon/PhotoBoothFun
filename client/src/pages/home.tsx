import React, { useState } from "react";
import { PhotoBoothCamera } from "@/components/photo-booth/camera";
import { Countdown } from "@/components/photo-booth/countdown";
import { ColorPicker } from "@/components/photo-booth/color-picker";
import { PhotoStrip } from "@/components/photo-booth/photo-strip";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Camera, Trash2, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { StepProgress } from "@/components/photo-booth/step-progress";

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0);
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
  const { toast } = useToast();

  const handleCapture = (photo: string) => {
    setPhotos((prev) => [...prev, photo]);
    setIsCountingDown(false);

    if (photos.length < 3) {
      setTimeout(() => {
        setIsCountingDown(true);
      }, 1000);
    } else {
      toast({
        title: "Photo Strip Complete",
        description: "Your photo strip is ready to be customized. Make it uniquely yours!",
        variant: "success",
        duration: 3000,
        className: "font-medium",
      });
      setCurrentStep(1); // Automatically move to customization step
    }
  };

  const handleStartPhotoSequence = () => {
    if (photos.length >= 4) {
      toast({
        title: "Maximum photos reached",
        description: "Please clear the strip to take more photos.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    setPhotos([]);
    setIsCountingDown(true);
  };

  const handleClear = () => {
    setPhotos([]);
  };

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 1));
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="container mx-auto py-8 bg-gradient-to-b from-blue-50 to-white text-gray-900">
      <div className="flex items-center gap-4 mb-8 justify-center">
        <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
          <Camera className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900">RoBooth</h1>
      </div>

      <StepProgress
        currentStep={currentStep}
        onNext={handleNext}
        onPrevious={handlePrevious}
        disableNext={currentStep === 0 && photos.length < 4}
      />

      <div className="mt-8">
        {currentStep === 0 ? (
          // Camera Step
          <div className="space-y-6 bg-white rounded-lg shadow-sm p-6 max-w-5xl mx-auto">
            <div className="flex gap-8">
              <div className="flex-1">
                <div className="relative">
                  <PhotoBoothCamera
                    onCapture={handleCapture}
                    isCountingDown={isCountingDown}
                    timerDuration={timerDuration}
                    photosLength={photos.length}
                    onMaxPhotos={() => {
                      toast({
                        title: "Maximum photos reached",
                        description: "Please clear the strip to take more photos.",
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

                <div className="flex justify-between items-center mt-6">
                  <div className="flex gap-2">
                    <Button 
                      onClick={handleStartPhotoSequence} 
                      disabled={isCountingDown}
                      className="flex items-center gap-2"
                    >
                      <Camera className="h-4 w-4" />
                      {photos.length === 0 ? "Auto Capture" : `Photos: ${photos.length}/4`}
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={handleClear}
                      disabled={photos.length === 0}
                      className="flex items-center gap-2"
                    >
                      <Trash2 className="h-4 w-4" />
                      Clear
                    </Button>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-10 w-10"
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-center">RoBooth Settings</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-6 py-4">
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
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              {/* Captured Photos Preview */}
              <div className="w-[2in] flex flex-col gap-4">
                <h3 className="text-lg font-semibold text-center">Captured Photos</h3>
                <div className="space-y-4">
                  {[0, 1, 2, 3].map((index) => (
                    <div
                      key={index}
                      className="w-[2in] h-[2in] border-2 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center"
                    >
                      {photos[index] ? (
                        <img
                          src={photos[index]}
                          alt={`Photo ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-gray-400">Photo {index + 1}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Customization Step
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6 bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold">Customize Your Strip</h2>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="strip-name">Strip Name</Label>
                  <Input
                    id="strip-name"
                    value={stripName}
                    onChange={(e) => setStripName(e.target.value)}
                    placeholder="Enter a name for your strip"
                    className="bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Layout Style</Label>
                  <div className="flex gap-4">
                    <div 
                      className={`flex-1 p-4 border rounded-lg cursor-pointer transition-colors ${
                        layout === "strip" 
                          ? "border-primary bg-primary/10" 
                          : "border-gray-200 hover:border-primary/50"
                      }`}
                      onClick={() => setLayout("strip")}
                    >
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-16 h-24 bg-gray-200 rounded"></div>
                        <span className="text-sm font-medium">Strip</span>
                        <span className="text-xs text-gray-500">1x4 Layout</span>
                      </div>
                    </div>
                    <div 
                      className={`flex-1 p-4 border rounded-lg cursor-pointer transition-colors ${
                        layout === "collage" 
                          ? "border-primary bg-primary/10" 
                          : "border-gray-200 hover:border-primary/50"
                      }`}
                      onClick={() => setLayout("collage")}
                    >
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-20 h-20 bg-gray-200 rounded grid grid-cols-2 gap-1 p-1">
                          <div className="bg-white rounded"></div>
                          <div className="bg-white rounded"></div>
                          <div className="bg-white rounded"></div>
                          <div className="bg-white rounded"></div>
                        </div>
                        <span className="text-sm font-medium">Collage</span>
                        <span className="text-xs text-gray-500">2x2 Grid</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Display Options</Label>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="show-name">Show Strip Name</Label>
                        <p className="text-sm text-gray-500">Display name above photos</p>
                      </div>
                      <Switch
                        id="show-name"
                        checked={showName}
                        onCheckedChange={setShowName}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="show-date">Show Date</Label>
                        <p className="text-sm text-gray-500">Include today's date</p>
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
                  <Label>Colors</Label>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="background-color">Background</Label>
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
                        <Label htmlFor="name-color">Name Color</Label>
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
                        <Label htmlFor="date-color">Date Color</Label>
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
              <h2 className="text-xl font-semibold">Strip Preview</h2>
              <PhotoStrip
                photos={photos}
                layout={layout}
                name={stripName}
                showDate={showDate}
                showName={showName}
                backgroundColor={backgroundColor}
                nameColor={nameColor}
                dateColor={dateColor}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}