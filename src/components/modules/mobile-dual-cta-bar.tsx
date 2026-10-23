/**
 * @author Muhammad Arif Budiman - [https://github.com/BlackCoffeee]
 * @createAt 2026-10-24
 */
'use client';

import * as React from 'react';
import { MessageCircle, UserPlus } from 'lucide-react';

export function MobileDualCtaBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background/95 backdrop-blur border-t border-border p-3 shadow-lg">
      <div className="grid grid-cols-2 gap-2">
        <a
          href="https://wa.me/628115001234?text=Halo%20Admin%20PMB%20UNISM,%20saya%20ingin%20konsultasi%20pendaftaran"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 bg-[#059669] hover:bg-[#047857] text-white font-bold text-xs py-3 px-2 rounded-md shadow-sm transition-colors text-center"
        >
          <MessageCircle className="w-4 h-4 shrink-0" />
          <span>Chat WhatsApp</span>
        </a>
        <a
          href="https://siak.unism.ac.id/pmb"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 bg-accent hover:opacity-95 text-accent-foreground font-bold text-xs py-3 px-2 rounded-md shadow-sm transition-opacity text-center"
        >
          <UserPlus className="w-4 h-4 shrink-0" />
          <span>Daftar PMB</span>
        </a>
      </div>
    </div>
  );
}
