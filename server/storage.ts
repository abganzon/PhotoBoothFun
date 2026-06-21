import { photoStrips, type PhotoStrip, type InsertPhotoStrip } from "@shared/schema";
import { sharedLinks, type SharedLink, type InsertSharedLink } from "@shared/schema";
import {
  getSharedLinkFromBlob,
  persistSharedLinkToBlob,
} from "./shared-link-blob";
export interface IStorage {
  createPhotoStrip(photoStrip: InsertPhotoStrip): Promise<PhotoStrip>;
  createSharedLink(
    sharedLink: InsertSharedLink,
    photoStripData?: PhotoStrip,
    textStyle?: StoredSharedLink["textStyle"]
  ): Promise<SharedLink>;
  getSharedLink(id: string): Promise<(SharedLink & { photoStripData?: PhotoStrip; textStyle?: StoredSharedLink["textStyle"] }) | null>;
  getPhotoStripForSharedLink(link: SharedLink & { photoStripData?: PhotoStrip }): Promise<PhotoStrip | null>;
  getPhotoStrip(id: number): Promise<PhotoStrip | null>;
  getPhotoStripsByUserId(userId: string): Promise<PhotoStrip[]>;
}

type StoredSharedLink = SharedLink & {
  photoStripData?: PhotoStrip & {
    nameFont?: string;
    dateFont?: string;
    nameFontSize?: number;
    dateFontSize?: number;
  };
  textStyle?: {
    nameFont?: string;
    dateFont?: string;
    nameFontSize?: number;
    dateFontSize?: number;
  };
};

export class MemStorage implements IStorage {
  private photoStrips: Map<number, PhotoStrip>;
  private sharedLinks: Map<string, StoredSharedLink>;
  currentId: number;

  constructor() {
    this.photoStrips = new Map();
    this.sharedLinks = new Map();
    this.currentId = 1;
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
    photoStripData?: PhotoStrip,
    textStyle?: StoredSharedLink["textStyle"]
  ): Promise<SharedLink> {
    const sharedLink: StoredSharedLink = {
      ...insertSharedLink,
      photoStripId: insertSharedLink.photoStripId || 0,
      createdAt: new Date(),
      isActive: true,
      photoStripData,
      textStyle,
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

// Prototype extensions removed.

export const storage = new MemStorage();