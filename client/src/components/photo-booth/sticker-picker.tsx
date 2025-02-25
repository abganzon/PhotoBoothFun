import React from "react";
import { stickers } from "@/lib/stickers";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface StickerPickerProps {
  onSelectSticker: (stickerId: string) => void;
}

export function StickerPicker({ onSelectSticker }: StickerPickerProps) {
  return (
    <ScrollArea className="h-32 rounded-md border p-4">
      <div className="flex gap-2 flex-wrap">
        {stickers.map((sticker) => (
          <Button
            key={sticker.id}
            variant="outline"
            className="h-16 w-16"
            onClick={() => onSelectSticker(sticker.id)}
          >
            <img
              src={sticker.url}
              alt={sticker.name}
              className="w-full h-full object-cover"
            />
          </Button>
        ))}
      </div>
    </ScrollArea>
  );
}
