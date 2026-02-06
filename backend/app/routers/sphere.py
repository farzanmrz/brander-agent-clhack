"""
Sphere routes — endpoints for sphere creation and query generation.
"""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from backend.app.services.gemini_service import generate_sphere_queries

router = APIRouter(prefix="/api/sphere", tags=["sphere"])


class SphereDescriptionRequest(BaseModel):
    """Request model for sphere description."""
    description: str


class SphereQueriesResponse(BaseModel):
    """Response model for generated queries."""
    description: str
    queries: list[str]


@router.post("/queries", response_model=SphereQueriesResponse)
def generate_queries(request: SphereDescriptionRequest):
    """
    Generate 5 distinct search queries from a sphere description.
    
    Takes a free-text description of what the user wants to post about
    and returns 5 optimized search queries for finding relevant content.
    """
    try:
        queries = generate_sphere_queries(request.description)
        return SphereQueriesResponse(
            description=request.description,
            queries=queries
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to generate queries: {str(e)}"
        )