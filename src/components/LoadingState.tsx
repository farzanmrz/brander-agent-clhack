"use client";

import { Bird } from "lucide-react";
import { useEffect, useState } from "react";

interface LoadingStateProps {
  messages?: string[];
}

const defaultMessages = ["Searching the web...", "Finding relevant articles...", "Almost there..."];

export default function LoadingState({ messages = defaultMessages }: LoadingStateProps) {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    if (messages.length <= 1) return;
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 1200);
    return () => clearInterval(interval);
  }, [messages]);

  return (
    <div className="flex flex-col items-center justify-center py-24 animate-fade-in">
      <div className="relative mb-6">
        <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center">
          <Bird className="w-7 h-7 text-green-600 animate-pulse" />
        </div>
        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-ping opacity-75" />
      </div>
      <p className="text-sm font-medium text-gray-900 mb-1">{messages[messageIndex]}</p>
      <p className="text-xs text-gray-400">This usually takes a few seconds</p>
    </div>
  );
}
