import type { Request, Response } from "express";
import { randomUUID } from "crypto";
import { storage } from "./storage";
import { insertPhotoStripSchema } from "@shared/schema";
import { mergeStripTextStyle, extractStripTextStyle } from "@shared/strip-text-style";
import { resolveUserId } from "./resolve-user-id";

type PhotoStripPayload = {
  photos?: unknown;
  layout?: unknown;
  backgroundColor?: unknown;
  stripName?: unknown;
  showDate?: unknown;
  showName?: unknown;
  nameColor?: unknown;
  dateColor?: unknown;
  nameFont?: unknown;
  dateFont?: unknown;
  nameFontSize?: unknown;
  dateFontSize?: unknown;
  photoStripId?: number;
};

function withTextStyleExtras<T extends Record<string, unknown>>(
  photoStrip: T,
  body: PhotoStripPayload
) {
  return mergeStripTextStyle(photoStrip, body);
}

function hasInlinePhotoStrip(body: PhotoStripPayload): boolean {
  return Array.isArray(body.photos) && body.photos.length > 0;
}

export async function createSharedLinkHandler(req: Request, res: Response) {
  try {
    const userId = req.userId!;
    const body = req.body as PhotoStripPayload;
    let photoStrip = null;

    if (hasInlinePhotoStrip(body)) {
      const data = insertPhotoStripSchema.parse({ ...body, userId });
      photoStrip = await storage.createPhotoStrip(data);
    } else if (body.photoStripId) {
      photoStrip = await storage.getPhotoStrip(body.photoStripId);
    }

    if (!photoStrip) {
      res.status(400).json({ error: "Photo strip not found" });
      return;
    }

    const linkId = randomUUID();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    const photoStripWithStyle = withTextStyleExtras(photoStrip, body);
    const textStyle = extractStripTextStyle(photoStripWithStyle);

    const sharedLink = await storage.createSharedLink(
      {
        id: linkId,
        userId,
        photoStripId: photoStrip.id,
        expiresAt,
      },
      photoStripWithStyle,
      textStyle
    );

    res.setHeader("Content-Type", "application/json");
    res.json({
      id: sharedLink.id,
      expiresAt: sharedLink.expiresAt,
      url: `/shared/${sharedLink.id}`,
    });
  } catch (error) {
    console.error("Failed to create shared link:", error);
    res.setHeader("Content-Type", "application/json");
    res.status(400).json({ error: "Failed to create shared link" });
  }
}

export async function getSharedLinkHandler(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const sharedLink = await storage.getSharedLink(id);

    if (!sharedLink) {
      res.status(404).json({ error: "Link not found or expired" });
      return;
    }

    const photoStrip = await storage.getPhotoStripForSharedLink(sharedLink);

    if (!photoStrip) {
      res.status(404).json({ error: "Photo strip not found" });
      return;
    }

    const textStyle = extractStripTextStyle({
      ...(photoStrip as Record<string, unknown>),
      ...(sharedLink.textStyle ?? {}),
    });

    res.json({
      ...photoStrip,
      ...textStyle,
      photos: Array.isArray(photoStrip.photos) ? photoStrip.photos : [],
    });
  } catch (error) {
    console.error("Failed to retrieve shared photo strip:", error);
    res.status(500).json({ error: "Failed to retrieve photo strip" });
  }
}

export async function createPhotoStripHandler(req: Request, res: Response) {
  try {
    const userId = req.userId!;
    const data = insertPhotoStripSchema.parse({
      ...req.body,
      userId,
    });
    const photoStrip = await storage.createPhotoStrip(data);
    res.setHeader("Content-Type", "application/json");
    res.json(photoStrip);
  } catch (error) {
    console.error("Invalid photo strip data:", error);
    res.setHeader("Content-Type", "application/json");
    res.status(400).json({ error: "Invalid photo strip data" });
  }
}

export { resolveUserId };
