# System Patterns: BranderAgent

## Architecture Overview
- **Backend:** FastAPI (Python) - Handles API orchestration, DB operations, and serving the frontend.
- **Frontend:** Static HTML/CSS/JS - Minimalist dashboard for sphere management and draft review.
- **Database:** SQLite - Stores "spheres," drafts, and user feedback loop data.
- **Orchestration:** Plain Python functions. No heavy agent frameworks (LangChain, etc.) to keep it simple and debuggable during the hackathon.

## Key Technical Decisions
- **No Agent Frameworks:** Direct API calls to You.com, Composio, and Gemini. Avoids abstraction overhead.
- **RAG + Few-Shot Prompting:** Gemini drafts replies using real-time snippets (You.com) and past feedback (SQLite) as context.
- **SQLite for Learning:** Every user action (Approve/Edit/Reject) is recorded to build a personalized dataset for each sphere.
- **FastAPI as File Server:** Serves the frontend assets directly to simplify deployment on Render.

## API Integration Patterns
1. **You.com:** Used for `Search API` and `Live News API`. Structured results are passed to Gemini.
2. **Composio:** Used for `TWITTER_RECENT_SEARCH`, `TWITTER_CREATION_OF_A_POST`, and `TWITTER_USER_LOOKUP_ME`. Handled via direct function calls from the Composio Python SDK.
3. **Google Gemini:** `google-genai` package. Used for tweet ranking and reply drafting.

## Feedback Loop Design
- **Approved:** Becomes a "positive example" in the prompt.
- **Rejected:** Becomes a "negative example" (to be avoided).
- **Edited:** Store both original and edited versions. The edited version is the "gold standard" example.
