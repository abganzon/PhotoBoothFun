import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  LAYOUT_OPTIONS,
  type PhotoLayout,
  getLayoutConfig,
} from "@shared/layouts";

interface LayoutPickerProps {
  layout: PhotoLayout;
  onLayoutChange: (layout: PhotoLayout) => void;
  darkMode?: boolean;
}

function LayoutPreview({
  layoutId,
  selected,
  darkMode,
  size = "lg",
}: {
  layoutId: PhotoLayout;
  selected: boolean;
  darkMode: boolean;
  size?: "sm" | "lg";
}) {
  const cellClass = (active: boolean) =>
    active
      ? "bg-gradient-to-br from-sky-200 to-indigo-200 dark:from-sky-800 dark:to-indigo-800"
      : darkMode
        ? "bg-slate-600"
        : "bg-white";

  if (layoutId === "collage") {
    return (
      <div
        className={`rounded-lg grid grid-cols-2 gap-1 shadow-inner ${
          size === "lg" ? "h-[88px] w-[88px] p-1.5" : "h-[56px] w-[56px] p-1"
        } ${darkMode ? "bg-slate-700" : "bg-slate-200/80"}`}
      >
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={`rounded-sm ${cellClass(selected)}`} />
        ))}
      </div>
    );
  }

  const count = layoutId === "single" ? 1 : layoutId === "duo" ? 2 : 4;

  return (
    <div
      className={`flex flex-col gap-1 rounded-lg shadow-inner ${
        size === "lg" ? "h-[108px] w-[72px] p-1.5" : "h-[68px] w-[46px] p-1"
      } ${darkMode ? "bg-slate-700" : "bg-slate-200/80"}`}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={`flex-1 rounded-sm ${cellClass(selected)}`} />
      ))}
    </div>
  );
}

function SideLayoutCard({
  layoutId,
  darkMode,
  onSelect,
}: {
  layoutId: PhotoLayout;
  darkMode: boolean;
  onSelect: () => void;
}) {
  const config = getLayoutConfig(layoutId);

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-label={`Select ${config.name}`}
      className={`flex w-[88px] shrink-0 flex-col items-center gap-2 rounded-xl p-3 transition-all duration-300 hover:scale-[1.03] sm:w-[96px] ${
        darkMode
          ? "border border-slate-600/80 bg-slate-800/60 text-slate-300 hover:border-sky-600/60 hover:bg-slate-800"
          : "border border-slate-200 bg-white/70 text-slate-500 hover:border-sky-200 hover:bg-white"
      }`}
    >
      <LayoutPreview layoutId={layoutId} selected={false} darkMode={darkMode} size="sm" />
      <div className="space-y-0.5 text-center">
        <p className="text-[11px] font-semibold leading-tight">{config.name}</p>
        <p className="text-[10px] leading-tight opacity-80">{config.subtitle}</p>
      </div>
    </button>
  );
}

export function LayoutPicker({ layout, onLayoutChange, darkMode = false }: LayoutPickerProps) {
  const currentIndex = Math.max(
    0,
    LAYOUT_OPTIONS.findIndex((item) => item.id === layout)
  );
  const dragStartX = useRef<number | null>(null);
  const activeLayout = getLayoutConfig(layout);

  const wrapIndex = (index: number) =>
    ((index % LAYOUT_OPTIONS.length) + LAYOUT_OPTIONS.length) % LAYOUT_OPTIONS.length;

  const prevIndex = wrapIndex(currentIndex - 1);
  const nextIndex = wrapIndex(currentIndex + 1);
  const prevLayout = LAYOUT_OPTIONS[prevIndex];
  const nextLayout = LAYOUT_OPTIONS[nextIndex];

  const goToIndex = (index: number) => {
    onLayoutChange(LAYOUT_OPTIONS[wrapIndex(index)].id);
  };

  const handleDragStart = (clientX: number) => {
    dragStartX.current = clientX;
  };

  const handleDragEnd = (clientX: number) => {
    if (dragStartX.current === null) return;

    const delta = clientX - dragStartX.current;
    if (delta > 50) {
      goToIndex(currentIndex - 1);
    } else if (delta < -50) {
      goToIndex(currentIndex + 1);
    }

    dragStartX.current = null;
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 sm:gap-3">
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => goToIndex(currentIndex - 1)}
          aria-label="Previous layout"
          className="h-10 w-10 shrink-0 rounded-xl sm:h-11 sm:w-11"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <div
          className={`min-h-[240px] flex-1 touch-pan-y rounded-2xl px-2 py-4 transition-all duration-300 sm:px-4 sm:py-5 ${
            darkMode
              ? "border-2 border-sky-500/80 bg-gradient-to-br from-sky-950/40 to-indigo-950/40 shadow-lg shadow-sky-500/10"
              : "border-2 border-sky-500/80 bg-gradient-to-br from-sky-50 to-indigo-50 shadow-lg shadow-sky-500/10"
          }`}
          onTouchStart={(event) => handleDragStart(event.touches[0].clientX)}
          onTouchEnd={(event) => handleDragEnd(event.changedTouches[0].clientX)}
          onPointerDown={(event) => {
            if (event.pointerType === "mouse" && event.button !== 0) return;
            handleDragStart(event.clientX);
          }}
          onPointerUp={(event) => handleDragEnd(event.clientX)}
        >
          <div className="flex h-full items-center justify-center gap-2 sm:gap-4">
            <SideLayoutCard
              layoutId={prevLayout.id}
              darkMode={darkMode}
              onSelect={() => goToIndex(prevIndex)}
            />

            <div
              className={`flex min-w-0 flex-1 flex-col items-center justify-center gap-3 rounded-2xl px-3 py-4 sm:gap-4 sm:px-5 sm:py-5 ${
                darkMode
                  ? "border border-sky-400/40 bg-slate-900/40 shadow-md shadow-sky-500/10"
                  : "border border-sky-300/60 bg-white/80 shadow-md shadow-sky-500/10"
              }`}
            >
              <LayoutPreview layoutId={activeLayout.id} selected darkMode={darkMode} size="lg" />

              <div className="space-y-1 text-center">
                <p className="text-base font-bold text-sky-700 dark:text-sky-300 sm:text-lg">
                  {activeLayout.name}
                </p>
                <p className="text-xs font-medium text-sky-600 dark:text-sky-400">
                  {activeLayout.subtitle}
                </p>
                <p className="hidden text-xs text-slate-400 dark:text-slate-500 sm:block">
                  {activeLayout.description}
                </p>
              </div>
            </div>

            <SideLayoutCard
              layoutId={nextLayout.id}
              darkMode={darkMode}
              onSelect={() => goToIndex(nextIndex)}
            />
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => goToIndex(currentIndex + 1)}
          aria-label="Next layout"
          className="h-10 w-10 shrink-0 rounded-xl sm:h-11 sm:w-11"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex items-center justify-center gap-2">
        {LAYOUT_OPTIONS.map((item, index) => (
          <button
            key={item.id}
            type="button"
            aria-label={`Select ${item.name}`}
            onClick={() => goToIndex(index)}
            className={`h-2.5 rounded-full transition-all duration-200 ${
              index === currentIndex
                ? "w-7 bg-sky-500"
                : "w-2.5 bg-slate-300 hover:bg-sky-300 dark:bg-slate-600 dark:hover:bg-sky-700"
            }`}
          />
        ))}
      </div>

      <p className="text-center text-xs text-slate-400 dark:text-slate-500">
        Swipe, drag, or tap the side layouts to browse
      </p>
    </div>
  );
}
