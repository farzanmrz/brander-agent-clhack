/** API base URL. Empty = same origin (single Render instance). For local dev with separate backend, set NEXT_PUBLIC_API_URL e.g. http://localhost:3000 */
export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

/** Build full API URL for a path like /api/sphere/queries */
export function apiUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  const base = API_URL.replace(/\/$/, "");
  const pathPart = p.startsWith("/api") ? p : `/api${p}`;
  return base ? `${base}${pathPart}` : pathPart;
}
