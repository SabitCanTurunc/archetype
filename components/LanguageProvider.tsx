"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Language = "en" | "tr";

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Check local storage first
    const stored = localStorage.getItem("archetype_lang") as Language;
    if (stored === "en" || stored === "tr") {
      setLanguageState(stored);
    } else {
      // Auto-detect based on browser language
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith("tr")) {
        setLanguageState("tr");
      }
    }
    setMounted(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("archetype_lang", lang);
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "tr" : "en");
  };

  // Avoid hydration mismatch by not rendering anything until mounted
  if (!mounted) {
    return <div className="min-h-screen bg-black" />; // placeholder
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();
  return (
    <button 
      onClick={toggleLanguage}
      className="fixed top-8 right-8 z-50 text-xs tracking-widest uppercase text-zinc-500 hover:text-white transition-colors px-3 py-1 border border-zinc-800 hover:border-zinc-500 rounded-full bg-black/50 backdrop-blur-sm"
    >
      {language === 'en' ? 'TR' : 'EN'}
    </button>
  );
}
