"use client";

import Header from "@/components/Header";
import LoadingState from "@/components/LoadingState";
import PostCard from "@/components/PostCard";
import Button from "@/components/ui/Button";
import { ArrowLeft, Check, Zap } from "lucide-react";
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
  const [yoloPosting, setYoloPosting] = useState(false);
  const [yoloResult, setYoloResult] = useState<{
    tweetUrl?: string;
    error?: string;
  } | null>(null);

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

        // Step 2: Generate 3 styled tweets (Technical, Contrarian, Funny)
        setLoadingMessage("Crafting 3 unique angles...");
        const queriesWithContent = searchData.queries.map(
          (q: { query: string; content: string }) => ({
            query: q.query,
            content: q.content,
          })
        );

        const tweetRes = await fetch("/api/sphere/generate-styled-tweets", {
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

        // Map styled tweets to PostCard format
        const generated: GeneratedPost[] = tweetData.tweets.map(
          (t: { tone: string; tweet: string }, i: number) => ({
            id: i + 1,
            angle: t.tone,
            text: t.tweet,
            chars: t.tweet.length,
          })
        );
        setPosts(generated);

        // YOLO mode: auto-post the first tweet
        if (
          sessionStorage.getItem("chirp_yolo") === "true" &&
          generated.length > 0
        ) {
          setYoloPosting(true);
          setLoadingMessage("YOLO mode — posting to X...");
          try {
            const res = await fetch("/api/tweet", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ text: generated[0].text }),
            });
            if (!res.ok) {
              const data = await res.json().catch(() => ({}));
              throw new Error(data.detail || `Post failed: ${res.status}`);
            }
            const data = await res.json();
            const tweetId = data?.result?.data?.data?.id;
            setYoloResult({
              tweetUrl: tweetId
                ? `https://x.com/i/status/${tweetId}`
                : undefined,
            });
          } catch (err) {
            setYoloResult({
              error: err instanceof Error ? err.message : "Post failed",
            });
          } finally {
            setYoloPosting(false);
          }
        }
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
    <div className="min-h-screen bg-cream">
      <Header />
      <main className="max-w-6xl mx-auto px-6 pt-28 pb-12">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 text-black font-bold mb-6 transition-all duration-100 cursor-pointer hover:underline decoration-2 underline-offset-4"
        >
          <ArrowLeft className="w-5 h-5" strokeWidth={3} />
          <span className="text-sm">Back</span>
        </button>

        <h1 className="text-3xl font-bold text-black mb-2">
          Pick your favorite angle
        </h1>
        <p className="text-gray-600 font-medium mb-8">
          3 takes on the same topic — choose the voice that fits
        </p>

        {/* YOLO result banner */}
        {yoloResult && !yoloResult.error && (
          <div className="mb-6 bg-lime neo-border neo-shadow rounded-lg p-5 flex items-center gap-4">
            <div className="bg-white neo-border rounded-lg p-2">
              <Check className="w-5 h-5 text-black" strokeWidth={3} />
            </div>
            <div className="flex-1">
              <p className="font-bold text-black text-sm">
                YOLO mode did its thing — posted to X
              </p>
              <p className="text-xs text-gray-700 mt-0.5">
                First tweet was fired off. No regrets (hopefully).
              </p>
            </div>
            {yoloResult.tweetUrl && (
              <a
                href={yoloResult.tweetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black neo-border text-white px-4 py-2 rounded-lg font-bold text-xs neo-press-sm transition-all duration-100 flex items-center gap-1.5"
              >
                View on X
              </a>
            )}
          </div>
        )}
        {yoloResult?.error && (
          <div className="mb-6 bg-pink neo-border neo-shadow rounded-lg p-5 flex items-center gap-4">
            <div className="bg-white neo-border rounded-lg p-2">
              <Zap className="w-5 h-5 text-black" strokeWidth={3} />
            </div>
            <div>
              <p className="font-bold text-black text-sm">YOLO mode failed</p>
              <p className="text-xs text-gray-700 mt-0.5">{yoloResult.error}</p>
            </div>
          </div>
        )}

        {loading || yoloPosting ? (
          <LoadingState message={loadingMessage} />
        ) : error ? (
          <div className="rounded-lg neo-border bg-pink p-6 text-black">
            <p className="font-bold mb-2">Could not generate posts</p>
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
