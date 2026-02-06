# Active Context: BranderAgent

## Current Focus
**Major project flow revision completed.** Environment setup complete. Team expanded to 4 developers. Ready to begin implementation of revised flow: original tweet creation from researched web content (not replying to existing tweets).

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
- **Updated memory bank with revised project flow (commit pending).**

## Next Steps (Revised Flow)
1. Create `.env.example` template for API keys.
2. Initialize FastAPI app structure (main.py, routers, models).
3. Set up database schema (SQLite) for spheres, queries, sources, drafts, and feedback.
4. Implement Twitter OAuth via Composio.
5. Implement sphere creation endpoint (free-text description input).
6. Implement Gemini query generation (5 queries from sphere description).
7. Implement query review UI (display + optional editing before search).
8. Integrate You.com APIs (Search + Live News) - run 5 queries, ~10 results each.
9. Implement source selection UI (checklist of results grouped by query).
10. Implement Gemini tweet drafting (based on selected sources + feedback).
11. Implement draft review UI (approve/edit/reject).
12. Implement tweet posting via Composio.
13. Implement feedback loop storage (drafts, query tweaks, source selections).
14. Deploy to Render.

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
