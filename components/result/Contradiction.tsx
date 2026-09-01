import React from 'react';
import { ArchetypeContent } from '@/lib/scoring/archetype-content';
import { useTranslation } from '@/lib/i18n/useTranslation';

interface ContradictionProps {
  archetype: ArchetypeContent;
}

export const Contradiction: React.FC<ContradictionProps> = ({ archetype }) => {
  const { t, lang } = useTranslation();

  return (
    <section className="w-full py-32 px-6 bg-zinc-900/50">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-[var(--color-brand)] text-[10px] md:text-xs tracking-[0.3em] uppercase mb-12">
          {t.result.contradiction.title}
        </p>
        
        <p className="text-2xl md:text-4xl font-light leading-relaxed text-white text-balance mx-auto">
          {archetype.contradiction[lang]}
        </p>
      </div>
    </section>
  );
};
