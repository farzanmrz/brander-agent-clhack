# Product Context: Chirp (BranderAgent)

## Why Chirp?
Personal branding on social media (specifically Twitter/X) is powerful but time-consuming. Users want to create thoughtful, informed content in their niche but often lack the time to research topics or the bandwidth to craft substantive tweets.

## Problems It Solves
- **Discovery Fatigue:** Manually finding relevant, high-signal content and news to tweet about.
- **Content Quality:** Generic, uninformed tweets that don't add value.
- **Brand Consistency:** Keeping a consistent voice across many tweets.
- **Real-time Relevancy:** Grounding tweets in current news and web context.
- **Research Overhead:** Time spent researching topics before tweeting.

## User Experience Goals
- **YC-style minimal design:** Clean, fast, professional interface with generous whitespace.
- **Streamlined flow:** Dashboard → Topic selection → Post variations → Preview & post.
- **Feedback Loop:** Easy "Approve/Edit/Reject" actions that feel like they're training the agent.
- **Mobile-responsive:** Works seamlessly on all devices.

## User Flow (Chirp Frontend)
1. **Landing Page:** User sees "Your AI-powered voice on X" value prop and Google sign-in button.
2. **Authentication:** Placeholder Google OAuth (routes to dashboard).
3. **Dashboard:** User inputs broad topic (e.g., "artificial intelligence") with quick-start suggestions.
4. **Topics Selection:** Chirp displays 3-5 specific angles (cards with icons, titles, descriptions). User selects one or multiple via checkboxes.
5. **Loading State:** Animated spinner with "Finding articles..." → "Crafting posts..." messages.
6. **Post Variations:** Shows 3 different post options with different angles on the same content. User selects favorite.
7. **Preview & Post:** Final preview with post text, hyperlinks included if relevant. "Post Now" button (v1 - no scheduling).
8. **Success:** Confirmation message "Posted to X!" with option to create another post.

## Backend Flow (API)
1. **Sphere Definition:** User submits free-text description via `/api/sphere/queries` endpoint.
2. **Query Generation:** Gemini processes description and generates 5 focused search queries (structured output).
3. **Content Discovery:** Each query runs through `/api/search` endpoint (You.com Search + Live News APIs), returning ~10 results per query.
4. **Source Selection:** Frontend displays results grouped by query. User checks which results to use as source material for tweets.
5. **Tweet Drafting:** Based on selected sources, Gemini drafts tweets using RAG (selected You.com results as knowledge base).
6. **Draft Review:** Frontend shows drafts, user reviews each: approve, edit, or reject.
7. **Posting:** Approved tweets posted to Twitter/X via `/api/tweet` endpoint (Composio integration).
8. **Learning Loop:** All feedback (approved/edited/rejected drafts, query tweaks, source selections) stored in SQLite per sphere. Future Gemini prompts include this feedback to learn user's preferences, voice, and content taste.

## Brand Identity
- **Name:** Chirp
- **Logo:** Simple bird icon (lucide-react Bird component)
- **Tagline:** "Your AI-powered voice on X"
- **Design:** Ultra-minimal, YC-style, green accent color (#10B981), Inter font
- **Personality:** Professional, trustworthy, fast, functional