/**
 * @author Muhammad Arif Budiman - [https://github.com/BlackCoffeee]
 * @createAt 2026-10-24
 */
import { prisma } from '@/lib/prisma';
import { formatRupiah } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Rincian Biaya Pendaftaran & Tes | PMB UNISM',
  description:
    'Rincian biaya formulir, tes potensi akademik, dan tes wawancara prodi penerimaan mahasiswa baru di Universitas Sari Mulia.',
};

export const dynamic = 'force-dynamic';

export default async function BiayaPendaftaranPage() {
  const tracks = await prisma.admissionTrack.findMany({
    orderBy: { id: 'asc' },
  });

  return (
    <div className="w-full py-10 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-accent">
            Informasi Awal Masuk
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-1">
            Biaya Pendaftaran & Tes Masuk (TA 2027/2028)
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-2xl">
            Rincian tarif biaya formulir pendaftaran dan tes seleksi masuk per jalur penerimaan di Universitas Sari Mulia.
          </p>
        </div>

        <div className="rounded-lg border border-border bg-card overflow-hidden shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted text-muted-foreground border-b border-border">
              <tr>
                <th className="py-3 px-4 font-semibold">Nama Jalur Pendaftaran</th>
                <th className="py-3 px-4 font-semibold">Kategori Jalur</th>
                <th className="py-3 px-4 font-semibold">Biaya Tes Masuk</th>
                <th className="py-3 px-4 font-semibold">Ketentuan Tes TPA & Wawancara</th>
                <th className="py-3 px-4 font-semibold">Potongan DPP Registrasi Ulang</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-foreground">
              {tracks.map((t) => (
                <tr key={t.id}>
                  <td className="py-3.5 px-4 font-bold text-sm">{t.name}</td>
                  <td className="py-3.5 px-4">
                    <Badge variant={t.category === 'REGULAR' ? 'default' : 'info'}>
                      {t.category === 'REGULAR' ? 'Reguler' : 'Non-Reguler'}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-sm tabular-nums">
                    {Number(t.registrationFee) === 0 ? (
                      <span className="text-emerald-600 dark:text-emerald-400">Gratis</span>
                    ) : (
                      formatRupiah(Number(t.registrationFee))
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-muted-foreground">
                    {t.requiresExam ? 'Uji TPA & Wawancara' : 'Bebas Tes (Wawancara Berkas Saja)'}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-emerald-600 dark:text-emerald-400 tabular-nums">
                    {Number(t.reRegistrationDiscount) === 0 ? (
                      <span className="text-muted-foreground font-normal">Rp 0</span>
                    ) : (
                      `Potongan ${formatRupiah(Number(t.reRegistrationDiscount))}`
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-6 rounded-lg bg-card border border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-sm text-foreground">
              Siap Mengambil Formulir Pendaftaran?
            </h3>
            <p className="text-xs text-muted-foreground">
              Formulir dapat diisi secara mandiri secara online melalui tautan resmi SPMB.
            </p>
          </div>
          <a
            href="https://siak.unism.ac.id/pmb"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent hover:opacity-95 text-accent-foreground font-bold px-6 py-2.5 rounded-md text-xs sm:text-sm shadow-sm transition-all inline-flex items-center gap-2"
          >
            <span>Buka Formulir Online</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
