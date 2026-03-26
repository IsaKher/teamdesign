'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './HeroCarousel.module.css';
import { WARM_BLUR } from '@/lib/siteContent';

const SLIDES = [
  {
    src: '/projects/jhaveri-zaveri-residence/1.jpg',
    alt: 'Jhaveri Zaveri Residence — Team Design Architects, Mumbai',
  },
  {
    src: '/projects/mohan-shenoi-residence/1.jpg',
    alt: 'Mohan Shenoi Residence — Team Design Architects, Mumbai',
  },
  {
    src: '/projects/rahul-sanjana-residence/1.jpg',
    alt: 'Rahul & Sanjana Residence — Team Design Architects, Mumbai',
  },
];

const INTERVAL   = 5500;  // ms between transitions
const FADE_DURATION = 1400; // ms — must match CSS transition

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(c => (c + 1) % SLIDES.length);
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
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
            priority={i === 0}
            placeholder="blur"
            blurDataURL={WARM_BLUR}
          />
        </div>
      ))}
    </div>
  );
}
