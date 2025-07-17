
/// <reference types="react" />
import * as React from 'react';
import { useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Camera, Heart, Sparkles, Zap, Users, Download } from 'lucide-react';
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

export default function Landing() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-200 to-blue-200 rounded-full opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Logo and Title */}
          <div className="flex items-center justify-center gap-6 mb-8 animate-fade-in">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl transform hover:scale-105 transition-transform duration-300">
                <Camera className="h-12 w-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-yellow-600" />
              </div>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              RoBooth
            </h1>
          </div>

          {/* Tagline */}
          <p className="text-2xl md:text-3xl text-gray-600 mb-6 font-light animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Your Digital Photobooth Experience
          </p>
          
          <p className="text-lg md:text-xl text-gray-500 mb-12 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.4s' }}>
            Create stunning photo strips and collages with professional-quality results. 
            Perfect for events, parties, or just having fun with friends!
          </p>

          {/* Feature Highlights */}
          <div className="grid md:grid-cols-3 gap-6 mb-12 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Instant Capture</h3>
              <p className="text-gray-600 text-sm">Quick countdown timer with automatic photo capture for seamless experience</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Group Friendly</h3>
              <p className="text-gray-600 text-sm">Perfect for parties, events, and gatherings with friends and family</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Download className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Easy Download</h3>
              <p className="text-gray-600 text-sm">Download your photo strips instantly or share them with friends</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <Button
              size="lg"
              onClick={() => setLocation("/home")}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 text-lg font-medium rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 gap-3"
            >
              <Camera className="h-6 w-6" />
              Start Photo Booth
            </Button>

            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-purple-300 text-purple-600 hover:bg-purple-50 px-8 py-4 text-lg font-medium rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 gap-3"
                >
                  <Heart className="h-6 w-6" />
                  Support Project
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
        </div>

        

        {/* Footer */}
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4 text-sm text-gray-500 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
          <span className="font-medium">v1.0.0</span>
          <span>•</span>
          <span className="text-gray-400">by influenzah</span>
          <span>•</span>
          <Dialog>
            <DialogTrigger asChild>
              <button className="text-blue-600 hover:text-blue-700 font-medium transition-colors">Privacy Policy</button>
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

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
