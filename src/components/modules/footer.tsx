/**
 * @author Muhammad Arif Budiman - [https://github.com/BlackCoffeee]
 * @createAt 2026-10-24
 */
import Link from 'next/link';
import { MapPin, Phone, Mail, ShieldCheck } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full bg-[#0B1E30] text-slate-300 border-t border-[#1E3A8A]/40 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Kolom Profil Institusi */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-xs">
                SM
              </div>
              <span className="font-bold text-white text-sm tracking-tight">
                UNIVERSITAS SARI MULIA
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Mencetak generasi unggul, profesional, dan berkarakter mulia di bidang kesehatan, sains teknologi, dan humaniora sejak 2019.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold bg-[#132A44] p-2.5 rounded border border-[#234267]">
              <ShieldCheck className="w-4 h-4 shrink-0 text-amber-400" />
              <span>Terakreditasi Institusi BAN-PT & LAM-PTKes</span>
            </div>
          </div>

          {/* Kolom Navigasi Informasi PMB */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Informasi Pendaftaran
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/alur-pendaftaran" className="hover:text-amber-400 transition-colors">
                  Alur & Tahapan Registrasi
                </Link>
              </li>
              <li>
                <Link href="/jalur-seleksi" className="hover:text-amber-400 transition-colors">
                  Jalur Seleksi & Beasiswa
                </Link>
              </li>
              <li>
                <Link href="/biaya-pendidikan" className="hover:text-amber-400 transition-colors">
                  Skema Biaya Kuliah Trimester
                </Link>
              </li>
              <li>
                <Link href="/biaya-pendaftaran" className="hover:text-amber-400 transition-colors">
                  Biaya Formulir & Tes Masuk
                </Link>
              </li>
              <li>
                <Link href="/gelar-dan-masa-studi" className="hover:text-amber-400 transition-colors">
                  Gelar & Durasi Studi
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom Program Akademik */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Program Akademik
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/program-studi" className="hover:text-amber-400 transition-colors">
                  Katalog 15 Program Studi
                </Link>
              </li>
              <li>
                <Link href="/akreditasi" className="hover:text-amber-400 transition-colors">
                  Daftar Peringkat Akreditasi
                </Link>
              </li>
              <li>
                <Link href="/fasilitas-dan-kampus" className="hover:text-amber-400 transition-colors">
                  Fasilitas & Mini Hospital
                </Link>
              </li>
              <li>
                <Link href="/beasiswa" className="hover:text-amber-400 transition-colors">
                  Beasiswa KIP Kuliah & Yayasan
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom Kontak Loket PMB */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Loket PMB Kampus
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Jl. Pramuka No. 2, Pemurus Luar, Kec. Banjarmasin Timur, Kota Banjarmasin, Kalimantan Selatan 70238</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>(0511) 3268108 / 0811-500-1234</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>pmb@unism.ac.id</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Peringatan Rekening & Hak Cipta */}
        <div className="border-t border-[#1E3A8A]/30 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs text-slate-300">
          <p>
            © {new Date().getFullYear()} Universitas Sari Mulia Banjarmasin. Seluruh hak cipta dilindungi.
          </p>
          <p className="text-[11px] text-amber-400/90 font-medium">
            Pembayaran pendaftaran hanya melalui virtual account bank resmi atas nama Universitas Sari Mulia.
          </p>
        </div>
      </div>
    </footer>
  );
}
