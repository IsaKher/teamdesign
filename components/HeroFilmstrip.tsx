import Image from 'next/image';
import Link from 'next/link';
import styles from './HeroFilmstrip.module.css';
import { WARM_BLUR } from '@/lib/siteContent';

const CDN = 'https://cdn.sanity.io/images/il220i1c/production';

const PROJECTS = [
  {
    src: `${CDN}/bbff8295b9476da488520cfc8a2a7b557e0b574d-6725x4485.jpg`,
    name: 'Luthra Group',
    type: 'Commercial Interiors',
    slug: 'luthra-group',
  },
  {
    src: `${CDN}/73613e248e1376b2ad904a4ab8d11d6d89d68524-2560x1707.jpg`,
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
    src: `${CDN}/90eff17ceae1de12db6a918460f2fc430ccec55f-7360x4912.jpg`,
    name: 'Unilazer Ventures',
    type: 'Commercial Interiors',
    slug: 'unilazer-ventures',
  },
];

export default function HeroFilmstrip() {
  return (
    <section className={styles.section}>
      {/* Header row */}
      <div className={styles.header}>
        <span className={styles.eyebrow}>Our Work</span>
        <Link href="/portfolio" className={styles.viewAll}>View all →</Link>
      </div>

      {/* Horizontal scroll strip */}
      <div className={styles.strip}>
        {PROJECTS.map((project, i) => (
          <Link key={i} href={`/portfolio/${project.slug}`} className={styles.card}>
            <div className={styles.imageWrap}>
              <Image
                src={project.src}
                alt={project.name}
                fill
                sizes="260px"
                style={{ objectFit: 'cover' }}
                placeholder="blur"
                blurDataURL={WARM_BLUR}
                priority={i === 0}
              />
            </div>
            <div className={styles.meta}>
              <span className={styles.type}>{project.type}</span>
              <span className={styles.name}>{project.name}</span>
            </div>
          </Link>
        ))}
        {/* Breathing room at end of strip */}
        <div className={styles.endSpacer} />
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
