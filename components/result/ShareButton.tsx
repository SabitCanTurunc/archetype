"use client";

import React from 'react';
import { useTranslation } from '@/lib/i18n/useTranslation';

interface ShareButtonProps {
  publicToken: string;
}

export const ShareButton: React.FC<ShareButtonProps> = ({ publicToken }) => {
  const { t } = useTranslation();

  const handleShare = async () => {
    console.log("[Analytics] result_share_clicked");
    const url = `${window.location.origin}/result?id=${publicToken}`;
    const text = t.result.share.text;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: t.result.share.title,
          text: text,
          url: url,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        alert(t.result.share.copied);
      } catch (err) {
        console.error(t.result.share.error, err);
      }
    }
  };

  return (
    <div className="w-full flex justify-center py-16 px-6">
      <button 
        onClick={handleShare}
        className="text-zinc-400 text-xs tracking-widest uppercase border border-zinc-800 px-8 py-4 hover:border-zinc-400 hover:text-zinc-200 transition-colors"
      >
        {t.result.share.button}
      </button>
    </div>
  );
};
