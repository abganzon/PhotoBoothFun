import { users, type User, type InsertUser } from "@shared/schema";
import { photoStrips, type PhotoStrip, type InsertPhotoStrip } from "@shared/schema";
import { sharedLinks, type SharedLink, type InsertSharedLink } from "@shared/schema";

export interface IStorage {
  createPhotoStrip(photoStrip: InsertPhotoStrip): Promise<PhotoStrip>;
  createSharedLink(sharedLink: InsertSharedLink): Promise<SharedLink>;
  getSharedLink(id: string): Promise<SharedLink | null>;
  getPhotoStrip(id: number): Promise<PhotoStrip | null>;
}

export class MemStorage implements IStorage {
  private photoStrips: Map<number, PhotoStrip>;
  private sharedLinks: Map<string, SharedLink>;
  currentId: number;

  constructor() {
    this.photoStrips = new Map();
    this.sharedLinks = new Map();
    this.currentId = 1;
  }

  async createPhotoStrip(insertPhotoStrip: InsertPhotoStrip): Promise<PhotoStrip> {
    const id = this.currentId++;
    const photoStrip: PhotoStrip = { ...insertPhotoStrip, id, createdAt: new Date() };
    this.photoStrips.set(id, photoStrip);
    return photoStrip;
  }

  async createSharedLink(insertSharedLink: InsertSharedLink): Promise<SharedLink> {
    const sharedLink: SharedLink = { 
      ...insertSharedLink, 
      createdAt: new Date(),
      isActive: true 
    };
    this.sharedLinks.set(sharedLink.id, sharedLink);
    return sharedLink;
  }

  async getSharedLink(id: string): Promise<SharedLink | null> {
    const link = this.sharedLinks.get(id);
    if (!link) return null;
    
    // Check if link is expired
    if (new Date() > new Date(link.expiresAt) || !link.isActive) {
      return null;
    }
    
    return link;
  }

  async getPhotoStrip(id: number): Promise<PhotoStrip | null> {
    return this.photoStrips.get(id) || null;
  }
}

export const storage = new MemStorage();