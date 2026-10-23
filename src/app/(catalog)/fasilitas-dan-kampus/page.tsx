/**
 * @author Muhammad Arif Budiman - [https://github.com/BlackCoffeee]
 * @createAt 2026-10-24
 */
import { prisma } from '@/lib/prisma';
import Image from 'next/image';

export const metadata = {
  title: 'Fasilitas & Gedung Kampus | PMB Universitas Sari Mulia',
  description:
    'Eksplorasi sarana perkuliahan representatif: laboratorium medis terpadu, lab komputasi modern, dan mini hospital standar RS.',
};

export const dynamic = 'force-dynamic';

export default async function FasilitasPage() {
  const facilities = await prisma.campusFacility.findMany({
    orderBy: { id: 'asc' },
  });

  return (
    <div className="w-full py-10 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-accent">
            Sarana & Prasarana
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-1">
            Fasilitas Kampus & Laboratorium Terpadu
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-2xl">
            Universitas Sari Mulia menyediakan fasilitas perkuliahan modern untuk mendukung penguasaan kompetensi klinis, teknologi, dan manajerial.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {facilities.map((f) => (
            <div
              key={f.id}
              className="rounded-lg border border-border bg-card overflow-hidden shadow-sm flex flex-col"
            >
              <div className="relative aspect-[16/9] w-full bg-slate-200">
                <Image
                  src={f.imageUrl}
                  alt={f.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 600px"
                />
              </div>
              <div className="p-6 space-y-2">
                <h3 className="font-bold text-base text-foreground">{f.name}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {f.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
