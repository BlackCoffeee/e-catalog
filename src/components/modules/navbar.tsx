/**
 * @author Muhammad Arif Budiman - [https://github.com/BlackCoffeee]
 * @createAt 2026-10-24
 */
'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';

const NAV_LINKS = [
  { href: '/', label: 'Beranda' },
  { href: '/program-studi', label: 'Program Studi' },
  { href: '/biaya-pendidikan', label: 'Biaya Kuliah' },
  { href: '/jalur-seleksi', label: 'Jalur Masuk' },
  { href: '/akreditasi', label: 'Akreditasi' },
  { href: '/beasiswa', label: 'Beasiswa' },
  { href: '/fasilitas-dan-kampus', label: 'Fasilitas' },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur border-b border-border transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-md bg-[#0F2942] dark:bg-amber-500 text-white dark:text-slate-950 font-bold flex items-center justify-center text-sm shadow-sm transition-transform group-hover:scale-105">
            SM
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm tracking-tight text-[#0F2942] dark:text-slate-100 leading-tight">
              UNIVERSITAS SARI MULIA
            </span>
            <span className="text-[11px] text-muted-foreground leading-tight">
              Penerimaan Mahasiswa Baru
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action & Theme Toggle */}
        <div className="hidden sm:flex items-center gap-2">
          <ThemeToggle />
          <a
            href="https://siak.unism.ac.id/pmb"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent hover:opacity-95 text-accent-foreground text-xs font-bold px-4 py-2 rounded-md shadow-sm transition-all"
          >
            Daftar Sekarang
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 sm:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Buka menu navigasi"
            className="p-2 rounded-md border border-border text-foreground hover:bg-muted min-w-[40px] min-h-[40px] flex items-center justify-center"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-border bg-card p-4 space-y-2">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="pt-2 border-t border-border flex flex-col gap-2">
            <a
              href="https://siak.unism.ac.id/pmb"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center bg-accent text-accent-foreground font-bold text-sm py-2.5 rounded-md shadow-sm"
            >
              Daftar Sekarang
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
