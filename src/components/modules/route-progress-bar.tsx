/**
 * @author Muhammad Arif Budiman - [https://github.com/BlackCoffeee]
 * @createAt 2026-10-24
 */
'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';

export function RouteProgressBar() {
  const pathname = usePathname();
  const barRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // Media query preferensi gerakan pengguna
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !barRef.current) return;

    // Reset dan animasi bar progres emas tipis 3px saat rute berpindah
    gsap.fromTo(
      barRef.current,
      { width: '0%', opacity: 1 },
      {
        width: '100%',
        duration: 0.45,
        ease: 'power2.out',
        onComplete: () => {
          gsap.to(barRef.current, {
            opacity: 0,
            duration: 0.2,
            delay: 0.1,
          });
        },
      }
    );
  }, [pathname]);

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 h-[3px] bg-accent z-50 pointer-events-none opacity-0 shadow-sm"
      style={{ width: '0%' }}
    />
  );
}
