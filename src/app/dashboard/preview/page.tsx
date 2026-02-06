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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("brander_preview");
    if (raw) {
      setPost(JSON.parse(raw) as PreviewPost);
    }
  }, []);

  if (!post) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="max-w-2xl mx-auto px-6 pt-28 pb-12">
          <p className="text-gray-600">
            No post selected. Go back and pick one.
          </p>
          <Button onClick={() => router.push("/dashboard")} className="mt-4">
            Back to Dashboard
          </Button>
        </main>
      </div>
    );
  }

  const formattedText = post.text.replace(
    /(https?:\/\/[^\s]+)/g,
    '<a href="#" class="text-green-600 underline">$1</a>'
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
      setPosted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to post");
    } finally {
      setPosting(false);
    }
  };

  if (posted) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="max-w-2xl mx-auto px-6 pt-28 pb-12 flex flex-col items-center justify-center min-h-[80vh]">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-6">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Posted to X!
          </h1>
          <p className="text-gray-600 mb-8">Ready for your next post?</p>
          <Button onClick={() => router.push("/dashboard")}>
            Create Another Post
          </Button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-2xl mx-auto px-6 pt-28 pb-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Your post</h1>

        <div className="bg-gray-50 p-6 rounded-xl border-2 border-gray-200">
          <p
            className="text-base leading-relaxed text-gray-900"
            dangerouslySetInnerHTML={{ __html: formattedText }}
          />
        </div>

        <p className="text-sm text-gray-500 mt-2">{post.chars} characters</p>

        {error && (
          <div className="rounded-lg border-2 border-red-200 bg-red-50 p-4 text-red-700 mt-4">
            <p className="text-sm">{error}</p>
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
