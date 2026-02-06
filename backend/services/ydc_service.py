"""
You.com Data Connector (YDC) Service: Web search + content fetching via You.com API.
"""

import os
import requests
from dotenv import load_dotenv

load_dotenv()

YDC_API_KEY = os.getenv("YDC_API_KEY")
YDC_SEARCH_ENDPOINT = "https://ydc-index.io/v1/search"


def search_web(query: str, count: int = 5, freshness: str = "month") -> dict:
    """
    Search via You.com and return raw results.
    Uses livecrawl to get full markdown content inline (no separate contents call).
    Falls back to wider freshness if the initial request fails.
    """
    if not YDC_API_KEY:
        raise ValueError("YDC_API_KEY not set in environment")

    params = {
        "query": query,
        "count": count,
        "livecrawl": "web",
        "livecrawl_formats": "markdown",
    }
    if freshness:
        params["freshness"] = freshness

    try:
        resp = requests.get(
            YDC_SEARCH_ENDPOINT,
            headers={"X-API-Key": YDC_API_KEY},
            params=params,
            timeout=15,
        )
        resp.raise_for_status()
        return resp.json()
    except requests.RequestException:
        if freshness:
            # Retry without freshness filter
            params.pop("freshness", None)
            resp = requests.get(
                YDC_SEARCH_ENDPOINT,
                headers={"X-API-Key": YDC_API_KEY},
                params=params,
                timeout=15,
            )
            resp.raise_for_status()
            return resp.json()
        raise


def search_web_slim(query: str, count: int = 5, freshness: str = "month") -> dict:
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


def search_and_fetch(queries: list[str], count: int = 5, freshness: str = "month") -> list[dict]:
    """
    For each query: search You.com with livecrawl → extract markdown content.
    Single API call per query (no separate contents fetch needed).

    Returns:
        [{"query": "...", "content": "full concatenated markdown"}, ...]
    """
    results = []
    for query in queries:
        try:
            raw = search_web(query, count=count, freshness=freshness)
        except Exception:
            results.append({"query": query, "content": ""})
            continue

        web_results = raw.get("results", {}).get("web", [])
        content_parts = []

        for item in web_results:
            # livecrawl puts content in item["contents"]
            contents = item.get("contents")
            if contents:
                md = contents.get("markdown") or ""
                if md.strip():
                    content_parts.append(md.strip())
                    continue
            # Fallback to description if no livecrawl content
            desc = item.get("description", "")
            if desc.strip():
                content_parts.append(desc.strip())

        results.append({
            "query": query,
            "content": "\n\n---\n\n".join(content_parts),
        })

    return results
