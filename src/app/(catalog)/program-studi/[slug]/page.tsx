/**
 * @author Muhammad Arif Budiman - [https://github.com/BlackCoffeee]
 * @createAt 2026-10-24
 */
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import {
  ShieldCheck,
  GraduationCap,
  Clock,
  Briefcase,
  ArrowRight,
  MessageCircle,
  FileCheck,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { formatRupiah } from '@/lib/utils';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const prodi = await prisma.studyProgram.findUnique({
    where: { slug },
  });

  if (!prodi) return { title: 'Program Studi Tidak Ditemukan' };

  return {
    title: `${prodi.name} | PMB Universitas Sari Mulia`,
    description: prodi.description,
  };
}

export const dynamic = 'force-dynamic';

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const prodi = await prisma.studyProgram.findUnique({
    where: { slug },
    include: {
      faculty: true,
      tuitionFees: true,
      lecturePrograms: true,
    },
  });

  if (!prodi) notFound();

  const regularFee = prodi.tuitionFees.find((t) => t.trackCategory === 'REGULAR') || prodi.tuitionFees[0];
  const employeeFee = prodi.tuitionFees.find((t) => t.trackCategory === 'EMPLOYEE');
  const careerList = Array.isArray(prodi.careerProspects) ? (prodi.careerProspects as string[]) : [];

  return (
    <div className="w-full py-10 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-foreground">Beranda</Link>
          <span>/</span>
          <Link href="/program-studi" className="hover:text-foreground">Program Studi</Link>
          <span>/</span>
          <span className="text-foreground font-semibold">{prodi.name}</span>
        </div>

        {/* 2-Kolom Split Layout (70% Konten Akademik & 30% Sticky Sidebar Biaya) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Kolom Kiri: 70% Konten Akademik */}
          <div className="lg:col-span-8 space-y-8">
            <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden border border-border shadow-md">
              <Image
                src={prodi.imageCover}
                alt={prodi.name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 800px"
              />
            </div>

            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="accent">{prodi.faculty.name}</Badge>
                <Badge variant={prodi.accreditation === 'Unggul' ? 'success' : 'info'}>
                  Akreditasi {prodi.accreditation}
                </Badge>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                {prodi.name}
              </h1>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-lg bg-card border border-border text-xs">
                <div>
                  <span className="text-muted-foreground block">Jenjang Studi</span>
                  <span className="font-bold text-foreground text-sm">{prodi.degreeLevel}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block">Gelar Kelulusan</span>
                  <span className="font-bold text-foreground text-sm">{prodi.degreeTitle}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block">Masa Studi Normal</span>
                  <span className="font-bold text-foreground text-sm tabular-nums">
                    {Number(prodi.studyDurationYears)} Tahun
                  </span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <h2 className="text-base font-bold text-foreground">
                  Deskripsi & Fokus Keilmuan
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {prodi.description}
                </p>
              </div>

              {/* Peluang Karier */}
              <div className="space-y-3 pt-4 border-t border-border">
                <h2 className="text-base font-bold text-foreground flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-primary" />
                  <span>Peluang Karier Lulusan</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {careerList.map((career, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-md bg-muted/60 border border-border text-xs font-medium text-foreground flex items-center gap-2"
                    >
                      <FileCheck className="w-3.5 h-3.5 text-accent shrink-0" />
                      <span>{career}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: 30% Sticky Sidebar Biaya & Pendaftaran */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
            <div className="rounded-lg border border-border bg-card p-6 shadow-md space-y-5">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-accent">
                  Skema Pembiayaan
                </span>
                <h3 className="text-lg font-bold text-foreground mt-0.5">
                  Biaya Kuliah per-Trimester
                </h3>
                <p className="text-xs text-muted-foreground">
                  Dibayarkan setiap 3 bulan sekali.
                </p>
              </div>

              {regularFee && (
                <div className="p-3.5 rounded-md bg-muted/50 border border-border space-y-2">
                  <span className="text-xs font-bold text-foreground block">
                    Kelas Reguler Pagi
                  </span>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Fase 1 (Smt 1-4)</span>
                    <span className="font-bold text-foreground tabular-nums">
                      {formatRupiah(Number(regularFee.earlyTrimesterFee))}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Fase 2 (Smt 5-8)</span>
                    <span className="font-bold text-foreground tabular-nums">
                      {formatRupiah(Number(regularFee.lateTrimesterFee))}
                    </span>
                  </div>
                </div>
              )}

              {employeeFee && (
                <div className="p-3.5 rounded-md bg-muted/50 border border-border space-y-2">
                  <span className="text-xs font-bold text-foreground block">
                    Kelas Karyawan / Malam
                  </span>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Fase 1 (Smt 1-4)</span>
                    <span className="font-bold text-foreground tabular-nums">
                      {formatRupiah(Number(employeeFee.earlyTrimesterFee))}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Fase 2 (Smt 5-8)</span>
                    <span className="font-bold text-foreground tabular-nums">
                      {formatRupiah(Number(employeeFee.lateTrimesterFee))}
                    </span>
                  </div>
                </div>
              )}

              <div className="space-y-2 pt-2">
                <a
                  href="https://siak.unism.ac.id/pmb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-accent hover:opacity-95 text-accent-foreground font-bold py-2.5 px-4 rounded-md text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <span>Daftar Jurusan Ini</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href={`https://wa.me/628115001234?text=Halo%20Admin%20PMB%20UNISM,%20saya%20ingin%20tanya%20prodi%20${encodeURIComponent(prodi.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#059669] hover:bg-[#047857] text-white font-semibold py-2.5 px-4 rounded-md text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Konsultasi WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
