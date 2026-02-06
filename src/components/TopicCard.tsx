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
        "relative text-left border-2 p-6 rounded-2xl transition-all duration-150 cursor-pointer w-full",
        selected
          ? "border-green-500 bg-green-50"
          : "border-gray-200 bg-white hover:border-gray-300"
      )}
    >
      <div
        className={cn(
          "absolute top-4 right-4 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all duration-150",
          selected
            ? "border-green-500 bg-green-500"
            : "border-gray-300 bg-white"
        )}
      >
        {selected && <Check className="w-4 h-4 text-white" />}
      </div>
      <span className="text-2xl mb-3 block">{icon}</span>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </button>
  );
}
