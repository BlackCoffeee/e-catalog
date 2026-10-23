/**
 * @author Muhammad Arif Budiman - [https://github.com/BlackCoffeee]
 * @createAt 2026-10-24
 */
import { prisma } from '@/lib/prisma';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Status Akreditasi Institusi & Program Studi | PMB UNISM',
  description:
    'Legalitas akreditasi institusi Universitas Sari Mulia dan seluruh 15 program studi resmi BAN-PT dan LAM-PTKes.',
};

export const dynamic = 'force-dynamic';

export default async function AkreditasiPage() {
  const prodis = await prisma.studyProgram.findMany({
    include: { faculty: true },
    orderBy: { facultyId: 'asc' },
  });

  return (
    <div className="w-full py-10 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-accent">
            Legalitas & Jaminan Mutu
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-1">
            Status Akreditasi Institusi & Program Studi
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-2xl">
            Seluruh program studi di Universitas Sari Mulia telah terakreditasi resmi oleh Badan Akreditasi Nasional Perguruan Tinggi (BAN-PT) dan Lembaga Akreditasi Mandiri Pendidikan Tinggi Kesehatan (LAM-PTKes).
          </p>
        </div>

        {/* Akreditasi Institusi Banner */}
        <div className="p-6 rounded-lg bg-card border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-sky-100 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-bold text-base text-foreground">
                Akreditasi Perguruan Tinggi: Baik Sekali
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Surat Keputusan BAN-PT Nomor: 421/SK/BAN-PT/Ak/PT/VII/2023
              </p>
            </div>
          </div>
          <Badge variant="success" className="self-start sm:self-auto text-xs px-3 py-1">
            Akreditasi Institusi Sah
          </Badge>
        </div>

        {/* Tabel Akreditasi Seluruh Prodi */}
        <div className="rounded-lg border border-border bg-card overflow-hidden shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted text-muted-foreground border-b border-border">
              <tr>
                <th className="py-3 px-4 font-semibold">Program Studi</th>
                <th className="py-3 px-4 font-semibold">Fakultas</th>
                <th className="py-3 px-4 font-semibold">Jenjang</th>
                <th className="py-3 px-4 font-semibold">Lembaga Akreditasi</th>
                <th className="py-3 px-4 font-semibold">Peringkat Akreditasi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-foreground">
              {prodis.map((p) => (
                <tr key={p.id}>
                  <td className="py-3.5 px-4 font-bold text-sm">{p.name}</td>
                  <td className="py-3.5 px-4 text-muted-foreground">{p.faculty.name}</td>
                  <td className="py-3.5 px-4 font-semibold">{p.degreeLevel}</td>
                  <td className="py-3.5 px-4 text-muted-foreground">
                    {p.faculty.code === 'FK' ? 'LAM-PTKes' : 'BAN-PT'}
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge variant={p.accreditation === 'Unggul' ? 'success' : 'info'}>
                      {p.accreditation}
                    </Badge>
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
