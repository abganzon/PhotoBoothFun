import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type EffectType = "none" | "sepia" | "grayscale" | "vignette" | "cool" | "warm";

interface EffectPickerProps {
  effect: EffectType;
  onChange: (effect: EffectType) => void;
}

const EFFECTS: { value: EffectType; label: string }[] = [
  { value: "none", label: "No Effect" },
  { value: "sepia", label: "Sepia" },
  { value: "grayscale", label: "Grayscale" },
  { value: "vignette", label: "Vignette" },
  { value: "cool", label: "Cool Tone" },
  { value: "warm", label: "Warm Tone" },
];

export function EffectPicker({ effect, onChange }: EffectPickerProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="effect-select">Photo Effect</Label>
      <Select value={effect} onValueChange={(value) => onChange(value as EffectType)}>
        <SelectTrigger id="effect-select">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {EFFECTS.map((eff) => (
            <SelectItem key={eff.value} value={eff.value}>
              {eff.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
