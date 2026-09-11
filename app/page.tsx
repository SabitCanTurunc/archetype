"use client";

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { 
  ObserverSymbol, StrategistSymbol, DiplomatSymbol, MaverickSymbol, EmpathSymbol, EnigmaSymbol 
} from '@/components/symbols/ArchetypeSymbols';
import { 
  ControlSymbol, SocialSymbol, DecisionSymbol, EmotionSymbol 
} from '@/components/symbols/DimensionSymbols';

/* ═══════════════════════════════════════════════════════════════
   TYPE SYSTEM — single source of truth, applied everywhere.
   ─────────────────────────────────────────────────────────────
   display  : hero headline
   heading  : section titles / archetype names
   sub      : italic subtitles
   body     : all body copy
   label    : ALL-CAPS section labels (mono)
   stat     : numbers / hints (mono)
═══════════════════════════════════════════════════════════════ */
const T = {
  display  : { fontSize: 'clamp(2.6rem, 7.5vw, 5rem)',   letterSpacing: '0.06em',  fontWeight: 300, lineHeight: 1.05 },
  heading  : { fontSize: 'clamp(1.5rem, 4vw,  2.6rem)',  letterSpacing: '0.08em',  fontWeight: 300, lineHeight: 1.1  },
  sub      : { fontSize: 'clamp(1rem,   2.8vw, 1.4rem)', letterSpacing: '0',       fontWeight: 300, lineHeight: 1.4  },
  body     : { fontSize: '0.95rem',                      letterSpacing: '0',       fontWeight: 300, lineHeight: 1.7  },
  label    : { fontSize: '0.6rem',                       letterSpacing: '0.32em',  fontWeight: 500, lineHeight: 1    },
  stat     : { fontSize: '0.65rem',                      letterSpacing: '0.22em',  fontWeight: 400, lineHeight: 1    },
} as const;

const T2 = {
  heading  : { fontSize: 'clamp(1.75rem, 5vw,  3.2rem)',  letterSpacing: '0.08em',  fontWeight: 300, lineHeight: 1.1  },
  sub      : { fontSize: 'clamp(1.15rem, 3.4vw, 1.7rem)', letterSpacing: '0',       fontWeight: 300, lineHeight: 1.4  },
  body     : { fontSize: '1.08rem',                       letterSpacing: '0',       fontWeight: 300, lineHeight: 1.7  },
  label    : { fontSize: '0.68rem',                       letterSpacing: '0.32em',  fontWeight: 500, lineHeight: 1    },
  stat     : { fontSize: '0.74rem',                       letterSpacing: '0.22em',  fontWeight: 400, lineHeight: 1    },
} as const;

/* ═══════════════════════════════════════════════════════════════
   FadeIn
═══════════════════════════════════════════════════════════════ */
const FadeIn = ({
  children,
  className = '',
  delay = 0,
  root,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  root?: React.RefObject<HTMLElement | null>;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; io.unobserve(el); } },
      { root: root?.current ?? null, threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [root]);

  return (
    <div ref={ref} className={className} style={{ opacity: 0, transform: 'translateY(22px)', transition: `opacity 800ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 800ms cubic-bezier(0.16,1,0.3,1) ${delay}ms` }}>
      {children}
    </div>
  );
};

export default function HomePage() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const { language } = useLanguage();

  const dict = {
    tr: {
      hero: {
        headline: 'SANDIĞINDAN\nDAHA\nÖNGÖRÜLEBİLİRSİN.',
        sub: 'Archetype; düşünme, karar verme, bağ kurma ve tepki verme şeklinin ardındaki tekrar eden örüntüleri keşfetmeye yönelik bir sistemdir.',
        cta: "KENDİ ARCHETYPE'INI KEŞFET",
      },
      whatIs: {
        label: '01',
        title: 'ARCHETYPE NEDİR?',
        b1: 'İnsan davranışları rastgele değildir.',
        b2: 'Verdiğin kararların, kurduğun ilişkilerin\nve verdiğin tepkilerin arkasında tekrar eden\nörüntüler vardır.',
        b3: 'Archetype, bu örüntüleri görünür hale\ngetirmek için tasarlanmış bir keşif sistemidir.',
      },
      dims: {
        label: '02',
        title: 'TEK BİR ETİKETTEN İBARET DEĞİLSİN.',
        sub: 'Seni dört farklı davranış ekseninde inceliyoruz.',
        items: [
          { title: 'KONTROL', desc: 'Belirsizlik karşısında kontrolü nasıl ele aldığın.', Icon: ControlSymbol },
          { title: 'SOSYAL',  desc: 'İnsanlarla nasıl bir mesafe ve bağ kurduğun.', Icon: SocialSymbol },
          { title: 'KARAR',   desc: 'Seçim yaparken mantık ve içgüdüyü nasıl dengelediğin.', Icon: DecisionSymbol },
          { title: 'DUYGU',   desc: 'Duygularını nasıl işlediğin ve ifade ettiğin.', Icon: EmotionSymbol },
        ],
      },
      arc: {
        label: '03',
        title: 'ALTI FARKLI ÖRÜNTÜ.',
        sub: 'İnsanlar dünyayı aynı şekilde algılamaz, karar vermez veya bağ kurmaz.\nArchetype, bu farklılıkları altı temel profil üzerinden keşfetmeni sağlar.',
        list: [
          { name: 'THE OBSERVER',   desc: 'Önce gözlemler.\nSonra harekete geçer.', Icon: ObserverSymbol },
          { name: 'THE STRATEGIST', desc: 'Belirsizliği analiz eder.\nHamlesini planlar.', Icon: StrategistSymbol },
          { name: 'THE DIPLOMAT',   desc: 'İnsanları ve aralarındaki\ndengeyi önemser.', Icon: DiplomatSymbol },
          { name: 'THE MAVERICK',   desc: 'Kendi yolunu seçer.\nSınırları zorlamaktan çekinmez.', Icon: MaverickSymbol },
          { name: 'THE EMPATH',     desc: 'Duyguları ve söylenmeyenleri\nfark etmeye eğilimlidir.', Icon: EmpathSymbol },
          { name: 'THE ENIGMA',     desc: 'Kendini kolay açmaz.\nÖnce gözlemler, sonra seçer.', Icon: EnigmaSymbol },
        ],
      },
      how: {
        label: '04',
        title: 'NASIL ÇALIŞIR?',
        steps: [
          { n: '01', t: 'CEVAPLA',   d: '12 soru.\nDoğru veya yanlış cevap yok.' },
          { n: '02', t: 'ANALİZ ET', d: 'Cevapların dört davranış\nekseninde değerlendirilir.' },
          { n: '03', t: 'KEŞFET',    d: 'Sana en yakın Archetype\'ı\nve ikincil örüntünü keşfet.' },
        ],
      },
      why: {
        label: '05',
        title: 'NEDEN 12 SORU?',
        b1: 'Çünkü her şeyi bilmemize gerek yok.',
        b2: 'İlk profil, hikâyenin tamamını anlatmak için değil;\nörüntünün ana hatlarını ortaya çıkarmak için tasarlandı.',
        stat: '12 soru. Yaklaşık 2 dakika.',
      },
      preview: {
        label: '06',
        title: 'ÖRNEK SONUÇ',
        name: 'THE OBSERVER',
        desc: 'Önce gözlemler.\nSonra harekete geçer.',
        stats: [
          { l: 'KONTROL', v: 'YÜKSEK' },
          { l: 'SOSYAL',  v: 'SEÇİCİ' },
          { l: 'KARAR',   v: 'ANALİTİK' },
          { l: 'DUYGU',   v: 'TEMKİNLİ' },
        ],
        blindSpot: 'Gözlem bazen harekete geçmeyi ertelemeye dönüşebilir.',
      },
      share: {
        label: '07',
        title: 'SONUCUNU PAYLAŞ.',
        desc: "Archetype'ını keşfettikten sonra\nsonucunu paylaşabilirsin.\n\nPeki seni gören biri\nhangi Archetype'a sahip?",
        name: 'THE OBSERVER',
        s_desc: 'Önce gözlemler.\nSonra harekete geçer.'
      },
      ctaFinal: {
        label: '08',
        title: 'PEKİ SEN HANGİSİSİN?',
        sub: "12 soruda kendi Archetype'ını keşfet.",
        btn: "ARCHETYPE'INI KEŞFET",
        stat: 'Yaklaşık 2 dakika · Ücretsiz',
      },
    },
    en: {
      hero: {
        headline: 'YOU ARE MORE\nPREDICTABLE\nTHAN YOU THINK.',
        sub: 'Archetype is a system designed to explore the recurring patterns behind how you think, decide, connect, and react.',
        cta: "DISCOVER YOUR ARCHETYPE",
      },
      whatIs: {
        label: '01',
        title: 'WHAT IS ARCHETYPE?',
        b1: 'Human behavior is not random.',
        b2: 'There are recurring patterns behind the choices you make,\nthe relationships you build, and the reactions you have.',
        b3: 'Archetype is an exploration system designed\nto make these patterns visible.',
      },
      dims: {
        label: '02',
        title: 'YOU ARE MORE THAN A SINGLE LABEL.',
        sub: 'We analyze you across four different behavioral dimensions.',
        items: [
          { title: 'CONTROL', desc: 'How you handle control in the face of uncertainty.', Icon: ControlSymbol },
          { title: 'SOCIAL',  desc: 'How you establish distance and connection with people.', Icon: SocialSymbol },
          { title: 'DECISION',desc: 'How you balance logic and instinct when making choices.', Icon: DecisionSymbol },
          { title: 'EMOTION', desc: 'How you process and express your emotions.', Icon: EmotionSymbol },
        ],
      },
      arc: {
        label: '03',
        title: 'SIX DIFFERENT PATTERNS.',
        sub: 'People do not perceive the world, make decisions, or connect in the same way.\nArchetype lets you explore these differences through six core profiles.',
        list: [
          { name: 'THE OBSERVER',   desc: 'Observes first.\nActs later.', Icon: ObserverSymbol },
          { name: 'THE STRATEGIST', desc: 'Analyzes uncertainty.\nPlans their move.', Icon: StrategistSymbol },
          { name: 'THE DIPLOMAT',   desc: 'Cares about people and\nthe balance between them.', Icon: DiplomatSymbol },
          { name: 'THE MAVERICK',   desc: 'Chooses their own path.\nNot afraid to push boundaries.', Icon: MaverickSymbol },
          { name: 'THE EMPATH',     desc: 'Tends to notice emotions\nand the unspoken.', Icon: EmpathSymbol },
          { name: 'THE ENIGMA',     desc: 'Does not open up easily.\nObserves first, chooses later.', Icon: EnigmaSymbol },
        ],
      },
      how: {
        label: '04',
        title: 'HOW DOES IT WORK?',
        steps: [
          { n: '01', t: 'ANSWER',   d: '12 questions.\nNo right or wrong answers.' },
          { n: '02', t: 'ANALYZE',  d: 'Your answers are evaluated\nacross four behavioral dimensions.' },
          { n: '03', t: 'DISCOVER', d: 'Discover the Archetype closest to you\nand your secondary pattern.' },
        ],
      },
      why: {
        label: '05',
        title: 'WHY 12 QUESTIONS?',
        b1: 'Because we don\'t need to know everything.',
        b2: 'The initial profile is not designed to tell the whole story;\nit\'s designed to outline the main contours of your pattern.',
        stat: '12 questions. Approximately 2 minutes.',
      },
      preview: {
        label: '06',
        title: 'SAMPLE RESULT',
        name: 'THE OBSERVER',
        desc: 'Observes first.\nActs later.',
        stats: [
          { l: 'CONTROL', v: 'HIGH' },
          { l: 'SOCIAL',  v: 'SELECTIVE' },
          { l: 'DECISION',v: 'ANALYTICAL' },
          { l: 'EMOTION', v: 'CAUTIOUS' },
        ],
        blindSpot: 'Observation can sometimes turn into delaying action.',
      },
      share: {
        label: '07',
        title: 'SHARE YOUR RESULT.',
        desc: "After discovering your Archetype,\nyou can share your result.\n\nWhich Archetype does someone\nlooking at you have?",
        name: 'THE OBSERVER',
        s_desc: 'Observes first.\nActs later.'
      },
      ctaFinal: {
        label: '08',
        title: 'SO WHICH ONE ARE YOU?',
        sub: "Discover your Archetype in 12 questions.",
        btn: "DISCOVER YOUR ARCHETYPE",
        stat: 'Approximately 2 minutes · Free',
      },
    }
  };

  const t = dict[language] || dict['tr'];

  return (
    <div
      ref={scrollRef}
      className="h-svh overflow-y-scroll snap-y snap-mandatory bg-black text-zinc-100"
      style={{ WebkitFontSmoothing: 'antialiased' }}
    >
      <style jsx global>{`
        .accent-path {
          stroke: transparent;
        }
        .group:hover .accent-path {
          stroke: #E65100;
        }
      `}</style>

      {/* ══════════ 01 HERO ══════════ */}
      <section className="snap-start min-h-svh flex flex-col items-center justify-center px-6 relative py-32 text-center border-b border-zinc-900/50">
        <div className="w-full max-w-3xl mx-auto flex flex-col items-center z-10">
          <FadeIn root={scrollRef}>
            <h1 className="text-white uppercase whitespace-pre-line mb-8" style={T.display}>
              {t.hero.headline}
            </h1>
          </FadeIn>
          <FadeIn root={scrollRef} delay={100}>
            <p className="text-zinc-400 max-w-sm mx-auto mb-12" style={T.body}>
              {t.hero.sub}
            </p>
          </FadeIn>
          <FadeIn root={scrollRef} delay={200}>
            <Link
              href="/test"
              className="inline-flex items-center justify-center bg-black/40 backdrop-blur-sm border border-zinc-700 text-white hover:border-[#E65100] hover:text-[#E65100] transition-all duration-400 px-8 py-4"
              style={T2.stat}
            >
              {t.hero.cta}
            </Link>
          </FadeIn>
        </div>

        <button
          onClick={() => { const el = scrollRef.current; if (el) el.scrollTo({ top: el.clientHeight, behavior: 'smooth' }); }}
          aria-label="Scroll down"
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center group cursor-pointer"
        >
          <svg className="w-5 h-5 text-zinc-600 group-hover:text-zinc-400 transition-colors duration-500" style={{ animation: 'bounce 2s ease-in-out infinite' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </section>

      {/* ══════════ 02 ARCHETYPE NEDİR? ══════════ */}
      <section className="snap-start min-h-svh flex flex-col justify-center px-6 md:px-12 py-32 relative border-b border-zinc-900/50 overflow-hidden">
        {/* Subtle geometric background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 10px 10px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        
        <div className="w-full max-w-5xl mx-auto z-10">
          <FadeIn root={scrollRef}>
             <p className="font-mono text-zinc-600 mb-4" style={T2.label}>{t.whatIs.label}</p>
          </FadeIn>
          <div className="flex flex-col md:flex-row gap-12 md:gap-24">
            <div className="md:w-1/2">
              <FadeIn root={scrollRef} delay={100}>
                <h2 className="text-white uppercase" style={T2.heading}>{t.whatIs.title}</h2>
              </FadeIn>
            </div>
            <div className="md:w-1/2 flex flex-col gap-6">
              <FadeIn root={scrollRef} delay={200}>
                <p className="text-zinc-300" style={T2.sub}>{t.whatIs.b1}</p>
              </FadeIn>
              <FadeIn root={scrollRef} delay={300}>
                <p className="text-zinc-400 whitespace-pre-line" style={T.body}>{t.whatIs.b2}</p>
              </FadeIn>
              <FadeIn root={scrollRef} delay={400}>
                <p className="text-zinc-500 whitespace-pre-line" style={T.body}>{t.whatIs.b3}</p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ 03 DÖRT DAVRANIŞ EKSENİ ══════════ */}
      <section className="snap-start min-h-svh flex flex-col justify-center px-6 md:px-12 py-32 border-b border-zinc-900/50">
        <div className="w-full max-w-5xl mx-auto">
          <FadeIn root={scrollRef}>
            <p className="font-mono text-zinc-600 mb-4" style={T2.label}>{t.dims.label}</p>
            <h2 className="text-white uppercase mb-4" style={T2.heading}>{t.dims.title}</h2>
            <p className="text-zinc-400 italic mb-16" style={T2.sub}>{t.dims.sub}</p>
          </FadeIn>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {t.dims.items.map((d, i) => (
              <FadeIn key={d.title} root={scrollRef} delay={i * 100}>
                <div className="group flex flex-col items-start text-left">
                  <div className="w-12 h-12 mb-6 text-zinc-300 group-hover:text-white transition-colors duration-500">
                    <d.Icon className="w-full h-full" />
                  </div>
                  <h3 className="font-mono text-zinc-200 uppercase mb-3" style={T2.label}>{d.title}</h3>
                  <p className="text-zinc-500" style={T.body}>{d.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 04 ALTI FARKLI ÖRÜNTÜ ══════════ */}
      <section className="snap-start min-h-svh flex flex-col justify-center px-6 md:px-12 py-32 border-b border-zinc-900/50">
        <div className="w-full max-w-6xl mx-auto">
          <FadeIn root={scrollRef}>
            <p className="font-mono text-zinc-600 mb-4 text-center" style={T2.label}>{t.arc.label}</p>
            <h2 className="text-white uppercase mb-6 text-center" style={T2.heading}>{t.arc.title}</h2>
            <p className="text-zinc-400 italic text-center mb-20 whitespace-pre-line max-w-2xl mx-auto" style={T2.sub}>{t.arc.sub}</p>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.arc.list.map((a, i) => (
              <FadeIn key={a.name} root={scrollRef} delay={i * 100}>
                <div className="group relative flex flex-col p-10 bg-black border border-zinc-800/60 hover:border-zinc-500 transition-colors duration-700 overflow-hidden h-full">
                  <div className="w-10 h-10 mb-12 text-zinc-400 group-hover:text-white transition-colors duration-500">
                    <a.Icon className="w-full h-full" />
                  </div>
                  <div className="mt-auto">
                    <h3 className="font-serif text-white uppercase mb-4 text-xl tracking-wider">{a.name}</h3>
                    <p className="text-zinc-500 whitespace-pre-line font-light" style={T.body}>{a.desc}</p>
                  </div>
                  <div className="absolute bottom-6 right-6 font-mono text-zinc-700" style={T.stat}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 05 NASIL ÇALIŞIR? ══════════ */}
      <section className="snap-center py-32 px-6 md:px-12 flex justify-center border-b border-zinc-900/50">
        <div className="w-full max-w-md mx-auto relative text-center flex flex-col items-center">
          <FadeIn root={scrollRef}>
            <p className="font-mono text-zinc-600 mb-4" style={T2.label}>{t.how.label}</p>
            <h2 className="text-white uppercase mb-16" style={T2.heading}>{t.how.title}</h2>
          </FadeIn>

          <div className="relative flex flex-col items-center gap-16 w-full">
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-zinc-900 z-0" />
            {t.how.steps.map((s, i) => (
              <FadeIn key={s.n} root={scrollRef} delay={i * 150} className="relative z-10 w-full bg-black py-4 flex flex-col items-center">
                <div className="w-2 h-2 rounded-full bg-[#E65100] mb-6" />
                <div className="font-mono text-zinc-600 mb-2" style={T.stat}>{s.n}</div>
                <h3 className="font-mono text-white uppercase mb-3" style={T2.label}>{s.t}</h3>
                <p className="text-zinc-400 whitespace-pre-line" style={T.body}>{s.d}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 06 NEDEN 12 SORU? ══════════ */}
      <section className="snap-center py-32 px-6 text-center border-b border-zinc-900/50 bg-zinc-950">
        <div className="w-full max-w-xl mx-auto">
          <FadeIn root={scrollRef}>
            <p className="font-mono text-zinc-600 mb-4" style={T2.label}>{t.why.label}</p>
            <h2 className="text-white uppercase mb-8" style={T2.heading}>{t.why.title}</h2>
            <p className="text-zinc-300 mb-4" style={T2.sub}>{t.why.b1}</p>
            <p className="text-zinc-500 whitespace-pre-line mb-10" style={T.body}>{t.why.b2}</p>
            <p className="font-mono text-[#E65100] uppercase" style={T2.stat}>{t.why.stat}</p>
          </FadeIn>
        </div>
      </section>

      {/* ══════════ 07 ÖRNEK SONUÇ ══════════ */}
      <section className="snap-start min-h-svh flex flex-col items-center justify-center py-32 px-6 border-b border-zinc-900/50">
        <div className="w-full max-w-sm mx-auto">
          <FadeIn root={scrollRef} className="text-center mb-12">
            <p className="font-mono text-zinc-600 mb-4" style={T2.label}>{t.preview.label}</p>
            <h2 className="font-mono text-zinc-500 tracking-widest uppercase text-xs">ÖRNEK SONUÇ</h2>
          </FadeIn>
          
          <FadeIn root={scrollRef} delay={200}>
            <div className="border border-zinc-800 bg-black p-8 md:p-10">
              <div className="text-center mb-10">
                <p className="font-mono text-zinc-600 mb-6" style={T.label}>ARCHETYPE</p>
                <h3 className="font-serif text-white uppercase text-2xl tracking-wider mb-4">{t.preview.name}</h3>
                <p className="text-zinc-500 font-light italic whitespace-pre-line" style={T.body}>{t.preview.desc}</p>
              </div>

              <div className="h-px w-full bg-zinc-800 mb-8" />

              <div className="flex flex-col gap-4 mb-8">
                {t.preview.stats.map(s => (
                  <div key={s.l} className="flex justify-between items-center">
                    <span className="font-mono text-zinc-500" style={T.stat}>{s.l}</span>
                    <span className="font-mono text-white" style={T.stat}>{s.v}</span>
                  </div>
                ))}
              </div>

              <div className="h-px w-full bg-zinc-800 mb-8" />

              <div className="text-center">
                <p className="font-mono text-zinc-600 mb-4" style={T.label}>KÖR NOKTAN</p>
                <p className="text-zinc-400 font-light" style={T.body}>{t.preview.blindSpot}</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════ 08 SONUCUNU PAYLAŞ ══════════ */}
      <section className="snap-start min-h-svh flex flex-col justify-center px-6 md:px-12 py-32 border-b border-zinc-900/50">
        <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-24">
          <div className="md:w-1/2 text-center md:text-left">
            <FadeIn root={scrollRef}>
              <p className="font-mono text-zinc-600 mb-4" style={T2.label}>{t.share.label}</p>
              <h2 className="text-white uppercase mb-8" style={T2.heading}>{t.share.title}</h2>
              <p className="text-zinc-400 whitespace-pre-line" style={T.body}>{t.share.desc}</p>
            </FadeIn>
          </div>
          <div className="md:w-1/2 w-full max-w-xs mx-auto">
            <FadeIn root={scrollRef} delay={200}>
              <div className="border border-zinc-800 bg-black p-8 flex flex-col items-center justify-center aspect-[4/5] relative">
                <div className="absolute top-8 font-mono text-zinc-600" style={T.label}>ARCHETYPE</div>
                <div className="w-12 h-12 text-white mb-8"><ObserverSymbol className="w-full h-full" /></div>
                <h3 className="font-serif text-white uppercase text-xl tracking-wider mb-4 text-center">{t.share.name}</h3>
                <p className="text-zinc-500 font-light italic text-center whitespace-pre-line" style={T.body}>{t.share.s_desc}</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══════════ 09 FINAL CTA ══════════ */}
      <section className="snap-start min-h-svh flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 10px 10px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="w-full max-w-2xl mx-auto relative z-10">
          <FadeIn root={scrollRef}>
            <p className="font-mono text-zinc-600 mb-6" style={T2.label}>{t.ctaFinal.label}</p>
            <h2 className="text-white uppercase mb-6" style={T2.heading}>{t.ctaFinal.title}</h2>
            <p className="text-zinc-400 italic mb-12" style={T2.sub}>{t.ctaFinal.sub}</p>
            <Link
              href="/test"
              className="inline-flex items-center justify-center bg-white text-black hover:bg-zinc-200 transition-colors duration-400 px-10 py-5 font-mono text-sm tracking-widest uppercase"
            >
              {t.ctaFinal.btn}
            </Link>
            <p className="font-mono text-zinc-600 mt-8" style={T.stat}>{t.ctaFinal.stat}</p>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
