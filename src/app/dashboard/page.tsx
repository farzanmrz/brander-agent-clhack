"use client";

import Header from "@/components/Header";
import Button from "@/components/ui/Button";
import { mockRecentPosts, mockTrending } from "@/lib/mockData";
import {
  ArrowUpRight,
  Bird,
  Eye,
  Heart,
  Home,
  Image as ImageIcon,
  Repeat2,
  Search,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

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

          {/* Profile pill at bottom */}
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

        {/* Main Feed */}
        <main className="flex-1 min-w-0 border-r border-gray-100 min-h-screen pt-14">
          {/* Page header */}
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
                  <div className="flex items-center gap-1">
                    <button className="p-2 rounded-full hover:bg-green-50 text-green-600 transition-colors duration-150 cursor-pointer">
                      <ImageIcon className="w-5 h-5" />
                    </button>
                    <button className="p-2 rounded-full hover:bg-green-50 text-green-600 transition-colors duration-150 cursor-pointer">
                      <Sparkles className="w-5 h-5" />
                    </button>
                  </div>
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

          {/* Feed */}
          <div>
            {mockRecentPosts.map((post) => (
              <article
                key={post.id}
                className="px-4 py-3 border-b border-gray-100 hover:bg-gray-50/50 transition-colors duration-150 cursor-pointer"
              >
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-sm shrink-0">
                    U
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-sm text-gray-900">User</span>
                      <span className="text-sm text-gray-500">@yourhandle</span>
                      <span className="text-gray-300">&middot;</span>
                      <span className="text-sm text-gray-500">{post.postedAt}</span>
                    </div>
                    <p className="text-[15px] text-gray-900 leading-relaxed mt-0.5">
                      {post.text}
                    </p>
                    <div className="flex items-center gap-6 mt-2.5 -ml-2">
                      <button className="flex items-center gap-1.5 text-gray-500 hover:text-green-600 group transition-colors duration-150 cursor-pointer">
                        <div className="p-1.5 rounded-full group-hover:bg-green-50 transition-colors duration-150">
                          <Eye className="w-4 h-4" />
                        </div>
                        <span className="text-xs">{post.impressions.toLocaleString()}</span>
                      </button>
                      <button className="flex items-center gap-1.5 text-gray-500 hover:text-green-600 group transition-colors duration-150 cursor-pointer">
                        <div className="p-1.5 rounded-full group-hover:bg-green-50 transition-colors duration-150">
                          <Repeat2 className="w-4 h-4" />
                        </div>
                        <span className="text-xs">{post.reposts}</span>
                      </button>
                      <button className="flex items-center gap-1.5 text-gray-500 hover:text-pink-600 group transition-colors duration-150 cursor-pointer">
                        <div className="p-1.5 rounded-full group-hover:bg-pink-50 transition-colors duration-150">
                          <Heart className="w-4 h-4" />
                        </div>
                        <span className="text-xs">{post.likes}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="hidden md:block w-[350px] shrink-0 h-screen sticky top-0 pt-16 px-4 overflow-y-auto">
          {/* Search */}
          <div className="mt-2 mb-4">
            <div className="flex items-center gap-3 bg-gray-100 rounded-full px-4 py-2.5">
              <Search className="w-4 h-4 text-gray-500 shrink-0" />
              <input
                placeholder="Search topics"
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

          {/* Trending */}
          <div className="bg-gray-50 rounded-2xl overflow-hidden mb-4">
            <h2 className="px-4 pt-3 pb-2 text-lg font-bold text-gray-900">Trending</h2>
            {mockTrending.map((item, i) => (
              <button
                key={item.id}
                onClick={() =>
                  router.push(`/dashboard/topics?query=${encodeURIComponent(item.topic)}`)
                }
                className="w-full px-4 py-2.5 hover:bg-gray-100 transition-colors duration-150 cursor-pointer text-left"
              >
                <p className="text-xs text-gray-500">
                  {i + 1} &middot; Trending
                </p>
                <p className="text-sm font-bold text-gray-900">{item.topic}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <p className="text-xs text-gray-500">{item.posts} posts</p>
                  {item.trend === "up" && (
                    <ArrowUpRight className="w-3 h-3 text-green-500" />
                  )}
                </div>
              </button>
            ))}
            <button className="w-full px-4 py-3 text-left text-sm text-green-600 hover:bg-gray-100 transition-colors duration-150 cursor-pointer font-medium">
              Show more
            </button>
          </div>

          {/* Quick Topics */}
          <div className="bg-gray-50 rounded-2xl overflow-hidden">
            <h2 className="px-4 pt-3 pb-2 text-lg font-bold text-gray-900">Quick topics</h2>
            {[
              { emoji: "\u{1F916}", label: "Artificial Intelligence" },
              { emoji: "\u{1F30D}", label: "Climate Tech" },
              { emoji: "\u{1F680}", label: "Startups" },
            ].map((t) => (
              <button
                key={t.label}
                onClick={() =>
                  router.push(`/dashboard/topics?query=${encodeURIComponent(t.label)}`)
                }
                className="w-full px-4 py-3 hover:bg-gray-100 transition-colors duration-150 cursor-pointer text-left flex items-center gap-3"
              >
                <span className="text-lg">{t.emoji}</span>
                <span className="text-sm font-medium text-gray-900">{t.label}</span>
              </button>
            ))}
          </div>

          <p className="text-xs text-gray-400 mt-4 px-2">
            Powered by Chirp AI
          </p>
        </aside>
      </div>
    </div>
  );
}
