# Project Brief: Chirp (BranderAgent)

## Situation
- **Team:** 4 developers (Farzan + 3 team members)
- **Event:** Continual Learning Hackathon by Creators Corner (Feb 6, 2026, San Francisco)
- **Timeline:** 5.5 hours to code (starting 11 AM PT), 5 PM PT demo (3 mins)
- **Core Challenge:** Build autonomous, self-improving AI agents that tap into real-time data and take meaningful action without human intervention.

## Judging Criteria (20% each)
1. **Autonomy:** Agent acts on real-time data without manual intervention.
2. **Idea:** Real-world value.
3. **Technical Implementation:** Quality of build.
4. **Tool Use:** Meaningful use of at least 3 sponsor tools.
5. **Presentation:** Clear 3-minute demo.

## Core Concept
**Chirp** (BranderAgent) is an AI-powered personal branding agent for Twitter/X. Users define brand "spheres" via free-text descriptions. Gemini generates search queries based on those descriptions, which are used to discover relevant web content via You.com. The agent then drafts original tweets grounded in that researched content. Users review and approve tweets, and all feedback is stored to continuously improve the agent's voice, content taste, and query generation.

## Implemented Features (Core)
- ✅ Brand "spheres" definition via free-text description
- ✅ Gemini generates 5 focused search queries per sphere (structured output)
- ✅ Content discovery via You.com (Search API + Live News API)
- ✅ Tweet posting via Composio (Twitter integration)
- ✅ Next.js frontend with Neobrutalism design system
- ✅ FastAPI backend with 3 routers (search, sphere, tweet)
- ✅ Full deployment setup (Dockerfile, docker-compose, render.yaml)
- ✅ Intentional backend duplication (DO NOT CLEAN UP)

## In Progress
- Supabase Auth & Database integration
- X/Twitter authentication flow

## Remaining Work
- User query review and source selection UI
- Gemini tweet drafting with selected sources
- Draft review UI (approve/edit/reject)
- Continual learning feedback loop (SQLite-stored feedback)

## Stretch Goals (If Time Permits)
- Reply-to-tweets feature (searching for existing tweets to reply to)
- Model-agnostic architecture (Gemini is default)

## Out of Scope
- LinkedIn/GitHub integrations
- Complex agent frameworks (LangChain, CrewAI, etc.)
