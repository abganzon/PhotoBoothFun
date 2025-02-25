
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Camera, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Landing() {
  const [, setLocation] = useLocation();
  const [visitors, setVisitors] = useState(0);

  useEffect(() => {
    setVisitors(prev => prev + 1);
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 px-4">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
          <Camera className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900">RoBooth</h1>
      </div>
      
      <p className="text-xl text-gray-600 mb-12 text-center">
        your digital photobooth by influenzah
      </p>

      <div className="flex gap-4">
        <Button
          size="lg"
          onClick={() => setLocation("/booth")}
          className="gap-2 text-lg px-8"
        >
          <Camera className="h-6 w-6" />
          Start Capturing
        </Button>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="lg" className="gap-2">
              <Heart className="h-6 w-6" />
              Support
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center">I appreciate your support! 🙏</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-6">
              <p className="text-center text-gray-600 text-lg leading-relaxed">
                This site is a labor of love, and your support helps keep it thriving. Every contribution is truly a cherished gift.
              </p>
              <div className="flex flex-col items-center gap-6 bg-gradient-to-b from-blue-50 to-white p-6 rounded-xl">
                <img src="/gcash-qr.png" alt="GCash QR Code" className="w-64 h-64 object-contain shadow-lg rounded-xl" />
                <div className="text-center">
                  <p className="text-base font-semibold text-blue-600">GCash Number</p>
                  <p className="text-lg font-bold">09391935233</p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="fixed bottom-4 flex gap-4 text-sm text-gray-500">
        <span>v1.0.0</span>
        <span>•</span>
        <span>{visitors} visitors</span>
      </div>
    </div>
  );
}
