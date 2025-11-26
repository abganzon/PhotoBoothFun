import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export type StickerType = "none" | "stars" | "graffiti" | "toronto" | "guitar";

interface CustomizationStickerPickerProps {
  sticker: StickerType;
  onChange: (sticker: StickerType) => void;
}

const STICKERS: { value: StickerType; label: string }[] = [
  { value: "none", label: "No Sticker" },
  { value: "stars", label: "Red Stars" },
  { value: "graffiti", label: "Graffiti Tag" },
  { value: "toronto", label: "Toronto Text" },
  { value: "guitar", label: "Guitar Icon" },
];

export function CustomizationStickerPicker({
  sticker,
  onChange,
}: CustomizationStickerPickerProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="sticker-select">Sticker</Label>
      <Select value={sticker} onValueChange={(value) => onChange(value as StickerType)}>
        <SelectTrigger id="sticker-select">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {STICKERS.map((s) => (
            <SelectItem key={s.value} value={s.value}>
              {s.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
