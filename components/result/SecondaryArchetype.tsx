import React from 'react';
import { ArchetypeContent } from '@/lib/scoring/archetype-content';
import { useTranslation } from '@/lib/i18n/useTranslation';

interface SecondaryArchetypeProps {
  secondaryArchetype: ArchetypeContent;
  similarity: number;
}

export const SecondaryArchetype: React.FC<SecondaryArchetypeProps> = ({ secondaryArchetype, similarity }) => {
  const { t, lang } = useTranslation();

  return (
    <section className="w-full max-w-3xl mx-auto py-24 px-6 border-t border-zinc-900 text-center">
      <p className="text-zinc-500 text-[10px] md:text-xs tracking-[0.3em] uppercase mb-8">
        {t.result.secondary.title}
      </p>
      
      <h2 className="text-3xl md:text-5xl font-light tracking-[0.15em] uppercase mb-12 text-zinc-300 flex flex-col items-center gap-4">
        {secondaryArchetype.name.en}
        {lang !== 'en' && (
          <span className="text-base md:text-lg font-light tracking-[0.3em] text-zinc-500">
            {secondaryArchetype.name[lang]}
          </span>
        )}
      </h2>
      
      <p className="text-xl md:text-2xl font-light leading-relaxed text-zinc-400 mb-16 max-w-xl mx-auto">
        {secondaryArchetype.description[lang]}
      </p>
      
      <div className="inline-flex flex-col items-center border border-zinc-800 px-8 py-6 rounded-sm mb-12">
        <span className="text-zinc-500 text-[10px] tracking-widest uppercase mb-2">{t.result.secondary.similarity}</span>
        <span className="text-3xl font-light text-zinc-200">{similarity}%</span>
      </div>

      <p className="text-zinc-600 text-xs tracking-wider leading-relaxed max-w-sm mx-auto">
        {t.result.secondary.disclaimer}
      </p>
    </section>
  );
};
