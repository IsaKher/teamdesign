'use client';
import { useRef } from 'react';
import { useAnimationFrame } from 'framer-motion';

export default function HeroParallax() {
  const imageWrapRef = useRef<HTMLElement | null>(null);

  useAnimationFrame(() => {
    // Resolve the element once, then reuse the ref
    if (!imageWrapRef.current) {
      imageWrapRef.current = document.querySelector('[data-hero-parallax]') as HTMLElement | null;
    }
    if (!imageWrapRef.current) return;
    imageWrapRef.current.style.transform = `translateY(${window.scrollY * 0.22}px)`;
  });

  return null;
}
