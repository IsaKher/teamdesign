'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './HeroCarousel.module.css';
import { WARM_BLUR } from '@/lib/siteContent';

// Sanity CDN already serves optimised images — unoptimized=true skips the
// second Vercel /_next/image pass so there's only one network hop.
const CDN = 'https://cdn.sanity.io/images/il220i1c/production';

const SLIDES = [
  {
    src: `${CDN}/bbff8295b9476da488520cfc8a2a7b557e0b574d-6725x4485.jpg`,
    alt: 'Luthra Group — Reception',
    position: 'center center',
  },
  {
    src: `${CDN}/73613e248e1376b2ad904a4ab8d11d6d89d68524-2560x1707.jpg`,
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
          key={i}
          className={`${styles.slide} ${i === current ? styles.active : ''}`}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: slide.position }}
            priority={i <= 1}
            placeholder="blur"
            blurDataURL={WARM_BLUR}
            quality={85}
          />
        </div>
      ))}
    </div>
  );
}
