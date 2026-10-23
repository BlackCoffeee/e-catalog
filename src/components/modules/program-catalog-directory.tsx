/**
 * @author Muhammad Arif Budiman - [https://github.com/BlackCoffeee]
 * @createAt 2026-10-24
 */
'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LayoutGrid, Table as TableIcon, Search, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { formatRupiah } from '@/lib/utils';

interface ProdiItem {
  id: number;
  slug: string;
  name: string;
  facultyName: string;
  facultyCode: string;
  degreeLevel: string;
  degreeTitle: string;
  studyDurationYears: number;
  accreditation: string;
  description: string;
  imageCover: string;
  earlyFee: number;
  lateFee: number;
}

interface CatalogDirectoryProps {
  programs: ProdiItem[];
}

export function ProgramCatalogDirectory({ programs }: CatalogDirectoryProps) {
  const [viewMode, setViewMode] = React.useState<'grid' | 'table'>('grid');
  const [search, setSearch] = React.useState('');
  const [selectedFaculty, setSelectedFaculty] = React.useState<string>('ALL');

  const filtered = programs.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.degreeTitle.toLowerCase().includes(search.toLowerCase());
    const matchFaculty =
      selectedFaculty === 'ALL' || p.facultyCode === selectedFaculty;
    return matchSearch && matchFaculty;
  });

  return (
    <div className="space-y-6">
      {/* Search and Filters Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 rounded-lg bg-card border border-border">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama prodi..."
              className="w-full bg-background border border-border rounded-md py-2 pl-9 pr-3 text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0">
            {['ALL', 'FK', 'FST', 'FH', 'FKHB'].map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setSelectedFaculty(f)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold border transition-all ${
                  selectedFaculty === f
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-muted text-muted-foreground border-border hover:text-foreground'
                }`}
              >
                {f === 'ALL' ? 'Semua Fakultas' : f}
              </button>
            ))}
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 self-end md:self-auto">
          <button
            type="button"
            onClick={() => setViewMode('grid')}
            aria-label="Mode Kartu"
            className={`p-2 rounded border transition-all ${
              viewMode === 'grid'
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-card text-muted-foreground border-border hover:bg-muted'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setViewMode('table')}
            aria-label="Mode Tabel"
            className={`p-2 rounded border transition-all ${
              viewMode === 'table'
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-card text-muted-foreground border-border hover:bg-muted'
            }`}
          >
            <TableIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <div
              key={p.id}
              className="rounded-lg border border-border bg-card overflow-hidden shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/9] w-full bg-slate-200">
                  <Image
                    src={p.imageCover}
                    alt={p.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 360px"
                  />
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-muted-foreground">
                      {p.facultyCode} | {p.degreeLevel}
                    </span>
                    <Badge variant={p.accreditation === 'Unggul' ? 'success' : 'info'}>
                      {p.accreditation}
                    </Badge>
                  </div>
                  <h3 className="font-bold text-base text-foreground leading-snug">
                    {p.name}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {p.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-3 border-t border-border flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-muted-foreground block">
                    Trimester Smt 1-4
                  </span>
                  <span className="text-sm font-bold text-foreground tabular-nums">
                    {formatRupiah(p.earlyFee)}
                  </span>
                </div>
                <Link
                  href={`/program-studi/${p.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                >
                  <span>Detail Info</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Table View */}
      {viewMode === 'table' && (
        <div className="rounded-lg border border-border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-muted text-muted-foreground border-b border-border">
                <tr>
                  <th className="py-3 px-4 font-semibold">Program Studi</th>
                  <th className="py-3 px-4 font-semibold">Fakultas</th>
                  <th className="py-3 px-4 font-semibold">Jenjang & Gelar</th>
                  <th className="py-3 px-4 font-semibold">Akreditasi</th>
                  <th className="py-3 px-4 font-semibold">Biaya Trimester (Smt 1-4)</th>
                  <th className="py-3 px-4 font-semibold text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-foreground">
                {filtered.map((p) => (
                  <tr key={p.id}>
                    <td className="py-3.5 px-4 font-bold text-sm">{p.name}</td>
                    <td className="py-3.5 px-4 text-muted-foreground">{p.facultyCode}</td>
                    <td className="py-3.5 px-4">
                      {p.degreeLevel} ({p.degreeTitle})
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge variant={p.accreditation === 'Unggul' ? 'success' : 'info'}>
                        {p.accreditation}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-primary tabular-nums">
                      {formatRupiah(p.earlyFee)}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href={`/program-studi/${p.slug}`}
                        className="text-xs font-semibold text-primary hover:underline"
                      >
                        Detail →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
