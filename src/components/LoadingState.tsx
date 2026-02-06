"use client";

import { Loader2 } from "lucide-react";

interface LoadingStateProps {
  message?: string;
}

export default function LoadingState({
  message = "Finding articles...",
}: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24">
      <div className="bg-purple-light neo-border rounded-lg p-4 mb-6 animate-pulse">
        <Loader2 className="w-8 h-8 text-purple animate-spin" />
      </div>
      <p className="text-lg font-bold text-black">{message}</p>
    </div>
  );
}
