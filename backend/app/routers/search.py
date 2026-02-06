"""
Search routes — thin wrappers around ydc_service.
"""
from fastapi import APIRouter, Query

from backend.app.services.ydc_service import search_web, search_web_slim

router = APIRouter(prefix="/api/search", tags=["search"])


@router.get("")
def api_search(
    q: str = Query(..., description="Search query"),
    count: int = Query(5, ge=1, le=20, description="Number of results"),
    freshness: str = Query("week", description="day | week | month | year"),
):
    """Return raw You.com search results."""
    return search_web(q, count=count, freshness=freshness)


@router.get("/slim")
def api_search_slim(
    q: str = Query(..., description="Search query"),
    count: int = Query(5, ge=1, le=20, description="Number of results"),
    freshness: str = Query("week", description="day | week | month | year"),
):
    """Return cleaned-up search results (title, url, description only)."""
    return search_web_slim(q, count=count, freshness=freshness)
