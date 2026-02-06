"""
You.com Data Connector (YDC) Service: Web search via You.com API.
"""

import os
import requests
from typing import Optional
from dotenv import load_dotenv

load_dotenv()

YDC_API_KEY = os.getenv("YDC_API_KEY")
YDC_ENDPOINT = "https://ydc-index.io/v1/search"


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
        YDC_ENDPOINT,
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
