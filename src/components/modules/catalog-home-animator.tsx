/**
 * @author Muhammad Arif Budiman - [https://github.com/BlackCoffeee]
 * @createAt 2026-10-24
 */
'use client';

import * as React from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function CatalogHomeAnimator({
  children,
}: {
  children: React.ReactNode;
}) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;
      if (prefersReducedMotion) return;

      // 1. Hero Reveal: Elemen teks & kartu visual gambar hero
      const heroTl = gsap.timeline({ defaults: { ease: 'power2.out' } });
      heroTl
        .from('.hero-badge', { y: -15, opacity: 0, duration: 0.5, delay: 0.1 })
        .from('.hero-title', { y: 25, opacity: 0, duration: 0.7 }, '-=0.3')
        .from('.hero-desc', { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
        .from('.hero-actions', { y: 15, opacity: 0, duration: 0.5 }, '-=0.3')
        .from('.hero-image', { scale: 0.95, opacity: 0, duration: 0.8 }, '-=0.5');

      // 2. Quick Hub Cards Reveal
      gsap.from('.quick-hub-card', {
        scrollTrigger: {
          trigger: '.quick-hub-section',
          start: 'top 92%',
          once: true,
        },
        y: 20,
        opacity: 0,
        duration: 0.4,
        stagger: 0.06,
        ease: 'power2.out',
        clearProps: 'all',
      });

      // 3. Featured Prodi Cards Reveal saat scroll
      gsap.from('.prodi-card', {
        scrollTrigger: {
          trigger: '.prodi-section',
          start: 'top 85%',
          once: true,
        },
        y: 25,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out',
        clearProps: 'all',
      });

      // 4. Registration 5 Steps Stagger Reveal
      gsap.from('.step-card', {
        scrollTrigger: {
          trigger: '.steps-section',
          start: 'top 88%',
          once: true,
        },
        y: 20,
        opacity: 0,
        duration: 0.4,
        stagger: 0.06,
        ease: 'power2.out',
        clearProps: 'all',
      });
    },
    { scope: containerRef }
  );

  return <div ref={containerRef} className="w-full">{children}</div>;
}
