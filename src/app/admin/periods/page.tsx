/**
 * @author Muhammad Arif Budiman - [https://github.com/BlackCoffeee]
 * @createAt 2026-10-24
 */
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Plus, Check, X } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminPeriodsPage() {
  const periods = await prisma.academicPeriod.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            Master Periode Akademik PMB
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Kelola tahun akademik penerimaan mahasiswa baru dan tentukan periode mana yang aktif di katalog publik.
          </p>
        </div>
        <Link
          href="/admin/periods/new"
          className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground text-xs font-semibold px-3.5 py-2 rounded-md hover:opacity-90 transition-opacity"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Tambah Periode Baru</span>
        </Link>
      </div>

      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-muted text-muted-foreground border-b border-border">
            <tr>
              <th className="py-3 px-4 font-semibold">Tahun Akademik</th>
              <th className="py-3 px-4 font-semibold">Nama Resmi</th>
              <th className="py-3 px-4 font-semibold">Status Aktif</th>
              <th className="py-3 px-4 font-semibold">Catatan Kebijakan</th>
              <th className="py-3 px-4 font-semibold text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-foreground">
            {periods.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-muted-foreground">
                  Belum ada data periode akademik yang dibuat.
                </td>
              </tr>
            ) : (
              periods.map((p) => (
                <tr key={p.id}>
                  <td className="py-3.5 px-4 font-bold text-sm">{p.academicYear}</td>
                  <td className="py-3.5 px-4 font-medium">{p.name}</td>
                  <td className="py-3.5 px-4">
                    {p.isActive ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                        <Check className="w-3 h-3" />
                        <span>Periode Berjalan (Aktif)</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                        <X className="w-3 h-3" />
                        <span>Arsip Non-Aktif</span>
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-muted-foreground max-w-xs truncate">
                    {p.notes || 'Tidak ada catatan'}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button className="text-xs text-primary font-semibold hover:underline">
                      Ubah Status
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
