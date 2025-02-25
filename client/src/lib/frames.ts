import { z } from "zod";

export interface Frame {
  id: string;
  name: string;
  borderColor: string;
  backgroundColor: string;
  decorations: {
    top?: string[];
    bottom?: string[];
    left?: string[];
    right?: string[];
  };
}

export const frames: Frame[] = [
  {
    id: "cute",
    name: "Cute Hearts",
    borderColor: "#ff69b4",
    backgroundColor: "#ffe6f2",
    decorations: {
      top: ["❤️", "💖", "💝"],
      bottom: ["💕", "💗", "💓"],
    }
  },
  {
    id: "tropical",
    name: "Tropical Paradise",
    borderColor: "#00bcd4",
    backgroundColor: "#e0f7fa",
    decorations: {
      top: ["🌴", "🌺", "🌸"],
      bottom: ["🏖️", "🌊", "🐠"],
    }
  },
  {
    id: "sparkles",
    name: "Sparkles & Stars",
    borderColor: "#ffd700",
    backgroundColor: "#fffde7",
    decorations: {
      top: ["✨", "⭐", "🌟"],
      bottom: ["💫", "⚡", "🌠"],
    }
  }
];

export const frameSchema = z.object({
  id: z.string(),
  name: z.string(),
  borderColor: z.string(),
  backgroundColor: z.string(),
  decorations: z.object({
    top: z.array(z.string()).optional(),
    bottom: z.array(z.string()).optional(),
    left: z.array(z.string()).optional(),
    right: z.array(z.string()).optional(),
  }),
});
