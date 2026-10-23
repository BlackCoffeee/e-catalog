/**
 * @author Muhammad Arif Budiman - [https://github.com/BlackCoffeee]
 * @createAt 2026-10-24
 */
'use client';

import * as React from 'react';
import { Calculator, Check, ArrowRight } from 'lucide-react';
import { formatRupiah } from '@/lib/utils';
import gsap from 'gsap';

interface ProdiOption {
  id: number;
  name: string;
  degreeLevel: string;
  facultyName: string;
  regularEarly: number;
  regularLate: number;
  employeeEarly?: number;
  employeeLate?: number;
}

const PRODI_DATA: ProdiOption[] = [
  {
    id: 1,
    name: 'Sarjana Teknologi Informasi',
    degreeLevel: 'S1',
    facultyName: 'Fakultas Sains & Teknologi',
    regularEarly: 2200000,
    regularLate: 2400000,
    employeeEarly: 2500000,
    employeeLate: 2700000,
  },
  {
    id: 2,
    name: 'Sarjana Sistem Informasi',
    degreeLevel: 'S1',
    facultyName: 'Fakultas Sains & Teknologi',
    regularEarly: 2200000,
    regularLate: 2400000,
    employeeEarly: 2500000,
    employeeLate: 2700000,
  },
  {
    id: 3,
    name: 'Sarjana Teknik Industri',
    degreeLevel: 'S1',
    facultyName: 'Fakultas Sains & Teknologi',
    regularEarly: 2300000,
    regularLate: 2500000,
    employeeEarly: 2600000,
    employeeLate: 2800000,
  },
  {
    id: 4,
    name: 'Sarjana Farmasi',
    degreeLevel: 'S1',
    facultyName: 'Fakultas Kesehatan',
    regularEarly: 3200000,
    regularLate: 3500000,
  },
  {
    id: 5,
    name: 'Sarjana Keperawatan',
    degreeLevel: 'S1',
    facultyName: 'Fakultas Kesehatan',
    regularEarly: 2800000,
    regularLate: 3000000,
  },
  {
    id: 6,
    name: 'Sarjana Kebidanan',
    degreeLevel: 'S1',
    facultyName: 'Fakultas Kesehatan',
    regularEarly: 2700000,
    regularLate: 2900000,
  },
  {
    id: 7,
    name: 'Diploma Tiga Kebidanan',
    degreeLevel: 'D3',
    facultyName: 'Fakultas Kesehatan',
    regularEarly: 2300000,
    regularLate: 2400000,
  },
  {
    id: 8,
    name: 'Sarjana Manajemen',
    degreeLevel: 'S1',
    facultyName: 'Fakultas Humaniora',
    regularEarly: 2000000,
    regularLate: 2200000,
    employeeEarly: 2300000,
    employeeLate: 2500000,
  },
  {
    id: 9,
    name: 'Sarjana Akuntansi',
    degreeLevel: 'S1',
    facultyName: 'Fakultas Humaniora',
    regularEarly: 2000000,
    regularLate: 2200000,
    employeeEarly: 2300000,
    employeeLate: 2500000,
  },
  {
    id: 10,
    name: 'Sarjana Hukum',
    degreeLevel: 'S1',
    facultyName: 'Fakultas Humaniora',
    regularEarly: 2100000,
    regularLate: 2300000,
    employeeEarly: 2400000,
    employeeLate: 2600000,
  },
];

export function TuitionCalculatorWidget() {
  const [selectedProdiId, setSelectedProdiId] = React.useState<number>(1);
  const [classType, setClassType] = React.useState<'REGULAR' | 'EMPLOYEE'>('REGULAR');
  const [hasPrestasiDiscount, setHasPrestasiDiscount] = React.useState(false);

  const selectedProdi =
    PRODI_DATA.find((p) => p.id === selectedProdiId) || PRODI_DATA[0];

  const hasEmployeeClass = Boolean(selectedProdi.employeeEarly);
  const effectiveClassType = hasEmployeeClass ? classType : 'REGULAR';

  const trimesterFeeEarly =
    effectiveClassType === 'EMPLOYEE' && selectedProdi.employeeEarly
      ? selectedProdi.employeeEarly
      : selectedProdi.regularEarly;

  const trimesterFeeLate =
    effectiveClassType === 'EMPLOYEE' && selectedProdi.employeeLate
      ? selectedProdi.employeeLate
      : selectedProdi.regularLate;

  const monthlyEstimation = Math.round(trimesterFeeEarly / 3);
  const dppDiscount = hasPrestasiDiscount ? 750000 : 0;

  const [displayMonthly, setDisplayMonthly] = React.useState(monthlyEstimation);

  // Animasi counter angka saat pengguna mengubah pilihan prodi/kelas
  React.useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setDisplayMonthly(monthlyEstimation);
      return;
    }

    const obj = { val: displayMonthly };
    gsap.to(obj, {
      val: monthlyEstimation,
      duration: 0.4,
      ease: 'power1.out',
      onUpdate: () => {
        setDisplayMonthly(Math.round(obj.val));
      },
    });
  }, [monthlyEstimation]);

  return (
    <div className="w-full bg-[#131F33] text-white rounded-lg border border-[#22324F] p-6 sm:p-8 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded bg-amber-500 text-slate-950 font-bold flex items-center justify-center">
          <Calculator className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white">
            Simulasi Biaya Trimester (Setiap 3 Bulan Sekali)
          </h3>
          <p className="text-xs text-slate-300">
            Pilih program studi dan tipe kelas untuk melihat transparansi rincian biaya kuliah di Universitas Sari Mulia.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Kolom Pilihan */}
        <div className="lg:col-span-6 space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 block">
              Pilih Program Studi
            </label>
            <select
              value={selectedProdiId}
              onChange={(e) => setSelectedProdiId(Number(e.target.value))}
              className="w-full bg-[#0A1220] border border-[#22324F] rounded-md py-2.5 px-3 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-400"
            >
              {PRODI_DATA.map((p) => (
                <option key={p.id} value={p.id} className="bg-[#0A1220] text-white">
                  {p.name} ({p.degreeLevel}) - {p.facultyName}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 block">
              Tipe Kelas Perkuliahan
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setClassType('REGULAR')}
                className={`py-2 px-3 rounded-md text-xs font-semibold border transition-all ${
                  effectiveClassType === 'REGULAR'
                    ? 'bg-sky-500/20 text-sky-400 border-sky-400'
                    : 'bg-[#0A1220] text-slate-400 border-[#22324F] hover:text-white'
                }`}
              >
                Kelas Reguler Pagi
              </button>
              <button
                type="button"
                disabled={!hasEmployeeClass}
                onClick={() => setClassType('EMPLOYEE')}
                className={`py-2 px-3 rounded-md text-xs font-semibold border transition-all ${
                  !hasEmployeeClass
                    ? 'opacity-40 cursor-not-allowed bg-[#0A1220] text-slate-500 border-[#22324F]'
                    : effectiveClassType === 'EMPLOYEE'
                    ? 'bg-sky-500/20 text-sky-400 border-sky-400'
                    : 'bg-[#0A1220] text-slate-400 border-[#22324F] hover:text-white'
                }`}
              >
                Kelas Karyawan / Malam
              </button>
            </div>
            {!hasEmployeeClass && (
              <p className="text-[11px] text-amber-400/90 mt-1">
                Prodi rumpun kesehatan hanya menyelenggarakan kelas reguler penuh waktu.
              </p>
            )}
          </div>

          <div className="pt-2 border-t border-[#22324F]">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={hasPrestasiDiscount}
                onChange={(e) => setHasPrestasiDiscount(e.target.checked)}
                className="w-4 h-4 rounded text-amber-500 bg-[#0A1220] border-[#22324F] focus:ring-amber-400"
              />
              <span className="text-xs text-slate-200">
                Punya sertifikat prestasi peringkat 1 sampai 10 (Jalur UNISM Cerdas)
              </span>
            </label>
          </div>
        </div>

        {/* Kolom Hasil Kalkulasi */}
        <div className="lg:col-span-6 bg-[#0A1220] border border-[#22324F] rounded-lg p-5 flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#22324F]">
              <span className="text-xs text-slate-400 font-medium">Program Terpilih</span>
              <span className="text-xs font-bold text-amber-400 text-right">
                {selectedProdi.name}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-300">Biaya Trimester Fase 1 (Smt 1-4)</span>
                <span className="text-base font-bold text-white tabular-nums">
                  {formatRupiah(trimesterFeeEarly)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-300">Biaya Trimester Fase 2 (Smt 5-8)</span>
                <span className="text-base font-bold text-slate-300 tabular-nums">
                  {formatRupiah(trimesterFeeLate)}
                </span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-[#22324F]/60">
                <span className="text-xs text-sky-300 font-medium">
                  Estimasi Beban per Bulan (Trimester / 3)
                </span>
                <span className="text-lg font-bold text-sky-400 tabular-nums">
                  ~ {formatRupiah(displayMonthly)} / bln
                </span>
              </div>
            </div>

            {hasPrestasiDiscount && (
              <div className="p-2.5 rounded bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-medium">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Potongan DPP Jalur Prestasi:</span>
                </span>
                <span className="font-bold tabular-nums">
                  - {formatRupiah(dppDiscount)}
                </span>
              </div>
            )}
          </div>

        <div className="pt-2 border-t border-[#22324F]">
          <a
            href="https://siak.unism.ac.id/pmb"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              import('@/lib/analytics').then(({ trackEvent }) => {
                trackEvent({
                  eventType: 'CALCULATOR_SIMULATION',
                  targetPath: '/biaya-pendidikan',
                  prodiSlug: selectedProdi.name,
                });
              });
            }}
            className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-2.5 rounded-md text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-colors"
          >
            <span>Daftar Prodi Ini di Portal PMB</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
        </div>
      </div>
    </div>
  );
}
