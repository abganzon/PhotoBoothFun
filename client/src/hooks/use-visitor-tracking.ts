import { useEffect } from "react";

const SESSION_KEY = "robooth_visitor_counted";

export function useVisitorTracking() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(SESSION_KEY)) return;

    const recordVisit = async () => {
      try {
        const res = await fetch("/api/visitors/increment", { method: "POST" });
        if (!res.ok) return;

        const data = await res.json();
        if (typeof data?.count !== "number") return;

        sessionStorage.setItem(SESSION_KEY, "1");
        window.dispatchEvent(
          new CustomEvent("visitor-count-updated", { detail: { count: data.count } })
        );
      } catch (error) {
        console.error("Failed to record visitor", error);
      }
    };

    void recordVisit();
  }, []);
}
