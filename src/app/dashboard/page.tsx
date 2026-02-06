"use client";

import Header from "@/components/Header";
import Button from "@/components/ui/Button";
import { mockTrending } from "@/lib/mockData";
import {
  ArrowRight,
  ArrowUpRight,
  Bird,
  FileText,
  Globe,
  Home,
  Newspaper,
  Search,
  Sparkles,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const howItWorks = [
  {
    icon: <Search className="w-5 h-5" />,
    title: "You pick a topic",
    desc: "Type anything — AI, startups, climate. We take it from there.",
  },
  {
    icon: <Globe className="w-5 h-5" />,
    title: "We research the web",
    desc: "Chirp scans news, articles, and X in real-time to find what's trending.",
  },
  {
    icon: <FileText className="w-5 h-5" />,
    title: "Choose your angle",
    desc: "We surface specific angles so you control the narrative.",
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: "Post in one click",
    desc: "Review AI-crafted variations and post your favorite instantly.",
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleFindTopics = () => {
    if (!query.trim()) return;
    router.push(`/dashboard/topics?query=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-[1280px] mx-auto flex">
        {/* Left Sidebar */}
        <aside className="hidden lg:flex flex-col w-[68px] xl:w-[240px] shrink-0 h-screen sticky top-0 pt-16 px-2 xl:px-3 border-r border-gray-100">
          <nav className="mt-4 space-y-1">
            <Link
              href="/dashboard"
              className="flex items-center gap-4 px-3 py-3 rounded-full hover:bg-gray-100 transition-colors duration-150"
            >
              <Home className="w-6 h-6 text-gray-900" />
              <span className="hidden xl:block text-lg font-bold text-gray-900">Home</span>
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center gap-4 px-3 py-3 rounded-full hover:bg-gray-100 transition-colors duration-150"
            >
              <Search className="w-6 h-6 text-gray-600" />
              <span className="hidden xl:block text-lg text-gray-600">Explore</span>
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center gap-4 px-3 py-3 rounded-full hover:bg-gray-100 transition-colors duration-150"
            >
              <Sparkles className="w-6 h-6 text-gray-600" />
              <span className="hidden xl:block text-lg text-gray-600">My Style</span>
            </Link>
          </nav>

          <div className="mt-4 px-2">
            <Button
              onClick={() => document.getElementById("compose-input")?.focus()}
              size="lg"
              className="w-full xl:w-full hidden xl:block"
            >
              Post
            </Button>
            <button
              onClick={() => document.getElementById("compose-input")?.focus()}
              className="xl:hidden w-12 h-12 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center text-white transition-colors duration-150 cursor-pointer"
            >
              <Bird className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-auto mb-4">
            <div className="flex items-center gap-3 px-3 py-2 rounded-full hover:bg-gray-100 transition-colors duration-150 cursor-pointer">
              <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-sm shrink-0">
                U
              </div>
              <div className="hidden xl:block min-w-0">
                <p className="text-sm font-bold text-gray-900 truncate">User</p>
                <p className="text-xs text-gray-500 truncate">@yourhandle</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 border-r border-gray-100 min-h-screen pt-14">
          <div className="sticky top-14 bg-white/80 backdrop-blur-md z-40 px-4 py-3 border-b border-gray-100">
            <h1 className="text-lg font-bold text-gray-900">Home</h1>
          </div>

          {/* Compose Box */}
          <div className="px-4 py-4 border-b border-gray-100">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-sm shrink-0 mt-1">
                U
              </div>
              <div className="flex-1 min-w-0">
                <input
                  id="compose-input"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleFindTopics()}
                  placeholder="What do you want to post about?"
                  className="w-full text-lg placeholder:text-gray-500 outline-none py-2 bg-transparent"
                />
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                  <p className="text-xs text-gray-400">
                    We&apos;ll research trending angles for you
                  </p>
                  <Button
                    onClick={handleFindTopics}
                    disabled={!query.trim()}
                    size="md"
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Find Topics
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* How Chirp Works */}
          <div className="px-4 py-5 border-b border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <Newspaper className="w-4 h-4 text-green-600" />
              <h2 className="text-sm font-bold text-gray-900">How Chirp works</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {howItWorks.map((step, i) => (
                <div
                  key={step.title}
                  className="flex gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-150"
                >
                  <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 shrink-0">
                    <span className="text-xs font-bold">{i + 1}</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{step.title}</p>
                    <p className="text-xs text-gray-500 leading-relaxed mt-0.5">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trending on X — research prompts */}
          <div className="px-4 py-5">
            <div className="flex items-center gap-2 mb-1">
              <Globe className="w-4 h-4 text-green-600" />
              <h2 className="text-sm font-bold text-gray-900">Happening now</h2>
            </div>
            <p className="text-xs text-gray-500 mb-4">
              Tap any topic and we&apos;ll research it for you
            </p>
            {mockTrending.map((item) => (
              <button
                key={item.id}
                onClick={() =>
                  router.push(`/dashboard/topics?query=${encodeURIComponent(item.topic)}`)
                }
                className="w-full flex items-center justify-between py-3 border-b border-gray-50 last:border-0 hover:bg-gray-50 -mx-2 px-2 rounded-lg transition-colors duration-150 cursor-pointer group"
              >
                <div className="text-left">
                  <p className="text-[15px] font-bold text-gray-900 group-hover:text-green-700 transition-colors duration-150">
                    {item.topic}
                  </p>
                  <p className="text-xs text-gray-500">{item.posts} posts on X</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-green-600 transition-colors duration-150" />
              </button>
            ))}
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="hidden md:block w-[350px] shrink-0 h-screen sticky top-0 pt-16 px-4 overflow-y-auto">
          <div className="mt-2 mb-4">
            <div className="flex items-center gap-3 bg-gray-100 rounded-full px-4 py-2.5">
              <Search className="w-4 h-4 text-gray-500 shrink-0" />
              <input
                placeholder="Search any topic"
                className="bg-transparent outline-none text-sm placeholder:text-gray-500 w-full"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const val = (e.target as HTMLInputElement).value.trim();
                    if (val) router.push(`/dashboard/topics?query=${encodeURIComponent(val)}`);
                  }
                }}
              />
            </div>
          </div>

          {/* What Chirp Does */}
          <div className="bg-gray-50 rounded-2xl overflow-hidden mb-4 p-4">
            <div className="flex items-center gap-2 mb-3">
              <Bird className="w-5 h-5 text-green-600" />
              <h2 className="text-sm font-bold text-gray-900">Chirp researches for you</h2>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed mb-3">
              Just enter a topic. Our AI agent scans the latest news, articles, and discussions across the web to find the most relevant angles — then crafts ready-to-post content in your voice.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <div className="w-1 h-1 rounded-full bg-green-500" />
                Real-time web &amp; news research
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <div className="w-1 h-1 rounded-full bg-green-500" />
                Multiple angles per topic
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <div className="w-1 h-1 rounded-full bg-green-500" />
                You control the narrative
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <div className="w-1 h-1 rounded-full bg-green-500" />
                Post to X in one click
              </div>
            </div>
          </div>

          {/* Quick Topics */}
          <div className="bg-gray-50 rounded-2xl overflow-hidden mb-4">
            <h2 className="px-4 pt-3 pb-2 text-sm font-bold text-gray-900">Try a topic</h2>
            {[
              { emoji: "\u{1F916}", label: "Artificial Intelligence" },
              { emoji: "\u{1F30D}", label: "Climate Tech" },
              { emoji: "\u{1F680}", label: "Startups" },
              { emoji: "\u26D3\uFE0F", label: "Web3 & Crypto" },
              { emoji: "\u{1F3A8}", label: "Product Design" },
            ].map((t) => (
              <button
                key={t.label}
                onClick={() =>
                  router.push(`/dashboard/topics?query=${encodeURIComponent(t.label)}`)
                }
                className="w-full px-4 py-2.5 hover:bg-gray-100 transition-colors duration-150 cursor-pointer text-left flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-base">{t.emoji}</span>
                  <span className="text-sm text-gray-900">{t.label}</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-green-600 transition-colors duration-150" />
              </button>
            ))}
          </div>

          <p className="text-xs text-gray-400 px-2">
            Powered by Chirp AI
          </p>
        </aside>
      </div>
    </div>
  );
}
