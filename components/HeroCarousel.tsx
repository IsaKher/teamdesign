'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './HeroCarousel.module.css';
import { WARM_BLUR } from '@/lib/siteContent';

const CDN = 'https://cdn.sanity.io/images/il220i1c/production';
const q = (path: string) => `${CDN}/${path}?w=1600&q=80&auto=format&fit=max`;

const SLIDES = [
  {
    src: q('bbff8295b9476da488520cfc8a2a7b557e0b574d-6725x4485.jpg'),
    alt: 'Luthra Group — Reception',
    position: 'center center',
  },
  {
    src: q('a9037d6e7ba9ac0b80496e087d60795ecc650c8b-1536x1024.png'),
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
    src: q('90eff17ceae1de12db6a918460f2fc430ccec55f-7360x4912.jpg'),
    alt: 'Unilazer Ventures — Office',
    position: 'center center',
  },
];

const INTERVAL = 5500;

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  // Track which slide indexes have been added to the DOM (i.e. started loading).
  // Start with slides 0 and 1 so the first transition is instant.
  const [loaded, setLoaded] = useState<Set<number>>(() => new Set([0, 1]));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(c => {
        const next = (c + 1) % SLIDES.length;
        // As soon as we advance, queue the slide AFTER next so it has the
        // full interval window (5.5 s) to load before it becomes current.
        setLoaded(prev => {
          const afterNext = (next + 1) % SLIDES.length;
          if (prev.has(afterNext)) return prev;
          const updated = new Set(prev);
          updated.add(afterNext);
          return updated;
        });
        return next;
      });
    }, INTERVAL);
    return () => clearInterval(timer);
  }, []);

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
