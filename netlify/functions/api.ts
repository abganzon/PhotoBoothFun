import express from "express";
import serverless from "serverless-http";
import { storage } from "../../server/storage";
import { resolveUserId } from "../../server/resolve-user-id";
import {
  createPhotoStripHandler,
  createSharedLinkHandler,
  getSharedLinkHandler,
} from "../../server/share-handlers";

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));

app.post("/api/photo-strips", resolveUserId, createPhotoStripHandler);
app.post("/api/shared-links", resolveUserId, createSharedLinkHandler);
app.get("/api/shared-links/:id", getSharedLinkHandler);

app.get("/api/visitors", async (_req, res) => {
  try {
    const count = await storage.getVisitorCount();
    res.setHeader("Content-Type", "application/json");
    res.json({ count });
  } catch {
    res.status(500).json({ error: "Failed to read visitor count" });
  }
});

app.post("/api/visitors/increment", async (_req, res) => {
  try {
    const count = await storage.incrementVisitorCount();
    res.setHeader("Content-Type", "application/json");
    res.json({ count });
  } catch {
    res.status(500).json({ error: "Failed to increment visitor count" });
  }
});

export const handler = serverless(app, {
  basePath: "/.netlify/functions/api",
});
