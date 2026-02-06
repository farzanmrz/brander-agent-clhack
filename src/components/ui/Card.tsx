"use client";

import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  clickable?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, clickable, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-white neo-border neo-shadow p-6 rounded-lg transition-all duration-100",
          clickable &&
            "cursor-pointer hover:translate-y-[-2px] hover:shadow-[4px_6px_0px_var(--color-black)] neo-press",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export default Card;
