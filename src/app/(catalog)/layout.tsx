/**
 * @author Muhammad Arif Budiman - [https://github.com/BlackCoffeee]
 * @createAt 2026-10-24
 */
'use client';

import * as React from 'react';
import { trackEvent } from '@/lib/analytics';
import { AnnouncementBar } from '@/components/modules/announcement-bar';
import { Navbar } from '@/components/modules/navbar';
import { Footer } from '@/components/modules/footer';
import { MobileDualCtaBar } from '@/components/modules/mobile-dual-cta-bar';
import { RouteProgressBar } from '@/components/modules/route-progress-bar';
import { usePathname } from 'next/navigation';

export default function CatalogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  React.useEffect(() => {
    trackEvent({
      eventType: 'PAGE_VIEW',
      targetPath: pathname,
    });
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Top Accent Route Progress Bar */}
      <RouteProgressBar />

      {/* Top Bar Pengumuman Periode */}
      <AnnouncementBar />

      {/* Header Sticky Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 w-full pb-20 md:pb-0">{children}</main>

      {/* Sticky Dual CTA Khusus Mobile (< 768px) */}
      <MobileDualCtaBar />

      {/* Komprehensif Footer Publik */}
      <Footer />
    </div>
  );
}
