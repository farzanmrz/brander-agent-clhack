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
          "bg-white border-2 border-gray-200 p-6 rounded-2xl transition-all duration-150",
          clickable && "cursor-pointer hover:border-gray-300 hover:-translate-y-px",
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
