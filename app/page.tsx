"use client";

import Link from 'next/link';
import { Lock, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export default function HomePage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setMessage(data.message || 'Profil işleniyor. Sistem onayı bekleniyor.');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Bir hata oluştu.');
      }
    } catch (err) {
      setStatus('error');
      setMessage('Bağlantı hatası.');
    }

    setTimeout(() => {
      setStatus('idle');
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 font-sans relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-zinc-900/20 rounded-full blur-[120px] pointer-events-none"></div>

      <Link href="/login" className="absolute top-8 left-8 text-zinc-700 hover:text-white transition-colors duration-500 z-10">
        <Lock size={20} strokeWidth={1.5} />
      </Link>
      
      <div className="flex flex-col items-center mb-12 z-10 w-full max-w-md">
        <Image
          src="/logopng.png"
          alt="Archetype Logo"
          width={120}
          height={120}
          className="mb-8 object-contain opacity-90"
          priority
        />
        <h1 className="text-white font-light tracking-[0.5em] md:tracking-[0.8em] text-2xl md:text-4xl uppercase mb-2 text-center">
          Archetype
        </h1>
        <p className="text-zinc-500 text-sm tracking-widest uppercase mb-12 text-center">
          Profil Analizi ve Davranış Bilimi
        </p>

        <div className="w-full relative">
          <form onSubmit={handleSubmit} className="relative flex items-center w-full group">
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ANALİZ AĞINA ERİŞİM (E-POSTA)" 
              required
              className="w-full bg-transparent border-b border-zinc-800 text-zinc-300 placeholder:text-zinc-700 text-xs tracking-widest uppercase py-4 px-2 outline-none focus:border-zinc-500 transition-colors duration-500"
            />
            <button 
              type="submit" 
              className="absolute right-0 text-zinc-600 hover:text-white transition-colors duration-500 p-2"
            >
              <ArrowRight size={18} strokeWidth={1.5} />
            </button>
          </form>
          
          {/* Decorative scanner line effect */}
          <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-white group-focus-within:w-full transition-all duration-700 ease-out"></div>
        </div>

        <div className={`mt-6 text-xs tracking-widest uppercase transition-all duration-500 ${status !== 'idle' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'} ${status === 'error' ? 'text-red-500' : 'text-zinc-400'}`}>
          {status === 'loading' ? 'İşlem yapılıyor...' : message}
        </div>
      </div>

      <div className="absolute bottom-8 text-zinc-800 text-[10px] tracking-widest uppercase font-mono z-10 text-center">
        DAVRANIŞ ANALİZ MOTORU // {new Date().getFullYear()} // KISITLI ERİŞİM
      </div>
    </div>
  );
}
