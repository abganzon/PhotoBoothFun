import { pgTable, text, serial, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const photoStrips = pgTable("photo_strips", {
  id: serial("id").primaryKey(),
  photos: text("photos").array().notNull(),
  backgroundColor: text("background_color").notNull(),
  stickers: jsonb("stickers")
    .$type<Array<{ id: string; x: number; y: number }>>()
    .notNull(),
});

export const insertPhotoStripSchema = createInsertSchema(photoStrips).pick({
  photos: true,
  backgroundColor: true,
  stickers: true,
});

export type InsertPhotoStrip = z.infer<typeof insertPhotoStripSchema>;
export type PhotoStrip = typeof photoStrips.$inferSelect;
