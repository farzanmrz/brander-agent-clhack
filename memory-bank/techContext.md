# Tech Context: Chirp (BranderAgent)

## Core Technologies
- **Language:** Python 3.11+
- **Backend Framework:** FastAPI
- **Frontend Framework:** Next.js 16 (App Router)
- **Frontend Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4
- **Database:** SQLite (planned)
- **Deployment:** Render (Auto-deploy from GitHub)

## Sponsor Tools & SDKs
- **You.com:** `youdotcom` Python SDK (Search + Live News APIs) ✅
- **Composio:** `composio-core` Python SDK (Twitter integration) ✅
- **Google Gemini:** `google-genai` Python package ✅
- **Render:** Hosting (No SDK, managed via Render Dashboard)

## Key Dependencies

### Backend (Python)
- `fastapi==0.128.2` — Web framework
- `uvicorn[standard]==0.40.0` — ASGI server
- `youdotcom==2.2.0` — You.com SDK (Search + Live News APIs)
- `composio-core==0.7.21` — Composio SDK (Twitter integration)
- `google-genai==1.62.0` — Google Gemini API client
- `python-dotenv==1.2.1` — Environment variable management
- `jinja2==3.1.6` — Template engine
- `aiohttp==3.13.3` — Async HTTP client

### Frontend (Node.js)
- `next==16.1.6` — Next.js framework
- `react==19.2.3` — React library
- `react-dom==19.2.3` — React DOM renderer
- `typescript==^5` — TypeScript language
- `tailwindcss==^4` — Tailwind CSS framework
- `lucide-react==^0.563.0` — Icon library
- `eslint==^9` — Linting
- `eslint-config-next==16.1.6` — Next.js ESLint config

## Development Environment
- **Conda:** `hackenv` environment (Python 3.11.14, created and active)
- **OS:** macOS Tahoe
- **IDE:** Visual Studio Code
- **Team:** 4 developers
- **Git:** GitHub repository `farzanmrz/brander-agent-clhack`

## Environment Variables
- `GOOGLE_API_KEY` (for Gemini) — ✅ Configured
- `YDC_API_KEY` (for You.com) — ✅ Configured
- `COMPOSIO_API_KEY` (for Composio/Twitter) — ✅ Configured
- `PORT` (for backend server) — Defaults to 3000

## Technical Constraints
- **Time:** 5.5 hours total coding time (started 11 AM PT, deadline 4:30 PM PT)
- **Current time:** 12:51 PM PT (~3.65 hours remaining)
- **Frontend:** YC-style minimal design, mobile-responsive
- **Authentication:** Placeholder Google OAuth for demo (routes to dashboard)
- **Twitter auth:** Handled by Composio with pre-configured user ID

## API Endpoints (Implemented)

### Search Router (`/api/search`)
- `GET /api/search` — Search You.com (returns raw results)
  - Query params: `q` (required), `count` (default 5), `freshness` (default "week")
- `GET /api/search/slim` — Search You.com (returns cleaned results)
  - Query params: `q` (required), `count` (default 5), `freshness` (default "week")

### Sphere Router (`/api/sphere`)
- `POST /api/sphere/queries` — Generate search queries from sphere description
  - Body: `{"description": "string"}`
  - Returns: `{"description": "string", "queries": ["string", ...]}`

### Tweet Router (`/api/tweet`)
- `POST /api/tweet` — Post tweet to Twitter/X via Composio
  - Body: `{"text": "string", "user_id": "string" (optional)}`
  - Returns: `{"status": "posted", "result": {...}}`

## Gemini Configuration
- **Model:** `gemini-3-pro-preview` (not `gemini-3-pro`)
- **API Package:** `google-genai==1.62.0`
- **Pattern:** Structured output using Pydantic models + `GenerateContentConfig`
- **Response format:** `application/json` with Pydantic schema validation

## File Structure
```
/
├── main.py                 # FastAPI app entry point
├── run.py                  # Backend runner script
├── requirements.txt        # Python dependencies
├── environment.yml         # Conda environment spec
├── Dockerfile              # Container definition
├── docker-compose.yml      # Local orchestration
├── render.yaml             # Deployment blueprint
├── package.json            # Node.js dependencies
├── next.config.ts          # Next.js configuration
├── tsconfig.json           # TypeScript configuration
├── app/
│   ├── __init__.py
│   ├── routers/           # FastAPI routers
│   │   ├── search.py
│   │   ├── sphere.py
│   │   └── tweet.py
│   ├── services/          # Backend services
│   │   ├── gemini_service.py
│   │   ├── ydc_service.py
│   │   └── composio_service.py
│   └── scripts/           # Test/utility scripts
│       ├── search.py
│       ├── test_sphere_queries.py
│       └── you.py
├── src/
│   ├── app/               # Next.js pages (App Router)
│   │   ├── page.tsx       # Landing page
│   │   ├── layout.tsx     # Root layout
│   │   └── dashboard/     # Dashboard pages
│   │       ├── page.tsx
│   │       ├── topics/page.tsx
│   │       ├── posts/page.tsx
│   │       └── preview/page.tsx
│   ├── components/        # React components
│   │   ├── ui/           # UI primitives
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   └── Card.tsx
│   │   ├── Header.tsx
│   │   ├── TopicCard.tsx
│   │   ├── PostCard.tsx
│   │   ├── LoadingState.tsx
│   │   └── GoogleSignIn.tsx
│   └── lib/              # Utilities
│       ├── mockData.ts
│       └── utils.ts
├── memory-bank/          # Project documentation
│   ├── projectbrief.md
│   ├── productContext.md
│   ├── activeContext.md
│   ├── systemPatterns.md
│   ├── techContext.md
│   └── progress.md
└── static/               # Frontend build output
    └── .gitkeep
```

## Development Commands

### Backend
```bash
# Run backend directly
python run.py

# Or with uvicorn
uvicorn main:app --host 0.0.0.0 --port 3000 --reload

# Test sphere queries
python app/scripts/test_sphere_queries.py

# Test You.com search
python app/scripts/search.py
```

### Frontend
```bash
# Development mode
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint
npm run lint
```

### Docker
```bash
# Build and run with docker-compose
docker-compose up --build

# Build Docker image
docker build -t chirp .

# Run container
docker run -p 3000:3000 chirp
```

## Deployment (Render)
- **Auto-deploy:** Enabled from GitHub repository
- **Build command:** Defined in `render.yaml`
- **Start command:** `python -m uvicorn main:app --host 0.0.0.0 --port $PORT`
- **Frontend build:** Next.js build copied to `static/` directory during deployment
- **Environment variables:** Set in Render dashboard

## Next Implementation: Tweet Generation
**New function needed:** `generate_tweet_from_articles()` in `gemini_service.py`
- **Input:** List of 5 article objects with `title`, `url`, `description`
- **Output:** Generated tweet text (max 280 chars)
- **Pattern:** RAG-based using Gemini structured output
- **Endpoint:** New POST route in `sphere.py` or separate tweet generation router