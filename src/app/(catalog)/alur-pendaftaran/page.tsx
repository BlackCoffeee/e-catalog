/**
 * @author Muhammad Arif Budiman - [https://github.com/BlackCoffeee]
 * @createAt 2026-10-24
 */
import { CheckCircle2, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Alur & Tahapan Pendaftaran PMB | Universitas Sari Mulia',
  description:
    'Panduan lengkap tahapan pendaftaran mahasiswa baru: pembuatan akun, verifikasi berkas, tes seleksi, hingga perolehan NIM.',
};

export default function AlurPendaftaranPage() {
  const steps = [
    {
      step: '1',
      title: 'Registrasi Akun di Portal SPMB',
      desc: 'Kunjungi situs resmi siak.unism.ac.id/pmb, klik tombol pendaftaran baru, lalu isikan data diri awal serta alamat email aktif untuk menerima kode verifikasi.',
    },
    {
      step: '2',
      title: 'Pemilihan Program Studi & Jalur Seleksi',
      desc: 'Tentukan jalur pendaftaran yang dikehendaki (Jalur Reguler Umum, Jalur Prestasi UNISM Cerdas, Beasiswa Yayasan, atau KIP Kuliah) dan tentukan prodi pilihan utama.',
    },
    {
      step: '3',
      title: 'Unggah Berkas Persyaratan',
      desc: 'Unggah berkas digital berupa scan KTP/Kartu Pelajar, Kartu Keluarga, salinan legalisir rapor semester 1 sampai 5 atau ijazah, pas foto warna terbaru, serta sertifikat prestasi bagi pemegang jalur prestasi.',
    },
    {
      step: '4',
      title: 'Tes Seleksi & Wawancara Kompetensi',
      desc: 'Ikuti Tes Potensi Akademik (TPA) online dan wawancara kompetensi prodi. Untuk prodi rumpun kesehatan diwajibkan menjalani pemeriksaan kesehatan di fasilitas mitra.',
    },
    {
      step: '5',
      title: 'Pengumuman Kelulusan & Registrasi Ulang (Daftar Ulang)',
      desc: 'Calon mahasiswa yang dinyatakan lulus seleksi melakukan pembayaran biaya kuliah Trimester 1 (dan biaya DPP sesuai potongan jalur yang didapat) melalui Virtual Account resmi untuk penerbitan Nomor Induk Mahasiswa (NIM).',
    },
  ];

  return (
    <div className="w-full py-10 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-accent">
            Panduan Calon Mahasiswa
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-1">
            Alur & Tahapan Pendaftaran Mahasiswa Baru
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-2xl">
            Ikuti 5 langkah terstruktur pendaftaran mahasiswa baru di Universitas Sari Mulia tahun akademik 2027/2028.
          </p>
        </div>

        <div className="space-y-4">
          {steps.map((s) => (
            <div
              key={s.step}
              className="p-6 rounded-lg border border-border bg-card shadow-sm flex flex-col sm:flex-row items-start gap-5"
            >
              <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center shrink-0">
                {s.step}
              </div>
              <div className="space-y-1.5 flex-1">
                <h3 className="text-base font-bold text-foreground">{s.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 rounded-lg bg-card border border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-sm text-foreground">
              Sudah Siap Melakukan Pendaftaran?
            </h3>
            <p className="text-xs text-muted-foreground">
              Akses portal resmi SPMB UNISM sekarang dan selesaikan pembuatan akun dalam 5 menit.
            </p>
          </div>
          <a
            href="https://siak.unism.ac.id/pmb"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent hover:opacity-95 text-accent-foreground font-bold px-6 py-2.5 rounded-md text-xs sm:text-sm shadow-sm transition-all inline-flex items-center gap-2"
          >
            <span>Daftar di Portal SPMB</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
