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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col items-center justify-center text-white p-4">
      <div className="mb-8">
        <img
          src="/generated-icon.png"
          alt="RoBooth Logo"
          className="w-24 h-24 mx-auto mb-6"
        />
        <h1 className="text-4xl font-bold text-center mb-2">
          Welcome to RoBooth
        </h1>
        <p className="text-gray-400 text-center mb-8">
          A Digital Photobooth by Influenzah
        </p>
        <Button
          size="lg"
          onClick={() => navigate("/booth")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-full font-semibold text-lg flex items-center gap-2"
        >
          <Camera className="w-6 h-6" />
          Start Capturing
        </Button>
      </div>
      <div className="fixed bottom-4 flex flex-col items-center gap-2 text-sm text-gray-400">
        <p>Version {version}</p>
        <p>{visitorCount} visitors today</p>
      </div>
    </div>
  );
}
