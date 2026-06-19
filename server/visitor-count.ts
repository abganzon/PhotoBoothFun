import fs from "fs/promises";
import path from "path";
import { getStore } from "@netlify/blobs";

const VISITOR_COUNT_BLOB_KEY = "total";
const visitorFilePath = path.resolve(process.cwd(), "visitor-count.json");

function isNetlifyRuntime(): boolean {
  return Boolean(process.env.NETLIFY || process.env.AWS_LAMBDA_FUNCTION_NAME);
}

async function readFromFile(): Promise<number | null> {
  try {
    const data = await fs.readFile(visitorFilePath, "utf-8");
    const parsed = JSON.parse(data);
    if (typeof parsed?.count === "number") {
      return parsed.count;
    }
  } catch {
    // File missing or invalid — treat as uninitialized.
  }
  return null;
}

async function writeToFile(count: number): Promise<void> {
  await fs.writeFile(visitorFilePath, JSON.stringify({ count }), "utf-8");
}

async function readFromBlob(): Promise<number | null> {
  try {
    const store = getStore({ name: "site-stats", consistency: "strong" });
    const data = await store.get(VISITOR_COUNT_BLOB_KEY, { type: "json" });
    if (data && typeof (data as { count?: number }).count === "number") {
      return (data as { count: number }).count;
    }
  } catch (error) {
    console.error("Failed to read visitor count from Netlify Blobs:", error);
  }
  return null;
}

async function writeToBlob(count: number): Promise<void> {
  const store = getStore({ name: "site-stats", consistency: "strong" });
  await store.setJSON(VISITOR_COUNT_BLOB_KEY, { count });
}

export async function getVisitorCount(): Promise<number> {
  const stored = isNetlifyRuntime() ? await readFromBlob() : await readFromFile();
  return stored ?? 0;
}

export async function incrementVisitorCount(): Promise<number> {
  const current = await getVisitorCount();
  const next = current + 1;

  if (isNetlifyRuntime()) {
    await writeToBlob(next);
  } else {
    await writeToFile(next);
  }

  return next;
}
