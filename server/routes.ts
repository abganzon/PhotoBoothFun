import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { resolveUserId } from "./resolve-user-id";import {
  createPhotoStripHandler,
  createSharedLinkHandler,
  getSharedLinkHandler,
} from "./share-handlers";

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

  app.post("/api/photo-strips", resolveUserId, createPhotoStripHandler);
  app.post("/api/shared-links", resolveUserId, createSharedLinkHandler);

  app.get("/api/shared-links/:id", getSharedLinkHandler);

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
  app.get("/api/photo-strips", resolveUserId, async (req, res) => {
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
