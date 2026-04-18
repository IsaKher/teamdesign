'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './HeroCarousel.module.css';
import { WARM_BLUR } from '@/lib/siteContent';

const CDN = 'https://cdn.sanity.io/images/il220i1c/production';

const SLIDES = [
  {
    src: `${CDN}/bbff8295b9476da488520cfc8a2a7b557e0b574d-6725x4485.jpg`,
    alt: 'Luthra Group — Reception',
    position: 'center center',
  },
  {
    src: `${CDN}/a9037d6e7ba9ac0b80496e087d60795ecc650c8b-1536x1024.png`,
    alt: 'Maharaja Agrasen Palace — Exterior',
    position: 'center center',
  },
  {
    src: '/projects/rahul-sanjana-residence/1.jpg',
    alt: 'Rahul & Sanjana Residence — Living Room',
    position: 'center center',
  },
  {
    src: '/projects/usha-shenoi-residence/1.jpg',
    alt: 'Usha Shenoi Residence — Living Room',
    position: 'center center',
  },
  {
    src: `${CDN}/90eff17ceae1de12db6a918460f2fc430ccec55f-7360x4912.jpg`,
    alt: 'Unilazer Ventures — Office',
    position: 'center center',
  },
];

const INTERVAL = 5500;
// Preload the next slide this many ms before it becomes current
const PRELOAD_AHEAD = 2000;

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  // Only the slides we've started loading — starts with just slide 0
  const [loaded, setLoaded] = useState<Set<number>>(() => new Set([0]));
  const preloadTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(c => (c + 1) % SLIDES.length);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, []);

  // Whenever the current slide changes, schedule a just-in-time preload
  // of the next slide — fires 2 s before it becomes visible
  useEffect(() => {
    if (preloadTimerRef.current) clearTimeout(preloadTimerRef.current);

    const next = (current + 1) % SLIDES.length;
    preloadTimerRef.current = setTimeout(() => {
      setLoaded(prev => {
        if (prev.has(next)) return prev;
        const updated = new Set(prev);
        updated.add(next);
        return updated;
      });
    }, INTERVAL - PRELOAD_AHEAD);

    return () => {
      if (preloadTimerRef.current) clearTimeout(preloadTimerRef.current);
    };
  }, [current]);

  return (
    <div className={styles.wrap}>
      {SLIDES.map((slide, i) => (
        <div
          key={i}
          className={`${styles.slide} ${i === current ? styles.active : ''}`}
        >
          {loaded.has(i) && (
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              sizes="100vw"
              style={{ objectFit: 'cover', objectPosition: slide.position }}
              priority={i === 0}
              placeholder="blur"
              blurDataURL={WARM_BLUR}
              quality={85}
            />
          )}
        </div>
      ))}
    </div>
  );
}
