import React, { useEffect, useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  getPointerPosition,
  hexToHsv,
  hsvToHex,
  normalizeHex,
} from "@/lib/color-utils";

interface ColorPickerProps {
  id: string;
  label: string;
  color: string;
  onChange: (color: string) => void;
  darkMode?: boolean;
}

function DragSurface({
  className,
  style,
  pointerX,
  pointerY,
  onPointerValue,
  ariaLabel,
}: {
  className?: string;
  style?: React.CSSProperties;
  pointerX: number;
  pointerY: number;
  onPointerValue: (x: number, y: number, element: HTMLDivElement) => void;
  ariaLabel: string;
}) {
  const surfaceRef = useRef<HTMLDivElement>(null);

  const updateFromPointer = (clientX: number, clientY: number) => {
    const element = surfaceRef.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const { x, y } = getPointerPosition(clientX, clientY, rect);
    onPointerValue(x, y, element);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    updateFromPointer(event.clientX, event.clientY);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
    updateFromPointer(event.clientX, event.clientY);
  };

  return (
    <div
      ref={surfaceRef}
      role="slider"
      aria-label={ariaLabel}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn("relative touch-none select-none", className)}
      style={style}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-md"
        style={{
          left: `${pointerX * 100}%`,
          top: `${pointerY * 100}%`,
          boxShadow: "0 0 0 1px rgba(0,0,0,0.25)",
        }}
      />
    </div>
  );
}

export function ColorPicker({
  id,
  label,
  color,
  onChange,
  darkMode = false,
}: ColorPickerProps) {
  const safeColor = normalizeHex(color);
  const [open, setOpen] = useState(false);
  const [hsv, setHsv] = useState(() => hexToHsv(safeColor));
  const previewColor = hsvToHex(hsv.h, hsv.s, hsv.v);

  useEffect(() => {
    setHsv(hexToHsv(normalizeHex(color)));
  }, [color]);

  const updateColor = (nextHsv: typeof hsv) => {
    setHsv(nextHsv);
    onChange(hsvToHex(nextHsv.h, nextHsv.s, nextHsv.v));
  };

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

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            id={id}
            type="button"
            aria-label={`${label}: ${safeColor}`}
            className={cn(
              "h-8 w-16 shrink-0 rounded-lg border shadow-sm transition-all duration-200 hover-lift touch-manipulation",
              darkMode ? "border-slate-500" : "border-slate-300"
            )}
            style={{ backgroundColor: safeColor }}
          />
        </PopoverTrigger>

        <PopoverContent
          align="end"
          sideOffset={8}
          className={cn(
            "w-[min(calc(100vw-2rem),280px)] p-3",
            darkMode ? "border-slate-600 bg-slate-900 text-slate-100" : ""
          )}
        >
          <p className="mb-3 text-xs font-medium text-slate-500 dark:text-slate-400">
            Drag to pick a color
          </p>

          <DragSurface
            ariaLabel={`${label} shade`}
            pointerX={hsv.s / 100}
            pointerY={1 - hsv.v / 100}
            className="h-36 w-full cursor-crosshair overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700"
            style={{
              backgroundColor: `hsl(${hsv.h}, 100%, 50%)`,
              backgroundImage:
                "linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent)",
            }}
            onPointerValue={(x, y) => {
              updateColor({
                ...hsv,
                s: x * 100,
                v: (1 - y) * 100,
              });
            }}
          />

          <DragSurface
            ariaLabel={`${label} hue`}
            pointerX={hsv.h / 360}
            pointerY={0.5}
            className="mt-3 h-4 w-full cursor-ew-resize overflow-hidden rounded-full border border-slate-200 dark:border-slate-700"
            style={{
              backgroundImage:
                "linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)",
            }}
            onPointerValue={(x) => {
              updateColor({
                ...hsv,
                h: x * 360,
              });
            }}
          />

          <div className="mt-3 flex items-center justify-between gap-2">
            <div
              className="h-8 w-8 shrink-0 rounded-lg border border-slate-200 dark:border-slate-700"
              style={{ backgroundColor: previewColor }}
            />
            <span className="text-xs font-mono uppercase text-slate-500 dark:text-slate-400">
              {previewColor}
            </span>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
