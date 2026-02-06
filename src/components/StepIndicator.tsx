"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface StepIndicatorProps {
  currentStep: number;
}

const steps = ["Topic", "Angles", "Posts", "Post"];

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center gap-1.5 mb-6">
      {steps.map((label, i) => {
        const step = i + 1;
        const isComplete = step < currentStep;
        const isCurrent = step === currentStep;

        return (
          <div key={label} className="flex items-center gap-1.5">
            <div
              className={cn(
                "w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-150",
                isComplete && "bg-green-600 text-white",
                isCurrent && "bg-gray-900 text-white",
                !isComplete && !isCurrent && "bg-gray-200 text-gray-400"
              )}
            >
              {isComplete ? <Check className="w-3 h-3" /> : step}
            </div>
            <span
              className={cn(
                "text-xs hidden sm:block",
                isCurrent ? "font-bold text-gray-900" : "text-gray-400"
              )}
            >
              {label}
            </span>
            {i < steps.length - 1 && (
              <div
                className={cn(
                  "w-6 h-px mx-0.5",
                  isComplete ? "bg-green-500" : "bg-gray-200"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
