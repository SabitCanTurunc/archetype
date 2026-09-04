"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";

export function Navbar() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-8 h-14">
      {/* Subtle blur backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md border-b border-white/[0.04]" />

      {/* Logo */}
      <Link href="/" className="relative z-10 flex items-center gap-3 group">
        <Image
          src="/logopng.png"
          alt="Archetype"
          width={24}
          height={24}
          className="opacity-80 group-hover:opacity-100 transition-opacity duration-300"
          style={{ filter: 'brightness(1.1)' }}
        />
        <span
          className="text-zinc-400 group-hover:text-zinc-200 transition-colors duration-300 tracking-[0.25em] uppercase"
          style={{ fontSize: '0.6rem', letterSpacing: '0.28em' }}
        >
          ARCHETYPE
        </span>
      </Link>

      {/* Right side: language toggle */}
      <button
        onClick={toggleLanguage}
        className="relative z-10 text-zinc-600 hover:text-zinc-300 transition-colors duration-300 font-mono"
        style={{ fontSize: '0.6rem', letterSpacing: '0.2em' }}
      >
        {language === "en" ? "TR" : "EN"}
      </button>
    </header>
  );
}
