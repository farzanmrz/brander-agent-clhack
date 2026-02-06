# Product Context: BranderAgent

## Why BranderAgent?
Personal branding on social media (specifically Twitter/X) is powerful but time-consuming. Users want to engage with relevant conversations in their field but often lack the time to find them or the bandwidth to craft thoughtful, on-brand replies.

## Problems It Solves
- **Discovery Fatigue:** Manually finding relevant, high-signal tweets to engage with.
- **Content Quality:** Generic, low-effort replies that don't add value.
- **Brand Consistency:** Keeping a consistent voice across many interactions.
- **Real-time Relevancy:** Grounding replies in current news and web context.

## User Experience Goals
- **Simplicity first:** A basic web UI to manage "spheres" and review drafts.
- **Ugly-but-functional:** Priority is a working end-to-end flow for the demo.
- **Feedback Loop:** Easy "Approve/Edit/Reject" actions that feel like they're training the agent.

## User Flow
1. **Define Spheres:** User sets up topics (e.g., "AI Dev"), tone (e.g., "Helpful, technical"), and goals.
2. **Autonomous Discovery:** Agent finds tweets and related news/web content.
3. **Drafting:** Agent drafts replies using Gemini, grounded in real-time data and user voice.
4. **Review:** User approves, edits, or rejects drafts in the UI.
5. **Action:** Approved replies are posted to Twitter.
6. **Learning:** Feedback is stored and used as few-shot examples for future drafting.
