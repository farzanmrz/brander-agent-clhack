"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface TopicCardProps {
  icon: string;
  title: string;
  description: string;
  selected: boolean;
  onToggle: () => void;
}

export default function TopicCard({
  icon,
  title,
  description,
  selected,
  onToggle,
}: TopicCardProps) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        "relative text-left border p-4 rounded-2xl transition-all duration-150 cursor-pointer w-full group",
        selected
          ? "border-green-500 bg-green-50/60"
          : "border-gray-200 bg-white hover:bg-gray-50"
      )}
    >
      <div
        className={cn(
          "absolute top-3.5 right-3.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-150",
          selected
            ? "border-green-600 bg-green-600"
            : "border-gray-300 bg-white group-hover:border-gray-400"
        )}
      >
        {selected && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
      </div>
      <span className="text-xl mb-2 block">{icon}</span>
      <h3 className="text-sm font-bold text-gray-900 mb-0.5 pr-8">{title}</h3>
      <p className="text-xs text-gray-500 leading-relaxed">{description}</p>
    </button>
  );
}
