import { pgTable, text, serial, jsonb, boolean, timestamp } from "drizzle-orm/pg-core";
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

export const visitors = pgTable("visitors", {
  id: serial("id").primaryKey(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
  userAgent: text("user_agent"),
  ipAddress: text("ip_address"),
});

export const insertPhotoStripSchema = createInsertSchema(photoStrips).pick({
  name: true,
  photos: true,
  backgroundColor: true,
  showDate: true,
  stickers: true,
});

export const insertVisitorSchema = createInsertSchema(visitors).pick({
  userAgent: true,
  ipAddress: true,
});

export type InsertPhotoStrip = z.infer<typeof insertPhotoStripSchema>;
export type PhotoStrip = typeof photoStrips.$inferSelect;
export type InsertVisitor = z.infer<typeof insertVisitorSchema>;
export type Visitor = typeof visitors.$inferSelect;