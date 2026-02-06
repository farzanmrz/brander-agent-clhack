# Active Context: Chirp (BranderAgent)

## Current Focus
**Major project evolution complete.** The team has built out the full frontend (Next.js) and backend infrastructure (FastAPI with all services and routers). Current state:
- ✅ Sphere query generation (Gemini structured output)
- ✅ You.com search integration
- ✅ Composio Twitter posting
- ✅ Next.js frontend with YC-style design
- ✅ Complete deployment setup

**Next task:** Implement Gemini tweet generation endpoint that takes 5 articles' content per query as a knowledge base and produces a unique tweet combining information from all/some of them.

## Recent Changes (Since Last Update)
- **Frontend added by teammates:** Complete Next.js 16 + TypeScript + Tailwind CSS application with:
  - Landing page with Google sign-in placeholder
  - Dashboard with topic input and quick starts
  - Topics selection page with card-based UI
  - Posts variation page with 3 angle options
  - Preview & post page with confirmation flow
  - Reusable components (Button, Input, Card, Header, TopicCard, PostCard, LoadingState, GoogleSignIn)
  - Mock data for demonstration
  - Branded as "Chirp" with bird logo and green accents
  
- **Backend services added by teammates:**
  - `ydc_service.py` — You.com Search + Live News API integration
  - `composio_service.py` — Twitter posting via Composio with default user ID
  - `search.py` router — `/api/search` and `/api/search/slim` endpoints
  - `tweet.py` router — `/api/tweet` POST endpoint
  - Test script `search.py` for You.com validation

- **Infrastructure added:**
  - `Dockerfile` for Python backend container
  - `docker-compose.yml` for local development
  - `render.yaml` for deployment blueprint
  - `run.py` as backend entrypoint (port 3000)
  - `main.py` with all 3 routers + static file serving for React build
  - `chirp-project-guide.md` with comprehensive design/build guide

- **Gemini updates (my work):**
  - Updated to `gemini-3-pro-preview` model
  - Implemented structured output using Pydantic models + `GenerateContentConfig`
  - Created `/api/sphere/queries` endpoint
  - Tested end-to-end query generation

## Next Steps (Priority Order)
1. **Implement Gemini tweet generation endpoint** (NEXT TASK)
   - Create function in `gemini_service.py`: `generate_tweet_from_articles()`
   - Takes 5 article contents (title, URL, snippet) per query as input
   - Uses Gemini with RAG pattern to generate unique tweet
   - Combines information from all/some articles
   - Returns tweet text optimized for Twitter (280 chars max)
   - Add to `sphere.py` router or create new tweet generation endpoint

2. Integrate tweet generation with frontend flow
3. Build source selection UI (checklist of You.com results)
4. Build draft review UI (approve/edit/reject)
5. Implement SQLite feedback loop storage
6. Connect all pieces end-to-end
7. Deploy to Render

## Active Decisions
- **Chirp branding:** Project now branded as "Chirp" with YC-style design
- **Frontend:** Next.js 16 + TypeScript + Tailwind (not static HTML)
- **Gemini model:** Using `gemini-3-pro-preview` (not `gemini-3-pro`)
- **Structured output:** Using Pydantic models + `GenerateContentConfig` for type-safe responses
- **Tweet generation pattern:** RAG-based, using 5 articles as knowledge base per query
- **Priority:** Working demo over UI polish, but frontend is already polished
- **No agent frameworks:** Plain Python functions for orchestration

## Team Structure
- 4 developers total (Farzan + 3 teammates)
- Farzan: Gemini integration, sphere query generation
- Teammates: Frontend (Next.js), You.com integration, Composio/Twitter, deployment setup
- Current time: 12:49 PM PT (~3.25 hours remaining until 4:30 PM cutoff)
- Good progress: Most infrastructure complete, focus on tweet generation logic

## Important Patterns
- **Gemini structured output:**
  ```python
  from pydantic import BaseModel
  from google.genai import types
  
  class OutputModel(BaseModel):
      field: type
  
  response = client.models.generate_content(
      model='gemini-3-pro-preview',
      contents=prompt,
      config=types.GenerateContentConfig(
          response_mime_type='application/json',
          response_schema=OutputModel
      )
  )
  result = OutputModel.model_validate_json(response.text)
  ```

- **FastAPI router pattern:** All routers mounted in `main.py`, prefix `/api/{router_name}`
- **Frontend mock data:** Located in `src/lib/mockData.ts` for demonstration