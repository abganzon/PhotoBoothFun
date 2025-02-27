/// <reference types="react" />
import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { Camera, Heart, Users } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

type ErrorResponse = {
  error: string;
}

type CountResponse = {
  count: number;
}

type VisitorCountProps = {
  count: number;
}

function VisitorCount({ count }: VisitorCountProps) {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Users className="h-4 w-4" />
      <span>{count} visitors in the last 24 hours</span>
    </div>
  );
}

export default function Landing() {
  const [, setLocation] = useLocation();
  const [visitors, setVisitors] = useState(1); // Start with 1 visitor
  const { toast } = useToast();
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Use secure WebSocket if page is loaded over HTTPS
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const ws = new WebSocket(`${protocol}//${window.location.host}`);
    wsRef.current = ws;

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'visitorCount') {
          setVisitors(data.count);
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
      // Attempt to reconnect after 5 seconds
      setTimeout(() => {
        if (wsRef.current === ws) { // Only reconnect if this is still the current ws
          wsRef.current = new WebSocket(`${protocol}//${window.location.host}`);
        }
      }, 5000);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    // Track visit
    const trackVisit = async () => {
      try {
        const visitResponse = await fetch('/api/visitors', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });

        if (!visitResponse.ok) {
          const errorData = await visitResponse.json().catch(() => ({ error: 'Failed to track visit' }));
          console.error('Visit tracking failed:', errorData);
          throw new Error(errorData.error || 'Failed to track visit');
        }
      } catch (error: unknown) {
        console.error('Error tracking visit:', error);
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to track visit. Please try again later.",
          variant: "destructive",
        });
      }
    };

    // Track visit when component mounts
    trackVisit();

    // Cleanup WebSocket connection on unmount
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-sky-100 via-sky-200 to-sky-100 px-4"> {/* Modified background gradient */}
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
          className="gap-2 px-8"
        >
          <Camera className="h-6 w-6" />
          Start
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
                    src="/IMG_9239.jpeg" 
                    alt="GCash QR Code" 
                    className="w-64 h-64 object-contain rounded-xl shadow-inner bg-white p-2" 
                  />
                </div>
                <div className="text-center bg-blue-50 px-6 py-4 rounded-xl shadow-sm">
                  <p className="text-base font-medium text-blue-600 mb-1">GCash Number</p>
                  <p className="text-xl font-bold text-blue-800">09391935233</p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="fixed bottom-4 flex items-center gap-4 text-sm text-gray-500">
        <span>v1.0.0</span>
        <span>•</span>
        <div className="flex items-center">
          <Users className="h-4 w-4 mr-2" />
          <span>{visitors} visitors in 24 hrs</span>
        </div>
        <span>•</span>
        <Dialog>
          <DialogTrigger asChild>
            <button className="text-blue-600 hover:underline">Privacy Policy</button>
          </DialogTrigger>
          <DialogContent className="max-w-5xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-3xl font-bold text-gray-900 text-center">Features & Privacy Policy</DialogTitle>
            </DialogHeader>
            <div className="grid md:grid-cols-2 gap-8 py-6">
              {/* Features Column */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Features</h2>
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                      <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      Photo Booth Experience
                    </h3>
                    <ul className="text-gray-600 pl-5 list-disc ml-4 space-y-2">
                      <li>Take up to 4 photos in sequence</li>
                      <li>Automatic countdown timer</li>
                      <li>Camera flip and mirror controls</li>
                      <li>Mobile device support</li>
                    </ul>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                      <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                      Customization Options
                    </h3>
                    <ul className="text-gray-600 pl-5 list-disc ml-4 space-y-2">
                      <li>Strip and collage layouts</li>
                      <li>Custom strip name</li>
                      <li>Adjustable timer duration</li>
                      <li>Background color selection</li>
                      <li>Date and name display options</li>
                    </ul>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                      <span className="inline-block w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                      User Interface
                    </h3>
                    <ul className="text-gray-600 pl-5 list-disc ml-4 space-y-2">
                      <li>Modern, intuitive design</li>
                      <li>Real-time camera preview</li>
                      <li>Interactive controls</li>
                      <li>Status notifications and toasts</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Privacy Policy Column */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Privacy Policy</h2>
                <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Your privacy is my priority. This policy explains how your images and personal data are handled.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                      <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      Image Processing
                    </h3>
                    <p className="text-gray-600 pl-5">All image processing happens locally within your browser on your device. No images are uploaded to external servers.</p>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                      <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                      Data Collection
                    </h3>
                    <p className="text-gray-600 pl-5">I do not collect or store any images you process with this application. Your images stay entirely on your device.</p>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                      <span className="inline-block w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                      No Server Transmission
                    </h3>
                    <p className="text-gray-600 pl-5">All processing is done client-side, ensuring that your images are never transmitted to any servers.</p>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                      <span className="inline-block w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
                      Third-Party Services
                    </h3>
                    <p className="text-gray-600 pl-5">No third-party services are used that would require uploading or sharing your images.</p>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                      <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                      Policy Updates
                    </h3>
                    <p className="text-gray-600 pl-5">This privacy policy may be updated periodically, with any changes posted on this page.</p>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}