import { isAuthEnabled } from "./auth-config";
import { getAnonymousUserId } from "./anonymous-session";

export async function apiFetch(
  input: RequestInfo | URL,
  init: RequestInit = {}
): Promise<Response> {
  const headers = new Headers(init.headers);

  if (!isAuthEnabled) {
    headers.set("X-Anonymous-User-Id", getAnonymousUserId());
  }

  return fetch(input, { ...init, headers });
}
