import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROBOOTH_MASCOT_SRC } from "@/lib/assets";

export default function Landing() {
  const [, setLocation] = useLocation();
  const [visitors, setVisitors] = useState<number | null>(null);

  useEffect(() => {
    let mounted = true;

    const syncVisitors = async () => {
      try {
        const res = await fetch("/api/visitors");
        if (!res.ok) return;
        const data = await res.json();
        if (mounted && typeof data?.count === "number") {
          setVisitors(data.count);
        }
      } catch {
        // Ignore fetch errors; header polling will retry.
      }
    };

    syncVisitors();

    const handleVisitorEvent = (event: Event) => {
      const detail = (event as CustomEvent<{ count?: number }>).detail;
      if (detail && typeof detail.count === "number") {
        setVisitors(detail.count);
      }
    };

    window.addEventListener("visitor-count-updated", handleVisitorEvent);

    return () => {
      mounted = false;
      window.removeEventListener("visitor-count-updated", handleVisitorEvent);
    };
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-24 text-center">
        <img
          src={ROBOOTH_MASCOT_SRC}
          alt="RoBooth mascot"
          className="w-52 h-52 sm:w-60 sm:h-60 md:w-72 md:h-72 object-contain drop-shadow-2xl mb-6"
        />

        <h1 className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
          RoBooth
        </h1>

        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-md">
          Snap four photos, customize your strip, and share — no account needed.
        </p>

        <Button
          size="lg"
          onClick={() => setLocation("/home")}
          className="mt-8 px-10 py-6 text-lg font-bold bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
        >
          <Camera className="h-6 w-6 mr-2" />
          Start Photo Booth
        </Button>

        {visitors !== null && (
          <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
            {visitors.toLocaleString()} visitors
          </p>
        )}

        <div className="mt-10 flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
          <span>by Influenzah</span>
          <span>•</span>
          <Link href="/privacy" className="text-sky-600 dark:text-sky-400 hover:underline font-medium">
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
}
