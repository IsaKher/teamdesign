'use client';
import { useEffect, useRef } from 'react';

/**
 * Smooth-scroll bootstrap.
 *
 * Two performance changes versus the previous version:
 *
 *   1. Lenis is dynamically imported, not statically. The JS chunk only
 *      downloads after we decide to initialise it — so it's off the
 *      critical path that gates LCP.
 *
 *   2. We wait for `requestIdleCallback` (or a 1.5s timeout fallback)
 *      before importing. The user gets the page painted, fonts settled,
 *      and the LCP image visible long before Lenis ever hits the parser.
 *
 * Also drops the dependency on framer-motion's useAnimationFrame — we
 * own a tiny RAF loop directly. Removes ~one shared chunk from the
 * homepage critical path.
 */

type LenisInstance = { raf: (time: number) => void; destroy: () => void };

export default function SmoothScroll() {
  const lenisRef = useRef<LenisInstance | null>(null);

  useEffect(() => {
    // Honour the user's motion preference — don't even import Lenis if so.
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let cancelled = false;
    let rafHandle = 0;
    let idleHandle = 0;
    let timeoutHandle = 0;

    async function init() {
      if (cancelled) return;
      try {
        const { default: Lenis } = await import('lenis');
        if (cancelled) return;

        const lenis = new Lenis({
          duration: 0.9,
          easing: (t: number) => 1 - Math.pow(1 - t, 4),
        });
        lenisRef.current = lenis;

        const tick = (time: number) => {
          lenis.raf(time);
          rafHandle = requestAnimationFrame(tick);
        };
        rafHandle = requestAnimationFrame(tick);
      } catch {
        // Lenis import failed — degrade silently to native scroll
      }
    }

    // Defer until idle so we don't compete with LCP.
    type IdleWindow = Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    const w = window as IdleWindow;
    if (typeof w.requestIdleCallback === 'function') {
      idleHandle = w.requestIdleCallback(init, { timeout: 1500 });
    } else {
      timeoutHandle = window.setTimeout(init, 800);
    }

    return () => {
      cancelled = true;
      if (rafHandle) cancelAnimationFrame(rafHandle);
      if (idleHandle && typeof w.cancelIdleCallback === 'function') {
        w.cancelIdleCallback(idleHandle);
      }
      if (timeoutHandle) clearTimeout(timeoutHandle);
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  return null;
}
