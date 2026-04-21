'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './CategoryFilmstrip.module.css';
import { WARM_BLUR } from '@/lib/siteContent';

const CDN = 'https://cdn.sanity.io/images/il220i1c/production';
const q = (path: string) => `${CDN}/${path}?w=800&q=75&auto=format&fit=max`;

const CATEGORIES = [
  {
    type: 'Residential',
    label: 'Residential',
    src: '/projects/rahul-sanjana-residence/1.jpg',
  },
  {
    type: 'Commercial',
    label: 'Commercial',
    src: q('90eff17ceae1de12db6a918460f2fc430ccec55f-7360x4912.jpg'),
  },
  {
    type: 'Institutional',
    label: 'Institutional',
    src: q('a9037d6e7ba9ac0b80496e087d60795ecc650c8b-1536x1024.png'),
  },
  {
    type: 'Interiors',
    label: 'Interiors',
    src: q('bbff8295b9476da488520cfc8a2a7b557e0b574d-6725x4485.jpg'),
  },
];

export default function CategoryFilmstrip() {
  const stripRef      = useRef<HTMLDivElement>(null);
  const cardRefs      = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs       = useRef<(HTMLSpanElement | null)[]>([]);  // mobile strip
  const dotRefsPill   = useRef<(HTMLSpanElement | null)[]>([]);  // desktop pill

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;

    let raf: number;

    function update() {
      const stripRect   = strip!.getBoundingClientRect();
      const stripCenter = stripRect.left + stripRect.width / 2;

      // 3-D coverflow + active-dot tracking in one pass
      let activeIdx = 0;
      let minDist   = Infinity;

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const rect       = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;

        // 3-D transform
        const t       = Math.max(-1, Math.min(1, (cardCenter - stripCenter) / (stripRect.width * 0.55)));
        const rotateY = t * 24;
        const scale   = 1 - Math.abs(t) * 0.10;
        card.style.transform = `perspective(900px) rotateY(${rotateY}deg) scale(${scale})`;

        // Track which card is closest to centre
        const dist = Math.abs(cardCenter - stripCenter);
        if (dist < minDist) { minDist = dist; activeIdx = i; }
      });

      // Update both dot sets — active dot stretches, others fade
      [dotRefs.current, dotRefsPill.current].forEach(refs => {
        refs.forEach((dot, i) => {
          if (!dot) return;
          dot.style.opacity   = i === activeIdx ? '1'           : '0.28';
          dot.style.transform = i === activeIdx ? 'scaleX(2.8)' : 'scaleX(1)';
        });
      });
    }

    function onScroll() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    }

    // Desktop: convert vertical mouse-wheel to horizontal scroll
    function onWheel(e: WheelEvent) {
      if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) {
        e.preventDefault();
        strip!.scrollLeft += e.deltaY * 0.8;
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(update);
      }
    }

    strip.addEventListener('scroll',  onScroll, { passive: true });
    strip.addEventListener('wheel',   onWheel,  { passive: false });
    window.addEventListener('resize', onScroll, { passive: true });

    // Initial render — don't wait for a scroll event
    requestAnimationFrame(update);

    return () => {
      strip.removeEventListener('scroll',  onScroll);
      strip.removeEventListener('wheel',   onWheel);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className={styles.section}>
      {/* ─── Shelf — 3-D surface that grounds the cards physically ──────── */}
      <div className={styles.shelf} aria-hidden />

      <div ref={stripRef} className={styles.strip}>
        {CATEGORIES.map((cat, i) => (
          <Link
            key={cat.type}
            href={`/portfolio?type=${cat.type}`}
            className={styles.card}
          >
            <div
              ref={(el) => { cardRefs.current[i] = el; }}
              className={styles.imageWrap}
            >
              <Image
                src={cat.src}
                alt={`${cat.label} — Team Design`}
                fill
                sizes="(max-width: 600px) 280px, 340px"
                style={{ objectFit: 'cover' }}
                placeholder="blur"
                blurDataURL={WARM_BLUR}
                priority={i === 0}
              />
              <div className={styles.overlay} />
              <div className={styles.content}>
                <h2 className={styles.name}>{cat.label}</h2>
                <span className={styles.cta}>View all →</span>
              </div>
            </div>
          </Link>
        ))}
        {/* Trailing spacer so the last card can centre-snap */}
        <div className={styles.endSpacer} aria-hidden />
      </div>

      {/* ─── Desktop: frosted oval pill — floats over the filmstrip ─────────── */}
      <div className={styles.pill}>
        <div className={styles.pillDots}>
          {CATEGORIES.map((_, i) => (
            <span
              key={i}
              ref={el => { dotRefsPill.current[i] = el; }}
              className={styles.dot}
            />
          ))}
        </div>
        <span className={styles.pillHint}>
          Swipe to explore
          <svg width="16" height="6" viewBox="0 0 16 6" fill="none" aria-hidden="true">
            <path d="M1 3h14M9 1l6 2-6 2" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </div>

      {/* ─── Mobile: indicator strip — dots above, label below ───────────── */}
      <div className={styles.indicator}>
        <div className={styles.dots}>
          {CATEGORIES.map((_, i) => (
            <span
              key={i}
              ref={el => { dotRefs.current[i] = el; }}
              className={styles.dot}
            />
          ))}
        </div>
        <span className={styles.hintLabel}>
          Swipe to explore
          <svg width="16" height="6" viewBox="0 0 16 6" fill="none" aria-hidden="true">
            <path d="M1 3h14M9 1l6 2-6 2" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </div>
    </section>
  );
}
