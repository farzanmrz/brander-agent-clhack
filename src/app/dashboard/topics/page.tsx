"use client";

import { apiUrl } from "@/lib/api";
import Header from "@/components/Header";
import LoadingState from "@/components/LoadingState";
import TopicCard from "@/components/TopicCard";
import Button from "@/components/ui/Button";
import { ArrowLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";

interface SphereTopic {
  id: number;
  icon: string;
  title: string;
  description: string;
}

function TopicsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [selected, setSelected] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [topics, setTopics] = useState<SphereTopic[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchTopics = useCallback(async () => {
    if (!query.trim()) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(apiUrl("/api/sphere/queries"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: query.trim() }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail || `Request failed: ${res.status}`);
      }
      const data = await res.json();
      const mapped: SphereTopic[] = (data.queries || []).map(
        (q: string, i: number) => ({
          id: i + 1,
          icon: "\uD83D\uDD0D",
          title: q,
          description: "Search angle for finding relevant content",
        })
      );
      setTopics(mapped);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch topics");
      setTopics([]);
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    fetchTopics();
  }, [fetchTopics]);

  const toggleTopic = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleGenerate = () => {
    const selectedQueries = topics
      .filter((t) => selected.includes(t.id))
      .map((t) => t.title);
    sessionStorage.setItem(
      "brander_generate",
      JSON.stringify({ sphereDescription: query, selectedQueries })
    );
    router.push("/dashboard/posts");
  };

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <main className="max-w-5xl mx-auto px-6 pt-28 pb-32">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 text-black font-bold mb-6 transition-all duration-100 cursor-pointer hover:underline decoration-2 underline-offset-4"
        >
          <ArrowLeft className="w-5 h-5" strokeWidth={3} />
          <span className="text-sm">Back</span>
        </button>

        <h1 className="text-3xl font-bold text-black mb-2">
          Pick the angles you want to explore
        </h1>
        <p className="text-gray-600 font-medium mb-8">
          Results for &ldquo;{query}&rdquo;
        </p>

        {loading ? (
          <LoadingState message="Finding topics..." />
        ) : error ? (
          <div className="rounded-lg neo-border bg-purple-light p-6 text-black">
            <p className="font-bold mb-2">Could not load topics</p>
            <p className="text-sm mb-4">{error}</p>
            <Button onClick={fetchTopics} size="sm">
              Retry
            </Button>
          </div>
        ) : topics.length === 0 ? (
          <div className="bg-white neo-border neo-shadow p-8 rounded-lg">
            <p className="text-gray-600 font-medium">
              No topics found. Try a different search or go back to refine your
              description.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {topics.map((topic) => (
              <TopicCard
                key={topic.id}
                icon={topic.icon}
                title={topic.title}
                description={topic.description}
                selected={selected.includes(topic.id)}
                onToggle={() => toggleTopic(topic.id)}
              />
            ))}
          </div>
        )}
      </main>

      {!loading && topics.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-purple-light neo-border border-b-0 border-l-0 border-r-0 p-4">
          <div className="max-w-5xl mx-auto">
            <Button
              onClick={handleGenerate}
              disabled={selected.length === 0}
              size="lg"
              className="w-full"
            >
              Generate Posts
              {selected.length > 0 ? ` (${selected.length} selected)` : ""}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TopicsPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <TopicsContent />
    </Suspense>
  );
}
