"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";

export function Navbar() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <nav className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50 pointer-events-none mix-blend-difference">
      <Link href="/" className="pointer-events-auto text-white tracking-[0.3em] text-sm uppercase hover:opacity-70 transition-opacity">
        A  R  C  H  E  T  Y  P  E
      </Link>
      <button
        onClick={toggleLanguage}
        className="pointer-events-auto text-white text-xs tracking-widest uppercase hover:text-[#E65100] transition-colors font-mono"
      >
        {language === "en" ? "TR" : "EN"}
      </button>
    </nav>
  );
}
