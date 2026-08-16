"use client";

import { useState } from 'react';
import { Copy, Check, RotateCw } from 'lucide-react';

const postTypes = [
  {
    id: 1,
    title: "Karanlık Ayna (Reels)",
    themes: ["Yalnızlıktan güç almak", "Zekanın getirdiği izolasyon", "Gözlemcilik ve sessizlik", "Sahte kalabalıklar içindeki gerçeklik"],
    promptTemplate: `Sen dünyanın en üst düzey, premium ve gizemli psikolojik analiz markası olan 'Archetype'ın metin yazarısın. 
Bana bir Instagram Reels videosu için içerik hazırla. Konu teması: [TEMA_BURAYA_GELECEK]. 
Bana şunları ver:
1. Ekranda belirecek vurucu 2-3 cümlelik metin.
2. Arka plan stok video konsepti (karanlık olmalı).
3. Müzik tarzı.
4. 2 cümlelik açıklama (caption) ve 3 hashtag. Sonunda her zaman 'Sistem şu an kapalı. Bekleme listesi için profili incele.' yazsın.`
  },
  {
    id: 2,
    title: "Sessiz Otorite (Aforizma Postu)",
    themes: ["Maskeler ve statü", "İnsan doğasının karanlık tarafı", "Ego ve illüzyon", "Kalabalıkların aptallığı"],
    promptTemplate: `Sen ulaşılamaz ve üst düzey bir kişisel profilleme kulübü olan 'Archetype' için çalışıyorsun. Markamız 'sessiz lüks' konseptini benimsiyor.
Bana Instagram'da tekli fotoğraf olarak paylaşılacak bir aforizma hazırla. Konu teması: [TEMA_BURAYA_GELECEK]. Ucuz kişisel gelişim sözlerine benzememeli.
Bana şunları ver:
1. Görselin tam ortasında yazacak tek vurucu cümle.
2. Caption kısmına yazılacak destekleyici, soğuk felsefi tek bir cümle.
3. Caption sonuna 'Analiz No: [RASTGELE_4_HANELİ_SAYI]' formatında bir mühür numarası.`
  },
  {
    id: 3,
    title: "Kıtlık İllüzyonu (FOMO Story)",
    themes: ["Sadece 50 kişilik yeni kontenjan", "Veritabanı temizliği ve yeni alımlar", "Bekleme listesinden rastgele seçim", "Sistem kapıları 2 saatliğine açıldı"],
    promptTemplate: `Archetype markası için FOMO (Fırsatı kaçırma korkusu) yaratacak bir Instagram Story konsepti oluştur. 
Senaryo: [TEMA_BURAYA_GELECEK].
Bana şunları ver:
1. Hikayenin merkezinde yazacak kısa, elit bildirim metni.
2. Link Çıkartmasının (Sticker) üzerinde yazması gereken eylem çağrısı (Örn: 'Sorgula').
3. Görselin arka planı için estetik bir talimat (Örn: simsiyah, ufak turuncu detaylar).`
  }
];

export default function ArchetypeStrategyGenerator() {
  const [generatedState, setGeneratedState] = useState<{ title: string; prompt: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    const randomType = postTypes[Math.floor(Math.random() * postTypes.length)];
    const randomTheme = randomType.themes[Math.floor(Math.random() * randomType.themes.length)];
    const filledPrompt = randomType.promptTemplate.replace('[TEMA_BURAYA_GELECEK]', randomTheme);
    
    setGeneratedState({
      title: randomType.title,
      prompt: filledPrompt
    });
    setCopied(false);
  };

  const handleCopy = async () => {
    if (generatedState) {
      await navigator.clipboard.writeText(generatedState.prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 font-sans">
      {!generatedState ? (
        <button
          onClick={handleGenerate}
          className="group relative px-12 py-6 bg-transparent border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-black transition-all duration-500 tracking-[0.3em] font-light text-xl md:text-2xl uppercase"
        >
          <span className="relative z-10">Stratejiyi Belirle</span>
          <div className="absolute inset-0 bg-orange-600/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </button>
      ) : (
        <div className="w-full max-w-4xl flex flex-col items-center animate-in fade-in zoom-in duration-700">
          <h2 className="text-orange-600 font-light tracking-[0.2em] uppercase mb-10 text-2xl md:text-3xl text-center">
            {generatedState.title}
          </h2>
          
          <div className="w-full bg-zinc-900 border border-zinc-800 rounded-md p-8 mb-10 shadow-2xl relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-600/30 to-transparent"></div>
            <pre className="font-mono text-zinc-300 text-sm md:text-base whitespace-pre-wrap leading-relaxed overflow-x-auto">
              {generatedState.prompt}
            </pre>
          </div>

          <div className="flex gap-6">
            <button
              onClick={handleCopy}
              className="flex items-center justify-center gap-3 w-64 py-4 bg-orange-600 text-black hover:bg-orange-500 transition-colors duration-300 font-medium tracking-wider uppercase text-sm"
            >
              {copied ? (
                <>
                  <Check size={20} strokeWidth={1.5} />
                  Kopyalandı!
                </>
              ) : (
                <>
                  <Copy size={20} strokeWidth={1.5} />
                  Promptu Kopyala
                </>
              )}
            </button>
            <button
              onClick={handleGenerate}
              className="flex items-center justify-center w-16 py-4 bg-transparent border border-zinc-800 text-zinc-500 hover:text-orange-600 hover:border-orange-600 transition-colors duration-300"
              aria-label="Yeniden Üret"
            >
              <RotateCw size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
