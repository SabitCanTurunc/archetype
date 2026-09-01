"use client";

import Link from 'next/link';
import { useLanguage } from '@/components/LanguageProvider';

export default function HomePage() {
  const { language } = useLanguage();

  const content = {
    en: {
      headline: <>You are more predictable<br />than you think.</>,
      subheadline: "Discover the behavioral pattern behind the way you decide, connect and respond.",
      cta: "Discover Your Archetype",
      secondary: "12 questions · ~2 minutes",
      footer: "ARCHETYPE // BEHAVIORAL ANALYSIS SYSTEM"
    },
    tr: {
      headline: <>Düşündüğünden daha<br />öngörülebilrisin.</>,
      subheadline: "Karar verme, bağ kurma ve tepki verme şeklinin ardındaki davranışsal deseni keşfet.",
      cta: "Arketipini Keşfet",
      secondary: "12 soru · ~2 dakika",
      footer: "ARCHETYPE // DAVRANIŞ ANALİZ SİSTEMİ"
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-zinc-900/30 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="flex flex-col items-center z-10 w-full max-w-2xl text-center">
        <h1 className="text-white font-light tracking-[0.2em] md:tracking-[0.3em] text-3xl md:text-5xl uppercase mb-8 leading-tight">
          {t.headline}
        </h1>
        
        <p className="text-zinc-400 text-sm md:text-base tracking-wide max-w-md mb-16 leading-relaxed">
          {t.subheadline}
        </p>

        <Link 
          href="/test" 
          className="group relative inline-flex items-center justify-center px-8 py-4 bg-zinc-900 text-zinc-100 text-xs tracking-[0.2em] uppercase overflow-hidden border border-zinc-800 hover:border-zinc-600 transition-colors duration-500"
        >
          <span className="relative z-10 transition-colors duration-500 group-hover:text-[var(--color-brand)]">{t.cta}</span>
          <div className="absolute inset-0 bg-white/5 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>
        </Link>
        
        <p className="mt-8 text-zinc-600 text-xs tracking-widest uppercase">
          {t.secondary}
        </p>
      </div>

      <div className="absolute bottom-8 text-zinc-800 text-[10px] tracking-widest uppercase font-mono z-10 text-center">
        {t.footer}
      </div>
    </div>
  );
}


