"use client";

import GoogleSignIn from "@/components/GoogleSignIn";
import { Bird } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 px-6 py-6">
        <div className="flex items-center gap-2">
          <Bird className="w-5 h-5 text-green-600" />
          <span className="font-semibold text-lg text-gray-900">Chirp</span>
        </div>
      </div>

      <main className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Your AI-powered voice on X
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Tell us what you want to talk about. We&apos;ll find the stories and
            craft the posts.
          </p>
          <GoogleSignIn />
        </div>
      </main>
    </div>
  );
}
