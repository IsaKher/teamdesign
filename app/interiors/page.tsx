'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

const FILTERS = ['All', 'Commercial', 'Institutional', 'Residential', 'Concept'];

const PROJECTS = [
  {
    slug: 'womens-bank-branch-srinagar',
    title: "Women's Bank Branch — J&K Bank",
    client: 'Jammu & Kashmir Bank',
    type: 'Institutional',
    location: 'Srinagar, J&K',
    year: 2018,
    area: '6,500 sq ft',
    image: 'https://teamdesign.in/wp-content/uploads/2018/12/Women_s-Bank-Branch-J_K-Bank-Srinagar-1-1.jpg',
  },
  {
    slug: 'show-flat-mumbai',
    title: 'Show Flat',
    client: 'Mumbai Builder',
    type: 'Residential',
    location: 'Mumbai',
    year: 2014,
    area: '1,500 sq ft',
    image: 'https://teamdesign.in/wp-content/uploads/2018/12/DSC_5975-1.jpg',
  },
  {
    slug: 'unilazer-ventures-office',
    title: 'Office for Unilazer Ventures',
    client: 'Ronnie Screwvala',
    type: 'Commercial',
    location: 'Worli, Mumbai',
    year: 2014,
    area: '6,500 sq ft',
    image: 'https://teamdesign.in/wp-content/uploads/2018/12/Unilazer-Ventures-Pvt-Ltd-3-1.jpg',
  },
  {
    slug: 'jk-bank-nbc-bkc',
    title: 'National Business Centre — J&K Bank',
    client: 'Jammu & Kashmir Bank',
    type: 'Commercial',
    location: 'BKC, Mumbai',
    year: 2013,
    area: '70,000 sq ft',
    image: 'https://teamdesign.in/wp-content/uploads/2018/12/J_K-Bank-NBC-BKC-20-1.jpg',
  },
  {
    slug: 'high-networth-branch-shopian',
    title: 'High Networth Bank Branch',
    client: 'Jammu & Kashmir Bank',
    type: 'Concept',
    location: 'Shopian, J&K',
    year: 2017,
    area: '4,000 sq ft',
    image: 'https://teamdesign.in/wp-content/uploads/2018/12/High-Networth-Bank-Branch-Shopian-5-1.jpg',
  },
  {
    slug: 'hdfc-bank-office-jammu',
    title: 'HDFC Bank Corporate Office',
    client: 'HDFC Bank',
    type: 'Commercial',
    location: 'Narhwal, Jammu',
    year: 2015,
    area: '13,000 sq ft',
    image: 'https://teamdesign.in/wp-content/uploads/2018/12/NSP_9833-1.jpg',
  },
  {
    slug: 'garden-glory-penthouse-thane',
    title: 'Garden Glory Penthouse',
    client: 'Indian Family',
    type: 'Residential',
    location: 'Thane',
    year: 2013,
    area: '15,000 sq ft',
    image: 'https://teamdesign.in/wp-content/uploads/2018/12/Garden-Glory-Penthouse-Indian-Family-Thane-India-7-1.jpg',
  },
  {
    slug: 'airport-lounge-srinagar',
    title: 'Executive Airport Lounge — J&K Bank',
    client: 'Jammu & Kashmir Bank',
    type: 'Concept',
    location: 'Airport Terminal, Srinagar',
    year: 2013,
    area: '2,500 sq ft',
    image: 'https://teamdesign.in/wp-content/uploads/2018/12/AIRPORT-LOUNGE-J_K-BANK-Srinagar-2-1.jpg',
  },
  {
    slug: 'exclusive-villa-mumbai',
    title: 'Exclusive Villa',
    client: 'Private Client',
    type: 'Residential',
    location: 'Mumbai',
    year: 2016,
    area: '10,000 sq ft',
    image: 'https://teamdesign.in/wp-content/uploads/2018/12/Exclusive-Villa-Renouned-Indian-Family-Mumbai-India-4-1.jpg',
  },
  {
    slug: 'electronic-bank-lobby-srinagar',
    title: 'Electronic Bank Lobby — J&K Bank',
    client: 'J&K Bank',
    type: 'Concept',
    location: 'Lal Chowk, Srinagar',
    year: 2018,
    area: '2,000 sq ft',
    image: 'https://teamdesign.in/wp-content/uploads/2018/12/Electronic-Bank-Lobby-J_K-Bank-Srinagar-5-1.jpg',
  },
  {
    slug: 'kishore-mariwala-home-mumbai',
    title: 'Contemporary Modern Home',
    client: 'Mr. Kishore Mariwala',
    type: 'Residential',
    location: "Kemps Corner, Mumbai",
    year: 2009,
    area: '2,600 sq mt',
    image: 'https://teamdesign.in/wp-content/uploads/2018/01/Kishore-Mariwala-1.jpg',
  },
  {
    slug: 'gordon-serrao-home-navi-mumbai',
    title: 'Classic Modern Home',
    client: 'Gordon Serrao',
    type: 'Residential',
    location: 'Vashi, Navi Mumbai',
    year: 2012,
    area: '3,500 sq mt',
    image: 'https://teamdesign.in/wp-content/uploads/2018/12/Serrao-Home-4-1.jpg',
  },
  {
    slug: 'cinemarc-cinema-theatre',
    title: 'Cinemarc Cinema Theatre',
    client: 'Mr. N Suryavanshi',
    type: 'Commercial',
    location: 'Vadodara, India',
    year: 2015,
    area: '20,000 sq mt',
    image: 'https://teamdesign.in/wp-content/uploads/2018/12/Cinemarc-Cinema-Theatre-3-1.jpg',
  },
];

function InteriorsContent() {
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
      <div className={styles.pageHero}>
        <span className={styles.pageLabel}>Interior Design</span>
        <h1 className={styles.pageTitle}>Interiors</h1>
        <p className={styles.pageSubtitle}>Spaces that feel like they belong to you — not to a catalogue or a trend. Interior design for homes, offices, and hospitality spaces across India.</p>
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
                <span>{p.client}</span>
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

export default function InteriorsPage() {
  return (
    <Suspense>
      <InteriorsContent />
    </Suspense>
  );
}
