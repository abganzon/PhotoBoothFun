import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPhotoStripSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);

  app.post("/api/photo-strips", async (req, res) => {
    try {
      const data = insertPhotoStripSchema.parse(req.body);
      const photoStrip = await storage.createPhotoStrip(data);
      res.setHeader('Content-Type', 'application/json');
      res.json(photoStrip);
    } catch (error) {
      res.setHeader('Content-Type', 'application/json');
      res.status(400).json({ error: "Invalid photo strip data" });
    }
  });

  return httpServer;
}
