'use client';
import { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './HeroFilmstrip.module.css';
import { WARM_BLUR } from '@/lib/siteContent';

const CDN = 'https://cdn.sanity.io/images/il220i1c/production';
const q = (path: string) => `${CDN}/${path}?w=600&q=72&auto=format&fit=max`;

const PROJECTS = [
  {
    src: q('bbff8295b9476da488520cfc8a2a7b557e0b574d-6725x4485.jpg'),
    name: 'Luthra Group',
    type: 'Commercial Interiors',
    slug: 'luthra-group',
  },
  {
    src: q('a9037d6e7ba9ac0b80496e087d60795ecc650c8b-1536x1024.png'),
    name: 'Maharaja Agrasen Palace',
    type: 'Institutional',
    slug: 'maharaja-agrasen-palace',
  },
  {
    src: '/projects/rahul-sanjana-residence/1.jpg',
    name: 'Rahul & Sanjana Residence',
    type: 'Residential',
    slug: 'rahul-sanjana-residence',
  },
  {
    src: '/projects/usha-shenoi-residence/1.jpg',
    name: 'Usha Shenoi Residence',
    type: 'Residential',
    slug: 'usha-shenoi-residence',
  },
  {
    src: q('90eff17ceae1de12db6a918460f2fc430ccec55f-7360x4912.jpg'),
    name: 'Unilazer Ventures',
    type: 'Commercial Interiors',
    slug: 'unilazer-ventures',
  },
];

export default function HeroFilmstrip() {
  const stripRef  = useRef<HTMLDivElement>(null);
  const cardRefs  = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;

    let raf: number;

    function update() {
      const stripRect   = strip!.getBoundingClientRect();
      const stripCenter = stripRect.left + stripRect.width / 2;

      cardRefs.current.forEach((card) => {
        if (!card) return;
        const rect       = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        // Normalised distance: -1 (far left) → 0 (centred) → +1 (far right)
        const t          = Math.max(-1, Math.min(1, (cardCenter - stripCenter) / (stripRect.width * 0.55)));
        const rotateY    = t * 24;                     // ±24° at full offset
        const scale      = 1 - Math.abs(t) * 0.10;    // 90% size at edges
        card.style.transform = `perspective(900px) rotateY(${rotateY}deg) scale(${scale})`;
      });
    }

    function onScroll() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    }

    strip.addEventListener('scroll', onScroll, { passive: true });
    // Also update on window resize (orientation change, etc.)
    window.addEventListener('resize', onScroll, { passive: true });

    // Run once on mount so the initial state isn't flat
    requestAnimationFrame(update);

    return () => {
      strip.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className={styles.section}>
      {/* Horizontal scroll strip — no header row, images fill the freed space */}
      <div ref={stripRef} className={styles.strip}>
        {PROJECTS.map((project, i) => (
          <Link key={i} href={`/portfolio/${project.slug}`} className={styles.card}>
            <div
              ref={(el) => { cardRefs.current[i] = el; }}
              className={styles.imageWrap}
            >
              <Image
                src={project.src}
                alt={`${project.name} — ${project.type} by Team Design Architects`}
                fill
                sizes="280px"
                style={{ objectFit: 'cover' }}
                placeholder="blur"
                blurDataURL={WARM_BLUR}
                priority={i === 0}
              />
              {/* Text overlay lives inside the image frame */}
              <div className={styles.overlay}>
                <span className={styles.type}>{project.type}</span>
                <span className={styles.name}>{project.name}</span>
              </div>
            </div>
          </Link>
        ))}
        {/* Trailing spacer so the last card can centre-snap */}
        <div className={styles.endSpacer} aria-hidden />
      </div>

      {/* Swipe nudge */}
      <div className={styles.swipeHint}>
        <span>Swipe to explore</span>
        <svg width="18" height="8" viewBox="0 0 18 8" fill="none" aria-hidden="true">
          <path d="M1 4h16M11 1l6 3-6 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </section>
  );
}
