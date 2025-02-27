import { photoStrips, type PhotoStrip, type InsertPhotoStrip } from "@shared/schema";
import { db } from "./db";

export interface IStorage {
  createPhotoStrip(photoStrip: InsertPhotoStrip): Promise<PhotoStrip>;
  db: typeof db;
}

export class Storage implements IStorage {
  db: typeof db;

  constructor() {
    this.db = db;
  }

  async createPhotoStrip(insertPhotoStrip: InsertPhotoStrip): Promise<PhotoStrip> {
    const [photoStrip] = await this.db
      .insert(photoStrips)
      .values(insertPhotoStrip)
      .returning();
    return photoStrip;
  }
}

export const storage = new Storage();