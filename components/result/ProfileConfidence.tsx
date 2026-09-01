import React from 'react';
import { useTranslation } from '@/lib/i18n/useTranslation';

interface ProfileConfidenceProps {
  confidence: number;
}

export const ProfileConfidence: React.FC<ProfileConfidenceProps> = ({ confidence }) => {
  const { t } = useTranslation();

  return (
    <section className="w-full max-w-3xl mx-auto py-24 px-6 border-t border-zinc-900 text-center">
      <p className="text-zinc-500 text-[10px] md:text-xs tracking-[0.3em] uppercase mb-8">
        {t.result.confidence.title}
      </p>
      
      <div className="text-4xl md:text-6xl font-light text-[var(--color-brand)] mb-8">
        {confidence}%
      </div>
      
      <p className="text-lg md:text-xl font-light leading-relaxed text-zinc-300 mb-8 max-w-md mx-auto">
        {t.result.confidence.intro}
      </p>

      <p className="text-zinc-600 text-xs tracking-wider leading-relaxed">
        {t.result.confidence.disclaimer}
      </p>
    </section>
  );
};
