import { pgTable, text, serial, jsonb, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const photoStrips = pgTable("photo_strips", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  photos: text("photos").array().notNull(),
  backgroundColor: text("background_color").notNull(),
  showDate: boolean("show_date").notNull().default(true),
  stickers: jsonb("stickers")
    .$type<Array<{ id: string; x: number; y: number; color?: string }>>()
    .notNull(),
});

export const insertPhotoStripSchema = createInsertSchema(photoStrips).pick({
  name: true,
  photos: true,
  backgroundColor: true,
  showDate: true,
  stickers: true,
});

export type InsertPhotoStrip = z.infer<typeof insertPhotoStripSchema>;
export type PhotoStrip = typeof photoStrips.$inferSelect;