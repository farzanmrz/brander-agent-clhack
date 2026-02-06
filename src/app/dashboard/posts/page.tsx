"use client";

import Header from "@/components/Header";
import LoadingState from "@/components/LoadingState";
import PostCard from "@/components/PostCard";
import Button from "@/components/ui/Button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

interface GeneratedPost {
  id: number;
  angle: string;
  text: string;
  chars: number;
}

function PostsContent() {
  const router = useRouter();
  const [selectedPost, setSelectedPost] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("Searching the web...");
  const [posts, setPosts] = useState<GeneratedPost[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("brander_generate");
    if (!raw) {
      setError("No topics selected. Go back and pick some angles first.");
      setLoading(false);
      return;
    }

    const { sphereDescription, selectedQueries } = JSON.parse(raw) as {
      sphereDescription: string;
      selectedQueries: string[];
    };

    async function generate() {
      try {
        // Step 1: Fetch web content for each selected query
        setLoadingMessage("Searching the web for articles...");
        const searchRes = await fetch("/api/search/contents", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            queries: selectedQueries,
            count: 5,
            freshness: "week",
          }),
        });
        if (!searchRes.ok) {
          const data = await searchRes.json().catch(() => ({}));
          throw new Error(data.detail || `Search failed: ${searchRes.status}`);
        }
        const searchData = await searchRes.json();

        // Step 2: Generate tweets from article content
        setLoadingMessage("Crafting posts from articles...");
        const queriesWithContent = searchData.queries.map(
          (q: { query: string; content: string }) => ({
            query: q.query,
            content: q.content,
          })
        );

        const tweetRes = await fetch("/api/sphere/generate-tweets", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sphere_description: sphereDescription,
            queries: queriesWithContent,
          }),
        });
        if (!tweetRes.ok) {
          const data = await tweetRes.json().catch(() => ({}));
          throw new Error(
            data.detail || `Tweet generation failed: ${tweetRes.status}`
          );
        }
        const tweetData = await tweetRes.json();

        // Map API response to PostCard format
        const generated: GeneratedPost[] = tweetData.tweets.map(
          (t: { query: string; tweet: string }, i: number) => ({
            id: i + 1,
            angle: t.query,
            text: t.tweet,
            chars: t.tweet.length,
          })
        );
        setPosts(generated);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    generate();
  }, []);

  const handleSelect = (post: GeneratedPost) => {
    setSelectedPost(post.id);
    sessionStorage.setItem(
      "brander_preview",
      JSON.stringify({ text: post.text, angle: post.angle, chars: post.chars })
    );
    router.push("/dashboard/preview");
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
          <LoadingState message={loadingMessage} />
        ) : error ? (
          <div className="rounded-lg border-2 border-red-200 bg-red-50 p-6 text-red-700">
            <p className="font-semibold mb-2">Could not generate posts</p>
            <p className="text-sm mb-4">{error}</p>
            <Button onClick={() => router.back()} size="sm">
              Go Back
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                angle={post.angle}
                text={post.text}
                chars={post.chars}
                selected={selectedPost === post.id}
                onSelect={() => handleSelect(post)}
              />
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
