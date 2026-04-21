'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './CategoryFilmstrip.module.css';
import { WARM_BLUR } from '@/lib/siteContent';

const CDN = 'https://cdn.sanity.io/images/il220i1c/production';
const q = (path: string) => `${CDN}/${path}?w=800&q=75&auto=format&fit=max`;

const CATEGORIES = [
  { type: 'Residential',   label: 'Residential',   src: '/projects/rahul-sanjana-residence/1.jpg' },
  { type: 'Commercial',    label: 'Commercial',    src: q('90eff17ceae1de12db6a918460f2fc430ccec55f-7360x4912.jpg') },
  { type: 'Institutional', label: 'Institutional', src: q('a9037d6e7ba9ac0b80496e087d60795ecc650c8b-1536x1024.png') },
  { type: 'Interiors',     label: 'Interiors',     src: q('bbff8295b9476da488520cfc8a2a7b557e0b574d-6725x4485.jpg') },
];

export default function CategoryFilmstrip() {
  // ─── Active-index state drives the 3-D transform on each card ─────────────
  // Only triggers a re-render when the active card actually changes, not on
  // every scroll frame — so React work is minimal during scrolling.
  const [activeIndex, setActiveIndex] = useState(0);

  const stripRef     = useRef<HTMLDivElement>(null);
  const activeIdxRef = useRef(0);                           // shadow of state, safe in RAF
  const cardRefs     = useRef<(HTMLDivElement | null)[]>([]);  // cardWrapper divs
  const dotRefs      = useRef<(HTMLSpanElement | null)[]>([]);
  const dotRefsPill  = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;

    let raf: number;

    function update() {
      const stripRect   = strip!.getBoundingClientRect();
      const stripCenter = stripRect.left + stripRect.width / 2;

      let newActive = 0;
      let minDist   = Infinity;

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const rect       = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const dist       = Math.abs(cardCenter - stripCenter);
        if (dist < minDist) { minDist = dist; newActive = i; }
      });

      // Only call setState (→ re-render) when the active card index changes
      if (newActive !== activeIdxRef.current) {
        activeIdxRef.current = newActive;
        setActiveIndex(newActive);
      }

      // Dots: direct DOM manipulation — no React overhead on every frame
      [dotRefs.current, dotRefsPill.current].forEach(refs => {
        refs.forEach((dot, i) => {
          if (!dot) return;
          dot.style.opacity   = i === newActive ? '1'           : '0.28';
          dot.style.transform = i === newActive ? 'scaleX(2.8)' : 'scaleX(1)';
        });
      });
    }

    function onScroll() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    }

    // Desktop: vertical mouse-wheel → horizontal scroll
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
    requestAnimationFrame(update);

    return () => {
      strip.removeEventListener('scroll',  onScroll);
      strip.removeEventListener('wheel',   onWheel);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // ─── Derive inline transform/opacity from active index ────────────────────
  // perspective: 1200px lives on .strip in CSS, so transforms here are plain
  // rotateY / translateZ / scale — no perspective() function needed.
  function getWrapStyle(i: number): React.CSSProperties {
    const offset = i - activeIndex;
    const abs    = Math.abs(offset);

    if (abs === 0) {
      return { transform: 'rotateY(0deg) translateZ(0px) scale(1)', opacity: 1 };
    }
    if (abs === 1) {
      const ry = offset < 0 ? 35 : -35;
      return { transform: `rotateY(${ry}deg) translateZ(-80px) scale(0.88)`, opacity: 0.6 };
    }
    // 2+ positions away
    const ry = offset < 0 ? 50 : -50;
    return { transform: `rotateY(${ry}deg) translateZ(-80px) scale(0.75)`, opacity: 0.35 };
  }

  return (
    <section className={styles.section}>
      {/* ─── Shelf — 3-D surface that grounds the cards physically ──────── */}
      <div className={styles.shelf} aria-hidden />

      {/* ─── strip: perspective container + horizontal scroll ────────────── */}
      <div ref={stripRef} className={styles.strip}>
        {CATEGORIES.map((cat, i) => (
          /* cardWrapper receives the 3-D transform as a direct child of the
             perspective container (.strip), so no transform-style: preserve-3d
             is required on intermediate elements.                            */
          <div
            key={cat.type}
            ref={(el) => { cardRefs.current[i] = el; }}
            className={styles.cardWrapper}
            style={getWrapStyle(i)}
          >
            <Link href={`/portfolio?type=${cat.type}`} className={styles.card}>
              <div className={styles.imageWrap}>
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
          </div>
        ))}
        {/* Trailing spacer so the last card can centre-snap */}
        <div className={styles.endSpacer} aria-hidden />
      </div>

      {/* ─── Desktop: frosted oval pill ──────────────────────────────────── */}
      <div className={styles.pill}>
        <div className={styles.pillDots}>
          {CATEGORIES.map((_, i) => (
            <span key={i} ref={el => { dotRefsPill.current[i] = el; }} className={styles.dot} />
          ))}
        </div>
        <span className={styles.pillHint}>
          Swipe to explore
          <svg width="16" height="6" viewBox="0 0 16 6" fill="none" aria-hidden="true">
            <path d="M1 3h14M9 1l6 2-6 2" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </div>

      {/* ─── Mobile: indicator strip ─────────────────────────────────────── */}
      <div className={styles.indicator}>
        <div className={styles.dots}>
          {CATEGORIES.map((_, i) => (
            <span key={i} ref={el => { dotRefs.current[i] = el; }} className={styles.dot} />
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
