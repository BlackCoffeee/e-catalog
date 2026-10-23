/**
 * @author Muhammad Arif Budiman - [https://github.com/BlackCoffeee]
 * @createAt 2026-10-24
 */
import { prisma } from '@/lib/prisma';
import { formatRupiah } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export const metadata = {
  title: 'Skema Biaya Pendidikan Trimester | PMB Universitas Sari Mulia',
  description:
    'Tabel lengkap pembiayaan kuliah per-trimester (setiap 3 bulan sekali) Fase 1 (Smt 1-4) dan Fase 2 (Smt 5-8) seluruh program studi di UNISM.',
};

export const dynamic = 'force-dynamic';

export default async function BiayaPendidikanPage() {
  const tuitions = await prisma.tuitionFee.findMany({
    include: {
      studyProgram: {
        include: { faculty: true },
      },
    },
    orderBy: [{ studyProgram: { facultyId: 'asc' } }, { trackCategory: 'asc' }],
  });

  return (
    <div className="w-full py-10 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-accent">
            Transparansi Biaya
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-1">
            Biaya Pendidikan Skema Trimester (TA 2027/2028)
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-3xl">
            Universitas Sari Mulia menerapkan sistem pembayaran per-trimester (dibayarkan per 3 bulan sekali), membagi beban pembiayaan menjadi tahap awal (Semester 1 s.d 4) dan tahap akhir (Semester 5 s.d 8) tanpa biaya tersembunyi.
          </p>
        </div>

        <div className="rounded-lg border border-border bg-card overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-muted text-muted-foreground border-b border-border">
                <tr>
                  <th className="py-3 px-4 font-semibold">Program Studi</th>
                  <th className="py-3 px-4 font-semibold">Fakultas</th>
                  <th className="py-3 px-4 font-semibold">Kategori Kelas</th>
                  <th className="py-3 px-4 font-semibold">Trimester Fase 1 (Smt 1-4)</th>
                  <th className="py-3 px-4 font-semibold">Trimester Fase 2 (Smt 5-8)</th>
                  <th className="py-3 px-4 font-semibold">Keterangan</th>
                  <th className="py-3 px-4 font-semibold text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-foreground">
                {tuitions.map((t) => (
                  <tr key={t.id}>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-sm block">
                        {t.studyProgram.name}
                      </span>
                      <span className="text-[11px] text-muted-foreground">
                        {t.studyProgram.degreeLevel} - {t.studyProgram.degreeTitle}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-muted-foreground">
                      {t.studyProgram.faculty.code}
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge variant={t.trackCategory === 'REGULAR' ? 'default' : 'accent'}>
                        {t.trackCategory === 'REGULAR' ? 'Reguler Pagi' : t.trackCategory === 'EMPLOYEE' ? 'Karyawan / Malam' : t.trackCategory}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-sm text-primary tabular-nums">
                      {formatRupiah(Number(t.earlyTrimesterFee))}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-sm tabular-nums">
                      {formatRupiah(Number(t.lateTrimesterFee))}
                    </td>
                    <td className="py-3.5 px-4 text-muted-foreground max-w-xs truncate">
                      {t.notes || 'Reguler'}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href={`/program-studi/${t.studyProgram.slug}`}
                        className="text-xs font-semibold text-primary hover:underline"
                      >
                        Detail →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
