"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ProfileResult } from "@/lib/scoring/engine";
import { archetypeContents } from "@/lib/scoring/archetype-content";

import { ResultHero } from "@/components/result/ResultHero";
import { PatternOverview } from "@/components/result/PatternOverview";
import { DefinesYou } from "@/components/result/DefinesYou";
import { BlindSpot } from "@/components/result/BlindSpot";
import { Relationships } from "@/components/result/Relationships";
import { UnderPressure } from "@/components/result/UnderPressure";
import { Contradiction } from "@/components/result/Contradiction";
import { SecondaryArchetype } from "@/components/result/SecondaryArchetype";
import { ProfileConfidence } from "@/components/result/ProfileConfidence";
import { DeepProfileCTA } from "@/components/result/DeepProfileCTA";
import { ShareButton } from "@/components/result/ShareButton";
import { useTranslation } from "@/lib/i18n/useTranslation";

export default function ResultPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const idParam = searchParams.get("id");
  
  const [result, setResult] = useState<ProfileResult | null>(null);
  const [publicToken, setPublicToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  const trackEvent = (eventName: string, metadata?: any) => {
    console.log(`[Analytics] ${eventName}`, metadata);
    // In a real app, send this to Mixpanel, Amplitude, GA, etc.
  };

  useEffect(() => {
    const loadProfile = async () => {
      try {
        if (idParam) {
          const res = await fetch(`/api/profile/${idParam}`);
          if (res.ok) {
            const data = await res.json();
            setResult(data.profile);
            setPublicToken(idParam);
            
            trackEvent("result_viewed", {
              archetype: data.profile.primary.id,
              secondary: data.profile.secondary.id
            });
            setLoading(false);
            return;
          }
        }
        
        // Fallback to local storage if API fails or no id
        const savedResult = localStorage.getItem("archetypeResult");
        if (savedResult) {
          const parsed = JSON.parse(savedResult);
          setResult(parsed);
          trackEvent("result_viewed", {
            archetype: parsed.primary.id,
            secondary: parsed.secondary.id
          });
          setLoading(false);
          return;
        }

        // If neither, go home
        router.push("/");
      } catch (err) {
        console.error("Error loading profile:", err);
        router.push("/");
      }
    };

    loadProfile();
  }, [idParam, router]);

  if (loading || !result) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-zinc-600 text-xs tracking-widest uppercase">{t.result.loading}</div>
      </div>
    );
  }

  const primaryData = archetypeContents[result.primary.id];
  const secondaryData = archetypeContents[result.secondary.id];

  if (!primaryData || !secondaryData) return null;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center selection:bg-zinc-800 pb-24 font-sans">
      <ResultHero archetype={primaryData} />
      <PatternOverview dimensions={result.dimensions as any} />
      <DefinesYou archetype={primaryData} />
      <BlindSpot archetype={primaryData} />
      <Relationships archetype={primaryData} />
      <UnderPressure archetype={primaryData} />
      <Contradiction archetype={primaryData} />
      <SecondaryArchetype secondaryArchetype={secondaryData} similarity={result.secondary.similarity} />
      <ProfileConfidence confidence={result.confidence} />
      <DeepProfileCTA />
      
      {publicToken && (
        <ShareButton publicToken={publicToken} archetypeId={result.primary.id} />
      )}
    </div>
  );
}
