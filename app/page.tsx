import Link from 'next/link';
import { Lock } from 'lucide-react';

import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 font-sans relative">
      <Link href="/login" className="absolute top-8 left-8 text-zinc-600 hover:text-white transition-colors duration-300">
        <Lock size={24} strokeWidth={1.5} />
      </Link>
      
      <div className="flex flex-col items-center mb-8">
        <Image
          src="/logopng.png"
          alt="Archetype Logo"
          width={150}
          height={150}
          className="mb-6 object-contain"
          priority
        />
        <h1 className="text-white font-light tracking-[0.4em] md:tracking-[0.8em] text-3xl md:text-5xl uppercase">
          Archetype
        </h1>
      </div>
    </div>
  );
}
