import React from "react";
import { Button } from "@/components/ui/button";
import { Camera, Palette, ChevronLeft, ChevronRight } from "lucide-react";

interface StepProgressProps {
  currentStep: number;
  onNext: () => void;
  onPrevious: () => void;
  disableNext?: boolean;
}

export function StepProgress({ currentStep, onNext, onPrevious, disableNext }: StepProgressProps) {
  const steps = [
    { name: "Camera", icon: <Camera className="h-5 w-5" /> },
    { name: "Customization", icon: <Palette className="h-5 w-5" /> },
  ];

  return (
    <div className="w-full">
      {/* Step Progress */}
      <div className="flex items-center justify-center mb-8">
        {steps.map((step, index) => (
          <React.Fragment key={step.name}>
            <div className={`flex flex-col items-center ${currentStep === index ? "text-primary" : "text-gray-400"}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                currentStep === index ? "border-primary bg-primary/10" : "border-gray-200"
              }`}>
                {step.icon}
              </div>
              <span className="mt-2 text-sm font-medium">{step.name}</span>
            </div>
            {index < steps.length - 1 && (
              <div className={`w-24 h-0.5 mx-4 ${currentStep > index ? "bg-primary" : "bg-gray-200"}`} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={currentStep === 0}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <Button
          onClick={onNext}
          disabled={currentStep === steps.length - 1 || disableNext}
          className="flex items-center gap-2"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
} 