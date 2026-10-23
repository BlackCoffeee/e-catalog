/**
 * @author Muhammad Arif Budiman - [https://github.com/BlackCoffeee]
 * @createAt 2026-10-24
 */
'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Calendar,
  GraduationCap,
  GitBranch,
  CreditCard,
  Building2,
  Award,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  ExternalLink,
} from 'lucide-react';
import { signOut } from 'next-auth/react';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const NAV_ITEMS = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/periods', label: 'Periode PMB', icon: Calendar },
  { href: '/admin/programs', label: 'Program Studi', icon: GraduationCap },
  { href: '/admin/tracks', label: 'Jalur Seleksi', icon: GitBranch },
  { href: '/admin/tuitions', label: 'Biaya Pendidikan', icon: CreditCard },
  { href: '/admin/facilities', label: 'Fasilitas Kampus', icon: Building2 },
  { href: '/admin/scholarships', label: 'Beasiswa', icon: Award },
];

export function AdminSidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`fixed top-0 left-0 bottom-0 z-30 bg-[#0A1220] border-r border-[#1E293B] text-slate-200 transition-all duration-200 flex flex-col ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-[#1E293B]">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-8 h-8 rounded bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-xs shrink-0">
            SM
          </div>
          {!collapsed && (
            <div className="flex flex-col truncate">
              <span className="font-bold text-xs text-white tracking-wide truncate">
                PANEL PMB
              </span>
              <span className="text-[10px] text-slate-400 truncate">
                Univ. Sari Mulia
              </span>
            </div>
          )}
        </div>
        <button
          onClick={onToggle}
          aria-label={collapsed ? 'Perluas sidebar' : 'Ciutkan sidebar'}
          className="p-1.5 rounded hover:bg-[#1E293B] text-slate-400 hover:text-white transition-colors"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-xs font-semibold transition-colors ${
                isActive
                  ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-[#131F33]'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer Actions */}
      <div className="p-3 border-t border-[#1E293B] space-y-1">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          title={collapsed ? 'Buka Portal Publik' : undefined}
          className="flex items-center gap-3 px-3 py-2 rounded-md text-xs font-medium text-slate-400 hover:text-white hover:bg-[#131F33] transition-colors"
        >
          <ExternalLink className="w-4 h-4 shrink-0" />
          {!collapsed && <span className="truncate">Portal Publik</span>}
        </a>
        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          title={collapsed ? 'Keluar' : undefined}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-950/30 transition-colors"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {!collapsed && <span className="truncate">Keluar Sesi</span>}
        </button>
      </div>
    </aside>
  );
}
