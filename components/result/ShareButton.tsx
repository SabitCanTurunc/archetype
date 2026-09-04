"use client";

import React, { useState } from 'react';
import { useTranslation } from '@/lib/i18n/useTranslation';
import { ShareModal } from '@/components/result/ShareModal';

interface ShareButtonProps {
  publicToken: string;
  archetypeId: string;
}

export const ShareButton: React.FC<ShareButtonProps> = ({ publicToken, archetypeId }) => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="w-full flex justify-center py-16 px-6 relative z-10">
        <button 
          onClick={() => {
            console.log("[Analytics] result_share_clicked");
            setIsModalOpen(true);
          }}
          className="text-zinc-400 text-xs tracking-widest uppercase border border-zinc-800 px-8 py-4 hover:border-zinc-400 hover:text-zinc-200 transition-colors bg-black"
        >
          {t.result.share.button}
        </button>
      </div>

      <ShareModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        publicToken={publicToken}
        archetypeId={archetypeId}
      />
    </>
  );
};
