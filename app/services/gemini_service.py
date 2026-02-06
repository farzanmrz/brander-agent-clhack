"""
Gemini Service: Query Generation and Tweet Drafting

This service uses Google Gemini to generate search queries from sphere descriptions
and to draft tweets based on researched content.
"""

import os
import json
from typing import List
from google import genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()


def generate_sphere_queries(description: str) -> List[str]:
    """
    Generate 5 distinct, varied search queries from a sphere description.
    
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

Return ONLY a JSON array of 5 strings (the queries), nothing else. No explanations, no markdown formatting, just the raw JSON array.

Example format:
["query 1 here", "query 2 here", "query 3 here", "query 4 here", "query 5 here"]"""
    
    # Call Gemini API
    response = client.models.generate_content(
        model='gemini-3-pro-preview',
        contents=prompt
    )
    
    # Parse the response
    response_text = response.text.strip()
    
    # Remove markdown code blocks if present
    if response_text.startswith("```"):
        lines = response_text.split("\n")
        response_text = "\n".join(lines[1:-1])
    
    # Parse JSON
    try:
        queries = json.loads(response_text)
        if not isinstance(queries, list) or len(queries) != 5:
            raise ValueError(f"Expected a list of 5 queries, got: {queries}")
        return queries
    except json.JSONDecodeError as e:
        raise ValueError(f"Failed to parse Gemini response as JSON: {response_text}") from e
