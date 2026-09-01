import React from 'react';
import { ArchetypeContent } from '@/lib/scoring/archetype-content';
import { useTranslation } from '@/lib/i18n/useTranslation';

interface UnderPressureProps {
  archetype: ArchetypeContent;
}

export const UnderPressure: React.FC<UnderPressureProps> = ({ archetype }) => {
  const { t, lang } = useTranslation();

  return (
    <section className="w-full max-w-3xl mx-auto py-24 px-6 border-t border-zinc-900">
      <p className="text-zinc-500 text-[10px] md:text-xs tracking-[0.3em] uppercase mb-12 text-center md:text-left">
        {t.result.underPressure.title}
      </p>
      
      <div className="flex flex-col gap-8 text-center md:text-left">
        <p className="text-lg md:text-xl font-light leading-relaxed text-zinc-400">
          {t.result.underPressure.intro}
        </p>
        <p className="text-xl md:text-2xl font-light leading-relaxed text-zinc-200">
          {archetype.underPressure[lang]}
        </p>
      </div>
    </section>
  );
};
