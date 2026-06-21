import React, { useState, useEffect, useRef } from "react";
import { apiFetch } from "@/lib/api";
import { PhotoBoothCamera } from "@/components/photo-booth/camera";
import { Countdown } from "@/components/photo-booth/countdown";
import { ColorPicker } from "@/components/photo-booth/color-picker";
import { PhotoStrip } from "@/components/photo-booth/photo-strip";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Camera, Settings, Repeat, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { StepProgress } from "@/components/photo-booth/step-progress";
import { LayoutPicker } from "@/components/photo-booth/layout-picker";
import { ShareQrCode } from "@/components/share-qr-code";
import { useLocation } from 'wouter';
import {
  type PhotoLayout,
  getLayoutDisplayName,
  getLayoutGridLabel,
  getLayoutPhotoCount,
  isGridLayout,
  isPhotoLayout,
  isVerticalStackLayout,
} from "@shared/layouts";
import {
  DEFAULT_DATE_FONT,
  DEFAULT_DATE_FONT_SIZE,
  DEFAULT_NAME_FONT,
  DEFAULT_NAME_FONT_SIZE,
  MAX_DATE_FONT_SIZE,
  MAX_NAME_FONT_SIZE,
  MIN_STRIP_FONT_SIZE,
  STRIP_FONT_OPTIONS,
  type StripFontStyle,
} from "@/lib/strip-text-styles";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define an interface for the stored photo strip data
interface StoredPhotoStrip {
  id: string;
  timestamp: number;
  stripData: {
    photos: string[];
    layout: PhotoLayout;
    backgroundColor: string;
    stripName: string;
    showDate: boolean;
    showName: boolean;
    nameColor: string;
    dateColor: string;
  };
}

export default function Home() {
  const [photos, setPhotos] = useState<string[]>([]);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("#E1D9D1");
  const [stripName, setStripName] = useState("");
  const [showDate, setShowDate] = useState(true);
  const [showName, setShowName] = useState(true);
  const [nameColor, setNameColor] = useState("#000000");
  const [dateColor, setDateColor] = useState("#666666");
  const [nameFont, setNameFont] = useState<StripFontStyle>(DEFAULT_NAME_FONT);
  const [dateFont, setDateFont] = useState<StripFontStyle>(DEFAULT_DATE_FONT);
  const [nameFontSize, setNameFontSize] = useState(DEFAULT_NAME_FONT_SIZE);
  const [dateFontSize, setDateFontSize] = useState(DEFAULT_DATE_FONT_SIZE);
  const [layout, setLayout] = useState<PhotoLayout>("strip");
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
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const autoCaptureTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isAutoCapturing, setIsAutoCapturing] = useState(false);
  const [isShareGenerating, setIsShareGenerating] = useState(false);
  const clearAutoCaptureTimer = () => {
    if (autoCaptureTimer.current) {
      clearTimeout(autoCaptureTimer.current);
      autoCaptureTimer.current = null;
    }
  };

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

  const maxPhotos = getLayoutPhotoCount(layout);

  useEffect(() => {
    const preselected = sessionStorage.getItem("robooth_layout");
    if (preselected && isPhotoLayout(preselected)) {
      setLayout(preselected);
      setCurrentStep(1);
      sessionStorage.removeItem("robooth_layout");
    }
  }, []);

  useEffect(() => {
    return () => {
      clearAutoCaptureTimer();
    };
  }, []);

  const handleCapture = (photo: string) => {
    if (recaptureIndex !== null) {
      // Replace photo at specific index
      const updatedPhotos = [...photos];
      updatedPhotos[recaptureIndex] = photo;
      setPhotos(updatedPhotos);
      setRecaptureIndex(null);
      setIsCountingDown(false);

      toast({
        title: "Photo recaptured",
        description: `Photo ${recaptureIndex + 1} has been updated`,
        variant: "default",
        duration: 2000,
      });
    } else {
      const nextPhotoCount = photos.length + 1;
      setPhotos((prev) => [...prev, photo]);
      setIsCountingDown(false);
      clearAutoCaptureTimer();

      if (isAutoCapturing) {
        if (nextPhotoCount < maxPhotos) {
          autoCaptureTimer.current = setTimeout(() => {
            setIsCountingDown(true);
          }, 1500);
        } else {
          setIsAutoCapturing(false);
        }
      }
    }
  };

  const handleStartPhotoSequence = () => {
    if (photos.length >= maxPhotos) {
      toast({
        title: "Maximum photos reached",
        description: "Please clear the photos to start over.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    // Clear existing photos when starting a new sequence
    clearAutoCaptureTimer();
    setPhotos([]);
    setRecaptureIndex(null);
    setIsAutoCapturing(true);
    // Start the countdown for the first photo
    setIsCountingDown(true);
  };

  const handleClear = () => {
    setPhotos([]);
    setRecaptureIndex(null);
    setIsCountingDown(false);
    setIsAutoCapturing(false);
    clearAutoCaptureTimer();
  };

  const [recaptureIndex, setRecaptureIndex] = useState<number | null>(null);

  const handleRetakePhoto = (index: number) => {
    setRecaptureIndex(index);

    toast({
      title: "Recapture mode",
      description: `Click Auto Capture or the camera button to recapture Photo ${index + 1}`,
      variant: "default",
      duration: 3000,
    });
  };

  useEffect(() => {
    return () => {
      clearAutoCaptureTimer();
    };
  }, []);

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 2));
  };

  const handlePrevious = () => {
    if (currentStep === 1 && photos.length > 0) {
      if (!window.confirm("Going back will clear your photos. Continue?")) return;
      handleClear();
    }
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleShare = async () => {
    if (isShareGenerating) return;
    setIsShareGenerating(true);

    try {
      const shareResponse = await apiFetch("/api/shared-links", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          photos,
          layout,
          backgroundColor,
          stripName,
          showDate,
          showName,
          nameColor,
          dateColor,
          nameFont,
          dateFont,
          nameFontSize,
          dateFontSize,
        }),
      });

      if (!shareResponse.ok) {
        throw new Error("Failed to generate share link");
      }

      const shareData = await shareResponse.json();
      const fullUrl = `${window.location.origin}${shareData.url}`;
      setShareUrl(fullUrl);
      setShareModalOpen(true);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to create share link",
        variant: "destructive",
      });
    } finally {
      setIsShareGenerating(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    toast({
      title: "Link copied",
      description: "The shareable link has been copied to your clipboard.",
      variant: "default",
      duration: 2000,
    });
  };

  return (
    <div className={`min-h-screen pt-20 pb-8 px-4 sm:px-6 transition-all duration-300 ${darkMode ? 'dark bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'}`}>
      <div className="mt-6 max-w-6xl mx-auto">
        <StepProgress
          currentStep={currentStep}
          onNext={handleNext}
          onPrevious={handlePrevious}
          hideNavigation={currentStep === 0}
          disableNext={currentStep === 1 && photos.length < maxPhotos}
        />

        {currentStep === 0 ? (
          <div
            className={`rounded-3xl shadow-xl p-6 sm:p-10 max-w-3xl mx-auto ${
              darkMode
                ? "bg-slate-800/90 border border-slate-700 backdrop-blur-sm"
                : "bg-white/90 border border-slate-100 backdrop-blur-sm"
            }`}
          >
            <div className="text-center mb-8 space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">
                Choose Your Layout
              </h2>
              <p className={`text-sm sm:text-base max-w-md mx-auto ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                Swipe or use the arrows to pick how your photos will be arranged.
              </p>
            </div>

            <LayoutPicker
              layout={layout}
              onLayoutChange={setLayout}
              darkMode={darkMode}
            />

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-8">
              <Button
                onClick={handleNext}
                size="lg"
                className="w-full sm:w-auto px-10 py-6 text-base font-semibold rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white shadow-lg shadow-sky-500/20 hover:shadow-xl transition-all disabled:opacity-40"
              >
                Continue to Camera
                <ChevronRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </div>
        ) : currentStep === 1 ? (
          <div
            className={`rounded-3xl shadow-xl p-5 sm:p-8 max-w-6xl mx-auto ${
              darkMode
                ? "bg-slate-800/90 border border-slate-700"
                : "bg-white/90 border border-slate-100"
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6 pb-4 border-b border-slate-100 dark:border-slate-700">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">
                  Capture Your Photos
                </h2>
                <p className={`text-sm mt-1 ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                  {getLayoutDisplayName(layout)} layout ·{" "}
                  {photos.length < maxPhotos
                    ? `Photo ${photos.length + 1} of ${maxPhotos}`
                    : `All ${maxPhotos} photos captured`}
                </p>
              </div>
              <div className="flex gap-1">
                {Array.from({ length: maxPhotos }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 w-8 sm:w-10 rounded-full transition-colors duration-300 ${
                      i < photos.length
                        ? "bg-gradient-to-r from-sky-500 to-indigo-500"
                        : i === photos.length
                          ? "bg-sky-300 dark:bg-sky-700 animate-pulse"
                          : "bg-slate-200 dark:bg-slate-700"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div
              className={`grid grid-cols-1 gap-6 lg:gap-8 ${
                isGridLayout(layout)
                  ? "lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_380px]"
                  : "lg:grid-cols-[1fr_280px] xl:grid-cols-[1fr_300px]"
              }`}
            >
              {/* Camera — primary column */}
              <div className="space-y-5">
                <div className="relative">
                  <PhotoBoothCamera
                    onCapture={handleCapture}
                    isCountingDown={isCountingDown}
                    timerDuration={timerDuration}
                    photosLength={photos.length}
                    maxPhotos={maxPhotos}
                    recaptureIndex={recaptureIndex}
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

                <div
                  className={`flex flex-wrap items-center gap-2 p-3 rounded-2xl ${
                    darkMode ? "bg-slate-900/50 border border-slate-700" : "bg-slate-50 border border-slate-100"
                  }`}
                >
                  {photos.length < maxPhotos || recaptureIndex !== null ? (
                    <Button
                      onClick={() => {
                        if (recaptureIndex !== null) {
                          setIsCountingDown(true);
                        } else {
                          handleStartPhotoSequence();
                        }
                      }}
                      disabled={isCountingDown || isAutoCapturing}
                      className="flex-1 sm:flex-none rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white shadow-md disabled:opacity-50"
                    >
                      <Camera className="h-4 w-4 mr-2" />
                      {recaptureIndex !== null
                        ? `Recapture #${recaptureIndex + 1}`
                        : "Auto Capture"}
                    </Button>
                  ) : (
                    <Button
                      onClick={handleNext}
                      className="flex-1 sm:flex-none rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white shadow-md"
                    >
                      Continue to Customize
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    onClick={() => {
                      setPhotos([]);
                      setRecaptureIndex(null);
                    }}
                    disabled={photos.length === 0}
                    className="rounded-xl border-slate-200 dark:border-slate-600"
                  >
                    <Repeat className="h-4 w-4 mr-2" />
                    Retake All
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="icon" className="rounded-xl shrink-0">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-bold text-left bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">RoBooth Settings</DialogTitle>
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

              {/* Preview strip — sidebar */}
              <div
                className={`rounded-2xl p-4 sm:p-5 lg:sticky lg:top-24 lg:self-start ${
                  darkMode ? "bg-slate-900/60 border border-slate-700" : "bg-slate-50 border border-slate-100"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Your Strip
                  </h3>
                  <span className="text-xs font-semibold px-2 py-1 rounded-full bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300">
                    {getLayoutGridLabel(layout)}
                  </span>
                </div>

                <div
                  className={`mx-auto w-full ${
                    isGridLayout(layout) ? "max-w-[320px]" : "max-w-[140px]"
                  }`}
                >
                  <div
                    className={`rounded-xl shadow-inner ${
                      darkMode ? "bg-slate-800" : "bg-white"
                    } ring-1 ring-slate-200/80 dark:ring-slate-600 ${
                      isGridLayout(layout) ? "p-3" : "p-2"
                    }`}
                  >
                    <div
                      className={
                        isGridLayout(layout)
                          ? "grid grid-cols-2 gap-2"
                          : "flex flex-col gap-1.5"
                      }
                    >
                      {Array.from({ length: maxPhotos }).map((_, index) => (
                        <div
                          key={index}
                          className={`relative overflow-hidden rounded-md transition-all duration-300 group cursor-pointer ${
                            isVerticalStackLayout(layout) ? "aspect-[4/3]" : "aspect-square"
                          } ${
                            photos[index]
                              ? "ring-2 ring-emerald-400 shadow-sm"
                              : index === photos.length
                                ? "ring-2 ring-sky-400 ring-offset-1 ring-offset-transparent"
                                : darkMode
                                  ? "bg-slate-700/80 border border-dashed border-slate-600"
                                  : "bg-slate-100 border border-dashed border-slate-300"
                          }`}
                          onClick={() => {
                            if (photos[index]) handleRetakePhoto(index);
                          }}
                        >
                          {photos[index] ? (
                            <>
                              <img
                                src={photos[index]}
                                alt={`Photo ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="text-white text-[10px] font-semibold uppercase tracking-wide">
                                  Retake
                                </span>
                              </div>
                              <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center">
                                <span className="text-white text-[8px] font-bold">✓</span>
                              </div>
                            </>
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center gap-1.5">
                              <Camera
                                className={`${
                                  isGridLayout(layout) ? "h-6 w-6" : "h-4 w-4"
                                } ${
                                  index === photos.length
                                    ? "text-sky-500"
                                    : "text-slate-300 dark:text-slate-600"
                                }`}
                              />
                              <span
                                className={`font-medium ${
                                  isGridLayout(layout) ? "text-xs" : "text-[10px]"
                                } ${
                                  index === photos.length
                                    ? "text-sky-600 dark:text-sky-400"
                                    : "text-slate-400"
                                }`}
                              >
                                {index === photos.length ? "Next" : index + 1}
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {photos.length > 0 && (
                  <p className="text-[11px] text-center text-slate-400 dark:text-slate-500 mt-3">
                    Tap a photo to retake it
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            <div className={`space-y-6 ${darkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-slate-100'} rounded-2xl shadow-lg p-4 sm:p-6`}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="strip-name" className={`text-sm sm:text-base font-semibold ${darkMode ? 'text-slate-100' : ''}`}>Strip Name</Label>
                  <Input
                    id="strip-name"
                    value={stripName}
                    onChange={(e) => setStripName(e.target.value)}
                    placeholder="Enter a name for your strip"
                    className={`text-sm ${darkMode ? 'bg-slate-700 border-slate-600 text-white placeholder:text-slate-400' : 'bg-white'} rounded-lg transition-all duration-200 focus:ring-2 focus:ring-sky-500`}
                  />
                </div>

                <div className="space-y-4">
                  <Label className={`text-sm sm:text-base font-semibold ${darkMode ? 'text-slate-100' : ''}`}>Display Options</Label>
                  <div className={`${darkMode ? 'bg-slate-700 border border-slate-600' : 'bg-slate-50 border border-slate-200'} rounded-xl p-3 sm:p-4 space-y-4`}>
                    <div className="flex items-center justify-between gap-4">
                      <div className="space-y-0.5 flex-1">
                        <Label htmlFor="show-name" className={`text-xs sm:text-sm ${darkMode ? 'text-slate-100' : ''}`}>Show Strip Name</Label>
                        <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Display name</p>
                      </div>
                      <Switch
                        id="show-name"
                        checked={showName}
                        onCheckedChange={setShowName}
                      />
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <div className="space-y-0.5 flex-1">
                        <Label htmlFor="show-date" className={`text-xs sm:text-sm ${darkMode ? 'text-slate-100' : ''}`}>Show Date</Label>
                        <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Include date</p>
                      </div>
                      <Switch
                        id="show-date"
                        checked={showDate}
                        onCheckedChange={setShowDate}
                      />
                    </div>

                    {showName && (
                      <div className="space-y-3 border-t border-slate-200 dark:border-slate-600 pt-4">
                        <Label className={`text-xs sm:text-sm font-medium ${darkMode ? "text-slate-100" : ""}`}>
                          Name Style
                        </Label>
                        <Select value={nameFont} onValueChange={(value) => setNameFont(value as StripFontStyle)}>
                          <SelectTrigger className={`text-xs sm:text-sm ${darkMode ? "bg-slate-800 border-slate-600" : ""}`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {STRIP_FONT_OPTIONS.map((font) => (
                              <SelectItem key={font.id} value={font.id}>
                                {font.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between gap-2">
                            <Label htmlFor="name-font-size" className={`text-xs ${darkMode ? "text-slate-300" : "text-slate-600"}`}>
                              Name Size
                            </Label>
                            <span className={`text-xs ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                              {nameFontSize}px
                            </span>
                          </div>
                          <input
                            id="name-font-size"
                            type="range"
                            min={MIN_STRIP_FONT_SIZE}
                            max={MAX_NAME_FONT_SIZE}
                            value={nameFontSize}
                            onChange={(e) => setNameFontSize(Number(e.target.value))}
                            className="w-full accent-sky-500"
                          />
                        </div>
                      </div>
                    )}

                    {showDate && (
                      <div className="space-y-3 border-t border-slate-200 dark:border-slate-600 pt-4">
                        <Label className={`text-xs sm:text-sm font-medium ${darkMode ? "text-slate-100" : ""}`}>
                          Date Style
                        </Label>
                        <Select value={dateFont} onValueChange={(value) => setDateFont(value as StripFontStyle)}>
                          <SelectTrigger className={`text-xs sm:text-sm ${darkMode ? "bg-slate-800 border-slate-600" : ""}`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {STRIP_FONT_OPTIONS.map((font) => (
                              <SelectItem key={font.id} value={font.id}>
                                {font.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between gap-2">
                            <Label htmlFor="date-font-size" className={`text-xs ${darkMode ? "text-slate-300" : "text-slate-600"}`}>
                              Date Size
                            </Label>
                            <span className={`text-xs ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                              {dateFontSize}px
                            </span>
                          </div>
                          <input
                            id="date-font-size"
                            type="range"
                            min={MIN_STRIP_FONT_SIZE}
                            max={MAX_DATE_FONT_SIZE}
                            value={dateFontSize}
                            onChange={(e) => setDateFontSize(Number(e.target.value))}
                            className="w-full accent-sky-500"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className={`text-sm sm:text-base font-semibold ${darkMode ? 'text-slate-100' : ''}`}>Colors</Label>
                  <div className={`${darkMode ? 'bg-slate-700 border border-slate-600' : 'bg-slate-50 border border-slate-200'} rounded-xl p-3 sm:p-4 space-y-3`}>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <Label htmlFor="background-color" className={`text-xs sm:text-sm ${darkMode ? 'text-slate-100' : ''}`}>Background</Label>
                        <input
                          type="color"
                          value={backgroundColor}
                          onChange={(e) => setBackgroundColor(e.target.value)}
                          className="h-8 w-12 sm:w-16 rounded-lg cursor-pointer hover-lift transition-all duration-200 border border-slate-300"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <Label htmlFor="name-color" className={`text-xs sm:text-sm ${darkMode ? 'text-slate-100' : ''}`}>Name Color</Label>
                        <input
                          type="color"
                          value={nameColor}
                          onChange={(e) => setNameColor(e.target.value)}
                          className="h-8 w-12 sm:w-16 rounded-lg cursor-pointer hover-lift transition-all duration-200 border border-slate-300"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <Label htmlFor="date-color" className={`text-xs sm:text-sm ${darkMode ? 'text-slate-100' : ''}`}>Date Color</Label>
                        <input
                          type="color"
                          value={dateColor}
                          onChange={(e) => setDateColor(e.target.value)}
                          className="h-8 w-12 sm:w-16 rounded-lg cursor-pointer hover-lift transition-all duration-200 border border-slate-300"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 sm:space-y-6 order-1 lg:order-2">
              <div className={`w-full flex justify-center ${darkMode ? 'bg-slate-700 border border-slate-600 shadow-xl' : 'bg-white border border-slate-100 shadow-lg'} rounded-2xl p-3 sm:p-4 hover-lift transition-all duration-300`}>
                <div className={`${isGridLayout(layout) ? 'max-w-md' : 'max-w-xs'} w-full`}>
                  <PhotoStrip
                    photos={photos}
                    layout={layout}
                    name={stripName}
                    showDate={showDate}
                    showName={showName}
                    backgroundColor={backgroundColor}
                    nameColor={nameColor}
                    dateColor={dateColor}
                    nameFont={nameFont}
                    dateFont={dateFont}
                    nameFontSize={nameFontSize}
                    dateFontSize={dateFontSize}
                    darkMode={darkMode}
                    showShareButton={true}
                    isShareLoading={isShareGenerating}
                    onShare={handleShare}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Dialog open={shareModalOpen} onOpenChange={setShareModalOpen}>
        <DialogContent className="w-[calc(100%-2rem)] max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl font-bold bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">Share Your Photo Strip</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {shareUrl && <ShareQrCode value={shareUrl} />}
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <Input id="share-url" value={shareUrl} readOnly className="flex-1 text-xs sm:text-base rounded-lg" />
              <Button onClick={handleCopyLink} className="w-full sm:w-auto text-xs sm:text-base bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200">Copy Link</Button>
            </div>
            <p className="text-xs sm:text-sm text-center text-slate-500">Scan the QR code or copy the link to share.</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}