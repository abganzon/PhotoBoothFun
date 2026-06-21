import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { resolveUserId } from "./resolve-user-id";
import {
  createPhotoStripHandler,
  createSharedLinkHandler,
  getSharedLinkHandler,
} from "./share-handlers";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);

  app.post("/api/photo-strips", resolveUserId, createPhotoStripHandler);
  app.post("/api/shared-links", resolveUserId, createSharedLinkHandler);
  app.get("/api/shared-links/:id", getSharedLinkHandler);

  app.get("/api/photo-strips", resolveUserId, async (req, res) => {
    try {
      const userId = req.userId!;
      const photoStrips = await storage.getPhotoStripsByUserId(userId);
      res.setHeader("Content-Type", "application/json");
      res.json(photoStrips);
    } catch (error) {
      res.setHeader("Content-Type", "application/json");
      res.status(500).json({ error: "Failed to retrieve photo strips" });
    }
  });

  return httpServer;
}
