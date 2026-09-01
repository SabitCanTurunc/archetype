import React from 'react';
import { ArchetypeContent } from '@/lib/scoring/archetype-content';
import { useTranslation } from '@/lib/i18n/useTranslation';

interface DefinesYouProps {
  archetype: ArchetypeContent;
}

export const DefinesYou: React.FC<DefinesYouProps> = ({ archetype }) => {
  const { t, lang } = useTranslation();

  return (
    <section className="w-full max-w-3xl mx-auto py-24 px-6 border-t border-zinc-900">
      <p className="text-zinc-500 text-[10px] md:text-xs tracking-[0.3em] uppercase mb-16 text-center md:text-left">
        {t.result.definesYou.title}
      </p>
      
      <div className="flex flex-col gap-16">
        {archetype.definesYou.map((point, index) => (
          <div key={index} className="flex flex-col md:flex-row gap-6 md:gap-12 items-start">
            <span className="text-zinc-600 text-sm tracking-widest font-mono shrink-0">
              0{index + 1}
            </span>
            <p className="text-xl md:text-2xl font-light leading-relaxed text-zinc-200">
              {point[lang]}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
