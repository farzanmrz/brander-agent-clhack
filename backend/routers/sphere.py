"""
Sphere routes — endpoints for sphere creation and query generation.
"""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List

from backend.services.gemini_service import (
    generate_sphere_queries,
    generate_tweets_from_queries,
    QueryContent,
    TweetGenerationResponse
)

router = APIRouter(prefix="/api/sphere", tags=["sphere"])


class SphereDescriptionRequest(BaseModel):
    """Request model for sphere description."""
    description: str


class SphereQueriesResponse(BaseModel):
    """Response model for generated queries."""
    description: str
    queries: list[str]


class TweetGenerationRequest(BaseModel):
    """Request model for tweet generation."""
    sphere_description: str
    queries: List[QueryContent]


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


@router.post("/generate-tweets", response_model=TweetGenerationResponse)
def generate_tweets(request: TweetGenerationRequest):
    """
    Generate tweets from queries and their article content.
    
    Takes a list of queries with their associated article content (up to 5 articles
    per query) and generates one unique tweet per query based on the content.
    
    Request body:
    {
        "sphere_description": "AI developer sharing practical takes",
        "queries": [
            {
                "query": "new AI tools 2026",
                "content": "Article 1 text... Article 2 text..."
            },
            ...
        ]
    }
    
    Returns one tweet per query.
    """
    try:
        response = generate_tweets_from_queries(
            queries=request.queries,
            sphere_description=request.sphere_description
        )
        return response
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to generate tweets: {str(e)}"
        )