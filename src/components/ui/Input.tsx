"use client";

import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "w-full neo-border neo-shadow-sm bg-white px-4 py-3 rounded-lg text-base placeholder:text-gray-400 outline-none focus:shadow-[4px_4px_0px_var(--color-lime)] focus:border-black transition-all duration-100",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
