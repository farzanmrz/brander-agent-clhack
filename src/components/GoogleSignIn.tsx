"use client";

import { useState } from "react";

export default function GoogleSignIn() {
  const [loading, setLoading] = useState(false);

  function handleSignIn() {
    setLoading(true);
    window.location.href = "/dashboard";
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        type="button"
        onClick={handleSignIn}
        disabled={loading}
        className="bg-black neo-border neo-shadow px-6 py-4 rounded-lg flex items-center gap-3 font-bold text-white transition-all duration-100 cursor-pointer neo-press disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none! disabled:translate-0! hover:bg-gray-800"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        {loading ? "Signing in\u2026" : "Sign in with X"}
      </button>
    </div>
  );
}
