/**
 * @author Muhammad Arif Budiman - [https://github.com/BlackCoffeee]
 * @createAt 2026-10-24
 */
import { MapPin, Phone, Mail, Clock, MessageCircle, AlertTriangle } from 'lucide-react';

export const metadata = {
  title: 'Kontak Loket & Lokasi Kampus | PMB UNISM',
  description:
    'Alamat kampus, jam operasional loket pendaftaran PMB, kontak WhatsApp CS, dan nomor rekening resmi Universitas Sari Mulia.',
};

export default function KontakPage() {
  return (
    <div className="w-full py-10 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-accent">
            Layanan Informasi
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-1">
            Kontak Loket PMB & Lokasi Kampus
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-2xl">
            Hubungi petugas admisi kami atau kunjungi loket pendaftaran di Gedung Rektorat Kampus Universitas Sari Mulia Banjarmasin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Informasi Loket */}
          <div className="space-y-6">
            <div className="p-6 rounded-lg border border-border bg-card space-y-4 shadow-sm">
              <h2 className="text-base font-bold text-foreground">
                Loket Pendaftaran Mahasiswa Baru
              </h2>
              <ul className="space-y-3 text-xs text-muted-foreground">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-foreground block">Alamat Kampus:</span>
                    <span>Jl. Pramuka No. 2, Pemurus Luar, Kec. Banjarmasin Timur, Kota Banjarmasin, Kalimantan Selatan 70238</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-foreground block">Jam Layanan Loket:</span>
                    <span>Senin - Jumat: 08.00 - 16.30 WITA<br />Sabtu: 08.30 - 13.00 WITA</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-foreground block">Telepon Kampus:</span>
                    <span>(0511) 3268108</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-foreground block">Email Admisi:</span>
                    <span>pmb@unism.ac.id</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Peringatan Nomor Rekening */}
            <div className="p-5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs space-y-2">
              <div className="flex items-center gap-2 font-bold text-amber-800 dark:text-amber-400">
                <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                <span>Pemberitahuan Rekening Resmi SPMB</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Seluruh pembayaran pendaftaran dan biaya kuliah hanya diterbitkan melalui kode Virtual Account (VA) Bank resmi atas nama <strong className="text-foreground">Universitas Sari Mulia</strong>. Kampus tidak pernah memungut biaya melalui nomor rekening perorangan atau staf pribadi.
              </p>
            </div>
          </div>

          {/* Akses Cepat Chat WA */}
          <div className="p-6 rounded-lg border border-border bg-card space-y-6 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <h2 className="text-base font-bold text-foreground">
                Konsultasi Cepat Petugas Admisi
              </h2>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Butuh panduan langsung mengenai pemilihan program studi, alur tes kesehatan fakultas kesehatan, atau konsultasi beasiswa? Silakan chat langsung dengan staf admisi kami.
              </p>

              <div className="space-y-3 pt-2">
                <a
                  href="https://wa.me/628115001234?text=Halo%20Admin%20PMB%20UNISM,%20saya%20ingin%20konsultasi%20pendaftaran"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#059669] hover:bg-[#047857] text-white font-bold p-3 rounded-md text-xs flex items-center justify-between transition-colors shadow-sm"
                >
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Admisi 1 (Konsultasi Umum & Reguler)</span>
                  </div>
                  <span>0811-500-1234</span>
                </a>

                <a
                  href="https://wa.me/628115005678?text=Halo%20Admin%20PMB%20UNISM,%20saya%20ingin%20konsultasi%20kelas%20karyawan%20dan%20RPL"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#059669] hover:bg-[#047857] text-white font-bold p-3 rounded-md text-xs flex items-center justify-between transition-colors shadow-sm"
                >
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Admisi 2 (Kelas Karyawan & RPL Transfer)</span>
                  </div>
                  <span>0811-500-5678</span>
                </a>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <a
                href="https://siak.unism.ac.id/pmb"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-accent hover:opacity-95 text-accent-foreground font-bold py-2.5 px-4 rounded-md text-xs flex items-center justify-center gap-2 shadow-sm transition-all text-center"
              >
                Kunjungi Portal Resmi SPMB UNISM
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
