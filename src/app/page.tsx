"use client";

import GoogleSignIn from "@/components/GoogleSignIn";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <div className="fixed top-0 left-0 right-0 px-6 py-6">
        <Image src="/ditto-logo.svg" alt="Ditto" width={140} height={48} />
      </div>

      <main className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-3xl">
          <div className="inline-block bg-purple-light neo-border neo-shadow rounded-lg px-4 py-2 mb-6">
            <span className="font-bold text-sm text-purple uppercase tracking-wide">
              AI-Powered Posting
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-black mb-6 leading-tight">
            Your AI-powered voice on X
          </h1>
          <p className="text-xl text-gray-700 mb-12 max-w-2xl mx-auto font-medium">
            Tell us what you want to talk about. We&apos;ll find the stories and
            craft the posts.
          </p>
          <GoogleSignIn />
        </div>
      </main>
    </div>
  );
}
