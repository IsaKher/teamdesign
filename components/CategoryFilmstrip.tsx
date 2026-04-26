import Image from 'next/image';
import Link from 'next/link';
import styles from './CategoryFilmstrip.module.css';
import { WARM_BLUR } from '@/lib/siteContent';
import CategoryFilmstripBehavior from './CategoryFilmstripBehavior';
import type { CSSProperties } from 'react';

const CDN = 'https://cdn.sanity.io/images/il220i1c/production';
const q = (path: string) => `${CDN}/${path}?w=800&q=75&auto=format&fit=max`;

export const CATEGORIES = [
  { type: 'Residential',   label: 'Residential',   src: '/projects/rahul-sanjana-residence/1.jpg' },
  { type: 'Commercial',    label: 'Commercial',    src: q('90eff17ceae1de12db6a918460f2fc430ccec55f-7360x4912.jpg') },
  { type: 'Institutional', label: 'Institutional', src: q('a9037d6e7ba9ac0b80496e087d60795ecc650c8b-1536x1024.png') },
  { type: 'Interiors',     label: 'Interiors',     src: q('bbff8295b9476da488520cfc8a2a7b557e0b574d-6725x4485.jpg') },
];

/** Initial 3-D transform per card, with active=0 baked in.
 *  Server-rendered so the carousel paints immediately — no JS required for
 *  the first frame. The client behavior takes over after hydration. */
function initialWrapStyle(i: number): CSSProperties {
  if (i === 0) {
    return { transform: 'perspective(1200px) rotateY(0deg) translateZ(0px) scale(1)', opacity: 1 };
  }
  if (i === 1) {
    return { transform: 'perspective(1200px) rotateY(-35deg) translateZ(-80px) scale(0.88)', opacity: 0.6 };
  }
  // i >= 2
  return { transform: 'perspective(1200px) rotateY(-50deg) translateZ(-80px) scale(0.75)', opacity: 0.35 };
}

/**
 * Server component — renders the full filmstrip markup statically.
 * The LCP image is painted as soon as HTML arrives; no hydration wait.
 * Behavior (scroll listening, active-card detection, dot updates) lives
 * in CategoryFilmstripBehavior, which hydrates separately and attaches
 * to this DOM via data-attributes. That keeps JS off the LCP path.
 */
export default function CategoryFilmstrip() {
  return (
    <section className={styles.section} data-filmstrip>
      <div className={styles.shelf} aria-hidden />

      <div className={styles.strip} data-filmstrip-strip>
        {CATEGORIES.map((cat, i) => (
          <div
            key={cat.type}
            className={styles.cardWrapper}
            data-filmstrip-card={i}
            style={initialWrapStyle(i)}
          >
            <Link href={`/portfolio?type=${cat.type}`} className={styles.card}>
              <div className={styles.imageWrap}>
                <Image
                  src={cat.src}
                  alt={`${cat.label} — Team Design`}
                  fill
                  sizes="(max-width: 600px) 280px, (max-width: 1199px) 480px, 760px"
                  quality={70}
                  style={{ objectFit: 'cover' }}
                  placeholder="blur"
                  blurDataURL={WARM_BLUR}
                  priority={i === 0}
                />
                <div className={styles.overlay} />
                <div className={styles.content}>
                  <h2 className={styles.name}>
                    {cat.label}
                    <span className={styles.arrow} aria-hidden="true">
                      <svg width="22" height="10" viewBox="0 0 22 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 5h20M15 1l6 4-6 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </h2>
                </div>
              </div>
            </Link>
          </div>
        ))}
        {/* Trailing spacer so the last card can centre-snap */}
        <div className={styles.endSpacer} aria-hidden />
      </div>

      {/* Desktop: frosted oval pill — initial dot states baked in for active=0 */}
      <div className={styles.pill}>
        <div className={styles.pillDots}>
          {CATEGORIES.map((_, i) => (
            <span
              key={i}
              data-filmstrip-dot-pill={i}
              className={styles.dot}
              style={i === 0
                ? { opacity: 1, transform: 'scaleX(2.8)' }
                : { opacity: 0.28, transform: 'scaleX(1)' }}
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

      {/* Mobile indicator strip — currently hidden via CSS but kept for a11y/fallback */}
      <div className={styles.indicator}>
        <div className={styles.dots}>
          {CATEGORIES.map((_, i) => (
            <span
              key={i}
              data-filmstrip-dot={i}
              className={styles.dot}
              style={i === 0
                ? { opacity: 1, transform: 'scaleX(2.8)' }
                : { opacity: 0.28, transform: 'scaleX(1)' }}
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

      {/* Client-only behavior — finds the section above by data-attribute and
          attaches scroll/wheel listeners. Hydrates after the LCP paints. */}
      <CategoryFilmstripBehavior />
    </section>
  );
}
