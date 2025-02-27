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
  const { toast } = useToast();

  const handleCapture = (photo: string) => {
    setPhotos((prev) => [...prev, photo]);
    setIsCountingDown(false);

    // Start next photo capture if not reached maximum
    if (photos.length < 3) { // Check for 3 since the new photo hasn't been added to state yet
      setTimeout(() => {
        setIsCountingDown(true);
      }, 1000); // Wait 1 second before starting next countdown
    } else {
      toast({
        title: "Photo Strip Complete",
        description: "Your photo strip is ready to be customized. Make it uniquely yours!",
        variant: "success",
        duration: 3000, // Show for 3 seconds
        className: "font-medium",
      });
    }
  };

  const handleStartPhotoSequence = () => {
    if (photos.length >= 4) {
      toast({
        title: "Maximum photos reached",
        description: "Please clear the strip to take more photos.",
        variant: "destructive",
        duration: 3000, // Show for 3 seconds
      });
      return;
    }
    setPhotos([]); // Clear existing photos
    setIsCountingDown(true); // Start the countdown for first photo
  };

  const handleClear = () => {
    setPhotos([]);
  };


  return (
    <div className="min-h-screen container mx-auto py-4 sm:py-6 bg-gradient-to-b from-blue-50 to-white text-gray-900">
      <div className="flex items-center gap-3 mb-4 sm:mb-6 justify-center">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-lg flex items-center justify-center">
          <Camera className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-gray-900">RoBooth</h1>
      </div>

      <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 h-[calc(100vh-120px)] overflow-hidden">
        <div className="space-y-4 bg-white rounded-lg shadow-sm p-4 sm:p-6 flex flex-col">
          <div className="relative flex-grow flex flex-col">
            <div className="flex-grow">
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
          </div>

          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Button 
                onClick={handleStartPhotoSequence} 
                disabled={isCountingDown}
                className="flex items-center gap-2 text-sm sm:text-base"
                size="sm"
              >
                <Camera className="h-4 w-4" />
                {photos.length === 0 ? "Auto Capture" : `Photos: ${photos.length}/4`}
              </Button>
              <Button
                variant="destructive"
                onClick={handleClear}
                disabled={photos.length === 0}
                className="flex items-center gap-2"
                size="sm"
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
                  className="h-8 w-8 sm:h-10 sm:w-10"
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-center">RoBooth Settings</DialogTitle>
                </DialogHeader>
                <div className="space-y-6 py-4">
                  {/* Timer Duration */}
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

                  {/* Display Options */}
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

                  {/* Colors */}
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
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="space-y-4 bg-white rounded-lg shadow-sm p-4 sm:p-6 overflow-y-auto">
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
              <div className="grid grid-cols-2 gap-3">
                <div 
                  className={`p-3 sm:p-4 border rounded-lg cursor-pointer transition-colors ${
                    layout === "strip" 
                      ? "border-primary bg-primary/10" 
                      : "border-gray-200 hover:border-primary/50"
                  }`}
                  onClick={() => setLayout("strip")}
                >
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-12 sm:w-16 h-20 sm:h-24 bg-gray-200 rounded"></div>
                    <span className="text-sm font-medium">Strip</span>
                  </div>
                </div>
                <div 
                  className={`p-3 sm:p-4 border rounded-lg cursor-pointer transition-colors ${
                    layout === "collage" 
                      ? "border-primary bg-primary/10" 
                      : "border-gray-200 hover:border-primary/50"
                  }`}
                  onClick={() => setLayout("collage")}
                >
                  <div className="flex flex-col items-center gap-1">
                    <div className="grid grid-cols-2 gap-1 w-12 sm:w-16">
                      <div className="aspect-square bg-gray-200 rounded"></div>
                      <div className="aspect-square bg-gray-200 rounded"></div>
                      <div className="aspect-square bg-gray-200 rounded"></div>
                      <div className="aspect-square bg-gray-200 rounded"></div>
                    </div>
                    <span className="text-sm font-medium">Collage</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
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
      </div>
    </div>
  );
}