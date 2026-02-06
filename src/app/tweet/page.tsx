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
    <div className="min-h-screen bg-white p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Tweet API Test</h1>
      <p className="text-sm text-gray-500 mb-6">
        POST /api/tweet — isolated test page
      </p>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full border-2 border-gray-300 rounded-lg p-4 text-base mb-2 h-32 resize-none focus:outline-none focus:border-green-600"
      />
      <p className="text-xs text-gray-400 mb-4">{text.length} characters</p>

      <button
        onClick={handlePost}
        disabled={loading || !text.trim()}
        className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold disabled:opacity-50 cursor-pointer"
      >
        {loading ? "Posting..." : "Post Tweet"}
      </button>

      {status && (
        <div
          className={`mt-6 p-4 rounded-lg border-2 ${
            status.startsWith("SUCCESS")
              ? "border-green-300 bg-green-50 text-green-800"
              : "border-red-300 bg-red-50 text-red-800"
          }`}
        >
          <p className="font-semibold">{status}</p>
        </div>
      )}

      {response && (
        <pre className="mt-4 bg-gray-100 p-4 rounded-lg text-xs overflow-auto max-h-64">
          {response}
        </pre>
      )}
    </div>
  );
}
