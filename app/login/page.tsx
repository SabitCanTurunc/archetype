"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { loginAction } from "@/app/actions/auth";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    
    startTransition(async () => {
      const result = await loginAction(formData);
      if (result?.error) {
        setError(result.error);
      } else if (result?.success) {
        router.push("/admin");
      }
    });
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 font-sans">
      <div className="w-full max-w-sm">
        <h1 className="text-white font-light tracking-[0.3em] text-2xl uppercase mb-10 text-center">
          Sistem Girişi
        </h1>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <input
            type="text"
            name="username"
            placeholder="Kullanıcı Adı"
            required
            className="bg-transparent border-b border-zinc-800 text-white px-4 py-3 outline-none focus:border-white transition-colors duration-300 placeholder:text-zinc-700"
          />
          <input
            type="password"
            name="password"
            placeholder="Şifre"
            required
            className="bg-transparent border-b border-zinc-800 text-white px-4 py-3 outline-none focus:border-white transition-colors duration-300 placeholder:text-zinc-700"
          />
          
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          
          <button
            type="submit"
            disabled={isPending}
            className="mt-6 px-8 py-4 bg-white text-black font-medium tracking-wider uppercase text-sm hover:bg-zinc-200 transition-colors duration-300 disabled:opacity-50"
          >
            {isPending ? "Giriş Yapılıyor..." : "Onayla"}
          </button>
        </form>
      </div>
    </div>
  );
}
