"""
You.com Data Connector (YDC) Service: Web search + content fetching via You.com API.
"""

import os
import requests
from typing import Optional
from dotenv import load_dotenv

load_dotenv()

YDC_API_KEY = os.getenv("YDC_API_KEY")
YDC_SEARCH_ENDPOINT = "https://ydc-index.io/v1/search"
YDC_CONTENTS_ENDPOINT = "https://ydc-index.io/v1/contents"


def search_web(query: str, count: int = 5, freshness: str = "week") -> dict:
    """
    Search via You.com and return raw results.

    Args:
        query: Search query string
        count: Number of results (default 5)
        freshness: Time range — "day", "week", "month", "year" (default "week")

    Returns:
        Raw JSON response from You.com API
    """
    if not YDC_API_KEY:
        raise ValueError("YDC_API_KEY not set in environment")

    resp = requests.get(
        YDC_SEARCH_ENDPOINT,
        headers={"X-API-Key": YDC_API_KEY},
        params={"query": query, "count": count, "freshness": freshness},
    )
    resp.raise_for_status()
    return resp.json()


def search_web_slim(query: str, count: int = 5, freshness: str = "week") -> dict:
    """
    Search via You.com and return a cleaned-up response with just
    the fields we care about (title, url, description).
    """
    raw = search_web(query, count, freshness)
    results = raw.get("results", {})

    web = [
        {
            "title": item.get("title", ""),
            "url": item.get("url", ""),
            "description": item.get("description", ""),
        }
        for item in results.get("web", [])
    ]

    news = [
        {
            "title": item.get("title", ""),
            "url": item.get("url", ""),
        }
        for item in results.get("news", [])
    ]

    return {"query": query, "web": web, "news": news}


def fetch_contents(urls: list[str]) -> list[dict]:
    """
    Fetch full page content for a list of URLs via You.com Contents API.

    Returns list of {url, title, markdown} dicts.
    """
    if not YDC_API_KEY:
        raise ValueError("YDC_API_KEY not set in environment")
    if not urls:
        return []

    resp = requests.post(
        YDC_CONTENTS_ENDPOINT,
        headers={"X-API-Key": YDC_API_KEY, "Content-Type": "application/json"},
        json={"urls": urls, "formats": ["markdown"]},
        timeout=30,
    )
    resp.raise_for_status()
    return resp.json()


def search_and_fetch(queries: list[str], count: int = 5, freshness: str = "week") -> list[dict]:
    """
    For each query: search You.com → extract URLs → fetch full content → concatenate.

    Returns:
        [{"query": "...", "content": "full concatenated markdown"}, ...]
    """
    results = []
    for query in queries:
        # Step 1: Search to get URLs
        slim = search_web_slim(query, count=count, freshness=freshness)
        urls = [item["url"] for item in slim.get("web", []) if item.get("url")]

        # Step 2: Fetch full content for those URLs
        content_parts = []
        if urls:
            try:
                pages = fetch_contents(urls)
                for page in pages:
                    md = page.get("markdown") or ""
                    if md.strip():
                        content_parts.append(md.strip())
            except Exception as e:
                # If contents fetch fails, fall back to search descriptions
                content_parts = [
                    item.get("description", "")
                    for item in slim.get("web", [])
                    if item.get("description")
                ]

        results.append({
            "query": query,
            "content": "\n\n---\n\n".join(content_parts),
        })

    return results
