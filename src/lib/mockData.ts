export const mockTopics = [
  {
    id: 1,
    icon: "\u{1F916}",
    title: "Anthropic's new Claude model",
    description: "Latest developments in constitutional AI and reasoning capabilities",
  },
  {
    id: 2,
    icon: "\u{1F4AC}",
    title: "ChatGPT's new features",
    description: "OpenAI announces GPT-5 capabilities and multimodal updates",
  },
  {
    id: 3,
    icon: "\u{1F680}",
    title: "AI safety breakthroughs",
    description: "New alignment research from major labs shows promising results",
  },
  {
    id: 4,
    icon: "\u{1F4CA}",
    title: "AI in enterprise adoption",
    description: "How Fortune 500 companies are deploying AI at scale",
  },
  {
    id: 5,
    icon: "\u{1F9E0}",
    title: "Open-source AI models",
    description: "Meta's Llama and the democratization of AI technology",
  },
];

export const mockPosts = [
  {
    id: 1,
    angle: "Technical Deep-Dive",
    text: "Anthropic just released Claude 3.5 Sonnet with breakthrough reasoning capabilities. The model shows 40% improvement on complex coding tasks while maintaining safety guardrails. This could reshape how we build AI applications. https://anthropic.com",
    chars: 247,
  },
  {
    id: 2,
    angle: "Industry Analysis",
    text: "Big news in AI: Anthropic's Claude 3.5 Sonnet is here. Technical deep-dive shows novel approaches to constitutional AI that balance capability with safety. Worth watching how this impacts the field. https://anthropic.com",
    chars: 223,
  },
  {
    id: 3,
    angle: "Hot Take",
    text: "Claude 3.5 Sonnet launch has some interesting implications for the AI race. Anthropic is betting on safety-first scaling. Time will tell if this approach wins. https://anthropic.com",
    chars: 178,
  },
];

export const mockRecentPosts = [
  {
    id: 1,
    text: "The future of AI isn't just about capability - it's about alignment. Watching Anthropic's approach closely.",
    postedAt: "2 hours ago",
    impressions: 1243,
    likes: 47,
    reposts: 12,
  },
  {
    id: 2,
    text: "Hot take: The best AI products in 2026 won't be chatbots. They'll be invisible agents that handle the boring stuff.",
    postedAt: "Yesterday",
    impressions: 3891,
    likes: 156,
    reposts: 43,
  },
  {
    id: 3,
    text: "Just tried GPT-5's reasoning mode on a complex coding task. The gap between models is shrinking fast.",
    postedAt: "2 days ago",
    impressions: 892,
    likes: 29,
    reposts: 8,
  },
];

export const mockTrending = [
  { id: 1, topic: "Claude 4.5 Release", posts: "12.4K", trend: "up" as const },
  { id: 2, topic: "AI Regulation EU", posts: "8.7K", trend: "up" as const },
  { id: 3, topic: "GPT-5 Benchmarks", posts: "6.2K", trend: "down" as const },
  { id: 4, topic: "Open Source LLMs", posts: "5.1K", trend: "up" as const },
  { id: 5, topic: "AI in Healthcare", posts: "3.8K", trend: "up" as const },
];
