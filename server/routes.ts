import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPhotoStripSchema, insertSharedLinkSchema } from "@shared/schema";
import { randomUUID } from "crypto";

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

  app.post("/api/shared-links", async (req, res) => {
    try {
      const { photoStripId } = req.body;
      const linkId = randomUUID();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now
      
      const sharedLink = await storage.createSharedLink({
        id: linkId,
        photoStripId,
        expiresAt
      });
      
      res.setHeader('Content-Type', 'application/json');
      res.json({ 
        id: sharedLink.id, 
        expiresAt: sharedLink.expiresAt,
        url: `/shared/${sharedLink.id}`
      });
    } catch (error) {
      res.setHeader('Content-Type', 'application/json');
      res.status(400).json({ error: "Failed to create shared link" });
    }
  });

  app.get("/api/shared-links/:id", async (req, res) => {
    try {
      const { id } = req.params;
      console.log("Looking for shared link:", id);
      
      const sharedLink = await storage.getSharedLink(id);
      console.log("Found shared link:", sharedLink ? "Yes" : "No");
      
      if (!sharedLink) {
        console.log("Shared link not found or expired");
        res.status(404).json({ error: "Link not found or expired" });
        return;
      }
      
      const photoStrip = await storage.getPhotoStrip(sharedLink.photoStripId);
      console.log("Found photo strip:", photoStrip ? "Yes" : "No");
      console.log("Photo strip photos count:", photoStrip?.photos ? (photoStrip.photos as string[]).length : 0);
      
      if (!photoStrip) {
        console.log("Photo strip not found");
        res.status(404).json({ error: "Photo strip not found" });
        return;
      }
      
      // Ensure photos is properly formatted as an array
      const responseData = {
        ...photoStrip,
        photos: Array.isArray(photoStrip.photos) ? photoStrip.photos : []
      };
      
      console.log("Sending photo strip data:", responseData);
      res.json(responseData);
    } catch (error) {
      console.error("Error retrieving shared photo strip:", error);
      res.status(500).json({ error: "Failed to retrieve photo strip" });
    }
  });

  return httpServer;
}
