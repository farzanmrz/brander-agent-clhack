"use client";

import { useState } from "react";

export default function TweetTestPage() {
  const [text, setText] = useState("Test tweet from Brander Agent UI");
  const [status, setStatus] = useState<string | null>(null);
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePost = async () => {
    setLoading(true);
    setStatus(null);
    setResponse(null);

    try {
      console.log("[TweetTest] Sending POST /api/tweet with:", { text });
      const res = await fetch("/api/tweet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      console.log("[TweetTest] Response status:", res.status);
      const data = await res.json();
      console.log("[TweetTest] Response body:", data);

      setResponse(JSON.stringify(data, null, 2));

      if (!res.ok) {
        setStatus(`FAILED — HTTP ${res.status}`);
      } else if (data.result?.successful) {
        setStatus(`SUCCESS — Tweet ID: ${data.result?.data?.data?.id}`);
      } else {
        setStatus(`UNKNOWN — Check response below`);
      }
    } catch (err) {
      console.error("[TweetTest] Error:", err);
      setStatus(`ERROR — ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream p-8 max-w-2xl mx-auto">
      <div className="inline-block bg-purple-light neo-border neo-shadow-sm rounded-lg px-3 py-1 mb-4">
        <span className="text-xs font-bold uppercase tracking-wide">
          Test Page
        </span>
      </div>
      <h1 className="text-3xl font-bold mb-2 text-black">Tweet API Test</h1>
      <p className="text-sm text-gray-600 font-medium mb-6">
        POST /api/tweet — isolated test page
      </p>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full neo-border neo-shadow-sm rounded-lg p-4 text-base mb-2 h-32 resize-none outline-none focus:shadow-[4px_4px_0px_var(--color-purple-mid)] transition-all duration-100 bg-white"
      />
      <p className="text-xs font-bold text-gray-500 mb-4">
        {text.length} characters
      </p>

      <button
        onClick={handlePost}
        disabled={loading || !text.trim()}
        className="bg-purple neo-border neo-shadow text-white px-6 py-3 rounded-lg font-bold disabled:opacity-50 cursor-pointer neo-press transition-all duration-100"
      >
        {loading ? "Posting..." : "Post Tweet"}
      </button>

      {status && (
        <div
          className={`mt-6 p-4 rounded-lg neo-border font-bold ${
            status.startsWith("SUCCESS")
              ? "bg-green-light text-black"
              : "bg-purple-light text-black"
          }`}
        >
          <p>{status}</p>
        </div>
      )}

      {response && (
        <pre className="mt-4 bg-white neo-border neo-shadow-sm p-4 rounded-lg text-xs overflow-auto max-h-64 font-mono">
          {response}
        </pre>
      )}
    </div>
  );
}
