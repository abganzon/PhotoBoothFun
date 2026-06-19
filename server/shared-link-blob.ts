import { getStore } from "@netlify/blobs";

type StoredSharedLink = {
  id: string;
  userId: string;
  photoStripId: number;
  createdAt: string | Date;
  expiresAt: string | Date;
  isActive: boolean;
  photoStripData?: {
    id: number;
    userId: string;
    createdAt: string | Date;
    photos: unknown;
    layout: string;
    backgroundColor: string;
    stripName: string | null;
    showDate: boolean;
    showName: boolean;
    nameColor: string | null;
    dateColor: string | null;
  };
};

function isNetlifyRuntime(): boolean {
  return Boolean(process.env.NETLIFY || process.env.AWS_LAMBDA_FUNCTION_NAME);
}

function reviveSharedLink(link: StoredSharedLink) {
  return {
    ...link,
    createdAt: new Date(link.createdAt),
    expiresAt: new Date(link.expiresAt),
    photoStripData: link.photoStripData
      ? {
          ...link.photoStripData,
          createdAt: new Date(link.photoStripData.createdAt),
        }
      : undefined,
  };
}

export async function persistSharedLinkToBlob(
  link: StoredSharedLink
): Promise<void> {
  if (!isNetlifyRuntime()) return;

  try {
    const store = getStore({ name: "shared-links", consistency: "strong" });
    await store.setJSON(link.id, link);
  } catch (error) {
    console.error("Failed to persist shared link to Netlify Blobs:", error);
  }
}

export async function getSharedLinkFromBlob(
  id: string
): Promise<ReturnType<typeof reviveSharedLink> | null> {
  if (!isNetlifyRuntime()) return null;

  try {
    const store = getStore({ name: "shared-links", consistency: "strong" });
    const link = await store.get(id, { type: "json" });
    if (!link) return null;

    const revived = reviveSharedLink(link as StoredSharedLink);
    if (new Date() > revived.expiresAt || !revived.isActive) {
      return null;
    }

    return revived;
  } catch (error) {
    console.error("Failed to read shared link from Netlify Blobs:", error);
    return null;
  }
}
