'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

const FILTERS = ['All', 'Residential', 'Commercial', 'Hospitality'];

const PROJECTS = [
  { slug: 'mariwala-interior', title: 'Mont Blanc Residence — Interiors', type: 'Residential', location: 'Mumbai', year: 2012, area: '8,200 sq ft', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80' },
  { slug: 'unilazer-interiors', title: 'Unilazer Ventures — Office Interiors', type: 'Commercial', location: 'Mumbai', year: 2015, area: '4,500 sq ft', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80' },
  { slug: 'apartment-worli', title: 'Penthouse Apartment', type: 'Residential', location: 'Worli, Mumbai', year: 2020, area: '3,200 sq ft', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80' },
  { slug: 'villa-lonavala-interiors', title: 'Weekend Villa Interiors', type: 'Residential', location: 'Lonavala', year: 2021, area: '4,200 sq ft', image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80' },
  { slug: 'restaurant-bkc', title: 'Restaurant Interior', type: 'Hospitality', location: 'BKC, Mumbai', year: 2019, area: '2,800 sq ft', image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80' },
  { slug: 'home-powai', title: 'Family Home', type: 'Residential', location: 'Powai, Mumbai', year: 2022, area: '2,600 sq ft', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80' },
];

export default function InteriorsPage() {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? PROJECTS : PROJECTS.filter(p => p.type === active);

  return (
    <>
      <div className={styles.pageHero}>
        <span className={styles.pageLabel}>Interior Design</span>
        <h1 className={styles.pageTitle}>Interiors</h1>
        <p className={styles.pageSubtitle}>Spaces that feel like they belong to you — not to a catalogue or a trend. Interior design for homes, offices, and hospitality spaces across Mumbai.</p>
      </div>

      <div className={styles.filterBar}>
        {FILTERS.map(f => (
          <button key={f} className={`${styles.filterBtn} ${active === f ? styles.filterActive : ''}`} onClick={() => setActive(f)}>{f}</button>
        ))}
      </div>

      <div className={styles.grid}>
        {filtered.map((p) => (
          <Link key={p.slug} href={`/work/${p.slug}`} className={styles.card}>
            <div className={styles.cardImage}>
              <Image src={p.image} alt={p.title} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: 'cover' }} className={styles.img} />
              <div className={styles.cardOverlay}><span className={styles.viewLabel}>View Project</span></div>
            </div>
            <div className={styles.cardMeta}>
              <span className={styles.cardType}>{p.type}</span>
              <h2 className={styles.cardTitle}>{p.title}</h2>
              <div className={styles.cardDetails}>
                <span>{p.location}</span>
                <span>{p.year}</span>
                <span>{p.area}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
