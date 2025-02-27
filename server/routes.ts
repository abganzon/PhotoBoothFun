import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPhotoStripSchema, insertVisitorSchema } from "@shared/schema";
import { eq, and, gte } from "drizzle-orm";
import { visitors } from "@shared/schema";
import { subHours } from "date-fns";
import { sql } from "drizzle-orm";
import { WebSocket, WebSocketServer } from 'ws';

let wss: WebSocketServer;

// Function to broadcast visitor count to all connected clients
async function broadcastVisitorCount() {
  try {
    const last24Hours = subHours(new Date(), 24);
    const visitorCount = await storage.db
      .select({ count: sql<number>`count(*)` })
      .from(visitors)
      .where(gte(visitors.timestamp, last24Hours))
      .then(result => Math.max(1, result[0].count)); // Ensure minimum count of 1
    
    const message = JSON.stringify({ type: 'visitorCount', count: visitorCount });
    if (wss) {
      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    }
  } catch (error) {
    console.error('Error broadcasting visitor count:', error);
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);
  
  // Initialize WebSocket server
  wss = new WebSocketServer({ server: httpServer });
  
  wss.on('connection', async (ws) => {
    console.log('Client connected');
    // Send initial visitor count to new client
    await broadcastVisitorCount();
    
    ws.on('error', console.error);
    ws.on('close', () => console.log('Client disconnected'));
  });

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

  // Track visitor
  app.post("/api/visitors", async (req, res) => {
    try {
      const data = insertVisitorSchema.parse({
        userAgent: req.headers["user-agent"],
        ipAddress: req.ip,
      });
      const visitor = await storage.db.insert(visitors).values(data).returning();
      res.setHeader('Content-Type', 'application/json');
      res.json(visitor[0]);
      
      // Broadcast updated count to all clients
      await broadcastVisitorCount();
    } catch (error) {
      res.setHeader('Content-Type', 'application/json');
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
        .then(result => Math.max(1, result[0].count)); // Ensure minimum count of 1
      
      res.setHeader('Content-Type', 'application/json');
      res.json({ count: visitorCount });
    } catch (error) {
      res.setHeader('Content-Type', 'application/json');
      res.status(500).json({ error: "Failed to get visitor count" });
    }
  });

  return httpServer;
}
