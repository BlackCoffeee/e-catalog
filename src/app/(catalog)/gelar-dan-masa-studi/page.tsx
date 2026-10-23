/**
 * @author Muhammad Arif Budiman - [https://github.com/BlackCoffeee]
 * @createAt 2026-10-24
 */
import { prisma } from '@/lib/prisma';

export const metadata = {
  title: 'Panduan Gelar & Masa Studi | PMB Universitas Sari Mulia',
  description:
    'Daftar gelar kelulusan resmi dan standar lama masa studi normal seluruh program studi di UNISM.',
};

export const dynamic = 'force-dynamic';

export default async function GelarMasaStudiPage() {
  const prodis = await prisma.studyProgram.findMany({
    include: { faculty: true },
    orderBy: { facultyId: 'asc' },
  });

  return (
    <div className="w-full py-10 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-accent">
            Informasi Kelulusan
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-1">
            Gelar Akademik & Durasi Masa Studi
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-2xl">
            Panduan gelar kelulusan sah dan masa studi normal seluruh program diploma, sarjana terapan, sarjana, dan profesi di Universitas Sari Mulia.
          </p>
        </div>

        <div className="rounded-lg border border-border bg-card overflow-hidden shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted text-muted-foreground border-b border-border">
              <tr>
                <th className="py-3 px-4 font-semibold">Program Studi</th>
                <th className="py-3 px-4 font-semibold">Fakultas</th>
                <th className="py-3 px-4 font-semibold">Jenjang Pendidikan</th>
                <th className="py-3 px-4 font-semibold">Gelar Kelulusan Resmi</th>
                <th className="py-3 px-4 font-semibold">Masa Studi Normal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-foreground">
              {prodis.map((p) => (
                <tr key={p.id}>
                  <td className="py-3.5 px-4 font-bold text-sm">{p.name}</td>
                  <td className="py-3.5 px-4 text-muted-foreground">{p.faculty.name}</td>
                  <td className="py-3.5 px-4 font-semibold">{p.degreeLevel}</td>
                  <td className="py-3.5 px-4 font-bold text-primary">{p.degreeTitle}</td>
                  <td className="py-3.5 px-4 tabular-nums">
                    {Number(p.studyDurationYears)} Tahun
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
