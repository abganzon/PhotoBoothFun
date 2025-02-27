import { users, type User, type InsertUser } from "@shared/schema";
import { photoStrips, type PhotoStrip, type InsertPhotoStrip } from "@shared/schema";

export interface IStorage {
  createPhotoStrip(photoStrip: InsertPhotoStrip): Promise<PhotoStrip>;
}

export class MemStorage implements IStorage {
  private photoStrips: Map<number, PhotoStrip>;
  currentId: number;

  constructor() {
    this.photoStrips = new Map();
    this.currentId = 1;
  }

  async createPhotoStrip(insertPhotoStrip: InsertPhotoStrip): Promise<PhotoStrip> {
    const id = this.currentId++;
    const photoStrip: PhotoStrip = { ...insertPhotoStrip, id };
    this.photoStrips.set(id, photoStrip);
    return photoStrip;
  }
}

export const storage = new MemStorage();