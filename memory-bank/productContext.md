# Product Context: BranderAgent

## Why BranderAgent?
Personal branding on social media (specifically Twitter/X) is powerful but time-consuming. Users want to create thoughtful, informed content in their niche but often lack the time to research topics or the bandwidth to craft substantive tweets.

## Problems It Solves
- **Discovery Fatigue:** Manually finding relevant, high-signal content and news to tweet about.
- **Content Quality:** Generic, uninformed tweets that don't add value.
- **Brand Consistency:** Keeping a consistent voice across many tweets.
- **Real-time Relevancy:** Grounding tweets in current news and web context.
- **Research Overhead:** Time spent researching topics before tweeting.

## User Experience Goals
- **Simplicity first:** A basic web UI to manage "spheres," review queries, select sources, and review drafts.
- **Ugly-but-functional:** Priority is a working end-to-end flow for the demo.
- **Feedback Loop:** Easy "Approve/Edit/Reject" actions that feel like they're training the agent.
- **MVP UI:** Don't over-build query editing or source filtering UI. Simple checklists are sufficient.

## User Flow
1. **Authenticate:** User logs in with Twitter/X via Composio OAuth.
2. **Define Sphere:** User writes a free-text description of what they want to post about (e.g., "I want to build my brand as an AI developer who shares practical takes on new tools and frameworks").
3. **Query Generation:** Gemini processes the description and generates 5 focused search queries to find relevant content.
4. **Query Review:** Queries are shown to the user. User can accept as-is or tweak the wording before searching.
5. **Content Discovery:** Each query runs through You.com Search API and Live News API, returning ~10 results per query.
6. **Source Selection:** Results displayed grouped by query (titles, snippets, URLs). User checks which results to use as source material for tweets.
7. **Tweet Drafting:** Based on selected sources, Gemini drafts tweets. One tweet per selected topic/cluster. Drafts grounded in actual You.com content.
8. **Draft Review:** User reviews each draft: approve, edit, or reject.
9. **Posting:** Approved tweets posted to Twitter/X via Composio.
10. **Learning Loop:** All feedback (approved/edited/rejected drafts, query tweaks, source selections) stored in SQLite per sphere. This feedback is included in future Gemini prompts so the agent learns the user's preferences, voice, and content taste over time.
