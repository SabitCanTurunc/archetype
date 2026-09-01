import React from 'react';
import { ArchetypeContent } from '@/lib/scoring/archetype-content';
import { useTranslation } from '@/lib/i18n/useTranslation';

interface RelationshipsProps {
  archetype: ArchetypeContent;
}

export const Relationships: React.FC<RelationshipsProps> = ({ archetype }) => {
  const { t, lang } = useTranslation();

  return (
    <section className="w-full max-w-3xl mx-auto py-24 px-6 border-t border-zinc-900">
      <p className="text-zinc-500 text-[10px] md:text-xs tracking-[0.3em] uppercase mb-12 text-center md:text-left">
        {t.result.relationships.title}
      </p>
      
      <p className="text-xl md:text-2xl font-light leading-relaxed text-zinc-200 text-balance text-center md:text-left">
        {archetype.relationships[lang]}
      </p>
    </section>
  );
};
