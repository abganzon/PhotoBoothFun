import React from "react";
import { Button } from "@/components/ui/button";
import { Camera, Palette, LayoutGrid, ChevronLeft, ChevronRight, Check } from "lucide-react";

interface StepProgressProps {
  currentStep: number;
  onNext: () => void;
  onPrevious: () => void;
  disableNext?: boolean;
  hideNavigation?: boolean;
}

export function StepProgress({
  currentStep,
  onNext,
  onPrevious,
  disableNext,
  hideNavigation = false,
}: StepProgressProps) {
  const steps = [
    { name: "Layout", icon: LayoutGrid },
    { name: "Camera", icon: Camera },
    { name: "Customize", icon: Palette },
  ] as const;

  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-center gap-0 sm:gap-2">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = currentStep === index;
          const isComplete = currentStep > index;

          return (
            <React.Fragment key={step.name}>
              <div className="flex flex-col items-center min-w-[72px] sm:min-w-[88px]">
                <div
                  className={`relative w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-br from-sky-500 to-indigo-600 text-white shadow-lg shadow-sky-500/30 scale-110"
                      : isComplete
                        ? "bg-sky-100 dark:bg-sky-900/40 text-sky-600 dark:text-sky-400 border-2 border-sky-300 dark:border-sky-700"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-400 border-2 border-slate-200 dark:border-slate-700"
                  }`}
                >
                  {isComplete ? (
                    <Check className="h-5 w-5" strokeWidth={2.5} />
                  ) : (
                    <Icon className="h-5 w-5" />
                  )}
                </div>
                <span
                  className={`mt-2 text-xs sm:text-sm font-semibold transition-colors ${
                    isActive
                      ? "text-sky-600 dark:text-sky-400"
                      : isComplete
                        ? "text-slate-600 dark:text-slate-300"
                        : "text-slate-400 dark:text-slate-500"
                  }`}
                >
                  {step.name}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`h-0.5 w-10 sm:w-20 mb-6 rounded-full transition-colors duration-300 ${
                    currentStep > index
                      ? "bg-gradient-to-r from-sky-500 to-indigo-500"
                      : "bg-slate-200 dark:bg-slate-700"
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {!hideNavigation && (
        <div className="flex justify-between items-center mt-6 px-1">
          <Button
            variant="outline"
            onClick={onPrevious}
            disabled={currentStep === 0}
            className="rounded-xl border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <Button
            onClick={onNext}
            disabled={currentStep === steps.length - 1 || disableNext}
            className="rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white shadow-md"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
}
