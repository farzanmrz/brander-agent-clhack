"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-gray-900 hover:bg-gray-800 text-white",
  secondary: "border border-gray-300 hover:bg-gray-50 bg-white text-gray-900",
  ghost: "hover:bg-gray-100 text-gray-700",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "font-bold rounded-full transition-all duration-150 cursor-pointer",
          variantStyles[variant],
          sizeStyles[size],
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
