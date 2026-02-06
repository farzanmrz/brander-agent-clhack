"""
Gemini Service: Query Generation and Tweet Drafting

This service uses Google Gemini to generate search queries from sphere descriptions
and to draft tweets based on researched content.
"""

import os
from typing import List
from pydantic import BaseModel
from google import genai
from google.genai import types
from dotenv import load_dotenv

# Load environment variables
load_dotenv()


class SphereQueries(BaseModel):
    """Structured output model for sphere queries."""
    queries: List[str]


def generate_sphere_queries(description: str) -> List[str]:
    """
    Generate 5 distinct, varied search queries from a sphere description.
    
    Uses Gemini's structured output feature to guarantee valid, type-safe responses.
    
    Args:
        description: Free-text description of what the user wants to post about
        
    Returns:
        List of 5 search queries optimized for finding recent, relevant content
        
    Example:
        >>> description = "I want to build my brand as an AI developer sharing practical takes on new tools and frameworks"
        >>> queries = generate_sphere_queries(description)
        >>> print(queries)
        ['new AI developer tools released 2026', 'LLM framework comparison practical guide', ...]
    """
    api_key = os.getenv("GOOGLE_API_KEY")
    if not api_key:
        raise ValueError("GOOGLE_API_KEY not found in environment variables")
    
    # Initialize Gemini client
    client = genai.Client(api_key=api_key)
    
    # Craft the prompt
    prompt = f"""You are a search query expert. Given a user's personal branding sphere description, generate exactly 5 distinct, varied search queries that would find the most relevant and recent web content for that topic.

User's sphere description:
"{description}"

Requirements for the queries:
1. Each query must be DISTINCT and cover a different angle or aspect of the topic
2. Queries should be optimized for web search (short, keyword-focused, not conversational)
3. Focus on finding RECENT content (include year 2026 or terms like "latest", "new", "trends" where appropriate)
4. Vary the types of content searched: tools, guides, comparisons, best practices, news, trends, etc.
5. Be specific enough to return high-quality results, not too vague

Return exactly 5 queries as a JSON object with a "queries" array."""
    
    # Call Gemini API with structured output
    response = client.models.generate_content(
        model='gemini-3-pro-preview',
        contents=prompt,
        config=types.GenerateContentConfig(
            response_mime_type='application/json',
            response_schema=SphereQueries
        )
    )
    
    # Parse structured response
    result = SphereQueries.model_validate_json(response.text)
    return result.queries
