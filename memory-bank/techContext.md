# Tech Context: BranderAgent

## Core Technologies
- **Language:** Python 3.10+
- **Backend Framework:** FastAPI
- **Database:** SQLite
- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **Deployment:** Render (Auto-deploy from GitHub)

## Sponsor Tools & SDKs
- **You.com:** `youdotcom` Python SDK (Search + Live News APIs)
- **Composio:** `composio-core` Python SDK (Twitter integration)
- **Google Gemini:** `google-genai` Python package
- **Render:** Hosting (No SDK, managed via Render Dashboard)

## Key Dependencies (installed)
- `fastapi` — Web framework
- `uvicorn[standard]` — ASGI server
- `youdotcom` — You.com SDK (Search + Live News APIs)
- `composio-core` — Composio SDK (Twitter integration)
- `google-genai` — Google Gemini API client
- `python-dotenv` — Environment variable management
- `jinja2` — Template engine
- `aiohttp` — Async HTTP client
- `sqlalchemy` (optional, for SQLite - not yet used)

## Development Environment
- **Conda:** `hackenv` environment (Python 3.11.14, created and active)
- **OS:** macOS Tahoe (as per system info)
- **Team:** 4 developers
- **Environment File:** `.env` configured with `GOOGLE_API_KEY`
- **Gemini Model:** `gemini-3-pro` (Developer API)

## Technical Constraints
- **Time:** 5.5 hours total coding time (started 11 AM PT).
- **Frontend:** Minimalist, served statically.
- **Authentication:** Relies on Composio for Twitter OAuth; simple local state for demo.

## Required Environment Variables
- `GOOGLE_API_KEY` (for Gemini) — ✓ Configured
- `YOUCOM_API_KEY` — Pending
- `COMPOSIO_API_KEY` — Pending
- `DATABASE_URL` (optional, defaults to local SQLite file) — Pending
