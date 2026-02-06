"use client";

import { Loader2 } from "lucide-react";

interface LoadingStateProps {
  message?: string;
}

export default function LoadingState({ message = "Finding articles..." }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24">
      <Loader2 className="w-8 h-8 text-green-600 animate-spin mb-4" />
      <p className="text-base text-gray-600">{message}</p>
    </div>
  );
}
