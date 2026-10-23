/**
 * @author Muhammad Arif Budiman - [https://github.com/BlackCoffeee]
 * @createAt 2026-10-24
 */
'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Lock, Mail, AlertCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMsg, setErrorMsg] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setErrorMsg('Email atau kata sandi tidak valid. Silakan coba kembali.');
      } else {
        router.push('/admin/dashboard');
        router.refresh();
      }
    } catch {
      setErrorMsg('Terjadi gangguan jaringan atau server autentikasi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#070C16] text-slate-100 p-4">
      <div className="w-full max-w-md bg-[#131F33] border border-[#22324F] rounded-lg p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded bg-amber-500 text-slate-950 font-bold flex items-center justify-center mx-auto text-base">
            SM
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            Panel Administrasi PMB
          </h1>
          <p className="text-xs text-slate-400">
            Masuk untuk mengelola periode, kurikulum prodi, tarif trimester, dan jalur seleksi.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 rounded bg-red-950/60 border border-red-800 text-red-300 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 block">
              Alamat Email Staf
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@unism.ac.id"
                className="w-full bg-[#0A1220] border border-[#22324F] rounded-md py-2.5 pl-9 pr-3 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 block">
              Kata Sandi
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#0A1220] border border-[#22324F] rounded-md py-2.5 pl-9 pr-3 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-2.5 rounded-md flex items-center justify-center gap-2"
          >
            <span>{loading ? 'Memverifikasi...' : 'Masuk Panel Admin'}</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </form>

        <div className="pt-4 border-t border-[#22324F] text-center">
          <a
            href="/"
            className="text-xs text-sky-400 hover:text-sky-300 font-semibold"
          >
            Kembali ke Portal Publik PMB
          </a>
        </div>
      </div>
    </div>
  );
}
