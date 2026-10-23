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

export default async function AdminTuitionsPage() {
  const tuitions = await prisma.tuitionFee.findMany({
    include: {
      studyProgram: {
        include: { faculty: true },
      },
      period: true,
    },
    orderBy: { studyProgramId: 'asc' },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            Master Biaya Pendidikan Trimester
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Daftar tarif pembiayaan per-trimester Fase 1 (Smt 1-4) dan Fase 2 (Smt 5-8) untuk kelas Reguler, Karyawan, dan RPL.
          </p>
        </div>
        <Link
          href="/admin/tuitions/new"
          className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground text-xs font-semibold px-3.5 py-2 rounded-md hover:opacity-90 transition-opacity"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Tambah Entri Tarif</span>
        </Link>
      </div>

      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-muted text-muted-foreground border-b border-border">
            <tr>
              <th className="py-3 px-4 font-semibold">Program Studi</th>
              <th className="py-3 px-4 font-semibold">Kategori Kelas</th>
              <th className="py-3 px-4 font-semibold">Fase 1 (Smt 1-4) / Trimester</th>
              <th className="py-3 px-4 font-semibold">Fase 2 (Smt 5-8) / Trimester</th>
              <th className="py-3 px-4 font-semibold">Keterangan</th>
              <th className="py-3 px-4 font-semibold text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-foreground">
            {tuitions.map((t) => (
              <tr key={t.id}>
                <td className="py-3.5 px-4">
                  <div className="font-bold text-sm">{t.studyProgram.name}</div>
                  <div className="text-[11px] text-muted-foreground">
                    {t.studyProgram.faculty.code} | {t.studyProgram.degreeLevel}
                  </div>
                </td>
                <td className="py-3.5 px-4">
                  <Badge variant={t.trackCategory === 'REGULAR' ? 'default' : 'accent'}>
                    {t.trackCategory}
                  </Badge>
                </td>
                <td className="py-3.5 px-4 font-bold text-sm text-primary tabular-nums">
                  {formatRupiah(Number(t.earlyTrimesterFee))}
                </td>
                <td className="py-3.5 px-4 font-bold text-sm text-foreground tabular-nums">
                  {formatRupiah(Number(t.lateTrimesterFee))}
                </td>
                <td className="py-3.5 px-4 text-muted-foreground max-w-xs truncate">
                  {t.notes || 'Reguler'}
                </td>
                <td className="py-3.5 px-4 text-right">
                  <button className="text-xs text-primary font-semibold hover:underline">
                    Edit Tarif
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
