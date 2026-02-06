# System Patterns: BranderAgent

## Architecture Overview
- **Backend:** FastAPI (Python) - Handles API orchestration, DB operations, and serving the frontend.
- **Frontend:** Static HTML/CSS/JS - Minimalist dashboard for sphere management and draft review.
- **Database:** SQLite - Stores "spheres," drafts, and user feedback loop data.
- **Orchestration:** Plain Python functions. No heavy agent frameworks (LangChain, etc.) to keep it simple and debuggable during the hackathon.

## Key Technical Decisions
- **No Agent Frameworks:** Direct API calls to You.com, Composio, and Gemini. Avoids abstraction overhead.
- **RAG + Few-Shot Prompting:** Gemini drafts tweets using real-time snippets (selected You.com results) and past feedback (SQLite) as context.
- **SQLite for Learning:** Every user action (Approve/Edit/Reject drafts, query tweaks, source selections) is recorded to build a personalized dataset for each sphere.
- **FastAPI as File Server:** Serves the frontend assets directly to simplify deployment on Render.
- **MVP UI Simplification:** Query editing and source filtering use simple text inputs and checklists. Showing the end-to-end flow matters more than polished UI for the demo.

## API Integration Patterns
1. **You.com:** Used for `Search API` and `Live News API`. Each of 5 queries per sphere runs through both APIs, returning ~10 results per query. Structured results (title, snippet, URL) are displayed to user and selected results are passed to Gemini.
2. **Composio:** Used for `TWITTER_CREATION_OF_A_POST` and `TWITTER_USER_LOOKUP_ME` (OAuth). Handled via direct function calls from the Composio Python SDK.
3. **Google Gemini:** `google-genai` package. Used for:
   - Query generation: Takes sphere free-text description → generates 5 focused search queries
   - Tweet drafting: Takes selected You.com results + sphere context + past feedback → drafts original tweets

## Feedback Loop Design
All feedback is stored in SQLite per sphere and fed into future Gemini prompts:
- **Approved tweets:** Becomes a "positive example" showing user's voice and content preferences.
- **Rejected tweets:** Becomes a "negative example" (to be avoided).
- **Edited tweets:** Store both original and edited versions. The edited version is the "gold standard" example.
- **Query tweaks:** If user modifies a generated query, store the original and modified versions to learn query preferences.
- **Source selections:** Track which You.com results the user selected vs ignored to learn content taste and relevance preferences.
