# Chirp - Hackathon Project Guide

## Project Overview

**Name:** Chirp  
**Tagline:** Your AI-powered voice on X  
**Purpose:** Automated X (Twitter) posting platform based on user interests

### The Problem
Everyone knows they should post on X, but finding relevant content daily is exhausting. Your expertise is valuable, but you don't have time to be a content researcher AND a writer.

### The Solution
Chirp gives you control of the narrative while handling the research. You pick the angle, we handle everything else.

---

## Brand Identity

### Name & Logo
- **Name:** Chirp
- **Logo:** Simple bird icon + "Chirp" wordmark
- **Why Chirp?** Simple, memorable, on-brand, and playful without being unprofessional

### Design Philosophy
- Ultra-minimal and clean (YC-style)
- Fast, no unnecessary animations
- Generous whitespace
- Crisp typography
- Function over flash
- Professional and trustworthy

---

## User Flow

### Complete Journey

1. **Landing Page**
   - Google OAuth sign-in
   - Simple value proposition

2. **Twitter Connection** (one-time setup)
   - Connect X account after Google login
   - "I'll do this later" skip option

3. **Dashboard** - Main Input
   - User types broad topic: "AI"
   - Click "Find Topics"

4. **Query Selection**
   - Chirp returns 3-5 specific angles:
     - "Anthropic's new Claude model"
     - "ChatGPT's latest features"
     - "OpenAI's new GPT-5 capabilities"
   - User selects one or multiple (checkboxes)
   - Click "Generate Posts"

5. **Loading State**
   - Animated bird illustration
   - "Finding articles..." → "Crafting posts..."

6. **Post Variations**
   - Shows 3 different post options
   - Different angles on the same content
   - User selects favorite

7. **Preview & Post**
   - Final preview with post text
   - Hyperlinks included if relevant
   - "Post Now" button (v1 - no scheduling)

8. **Success**
   - Confirmation message
   - Return to dashboard for next post

---

## Continual Learning Strategy

### What the Agent Learns From

1. **Post Selection Patterns**
   - User always picks "technical" angles → learn preference
   - Pattern: Business vs Technical vs Hot Takes

2. **Edit Patterns** (future)
   - User shortens posts → learn brevity preference
   - User adds hashtags → learn style
   - User removes links → learn format preference

3. **Topic Preferences**
   - User keeps choosing AI topics → surface AI first
   - Track frequency of topics

### Demo Strategy

**First Use:**
- User picks "technical deep-dive" post about Anthropic

**Second Use:**
- Agent notices pattern
- Generates more technical-focused variations

**Third Use:**
- Agent prominently shows: "Based on your style, here are 3 technical angles..."
- Suggest related topics in "Quick starts"

### Visual Learning Indicators

- Badge: "Learning your style..." after first few posts
- Dashboard hint: "We noticed you prefer technical content"
- Quick starts show learned preferences

---

## Design System

### Color Palette

```javascript
colors: {
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
  green: {
    50: '#F0FDF4',
    100: '#DCFCE7',
    500: '#10B981',
    600: '#059669',
    700: '#047857',
  }
}
```

### Typography Scale

- **Heading XL:** text-5xl (48px), font-bold
- **Heading L:** text-3xl (30px), font-bold
- **Heading M:** text-xl (20px), font-semibold
- **Body Large:** text-lg (18px)
- **Body:** text-base (16px)
- **Body Small:** text-sm (14px)
- **Caption:** text-xs (12px)

### Spacing System
Use consistent spacing: 4, 8, 12, 16, 24, 32, 48, 64, 96px

---

## Pitch Strategy

### Opening Hook (Choose One)

**Option A - Time Problem:**
"Everyone knows they should post on X, but finding relevant content daily is exhausting"

**Option B - Expertise Problem:**
"Your expertise is valuable, but you don't have time to be a content researcher AND a writer"

**Option C - Relevance Problem:**
"Staying relevant means posting about what's happening NOW - but who has time to track everything?"

### The Unique Insight

**What makes Chirp different:**
1. The angle selection step - you control the narrative, we handle the research
2. Always current - posting about what's happening now
3. Trust through transparency - you see what it found, you pick the angle

### Demo Flow for Judges

1. **Show the problem:** "I want to post about AI but don't have time to find stories"
2. **Type "AI"** → Get specific angles immediately
3. **Pick "Anthropic"** → Agent researches and writes
4. **See 3 variations** → Different perspectives on same content
5. **Post with one click**
6. **Continual learning reveal:** "Here's what makes this special - it learns your style..."
   - Show how second/third use adapts to preferences
   - Highlight the learning indicators

### Key Talking Points

- **Speed:** From idea to post in under 60 seconds
- **Control:** You decide the angle, not the AI
- **Trust:** See the sources, approve before posting
- **Learning:** Gets smarter with every post you make
- **Freshness:** Always posting about what's happening now

---

## Technical Architecture

### Tech Stack
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Forms:** React Hook Form
- **Icons:** Lucide React
- **Auth:** NextAuth.js with Google provider (or simple placeholder)

### Project Structure

```
/app
  /page.tsx                 # Landing page with Google auth
  /dashboard
    /page.tsx              # Main dashboard
    /topics/page.tsx       # Topic selection
    /posts/page.tsx        # Post variations
    /preview/page.tsx      # Final preview
  /layout.tsx              # Root layout
/components
  /ui
    /Button.tsx
    /Input.tsx
    /Card.tsx
  /GoogleSignIn.tsx
  /Header.tsx
  /TopicInput.tsx
  /TopicCard.tsx
  /PostCard.tsx
  /LoadingState.tsx
/lib
  /utils.ts
  /mockData.ts
/public
  /chirp-logo.svg
```

---

## Claude Code Build Prompt

```
You are building Chirp - an AI-powered X (Twitter) posting platform. Create a beautiful, minimal YC-style web interface using Next.js 14+ (App Router) and Tailwind CSS.

TECH STACK:
- Next.js 14+ with App Router
- TypeScript
- Tailwind CSS
- React Hook Form for forms
- Lucide React for icons
- No external animation libraries (use Tailwind transitions only)

DESIGN PHILOSOPHY (YC-STYLE):
- Ultra-minimal and clean
- Fast, no unnecessary animations
- Generous whitespace
- Crisp typography
- Function over flash
- Professional and trustworthy
- No gradients, no flashy effects
- Let content breathe

COLOR PALETTE:
```js
// tailwind.config.js
colors: {
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
  green: {
    50: '#F0FDF4',
    100: '#DCFCE7',
    500: '#10B981',
    600: '#059669',
    700: '#047857',
  }
}
```

TYPOGRAPHY:
```js
// tailwind.config.js
fontFamily: {
  sans: ['Inter', 'system-ui', 'sans-serif'],
}
```

PROJECT STRUCTURE:
```
/app
  /page.tsx                 # Landing page with Google auth
  /dashboard
    /page.tsx              # Main dashboard
    /topics/page.tsx       # Topic selection
    /posts/page.tsx        # Post variations
    /preview/page.tsx      # Final preview
  /layout.tsx              # Root layout
/components
  /ui
    /Button.tsx
    /Input.tsx
    /Card.tsx
  /GoogleSignIn.tsx
  /Header.tsx
  /TopicInput.tsx
  /TopicCard.tsx
  /PostCard.tsx
  /LoadingState.tsx
/lib
  /utils.ts
  /mockData.ts
/public
  /chirp-logo.svg          # Simple bird icon
```

COMPONENT SPECIFICATIONS:

1. Button Component (/components/ui/Button.tsx):
```tsx
- Variants: 'primary' (green), 'secondary' (white with border), 'ghost'
- Sizes: 'sm', 'md', 'lg'
- Primary: bg-green-600 hover:bg-green-700 text-white
- Secondary: border-2 border-gray-200 hover:border-gray-300 bg-white
- All buttons: font-semibold, rounded-xl, transition-all duration-150
- Disabled: opacity-50 cursor-not-allowed
- No shadows on primary (YC style is flat)
```

2. Input Component (/components/ui/Input.tsx):
```tsx
- Border: 2px solid gray-200
- Focus: border-green-500, outline-none
- Padding: px-4 py-3
- Rounded: rounded-xl
- Font: text-base
- Placeholder: text-gray-400
- No focus ring (just border color change)
```

3. Card Component (/components/ui/Card.tsx):
```tsx
- Background: white
- Border: 2px solid gray-200
- Padding: p-6
- Rounded: rounded-2xl
- Hover (if clickable): border-gray-300, translate-y-[-1px]
- No shadow (or very subtle: shadow-sm)
- Transition: all 150ms ease
```

PAGES TO BUILD:

PAGE 1: Landing (/app/page.tsx)
```tsx
Layout:
- Full height viewport
- Centered content
- Logo at top (fixed, 24px from top)
- Main content vertically centered

Content:
- H1: "Your AI-powered voice on X"
  * text-5xl md:text-6xl font-bold text-gray-900 mb-4
  * max-w-3xl text-center
- Subheading: "Tell us what you want to talk about. We'll find the stories and craft the posts."
  * text-xl text-gray-600 mb-12
  * max-w-2xl text-center
- Google Sign-in button:
  * White background
  * Border: 2px solid gray-200
  * Hover: border-gray-300
  * px-6 py-4 rounded-xl
  * flex items-center gap-3
  * Google logo (use SVG or emoji)
  * "Sign in with Google" text (font-medium)
  * No shadow
```

PAGE 2: Dashboard (/app/dashboard/page.tsx)
```tsx
Layout:
- Header component (fixed top)
- Main container: max-w-3xl mx-auto px-6 py-12

Header:
- height: 64px
- border-bottom: 1px solid gray-200
- Logo left, User avatar right
- bg-white

Main content:
- H1: "What do you want to talk about today?"
  * text-4xl md:text-5xl font-bold text-gray-900 mb-12
- Large input field:
  * w-full mb-4
  * text-lg px-6 py-5
  * placeholder: "e.g., artificial intelligence, climate tech, web3..."
- "Find Topics" button:
  * w-full variant="primary" size="lg"
  * mb-2
- Helper text: 
  * text-sm text-gray-500 text-center
  * "We'll find the trending angles for you"

Quick starts (if user has history):
- mt-16
- "Quick starts" label (text-sm font-semibold text-gray-700 mb-3)
- Flex row gap-3
- Pills: white bg, border-2 gray-200, px-5 py-2.5, rounded-full
- Hover: border-green-500
```

PAGE 3: Topic Selection (/app/dashboard/topics/page.tsx)
```tsx
Layout:
- Same header
- Container: max-w-5xl mx-auto px-6 py-12

Content:
- Back button (top-left, text-gray-600 hover:text-gray-900)
- H1: "Pick the angles you want to explore"
  * text-3xl font-bold text-gray-900 mb-8
- Grid of cards:
  * grid md:grid-cols-2 gap-4
  * 3-5 cards

Each TopicCard:
- Checkbox top-right (custom styled)
- Icon/emoji (text-2xl mb-3)
- Headline (text-lg font-semibold text-gray-900 mb-2)
- Description (text-sm text-gray-600)
- Border changes to green-500 when selected
- bg-green-50 when selected

Bottom bar (sticky bottom):
- bg-white border-t-2 border-gray-200
- p-4
- "Generate Posts (X selected)" button
- Full width, variant="primary"
- Disabled if nothing selected
```

PAGE 4: Post Variations (/app/dashboard/posts/page.tsx)
```tsx
Layout:
- Same header
- Container: max-w-6xl mx-auto px-6 py-12

Content:
- H1: "Choose your favorite angle"
  * text-3xl font-bold text-gray-900 mb-8
- Grid: grid md:grid-cols-3 gap-6

Each PostCard:
- White card with border
- Post text (text-base leading-relaxed mb-4)
- Links styled: text-green-600 underline
- Character count bottom (text-xs text-gray-500)
- "Select" button at bottom
  * border-2 border-green-600 text-green-700
  * hover:bg-green-600 hover:text-white
- Selected state: border-green-600 bg-green-50
```

PAGE 5: Preview & Post (/app/dashboard/preview/page.tsx)
```tsx
Layout:
- Same header
- Container: max-w-2xl mx-auto px-6 py-12

Content:
- H1: "Your post" (text-2xl font-bold mb-6)
- Preview card:
  * bg-gray-50 p-6 rounded-xl border-2 border-gray-200
  * Post text preserved with formatting
  * Links in green-600
- Character count (text-sm text-gray-500 mt-2)
- Button group (flex gap-4 mt-8):
  * "Post Now" - variant="primary" flex-1
  * "Edit" - variant="secondary"

Success state:
- Replace with centered content:
- Green checkmark (use lucide-react Check icon in circle)
- "Posted to X!" (text-2xl font-bold mb-2)
- "Ready for your next post?" (text-gray-600 mb-8)
- "Create Another Post" button -> back to dashboard
```

LOADING STATE Component:
```tsx
- Centered on page
- Simple spinner (use lucide-react Loader2 with animate-spin)
- OR simple dots animation using Tailwind
- Text below: "Finding articles..." / "Crafting posts..."
- text-base text-gray-600
- No elaborate animations (YC style is simple)
```

HEADER Component:
```tsx
- Fixed top, w-full, bg-white, border-b border-gray-200
- h-16
- Container: max-w-7xl mx-auto px-6
- Flex justify-between items-center
- Logo: flex items-center gap-2
  * Bird icon (20px)
  * "Chirp" text (font-semibold text-lg)
- Right side: User avatar (w-8 h-8 rounded-full)
  * Click opens dropdown (Settings, Sign out)
```

GOOGLE AUTH:
```tsx
// For hackathon, can be placeholder that just navigates to dashboard
// Or use NextAuth.js with Google provider

Button click -> router.push('/dashboard')
```

STATE MANAGEMENT:
```tsx
// Use React Context or just URL params for hackathon
// Store in URL searchParams:
// /dashboard/topics?query=AI
// /dashboard/posts?topic=anthropic
// /dashboard/preview?postId=1
```

STYLING RULES:
1. NO custom shadows (or only shadow-sm)
2. NO gradients
3. Border-2 for all borders (not 1px)
4. Transitions: 150ms max
5. Colors: Only gray scale + green accent
6. Rounded: rounded-xl or rounded-2xl (generous but not excessive)
7. Spacing: Use 4, 6, 8, 12, 16, 24 (Tailwind scale)
8. Font weights: Only normal (400), medium (500), semibold (600), bold (700)

INTERACTIONS:
- Hover states: Subtle (border color change, slight translate)
- Focus: Border color only (no rings)
- Active: No special state needed
- Disabled: opacity-50
- All transitions: transition-all duration-150 ease

MOCK DATA:
Create simple mock data for demonstration:
```tsx
// /lib/mockData.ts
export const mockTopics = [
  { 
    id: 1, 
    icon: '🤖', 
    title: "Anthropic's new Claude model", 
    description: "Latest developments in constitutional AI" 
  },
  { 
    id: 2, 
    icon: '💬', 
    title: "ChatGPT's new features", 
    description: "OpenAI announces GPT-5 capabilities" 
  },
  { 
    id: 3, 
    icon: '🚀', 
    title: "AI safety breakthroughs", 
    description: "New alignment research from major labs" 
  },
  // ... 3-5 total
]

export const mockPosts = [
  { 
    id: 1, 
    text: "Anthropic just released Claude 3.5 Sonnet with breakthrough reasoning capabilities. The model shows 40% improvement on complex coding tasks while maintaining safety guardrails. This could reshape how we build AI applications. https://anthropic.com", 
    chars: 247 
  },
  { 
    id: 2, 
    text: "Big news in AI: Anthropic's Claude 3.5 Sonnet is here. Technical deep-dive shows novel approaches to constitutional AI that balance capability with safety. Worth watching how this impacts the field. https://anthropic.com", 
    chars: 223 
  },
  { 
    id: 3, 
    text: "Claude 3.5 Sonnet launch has some interesting implications for the AI race. Anthropic is betting on safety-first scaling. Time will tell if this approach wins. https://anthropic.com", 
    chars: 178 
  },
]
```

BUILD ORDER:
1. Set up Next.js project with Tailwind
2. Create base UI components (Button, Input, Card)
3. Build landing page with Google sign-in
4. Build dashboard with input
5. Build topic selection page
6. Build post variations page
7. Build preview/post page
8. Add navigation between pages
9. Add mock data
10. Polish interactions

MUST HAVES:
- Fully responsive (mobile-first)
- TypeScript strict mode
- Clean, semantic HTML
- Fast page loads (no heavy dependencies)
- Keyboard accessible
- Works without JavaScript for initial render where possible

AVOID:
- Heavy animation libraries
- Unnecessary dependencies
- Complex state management (keep it simple)
- Over-engineering (it's a hackathon!)

The goal is a crisp, professional, fast-loading interface that looks like it came from a top YC startup. Clean, minimal, functional, beautiful.
```

---

## Mock Data Examples

### Topic Queries
```json
[
  {
    "id": 1,
    "icon": "🤖",
    "title": "Anthropic's new Claude model",
    "description": "Latest developments in constitutional AI"
  },
  {
    "id": 2,
    "icon": "💬",
    "title": "ChatGPT's new features",
    "description": "OpenAI announces GPT-5 capabilities"
  },
  {
    "id": 3,
    "icon": "🚀",
    "title": "AI safety breakthroughs",
    "description": "New alignment research from major labs"
  }
]
```

### Post Variations
```json
[
  {
    "id": 1,
    "angle": "Technical Deep-Dive",
    "text": "Anthropic just released Claude 3.5 Sonnet with breakthrough reasoning capabilities. The model shows 40% improvement on complex coding tasks while maintaining safety guardrails. This could reshape how we build AI applications. https://anthropic.com",
    "chars": 247
  },
  {
    "id": 2,
    "angle": "Industry Analysis",
    "text": "Big news in AI: Anthropic's Claude 3.5 Sonnet is here. Technical deep-dive shows novel approaches to constitutional AI that balance capability with safety. Worth watching how this impacts the field. https://anthropic.com",
    "chars": 223
  },
  {
    "id": 3,
    "angle": "Hot Take",
    "text": "Claude 3.5 Sonnet launch has some interesting implications for the AI race. Anthropic is betting on safety-first scaling. Time will tell if this approach wins. https://anthropic.com",
    "chars": 178
  }
]
```

---

