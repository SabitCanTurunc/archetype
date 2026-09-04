"use client";

import Link from 'next/link';
import { useLanguage } from '@/components/LanguageProvider';
import { useEffect, useRef, useState } from 'react';

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
  heading  : { fontSize: 'clamp(1.5rem, 4vw,  2.6rem)',   letterSpacing: '0.08em',  fontWeight: 300, lineHeight: 1.1  },
  sub      : { fontSize: 'clamp(1rem,   2.8vw, 1.4rem)',   letterSpacing: '0',       fontWeight: 300, lineHeight: 1.4  },
  body     : { fontSize: '0.95rem',                        letterSpacing: '0',       fontWeight: 300, lineHeight: 1.7  },
  label    : { fontSize: '0.6rem',                         letterSpacing: '0.32em',  fontWeight: 500, lineHeight: 1    },
  stat     : { fontSize: '0.65rem',                        letterSpacing: '0.22em',  fontWeight: 400, lineHeight: 1    },
} as const;

/* Section 3+ — one step larger across the board */
const T2 = {
  heading  : { fontSize: 'clamp(1.75rem, 5vw,  3.2rem)',   letterSpacing: '0.08em',  fontWeight: 300, lineHeight: 1.1  },
  sub      : { fontSize: 'clamp(1.15rem, 3.4vw, 1.7rem)',  letterSpacing: '0',       fontWeight: 300, lineHeight: 1.4  },
  body     : { fontSize: '1.08rem',                         letterSpacing: '0',       fontWeight: 300, lineHeight: 1.7  },
  label    : { fontSize: '0.68rem',                         letterSpacing: '0.32em',  fontWeight: 500, lineHeight: 1    },
  stat     : { fontSize: '0.74rem',                         letterSpacing: '0.22em',  fontWeight: 400, lineHeight: 1    },
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

/* ═══════════════════════════════════════════════════════════════
   ArchetypeItem
═══════════════════════════════════════════════════════════════ */
const ArchetypeItem = ({ name, desc, idx, total, root }: { name: string; desc: string; idx: number; total: number; root: React.RefObject<HTMLElement | null>; }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { root: root.current, threshold: 0.7 });
    io.observe(el);
    return () => io.disconnect();
  }, [root]);

  return (
    <div ref={ref} className="snap-center h-svh w-full flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 transition-opacity duration-700" style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 70%)', opacity: active ? 1 : 0 }} />
      <div className="text-center z-10 w-full max-w-md">
        {/* counter */}
        <p className="font-mono text-zinc-700 mb-8 transition-all duration-500" style={{ ...T2.label, opacity: active ? 1 : 0.2 }}>
          {String(idx + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </p>
        {/* name */}
        <h3 className="font-light uppercase transition-all duration-600" style={{ ...T2.heading, color: active ? '#ffffff' : '#3f3f46', transform: active ? 'translateY(0)' : 'translateY(10px)' }}>
          {name}
        </h3>
        {/* desc */}
        <p className="font-light italic text-zinc-400 mt-5 transition-all duration-600" style={{ ...T2.body, opacity: active ? 1 : 0, transform: active ? 'translateY(0)' : 'translateY(12px)', transitionDelay: active ? '100ms' : '0ms' }}>
          {desc}
        </p>
        <div className="mx-auto mt-8 bg-zinc-600 transition-all duration-700" style={{ height: '1px', width: active ? '36px' : '0px', transitionDelay: active ? '200ms' : '0ms' }} />
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════ */
export default function HomePage() {
  const { language } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);

  const c = {
    en: {
      hero: {
        headline: 'You are more\npredictable than\nyou think.',
        sub: 'Archetype is a system for exploring the patterns behind the way you think, decide, connect and respond.',
      },
      whatIs: {
        label: 'WHAT IS ARCHETYPE?',
        title: 'ARCHETYPE IS NOT A TEST.',
        sub: 'It is a lens.',
        b1: 'A way of looking at the patterns that quietly shape your decisions, relationships and reactions.',
        b2: 'We turn your answers into a behavioral profile designed for reflection and self-discovery.',
      },
      dims: {
        label: 'WHAT DO WE LOOK AT?',
        items: [
          { title: 'CONTROL',  desc: 'How do you respond to uncertainty?' },
          { title: 'SOCIAL',   desc: 'How do you relate to people?' },
          { title: 'DECISION', desc: 'How do you make choices?' },
          { title: 'EMOTION',  desc: 'How do you process and express emotion?' },
        ],
      },
      how: {
        label: 'HOW IT WORKS',
        steps: [
          { n: '01', t: 'ANSWER',   d: '12 questions.\nNo right answers.' },
          { n: '02', t: 'ANALYZE',  d: 'Your responses are mapped across four behavioral dimensions.' },
          { n: '03', t: 'DISCOVER', d: 'Receive your primary and secondary Archetype.' },
        ],
      },
      why: {
        title: "Because we don't need to ask everything.",
        body: 'The first profile is designed to reveal the outline — not tell your entire story.',
        stat: '12 questions · ~2 minutes',
      },
      arc: {
        label: 'ARCHETYPES',
        intro: 'People think, decide, and connect in different ways.\nArchetype explores these repeating patterns across six distinct profiles.',
        list: [
          { name: 'THE OBSERVER',   desc: 'Observes first, acts later.' },
          { name: 'THE STRATEGIST', desc: 'Analyzes uncertainty, plans their move.' },
          { name: 'THE DIPLOMAT',   desc: 'Cares about people and the balance between them.' },
          { name: 'THE MAVERICK',   desc: "Chooses their own path, isn't afraid to push boundaries." },
          { name: 'THE EMPATH',     desc: 'Easily notices emotions and the unspoken.' },
          { name: 'THE ENIGMA',     desc: "Doesn't open up easily; observes, chooses, and deepens." },
        ],
      },
      cta: {
        s1: 'So which one are you?',
        s2: 'Discover your pattern in 12 questions.',
        btn: 'DISCOVER YOUR ARCHETYPE',
      },
      about: {
        label: 'ABOUT ARCHETYPE',
        lines: [
          { t: 'Archetype was created around a simple idea:', style: 'normal' },
          { t: 'Human behavior leaves patterns.',             style: 'highlight' },
          { t: 'We are interested in those patterns.',        style: 'normal' },
          { t: 'Not labels.\nNot diagnoses.\nNot fixed identities.', style: 'italic' },
          { t: 'Just the structures that appear in the way people think, choose, connect and react.', style: 'light' },
        ],
      },
    },
    tr: {
      hero: {
        headline: 'Sandığından\ndaha öngörülebilirsin.',
        sub: 'Archetype; düşünme, karar verme, bağ kurma ve tepki verme şeklinin ardındaki desenleri keşfetmeye yönelik bir sistemdir.',
      },
      whatIs: {
        label: 'ARCHETYPE NEDİR?',
        title: 'ARCHETYPE BİR TEST DEĞİLDİR.',
        sub: 'O bir mercektir.',
        b1: 'Kararlarınızı, ilişkilerinizi ve tepkilerinizi sessizce şekillendiren desenlere bakmanın bir yoludur.',
        b2: 'Yanıtlarınızı, içgörü ve kendini keşfetme amacıyla tasarlanmış davranışsal bir profile dönüştürüyoruz.',
      },
      dims: {
        label: 'NELERE BAKIYORUZ?',
        items: [
          { title: 'KONTROL', desc: 'Belirsizliğe nasıl tepki verirsin?' },
          { title: 'SOSYAL',  desc: 'İnsanlarla nasıl ilişki kurarsın?' },
          { title: 'KARAR',   desc: 'Nasıl seçim yaparsın?' },
          { title: 'DUYGU',   desc: 'Duygularını nasıl işler ve ifade edersin?' },
        ],
      },
      how: {
        label: 'NASIL ÇALIŞIR?',
        steps: [
          { n: '01', t: 'YANITLA',   d: '12 soru.\nDoğru cevap yok.' },
          { n: '02', t: 'ANALİZ ET', d: 'Yanıtların dört davranışsal boyutta haritalandırılır.' },
          { n: '03', t: 'KEŞFET',    d: 'Birincil ve ikincil Arketipini öğren.' },
        ],
      },
      why: {
        title: 'Çünkü her şeyi sormamıza gerek yok.',
        body: 'İlk profil, tüm hikayeni anlatmak için değil, ana hatları ortaya çıkarmak için tasarlandı.',
        stat: '12 soru · ~2 dakika',
      },
      arc: {
        label: "ARCHETYPE'lar",
        intro: 'İnsanlar farklı şekillerde düşünür, karar verir ve bağ kurar.\nArchetype, bu tekrar eden örüntüleri altı farklı profil üzerinden keşfeder.',
        list: [
          { name: 'THE OBSERVER',   desc: 'Önce gözlemler, sonra harekete geçer.' },
          { name: 'THE STRATEGIST', desc: 'Belirsizliği analiz eder, hamlesini planlar.' },
          { name: 'THE DIPLOMAT',   desc: 'İnsanları ve aralarındaki dengeyi önemser.' },
          { name: 'THE MAVERICK',   desc: 'Kendi yolunu seçer, sınırları zorlamaktan çekinmez.' },
          { name: 'THE EMPATH',     desc: 'Duyguları ve söylenmeyenleri kolayca fark eder.' },
          { name: 'THE ENIGMA',     desc: 'Kendini kolay açmaz; gözlemler, seçer ve derinleşir.' },
        ],
      },
      cta: {
        s1: 'Peki sen hangisisin?',
        s2: '12 soruda kendi örüntünü keşfet.',
        btn: "ARCHETYPE'INI KEŞFET",
      },
      about: {
        label: 'ARCHETYPE HAKKINDA',
        lines: [
          { t: 'Archetype basit bir fikir etrafında oluşturuldu:', style: 'normal' },
          { t: 'İnsan davranışı desenler bırakır.',                style: 'highlight' },
          { t: 'Biz bu desenlerle ilgileniyoruz.',                  style: 'normal' },
          { t: 'Etiketlerle değil.\nTeşhislerle değil.\nSabit kimliklerle değil.', style: 'italic' },
          { t: 'Sadece insanların düşünme, seçme, bağ kurma ve tepki verme biçimlerinde ortaya çıkan yapılarla.', style: 'light' },
        ],
      },
    },
  } as const;

  const t = c[language];

  /* ── reusable layout helpers ── */
  const sec   = 'snap-start h-svh w-full flex flex-col items-center justify-center px-5 md:px-10';
  const inner = 'w-full max-w-xl mx-auto';                   // centred content column
  const inner2 = 'w-full max-w-2xl mx-auto';                 // wider 2-col content

  return (
    <div
      ref={scrollRef}
      className="h-svh overflow-y-scroll snap-y snap-mandatory bg-black text-zinc-100"
      style={{ WebkitFontSmoothing: 'antialiased' }}
    >

      {/* ══════════ 1. HERO ══════════ */}
      <section className={`${sec} relative overflow-hidden text-center`}>
        <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(255,255,255,0.04) 0%, transparent 70%)' }} />

        <div className={`${inner} flex flex-col items-center relative z-10`}>
          <FadeIn root={scrollRef}>
            <h1 className="text-white uppercase whitespace-pre-line mb-7" style={T.display}>
              {t.hero.headline}
            </h1>
          </FadeIn>
          <FadeIn root={scrollRef} delay={140}>
            <p className="text-zinc-400 max-w-xs mx-auto" style={T.body}>
              {t.hero.sub}
            </p>
          </FadeIn>
        </div>

        {/* scroll arrow */}
        <button
          onClick={() => { const el = scrollRef.current; if (el) el.scrollTo({ top: el.clientHeight, behavior: 'smooth' }); }}
          aria-label="Scroll down"
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 group cursor-pointer"
        >
          <svg className="w-6 h-6 text-zinc-700 group-hover:text-zinc-400 transition-colors duration-500" style={{ animation: 'bounce 1.8s ease-in-out infinite' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
          <svg className="w-6 h-6 text-zinc-900 group-hover:text-zinc-700 transition-colors duration-500" style={{ animation: 'bounce 1.8s ease-in-out infinite', animationDelay: '180ms' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </section>

      {/* ══════════ 2. WHAT IS ARCHETYPE ══════════ */}
      <section className={`${sec} bg-zinc-950 text-center`}>
        <div className={inner}>
          <FadeIn root={scrollRef}>
            <p className="font-mono text-zinc-600 uppercase mb-8" style={T.label}>{t.whatIs.label}</p>
            <h2 className="text-white uppercase mb-4" style={T.heading}>{t.whatIs.title}</h2>
            <p className="text-zinc-400 italic mb-10" style={T.sub}>{t.whatIs.sub}</p>
          </FadeIn>
          <FadeIn root={scrollRef} delay={120}>
            <p className="text-zinc-300 mb-5" style={T.body}>{t.whatIs.b1}</p>
            <p className="text-zinc-400" style={T.body}>{t.whatIs.b2}</p>
          </FadeIn>
        </div>
      </section>

      {/* ══════════ 3. DIMENSIONS ══════════ */}
      <section className={sec}>
        <div className={inner2}>
          <FadeIn root={scrollRef}>
            <p className="font-mono text-zinc-600 uppercase text-center mb-12" style={T2.label}>{t.dims.label}</p>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-9">
            {t.dims.items.map((d, i) => (
              <FadeIn key={d.title} root={scrollRef} delay={i * 70}>
                <div className="border-l-2 border-zinc-800 pl-5 group hover:border-zinc-500 transition-colors duration-500">
                  <p className="font-mono text-zinc-600 group-hover:text-zinc-400 transition-colors duration-500 uppercase mb-3" style={T2.label}>{d.title}</p>
                  <p className="text-zinc-100" style={T2.sub}>{d.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 4. HOW IT WORKS ══════════ */}
      <section className={`${sec} bg-zinc-950 relative overflow-hidden`}>
        <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(255,255,255,0.025) 0%, transparent 70%)' }} />
        <div className={`${inner2} relative z-10`}>
          <FadeIn root={scrollRef}>
            <p className="font-mono text-zinc-600 uppercase text-center mb-12" style={T2.label}>{t.how.label}</p>
          </FadeIn>

          {/* Mobile: compact list */}
          <div className="flex flex-col gap-8 sm:hidden">
            {t.how.steps.map((s, i) => (
              <FadeIn key={s.n} root={scrollRef} delay={i * 90}>
                <div className="flex items-start gap-5">
                  <span className="font-bold text-zinc-800 select-none shrink-0" style={{ fontSize: '2.2rem', lineHeight: 1 }} aria-hidden>{s.n}</span>
                  <div>
                    <p className="font-mono text-white uppercase mb-2" style={T2.label}>{s.t}</p>
                    <p className="text-zinc-400 whitespace-pre-line" style={T2.body}>{s.d}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Desktop: 3-col */}
          <div className="hidden sm:grid grid-cols-3 gap-8">
            {t.how.steps.map((s, i) => (
              <FadeIn key={s.n} root={scrollRef} delay={i * 110}>
                <div>
                  <div className="font-bold text-zinc-900 select-none mb-4" style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)', lineHeight: 1 }} aria-hidden>{s.n}</div>
                  <p className="font-mono text-white uppercase mb-3" style={T2.label}>{s.t}</p>
                  <p className="text-zinc-400 whitespace-pre-line" style={T2.body}>{s.d}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 5. WHY 12 ══════════ */}
      <section className={`${sec} text-center`}>
        <div className={inner}>
          <FadeIn root={scrollRef}>
            <h2 className="text-white mb-6" style={T2.heading}>{t.why.title}</h2>
            <p className="text-zinc-400 mb-10" style={T2.body}>{t.why.body}</p>
            <p className="font-mono text-zinc-500 uppercase" style={T2.stat}>{t.why.stat}</p>
          </FadeIn>
        </div>
      </section>

      {/* ══════════ 6. ARCHETYPE INTRO ══════════ */}
      <section className={`${sec} bg-zinc-950 text-center`}>
        <div className={inner}>
          <FadeIn root={scrollRef}>
            <p className="font-mono text-zinc-600 uppercase mb-8" style={T2.label}>{t.arc.label}</p>
            <p className="text-zinc-300 whitespace-pre-line" style={T2.body}>{t.arc.intro}</p>
            <div className="mt-10 flex items-center justify-center gap-3 text-zinc-700">
              <div className="h-px w-6 bg-zinc-800" />
              <p className="font-mono uppercase" style={T2.label}>SCROLL TO EXPLORE</p>
              <div className="h-px w-6 bg-zinc-800" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════ 7–12. ARCHETYPE ITEMS ══════════ */}
      {t.arc.list.map((a, idx) => (
        <ArchetypeItem key={a.name} name={a.name} desc={a.desc} idx={idx} total={t.arc.list.length} root={scrollRef} />
      ))}

      {/* ══════════ 13. CTA ══════════ */}
      <section className={`${sec} text-center relative overflow-hidden`}>
        <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 40%, rgba(255,255,255,0.035) 0%, transparent 70%)' }} />
        <div className={`${inner} relative z-10`}>
          <FadeIn root={scrollRef}>
            <h2 className="text-white mb-4" style={T2.heading}>{t.cta.s1}</h2>
            <p className="text-zinc-400 italic mb-12" style={T2.sub}>{t.cta.s2}</p>
            <Link
              href="/test"
              className="inline-flex items-center justify-center bg-white text-black hover:bg-zinc-100 transition-colors duration-400 px-9 py-4"
              style={{ ...T2.stat, boxShadow: '0 0 48px rgba(255,255,255,0.1)' }}
            >
              {t.cta.btn}
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ══════════ 14. ABOUT ══════════ */}
      <section className={`${sec} bg-zinc-950`}>
        <div className="w-full max-w-sm mx-auto">
          <FadeIn root={scrollRef}>
            <p className="font-mono text-zinc-600 uppercase mb-10" style={T2.label}>{t.about.label}</p>
            <div className="space-y-5">
              {t.about.lines.map((line, i) => (
                <p
                  key={i}
                  className="whitespace-pre-line"
                  style={{
                    ...T2.body,
                    color: line.style === 'highlight' ? '#e4e4e7' : line.style === 'light' ? '#a1a1aa' : '#71717a',
                    fontStyle: line.style === 'italic' ? 'italic' : 'normal',
                    fontWeight: line.style === 'highlight' ? 400 : 300,
                  }}
                >
                  {line.t}
                </p>
              ))}
            </div>
            <p className="font-mono text-zinc-800 mt-14" style={{ ...T2.label, letterSpacing: '0.3em' }}>
              ARCHETYPE // BEHAVIORAL ANALYSIS SYSTEM
            </p>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}
