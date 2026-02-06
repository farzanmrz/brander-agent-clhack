# Active Context: Chirp (BranderAgent)

## Current Focus
**Core infrastructure and UI complete.** The project has transitioned to a high-fidelity Neobrutalism design. Backend services for search, query generation, and tweet posting are functional.
- ✅ Neobrutalism UI (Cream/Lime/Pink/Sky/Lavender palette)
- ✅ Gemini structured output for queries and tweets
- ✅ You.com search and content fetching
- ✅ Composio Twitter integration
- ✅ Supabase Auth & Client/Server setup (initial)

**Next task:** Implement full backend integration with Supabase for user data and X/Twitter authentication flow.

## Recent Changes (Since Last Update)
- **Neobrutalism Design System:** Implemented across all frontend components with `neo-border`, `neo-shadow`, and `neo-press` effects.
- **Supabase Integration:** Added `@supabase/ssr` and `@supabase/supabase-js`. Created client/server utilities in `src/lib/supabase/`.
- **Auth Callback:** Implemented `src/app/auth/callback/route.ts` for handling Supabase auth redirects.
- **Tweet Generation Logic:** Implemented `generate_tweet_per_query` and `generate_tweets_from_queries` in `gemini_service.py` using long-context patterns.
- **Backend Structure:** Note that `backend/` contains duplicate structures (`backend/app/`, `backend/app/backend-app/`). **CRITICAL: Do not clean up or remove these duplicates.**
  
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
- **Chirp branding:** Project branded as "Chirp" with Neobrutalism design.
- **Frontend:** Next.js 16 + TypeScript + Tailwind v4.
- **Gemini model:** Using `gemini-3-pro-preview` with structured output.
- **Backend Duplication:** Explicit decision to **KEEP** the duplicate directory structure in `backend/`. Do not attempt to streamline or remove `backend/app/` or `backend/app/backend-app/`.
- **Auth Strategy:** Moving towards Supabase for user management and X/Twitter connection.
- **No agent frameworks:** Maintaining simple Python orchestration for speed and reliability.

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