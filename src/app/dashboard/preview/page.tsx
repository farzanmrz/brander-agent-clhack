"use client";

import Header from "@/components/Header";
import LoadingState from "@/components/LoadingState";
import Button from "@/components/ui/Button";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

interface PreviewPost {
  text: string;
  angle: string;
  chars: number;
}

function PreviewContent() {
  const router = useRouter();
  const [post, setPost] = useState<PreviewPost | null>(null);
  const [posting, setPosting] = useState(false);
  const [posted, setPosted] = useState(false);
  const [tweetUrl, setTweetUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("brander_preview");
    if (raw) {
      setPost(JSON.parse(raw) as PreviewPost);
    }
  }, []);

  if (!post) {
    return (
      <div className="min-h-screen bg-cream">
        <Header />
        <main className="max-w-2xl mx-auto px-6 pt-28 pb-12">
          <div className="bg-white neo-border neo-shadow p-6 rounded-lg">
            <p className="text-black font-medium">
              No post selected. Go back and pick one.
            </p>
          </div>
          <Button onClick={() => router.push("/dashboard")} className="mt-4">
            Back to Dashboard
          </Button>
        </main>
      </div>
    );
  }

  const formattedText = post.text.replace(
    /(https?:\/\/[^\s]+)/g,
    '<a href="#" class="text-black underline decoration-2 underline-offset-2 font-bold">$1</a>'
  );

  const handlePost = async () => {
    setPosting(true);
    setError(null);
    try {
      const res = await fetch("/api/tweet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: post.text }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail || `Post failed: ${res.status}`);
      }
      const data = await res.json();
      const tweetId = data?.result?.data?.data?.id;
      if (tweetId) {
        setTweetUrl(`https://x.com/i/status/${tweetId}`);
      }
      setPosted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to post");
    } finally {
      setPosting(false);
    }
  };

  if (posted) {
    return (
      <div className="min-h-screen bg-cream">
        <Header />
        <main className="max-w-2xl mx-auto px-6 pt-28 pb-12 flex flex-col items-center justify-center min-h-[80vh]">
          <div className="w-20 h-20 rounded-lg bg-purple-light neo-border neo-shadow flex items-center justify-center mb-6">
            <Check className="w-10 h-10 text-purple" strokeWidth={3} />
          </div>
          <h1 className="text-3xl font-bold text-black mb-2">Posted to X!</h1>
          <p className="text-gray-600 font-medium mb-8">
            Ready for your next post?
          </p>
          <div className="flex gap-4">
            {tweetUrl && (
              <a
                href={tweetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black neo-border neo-shadow text-white px-5 py-3 rounded-lg font-bold transition-all duration-100 neo-press flex items-center gap-2"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                View on X
              </a>
            )}
            <Button
              onClick={() => router.push("/dashboard")}
              variant={tweetUrl ? "secondary" : "primary"}
            >
              Create Another Post
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <main className="max-w-2xl mx-auto px-6 pt-28 pb-12">
        <h1 className="text-2xl font-bold text-black mb-6">Your post</h1>

        <div className="bg-white neo-border neo-shadow p-6 rounded-lg">
          <p
            className="text-base leading-relaxed text-black"
            dangerouslySetInnerHTML={{ __html: formattedText }}
          />
        </div>

        <div className="flex items-center gap-3 mt-3">
          <span className="text-sm font-bold text-gray-600 bg-gray-100 neo-border rounded px-2 py-0.5">
            {post.chars} chars
          </span>
        </div>

        {error && (
          <div className="rounded-lg neo-border bg-purple-light p-4 text-black mt-4">
            <p className="text-sm font-bold">{error}</p>
          </div>
        )}

        <div className="flex gap-4 mt-8">
          <Button onClick={handlePost} disabled={posting} className="flex-1">
            {posting ? "Posting..." : "Post Now"}
          </Button>
          <Button
            variant="secondary"
            onClick={() => router.back()}
            disabled={posting}
          >
            Edit
          </Button>
        </div>
      </main>
    </div>
  );
}

export default function PreviewPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <PreviewContent />
    </Suspense>
  );
}
