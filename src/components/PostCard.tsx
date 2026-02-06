"use client";

import { cn } from "@/lib/utils";

interface PostCardProps {
  angle: string;
  text: string;
  chars: number;
  selected: boolean;
  onSelect: () => void;
}

const toneBadgeColor: Record<string, string> = {
  "Technical Take": "bg-sky",
  Contrarian: "bg-pink",
  Funny: "bg-peach",
};

const toneEmoji: Record<string, string> = {
  "Technical Take": "🔬",
  Contrarian: "🔥",
  Funny: "😂",
};

export default function PostCard({
  angle,
  text,
  chars,
  selected,
  onSelect,
}: PostCardProps) {
  const formattedText = text.replace(
    /(https?:\/\/[^\s]+)/g,
    '<span class="text-black underline decoration-2 underline-offset-2">$1</span>'
  );

  const badgeColor = toneBadgeColor[angle] || "bg-lavender";
  const emoji = toneEmoji[angle] || "✍️";

  return (
    <div
      className={cn(
        "neo-border p-6 rounded-lg transition-all duration-100 flex flex-col",
        selected
          ? "bg-lime shadow-[4px_4px_0px_var(--color-black)]"
          : "bg-white neo-shadow"
      )}
    >
      <span
        className={cn(
          "inline-block neo-border rounded-md px-3 py-1.5 text-xs font-bold text-black uppercase tracking-wide mb-3 self-start",
          badgeColor
        )}
      >
        {emoji} {angle}
      </span>
      <p
        className="text-base leading-relaxed text-black mb-4 flex-1"
        dangerouslySetInnerHTML={{ __html: formattedText }}
      />
      <div className="flex items-center justify-between mt-auto">
        <span className="text-xs font-semibold text-gray-600 bg-gray-100 neo-border rounded px-2 py-0.5">
          {chars} chars
        </span>
        <button
          onClick={onSelect}
          className={cn(
            "px-4 py-2 text-sm font-bold rounded-lg neo-border transition-all duration-100 cursor-pointer neo-press-sm",
            selected
              ? "bg-black text-white shadow-none"
              : "bg-white text-black neo-shadow-sm hover:bg-lime"
          )}
        >
          {selected ? "Selected" : "Select"}
        </button>
      </div>
    </div>
  );
}
