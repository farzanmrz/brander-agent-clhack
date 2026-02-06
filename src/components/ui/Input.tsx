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
          "w-full border-2 border-gray-200 focus:border-green-500 outline-none px-4 py-3 rounded-xl text-base placeholder:text-gray-400 transition-all duration-150",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
