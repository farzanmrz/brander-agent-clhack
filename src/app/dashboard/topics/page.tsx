"use client";

import Header from "@/components/Header";
import LoadingState from "@/components/LoadingState";
import StepIndicator from "@/components/StepIndicator";
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
      <main className="max-w-2xl mx-auto px-4 pt-20 pb-28">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 text-gray-500 hover:text-gray-900 mb-4 transition-colors duration-150 cursor-pointer text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <StepIndicator currentStep={2} />

        <h1 className="text-xl font-bold text-gray-900 mb-0.5">
          Pick your angles
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Results for &ldquo;{query}&rdquo;
        </p>

        {loading ? (
          <LoadingState messages={["Searching the web...", "Finding angles...", "Almost there..."]} />
        ) : (
          <div className="grid grid-cols-2 gap-3 animate-fade-in">
            {mockTopics.map((topic, i) => (
              <div key={topic.id} className={`animate-fade-in stagger-${i + 1}`}>
                <TopicCard
                  icon={topic.icon}
                  title={topic.title}
                  description={topic.description}
                  selected={selected.includes(topic.id)}
                  onToggle={() => toggleTopic(topic.id)}
                />
              </div>
            ))}
          </div>
        )}
      </main>

      {!loading && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-gray-200 p-3">
          <div className="max-w-2xl mx-auto">
            <Button
              onClick={handleGenerate}
              disabled={selected.length === 0}
              size="lg"
              className="w-full bg-green-600 hover:bg-green-700"
            >
              {selected.length === 0
                ? "Select topics to continue"
                : `Generate Posts (${selected.length})`}
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
