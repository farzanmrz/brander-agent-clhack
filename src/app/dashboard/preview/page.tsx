"use client";

import Header from "@/components/Header";
import LoadingState from "@/components/LoadingState";
import Button from "@/components/ui/Button";
import { mockPosts } from "@/lib/mockData";
import { Check } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

function PreviewContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = Number(searchParams.get("postId")) || 1;
  const post = mockPosts.find((p) => p.id === postId) || mockPosts[0];
  const [posted, setPosted] = useState(false);

  const formattedText = post.text.replace(
    /(https?:\/\/[^\s]+)/g,
    '<a href="#" class="text-green-600 underline">$1</a>'
  );

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

        <p className="text-sm text-gray-500 mt-2">
          {post.chars} characters
        </p>

        <div className="flex gap-4 mt-8">
          <Button onClick={() => setPosted(true)} className="flex-1">
            Post Now
          </Button>
          <Button
            variant="secondary"
            onClick={() => router.back()}
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
