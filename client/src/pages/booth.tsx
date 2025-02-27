import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Camera, Settings, Image, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

type ProcessStep = 'camera' | 'customize';

export default function Booth() {
  // Process state
  const [currentStep, setCurrentStep] = useState<ProcessStep>('camera');
  const [capturedPhotos, setCapturedPhotos] = useState<string[]>([]);
  
  // Camera state
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isCameraFlipped, setIsCameraFlipped] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [duration, setDuration] = useState(3); // seconds
  
  // Customization state
  const [stripName, setStripName] = useState('');
  const [layout, setLayout] = useState<'2x2' | 'strip'>('2x2');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [showDate, setShowDate] = useState(true);
  const [showName, setShowName] = useState(true);
  
  const { toast } = useToast();

  // Initialize camera
  useEffect(() => {
    async function setupCamera() {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: isCameraFlipped ? 'user' : 'environment' }
        });
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
        setStream(mediaStream);
      } catch (error) {
        toast({
          title: 'Camera Error',
          description: 'Failed to access camera. Please ensure camera permissions are granted.',
          variant: 'destructive',
        });
      }
    }
    setupCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isCameraFlipped]);

  // Step progress indicator
  const renderStepProgress = () => (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              currentStep === 'camera' ? 'bg-primary text-white' : 
              capturedPhotos.length === 4 ? 'bg-green-500 text-white' : 'bg-gray-200'
            }`}>
              <Camera className="h-5 w-5" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">Step 1</p>
              <p className="text-xs text-gray-500">Camera</p>
            </div>
          </div>
        </div>
        
        <div className="flex-1 h-px bg-gray-200 mx-4" />
        
        <div className="flex-1">
          <div className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              currentStep === 'customize' ? 'bg-primary text-white' : 'bg-gray-200'
            }`}>
              <Settings className="h-5 w-5" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">Step 2</p>
              <p className="text-xs text-gray-500">Customize</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Navigation buttons
  const renderNavigation = () => (
    <div className="w-full max-w-7xl mx-auto px-4 mt-8">
      <div className="flex justify-between">
        {currentStep === 'customize' && (
          <Button
            variant="outline"
            onClick={() => setCurrentStep('camera')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Camera
          </Button>
        )}
        
        {currentStep === 'camera' && capturedPhotos.length === 4 && (
          <Button
            onClick={() => setCurrentStep('customize')}
            className="flex items-center gap-2 ml-auto"
          >
            Next: Customize
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );

  // Capture photo function
  const capturePhoto = () => {
    if (!videoRef.current) return;
    
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    if (isCameraFlipped) {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }
    
    ctx.drawImage(videoRef.current, 0, 0);
    const photoUrl = canvas.toDataURL('image/jpeg');
    setCapturedPhotos(prev => [...prev, photoUrl]);
  };

  // Start countdown function
  const startCountdown = () => {
    if (capturedPhotos.length >= 4) return;
    setCountdown(duration);
    
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev === null || prev <= 0) {
          clearInterval(timer);
          capturePhoto();
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Render capture process
  const renderCaptureProcess = () => (
    <div className="flex gap-8 w-full max-w-7xl mx-auto p-4">
      {/* Camera Preview */}
      <div className="flex-1">
        <div className="relative rounded-lg overflow-hidden bg-black aspect-video mb-4">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={`w-full h-full object-cover ${isCameraFlipped ? 'scale-x-[-1]' : ''}`}
          />
          {countdown !== null && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-8xl font-bold text-white bg-black/50 p-8 rounded-full">
                {countdown}
              </span>
            </div>
          )}
        </div>
        
        {/* Camera Controls */}
        <div className="bg-white rounded-lg p-4 shadow-lg">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <Button
                onClick={() => setIsCameraFlipped(!isCameraFlipped)}
                variant="outline"
                className="w-32"
              >
                Flip Camera
              </Button>
              
              <div className="flex-1 flex items-center gap-4">
                <Label className="min-w-fit">Timer Duration:</Label>
                <Slider
                  value={[duration]}
                  onValueChange={([value]) => setDuration(value)}
                  min={1}
                  max={10}
                  step={1}
                />
                <span className="w-12 text-center">{duration}s</span>
              </div>
            </div>
            
            <Button
              onClick={startCountdown}
              disabled={countdown !== null || capturedPhotos.length >= 4}
              size="lg"
              className="w-full"
            >
              {capturedPhotos.length >= 4 ? (
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5" />
                  Photos Complete
                </span>
              ) : (
                'Auto Capture'
              )}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Photo Grid Preview */}
      <div className="w-96 bg-white rounded-lg p-4 shadow-lg">
        <h3 className="font-semibold mb-4">Captured Photos ({capturedPhotos.length}/4)</h3>
        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-lg border-2 overflow-hidden"
            >
              {capturedPhotos[i] ? (
                <img
                  src={capturedPhotos[i]}
                  alt={`Photo ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <span className="text-2xl text-gray-400">{i + 1}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Render customize process
  const renderCustomizeProcess = () => (
    <div className="flex gap-8 w-full max-w-7xl mx-auto p-4">
      {/* Customization Controls */}
      <div className="w-96 bg-white rounded-lg p-6 shadow-lg">
        <h3 className="text-xl font-semibold mb-6">Customize Your Strip</h3>
        
        <div className="space-y-6">
          <div>
            <Label className="text-sm font-medium mb-1.5">Strip Layout</Label>
            <Select
              value={layout}
              onValueChange={value => setLayout(value as '2x2' | 'strip')}
            >
              <option value="2x2">2x2 Grid Layout</option>
              <option value="strip">Vertical Strip Layout</option>
            </Select>
          </div>

          <div>
            <Label className="text-sm font-medium mb-1.5">Strip Name</Label>
            <Input
              value={stripName}
              onChange={e => setStripName(e.target.value)}
              placeholder="Enter a name for your strip"
            />
          </div>
          
          <div>
            <Label className="text-sm font-medium mb-1.5">Background Color</Label>
            <div className="flex gap-2">
              <Input
                type="color"
                value={bgColor}
                onChange={e => setBgColor(e.target.value)}
                className="w-20 h-10 p-1"
              />
              <Input
                type="text"
                value={bgColor}
                onChange={e => setBgColor(e.target.value)}
                placeholder="#FFFFFF"
                className="flex-1"
              />
            </div>
          </div>
          
          <div className="space-y-3">
            <Label className="text-sm font-medium">Display Options</Label>
            <div className="flex flex-col gap-2">
              <Label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showName}
                  onChange={e => setShowName(e.target.checked)}
                  className="rounded"
                />
                Show Strip Name
              </Label>
              
              <Label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showDate}
                  onChange={e => setShowDate(e.target.checked)}
                  className="rounded"
                />
                Show Date
              </Label>
            </div>
          </div>
        </div>
      </div>
      
      {/* Strip Preview */}
      <div className="flex-1">
        <div
          className="rounded-lg shadow-lg overflow-hidden"
          style={{ backgroundColor: bgColor }}
        >
          <div className={`grid ${layout === '2x2' ? 'grid-cols-2' : 'grid-cols-1'} gap-4 p-4`}>
            {capturedPhotos.map((photo, i) => (
              <img
                key={i}
                src={photo}
                alt={`Photo ${i + 1}`}
                className="w-full aspect-square object-cover rounded-lg shadow-md"
              />
            ))}
          </div>
          
          {(showName || showDate) && (
            <div className="bg-black/10 p-4 text-center">
              {showName && stripName && (
                <p className="font-semibold text-lg mb-1">{stripName}</p>
              )}
              {showDate && (
                <p className="text-sm text-gray-600">
                  {new Date().toLocaleDateString()}
                </p>
              )}
            </div>
          )}
        </div>
        
        <div className="mt-4 flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={() => setCurrentStep('camera')}
          >
            Back to Camera
          </Button>
          
          <Button onClick={() => {
            // TODO: Implement save/download functionality
            const link = document.createElement('a');
            link.download = `${stripName || 'photo-strip'}.jpg`;
            // Convert the strip to an image and save
            toast({
              title: 'Success',
              description: 'Your photo strip has been saved!',
            });
          }}>
            Save Strip
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="py-8 px-6">
        {renderStepProgress()}
        
        {currentStep === 'camera' ? renderCaptureProcess() : renderCustomizeProcess()}
        
        {renderNavigation()}
      </div>
    </div>
  );
} 