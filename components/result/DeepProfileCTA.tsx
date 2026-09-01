"use client";

import React from 'react';
import Link from 'next/link';
import { useTranslation } from '@/lib/i18n/useTranslation';

export const DeepProfileCTA: React.FC = () => {
  const { t } = useTranslation();

  const handleCTAClick = () => {
    console.log("[Analytics] deep_profile_clicked");
  };

  return (
    <section className="w-full max-w-3xl mx-auto py-32 px-6 border-t border-zinc-900 flex flex-col items-center text-center">
      <p className="text-zinc-500 text-[10px] md:text-xs tracking-[0.3em] uppercase mb-8">
        {t.result.cta.title}
      </p>
      
      <p className="text-xl md:text-2xl font-light leading-relaxed text-zinc-300 mb-4 text-balance">
        {t.result.cta.outline}
      </p>
      <p className="text-xl md:text-2xl font-light leading-relaxed text-zinc-300 mb-16 text-balance">
        {t.result.cta.deeper}
      </p>

      <div className="border border-zinc-800 p-8 md:p-12 w-full max-w-lg mb-12">
        <h3 className="text-2xl md:text-3xl font-light tracking-[0.1em] uppercase text-white mb-8">
          {t.result.cta.deepProfile}
        </h3>
        <ul className="text-zinc-400 text-sm md:text-base font-light flex flex-col gap-4 text-left mx-auto max-w-xs mb-12">
          <li className="flex items-center gap-4">
            <div className="w-1 h-1 bg-[var(--color-brand)] rounded-full"></div>
            {t.result.cta.points.q40}
          </li>
          <li className="flex items-center gap-4">
            <div className="w-1 h-1 bg-[var(--color-brand)] rounded-full"></div>
            {t.result.cta.points.detailed}
          </li>
          <li className="flex items-center gap-4">
            <div className="w-1 h-1 bg-[var(--color-brand)] rounded-full"></div>
            {t.result.cta.points.personalized}
          </li>
        </ul>
        
        <Link 
          href="/coming-soon"
          onClick={handleCTAClick}
          className="inline-block px-8 py-4 bg-zinc-100 text-black text-sm tracking-widest uppercase hover:bg-white transition-colors"
        >
          {t.result.cta.button}
        </Link>
      </div>
      
      <p className="text-zinc-600 text-[10px] tracking-widest uppercase">
        {t.result.cta.comingSoon}
      </p>
    </section>
  );
};
