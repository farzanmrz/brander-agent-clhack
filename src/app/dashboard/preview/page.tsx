"use client";

import Header from "@/components/Header";
import LoadingState from "@/components/LoadingState";
import Button from "@/components/ui/Button";
import { Check, Sparkles } from "lucide-react";
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

  // Edit/feedback state
  const [editing, setEditing] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [rewriting, setRewriting] = useState(false);
  const [newRule, setNewRule] = useState<string | null>(null);

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

  const formatTweet = (text: string) =>
    text
      .replace(
        /(https?:\/\/[^\s]+)/g,
        '<a href="#" class="text-black underline decoration-2 underline-offset-2 font-bold">$1</a>'
      )
      .replace(/\n/g, "<br />");

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

  const handleRewrite = async () => {
    if (!feedback.trim()) return;
    setRewriting(true);
    setError(null);
    setNewRule(null);
    try {
      const res = await fetch("/api/sphere/rewrite-tweet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          original_tweet: post.text,
          feedback: feedback.trim(),
          tone: post.angle,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail || `Rewrite failed: ${res.status}`);
      }
      const data = await res.json();
      const updated: PreviewPost = {
        text: data.rewritten_tweet,
        angle: post.angle,
        chars: data.rewritten_tweet.length,
      };
      setPost(updated);
      sessionStorage.setItem("brander_preview", JSON.stringify(updated));
      setNewRule(data.new_rule);
      setEditing(false);
      setFeedback("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Rewrite failed");
    } finally {
      setRewriting(false);
    }
  };

  if (posted) {
    return (
      <div className="min-h-screen bg-cream">
        <Header />
        <main className="max-w-2xl mx-auto px-6 pt-28 pb-12 flex flex-col items-center justify-center min-h-[80vh]">
          <div className="w-20 h-20 rounded-lg bg-lime neo-border neo-shadow flex items-center justify-center mb-6">
            <Check className="w-10 h-10 text-black" strokeWidth={3} />
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
            dangerouslySetInnerHTML={{ __html: formatTweet(post.text) }}
          />
        </div>

        <div className="flex items-center gap-3 mt-3">
          <span className="text-sm font-bold text-gray-600 bg-gray-100 neo-border rounded px-2 py-0.5">
            {post.chars} chars
          </span>
        </div>

        {/* New rule banner */}
        {newRule && (
          <div className="mt-4 bg-sky neo-border neo-shadow-sm rounded-lg p-4 flex items-start gap-3">
            <Sparkles
              className="w-5 h-5 text-black shrink-0 mt-0.5"
              strokeWidth={2.5}
            />
            <div>
              <p className="text-sm font-bold text-black mb-1">
                Brand guideline updated
              </p>
              <p className="text-sm text-black">
                New rule: &ldquo;{newRule}&rdquo;
              </p>
            </div>
          </div>
        )}

        {/* Edit feedback form */}
        {editing && (
          <div className="mt-6 bg-white neo-border neo-shadow p-5 rounded-lg">
            <p className="text-sm font-bold text-black mb-3">
              What&apos;s wrong with this tweet?
            </p>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="e.g., too formal, no hashtags, make it spicier..."
              className="w-full neo-border neo-shadow-sm rounded-lg p-3 text-sm mb-3 h-24 resize-none outline-none focus:shadow-[3px_3px_0px_var(--color-lime)] transition-all duration-100 bg-white"
            />
            <div className="flex gap-3">
              <Button
                onClick={handleRewrite}
                disabled={!feedback.trim() || rewriting}
                size="sm"
              >
                {rewriting ? "Rewriting..." : "Rewrite Tweet"}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setEditing(false);
                  setFeedback("");
                }}
                disabled={rewriting}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {error && (
          <div className="rounded-lg neo-border bg-pink p-4 text-black mt-4">
            <p className="text-sm font-bold">{error}</p>
          </div>
        )}

        <div className="flex gap-4 mt-8">
          <Button
            onClick={handlePost}
            disabled={posting || editing}
            className="flex-1"
          >
            {posting ? "Posting..." : "Post Now"}
          </Button>
          {!editing && (
            <Button
              variant="secondary"
              onClick={() => setEditing(true)}
              disabled={posting}
            >
              Edit
            </Button>
          )}
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
