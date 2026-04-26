'use client';

import { useEffect } from 'react';

/**
 * Client-only behavior layer for CategoryFilmstrip.
 *
 * The filmstrip's static markup is rendered server-side (see CategoryFilmstrip.tsx)
 * with active-index 0 transforms baked in. This component attaches scroll/wheel
 * listeners after hydration and updates the cards' inline styles directly via
 * the DOM — no React re-renders during scroll.
 *
 * It finds the markup via [data-filmstrip] and walks down by data-attributes,
 * so server and client share zero state at React level. The only contract is
 * the DOM shape, which keeps the LCP image off the JS-hydration critical path.
 */
export default function CategoryFilmstripBehavior() {
  useEffect(() => {
    const section = document.querySelector<HTMLElement>('[data-filmstrip]');
    const strip = section?.querySelector<HTMLElement>('[data-filmstrip-strip]');
    if (!section || !strip) return;

    const cards = Array.from(section.querySelectorAll<HTMLElement>('[data-filmstrip-card]'));
    const dotsMain = Array.from(section.querySelectorAll<HTMLElement>('[data-filmstrip-dot]'));
    const dotsPill = Array.from(section.querySelectorAll<HTMLElement>('[data-filmstrip-dot-pill]'));

    let active = 0;
    let raf = 0;
    let snapTimer: number | null = null;
    let snapAnim: number | null = null;
    let isTouching = false;
    let isProgrammaticScroll = false;

    function styleFor(offset: number): { transform: string; opacity: string } {
      const abs = Math.abs(offset);
      if (abs === 0) {
        return { transform: 'perspective(1200px) rotateY(0deg) translateZ(0px) scale(1)', opacity: '1' };
      }
      if (abs === 1) {
        const ry = offset < 0 ? 35 : -35;
        return { transform: `perspective(1200px) rotateY(${ry}deg) translateZ(-80px) scale(0.88)`, opacity: '0.6' };
      }
      const ry = offset < 0 ? 50 : -50;
      return { transform: `perspective(1200px) rotateY(${ry}deg) translateZ(-80px) scale(0.75)`, opacity: '0.35' };
    }

    function paint(activeIdx: number) {
      cards.forEach((card, i) => {
        const s = styleFor(i - activeIdx);
        card.style.transform = s.transform;
        card.style.opacity = s.opacity;
      });
      const dotsList = [dotsMain, dotsPill];
      dotsList.forEach((dots) => {
        dots.forEach((dot, i) => {
          dot.style.opacity = i === activeIdx ? '1' : '0.28';
          dot.style.transform = i === activeIdx ? 'scaleX(2.8)' : 'scaleX(1)';
        });
      });
    }

    function nearestIndex(): number {
      const center = strip!.scrollLeft + strip!.clientWidth / 2;
      let idx = 0;
      let min = Infinity;
      cards.forEach((card, i) => {
        const cc = card.offsetLeft + card.offsetWidth / 2;
        const d = Math.abs(cc - center);
        if (d < min) { min = d; idx = i; }
      });
      return idx;
    }

    function update() {
      const idx = nearestIndex();
      if (idx !== active) {
        active = idx;
        paint(idx);
      }
    }

    function onScroll() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    }

    // Vertical-wheel → horizontal scroll (desktop)
    function onWheel(e: WheelEvent) {
      if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) {
        e.preventDefault();
        strip!.scrollLeft += e.deltaY * 0.8;
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(update);
      }
    }

    strip.addEventListener('scroll', onScroll, { passive: true });
    strip.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      strip.removeEventListener('scroll', onScroll);
      strip.removeEventListener('wheel', onWheel);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
      if (snapTimer !== null) window.clearTimeout(snapTimer);
      if (snapAnim !== null) cancelAnimationFrame(snapAnim);
      // Suppress unused warnings — kept for future snap-on-scroll-end work
      void isTouching; void isProgrammaticScroll;
    };
  }, []);

  return null;
}
