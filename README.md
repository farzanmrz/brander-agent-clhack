# BranderAgent

AI-powered personal branding agent for Twitter/X. Define your brand "spheres" via free-text descriptions, and the agent generates search queries, discovers relevant web content and news, drafts original tweets grounded in real-time research, and learns from your feedback over time. Built for the Continual Learning Hackathon by Creators Corner (Feb 2026).

---

## Tech Stack

- **Python 3.11** — Core backend logic
- **FastAPI** — API framework
- **SQLite** — Lightweight persistent storage
- **HTML / CSS / JS** — Frontend dashboard
- **Conda** — Environment management (`hackenv`)

## Sponsor Tools

- **You.com** — Search + Live News APIs for real-time content discovery (~10 results per query)
- **Composio** — Twitter OAuth + tweet posting
- **Google Gemini** — LLM for query generation + tweet drafting
- **Render** — Hosting + deployment

## How It Works

1. **Authenticate** — User logs in with Twitter/X via Composio OAuth
2. **Define Sphere** — User writes free-text description of what they want to post about (e.g., "AI developer sharing practical takes on new tools")
3. **Query Generation** — Gemini generates 5 focused search queries from the sphere description
4. **Query Review** — User can accept queries as-is or tweak wording before search
5. **Content Discovery** — Each query runs through You.com Search + Live News APIs (~10 results per query)
6. **Source Selection** — Results displayed grouped by query (title, snippet, URL). User checks which to use as tweet material
7. **Tweet Drafting** — Gemini drafts original tweets based on selected sources + sphere context + past feedback
8. **Draft Review** — User approves, edits, or rejects each draft
9. **Posting** — Approved tweets posted to Twitter/X via Composio
10. **Learning Loop** — All feedback (approved/edited/rejected drafts, query tweaks, source selections) stored in SQLite and fed into future Gemini prompts

---

## Quick Start

### 1. Clone & Setup Environment

```bash
git clone https://github.com/farzanmrz/brander-agent-clhack.git
cd brander-agent-clhack
conda env create -f environment.yml
conda activate hackenv
```

### 2. Set Up API Keys

Create a `.env` file in the project root:

```env
YOUCOM_API_KEY=your_youcom_api_key
COMPOSIO_API_KEY=your_composio_api_key
GOOGLE_API_KEY=your_google_gemini_api_key
DATABASE_URL=sqlite:///./brander.db
```

### 3. Run the App (Coming Soon)

```bash
uvicorn main:app --reload
```

Open http://localhost:8000

---

## Project Structure (To Be Created)

```
brander-agent-clhack/
├── main.py                  # FastAPI app entry point
├── routers/                 # API endpoints
│   ├── auth.py              # Twitter OAuth via Composio
│   ├── spheres.py           # Sphere CRUD
│   ├── queries.py           # Query generation & review
│   ├── sources.py           # You.com search & source selection
│   ├── drafts.py            # Tweet drafting & review
│   └── posts.py             # Tweet posting via Composio
├── models/                  # SQLAlchemy models
│   ├── sphere.py
│   ├── query.py
│   ├── source.py
│   ├── draft.py
│   └── feedback.py
├── services/                # Business logic
│   ├── gemini_service.py    # Query generation, tweet drafting
│   ├── youcom_service.py    # You.com API integration
│   └── composio_service.py  # Composio Twitter integration
├── static/                  # Frontend files
│   ├── index.html
│   ├── style.css
│   └── app.js
├── database.py              # SQLite setup
├── .env                     # API keys (gitignored)
├── environment.yml          # Conda environment spec
└── memory-bank/             # Project documentation
```

---

## Development Tasks

**Phase 1: Setup (Complete ✓)**
- [x] Conda environment created
- [x] Memory bank initialized

**Phase 2: Core Implementation (In Progress)**
- [ ] Create `.env.example` template
- [ ] Initialize FastAPI app structure
- [ ] Define SQLite schema (spheres, queries, sources, drafts, feedback)
- [ ] Implement Twitter OAuth via Composio
- [ ] Implement sphere creation endpoint
- [ ] Implement Gemini query generation (5 queries from description)
- [ ] Implement query review UI
- [ ] Integrate You.com APIs (Search + Live News)
- [ ] Implement source selection UI (checklist grouped by query)
- [ ] Implement Gemini tweet drafting (sources + feedback → tweets)
- [ ] Implement draft review UI (approve/edit/reject)
- [ ] Implement tweet posting via Composio
- [ ] Implement feedback loop storage
- [ ] Deploy to Render

**Stretch Goals**
- [ ] Reply-to-tweets feature (search for tweets to reply to)

---

## Team

4 developers building this in 5.5 hours (11 AM - 4:30 PM PT, demo at 5 PM).

**Dev Focus:**
- End-to-end working demo over UI polish
- MVP UI: Simple checklists and text inputs
- No over-engineering — plain Python functions, no agent frameworks

---

## License

This project is licensed under the [MIT License](LICENSE).