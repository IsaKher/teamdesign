'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import FadeImage from '@/components/FadeImage';
import styles from './page.module.css';
import { WARM_BLUR } from '@/lib/siteContent';
import type { SanityProject } from '@/lib/sanity';

const FILTERS = ['All', 'Residential', 'Commercial', 'Institutional', 'Interiors'];
const SCROLL_KEY = 'portfolio_scroll';

interface Props {
  projects: SanityProject[];
}

function PortfolioContent({ projects }: Props) {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get('type');
  const initial = FILTERS.includes(typeParam ?? '') ? typeParam! : 'All';
  const [active, setActive] = useState(initial);

  useEffect(() => {
    const saved = sessionStorage.getItem(SCROLL_KEY);
    if (saved) {
      window.scrollTo({ top: parseInt(saved, 10), behavior: 'instant' });
      sessionStorage.removeItem(SCROLL_KEY);
    }
  }, []);

  useEffect(() => {
    if (typeParam && FILTERS.includes(typeParam)) setActive(typeParam);
  }, [typeParam]);

  const filtered = (active === 'All'
    ? projects
    : projects.filter(p => p.type === active)
  ).slice().sort((a, b) => b.year - a.year);

  return (
    <>
      {/* Hero */}
      <div className={styles.pageHero}>
        <span className={styles.pageLabel}>Portfolio</span>
        <h1 className={styles.pageTitle}>Portfolio</h1>
        <p className={styles.pageSubtitle}>300+ completed projects across residential, commercial, and institutional architecture in Mumbai and beyond.</p>
      </div>

      {/* Filters */}
      <div className={styles.filterBarWrap}>
        <div className={styles.filterBar}>
          {FILTERS.map(f => (
            <button
              key={f}
              className={`${styles.filterBtn} ${active === f ? styles.filterActive : ''}`}
              onClick={() => setActive(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className={styles.grid}>
        {filtered.length === 0 && (
          <div className={styles.emptyState}>
            <p>No projects found under &ldquo;{active}&rdquo;.</p>
            <button className={styles.filterBtn} onClick={() => setActive('All')}>View all projects →</button>
          </div>
        )}
        {filtered.map((project) => (
          <Link
            key={project.slug}
            href={`/portfolio/${project.slug}`}
            className={styles.card}
            onClick={() => sessionStorage.setItem(SCROLL_KEY, String(window.scrollY))}
          >
            <div className={styles.cardImage}>
              {project.image ? (
                <FadeImage
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 900px) 50vw, 33vw"
                  style={{ objectFit: 'cover' }}
                  className={styles.img}
                  placeholder="blur"
                  blurDataURL={WARM_BLUR}
                />
              ) : (
                <div className={styles.imagePlaceholder} />
              )}
              <div className={styles.cardOverlay}>
                <span className={styles.viewLabel}>View →</span>
                <span className={styles.cardTagline}>{project.client} · {project.location}</span>
              </div>
            </div>
            <div className={styles.cardMeta}>
              <span className={styles.cardType}>{project.type}</span>
              <h2 className={styles.cardTitle}>{project.title}</h2>
              <div className={styles.cardDetails}>
                <span>{project.client}</span>
                <span>{project.year}</span>
                <span>{project.area}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default function PortfolioClient({ projects }: Props) {
  return (
    <Suspense>
      <PortfolioContent projects={projects} />
    </Suspense>
  );
}
