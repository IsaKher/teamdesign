'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import FadeUpReveal from '@/components/FadeUpReveal';
import styles from './page.module.css';
import { WARM_BLUR } from '@/lib/siteContent';
import type { SanityProject } from '@/lib/sanity';

const FILTERS = ['All', 'Residential', 'Commercial', 'Institutional', 'Interiors'];
const SCROLL_KEY = 'portfolio_scroll';

interface Props {
  projects: SanityProject[];
}

/** Decade bucket — keeps year chips manageable when there are 30+ projects
 *  spread across decades. e.g. 2018 → "2010s". */
function decadeOf(year: number): string {
  return `${Math.floor(year / 10) * 10}s`;
}

function PortfolioContent({ projects }: Props) {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get('type');
  const initialType = FILTERS.includes(typeParam ?? '') ? typeParam! : 'All';

  const [activeType, setActiveType] = useState(initialType);
  const [query, setQuery] = useState('');
  const [selectedDecades, setSelectedDecades] = useState<Set<string>>(new Set());
  const [selectedLocations, setSelectedLocations] = useState<Set<string>>(new Set());
  const [extraFiltersOpen, setExtraFiltersOpen] = useState(false);

  // Restore scroll position when arriving back from a project page.
  useEffect(() => {
    const saved = sessionStorage.getItem(SCROLL_KEY);
    if (saved) {
      window.scrollTo({ top: parseInt(saved, 10), behavior: 'instant' });
      sessionStorage.removeItem(SCROLL_KEY);
    }
  }, []);

  useEffect(() => {
    if (typeParam && FILTERS.includes(typeParam)) setActiveType(typeParam);
  }, [typeParam]);

  // Compute available decades and locations from the dataset, ordered by frequency.
  const availableDecades = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of projects) {
      if (!p.year) continue;
      const d = decadeOf(p.year);
      counts.set(d, (counts.get(d) ?? 0) + 1);
    }
    return Array.from(counts.entries()).sort((a, b) => b[0].localeCompare(a[0])).map(([d]) => d);
  }, [projects]);

  const availableLocations = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of projects) {
      if (!p.location) continue;
      // Use the first comma-separated chunk so "Lonavala, Maharashtra" becomes "Lonavala"
      const loc = p.location.split(',')[0].trim();
      counts.set(loc, (counts.get(loc) ?? 0) + 1);
    }
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])  // most frequent first
      .map(([loc]) => loc);
  }, [projects]);

  // Filter pipeline: type → search → decade → location → year-desc sort
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return projects
      .filter(p => activeType === 'All' || p.type === activeType)
      .filter(p => {
        if (!q) return true;
        const haystack = `${p.title} ${p.location ?? ''} ${p.client ?? ''} ${p.type ?? ''}`.toLowerCase();
        return haystack.includes(q);
      })
      .filter(p => {
        if (selectedDecades.size === 0) return true;
        return p.year ? selectedDecades.has(decadeOf(p.year)) : false;
      })
      .filter(p => {
        if (selectedLocations.size === 0) return true;
        const loc = p.location?.split(',')[0].trim() ?? '';
        return selectedLocations.has(loc);
      })
      .slice()
      .sort((a, b) => b.year - a.year);
  }, [projects, activeType, query, selectedDecades, selectedLocations]);

  function toggle(set: Set<string>, setSet: (s: Set<string>) => void, value: string) {
    const next = new Set(set);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    setSet(next);
  }

  function clearAll() {
    setQuery('');
    setSelectedDecades(new Set());
    setSelectedLocations(new Set());
    setActiveType('All');
  }

  const hasExtraFilters = selectedDecades.size > 0 || selectedLocations.size > 0 || query.length > 0;

  return (
    <>
      {/* Hero */}
      <div className={styles.pageHero}>
        <span className={styles.pageLabel}>Portfolio</span>
        <h1 className={styles.pageTitle}>Portfolio</h1>
        <p className={styles.pageSubtitle}>300+ completed projects across residential, commercial, and institutional architecture in Mumbai and beyond.</p>
      </div>

      {/* Type filters — primary */}
      <div className={styles.filterBarWrap}>
        <div className={styles.filterBar}>
          {FILTERS.map(f => (
            <button
              key={f}
              className={`${styles.filterBtn} ${activeType === f ? styles.filterActive : ''}`}
              onClick={() => setActiveType(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Search + refine — secondary, quieter UI */}
      <div className={styles.refineBar}>
        <div className={styles.refineRow}>
          <label htmlFor="portfolio-search" className={styles.searchWrap}>
            <span className={styles.searchIcon} aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.2"/>
                <path d="m9.5 9.5 3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            </span>
            <input
              id="portfolio-search"
              type="search"
              placeholder="Search by title, client, or location"
              value={query}
              onChange={e => setQuery(e.target.value)}
              className={styles.searchInput}
            />
          </label>

          <button
            type="button"
            className={`${styles.refineToggle} ${extraFiltersOpen ? styles.refineToggleOpen : ''}`}
            onClick={() => setExtraFiltersOpen(v => !v)}
            aria-expanded={extraFiltersOpen}
            aria-controls="refine-panel"
          >
            <span>Refine</span>
            <span className={styles.refineCaret} aria-hidden="true">{extraFiltersOpen ? '−' : '+'}</span>
            {hasExtraFilters && <span className={styles.refineDot} aria-label="active filters" />}
          </button>

          {hasExtraFilters && (
            <button type="button" className={styles.clearAll} onClick={clearAll}>
              Clear all
            </button>
          )}
        </div>

        {extraFiltersOpen && (
          <div id="refine-panel" className={styles.refinePanel}>
            {availableDecades.length > 0 && (
              <div className={styles.chipGroup}>
                <span className={styles.chipGroupLabel}>Decade</span>
                <div className={styles.chips}>
                  {availableDecades.map(d => {
                    const on = selectedDecades.has(d);
                    return (
                      <button
                        key={d}
                        type="button"
                        className={`${styles.chip} ${on ? styles.chipOn : ''}`}
                        onClick={() => toggle(selectedDecades, setSelectedDecades, d)}
                        aria-pressed={on}
                      >
                        {d}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {availableLocations.length > 0 && (
              <div className={styles.chipGroup}>
                <span className={styles.chipGroupLabel}>Location</span>
                <div className={styles.chips}>
                  {availableLocations.map(loc => {
                    const on = selectedLocations.has(loc);
                    return (
                      <button
                        key={loc}
                        type="button"
                        className={`${styles.chip} ${on ? styles.chipOn : ''}`}
                        onClick={() => toggle(selectedLocations, setSelectedLocations, loc)}
                        aria-pressed={on}
                      >
                        {loc}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {(query || selectedDecades.size > 0 || selectedLocations.size > 0) && (
          <p className={styles.resultCount} aria-live="polite">
            {filtered.length} {filtered.length === 1 ? 'project' : 'projects'} matching
          </p>
        )}
      </div>

      {/* Grid */}
      <div className={styles.grid}>
        {filtered.length === 0 && (
          <div className={styles.emptyState}>
            <p>No projects match these filters.</p>
            <button className={styles.filterBtn} onClick={clearAll}>Clear filters →</button>
          </div>
        )}
        {filtered.map((project, i) => (
          <FadeUpReveal key={project.slug} delay={(i % 3) * 0.08}>
          <Link
            href={`/portfolio/${project.slug}`}
            className={styles.card}
            onClick={() => sessionStorage.setItem(SCROLL_KEY, String(window.scrollY))}
          >
            <div className={styles.cardImage}>
              {project.image ? (
                <Image
                  src={project.image}
                  alt={`${project.title} — ${project.type} by Team Design Architects, ${project.location}`}
                  fill
                  sizes="(max-width: 900px) 50vw, 33vw"
                  style={{ objectFit: 'cover' }}
                  className={styles.img}
                  placeholder="blur"
                  blurDataURL={project.lqip ?? WARM_BLUR}
                  priority={i < 3}
                />
              ) : (
                <div className={styles.imagePlaceholder} />
              )}
              <div className={styles.cardOverlay}>
                <span className={styles.cardTypeBadge}>{project.type}</span>
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
          </FadeUpReveal>
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
