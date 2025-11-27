/// <reference types="react" />
import * as React from "react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { Camera, Heart, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { RoBoothLogo } from "@/components/RoBoothLogo";

export default function Landing() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState<'features' | 'privacy'>('features');

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">

        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-96 h-96 bg-sky-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" style={{ animationDelay: "2s" }}></div>
          <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" style={{ animationDelay: "4s" }}></div>
        </div>

        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 pt-12 pb-32 md:pb-40">
          {/* Hero Section - Full Screen Immersive */}
          <div className="text-center max-w-5xl mx-auto w-full space-y-8 animate-fade-in">
            {/* Main Logo and Title */}
            <div className="space-y-6">
              <div className="flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-indigo-500 rounded-3xl blur-3xl opacity-75 animate-glow-pulse"></div>
                  <div className="relative w-28 h-28 md:w-32 md:h-32 bg-gradient-to-br from-sky-500 via-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center shadow-2xl transform transition-all duration-300 hover:scale-110 animate-float">
                    <Camera className="h-14 md:h-16 w-14 md:w-16 text-white" />
                  </div>
                </div>
              </div>
            
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="text-6xl md:text-7xl lg:text-8xl">
                    <RoBoothLogo size="2xl" />
                  </div>
                </div>
                <div className="mt-3 flex justify-center">
                  <div className="h-1 w-48 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 opacity-80 animate-shimmer" />
                </div>
                <p className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100">
                  Capture • Create • Share
                </p>
                <p className="mt-2 text-sm md:text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
                  A delightful photobooth for quick memories — modern UI, friendly animations, and instant downloads.
                </p>
              </div>
            </div>

            {/* Tagline */}
            <p className="text-lg md:text-2xl text-slate-700 dark:text-slate-200 max-w-3xl mx-auto leading-relaxed font-medium animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Experience the magic of instant photo memories. Modern design, intuitive controls, and instant sharing — all in one beautiful photobooth.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center w-full animate-fade-in pt-4" style={{ animationDelay: "0.4s" }}>
              <Button 
                size="lg" 
                onClick={() => setLocation("/home")} 
                className="w-full sm:w-44 px-12 py-4 text-lg font-bold bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 hover-lift"
              >
                <Camera className="h-6 w-6 mr-3" />
                Start
              </Button>

              <Button 
                size="lg" 
                variant="outline"
                onClick={() => setLocation("/gallery")} 
                className="w-full sm:w-44 px-12 py-4 text-lg font-bold border-2 border-sky-500 text-sky-600 dark:text-sky-300 hover:bg-sky-50 dark:hover:bg-slate-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                <ImageIcon className="h-6 w-6 mr-3" />
                Gallery
              </Button>
            </div>

            {/* Top Donators */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 animate-fade-in" style={{ animationDelay: "0.6s" }}>
              <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/30 dark:to-yellow-900/30 backdrop-blur-md border border-amber-200 dark:border-amber-700/50 shadow-md hover:shadow-lg transition-all duration-200" data-testid="card-top-donator-1">
                <div className="flex items-center gap-3">
                  <Heart className="h-6 w-6 text-amber-500" />
                  <div>
                    <div className="text-sm font-semibold text-slate-800 dark:text-slate-100">Top Donator</div>
                    <div className="text-xs text-amber-600 dark:text-amber-300 font-medium">Maria Santos</div>
                    <div className="text-xs text-slate-500 dark:text-slate-300">PHP 10,000.00</div>
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-900/30 dark:to-pink-900/30 backdrop-blur-md border border-rose-200 dark:border-rose-700/50 shadow-md hover:shadow-lg transition-all duration-200" data-testid="card-top-donator-2">
                <div className="flex items-center gap-3">
                  <Heart className="h-6 w-6 text-rose-500" />
                  <div>
                    <div className="text-sm font-semibold text-slate-800 dark:text-slate-100">Top Donator</div>
                    <div className="text-xs text-rose-600 dark:text-rose-300 font-medium">Juan Dela Cruz</div>
                    <div className="text-xs text-slate-500 dark:text-slate-300">PHP 5,000.00</div>
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/30 dark:to-purple-900/30 backdrop-blur-md border border-violet-200 dark:border-violet-700/50 shadow-md hover:shadow-lg transition-all duration-200" data-testid="card-top-donator-3">
                <div className="flex items-center gap-3">
                  <Heart className="h-6 w-6 text-violet-500" />
                  <div>
                    <div className="text-sm font-semibold text-slate-800 dark:text-slate-100">Top Donator</div>
                    <div className="text-xs text-violet-600 dark:text-violet-300 font-medium">Pedro Reyes</div>
                    <div className="text-xs text-slate-500 dark:text-slate-300">PHP 2,500.00</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer (now in-flow so it follows the UI sequence) */}
          <div className="mt-8 flex items-center gap-4 text-sm text-slate-600 dark:text-slate-300 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl px-6 py-3 rounded-full shadow-xl border border-slate-200 dark:border-slate-700">
            <span className="font-semibold">by Influenzah</span>
            <span className="text-slate-400">•</span>
            <Dialog>
              <DialogTrigger asChild>
                <button className="text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 font-bold transition-all duration-200 hover:scale-110">
                  Privacy Policy
                </button>
              </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[85vh] flex flex-col rounded-2xl p-0 gap-0">
              <DialogHeader className="px-6 pt-6 pb-4 border-b border-sky-200 dark:border-indigo-700/50">
                <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent text-center">
                  Features & Privacy Policy
                </DialogTitle>
              </DialogHeader>
              
              <div className="flex flex-1 overflow-hidden">
                {/* Left Sidebar Navigation */}
                <div className="w-32 border-r border-sky-200 dark:border-indigo-700/50 px-3 py-4 bg-gradient-to-b from-sky-50/50 to-indigo-50/50 dark:from-slate-800/50 dark:to-slate-900/50 flex flex-col gap-2">
                  <button
                    onClick={() => setSelectedTab('features')}
                    className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                      selectedTab === 'features'
                        ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-md'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-sky-100 dark:hover:bg-slate-700'
                    }`}
                    data-testid="button-tab-features"
                  >
                    Features
                  </button>
                  <button
                    onClick={() => setSelectedTab('privacy')}
                    className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                      selectedTab === 'privacy'
                        ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-md'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-sky-100 dark:hover:bg-slate-700'
                    }`}
                    data-testid="button-tab-privacy"
                  >
                    Privacy
                  </button>
                </div>

                {/* Right Content Area */}
                <div className="flex-1 overflow-y-auto px-6 py-4">
                  {selectedTab === 'features' && (
                    <div>
                      <h2 className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent mb-6">
                        Features
                      </h2>
                      <div className="space-y-4">
                    <div className="bg-gradient-to-br from-sky-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-sky-100 dark:border-slate-600 hover-lift">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center">
                        <span className="inline-block w-3 h-3 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full mr-3 shadow-lg"></span>
                        Photo Booth Experience
                      </h3>
                      <ul className="text-slate-700 dark:text-slate-200 pl-5 list-disc ml-4 space-y-1.5 text-sm font-medium">
                        <li>Take up to 4 photos in sequence with auto-capture</li>
                        <li>Customizable countdown timer (1-10 seconds)</li>
                        <li>Camera flip and mirror controls</li>
                        <li>Recapture individual photos anytime</li>
                        <li>Mobile and desktop support with touch controls</li>
                      </ul>
                    </div>

                    <div className="bg-gradient-to-br from-sky-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-sky-100 dark:border-slate-600 hover-lift">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center">
                        <span className="inline-block w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mr-3 shadow-lg"></span>
                        Customization Options
                      </h3>
                      <ul className="text-slate-700 dark:text-slate-200 pl-5 list-disc ml-4 space-y-1.5 text-sm font-medium">
                        <li>Strip (vertical) and Collage (2x2) layouts</li>
                        <li>Custom strip name with text color selection</li>
                        <li>Background color picker</li>
                        <li>Date and name display toggle</li>
                        <li>Text color customization for name and date</li>
                      </ul>
                    </div>

                    <div className="bg-gradient-to-br from-sky-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-sky-100 dark:border-slate-600 hover-lift">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center">
                        <span className="inline-block w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-3 shadow-lg"></span>
                        Sharing & Gallery
                      </h3>
                      <ul className="text-slate-700 dark:text-slate-200 pl-5 list-disc ml-4 space-y-1.5 text-sm font-medium">
                        <li>Download photo strips as high-quality PNG files</li>
                        <li>Save strips to local gallery</li>
                        <li>Generate shareable links with QR codes</li>
                        <li>10-minute expiring share links for privacy</li>
                        <li>View shared strips without authentication</li>
                      </ul>
                    </div>

                    <div className="bg-gradient-to-br from-sky-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-sky-100 dark:border-slate-600 hover-lift">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center">
                        <span className="inline-block w-3 h-3 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full mr-3 shadow-lg"></span>
                        User Interface
                      </h3>
                      <ul className="text-slate-700 dark:text-slate-200 pl-5 list-disc ml-4 space-y-1.5 text-sm font-medium">
                        <li>Modern glassmorphic design</li>
                        <li>Dark and light mode support</li>
                        <li>Real-time camera preview</li>
                        <li>Responsive mobile and desktop layouts</li>
                        <li>Real-time visitor counter</li>
                        <li>Status notifications and toasts</li>
                      </ul>
                    </div>
                  </div>
                    </div>
                  )}

                  {selectedTab === 'privacy' && (
                    <div>
                      <h2 className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent mb-6">
                        Privacy Policy
                      </h2>
                      <div className="bg-gradient-to-br from-sky-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 p-4 rounded-xl shadow-sm mb-6 border border-sky-100 dark:border-slate-600">
                        <p className="text-base text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                          Your privacy is our priority. This policy explains how your images and personal data are handled.
                        </p>
                      </div>

                      <div className="space-y-4">
                    <div className="bg-gradient-to-br from-sky-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-sky-100 dark:border-slate-600 hover-lift">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center">
                        <span className="inline-block w-3 h-3 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full mr-3 shadow-lg"></span>
                        Image Processing
                      </h3>
                      <p className="text-slate-700 dark:text-slate-200 pl-5 text-sm font-medium">
                        All image processing happens locally within your browser on your device. No images are uploaded to external servers unless you explicitly choose to share them.
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-sky-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-sky-100 dark:border-slate-600 hover-lift">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center">
                        <span className="inline-block w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mr-3 shadow-lg"></span>
                        Local Storage
                      </h3>
                      <p className="text-slate-700 dark:text-slate-200 pl-5 text-sm font-medium">
                        Your photo strips are stored in your browser's local storage. We do not collect or store any images on our servers. Your images stay entirely on your device.
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-sky-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-sky-100 dark:border-slate-600 hover-lift">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center">
                        <span className="inline-block w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-3 shadow-lg"></span>
                        Shared Links & Expiration
                      </h3>
                      <p className="text-slate-700 dark:text-slate-200 pl-5 text-sm font-medium">
                        Share links expire after 10 minutes for security and privacy. After expiration, the shared photo strip is no longer accessible. Shareable links are unique and cannot be guessed.
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-sky-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-sky-100 dark:border-slate-600 hover-lift">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center">
                        <span className="inline-block w-3 h-3 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mr-3 shadow-lg"></span>
                        User Authentication
                      </h3>
                      <p className="text-slate-700 dark:text-slate-200 pl-5 text-sm font-medium">
                        User authentication is handled securely by Clerk. We do not store passwords or sensitive authentication details. Your user ID is used only to associate your share links with your account.
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-sky-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-sky-100 dark:border-slate-600 hover-lift">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center">
                        <span className="inline-block w-3 h-3 bg-gradient-to-r from-yellow-500 to-lime-500 rounded-full mr-3 shadow-lg"></span>
                        Visitor Tracking
                      </h3>
                      <p className="text-slate-700 dark:text-slate-200 pl-5 text-sm font-medium">
                        We track a simple visitor counter displayed on the header for informational purposes only. This counter does not collect personal information or track individual users.
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-sky-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-sky-100 dark:border-slate-600 hover-lift">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center">
                        <span className="inline-block w-3 h-3 bg-gradient-to-r from-red-500 to-rose-500 rounded-full mr-3 shadow-lg"></span>
                        Policy Updates
                      </h3>
                      <p className="text-slate-700 dark:text-slate-200 pl-5 text-sm font-medium">
                        This privacy policy may be updated periodically to reflect new features and changes. Your continued use of the application indicates acceptance of the updated policy.
                      </p>
                    </div>
                  </div>
                    </div>
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
