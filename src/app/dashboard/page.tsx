"use client";

import Header from "@/components/Header";
import TweetCarousel from "@/components/TweetCarousel";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useRouter } from "next/navigation";
import { useState } from "react";

const quickStarts = [
  "Artificial Intelligence",
  "Climate Tech",
  "Web3",
  "Startups",
];

export default function DashboardPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleFindTopics = () => {
    if (!query.trim()) return;
    router.push(`/dashboard/topics?query=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <main className="max-w-3xl mx-auto px-6 pt-28 pb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-black mb-12">
          What do you want to talk about today?
        </h1>

        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleFindTopics()}
          placeholder="e.g., artificial intelligence, climate tech, web3..."
          className="text-lg px-6 py-5 mb-4"
        />

        <Button
          onClick={handleFindTopics}
          disabled={!query.trim()}
          size="lg"
          className="w-full mb-2"
        >
          Find Topics
        </Button>

        <p className="text-sm text-gray-600 text-center font-medium">
          We&apos;ll find the trending angles for you
        </p>

        <div className="mt-16">
          <p className="text-sm font-bold text-black mb-3 uppercase tracking-wide">
            Quick starts
          </p>
          <div className="flex flex-wrap gap-3">
            {quickStarts.map((topic) => (
              <button
                key={topic}
                onClick={() => {
                  setQuery(topic);
                  router.push(
                    `/dashboard/topics?query=${encodeURIComponent(topic)}`
                  );
                }}
                className="bg-white neo-border neo-shadow-sm px-5 py-2.5 rounded-lg text-sm font-bold text-black hover:bg-sky transition-all duration-100 cursor-pointer neo-press-sm"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        <TweetCarousel />
      </main>
    </div>
  );
}
