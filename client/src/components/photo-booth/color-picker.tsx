import React from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface ColorPickerProps {
  id: string;
  label: string;
  color: string;
  onChange: (color: string) => void;
  darkMode?: boolean;
}

export function ColorPicker({
  id,
  label,
  color,
  onChange,
  darkMode = false,
}: ColorPickerProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      <Label
        htmlFor={id}
        className={cn(
          "text-xs sm:text-sm",
          darkMode ? "text-slate-100" : "text-slate-900"
        )}
      >
        {label}
      </Label>

      <div className="relative h-8 w-16 shrink-0">
        <div
          aria-hidden
          className={cn(
            "h-full w-full rounded-lg border shadow-sm transition-all duration-200 hover-lift",
            darkMode ? "border-slate-500" : "border-slate-300"
          )}
          style={{ backgroundColor: color }}
        />
        <input
          id={id}
          type="color"
          value={color}
          onChange={(event) => onChange(event.target.value)}
          className="strip-color-input absolute inset-0 h-full w-full cursor-pointer opacity-0 touch-manipulation"
          aria-label={label}
        />
      </div>
    </div>
  );
}
