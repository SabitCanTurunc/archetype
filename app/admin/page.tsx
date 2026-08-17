"use client";

import { useState, useTransition, useEffect } from 'react';
import { Copy, Check, RotateCw, LogOut, LayoutGrid, Users } from 'lucide-react';
import { logoutAction } from '@/app/actions/auth';
import { getWaitlistEntries } from '@/app/actions/waitlist';

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

type WaitlistEntry = { _id: string; email: string; createdAt: string };

export default function ArchetypeAdmin() {
  const [activeTab, setActiveTab] = useState<'strategy' | 'requests'>('strategy');
  
  // Strategy State
  const [generatedState, setGeneratedState] = useState<{ title: string; prompt: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Waitlist State
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>([]);
  const [isLoadingWaitlist, setIsLoadingWaitlist] = useState(false);

  useEffect(() => {
    if (activeTab === 'requests') {
      setIsLoadingWaitlist(true);
      getWaitlistEntries().then(data => {
        setWaitlist(data);
        setIsLoadingWaitlist(false);
      });
    }
  }, [activeTab]);

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
    <div className="min-h-screen bg-black flex font-sans text-zinc-300">
      
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-800 flex flex-col justify-between">
        <div>
          <div className="p-8 border-b border-zinc-800">
            <h1 className="text-white font-light tracking-[0.4em] uppercase text-xl">Archetype</h1>
            <p className="text-xs text-zinc-600 mt-2 tracking-widest uppercase">Admin Terminal</p>
          </div>

          <nav className="p-4 flex flex-col gap-2">
            <button
              onClick={() => setActiveTab('strategy')}
              className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors duration-300 uppercase tracking-widest text-xs font-medium ${
                activeTab === 'strategy' ? 'bg-zinc-900 text-orange-600' : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50'
              }`}
            >
              <LayoutGrid size={16} strokeWidth={2} />
              Strateji Belirle
            </button>
            
            <button
              onClick={() => setActiveTab('requests')}
              className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors duration-300 uppercase tracking-widest text-xs font-medium ${
                activeTab === 'requests' ? 'bg-zinc-900 text-orange-600' : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50'
              }`}
            >
              <Users size={16} strokeWidth={2} />
              Kullanıcı İstekleri
            </button>
          </nav>
        </div>

        <div className="p-4 border-t border-zinc-800">
          <button
            onClick={() => startTransition(() => { logoutAction() })}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-md text-zinc-600 hover:text-white transition-colors duration-300 uppercase tracking-widest text-xs font-medium"
          >
            <LogOut size={16} strokeWidth={2} />
            Çıkış Yap
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 md:p-16 overflow-y-auto relative flex flex-col">
        {activeTab === 'strategy' && (
          <div className="flex-1 flex flex-col items-center justify-center">
            {!generatedState ? (
              <button
                onClick={handleGenerate}
                className="group relative px-12 py-6 bg-transparent border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-black transition-all duration-500 tracking-[0.3em] font-light text-xl md:text-2xl uppercase"
              >
                <span className="relative z-10">Stratejiyi Belirle</span>
                <div className="absolute inset-0 bg-orange-600/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </button>
            ) : (
              <div className="w-full max-w-3xl flex flex-col items-center animate-in fade-in zoom-in duration-700">
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
        )}

        {activeTab === 'requests' && (
          <div className="w-full max-w-4xl mx-auto animate-in fade-in duration-500">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-800">
              <h2 className="text-xl tracking-widest uppercase text-white font-light">Erişim İstekleri</h2>
              <span className="text-xs text-zinc-500 font-mono">Toplam: {waitlist.length}</span>
            </div>

            {isLoadingWaitlist ? (
              <div className="text-center py-20 text-zinc-600 tracking-widest uppercase text-sm">
                Veriler yükleniyor...
              </div>
            ) : waitlist.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-zinc-800 rounded-lg text-zinc-600 tracking-widest uppercase text-sm">
                Henüz kayıtlı kullanıcı yok.
              </div>
            ) : (
              <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-zinc-950 border-b border-zinc-800 text-zinc-500 text-xs uppercase tracking-widest">
                    <tr>
                      <th className="px-6 py-4 font-medium">E-Posta Adresi</th>
                      <th className="px-6 py-4 font-medium">Kayıt Tarihi</th>
                      <th className="px-6 py-4 font-medium text-right">Durum</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800">
                    {waitlist.map((entry) => (
                      <tr key={entry._id} className="hover:bg-zinc-800/50 transition-colors">
                        <td className="px-6 py-4 text-zinc-300 font-medium">{entry.email}</td>
                        <td className="px-6 py-4 text-zinc-500 font-mono text-xs">
                          {new Date(entry.createdAt).toLocaleString('tr-TR')}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-medium tracking-widest uppercase bg-orange-600/10 text-orange-500 border border-orange-600/20">
                            Beklemede
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
