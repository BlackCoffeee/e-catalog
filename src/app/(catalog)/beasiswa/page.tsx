/**
 * @author Muhammad Arif Budiman - [https://github.com/BlackCoffeee]
 * @createAt 2026-10-24
 */
import { prisma } from '@/lib/prisma';
import { Badge } from '@/components/ui/badge';
import { Check, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Program Beasiswa Kuliah | PMB Universitas Sari Mulia',
  description:
    'Ragam program beasiswa kuliah: KIP Kuliah Merdeka, Beasiswa Yayasan Indah, dan Beasiswa Hafiz Al-Quran di UNISM.',
};

export const dynamic = 'force-dynamic';

export default async function BeasiswaPage() {
  const scholarships = await prisma.scholarship.findMany({
    orderBy: { id: 'asc' },
  });

  return (
    <div className="w-full py-10 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-accent">
            Bantuan Biaya Kuliah
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-1">
            Program Beasiswa Mahasiswa Baru
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-2xl">
            Universitas Sari Mulia menyediakan berbagai skema bantuan biaya pendidikan bagi siswa berprestasi dan keluarga prasejahtera.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {scholarships.map((s) => {
            const reqs = Array.isArray(s.requirements) ? (s.requirements as string[]) : [];

            return (
              <div
                key={s.id}
                className="p-6 rounded-lg border border-border bg-card shadow-sm space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <Badge variant="accent">
                    {s.providerType.replace('_', ' ')}
                  </Badge>
                  <h3 className="text-lg font-bold text-foreground">{s.name}</h3>
                  <div className="p-2.5 rounded bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-700 dark:text-amber-400">
                    {s.coverage}
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {s.description}
                  </p>

                  <div className="space-y-1.5 pt-2">
                    <span className="text-[11px] font-bold text-foreground block">
                      Ketentuan Utama:
                    </span>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      {reqs.map((r, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <a
                    href="https://siak.unism.ac.id/pmb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-primary hover:opacity-90 text-primary-foreground font-bold py-2.5 px-4 rounded-md text-xs flex items-center justify-center gap-2 shadow-sm transition-opacity"
                  >
                    <span>Ajukan Beasiswa</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
