"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface ProfilePost {
  id: number;
  type: string;
  author?: string;
  handle?: string;
  content: string;
  timestamp?: string;
  original_author?: string;
  original_handle?: string;
}

interface ProfileData {
  profile: {
    name: string;
    handle: string;
    bio: string;
    tagline: string;
    stats: { following: number; followers: number };
  };
  posts: ProfilePost[];
}

export default function TweetCarousel() {
  const [data, setData] = useState<ProfileData | null>(null);

  useEffect(() => {
    fetch("/api/profile")
      .then((r) => r.json())
      .then((d) => setData(d))
      .catch(() => {});
  }, []);

  if (!data) return null;

  const { profile, posts } = data;
  // Double the posts array for seamless infinite scroll
  const scrollPosts = [...posts, ...posts];

  return (
    <div className="mt-16">
      <p className="text-sm font-bold text-black mb-1 uppercase tracking-wide">
        Your Brand Voice
      </p>
      <p className="text-sm text-gray-600 font-medium mb-4">
        {profile.name} · {profile.handle} · {profile.stats.followers} followers
      </p>

      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-cream to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-cream to-transparent z-10 pointer-events-none" />

        <div className="flex gap-4 animate-scroll">
          {scrollPosts.map((post, i) => (
            <div
              key={`${post.id}-${i}`}
              className={cn(
                "flex-shrink-0 w-72 neo-border neo-shadow-sm rounded-lg p-4 bg-white"
              )}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-md bg-purple neo-border flex items-center justify-center text-white font-bold text-xs">
                  {(post.author ||
                    post.original_author ||
                    "?")[0].toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-bold text-black leading-tight">
                    {post.author || post.original_author}
                  </p>
                  <p className="text-xs text-gray-500">
                    {post.handle || post.original_handle} · {post.timestamp}
                  </p>
                </div>
                {post.type === "repost" && (
                  <span className="ml-auto text-xs font-bold bg-purple-light neo-border rounded px-1.5 py-0.5">
                    RT
                  </span>
                )}
              </div>
              <p className="text-sm text-black leading-relaxed line-clamp-4">
                {post.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
