"use client";

import Header from "@/components/Header";
import LoadingState from "@/components/LoadingState";
import TopicCard from "@/components/TopicCard";
import Button from "@/components/ui/Button";
import { mockTopics } from "@/lib/mockData";
import { ArrowLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function TopicsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [selected, setSelected] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const toggleTopic = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleGenerate = () => {
    const topicIds = selected.join(",");
    router.push(`/dashboard/posts?topics=${topicIds}`);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-5xl mx-auto px-6 pt-28 pb-32">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 text-gray-600 hover:text-gray-900 mb-6 transition-all duration-150 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back</span>
        </button>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Pick the angles you want to explore
        </h1>
        <p className="text-gray-600 mb-8">
          Results for &ldquo;{query}&rdquo;
        </p>

        {loading ? (
          <LoadingState message="Finding articles..." />
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {mockTopics.map((topic) => (
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

      {!loading && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 p-4">
          <div className="max-w-5xl mx-auto">
            <Button
              onClick={handleGenerate}
              disabled={selected.length === 0}
              size="lg"
              className="w-full"
            >
              Generate Posts{selected.length > 0 ? ` (${selected.length} selected)` : ""}
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
