/**
 * @author Muhammad Arif Budiman - [https://github.com/BlackCoffeee]
 * @createAt 2026-10-24
 */
import { prisma } from '@/lib/prisma';
import { ProgramCatalogDirectory } from '@/components/modules/program-catalog-directory';

export const metadata = {
  title: 'Direktori Program Studi | PMB Universitas Sari Mulia',
  description:
    'Eksplorasi 15 program studi terakreditasi di Universitas Sari Mulia Banjarmasin. Informasi kurikulum, jenjang D3/S1/Profesi, akreditasi, dan biaya per-trimester.',
};

export const dynamic = 'force-dynamic';

export default async function ProgramStudiPage() {
  const prodis = await prisma.studyProgram.findMany({
    include: {
      faculty: true,
      tuitionFees: true,
    },
    orderBy: { facultyId: 'asc' },
  });

  const formattedPrograms = prodis.map((p) => {
    const regularTuition = p.tuitionFees.find((t) => t.trackCategory === 'REGULAR') || p.tuitionFees[0];
    return {
      id: p.id,
      slug: p.slug,
      name: p.name,
      facultyName: p.faculty.name,
      facultyCode: p.faculty.code,
      degreeLevel: p.degreeLevel,
      degreeTitle: p.degreeTitle,
      studyDurationYears: Number(p.studyDurationYears),
      accreditation: p.accreditation,
      description: p.description,
      imageCover: p.imageCover,
      earlyFee: regularTuition ? Number(regularTuition.earlyTrimesterFee) : 0,
      lateFee: regularTuition ? Number(regularTuition.lateTrimesterFee) : 0,
    };
  });

  return (
    <div className="w-full py-10 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-accent">
            Fakultas & Jurusan
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-1">
            Direktori 15 Program Studi UNISM
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-2xl">
            Pilih program studi impian Anda di 4 fakultas unggulan. Tersedia kelas reguler dan kelas karyawan dengan jadwal fleksibel.
          </p>
        </div>

        <ProgramCatalogDirectory programs={formattedPrograms} />
      </div>
    </div>
  );
}
