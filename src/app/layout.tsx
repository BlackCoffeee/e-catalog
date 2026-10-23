/**
 * @author Muhammad Arif Budiman - [https://github.com/BlackCoffeee]
 * @createAt 2026-10-24
 */
import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'PMB Universitas Sari Mulia | Digital E-Catalog & Admission Portal',
  description:
    'Portal Penerimaan Mahasiswa Baru Universitas Sari Mulia Banjarmasin. Informasi program studi, akreditasi resmi, skema biaya kuliah per-trimester, jalur seleksi, dan beasiswa.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${plusJakartaSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col transition-colors duration-150">
        {children}
      </body>
    </html>
  );
}
