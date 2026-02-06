import os
import requests
from dotenv import load_dotenv

load_dotenv()

YDC_API_KEY = os.getenv("YDC_API_KEY")
YDC_ENDPOINT = "https://ydc-index.io/v1/search"

QUERIES = [
    "Claude Opus 4.6 news",
    "Cursor Codex 5.3 hackathon",
    "Cursor Cloud Agents",
    "OpenAI o3 pro release",
    "Composio AI agent tools",
    "MCP model context protocol latest",
    "Devin AI software engineer",
    "Anthropic Claude artifacts update",
    "Vercel v0 AI coding",
    "Google Gemini 2.5 pro",
]


def search_you(query: str, count: int = 5, freshness: str = "week") -> dict:
    """Search You.com and return results for a single query."""
    resp = requests.get(
        YDC_ENDPOINT,
        headers={"X-API-Key": YDC_API_KEY},
        params={"query": query, "count": count, "freshness": freshness},
    )
    resp.raise_for_status()
    return resp.json()


def main():
    for query in QUERIES:
        print(f"\n{'='*60}")
        print(f"Query: {query}")
        print(f"{'='*60}")

        data = search_you(query)
        results = data.get("results", {})

        # Web results
        web = results.get("web", [])
        for i, item in enumerate(web, 1):
            print(f"  [{i}] {item.get('title', 'No title')}")
            print(f"      {item.get('url', '')}")
            desc = item.get("description", "")
            if desc:
                print(f"      {desc[:120]}...")
            print()

        # News results (if any)
        news = results.get("news", [])
        if news:
            print(f"  --- News ---")
            for item in news:
                print(f"  • {item.get('title', 'No title')}")
                print(f"    {item.get('url', '')}")
                print()


if __name__ == "__main__":
    main()
