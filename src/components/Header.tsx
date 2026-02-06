"use client";

import { ChevronDown, LogOut, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-purple neo-border border-t-0 border-l-0 border-r-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
        <Link href="/dashboard" className="flex items-center bg-white px-4 h-16 -ml-4">
          <Image src="/ditto-logo.svg" alt="Ditto" width={120} height={41} />
        </Link>
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 cursor-pointer neo-border rounded-lg bg-white px-3 py-1.5 neo-shadow-sm neo-press-sm transition-all duration-100"
          >
            <div className="w-7 h-7 rounded-md bg-purple neo-border flex items-center justify-center text-white font-bold text-sm">
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
                <button className="w-full px-4 py-2.5 text-left text-sm font-semibold text-black hover:bg-purple-light flex items-center gap-2 transition-colors">
                  <Settings className="w-4 h-4" />
                  Settings
                </button>
                <Link
                  href="/"
                  className="w-full px-4 py-2.5 text-left text-sm font-semibold text-black hover:bg-purple-light flex items-center gap-2 transition-colors"
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
