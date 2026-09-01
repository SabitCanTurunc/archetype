"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { questions } from "@/lib/data/questions";
import { useLanguage } from "@/components/LanguageProvider";

export default function TestPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const t = {
    en: {
      processing: "Processing Behavioral Data",
      previous: "Previous",
      error_analyze: "An error occurred while analyzing your profile.",
      error_network: "Network error."
    },
    tr: {
      processing: "Davranışsal Veri İşleniyor",
      previous: "Önceki",
      error_analyze: "Profilin analiz edilirken bir hata oluştu.",
      error_network: "Bağlantı hatası."
    }
  }[language];

  const handleSelectOption = async (optionId: string) => {
    const newAnswers = { ...answers, [currentQuestion.id]: optionId };
    setAnswers(newAnswers);

    if (currentIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 300); // Slight delay for visual feedback
    } else {
      // Last question answered, submit
      await submitTest(newAnswers);
    }
  };

  const submitTest = async (finalAnswers: Record<string, string>) => {
    setIsSubmitting(true);
    
    const formattedAnswers = Object.entries(finalAnswers).map(([questionId, option]) => ({
      questionId,
      option
    }));

    try {
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: formattedAnswers })
      });

      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('archetypeResult', JSON.stringify(data.profile));
        router.push('/result?id=' + data.publicToken);
      } else {
        console.error(data.error);
        alert(t.error_analyze);
        setIsSubmitting(false);
      }
    } catch (err) {
      console.error(err);
      alert(t.error_network);
      setIsSubmitting(false);
    }
  };

  const goBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  if (isSubmitting) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6">
        <div className="w-16 h-16 border-t border-b border-zinc-500 rounded-full animate-spin"></div>
        <p className="mt-8 text-zinc-400 text-xs tracking-widest uppercase">{t.processing}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center p-6">
      {/* Progress Bar */}
      <div className="w-full max-w-2xl mt-8 mb-16">
        <div className="flex justify-between text-zinc-600 text-[10px] tracking-widest font-mono mb-4">
          <span>{String(currentIndex + 1).padStart(2, '0')} // {questions.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full h-[1px] bg-zinc-900 relative">
          <div 
            className="absolute top-0 left-0 h-full bg-zinc-500 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex-1 w-full max-w-2xl flex flex-col justify-center mb-20">
        <h2 className="text-white text-xl md:text-3xl font-light leading-relaxed mb-12">
          {currentQuestion.text[language]}
        </h2>

        <div className="flex flex-col gap-4">
          {currentQuestion.options.map((option) => {
            const isSelected = answers[currentQuestion.id] === option.id;
            
            return (
              <button
                key={option.id}
                onClick={() => handleSelectOption(option.id)}
                className={`w-full text-left p-6 md:p-8 border transition-all duration-300 ${
                  isSelected 
                    ? 'border-zinc-500 bg-zinc-900/50 text-white' 
                    : 'border-zinc-900 text-zinc-400 hover:border-zinc-700 hover:bg-zinc-900/20'
                }`}
              >
                <span className="text-sm md:text-base font-light tracking-wide">
                  {option.label[language]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="w-full max-w-2xl flex justify-between items-center mb-8">
        <button 
          onClick={goBack}
          disabled={currentIndex === 0}
          className={`text-xs tracking-widest uppercase transition-colors ${
            currentIndex === 0 ? 'text-zinc-800 cursor-not-allowed' : 'text-zinc-500 hover:text-white'
          }`}
        >
          {t.previous}
        </button>
      </div>
    </div>
  );
}
