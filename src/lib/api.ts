/** API base URL. Set NEXT_PUBLIC_API_URL in env; defaults to Render backend. */
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://brander-agent-clhack.onrender.com";

/** Build full API URL for a path like /api/sphere/queries */
export function apiUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${API_URL.replace(/\/$/, "")}${p.startsWith("/api") ? p : `/api${p}`}`;
}
