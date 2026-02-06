"use client";

import Header from "@/components/Header";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useRouter } from "next/navigation";
import { useState } from "react";

const quickStarts = ["Artificial Intelligence", "Climate Tech", "Web3", "Startups"];

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
      <main className="max-w-3xl mx-auto px-6 pt-28 pb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12">
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

        <p className="text-sm text-gray-500 text-center">
          We&apos;ll find the trending angles for you
        </p>

        <div className="mt-16">
          <p className="text-sm font-semibold text-gray-700 mb-3">
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
                className="bg-white border-2 border-gray-200 px-5 py-2.5 rounded-full text-sm text-gray-700 hover:border-green-500 transition-all duration-150 cursor-pointer"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
