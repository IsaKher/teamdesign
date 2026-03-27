'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './HeroCarousel.module.css';
import { WARM_BLUR } from '@/lib/siteContent';

const SLIDES = [
  { src: '/projects/mohan-shenoi-residence/3.jpg',   alt: 'Mohan Shenoi Residence — Living Room',     position: 'center center' },
  { src: '/projects/mohan-shenoi-residence/6.jpg',   alt: 'Mohan Shenoi Residence — Mumbai',          position: 'center center' },
  { src: '/projects/jhaveri-zaveri-residence/2.jpg', alt: 'Jhaveri Zaveri Residence — Mumbai',        position: 'center center' },
  { src: '/projects/jhaveri-zaveri-residence/4.jpg', alt: 'Jhaveri Zaveri Residence — Entrance Foyer', position: 'center center' },
  { src: '/projects/rahul-sanjana-residence/1.jpg',  alt: 'Rahul & Sanjana Residence — Mumbai',       position: 'center center' },
  { src: '/projects/mohan-shenoi-residence/1.jpg',   alt: 'Mohan Shenoi Residence — Mumbai',          position: 'center center' },
  { src: '/projects/jhaveri-zaveri-residence/1.jpg', alt: 'Jhaveri Zaveri Residence — Mumbai',        position: 'center center' },
];

const INTERVAL = 5500;  // ms between transitions

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  // Only render an image once the carousel has reached that slide —
  // avoids loading 8 full-res images on first paint.
  const [rendered, setRendered] = useState<Set<number>>(new Set([0]));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(c => {
        const next = (c + 1) % SLIDES.length;
        setRendered(prev => { const s = new Set(prev); s.add(next); return s; });
        return next;
      });
    }, INTERVAL);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.wrap}>
      {SLIDES.map((slide, i) => (
        <div
          key={slide.src}
          className={`${styles.slide} ${i === current ? styles.active : ''}`}
        >
          {rendered.has(i) && (
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              sizes="100vw"
              style={{ objectFit: 'cover', objectPosition: slide.position }}
              priority={i === 0}
              placeholder="blur"
              blurDataURL={WARM_BLUR}
            />
          )}
        </div>
      ))}
    </div>
  );
}
