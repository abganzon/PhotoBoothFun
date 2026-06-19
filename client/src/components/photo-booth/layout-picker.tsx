import React from "react";
import { Check } from "lucide-react";

interface LayoutPickerProps {
  layout: "strip" | "collage";
  onLayoutChange: (layout: "strip" | "collage") => void;
  darkMode?: boolean;
}

const layouts = [
  {
    id: "strip" as const,
    name: "Photo Strip",
    subtitle: "Classic 1×4 vertical",
    description: "Four stacked photos — perfect for printing",
  },
  {
    id: "collage" as const,
    name: "Collage",
    subtitle: "Modern 2×2 grid",
    description: "Four photos in a square grid layout",
  },
];

export function LayoutPicker({ layout, onLayoutChange, darkMode = false }: LayoutPickerProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
      {layouts.map((item) => {
        const selected = layout === item.id;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onLayoutChange(item.id)}
            className={`group relative text-left rounded-2xl p-5 sm:p-6 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 ${
              selected
                ? "bg-gradient-to-br from-sky-50 to-indigo-50 dark:from-sky-950/40 dark:to-indigo-950/40 border-2 border-sky-500 shadow-lg shadow-sky-500/10 scale-[1.02]"
                : darkMode
                  ? "bg-slate-800/80 border-2 border-slate-700 hover:border-sky-500/40 hover:bg-slate-800"
                  : "bg-white border-2 border-slate-200 hover:border-sky-300 hover:shadow-md"
            }`}
          >
            {selected && (
              <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-sky-500 flex items-center justify-center shadow-md">
                <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
              </div>
            )}

            <div className="flex flex-col items-center gap-4">
              {item.id === "strip" ? (
                <div
                  className={`w-[72px] h-[108px] rounded-lg p-1.5 flex flex-col gap-1 shadow-inner ${
                    darkMode ? "bg-slate-700" : "bg-slate-200/80"
                  }`}
                >
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-sm ${
                        selected
                          ? "bg-gradient-to-br from-sky-200 to-indigo-200 dark:from-sky-800 dark:to-indigo-800"
                          : darkMode
                            ? "bg-slate-600"
                            : "bg-white"
                      }`}
                    />
                  ))}
                </div>
              ) : (
                <div
                  className={`w-[88px] h-[88px] rounded-lg p-1.5 grid grid-cols-2 gap-1 shadow-inner ${
                    darkMode ? "bg-slate-700" : "bg-slate-200/80"
                  }`}
                >
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`rounded-sm ${
                        selected
                          ? "bg-gradient-to-br from-sky-200 to-indigo-200 dark:from-sky-800 dark:to-indigo-800"
                          : darkMode
                            ? "bg-slate-600"
                            : "bg-white"
                      }`}
                    />
                  ))}
                </div>
              )}

              <div className="text-center space-y-1">
                <p
                  className={`font-bold text-base ${
                    selected
                      ? "text-sky-700 dark:text-sky-300"
                      : darkMode
                        ? "text-slate-100"
                        : "text-slate-800"
                  }`}
                >
                  {item.name}
                </p>
                <p
                  className={`text-xs font-medium ${
                    selected ? "text-sky-600 dark:text-sky-400" : "text-slate-500 dark:text-slate-400"
                  }`}
                >
                  {item.subtitle}
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500 hidden sm:block">
                  {item.description}
                </p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
