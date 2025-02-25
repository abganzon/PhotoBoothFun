import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";

export function Landing() {
  const navigate = useNavigate();
  const [visitorCount, setVisitorCount] = useState(0);
  const version = "1.0.0";

  useEffect(() => {
    // Get visitor count from localStorage
    const lastVisit = localStorage.getItem("lastVisit");
    const todayCount = localStorage.getItem("todayVisitors") || "0";
    const today = new Date().toDateString();

    if (lastVisit !== today) {
      // Reset count for new day
      localStorage.setItem("todayVisitors", "1");
      localStorage.setItem("lastVisit", today);
      setVisitorCount(1);
    } else {
      // Increment count for today
      const newCount = parseInt(todayCount) + 1;
      localStorage.setItem("todayVisitors", newCount.toString());
      setVisitorCount(newCount);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-secondary/20 flex flex-col items-center justify-center p-4">
      <div className="space-y-8 text-center">
        <div className="space-y-6">
          <div className="relative w-24 h-24 mx-auto">
            <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse" />
            <img
              src="/generated-icon.png"
              alt="RoBooth Logo"
              className="relative w-full h-full object-cover rounded-full border-2 border-primary/20"
            />
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">
              Welcome to RoBooth
            </h1>
            <p className="text-muted-foreground">
              A Digital Photobooth by Influenzah
            </p>
          </div>
        </div>
        
        <Button
          size="lg"
          onClick={() => navigate("/booth")}
          className="h-14 px-8 rounded-full"
        >
          <Camera className="mr-2 h-5 w-5" />
          Start Capturing
        </Button>
      </div>

      <div className="fixed bottom-4 flex flex-col items-center gap-2">
        <p className="text-sm text-muted-foreground">Version {version}</p>
        <p className="text-sm font-medium">{visitorCount} visitors today</p>
      </div>
    </div>
  );
}
