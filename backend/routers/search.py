"""
Search routes — thin wrappers around ydc_service.
"""
from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel

from backend.services.ydc_service import search_web, search_web_slim, search_and_fetch

router = APIRouter(prefix="/api/search", tags=["search"])


class SearchContentsRequest(BaseModel):
    """Request body for /contents endpoint."""
    queries: list[str]
    count: int = 5
    freshness: str = "week"


class QueryContent(BaseModel):
    query: str
    content: str


class SearchContentsResponse(BaseModel):
    queries: list[QueryContent]


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


@router.post("/contents", response_model=SearchContentsResponse)
def api_search_contents(request: SearchContentsRequest):
    """
    Search + fetch full page content for multiple queries.

    Takes up to 5 queries, searches for URLs, fetches full markdown
    content via You.com Contents API, and returns concatenated content per query.
    """
    if len(request.queries) > 5:
        raise HTTPException(status_code=400, detail="Maximum 5 queries allowed")

    try:
        results = search_and_fetch(
            request.queries,
            count=request.count,
            freshness=request.freshness,
        )
        return SearchContentsResponse(queries=results)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Search failed: {str(e)}")
