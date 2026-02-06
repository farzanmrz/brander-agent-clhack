# Project Brief: BranderAgent

## Situation
- **Developer:** Farzan (Solo)
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
BranderAgent is an AI-powered personal branding agent for Twitter/X. It discovers relevant content, drafts on-brand replies in the user's voice, and learns from user feedback (approvals/edits/rejections) to improve future drafts.

## Scoped Down Features (The "Core")
- Brand "spheres" definition (topics, tone, goals).
- Content discovery via You.com (Search/News) and Composio (Twitter).
- Reply drafting using Gemini with RAG (You.com results) and few-shot examples (feedback loop).
- Simple Web UI for draft review.
- Twitter posting via Composio.
- Continual learning via SQLite-stored feedback.

## Out of Scope (Cut for Time)
- LinkedIn/GitHub integrations.
- Original post generation.
- Model-agnostic architecture (Gemini is default).
- Complex agent frameworks (LangChain, CrewAI, etc.).
