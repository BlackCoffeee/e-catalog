/**
 * @author Muhammad Arif Budiman - [https://github.com/BlackCoffeee]
 * @createAt 2026-10-24
 */
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const dynamic = 'force-dynamic';

export default async function AdminProgramsPage() {
  const programs = await prisma.studyProgram.findMany({
    include: {
      faculty: true,
      tuitionFees: true,
    },
    orderBy: { facultyId: 'asc' },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            Master 15 Program Studi
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Daftar seluruh program studi di 4 fakultas, jenjang pendidikan, akreditasi, dan gelar kelulusan resmi.
          </p>
        </div>
        <Link
          href="/admin/programs/new"
          className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground text-xs font-semibold px-3.5 py-2 rounded-md hover:opacity-90 transition-opacity"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Tambah Program Studi</span>
        </Link>
      </div>

      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-muted text-muted-foreground border-b border-border">
            <tr>
              <th className="py-3 px-4 font-semibold">Program Studi</th>
              <th className="py-3 px-4 font-semibold">Fakultas</th>
              <th className="py-3 px-4 font-semibold">Jenjang & Gelar</th>
              <th className="py-3 px-4 font-semibold">Masa Studi</th>
              <th className="py-3 px-4 font-semibold">Akreditasi</th>
              <th className="py-3 px-4 font-semibold text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-foreground">
            {programs.map((p) => (
              <tr key={p.id}>
                <td className="py-3.5 px-4 font-bold text-sm">{p.name}</td>
                <td className="py-3.5 px-4 font-medium text-muted-foreground">
                  {p.faculty.name} ({p.faculty.code})
                </td>
                <td className="py-3.5 px-4">
                  <span className="font-semibold text-foreground">{p.degreeLevel}</span>{' '}
                  <span className="text-muted-foreground">({p.degreeTitle})</span>
                </td>
                <td className="py-3.5 px-4 tabular-nums">
                  {Number(p.studyDurationYears)} Tahun
                </td>
                <td className="py-3.5 px-4">
                  <Badge variant={p.accreditation === 'Unggul' ? 'success' : 'info'}>
                    {p.accreditation}
                  </Badge>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <button className="text-xs text-primary font-semibold hover:underline">
                    Sunting
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
