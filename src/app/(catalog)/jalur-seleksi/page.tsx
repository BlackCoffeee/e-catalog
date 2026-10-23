/**
 * @author Muhammad Arif Budiman - [https://github.com/BlackCoffeee]
 * @createAt 2026-10-24
 */
import { prisma } from '@/lib/prisma';
import { formatRupiah } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Jalur Seleksi Masuk PMB | Universitas Sari Mulia',
  description:
    'Direktori jalur pendaftaran mahasiswa baru: Jalur Reguler Umum, Jalur Prestasi UNISM Cerdas, Beasiswa Yayasan, dan KIP Kuliah.',
};

export const dynamic = 'force-dynamic';

export default async function JalurSeleksiPage() {
  const tracks = await prisma.admissionTrack.findMany({
    orderBy: { id: 'asc' },
  });

  return (
    <div className="w-full py-10 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-accent">
            Penerimaan Mahasiswa Baru
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-1">
            Pilihan Jalur Seleksi & Biaya Pendaftaran
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-2xl">
            Tentukan jalur seleksi yang sesuai dengan minat dan kualifikasi prestasi Anda. Tersedia fasilitas bebas tes dan potongan biaya registrasi ulang (DPP).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tracks.map((tr) => {
            const reqs = Array.isArray(tr.requirements) ? (tr.requirements as string[]) : [];

            return (
              <div
                key={tr.id}
                className="p-6 rounded-lg border border-border bg-card shadow-sm space-y-5 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant={tr.category === 'REGULAR' ? 'default' : 'info'}>
                      {tr.category === 'REGULAR' ? 'Jalur Reguler' : 'Jalur Non-Reguler'}
                    </Badge>
                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      Pendaftaran Dibuka
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-foreground">{tr.name}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {tr.description}
                  </p>

                  <div className="grid grid-cols-2 gap-3 p-3 rounded-md bg-muted/60 border border-border text-xs">
                    <div>
                      <span className="text-muted-foreground block text-[11px]">
                        Biaya Tes Masuk
                      </span>
                      <span className="font-bold text-foreground text-sm tabular-nums">
                        {Number(tr.registrationFee) === 0 ? 'Gratis' : formatRupiah(Number(tr.registrationFee))}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-[11px]">
                        Potongan DPP Daftar Ulang
                      </span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm tabular-nums">
                        {Number(tr.reRegistrationDiscount) === 0 ? 'Rp 0' : formatRupiah(Number(tr.reRegistrationDiscount))}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-2">
                    <span className="text-[11px] font-bold text-foreground block">
                      Persyaratan Berkas:
                    </span>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      {reqs.map((r, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
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
                    className="w-full bg-accent hover:opacity-95 text-accent-foreground font-bold py-2.5 px-4 rounded-md text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                  >
                    <span>Daftar Lewat Jalur Ini</span>
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
