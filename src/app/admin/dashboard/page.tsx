/**
 * @author Muhammad Arif Budiman - [https://github.com/BlackCoffeee]
 * @createAt 2026-10-24
 */
import Link from 'next/link';
import {
  Calendar,
  GraduationCap,
  CreditCard,
  GitBranch,
  Plus,
  ArrowUpRight,
  CheckCircle,
} from 'lucide-react';
import { AdminAnalyticsCharts } from '@/components/admin/admin-analytics-charts';

export default async function AdminDashboardPage() {
  // Data analitik terstruktur untuk visualisasi Chart.js
  const mockTrafficTrends = {
    labels: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
    visitors: [142, 198, 230, 310, 280, 420, 390],
    leads: [18, 24, 35, 42, 38, 59, 52],
  };

  const mockFacultyDistribution = {
    labels: ['Kesehatan (FK)', 'Sains & Tek (FST)', 'Humaniora (FH)', 'Kedokteran Hewan (FKHB)'],
    counts: [45, 28, 18, 9],
  };

  const mockCtaConversions = {
    labels: ['Portal SPMB Online', 'Chat WA Admisi 1', 'Chat WA Admisi 2', 'Simulasi Biaya Trimester'],
    counts: [340, 215, 120, 480],
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            Ringkasan Operasional PMB
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Ikhtisar master data periode akademik, program studi, tarif per-trimester, dan jalur masuk.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/periods"
            className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground text-xs font-semibold px-3 py-2 rounded-md hover:opacity-90 transition-opacity"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Periode Baru</span>
          </Link>
          <Link
            href="/admin/tuitions"
            className="inline-flex items-center gap-1.5 bg-accent text-accent-foreground text-xs font-bold px-3 py-2 rounded-md hover:opacity-95 transition-opacity"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Entri Biaya</span>
          </Link>
        </div>
      </div>

      {/* 4 Kartu Status Ringkas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-lg border border-border bg-card space-y-3">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Periode Aktif
            </span>
            <Calendar className="w-4 h-4 text-amber-500" />
          </div>
          <div>
            <div className="text-2xl font-bold text-foreground">TA 2027/2028</div>
            <div className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-1">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Pendaftaran Berjalan</span>
            </div>
          </div>
        </div>

        <div className="p-5 rounded-lg border border-border bg-card space-y-3">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Program Studi
            </span>
            <GraduationCap className="w-4 h-4 text-sky-500" />
          </div>
          <div>
            <div className="text-2xl font-bold text-foreground tabular-nums">15</div>
            <p className="text-xs text-muted-foreground mt-1">
              4 Fakultas (FK, FST, FH, FKHB)
            </p>
          </div>
        </div>

        <div className="p-5 rounded-lg border border-border bg-card space-y-3">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Jalur Pendaftaran
            </span>
            <GitBranch className="w-4 h-4 text-emerald-500" />
          </div>
          <div>
            <div className="text-2xl font-bold text-foreground tabular-nums">4 Jalur</div>
            <p className="text-xs text-muted-foreground mt-1">
              Reguler, Prestasi, KIP, Mitra
            </p>
          </div>
        </div>

        <div className="p-5 rounded-lg border border-border bg-card space-y-3">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Skema Trimester
            </span>
            <CreditCard className="w-4 h-4 text-purple-500" />
          </div>
          <div>
            <div className="text-2xl font-bold text-foreground">Fase 1 & 2</div>
            <p className="text-xs text-muted-foreground mt-1">
              Smt 1-4 & Smt 5-8
            </p>
          </div>
        </div>
      </div>

      {/* Visual Analytics Charts (Chart.js) */}
      <AdminAnalyticsCharts
        trafficTrends={mockTrafficTrends}
        facultyDistribution={mockFacultyDistribution}
        ctaConversions={mockCtaConversions}
      />

      {/* Ringkasan Tabel Jalur Masuk */}
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm text-foreground">
              Jalur Pendaftaran Berjalan (TA 2027/2028)
            </h3>
            <p className="text-xs text-muted-foreground">
              Ketentuan biaya tes seleksi dan potongan biaya registrasi ulang (DPP).
            </p>
          </div>
          <Link
            href="/admin/tracks"
            className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1"
          >
            <span>Kelola Jalur</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted text-muted-foreground border-b border-border">
              <tr>
                <th className="py-2.5 px-4 font-semibold">Nama Jalur</th>
                <th className="py-2.5 px-4 font-semibold">Kategori</th>
                <th className="py-2.5 px-4 font-semibold">Biaya Tes Masuk</th>
                <th className="py-2.5 px-4 font-semibold">Diskon DPP Daftar Ulang</th>
                <th className="py-2.5 px-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-foreground">
              <tr>
                <td className="py-3 px-4 font-medium">Jalur Reguler Umum</td>
                <td className="py-3 px-4">Reguler</td>
                <td className="py-3 px-4 font-medium tabular-nums">Rp 500.000</td>
                <td className="py-3 px-4 font-medium tabular-nums">Rp 0</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    Buka
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium">Jalur UNISM Cerdas (Prestasi)</td>
                <td className="py-3 px-4">Non-Reguler</td>
                <td className="py-3 px-4 font-medium text-emerald-600 dark:text-emerald-400">Gratis</td>
                <td className="py-3 px-4 font-medium tabular-nums text-emerald-600 dark:text-emerald-400">Potongan Rp 750.000</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    Buka
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium">Jalur KIP Kuliah (Pemerintah)</td>
                <td className="py-3 px-4">Non-Reguler</td>
                <td className="py-3 px-4 font-medium text-emerald-600 dark:text-emerald-400">Gratis</td>
                <td className="py-3 px-4 font-medium">Bebas Penuh</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    Buka
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium">Jalur Undangan Sekolah Mitra</td>
                <td className="py-3 px-4">Non-Reguler</td>
                <td className="py-3 px-4 font-medium tabular-nums">Rp 250.000</td>
                <td className="py-3 px-4 font-medium tabular-nums text-emerald-600 dark:text-emerald-400">Potongan Rp 500.000</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    Buka
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
