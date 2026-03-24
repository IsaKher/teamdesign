'use client';
import { useEffect } from 'react';

export default function HeroParallax() {
  useEffect(() => {
    const imageWrap = document.querySelector('[data-hero-parallax]') as HTMLElement | null;
    if (!imageWrap) return;

    const handleScroll = () => {
      const y = window.scrollY;
      imageWrap.style.transform = `translateY(${y * 0.22}px)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return null;
}
