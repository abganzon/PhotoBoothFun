import express from "express";
import serverless from "serverless-http";
import { storage } from "../../server/storage";
import { insertPhotoStripSchema } from "../../shared/schema";
import { randomUUID } from "crypto";

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));

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
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    
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
    
    const sharedLink = await storage.getSharedLink(id);
    
    if (!sharedLink) {
      res.status(404).json({ error: "Link not found or expired" });
      return;
    }
    
    const photoStrip = await storage.getPhotoStrip(sharedLink.photoStripId);
    
    if (!photoStrip) {
      res.status(404).json({ error: "Photo strip not found" });
      return;
    }
    
    const responseData = {
      ...photoStrip,
      photos: Array.isArray(photoStrip.photos) ? photoStrip.photos : []
    };
    
    res.json(responseData);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve photo strip" });
  }
});

// Visitor counter endpoints (Netlify function)
app.get('/api/visitors', async (req, res) => {
  try {
    const count = await storage.getVisitorCount();
    res.setHeader('Content-Type', 'application/json');
    res.json({ count });
  } catch (e) {
    res.status(500).json({ error: 'Failed to read visitor count' });
  }
});

app.post('/api/visitors/increment', async (req, res) => {
  try {
    const count = await storage.incrementVisitorCount();
    res.setHeader('Content-Type', 'application/json');
    res.json({ count });
  } catch (e) {
    res.status(500).json({ error: 'Failed to increment visitor count' });
  }
});

export const handler = serverless(app, {
  basePath: '/.netlify/functions/api'
});
