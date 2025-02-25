
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Landing() {
  const [, setLocation] = useLocation();
  const [visitors, setVisitors] = useState(0);

  useEffect(() => {
    // Simulate visitor count - in real app this would come from backend
    setVisitors(prev => prev + 1);
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
          <Camera className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900">RoBooth</h1>
      </div>
      
      <p className="text-xl text-gray-600 mb-12">
        Welcome to your digital photobooth by influenzah
      </p>

      <Button
        size="lg"
        onClick={() => setLocation("/booth")}
        className="gap-2 text-lg px-8"
      >
        <Camera className="h-6 w-6" />
        Start Capturing
      </Button>

      <div className="fixed bottom-4 flex gap-4 text-sm text-gray-500">
        <span>v1.0.0</span>
        <span>•</span>
        <span>{visitors} visitors</span>
      </div>
    </div>
  );
}
