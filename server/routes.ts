import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPhotoStripSchema, insertVisitorSchema } from "@shared/schema";
import { eq, and, gte } from "drizzle-orm";
import { visitors } from "@shared/schema";
import { subHours } from "date-fns";
import { sql } from "drizzle-orm";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/photo-strips", async (req, res) => {
    try {
      const data = insertPhotoStripSchema.parse(req.body);
      const photoStrip = await storage.createPhotoStrip(data);
      res.json(photoStrip);
    } catch (error) {
      res.status(400).json({ error: "Invalid photo strip data" });
    }
  });

  // Track visitor
  app.post("/api/visitors", async (req, res) => {
    try {
      const data = insertVisitorSchema.parse({
        userAgent: req.headers["user-agent"],
        ipAddress: req.ip,
      });
      const visitor = await storage.db.insert(visitors).values(data).returning();
      res.json(visitor[0]);
    } catch (error) {
      res.status(400).json({ error: "Failed to track visitor" });
    }
  });

  // Get visitor count for last 24 hours
  app.get("/api/visitors/count", async (req, res) => {
    try {
      const last24Hours = subHours(new Date(), 24);
      const visitorCount = await storage.db
        .select({ count: sql<number>`count(*)` })
        .from(visitors)
        .where(gte(visitors.timestamp, last24Hours))
        .then(result => result[0].count);
      
      res.json({ count: visitorCount });
    } catch (error) {
      res.status(500).json({ error: "Failed to get visitor count" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
