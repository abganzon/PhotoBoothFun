import React, { useState } from "react";
import { stickers } from "@/lib/stickers";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

interface StickerPickerProps {
  onSelectSticker: (stickerId: string, color?: string) => void;
}

const stickerColors = [
  "#FF0000", // Red
  "#00FF00", // Green
  "#0000FF", // Blue
  "#FFD700", // Gold
  "#FF69B4", // Hot Pink
  "#9400D3", // Violet
];

export function StickerPicker({ onSelectSticker }: StickerPickerProps) {
  const [selectedColor, setSelectedColor] = useState<string | undefined>();

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 mb-4">
        {stickerColors.map((color) => (
          <button
            key={color}
            className={`w-8 h-8 rounded-full border-2 ${
              selectedColor === color ? "border-black" : "border-transparent"
            }`}
            style={{ backgroundColor: color }}
            onClick={() => setSelectedColor(color === selectedColor ? undefined : color)}
          />
        ))}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-8 h-8 p-0">+</Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px]">
            <Input
              type="color"
              value={selectedColor || "#000000"}
              onChange={(e) => setSelectedColor(e.target.value)}
            />
          </PopoverContent>
        </Popover>
      </div>

      <ScrollArea className="h-32 rounded-md border p-4">
        <div className="flex gap-2 flex-wrap">
          {stickers.map((sticker) => (
            <Button
              key={sticker.id}
              variant="outline"
              className="h-16 w-16"
              onClick={() => onSelectSticker(sticker.id, selectedColor)}
            >
              <img
                src={sticker.url}
                alt={sticker.name}
                className="w-full h-full object-cover"
                style={selectedColor ? { filter: `opacity(0.8) drop-shadow(0 0 0 ${selectedColor})` } : undefined}
              />
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}