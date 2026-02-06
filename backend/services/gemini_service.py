"""
Gemini Service: Query Generation and Tweet Drafting

This service uses Google Gemini to generate search queries from sphere descriptions
and to draft tweets based on researched content.
"""

import json
import os
from pathlib import Path
from typing import List
from pydantic import BaseModel
from google import genai
from google.genai import types
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

DATA_DIR = Path(__file__).resolve().parent.parent / "data"
BRAND_GUIDELINES_PATH = DATA_DIR / "brand_guidelines.json"


def _load_brand_guidelines() -> str:
    """Load brand_guidelines.json and format as a prompt-ready string."""
    try:
        with open(BRAND_GUIDELINES_PATH, "r") as f:
            guidelines = json.load(f)

        identity = guidelines["identity"]
        voice = guidelines["voice"]
        pillars = guidelines["content_pillars"]
        style = guidelines["style_patterns"]
        do_not = guidelines["do_not"]

        sections = [
            f"Author: {identity['name']} ({identity['handle']})",
            f"Role: {identity['role']}",
            f"Audience: {identity['audience']}",
            f"Niche: {identity['niche']}",
            "",
            f"Tone: {', '.join(voice['tone'])}",
            f"Personality: {voice['personality']}",
            "",
            "Voice rules:",
        ]
        for rule in voice["rules"]:
            sections.append(f"  - {rule}")

        sections.append("")
        sections.append("Content pillars:")
        for p in pillars:
            sections.append(f"  [{p['pillar']}] {p['description']}")
            sections.append(f'    Example: "{p["example"]}"')

        sections.append("")
        sections.append(f"Sentence structure: {style['sentence_structure']}")
        sections.append(f"Formatting: {style['formatting']}")
        sections.append(f"Length: {style['length']}")
        sections.append(f"Vocabulary: {', '.join(style['vocabulary'])}")

        sections.append("")
        sections.append("DO NOT:")
        for d in do_not:
            sections.append(f"  - {d}")

        return "\n".join(sections)
    except Exception:
        return ""


class SphereQueries(BaseModel):
    """Structured output model for sphere queries."""
    queries: List[str]


class QueryContent(BaseModel):
    """Input model for a single query with its article content."""
    query: str
    content: str


class GeneratedTweet(BaseModel):
    """Structured output model for a generated tweet."""
    query: str
    tweet: str


class TweetGenerationResponse(BaseModel):
    """Response model for multiple generated tweets."""
    tweets: List[GeneratedTweet]


class StyledTweet(BaseModel):
    """A tweet with a specific tone/style."""
    tone: str
    tweet: str


class StyledTweetsResponse(BaseModel):
    """Response model for 3 styled tweets."""
    tweets: List[StyledTweet]


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


def generate_tweet_per_query(query: str, content: str, sphere_description: str) -> GeneratedTweet:
    """
    Generate a single tweet from one query's article content using long context.
    
    Uses Gemini's long context capability by placing content first, then instructions.
    This is the recommended pattern for processing large amounts of text.
    
    Args:
        query: The search query text
        content: Concatenated article content (up to 5 articles)
        sphere_description: Original user's brand sphere description for context
        
    Returns:
        GeneratedTweet with the query and generated tweet text
        
    Example:
        >>> query = "new AI developer tools 2026"
        >>> content = "Article 1 text... Article 2 text..."
        >>> sphere = "AI developer sharing practical takes"
        >>> tweet = generate_tweet_per_query(query, content, sphere)
        >>> print(tweet.tweet)
        'New AI tools like X and Y are changing how we build...'
    """
    api_key = os.getenv("GOOGLE_API_KEY")
    if not api_key:
        raise ValueError("GOOGLE_API_KEY not found in environment variables")
    
    # Initialize Gemini client
    client = genai.Client(api_key=api_key)
    
    # Long context pattern: content first, instructions last
    prompt = f"""<ARTICLE CONTENT>
{content}
</ARTICLE CONTENT>

You are a Twitter/X content strategist. The user's brand sphere is: "{sphere_description}"

The above articles were found by searching: "{query}"

Based on the article content above, draft ONE original tweet (max 280 characters) that:
1. Synthesizes a unique, informative take from the articles
2. Aligns with the user's brand sphere
3. Is engaging and adds value (not just a summary)
4. Uses natural language (no hashtag spam)
5. Can include 1-2 relevant hashtags if they add value

Return as JSON with "query" and "tweet" fields."""
    
    # Call Gemini API with structured output
    response = client.models.generate_content(
        model='gemini-3-pro-preview',
        contents=prompt,
        config=types.GenerateContentConfig(
            response_mime_type='application/json',
            response_schema=GeneratedTweet
        )
    )
    
    # Parse structured response
    result = GeneratedTweet.model_validate_json(response.text)
    return result


def generate_tweets_from_queries(queries: List[QueryContent], sphere_description: str) -> TweetGenerationResponse:
    """
    Generate tweets for all queries (one tweet per query).
    
    Loops through each query and generates a tweet based on its article content.
    Sequential execution to keep implementation simple.
    
    Args:
        queries: List of QueryContent objects (query + article content)
        sphere_description: Original user's brand sphere description
        
    Returns:
        TweetGenerationResponse with list of generated tweets
        
    Example:
        >>> queries = [
        ...     QueryContent(query="AI tools 2026", content="Article text..."),
        ...     QueryContent(query="LLM frameworks", content="More text...")
        ... ]
        >>> sphere = "AI developer sharing practical takes"
        >>> response = generate_tweets_from_queries(queries, sphere)
        >>> print(len(response.tweets))  # 2
    """
    tweets = []
    
    for query_content in queries:
        tweet = generate_tweet_per_query(
            query=query_content.query,
            content=query_content.content,
            sphere_description=sphere_description
        )
        tweets.append(tweet)
    
    return TweetGenerationResponse(tweets=tweets)


def generate_styled_tweets(queries: List[QueryContent], sphere_description: str) -> StyledTweetsResponse:
    """
    Generate exactly 3 tweets with distinct tones from combined article content.
    
    Tones: Technical Take, Contrarian, Funny
    
    Args:
        queries: List of QueryContent objects (query + article content)
        sphere_description: Original user's brand sphere description
        
    Returns:
        StyledTweetsResponse with exactly 3 styled tweets
    """
    api_key = os.getenv("GOOGLE_API_KEY")
    if not api_key:
        raise ValueError("GOOGLE_API_KEY not found in environment variables")
    
    client = genai.Client(api_key=api_key)
    
    # Combine all article content
    combined_content = ""
    for q in queries:
        combined_content += f"\n--- Articles for: {q.query} ---\n{q.content}\n"
    
    brand_guidelines = _load_brand_guidelines()

    prompt = f"""<ARTICLE CONTENT>
{combined_content}
</ARTICLE CONTENT>

<BRAND GUIDELINES>
{brand_guidelines}
</BRAND GUIDELINES>

You are a Twitter/X content strategist. The user's brand sphere is: "{sphere_description}"

Follow the BRAND GUIDELINES above exactly — match the author's tone, sentence structure, vocabulary, and formatting rules. Respect every DO NOT rule. The generated tweets must sound like they were written by this person.

Based on ALL the article content above, draft exactly 3 tweets (max 280 characters each), each with a DIFFERENT tone:

1. **Technical Take** — Insightful, data-driven, focuses on specific tools/numbers/facts from the articles. Shows expertise.
2. **Contrarian** — Challenges the mainstream narrative. A bold, provocative take that makes people stop and think. 
3. **Funny** — Witty, relatable humor about the topic. Uses irony, absurdity, or self-deprecation. Should make people laugh AND think.

Requirements for ALL tweets:
- Grounded in the actual article content (not hallucinated)
- Aligned with the user's brand sphere
- Natural language (no hashtag spam, max 1 hashtag if it adds value)
- Each tweet must be distinct in both content and voice

Return as JSON with a "tweets" array where each item has "tone" (exactly one of: "Technical Take", "Contrarian", "Funny") and "tweet" fields."""
    
    response = client.models.generate_content(
        model='gemini-3-pro-preview',
        contents=prompt,
        config=types.GenerateContentConfig(
            response_mime_type='application/json',
            response_schema=StyledTweetsResponse
        )
    )
    
    result = StyledTweetsResponse.model_validate_json(response.text)
    return result