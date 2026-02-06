"""
FastAPI app: API + static frontend (React build in static/).
Backend runs on port 3000 (or PORT env). Replace with full app when ready.
"""
import os
from pathlib import Path

from dotenv import load_dotenv

# Load .env from project root (reliable regardless of CWD)
load_dotenv(Path(__file__).resolve().parent / ".env")

from fastapi import FastAPI
from starlette.exceptions import HTTPException
from starlette.staticfiles import StaticFiles

app = FastAPI(title="BranderAgent")


class SpaStaticFiles(StaticFiles):
    """Serves static files with SPA fallback: non-file paths return index.html."""

    async def get_response(self, path: str, scope):
        try:
            return await super().get_response(path, scope)
        except HTTPException as e:
            if e.status_code == 404 and path != "index.html":
                return await super().get_response("index.html", scope)
            raise


# API routes go here (mount before static so /api etc. take precedence)
@app.get("/api/health")
def health():
    return {"status": "ok"}

# --- Include routers ---
from backend.routers.search import router as search_router
from backend.routers.sphere import router as sphere_router
from backend.routers.tweet import router as tweet_router
app.include_router(search_router)
app.include_router(sphere_router)
app.include_router(tweet_router)

# Serve React build when present; SPA fallback for client-side routing
static_dir = Path(__file__).resolve().parent / "static"
if static_dir.exists() and (static_dir / "index.html").exists():
    app.mount("/", SpaStaticFiles(directory=str(static_dir), html=True), name="frontend")
else:
    @app.get("/")
    def root():
        return {"message": "BranderAgent API", "docs": "/docs", "health": "/api/health"}