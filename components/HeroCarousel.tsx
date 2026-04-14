'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './HeroCarousel.module.css';
import { WARM_BLUR } from '@/lib/siteContent';

const CDN = 'https://cdn.sanity.io/images/il220i1c/production';

const SLIDES = [
  {
    src: `${CDN}/bbff8295b9476da488520cfc8a2a7b557e0b574d-6725x4485.jpg?w=1920&auto=format&q=85`,
    alt: 'Luthra Group — Reception',
    position: 'center center',
  },
  {
    src: `${CDN}/73613e248e1376b2ad904a4ab8d11d6d89d68524-2560x1707.jpg?w=1920&auto=format&q=85`,
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
    src: `${CDN}/90eff17ceae1de12db6a918460f2fc430ccec55f-7360x4912.jpg?w=1920&auto=format&q=85`,
    alt: 'Unilazer Ventures — Office',
    position: 'center center',
  },
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
