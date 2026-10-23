/**
 * @author Muhammad Arif Budiman - [https://github.com/BlackCoffeee]
 * @createAt 2026-10-24
 */
import Link from 'next/link';
import Image from 'next/image';
import {
  ShieldCheck,
  ArrowRight,
  BookOpen,
  Calculator,
  Award,
  CheckCircle,
  FileText,
  UserCheck,
  Building2,
  PhoneCall,
  GraduationCap,
} from 'lucide-react';
import { TuitionCalculatorWidget } from '@/components/modules/tuition-calculator-widget';
import { Badge } from '@/components/ui/badge';

export default function CatalogHomePage() {
  return (
    <div className="w-full flex flex-col">
      {/* 1. Hero Section */}
      <section className="relative w-full bg-[#0F2942] text-white py-16 md:py-24 border-b border-[#1E3A8A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#1A385C] border border-[#28507E] px-3 py-1.5 rounded text-xs font-semibold text-amber-400">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Akreditasi Institusi Baik Sekali BAN-PT & LAM-PTKes</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Kuliah Berkualitas, Masa Depan Lebih Pasti di Universitas Sari Mulia
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              Pilihan terpercaya 15 Program Studi unggulan di bidang Kesehatan, Sains & Teknologi, Humaniora, serta Kedokteran Hewan & Biosains dengan skema pembiayaan per-trimester yang fleksibel dan terjangkau.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="https://siak.unism.ac.id/pmb"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-6 py-3 rounded-md text-sm shadow-md transition-all inline-flex items-center gap-2"
              >
                <span>Daftar Online Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/biaya-pendidikan"
                className="bg-[#1A385C] hover:bg-[#224875] text-white font-semibold px-5 py-3 rounded-md text-sm border border-[#2C5584] transition-all"
              >
                Hitung Biaya Trimester
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-lg overflow-hidden border-2 border-amber-500/40 shadow-2xl aspect-[4/3]">
              <Image
                src="/assets/hero-campus.png"
                alt="Gedung Kampus Universitas Sari Mulia Banjarmasin"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 500px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Quick Access Hub (6 Kartu Navigasi Utama) */}
      <section className="w-full py-12 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Akses Cepat Informasi PMB
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Temukan informasi esensial penerimaan mahasiswa baru tahun akademik 2027/2028.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              href="/program-studi"
              className="p-5 rounded-lg border border-border bg-card hover:border-primary/50 transition-all group"
            >
              <div className="w-10 h-10 rounded-md bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 flex items-center justify-center mb-3">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                15 Program Studi Unggulan
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                Eksplorasi profil jurusan, jenjang D3/S1/Profesi, dan prospek karier lulusan.
              </p>
            </Link>

            <Link
              href="/biaya-pendidikan"
              className="p-5 rounded-lg border border-border bg-card hover:border-primary/50 transition-all group"
            >
              <div className="w-10 h-10 rounded-md bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 flex items-center justify-center mb-3">
                <Calculator className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                Skema Biaya Per-Trimester
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                Transparansi pembiayaan kuliah dibayarkan setiap 3 bulan sekali tanpa beban awal yang memberatkan.
              </p>
            </Link>

            <Link
              href="/jalur-seleksi"
              className="p-5 rounded-lg border border-border bg-card hover:border-primary/50 transition-all group"
            >
              <div className="w-10 h-10 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mb-3">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                Jalur Seleksi & Beasiswa
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                Pilihan jalur Reguler, Jalur Prestasi UNISM Cerdas, Beasiswa Yayasan, dan KIP Kuliah.
              </p>
            </Link>

            <Link
              href="/alur-pendaftaran"
              className="p-5 rounded-lg border border-border bg-card hover:border-primary/50 transition-all group"
            >
              <div className="w-10 h-10 rounded-md bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 flex items-center justify-center mb-3">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                Alur & Panduan Pendaftaran
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                5 langkah mudah registrasi dari pembuatan akun formulir hingga perolehan Nomor Induk Mahasiswa.
              </p>
            </Link>

            <Link
              href="/akreditasi"
              className="p-5 rounded-lg border border-border bg-card hover:border-primary/50 transition-all group"
            >
              <div className="w-10 h-10 rounded-md bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                Status Akreditasi Resmi
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                Seluruh prodi terakreditasi BAN-PT dan LAM-PTKes dengan jaminan legalitas ijazah nasional.
              </p>
            </Link>

            <Link
              href="/fasilitas-dan-kampus"
              className="p-5 rounded-lg border border-border bg-card hover:border-primary/50 transition-all group"
            >
              <div className="w-10 h-10 rounded-md bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 flex items-center justify-center mb-3">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                Fasilitas & Kampus
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                Gedung perkuliahan representatif, laboratorium medis terpadu, dan mini hospital standar RS.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Showcase Program Studi Pilihan */}
      <section className="w-full py-16 bg-muted/40 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                Pilihan Program Studi Unggulan
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Kurikulum adaptif sesuai kebutuhan industri kerja masa depan di 4 fakultas.
              </p>
            </div>
            <Link
              href="/program-studi"
              className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1"
            >
              <span>Lihat Seluruh 15 Program Studi</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Prodi 1 */}
            <div className="rounded-lg border border-border bg-card overflow-hidden shadow-sm flex flex-col">
              <div className="relative aspect-[16/9] w-full bg-slate-200">
                <Image
                  src="/assets/programs/sarjana-teknologi-informasi.png"
                  alt="Sarjana Teknologi Informasi"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-muted-foreground">
                      Fakultas Sains & Teknologi
                    </span>
                    <Badge variant="info">Baik Sekali</Badge>
                  </div>
                  <h3 className="font-bold text-base text-foreground">
                    Sarjana Teknologi Informasi (S1)
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Rekayasa perangkat lunak modern, kecerdasan buatan, komputasi awan, dan arsitektur keamanan siber.
                  </p>
                </div>
                <div className="pt-3 border-t border-border flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-muted-foreground">Biaya Trimester</span>
                    <span className="text-sm font-bold text-foreground tabular-nums">
                      Rp 2.200.000
                    </span>
                  </div>
                  <Link
                    href="/program-studi/sarjana-teknologi-informasi"
                    className="text-xs font-semibold text-primary hover:underline"
                  >
                    Detail Prodi →
                  </Link>
                </div>
              </div>
            </div>

            {/* Prodi 2 */}
            <div className="rounded-lg border border-border bg-card overflow-hidden shadow-sm flex flex-col">
              <div className="relative aspect-[16/9] w-full bg-slate-200">
                <Image
                  src="/assets/programs/sarjana-farmasi.png"
                  alt="Sarjana Farmasi"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-muted-foreground">
                      Fakultas Kesehatan
                    </span>
                    <Badge variant="info">Baik Sekali</Badge>
                  </div>
                  <h3 className="font-bold text-base text-foreground">
                    Sarjana Farmasi (S1)
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Farmasi klinis, formulasi obat herbal & kimia sintetis, dan manajemen instalasi rumah sakit.
                  </p>
                </div>
                <div className="pt-3 border-t border-border flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-muted-foreground">Biaya Trimester</span>
                    <span className="text-sm font-bold text-foreground tabular-nums">
                      Rp 3.200.000
                    </span>
                  </div>
                  <Link
                    href="/program-studi/sarjana-farmasi"
                    className="text-xs font-semibold text-primary hover:underline"
                  >
                    Detail Prodi →
                  </Link>
                </div>
              </div>
            </div>

            {/* Prodi 3 */}
            <div className="rounded-lg border border-border bg-card overflow-hidden shadow-sm flex flex-col">
              <div className="relative aspect-[16/9] w-full bg-slate-200">
                <Image
                  src="/assets/programs/sarjana-manajemen.png"
                  alt="Sarjana Manajemen"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-muted-foreground">
                      Fakultas Humaniora
                    </span>
                    <Badge variant="info">Baik Sekali</Badge>
                  </div>
                  <h3 className="font-bold text-base text-foreground">
                    Sarjana Manajemen (S1)
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Manajemen pemasaran digital, keuangan korporat, kepemimpinan organisasi, dan startup bisnis.
                  </p>
                </div>
                <div className="pt-3 border-t border-border flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-muted-foreground">Biaya Trimester</span>
                    <span className="text-sm font-bold text-foreground tabular-nums">
                      Rp 2.000.000
                    </span>
                  </div>
                  <Link
                    href="/program-studi/sarjana-manajemen"
                    className="text-xs font-semibold text-primary hover:underline"
                  >
                    Detail Prodi →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Interactive Trimester Fee Calculator */}
      <section className="w-full py-16 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TuitionCalculatorWidget />
        </div>
      </section>

      {/* 5. Alur Pendaftaran (5 Langkah Ringkas) */}
      <section className="w-full py-16 bg-muted/30 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              5 Tahapan Mudah Registrasi Mahasiswa Baru
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Panduan langkah penerimaan mahasiswa baru tahun akademik 2027/2028.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="p-4 rounded-lg border border-border bg-card space-y-2 text-center">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center mx-auto">
                1
              </div>
              <h3 className="font-bold text-xs text-foreground">Registrasi Akun</h3>
              <p className="text-[11px] text-muted-foreground">
                Buka portal siak.unism.ac.id/pmb dan daftarkan email aktif.
              </p>
            </div>

            <div className="p-4 rounded-lg border border-border bg-card space-y-2 text-center">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center mx-auto">
                2
              </div>
              <h3 className="font-bold text-xs text-foreground">Pilih Jalur & Prodi</h3>
              <p className="text-[11px] text-muted-foreground">
                Tentukan jalur seleksi yang sesuai dan prodi pilihan utama.
              </p>
            </div>

            <div className="p-4 rounded-lg border border-border bg-card space-y-2 text-center">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center mx-auto">
                3
              </div>
              <h3 className="font-bold text-xs text-foreground">Unggah Berkas</h3>
              <p className="text-[11px] text-muted-foreground">
                Upload scan KTP, raport atau ijazah, serta pas foto terbaru.
              </p>
            </div>

            <div className="p-4 rounded-lg border border-border bg-card space-y-2 text-center">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center mx-auto">
                4
              </div>
              <h3 className="font-bold text-xs text-foreground">Seleksi & Wawancara</h3>
              <p className="text-[11px] text-muted-foreground">
                Ikuti uji TPA atau wawancara kompetensi sesuai jalur pilihan.
              </p>
            </div>

            <div className="p-4 rounded-lg border border-border bg-card space-y-2 text-center">
              <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center mx-auto">
                5
              </div>
              <h3 className="font-bold text-xs text-foreground">Daftar Ulang & NIM</h3>
              <p className="text-[11px] text-muted-foreground">
                Bayar biaya trimester 1 dan resmi memperoleh NIM mahasiswa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Seksi Konsultasi & Loket PMB */}
      <section className="w-full py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-[#0F2942] text-white p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-[#1E3A8A]">
            <div className="space-y-3 max-w-xl text-center md:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Pusat Bantuan & Konsultasi Jurusan
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Butuh Bantuan Menentukan Pilihan Prodi?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Staf admisi kami siap memberikan konsultasi gratis mengenai peluang karier, persyaratan beasiswa, dan skema pembiayaan trimester.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <a
                href="https://wa.me/628115001234?text=Halo%20Admin%20PMB%20UNISM,%20saya%20ingin%20konsultasi%20pendaftaran"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-[#059669] hover:bg-[#047857] text-white font-bold px-6 py-3 rounded-md text-xs sm:text-sm text-center shadow-md transition-colors inline-flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Konsultasi WhatsApp</span>
              </a>
              <Link
                href="/kontak-dan-lokasi"
                className="w-full sm:w-auto bg-[#1A385C] hover:bg-[#224875] text-white font-semibold px-5 py-3 rounded-md text-xs sm:text-sm text-center border border-[#2C5584] transition-colors"
              >
                Jam Buka Loket
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
