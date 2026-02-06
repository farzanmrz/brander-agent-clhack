"""
FastAPI app: serves API at /api/* and frontend static files at / (single Render instance).
"""
from pathlib import Path

from dotenv import load_dotenv

load_dotenv(Path(__file__).resolve().parent / ".env")

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

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

app.include_router(search_router)
app.include_router(sphere_router)
app.include_router(tweet_router)

# Frontend: serve static export (after API so /api is not overridden)
out_dir = Path(__file__).resolve().parent / "out"
if out_dir.exists():
    app.mount("/", StaticFiles(directory=str(out_dir), html=True), name="frontend")