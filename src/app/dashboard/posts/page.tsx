"use client";

import Header from "@/components/Header";
import LoadingState from "@/components/LoadingState";
import PostCard from "@/components/PostCard";
import StepIndicator from "@/components/StepIndicator";
import { mockPosts } from "@/lib/mockData";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function PostsContent() {
  const router = useRouter();
  const [selectedPost, setSelectedPost] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleSelect = (id: number) => {
    setSelectedPost(id);
    setTimeout(() => {
      router.push(`/dashboard/preview?postId=${id}`);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-4xl mx-auto px-4 pt-20 pb-12">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 text-gray-500 hover:text-gray-900 mb-4 transition-colors duration-150 cursor-pointer text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <StepIndicator currentStep={3} />

        <h1 className="text-xl font-bold text-gray-900 mb-0.5">
          Pick your favorite
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          3 variations &middot; Tap to select and continue
        </p>

        {loading ? (
          <LoadingState messages={["Researching articles...", "Crafting posts...", "Polishing drafts..."]} />
        ) : (
          <div className="grid md:grid-cols-3 gap-3 animate-fade-in">
            {mockPosts.map((post, i) => (
              <div key={post.id} className={`animate-fade-in stagger-${i + 1}`}>
                <PostCard
                  angle={post.angle}
                  text={post.text}
                  chars={post.chars}
                  selected={selectedPost === post.id}
                  onSelect={() => handleSelect(post.id)}
                />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default function PostsPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <PostsContent />
    </Suspense>
  );
}
