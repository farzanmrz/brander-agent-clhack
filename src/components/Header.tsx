"use client";

import { Bird, ChevronDown, LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Bird className="w-5 h-5 text-green-600" />
          <span className="font-semibold text-lg text-gray-900">Chirp</span>
        </Link>
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-semibold text-sm">
              U
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>
          {dropdownOpen && (
            <>
              <div
                className="fixed inset-0"
                onClick={() => setDropdownOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-48 bg-white border-2 border-gray-200 rounded-xl py-2 z-50">
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Settings
                </button>
                <Link
                  href="/"
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
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
  );
}
