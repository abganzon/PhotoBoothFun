import { photoStrips, type PhotoStrip, type InsertPhotoStrip } from "@shared/schema";
import { sharedLinks, type SharedLink, type InsertSharedLink } from "@shared/schema";
import fs from "fs/promises";
import path from "path";
import {
  getSharedLinkFromBlob,
  persistSharedLinkToBlob,
} from "./shared-link-blob";
export interface IStorage {
  createPhotoStrip(photoStrip: InsertPhotoStrip): Promise<PhotoStrip>;
  createSharedLink(sharedLink: InsertSharedLink, photoStripData?: PhotoStrip): Promise<SharedLink>;
  getSharedLink(id: string): Promise<(SharedLink & { photoStripData?: PhotoStrip }) | null>;
  getPhotoStripForSharedLink(link: SharedLink & { photoStripData?: PhotoStrip }): Promise<PhotoStrip | null>;
  getPhotoStrip(id: number): Promise<PhotoStrip | null>;
  getPhotoStripsByUserId(userId: string): Promise<PhotoStrip[]>;
}

type StoredSharedLink = SharedLink & { photoStripData?: PhotoStrip };

export class MemStorage implements IStorage {
  private photoStrips: Map<number, PhotoStrip>;
  private sharedLinks: Map<string, StoredSharedLink>;
  currentId: number;
  visitorCount: number;
  visitorFilePath: string;

  constructor() {
    this.photoStrips = new Map();
    this.sharedLinks = new Map();
    this.currentId = 1;
    this.visitorCount = 300000;
    this.visitorFilePath = path.resolve(process.cwd(), "visitor-count.json");
    // initialize visitor count from file if present
    void this.loadVisitorCount();
  }

  async loadVisitorCount(): Promise<void> {
    try {
      const data = await fs.readFile(this.visitorFilePath, "utf-8");
      const parsed = JSON.parse(data);
      if (typeof parsed?.count === "number") {
        this.visitorCount = parsed.count;
      }
    } catch (e) {
      this.visitorCount = 300000;
      await this.persistVisitorCount();
    }
  }

  private async persistVisitorCount(): Promise<void> {
    try {
      await fs.writeFile(this.visitorFilePath, JSON.stringify({ count: this.visitorCount }), "utf-8");
    } catch (error) {
      console.error("Failed to persist visitor count:", error);
    }
  }

  async getVisitorCount(): Promise<number> {
    return this.visitorCount || 0;
  }

  async incrementVisitorCount(): Promise<number> {
    this.visitorCount = (this.visitorCount || 0) + 1;
    await this.persistVisitorCount();
    return this.visitorCount;
  }

  async createPhotoStrip(insertPhotoStrip: InsertPhotoStrip): Promise<PhotoStrip> {
    const id = this.currentId++;
    const photoStrip: PhotoStrip = { 
      ...insertPhotoStrip,
      id, 
      createdAt: new Date(),
      nameColor: insertPhotoStrip.nameColor || null,
      dateColor: insertPhotoStrip.dateColor || null,
      stripName: insertPhotoStrip.stripName || null,
    };
    this.photoStrips.set(id, photoStrip);
    return photoStrip;
  }

  async createSharedLink(
    insertSharedLink: InsertSharedLink,
    photoStripData?: PhotoStrip
  ): Promise<SharedLink> {
    const sharedLink: StoredSharedLink = {
      ...insertSharedLink,
      photoStripId: insertSharedLink.photoStripId || 0,
      createdAt: new Date(),
      isActive: true,
      photoStripData,
    };
    this.sharedLinks.set(sharedLink.id, sharedLink);
    await persistSharedLinkToBlob(sharedLink);
    return sharedLink;
  }

  async getSharedLink(id: string): Promise<StoredSharedLink | null> {
    const inMemory = this.sharedLinks.get(id);
    if (inMemory) {
      if (new Date() > new Date(inMemory.expiresAt) || !inMemory.isActive) {
        return null;
      }
      return inMemory;
    }

    const fromBlob = await getSharedLinkFromBlob(id);
    if (fromBlob) {
      this.sharedLinks.set(fromBlob.id, fromBlob);
      return fromBlob;
    }

    return null;
  }
  async getPhotoStripForSharedLink(link: StoredSharedLink): Promise<PhotoStrip | null> {
    if (link.photoStripData) {
      return link.photoStripData;
    }
    return this.getPhotoStrip(link.photoStripId);
  }

  async getPhotoStrip(id: number): Promise<PhotoStrip | null> {
    return this.photoStrips.get(id) || null;
  }

  async getPhotoStripsByUserId(userId: string): Promise<PhotoStrip[]> {
    const userPhotoStrips: PhotoStrip[] = [];
    this.photoStrips.forEach((photoStrip) => {
      if (photoStrip.userId === userId) {
        userPhotoStrips.push(photoStrip);
      }
    });
    return userPhotoStrips.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
}

// Prototype extensions removed; class provides visitor count methods and persistence.

export const storage = new MemStorage();