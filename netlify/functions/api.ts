import express from "express";
import serverless from "serverless-http";
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

export const handler = serverless(app, {
  basePath: "/.netlify/functions/api",
});
