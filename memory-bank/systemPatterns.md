# System Patterns: Chirp (BranderAgent)

## Architecture Overview
- **Frontend:** Next.js 16 (App Router) + TypeScript + Tailwind CSS - YC-style minimal design
- **Backend:** FastAPI (Python) - Handles API orchestration, serves static frontend build
- **Database:** SQLite - Stores "spheres," drafts, and user feedback loop data (planned)
- **Orchestration:** Plain Python functions. No heavy agent frameworks (LangChain, etc.) to keep it simple and debuggable during the hackathon.

## Tech Stack
### Frontend
- **Framework:** Next.js 16 with App Router
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4
- **Icons:** lucide-react
- **Components:** Custom UI components (Button, Input, Card, etc.)
- **Design System:** YC-style minimal with green accents (#10B981), Inter font
- **Pages:**
  - `/` — Landing page with Google sign-in
  - `/dashboard` — Topic input with quick starts
  - `/dashboard/topics` — Topic selection with cards
  - `/dashboard/posts` — Post variations (3 angles)
  - `/dashboard/preview` — Final preview & post

### Backend
- **Framework:** FastAPI
- **Language:** Python 3.11+
- **Server:** Uvicorn (ASGI)
- **Services:**
  - `gemini_service.py` — Query generation and tweet drafting (Gemini)
  - `ydc_service.py` — Web search and news (You.com)
  - `composio_service.py` — Twitter posting (Composio)
- **Routers:**
  - `search.py` — `/api/search` (You.com integration)
  - `sphere.py` — `/api/sphere/queries` (query generation)
  - `tweet.py` — `/api/tweet` (Twitter posting)
- **Static Serving:** FastAPI serves Next.js build from `static/` directory

### Deployment
- **Containerization:** Docker with multi-stage builds
- **Orchestration:** docker-compose for local development
- **Hosting:** Render (auto-deploy from GitHub)
- **Config:** `render.yaml` blueprint for automated deployment

## Key Technical Decisions
- **No Agent Frameworks:** Direct API calls to You.com, Composio, and Gemini. Avoids abstraction overhead.
- **Structured Output:** Pydantic models + `GenerateContentConfig` for type-safe Gemini responses
- **RAG + Few-Shot Prompting:** Gemini drafts tweets using real-time snippets (selected You.com results) and past feedback (SQLite) as context.
- **SQLite for Learning:** Every user action (Approve/Edit/Reject drafts, query tweaks, source selections) is recorded to build a personalized dataset for each sphere.
- **FastAPI as File Server:** Serves the Next.js build directly to simplify deployment on Render.
- **Frontend-first:** Next.js handles routing and UI, backend is purely API

## API Integration Patterns

### 1. You.com Integration
Used for `Search API` and `Live News API`. Each of 5 queries per sphere runs through both APIs, returning ~10 results per query.

**Implementation:**
```python
# ydc_service.py
import requests
YDC_ENDPOINT = "https://ydc-index.io/v1/search"

def search_web(query: str, count: int = 5, freshness: str = "week"):
    resp = requests.get(
        YDC_ENDPOINT,
        headers={"X-API-Key": YDC_API_KEY},
        params={"query": query, "count": count, "freshness": freshness}
    )
    return resp.json()

def search_web_slim(query: str, count: int = 5, freshness: str = "week"):
    # Returns cleaned-up results (title, url, description only)
    raw = search_web(query, count, freshness)
    # ... extract and return slim results
```

### 2. Composio Integration
Used for `TWITTER_CREATION_OF_A_POST`. Handled via direct function calls from the Composio Python SDK.

**Implementation:**
```python
# composio_service.py
from composio import Composio

composio = Composio(api_key=os.getenv("COMPOSIO_API_KEY"))

def post_tweet(text: str, user_id: str = DEFAULT_USER_ID):
    result = composio.tools.execute(
        "TWITTER_CREATION_OF_A_POST",
        user_id=user_id,
        arguments={"text": text}
    )
    return result
```

### 3. Google Gemini Integration
**Model:** `gemini-3-pro-preview`  
**Package:** `google-genai`

**Used for:**
- Query generation: Takes sphere free-text description → generates 5 focused search queries
- Tweet drafting: Takes selected You.com results + sphere context + past feedback → drafts original tweets

**Structured Output Pattern:**
```python
from google import genai
from google.genai import types
from pydantic import BaseModel
from dotenv import load_dotenv
import os

load_dotenv()
client = genai.Client(api_key=os.getenv("GOOGLE_API_KEY"))

class SphereQueries(BaseModel):
    queries: List[str]

response = client.models.generate_content(
    model='gemini-3-pro-preview',
    contents=prompt,
    config=types.GenerateContentConfig(
        response_mime_type='application/json',
        response_schema=SphereQueries
    )
)

result = SphereQueries.model_validate_json(response.text)
return result.queries
```

**Benefits:**
- Type-safe responses (Pydantic validation)
- No manual JSON parsing or cleanup
- Guaranteed valid structure

## Component Relationships
```
Frontend (Next.js)
├── Landing Page → Google Auth (placeholder)
├── Dashboard → Topic Input
├── Topics Page → API call to /api/sphere/queries
├── Posts Page → API call to /api/search (You.com)
└── Preview Page → API call to /api/tweet (Composio)

Backend (FastAPI)
├── main.py
│   ├── search_router (/api/search)
│   ├── sphere_router (/api/sphere)
│   ├── tweet_router (/api/tweet)
│   └── static files (/)
├── services/
│   ├── gemini_service.py (query gen, tweet drafting)
│   ├── ydc_service.py (You.com search)
│   └── composio_service.py (Twitter posting)
└── routers/
    ├── search.py
    ├── sphere.py
    └── tweet.py
```

## Feedback Loop Design (Planned)
All feedback will be stored in SQLite per sphere and fed into future Gemini prompts:
- **Approved tweets:** Becomes a "positive example" showing user's voice and content preferences.
- **Rejected tweets:** Becomes a "negative example" (to be avoided).
- **Edited tweets:** Store both original and edited versions. The edited version is the "gold standard" example.
- **Query tweaks:** If user modifies a generated query, store the original and modified versions to learn query preferences.
- **Source selections:** Track which You.com results the user selected vs ignored to learn content taste and relevance preferences.

## Critical Implementation Paths

### Sphere Query Generation (Complete)
1. User inputs free-text description via frontend
2. POST to `/api/sphere/queries` with `{"description": "..."}`
3. `generate_sphere_queries()` in `gemini_service.py` processes with Gemini
4. Returns structured JSON: `{"description": "...", "queries": [...]}`
5. Frontend displays 5 queries for user review

### Tweet Generation (Next Task)
1. User selects articles from You.com search results
2. POST to new endpoint with selected article contents
3. `generate_tweet_from_articles()` in `gemini_service.py` uses RAG pattern
4. Gemini combines information from 5 articles into unique tweet
5. Returns tweet text (280 chars max) with citations if relevant
6. Frontend displays in preview page

### Tweet Posting (Complete)
1. User approves tweet in preview page
2. POST to `/api/tweet` with `{"text": "...", "user_id": "..."}`
3. `post_tweet()` in `composio_service.py` calls Composio API
4. Composio posts to Twitter/X
5. Returns success confirmation to frontend