import React from 'react';
import { useTranslation } from '@/lib/i18n/useTranslation';

interface DimensionCardProps {
  label: "CONTROL" | "SOCIAL" | "DECISION" | "EMOTION";
  score: number;
}

const DimensionCard: React.FC<DimensionCardProps> = ({ label, score }) => {
  const { t } = useTranslation();
  
  const dimDict = t.result.pattern.dimensions[label.toLowerCase() as "control" | "social" | "decision" | "emotion"];
  
  let mappedLabel = "";
  let description = "";
  
  if (label === "CONTROL") {
    if (score <= 25) mappedLabel = (dimDict as any).flexible;
    else if (score <= 50) mappedLabel = (dimDict as any).adaptive;
    else if (score <= 75) mappedLabel = (dimDict as any).structured;
    else mappedLabel = (dimDict as any).high;
    description = score > 50 ? dimDict.desc_high : dimDict.desc_low;
  } else if (label === "SOCIAL") {
    if (score <= 25) mappedLabel = (dimDict as any).private;
    else if (score <= 50) mappedLabel = (dimDict as any).selective;
    else if (score <= 75) mappedLabel = (dimDict as any).open;
    else mappedLabel = (dimDict as any).high;
    description = score > 50 ? dimDict.desc_high : dimDict.desc_low;
  } else if (label === "DECISION") {
    if (score <= 25) mappedLabel = (dimDict as any).intuitive;
    else if (score <= 50) mappedLabel = (dimDict as any).instinctive;
    else if (score <= 75) mappedLabel = (dimDict as any).deliberate;
    else mappedLabel = (dimDict as any).analytical;
    description = score > 50 ? dimDict.desc_high : dimDict.desc_low;
  } else if (label === "EMOTION") {
    if (score <= 25) mappedLabel = (dimDict as any).reserved;
    else if (score <= 50) mappedLabel = (dimDict as any).guarded;
    else if (score <= 75) mappedLabel = (dimDict as any).open;
    else mappedLabel = (dimDict as any).expressive;
    description = score > 50 ? dimDict.desc_high : dimDict.desc_low;
  }

  return (
    <div className="flex flex-col border border-zinc-900 p-8 hover:bg-zinc-900/30 transition-colors h-full">
      <span className="text-zinc-600 text-xs tracking-[0.2em] mb-4">{(dimDict as any).title}</span>
      <span className="text-xl md:text-2xl font-light tracking-widest text-zinc-200 mb-6 uppercase">{mappedLabel}</span>
      <p className="text-zinc-400 text-sm font-light leading-relaxed mt-auto">
        {description}
      </p>
    </div>
  );
};

interface PatternOverviewProps {
  dimensions: {
    CONTROL: number;
    SOCIAL: number;
    DECISION: number;
    EMOTION: number;
  };
}

export const PatternOverview: React.FC<PatternOverviewProps> = ({ dimensions }) => {
  const { t } = useTranslation();

  return (
    <section className="w-full max-w-5xl mx-auto py-16 px-6">
      <p className="text-zinc-500 text-[10px] md:text-xs tracking-[0.3em] uppercase mb-12 text-center md:text-left">
        {t.result.pattern.title}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-zinc-900">
        {Object.entries(dimensions)
          .filter(([key]) => ["CONTROL", "SOCIAL", "DECISION", "EMOTION"].includes(key))
          .map(([key, value]) => (
          <div key={key} className="bg-black">
            <DimensionCard 
              label={key as any} 
              score={value} 
            />
          </div>
        ))}
      </div>
    </section>
  );
};
