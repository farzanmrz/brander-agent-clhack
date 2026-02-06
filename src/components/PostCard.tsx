"use client";

import { cn } from "@/lib/utils";

interface PostCardProps {
  angle: string;
  text: string;
  chars: number;
  selected: boolean;
  onSelect: () => void;
}

export default function PostCard({
  angle,
  text,
  chars,
  selected,
  onSelect,
}: PostCardProps) {
  const formattedText = text.replace(
    /(https?:\/\/[^\s]+)/g,
    '<span class="text-green-600 underline">$1</span>'
  );

  return (
    <div
      className={cn(
        "border-2 p-6 rounded-2xl transition-all duration-150 flex flex-col",
        selected
          ? "border-green-600 bg-green-50"
          : "border-gray-200 bg-white"
      )}
    >
      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
        {angle}
      </span>
      <p
        className="text-base leading-relaxed text-gray-900 mb-4 flex-1"
        dangerouslySetInnerHTML={{ __html: formattedText }}
      />
      <div className="flex items-center justify-between mt-auto">
        <span className="text-xs text-gray-500">{chars} characters</span>
        <button
          onClick={onSelect}
          className={cn(
            "px-4 py-2 text-sm font-semibold rounded-xl border-2 transition-all duration-150 cursor-pointer",
            selected
              ? "border-green-600 bg-green-600 text-white"
              : "border-green-600 text-green-700 hover:bg-green-600 hover:text-white"
          )}
        >
          {selected ? "Selected" : "Select"}
        </button>
      </div>
    </div>
  );
}
