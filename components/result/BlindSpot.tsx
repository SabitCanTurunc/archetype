import React from 'react';
import { ArchetypeContent } from '@/lib/scoring/archetype-content';
import { useTranslation } from '@/lib/i18n/useTranslation';

interface BlindSpotProps {
  archetype: ArchetypeContent;
}

export const BlindSpot: React.FC<BlindSpotProps> = ({ archetype }) => {
  const { t, lang } = useTranslation();

  return (
    <section className="w-full max-w-3xl mx-auto py-24 px-6 border-t border-zinc-900 text-center md:text-left">
      <p className="text-zinc-500 text-[10px] md:text-xs tracking-[0.3em] uppercase mb-12">
        {t.result.blindSpot.title}
      </p>
      
      <p className="text-lg md:text-xl font-light leading-relaxed text-zinc-400 italic mb-12">
        {t.result.blindSpot.quote}
      </p>
      
      <p className="text-xl md:text-2xl font-light leading-relaxed text-zinc-200 mb-12">
        {archetype.blindSpot[lang]}
      </p>

      <p className="text-sm md:text-base font-light leading-relaxed text-zinc-500 max-w-xl mx-auto md:mx-0 whitespace-pre-line">
        {t.result.blindSpot.conclusion}
      </p>
    </section>
  );
};
