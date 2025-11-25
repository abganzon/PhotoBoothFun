import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import { getAuth } from "@clerk/express";
import { storage } from "./storage";
import { insertPhotoStripSchema, insertSharedLinkSchema } from "@shared/schema";
import { randomUUID } from "crypto";

// Extend Express Request to include userId
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);

  // SSE clients for visitor count realtime updates
  const sseClients = new Set<any>();
  // heartbeat to keep connections alive
  const heartbeatInterval = setInterval(() => {
    sseClients.forEach((client) => {
      try {
        client.write(': keep-alive\n\n');
      } catch (e) {
        // ignore write errors; cleanup happens on close
      }
    });
  }, 25000);

  // Middleware to require authentication on API routes
  const requireAuth = (req: Request, res: any, next: any) => {
    // Try to get userId from Clerk if available, otherwise check req.userId
    let userId = req.userId;
    
    if (!userId) {
      try {
        const auth = getAuth(req);
        userId = auth.userId || undefined;
      } catch (e) {
        // Clerk not available, userId remains undefined
      }
    }
    
    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    req.userId = userId;
    next();
  };

  app.post("/api/photo-strips", requireAuth, async (req, res) => {
    try {
      const userId = req.userId!;
      const data = insertPhotoStripSchema.parse({
        ...req.body,
        userId,
      });
      const photoStrip = await storage.createPhotoStrip(data);
      res.setHeader('Content-Type', 'application/json');
      res.json(photoStrip);
    } catch (error) {
      res.setHeader('Content-Type', 'application/json');
      res.status(400).json({ error: "Invalid photo strip data" });
    }
  });

  app.post("/api/shared-links", requireAuth, async (req, res) => {
    try {
      const userId = req.userId!;
      const { photoStripId } = req.body;
      const linkId = randomUUID();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now
      
      const sharedLink = await storage.createSharedLink({
        id: linkId,
        userId,
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

  // Visitor counter - public endpoints
  app.get("/api/visitors", async (req, res) => {
    try {
      const count = await storage.getVisitorCount();
      res.setHeader('Content-Type', 'application/json');
      res.json({ count });
    } catch (error) {
      res.status(500).json({ error: 'Failed to read visitor count' });
    }
  });

  app.post("/api/visitors/increment", async (req, res) => {
    try {
      const count = await storage.incrementVisitorCount();
      // Broadcast to SSE clients
      sseClients.forEach((client) => {
        try {
          client.write(`data: ${JSON.stringify({ count })}\n\n`);
        } catch (e) {
          // ignore
        }
      });
      res.setHeader('Content-Type', 'application/json');
      res.json({ count });
    } catch (error) {
      res.status(500).json({ error: 'Failed to increment visitor count' });
    }
  });

  // Server-Sent Events endpoint for visitor count realtime updates
  app.get('/api/visitors/stream', async (req, res) => {
    try {
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');
      // send initial value
      const count = await storage.getVisitorCount();
      res.write(`data: ${JSON.stringify({ count })}\n\n`);

      // add to client set
      sseClients.add(res);

      req.on('close', () => {
        sseClients.delete(res);
      });
    } catch (e) {
      res.status(500).end();
    }
  });

  // User's gallery - requires authentication
  app.get("/api/photo-strips", requireAuth, async (req, res) => {
    try {
      const userId = req.userId!;
      const photoStrips = await storage.getPhotoStripsByUserId(userId);
      res.setHeader('Content-Type', 'application/json');
      res.json(photoStrips);
    } catch (error) {
      res.setHeader('Content-Type', 'application/json');
      res.status(500).json({ error: "Failed to retrieve photo strips" });
    }
  });

  return httpServer;
}
