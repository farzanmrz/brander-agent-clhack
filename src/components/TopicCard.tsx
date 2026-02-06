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
        "relative text-left neo-border p-6 rounded-lg transition-all duration-100 cursor-pointer w-full neo-press",
        selected
          ? "bg-lime shadow-[4px_4px_0px_var(--color-black)]"
          : "bg-white neo-shadow hover:translate-y-[-2px] hover:shadow-[4px_6px_0px_var(--color-black)]"
      )}
    >
      <div
        className={cn(
          "absolute top-4 right-4 w-7 h-7 rounded-md neo-border flex items-center justify-center transition-all duration-100",
          selected ? "bg-black" : "bg-white"
        )}
      >
        {selected && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
      </div>
      <span className="text-2xl mb-3 block">{icon}</span>
      <h3 className="text-lg font-bold text-black mb-2">{title}</h3>
      <p className="text-sm text-gray-600 font-medium">{description}</p>
    </button>
  );
}
