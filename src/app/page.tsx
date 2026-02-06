"use client";

import GoogleSignIn from "@/components/GoogleSignIn";
import { Bird } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-md animate-fade-in-up">
          <Bird className="w-10 h-10 text-green-600 mx-auto mb-8" />

          <h1 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">
            See what&apos;s happening, post what matters.
          </h1>
          <p className="text-base text-gray-500 mb-10 leading-relaxed">
            Chirp finds trending stories and crafts posts for your X account. You pick the angle.
          </p>

          <GoogleSignIn />

          <p className="text-xs text-gray-400 mt-6">
            By signing in, you agree to the Terms of Service and Privacy Policy.
          </p>
        </div>
      </main>
    </div>
  );
}
