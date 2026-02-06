"""
FastAPI app: serves API at /api/* and frontend static files at / (single Render instance).
"""
from pathlib import Path

from dotenv import load_dotenv

load_dotenv(Path(__file__).resolve().parent / ".env")

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse

app = FastAPI(title="BranderAgent")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
def health():
    return {"status": "ok"}


# API routes first so /api/* takes precedence
from backend.routers.search import router as search_router
from backend.routers.sphere import router as sphere_router
from backend.routers.tweet import router as tweet_router
from backend.routers.profile import router as profile_router
app.include_router(search_router)
app.include_router(sphere_router)
app.include_router(tweet_router)
app.include_router(profile_router)

# Frontend: serve static export (after API so /api is not overridden)
out_dir = Path(__file__).resolve().parent / "out"


@app.get("/{path:path}")
def serve_frontend(path: str):
    """Serve frontend: .html for routes like /dashboard; static files by path."""
    if path.startswith("api") or ".." in path or not out_dir.exists():
        raise HTTPException(status_code=404, detail="Not Found")
    if not path:
        index = out_dir / "index.html"
        if index.is_file():
            return FileResponse(index)
        raise HTTPException(status_code=404, detail="Not Found")
    # Resolve to a path under out_dir (no traversal)
    base = (out_dir / path).resolve()
    if not str(base).startswith(str(out_dir.resolve())):
        raise HTTPException(status_code=404, detail="Not Found")
    if base.is_file():
        return FileResponse(base)
    if base.is_dir():
        index = base / "index.html"
        if index.is_file():
            return FileResponse(index)
    # Next.js export: /dashboard -> dashboard.html (no trailing slash)
    last = path.split("/")[-1]
    if "." not in last:
        html_file = out_dir / f"{path}.html"
        if html_file.is_file():
            return FileResponse(html_file)
    raise HTTPException(status_code=404, detail="Not Found")