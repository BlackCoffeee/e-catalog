/**
 * @author Muhammad Arif Budiman - [https://github.com/BlackCoffeee]
 * @createAt 2026-10-24
 */
'use client';

import * as React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler,
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler
);

interface AnalyticsChartsProps {
  trafficTrends: {
    labels: string[];
    visitors: number[];
    leads: number[];
  };
  facultyDistribution: {
    labels: string[];
    counts: number[];
  };
  ctaConversions: {
    labels: string[];
    counts: number[];
  };
}

export function AdminAnalyticsCharts({
  trafficTrends,
  facultyDistribution,
  ctaConversions,
}: AnalyticsChartsProps) {
  // Chart 1: Tren Pengunjung & Peminat (Line Chart)
  const lineData = {
    labels: trafficTrends.labels,
    datasets: [
      {
        label: 'Kunjungan Halaman',
        data: trafficTrends.visitors,
        borderColor: '#0284C7',
        backgroundColor: 'rgba(2, 132, 199, 0.1)',
        tension: 0.3,
        fill: true,
      },
      {
        label: 'Klik Aksi PMB (Leads)',
        data: trafficTrends.leads,
        borderColor: '#D97706',
        backgroundColor: 'rgba(217, 119, 6, 0.1)',
        tension: 0.3,
        fill: true,
      },
    ],
  };

  // Chart 2: Sebaran Peminat per Fakultas (Doughnut Chart)
  const doughnutData = {
    labels: facultyDistribution.labels,
    datasets: [
      {
        data: facultyDistribution.counts,
        backgroundColor: ['#059669', '#0284C7', '#D97706', '#7C3AED'],
        borderWidth: 1,
        borderColor: '#1E293B',
      },
    ],
  };

  // Chart 3: Efektivitas Kanal Tombol Konversi (Bar Chart)
  const barData = {
    labels: ctaConversions.labels,
    datasets: [
      {
        label: 'Interaksi Calon Mahasiswa',
        data: ctaConversions.counts,
        backgroundColor: '#0F2942',
        borderRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: { family: 'inherit', size: 11 },
          color: '#94A3B8',
        },
      },
      tooltip: {
        bodyFont: { family: 'inherit', size: 12 },
        titleFont: { family: 'inherit', size: 12, weight: 'bold' as const },
      },
    },
    scales: {
      x: {
        grid: { color: 'rgba(148, 163, 184, 0.1)' },
        ticks: { font: { size: 11 }, color: '#94A3B8' },
      },
      y: {
        grid: { color: 'rgba(148, 163, 184, 0.1)' },
        ticks: { font: { size: 11 }, color: '#94A3B8' },
      },
    },
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Tren Kunjungan & Interaksi */}
        <div className="lg:col-span-8 p-5 rounded-lg border border-border bg-card shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-foreground">
                Tren Kunjungan & Interaksi Calon Mahasiswa (7 Hari Terakhir)
              </h3>
              <p className="text-xs text-muted-foreground">
                Monitoring aktivitas pengunjung katalog terhadap tombol aksi pendaftaran.
              </p>
            </div>
          </div>
          <div className="h-64 w-full">
            <Line data={lineData} options={chartOptions} />
          </div>
        </div>

        {/* Distribusi Fakultas */}
        <div className="lg:col-span-4 p-5 rounded-lg border border-border bg-card shadow-sm space-y-4">
          <div>
            <h3 className="font-bold text-sm text-foreground">
              Sebaran Peminat per Fakultas
            </h3>
            <p className="text-xs text-muted-foreground">
              Proporsi eksplorasi jurusan di 4 fakultas.
            </p>
          </div>
          <div className="h-64 w-full flex items-center justify-center">
            <Doughnut
              data={doughnutData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: { font: { size: 10 }, color: '#94A3B8' },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>

      {/* Kanal Konversi */}
      <div className="p-5 rounded-lg border border-border bg-card shadow-sm space-y-4">
        <div>
          <h3 className="font-bold text-sm text-foreground">
            Performa Kanal Konversi & Konsultasi
          </h3>
          <p className="text-xs text-muted-foreground">
            Jumlah interaksi pendaftar melalui Portal SPMB, Chat WhatsApp, dan Simulasi Kalkulator.
          </p>
        </div>
        <div className="h-60 w-full">
          <Bar data={barData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}
