"use client";

import Header from "@/components/Header";
import LoadingState from "@/components/LoadingState";
import StepIndicator from "@/components/StepIndicator";
import Button from "@/components/ui/Button";
import { mockPosts } from "@/lib/mockData";
import { ArrowLeft, Check, ExternalLink } from "lucide-react";
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
    '<span class="text-green-600">$1</span>'
  );

  if (posted) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="max-w-md mx-auto px-4 pt-20 pb-12 flex flex-col items-center justify-center min-h-[80vh]">
          <div className="animate-scale-in mb-4">
            <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
              <Check className="w-7 h-7 text-green-600" />
            </div>
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-1 animate-fade-in">
            Posted!
          </h1>
          <p className="text-sm text-gray-500 mb-1 animate-fade-in">
            Your post is now live on X.
          </p>
          <a
            href="#"
            className="text-sm text-green-600 hover:underline flex items-center gap-1 mb-8 animate-fade-in"
          >
            View post
            <ExternalLink className="w-3 h-3" />
          </a>
          <Button
            onClick={() => router.push("/dashboard")}
            className="bg-green-600 hover:bg-green-700 animate-fade-in"
          >
            Back to Home
          </Button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-lg mx-auto px-4 pt-20 pb-12">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 text-gray-500 hover:text-gray-900 mb-4 transition-colors duration-150 cursor-pointer text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <StepIndicator currentStep={4} />

        <h1 className="text-xl font-bold text-gray-900 mb-0.5">
          Review &amp; post
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Here&apos;s how it&apos;ll look on X
        </p>

        {/* X-style post preview */}
        <div className="border border-gray-200 rounded-2xl p-4 animate-fade-in">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-sm shrink-0">
              U
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm text-gray-900">User</span>
                <span className="text-sm text-gray-500">@yourhandle</span>
              </div>
              <p
                className="text-[15px] leading-relaxed text-gray-900 mt-1"
                dangerouslySetInnerHTML={{ __html: formattedText }}
              />
            </div>
          </div>
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 px-1">
            <span className="text-xs text-gray-400">{post.chars}/280</span>
            <div className="w-16 h-1 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 rounded-full"
                style={{ width: `${Math.min((post.chars / 280) * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <Button
            onClick={() => setPosted(true)}
            size="lg"
            className="flex-1 bg-green-600 hover:bg-green-700"
          >
            Post Now
          </Button>
          <Button variant="secondary" onClick={() => router.back()} size="lg">
            Go Back
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
