"use client";

import { Bird, ChevronDown, LogOut, Settings, Zap } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [yolo, setYolo] = useState(false);
  const [showYoloWarning, setShowYoloWarning] = useState(false);

  useEffect(() => {
    setYolo(sessionStorage.getItem("chirp_yolo") === "true");
  }, []);

  const handleYoloToggle = () => {
    if (!yolo) {
      setShowYoloWarning(true);
    } else {
      sessionStorage.removeItem("chirp_yolo");
      setYolo(false);
    }
  };

  const confirmYolo = () => {
    sessionStorage.setItem("chirp_yolo", "true");
    setYolo(true);
    setShowYoloWarning(false);
  };

  return (
    <>
      {/* YOLO warning modal */}
      {showYoloWarning && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/40">
          <div className="bg-white neo-border neo-shadow-lg rounded-lg p-6 max-w-sm mx-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-peach neo-border rounded-lg p-1.5">
                <Zap className="w-5 h-5 text-black" strokeWidth={3} />
              </div>
              <h2 className="text-lg font-bold text-black">
                Enable YOLO Mode?
              </h2>
            </div>
            <p className="text-sm text-gray-700 mb-1 font-medium">
              Tweets will be posted straight to X. No preview, no second
              thoughts.
            </p>
            <p className="text-sm text-gray-500 mb-5">
              Your reputation is now in the hands of an AI. Godspeed.
            </p>
            <div className="flex gap-3">
              <button
                onClick={confirmYolo}
                className="flex-1 bg-peach neo-border neo-shadow text-black px-4 py-2.5 rounded-lg font-bold text-sm transition-all duration-100 neo-press cursor-pointer"
              >
                I live dangerously
              </button>
              <button
                onClick={() => setShowYoloWarning(false)}
                className="flex-1 bg-white neo-border neo-shadow-sm text-black px-4 py-2.5 rounded-lg font-bold text-sm transition-all duration-100 neo-press-sm cursor-pointer"
              >
                Nah, I&apos;m good
              </button>
            </div>
          </div>
        </div>
      )}

      <header className="fixed top-0 w-full bg-peach neo-border border-t-0 border-l-0 border-r-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="bg-lime neo-border rounded-lg p-1">
                <Bird className="w-5 h-5 text-black" />
              </div>
              <span className="font-bold text-xl text-black">Chirp</span>
            </Link>

            {/* YOLO toggle */}
            <button
              onClick={handleYoloToggle}
              className={`flex items-center gap-1.5 neo-border rounded-lg px-2.5 py-1 text-xs font-bold transition-all duration-100 neo-press-sm cursor-pointer ${
                yolo
                  ? "bg-peach neo-shadow-sm text-black"
                  : "bg-white neo-shadow-sm text-gray-500 hover:text-black"
              }`}
            >
              <Zap
                className={`w-3.5 h-3.5 ${yolo ? "text-black" : ""}`}
                strokeWidth={3}
                fill={yolo ? "currentColor" : "none"}
              />
              YOLO
            </button>
          </div>
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 cursor-pointer neo-border rounded-lg bg-white px-3 py-1.5 neo-shadow-sm neo-press-sm transition-all duration-100"
            >
              <div className="w-7 h-7 rounded-md bg-pink neo-border flex items-center justify-center text-black font-bold text-sm">
                U
              </div>
              <ChevronDown className="w-4 h-4 text-black" />
            </button>
            {dropdownOpen && (
              <>
                <div
                  className="fixed inset-0"
                  onClick={() => setDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-48 bg-white neo-border neo-shadow rounded-lg py-2 z-50">
                  <button className="w-full px-4 py-2.5 text-left text-sm font-semibold text-black hover:bg-lime flex items-center gap-2 transition-colors">
                    <Settings className="w-4 h-4" />
                    Settings
                  </button>
                  <Link
                    href="/"
                    className="w-full px-4 py-2.5 text-left text-sm font-semibold text-black hover:bg-pink flex items-center gap-2 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign out
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
