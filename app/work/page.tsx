'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

const FILTERS = ['All', 'Residential', 'Commercial', 'Institutional'];

const PROJECTS = [
  { slug: 'mont-blanc-mariwala-residence', title: 'Mont Blanc Residence', client: 'Kishore Mariwala', type: 'Residential', location: 'August Kranti Marg, Mumbai', year: 2012, area: '8,200 sq ft', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80' },
  { slug: 'unilazer-ventures-office', title: 'Unilazer Ventures Office', client: 'Ronnie Screwvala', type: 'Commercial', location: 'Mumbai', year: 2015, area: '4,500 sq ft', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80' },
  { slug: 'jk-bank-business-centre', title: 'National Business Centre', client: 'J&K Bank', type: 'Commercial', location: 'BKC, Mumbai', year: 2018, area: '22,000 sq ft', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80' },
  { slug: 'itm-college-navi-mumbai', title: 'ITM College Extension', client: 'ITM Group', type: 'Institutional', location: 'Navi Mumbai', year: 2016, area: '45,000 sq ft', image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80' },
  { slug: 'kalimata-temple-kharghar', title: 'Kalimata Temple', client: 'Temple Trust', type: 'Institutional', location: 'Kharghar, Navi Mumbai', year: 2014, area: '12,000 sq ft', image: 'https://images.unsplash.com/photo-1568085756714-1588610b0d2b?w=800&q=80' },
  { slug: 'bungalow-tirupur', title: 'Private Bungalow', client: 'Private Client', type: 'Residential', location: 'Tirupur, Tamil Nadu', year: 2019, area: '5,800 sq ft', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80' },
  { slug: 'mba-hostel-towers', title: 'MBA Hostel Towers', client: 'ITM Group', type: 'Institutional', location: 'Navi Mumbai', year: 2017, area: '68,000 sq ft', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80' },
  { slug: 'villa-lonavala', title: 'Weekend Villa', client: 'Private Client', type: 'Residential', location: 'Lonavala, Maharashtra', year: 2021, area: '4,200 sq ft', image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80' },
];

export default function WorkPage() {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get('type');
  const initial = FILTERS.includes(typeParam ?? '') ? typeParam! : 'All';
  const [active, setActive] = useState(initial);

  useEffect(() => {
    const t = searchParams.get('type');
    if (t && FILTERS.includes(t)) setActive(t);
  }, [searchParams]);

  const filtered = active === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.type === active);

  return (
    <>
      {/* Hero */}
      <div className={styles.pageHero}>
        <span className={styles.pageLabel}>Portfolio</span>
        <h1 className={styles.pageTitle}>Work</h1>
        <p className={styles.pageSubtitle}>300+ completed projects across residential, commercial, and institutional architecture in Mumbai and beyond.</p>
      </div>

      {/* Filters */}
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

      {/* Grid */}
      <div className={styles.grid}>
        {filtered.map((project) => (
          <Link key={project.slug} href={`/work/${project.slug}`} className={styles.card}>
            <div className={styles.cardImage}>
              <Image src={project.image} alt={project.title} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: 'cover' }} className={styles.img} />
              <div className={styles.cardOverlay}>
                <span className={styles.viewLabel}>View Project</span>
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
