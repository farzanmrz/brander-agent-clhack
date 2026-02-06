"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

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
    '<span class="text-green-600">$1</span>'
  );

  return (
    <div
      onClick={onSelect}
      className={cn(
        "border rounded-2xl transition-all duration-150 cursor-pointer group",
        selected
          ? "border-green-500 bg-green-50/60"
          : "border-gray-200 bg-white hover:bg-gray-50"
      )}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">
            {angle}
          </span>
          {selected && (
            <div className="w-5 h-5 rounded-full bg-green-600 flex items-center justify-center animate-scale-in">
              <Check className="w-3 h-3 text-white" strokeWidth={3} />
            </div>
          )}
        </div>
        <p
          className="text-[15px] leading-relaxed text-gray-900 mb-3"
          dangerouslySetInnerHTML={{ __html: formattedText }}
        />
        <div className="flex items-center justify-between pt-2.5 border-t border-gray-100">
          <span className="text-xs text-gray-400">{chars}/280</span>
          <div className="w-16 h-1 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full",
                chars > 260 ? "bg-amber-400" : "bg-green-500"
              )}
              style={{ width: `${Math.min((chars / 280) * 100, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
