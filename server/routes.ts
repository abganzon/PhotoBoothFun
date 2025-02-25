import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPhotoStripSchema } from "@shared/schema";

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

  const httpServer = createServer(app);
  return httpServer;
}
