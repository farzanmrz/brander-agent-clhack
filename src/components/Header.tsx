"use client";

import { Bird, LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 h-14 flex justify-between items-center">
        <Link href="/dashboard" className="flex items-center gap-2 group">
          <Bird className="w-7 h-7 text-green-600" />
        </Link>
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold text-xs hover:bg-gray-300 transition-colors duration-150 cursor-pointer"
          >
            U
          </button>
          {dropdownOpen && (
            <>
              <div
                className="fixed inset-0"
                onClick={() => setDropdownOpen(false)}
              />
              <div className="absolute right-0 mt-1 w-56 bg-white border border-gray-200 rounded-2xl py-1 z-50 shadow-xl animate-scale-in overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-bold text-gray-900">User</p>
                  <p className="text-xs text-gray-500">@yourhandle</p>
                </div>
                <button className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 cursor-pointer">
                  <Settings className="w-4 h-4 text-gray-400" />
                  Settings
                </button>
                <Link
                  href="/"
                  className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3"
                >
                  <LogOut className="w-4 h-4 text-gray-400" />
                  Log out
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
