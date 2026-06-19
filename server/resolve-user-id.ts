import type { Request, Response, NextFunction } from "express";
import { getAuth } from "@clerk/express";

const ANON_ID_PATTERN =
  /^anon_[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function resolveUserId(req: Request, res: Response, next: NextFunction) {
  let userId = req.userId;

  if (!userId) {
    try {
      const auth = getAuth(req);
      userId = auth.userId || undefined;
    } catch {
      // Clerk unavailable
    }
  }

  if (!userId) {
    const anonHeader = req.header("X-Anonymous-User-Id");
    if (anonHeader && ANON_ID_PATTERN.test(anonHeader)) {
      userId = anonHeader;
    }
  }

  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  req.userId = userId;
  next();
}
