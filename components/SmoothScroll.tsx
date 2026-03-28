'use client';
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { useAnimationFrame } from 'framer-motion';

export default function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    lenisRef.current = new Lenis({
      duration: 0.9,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
    });

    return () => {
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Drive Lenis from Framer Motion's single shared RAF loop —
  // eliminates the double-RAF contention that caused scroll jank.
  useAnimationFrame((time) => {
    lenisRef.current?.raf(time);
  });

  return null;
}
