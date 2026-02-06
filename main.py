"""
FastAPI app: API only. Frontend is deployed separately and calls this backend.
"""
from pathlib import Path

from dotenv import load_dotenv

load_dotenv(Path(__file__).resolve().parent / ".env")

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

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


@app.get("/")
def root():
    return {"message": "BranderAgent API", "docs": "/docs", "health": "/api/health"}


# --- Include routers ---
from backend.routers.search import router as search_router
from backend.routers.sphere import router as sphere_router
from backend.routers.tweet import router as tweet_router

app.include_router(search_router)
app.include_router(sphere_router)
app.include_router(tweet_router)