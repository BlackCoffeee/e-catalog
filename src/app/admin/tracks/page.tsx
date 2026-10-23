/**
 * @author Muhammad Arif Budiman - [https://github.com/BlackCoffeee]
 * @createAt 2026-10-24
 */
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Plus } from 'lucide-react';
import { formatRupiah } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export const dynamic = 'force-dynamic';

export default async function AdminTracksPage() {
  const tracks = await prisma.admissionTrack.findMany({
    include: { period: true },
    orderBy: { id: 'asc' },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            Master Jalur Seleksi & Biaya Pendaftaran
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Atur biaya formulir tes masuk dan diskon registrasi ulang (potongan DPP daftar ulang) per jalur masuk.
          </p>
        </div>
        <Link
          href="/admin/tracks/new"
          className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground text-xs font-semibold px-3.5 py-2 rounded-md hover:opacity-90 transition-opacity"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Tambah Jalur Seleksi</span>
        </Link>
      </div>

      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-muted text-muted-foreground border-b border-border">
            <tr>
              <th className="py-3 px-4 font-semibold">Nama Jalur</th>
              <th className="py-3 px-4 font-semibold">Kategori</th>
              <th className="py-3 px-4 font-semibold">Biaya Tes Masuk</th>
              <th className="py-3 px-4 font-semibold">Diskon DPP Daftar Ulang</th>
              <th className="py-3 px-4 font-semibold">Status</th>
              <th className="py-3 px-4 font-semibold text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-foreground">
            {tracks.map((tr) => (
              <tr key={tr.id}>
                <td className="py-3.5 px-4 font-bold text-sm">{tr.name}</td>
                <td className="py-3.5 px-4">
                  <Badge variant={tr.category === 'REGULAR' ? 'default' : 'info'}>
                    {tr.category}
                  </Badge>
                </td>
                <td className="py-3.5 px-4 font-bold text-sm tabular-nums">
                  {Number(tr.registrationFee) === 0 ? (
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                      Gratis
                    </span>
                  ) : (
                    formatRupiah(Number(tr.registrationFee))
                  )}
                </td>
                <td className="py-3.5 px-4 font-bold text-sm tabular-nums">
                  {Number(tr.reRegistrationDiscount) === 0 ? (
                    <span className="text-muted-foreground font-normal">Rp 0</span>
                  ) : (
                    <span className="text-emerald-600 dark:text-emerald-400">
                      Potongan {formatRupiah(Number(tr.reRegistrationDiscount))}
                    </span>
                  )}
                </td>
                <td className="py-3.5 px-4">
                  {tr.isOpen ? (
                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      Buka
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                      Tutup
                    </span>
                  )}
                </td>
                <td className="py-3.5 px-4 text-right">
                  <button className="text-xs text-primary font-semibold hover:underline">
                    Edit Jalur
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
