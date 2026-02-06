"use client";

import Header from "@/components/Header";
import LoadingState from "@/components/LoadingState";
import PostCard from "@/components/PostCard";
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

  const handleContinue = () => {
    if (selectedPost === null) return;
    router.push(`/dashboard/preview?postId=${selectedPost}`);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-6xl mx-auto px-6 pt-28 pb-12">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 text-gray-600 hover:text-gray-900 mb-6 transition-all duration-150 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back</span>
        </button>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Choose your favorite angle
        </h1>

        {loading ? (
          <LoadingState message="Crafting posts..." />
        ) : (
          <>
            <div className="grid md:grid-cols-3 gap-6">
              {mockPosts.map((post) => (
                <PostCard
                  key={post.id}
                  angle={post.angle}
                  text={post.text}
                  chars={post.chars}
                  selected={selectedPost === post.id}
                  onSelect={() => {
                    setSelectedPost(post.id);
                    handleContinue();
                  }}
                />
              ))}
            </div>
          </>
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
