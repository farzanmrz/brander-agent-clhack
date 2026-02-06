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

## Key Dependencies (to be installed)
- `fastapi`
- `uvicorn`
- `youdotcom`
- `composio-core`
- `google-genai`
- `python-dotenv`
- `sqlalchemy` (optional, for SQLite)

## Development Environment
- **Conda:** `brander-agent` environment (to be created)
- **OS:** macOS Tahoe (as per system info)

## Technical Constraints
- **Time:** 5.5 hours total coding time.
- **Frontend:** Minimalist, served statically.
- **Authentication:** Relies on Composio for Twitter OAuth; simple local state for demo.

## Required Environment Variables
- `YOUCOM_API_KEY`
- `COMPOSIO_API_KEY`
- `GOOGLE_API_KEY` (for Gemini)
- `DATABASE_URL` (optional, defaults to local SQLite file)
