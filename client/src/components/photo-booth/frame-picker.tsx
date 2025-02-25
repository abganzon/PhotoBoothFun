import React from "react";
import { frames, type Frame } from "@/lib/frames";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface FramePickerProps {
  selectedFrame: Frame;
  onSelectFrame: (frame: Frame) => void;
}

export function FramePicker({ selectedFrame, onSelectFrame }: FramePickerProps) {
  return (
    <div className="space-y-2">
      <Label>Choose Frame Style</Label>
      <RadioGroup
        value={selectedFrame.id}
        onValueChange={(value) => {
          const frame = frames.find((f) => f.id === value);
          if (frame) onSelectFrame(frame);
        }}
        className="grid grid-cols-1 gap-4 mt-2"
      >
        {frames.map((frame) => (
          <div
            key={frame.id}
            className={`relative flex items-center rounded-lg border-2 p-4 cursor-pointer ${
              selectedFrame.id === frame.id
                ? "border-primary bg-primary/10"
                : "border-muted hover:border-primary/50"
            }`}
            onClick={() => onSelectFrame(frame)}
          >
            <RadioGroupItem
              value={frame.id}
              id={frame.id}
              className="absolute right-4"
            />
            <div className="flex flex-col">
              <Label htmlFor={frame.id} className="font-medium">
                {frame.name}
              </Label>
              <span className="text-sm text-muted-foreground flex gap-2">
                {frame.decorations.top?.slice(0, 3).map((decoration, i) => (
                  <span key={i}>{decoration}</span>
                ))}
              </span>
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
