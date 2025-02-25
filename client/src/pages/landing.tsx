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
              <DialogTitle className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Support RoBooth</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-6">
              <p className="text-center text-gray-600 text-lg leading-relaxed">
                Thank you for considering supporting RoBooth! Your contribution helps keep this service running and enables continuous improvements.
              </p>
              <div className="flex flex-col items-center gap-6">
                <div className="bg-gradient-to-b from-blue-50 via-white to-purple-50 p-8 rounded-2xl shadow-lg border border-gray-100">
                  <img 
                    src="/qr-code-instapay.png" 
                    alt="InstaPay QR Code" 
                    className="w-64 h-64 object-contain rounded-xl shadow-inner bg-white p-2" 
                  />
                </div>
                <div className="text-center bg-blue-50 px-6 py-4 rounded-xl shadow-sm">
                  <p className="text-base font-medium text-blue-600 mb-1">GCash Number</p>
                  <p className="text-xl font-bold text-blue-800">09391935233</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="fixed bottom-4 flex gap-4 text-sm text-gray-500">
        <span>v1.0.0</span>
        <span>•</span>
        <span>{visitors} visitors</span>
        <span>•</span>
        <Dialog>
          <DialogTrigger asChild>
            <button className="text-blue-600 hover:underline">Privacy Policy</button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-3xl font-bold text-gray-900">Privacy Policy</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <p className="text-lg text-gray-600 leading-relaxed">
                  Your privacy is my priority. This policy explains how your images and personal data are handled.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Image Processing
                </h2>
                <p className="text-gray-600 pl-5">All image processing happens locally within your browser on your device. No images are uploaded to external servers.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  Data Collection
                </h2>
                <p className="text-gray-600 pl-5">I do not collect or store any images you process with this application. Your images stay entirely on your device.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="inline-block w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                  No Server Transmission
                </h2>
                <p className="text-gray-600 pl-5">All processing is done client-side, ensuring that your images are never transmitted to any servers.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="inline-block w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
                  Third-Party Services
                </h2>
                <p className="text-gray-600 pl-5">No third-party services are used that would require uploading or sharing your images.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                  Policy Updates
                </h2>
                <p className="text-gray-600 pl-5">This privacy policy may be updated periodically, with any changes posted on this page.</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}