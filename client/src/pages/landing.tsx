
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

      <div className="space-y-8 max-w-2xl mx-auto">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-center">Features</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Instant photo capture with customizable countdown timer</li>
            <li>Multiple layout options - photo strip (1x4) or collage (2x2)</li>
            <li>Customizable colors for background and text</li>
            <li>Optional date and name display on photos</li>
            <li>Client-side processing for privacy</li>
            <li>No account required - start capturing immediately</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-center">Privacy Policy</h2>
          <div className="prose prose-gray">
            <p>I prioritize your privacy. This privacy policy outlines how I handle your images and personal information.</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Image Processing:</strong> All image processing operations are performed directly within your browser on your local device. This means that your images are not uploaded to any external servers.</li>
              <li><strong>Data Collection:</strong> I do not collect or store any of the images you process using our application. Your images remain solely on your device.</li>
              <li><strong>No Server Transmission:</strong> Your images are not transmitted to any servers. The entire processing happens client-side, ensuring your privacy.</li>
              <li><strong>Third-Party Services:</strong> I do not use any third-party services that would require uploading or sharing your images.</li>
              <li><strong>Changes to This Policy:</strong> I may update this privacy policy from time to time. Any changes will be posted on this page.</li>
            </ul>
          </div>
        </div>

        <div className="flex gap-4 justify-center">
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
      </div>

      <div className="fixed bottom-4 flex gap-4 text-sm text-gray-500">
        <span>v1.0.0</span>
        <span>•</span>
        <span>{visitors} visitors</span>
        <span>•</span>
        <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>
      </div>
    </div>
  );
}
