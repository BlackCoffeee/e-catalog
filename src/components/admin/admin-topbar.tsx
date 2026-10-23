/**
 * @author Muhammad Arif Budiman - [https://github.com/BlackCoffeee]
 * @createAt 2026-10-24
 */
'use client';

import * as React from 'react';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Calendar, User } from 'lucide-react';

interface TopbarProps {
  collapsed: boolean;
}

export function AdminTopbar({ collapsed }: TopbarProps) {
  return (
    <header
      className={`sticky top-0 z-20 h-16 bg-background/95 backdrop-blur border-b border-border transition-all duration-200 flex items-center justify-between px-6 ${
        collapsed ? 'ml-16' : 'ml-64'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 px-3 py-1 rounded text-xs font-bold">
          <Calendar className="w-3.5 h-3.5" />
          <span>Periode Aktif: TA 2027/2028 (Aktif)</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <div className="flex items-center gap-2 pl-3 border-l border-border">
          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
            <User className="w-4 h-4" />
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-xs font-bold text-foreground">Admin PMB</span>
            <span className="text-[10px] text-muted-foreground">Staf Pengelola</span>
          </div>
        </div>
      </div>
    </header>
  );
}
