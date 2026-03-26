'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './HeroCarousel.module.css';
import { WARM_BLUR } from '@/lib/siteContent';

const SLIDES = [
  { src: '/projects/nikhil-gupta-bungalow/2.jpg',    alt: 'Nikhil Gupta Bungalow — Alibaug',          position: 'center center' },
  { src: '/projects/mohan-shenoi-residence/6.jpg',   alt: 'Mohan Shenoi Residence — Mumbai',          position: 'center center' },
  { src: '/projects/jhaveri-zaveri-residence/2.jpg', alt: 'Jhaveri Zaveri Residence — Mumbai',        position: 'center center' },
  { src: '/projects/nikhil-gupta-bungalow/7.png',    alt: 'Nikhil Gupta Bungalow — Entrance Porch',  position: 'center center' },
  { src: '/projects/rahul-sanjana-residence/1.jpg',  alt: 'Rahul & Sanjana Residence — Mumbai',       position: 'center center' },
  { src: '/projects/mohan-shenoi-residence/1.jpg',   alt: 'Mohan Shenoi Residence — Mumbai',          position: 'center center' },
  { src: '/projects/nikhil-gupta-bungalow/3.jpg',    alt: 'Nikhil Gupta Bungalow — Living Spaces',   position: 'center center' },
  { src: '/projects/jhaveri-zaveri-residence/1.jpg', alt: 'Jhaveri Zaveri Residence — Mumbai',        position: 'center center' },
];

const INTERVAL = 5500;  // ms between transitions

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
            style={{ objectFit: 'cover', objectPosition: slide.position }}
            priority={i === 0}
            placeholder="blur"
            blurDataURL={WARM_BLUR}
          />
        </div>
      ))}
    </div>
  );
}
