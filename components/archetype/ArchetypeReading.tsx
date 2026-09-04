"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import { ArchetypeContent } from "@/lib/scoring/archetype-content";

interface ArchetypeReadingProps {
  archetype: ArchetypeContent;
  isSharedContext?: boolean; // True if viewed via /r/[token]
}

export const ArchetypeReading: React.FC<ArchetypeReadingProps> = ({ archetype, isSharedContext = false }) => {
  const { language } = useLanguage();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const t = {
    en: {
      archTitle: "ARCHETYPE",
      pattern: "YOUR DEFINING PATTERN",
      blindSpot: "BLIND SPOT",
      relationships: "IN RELATIONSHIPS",
      pressure: "UNDER PRESSURE",
      contradiction: "INNER CONTRADICTION",
      cta: {
        title: "WHAT ABOUT YOU?",
        sharedContext: "You've seen their Archetype.",
        question: "But which one are you?",
        action: "Discover your pattern in 12 questions.",
        button: "DISCOVER YOUR ARCHETYPE"
      }
    },
    tr: {
      archTitle: "ARCHETYPE",
      pattern: "SENİ TANIMLAYAN ÖRÜNTÜ",
      blindSpot: "KÖR NOKTAN",
      relationships: "İLİŞKİLERDE",
      pressure: "BASKI ALTINDA",
      contradiction: "İÇİNDEKİ ÇELİŞKİ",
      cta: {
        title: "PEKİ SEN?",
        sharedContext: "Arkadaşının Archetype'ını gördün.",
        question: "Peki sen hangisisin?",
        action: "12 soruda kendi Archetype'ını keşfet.",
        button: "ARCHETYPE'INI KEŞFET"
      }
    }
  };

  const c = t[language];

  // Helper for tracking the CTA click
  const trackCtaClick = () => {
    console.log("[Analytics] shared_archetype_cta_clicked");
    // Native tracking would go here
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex flex-col items-center pt-24 pb-32 px-6 selection:bg-zinc-800 font-sans">
      
      {/* 1. Header Section */}
      <div className="w-full max-w-2xl text-center border-b border-zinc-900 pb-20 mb-20 animate-fade-in-up">
        <p className="text-zinc-500 font-mono text-xs tracking-[0.3em] uppercase mb-12">
          {c.archTitle}
        </p>
        
        <h1 className="font-light uppercase text-white leading-tight mb-8" style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', letterSpacing: '0.08em' }}>
          {archetype.name[language]}
        </h1>
        
        <p className="text-zinc-300 italic font-light whitespace-pre-line mb-8" style={{ fontSize: 'clamp(1.2rem, 4vw, 1.8rem)' }}>
          {archetype.tagline[language]}
        </p>

        <p className="text-zinc-400 font-light leading-relaxed max-w-xl mx-auto" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.15rem)' }}>
          {archetype.description[language]}
        </p>
      </div>

      {/* 2. Content Sections */}
      <div className="w-full max-w-2xl space-y-24">
        
        {/* Pattern */}
        <section className="animate-fade-in-up" style={{ animationDelay: '100ms', animationFillMode: 'both' }}>
          <h2 className="font-mono text-zinc-600 text-xs tracking-[0.2em] uppercase mb-8 border-l-2 border-zinc-800 pl-4">
            {c.pattern}
          </h2>
          <ul className="space-y-4">
            {archetype.definesYou.map((item, idx) => (
              <li key={idx} className="flex items-start gap-4 text-zinc-300 font-light text-lg">
                <span className="text-zinc-700 mt-1.5">•</span>
                <span>{item[language]}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Relationships */}
        <section className="animate-fade-in-up" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
          <h2 className="font-mono text-zinc-600 text-xs tracking-[0.2em] uppercase mb-8 border-l-2 border-zinc-800 pl-4">
            {c.relationships}
          </h2>
          <p className="text-zinc-300 font-light text-lg leading-relaxed">
            {archetype.relationships[language]}
          </p>
        </section>

        {/* Pressure */}
        <section className="animate-fade-in-up" style={{ animationDelay: '300ms', animationFillMode: 'both' }}>
          <h2 className="font-mono text-zinc-600 text-xs tracking-[0.2em] uppercase mb-8 border-l-2 border-zinc-800 pl-4">
            {c.pressure}
          </h2>
          <p className="text-zinc-300 font-light text-lg leading-relaxed">
            {archetype.underPressure[language]}
          </p>
        </section>

        {/* Blind Spot */}
        <section className="animate-fade-in-up" style={{ animationDelay: '400ms', animationFillMode: 'both' }}>
          <h2 className="font-mono text-zinc-600 text-xs tracking-[0.2em] uppercase mb-8 border-l-2 border-zinc-800 pl-4">
            {c.blindSpot}
          </h2>
          <p className="text-zinc-400 font-light text-lg leading-relaxed italic">
            {archetype.blindSpot[language]}
          </p>
        </section>

        {/* Contradiction */}
        <section className="animate-fade-in-up" style={{ animationDelay: '500ms', animationFillMode: 'both' }}>
          <h2 className="font-mono text-zinc-600 text-xs tracking-[0.2em] uppercase mb-8 border-l-2 border-zinc-800 pl-4">
            {c.contradiction}
          </h2>
          <p className="text-zinc-300 font-light text-lg leading-relaxed">
            {archetype.contradiction[language]}
          </p>
        </section>

      </div>

      {/* 3. Divider */}
      <div className="w-full max-w-2xl my-32">
        <div className="h-px w-full bg-zinc-900" />
      </div>

      {/* 4. Conversion CTA */}
      <div className="w-full max-w-lg text-center animate-fade-in-up" style={{ animationDelay: '600ms', animationFillMode: 'both' }}>
        <h2 className="font-mono text-zinc-500 text-sm tracking-[0.3em] uppercase mb-10">
          {c.cta.title}
        </h2>
        
        {isSharedContext && (
          <p className="text-zinc-400 font-light text-lg mb-2">
            {c.cta.sharedContext}
          </p>
        )}
        
        <p className="text-zinc-200 font-light text-xl md:text-2xl mb-4">
          {c.cta.question}
        </p>
        
        <p className="text-zinc-500 font-light italic mb-12">
          {c.cta.action}
        </p>
        
        <Link 
          href="/test"
          onClick={trackCtaClick}
          className="inline-flex items-center justify-center bg-white text-black hover:bg-zinc-200 transition-colors duration-400 px-8 py-4 font-mono text-[0.65rem] tracking-[0.22em] uppercase w-full sm:w-auto shadow-[0_0_48px_rgba(255,255,255,0.1)]"
        >
          {c.cta.button}
        </Link>
      </div>

    </div>
  );
};
