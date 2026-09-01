import React from 'react';
import { ArchetypeContent } from '@/lib/scoring/archetype-content';
import { useTranslation } from '@/lib/i18n/useTranslation';

interface ResultHeroProps {
  archetype: ArchetypeContent;
}

export const ResultHero: React.FC<ResultHeroProps> = ({ archetype }) => {
  const { t, lang } = useTranslation();

  return (
    <section className="flex flex-col items-center text-center pt-16 pb-24 md:pt-24 md:pb-32 px-6 relative w-full">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent opacity-50"></div>
      
      <p className="text-zinc-500 text-[10px] md:text-xs tracking-[0.3em] uppercase mb-8">
        {t.result.hero.yourArchetype}
      </p>
      
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-[0.15em] uppercase mb-12 text-[var(--color-brand)] text-center flex flex-col items-center">
        {archetype.name.en}
        {lang !== 'en' && (
          <span className="text-xl md:text-3xl font-light tracking-[0.3em] text-zinc-500 mt-6">
            {archetype.name[lang]}
          </span>
        )}
      </h1>
      
      <div className="max-w-2xl text-balance flex flex-col gap-8 items-center">
        <p className="text-xl md:text-2xl font-light leading-relaxed text-zinc-200">
          {archetype.tagline[lang]}
        </p>
        
        <p className="text-zinc-400 text-sm md:text-base font-light leading-relaxed max-w-lg">
          {t.result.hero.profileShapedBy}
        </p>
      </div>

      <div className="mt-24 max-w-md mx-auto text-center border-t border-zinc-900 pt-8">
        <p className="text-zinc-600 text-xs tracking-wider leading-relaxed whitespace-pre-line">
          {t.result.hero.disclaimer}
        </p>
      </div>
    </section>
  );
};
