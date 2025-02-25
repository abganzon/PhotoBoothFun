import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

export function ColorPicker({ color, onChange }: ColorPickerProps) {
  return (
    <div className="flex items-center gap-4">
      <Label htmlFor="strip-color">Strip Color</Label>
      <Input
        id="strip-color"
        type="color"
        value={color}
        onChange={(e) => onChange(e.target.value)}
        className="w-16 h-8 p-1"
      />
    </div>
  );
}
