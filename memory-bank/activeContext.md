# Active Context: BranderAgent

## Current Focus
**Sphere query generation feature complete.** First piece of the agent pipeline is now functional: users can input a free-text sphere description and Gemini generates 5 distinct, varied search queries to find relevant content. Ready to implement next phase: You.com integration for content discovery.

## Recent Changes
- Created project directory `brander-agent-clhack`.
- Initialized local git repo and renamed branch to `main`.
- Created `README.md` and `LICENSE` (MIT).
- Created public GitHub repository `farzanmrz/brander-agent-clhack` and pushed initial commit.
- Initialized complete `memory-bank/` with all 6 core files.
- Created conda environment `hackenv` with Python 3.11.14.
- Installed all required packages: fastapi, uvicorn[standard], google-genai, composio-core, youdotcom, python-dotenv, jinja2, aiohttp.
- Generated `environment.yml` for reproducibility.
- Committed and pushed all changes (commit `9bfc091`: "initial setup").
- **Created feature branch `ft/sphere-setup` (commit `8d2b6f0`):**
  - Created `.env.example` template with all required API keys
  - Implemented `app/services/gemini_service.py` with `generate_sphere_queries()` function
  - Created `app/scripts/test_sphere_queries.py` test script
  - Configured Gemini API client with `gemini-3-pro` model
  - Tested and verified query generation works end-to-end
  - Merged into `main` and pushed both branches to remote

## Next Steps (Remaining Work)
1. Integrate You.com APIs (Search + Live News) - run 5 queries, ~10 results each.
2. Initialize FastAPI app structure (main.py, routers, models).
3. Set up database schema (SQLite) for spheres, queries, sources, drafts, and feedback.
4. Implement Twitter OAuth via Composio.
5. Implement sphere creation endpoint (free-text description input).
6. Implement query review UI (display + optional editing before search).
7. Implement source selection UI (checklist of results grouped by query).
8. Implement Gemini tweet drafting (based on selected sources + feedback).
9. Implement draft review UI (approve/edit/reject).
10. Implement tweet posting via Composio.
11. Implement feedback loop storage (drafts, query tweaks, source selections).
12. Deploy to Render.

## Active Decisions
- Use plain Python functions for API orchestration (no LangChain).
- Priority: Working end-to-end demo over UI polish.
- Gemini as default LLM.
- Creating original tweets from researched content (not replying to existing tweets).
- Reply-to-tweets moved to stretch goals.

## Team Structure
- 4 developers total (Farzan + 3 team members)
- Farzan: Strong Python/ML engineering, intermediate full-stack, weak frontend
- Focus: End-to-end working demo over UI polish
- Constraint: 5.5-hour build deadline (starts 11 AM PT)
- MVP UI: Simple checklists and text inputs, don't over-build
