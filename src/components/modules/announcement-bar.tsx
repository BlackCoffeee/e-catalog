/**
 * @author Muhammad Arif Budiman - [https://github.com/BlackCoffeee]
 * @createAt 2026-10-24
 */
'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export function AnnouncementBar() {
  return (
    <div className="bg-[#0B1E30] text-slate-100 border-b border-[#1E3A8A]/30 py-2 px-4 text-xs font-medium">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <span className="bg-amber-500 text-slate-950 font-bold px-2 py-0.5 rounded text-[10px] tracking-wide">
            PMB 2027/2028
          </span>
          <span>
            Pendaftaran Mahasiswa Baru Tahun Akademik 2027/2028 Gelombang 1 Telah Dibuka.
          </span>
        </div>
        <Link
          href="/jalur-seleksi"
          className="text-amber-400 hover:text-amber-300 font-semibold inline-flex items-center gap-1 transition-colors group"
        >
          <span>Lihat Jalur Seleksi</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
