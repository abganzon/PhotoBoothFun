import { pgTable, text, serial, jsonb, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const photoStrips = pgTable("photo_strips", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  photos: jsonb("photos").notNull(),
  layout: text("layout").notNull(),
  backgroundColor: text("background_color").notNull(),
  stripName: text("strip_name"),
  showDate: boolean("show_date").notNull(),
  showName: boolean("show_name").notNull(),
  nameColor: text("name_color"),
  dateColor: text("date_color"),
});

export const insertPhotoStripSchema = createInsertSchema(photoStrips).pick({
  photos: true,
  layout: true,
  backgroundColor: true,
  stripName: true,
  showDate: true,
  showName: true,
  nameColor: true,
  dateColor: true,
});

export type InsertPhotoStrip = z.infer<typeof insertPhotoStripSchema>;
export type PhotoStrip = typeof photoStrips.$inferSelect;