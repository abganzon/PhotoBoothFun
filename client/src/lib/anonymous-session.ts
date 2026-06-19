const STORAGE_KEY = "robooth_anonymous_id";

export function getAnonymousUserId(): string {
  if (typeof window === "undefined") return "anon_server";

  let id = localStorage.getItem(STORAGE_KEY);
  if (!id) {
    id = `anon_${crypto.randomUUID()}`;
    localStorage.setItem(STORAGE_KEY, id);
  }
  return id;
}
