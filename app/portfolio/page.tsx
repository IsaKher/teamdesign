'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import FadeImage from '@/components/FadeImage';
import styles from './page.module.css';
import { WARM_BLUR } from '@/lib/siteContent';

const FILTERS = ['All', 'Residential', 'Commercial', 'Institutional', 'Interiors'];

const PROJECTS = [
  {
    slug: 'wedding-destination-raipur',
    title: 'Wedding Destination',
    client: 'Mr. Ritesh Mandani',
    type: 'Commercial',
    location: 'Raipur, Chhattisgarh',
    year: 2014,
    area: '150,000 sq ft',
    image: 'https://teamdesign.in/wp-content/uploads/2018/12/w-2-1.jpg',
  },
  {
    slug: 'kalimata-mandir-navi-mumbai',
    title: 'Temple Building — Goddess Kali',
    client: 'Bengali Cultural Association',
    type: 'Institutional',
    location: 'Kharghar, Mumbai',
    year: 2017,
    area: '15,000 sq ft',
    image: 'https://teamdesign.in/wp-content/uploads/2018/12/KALIMATA-MANDIR_Cam_01-1.jpg',
  },
  {
    slug: 'service-industry-campus-goa',
    title: 'Service Industry Education Campus',
    client: 'Institute of Technology and Management',
    type: 'Institutional',
    location: 'Bicholim, Goa',
    year: 2009,
    area: '1,500,000 sq ft',
    image: 'https://teamdesign.in/wp-content/uploads/2018/12/Service-Industru-Education-Complex-Goa-5-1.jpg',
  },
  {
    slug: 'mist-view-bungalows-lonavala',
    title: 'Mist View Bungalows',
    client: 'Private Clients',
    type: 'Residential',
    location: 'Lonavala, Maharashtra',
    year: 2010,
    area: '15,000 sq ft',
    image: 'https://teamdesign.in/wp-content/uploads/2018/12/MIST-VIEW-7-1.jpg',
  },
  {
    slug: 'mba-hostel-towers-itm',
    title: 'MBA Hostel Towers — ITM',
    client: 'Institute of Technology and Management',
    type: 'Institutional',
    location: 'Mumbai',
    year: 2005,
    area: '85,000 sq ft',
    image: 'https://teamdesign.in/wp-content/uploads/2018/12/MBA-Hostel-Building-ITM-Navi-Mumbai-India-5-1.jpg',
  },
  {
    slug: 'mariwala-estate-annexe-lonavala',
    title: 'Mariwala Estate Annexe',
    client: 'Mr. Harsh Mariwala',
    type: 'Residential',
    location: 'Lonavala, Maharashtra',
    year: 2016,
    area: '12,000 sq ft',
    image: 'https://teamdesign.in/wp-content/uploads/2018/12/Mariwala-Estate-Annexe-6-1.jpg',
  },
  {
    slug: 'villa-merchant-tirupur',
    title: 'Luxurious 5BHK Villa',
    client: 'Mr. S Merchant',
    type: 'Residential',
    location: 'Tirupur, India',
    year: 2017,
    area: '6,000 sq ft',
    image: 'https://teamdesign.in/wp-content/uploads/2018/12/Luxurious-5BHK-Villa-Mr-1.jpg',
  },
  {
    slug: 'jk-bank-branch-samba',
    title: 'J&K Bank Branch Building',
    client: 'J&K Bank',
    type: 'Commercial',
    location: 'Samba, J&K State',
    year: 2018,
    area: '6,500 sq ft',
    image: 'https://teamdesign.in/wp-content/uploads/2018/12/J_K-Bank-Branch-Building-Samba-J_K-State-1-1.jpg',
  },
  {
    slug: 'college-campus-extension-itm',
    title: 'College Campus Extension — ITM',
    client: 'Institute of Technology and Management',
    type: 'Institutional',
    location: 'Kharghar, Mumbai',
    year: 2014,
    area: '5,876 sq mt',
    image: 'https://teamdesign.in/wp-content/uploads/2018/12/COLLEGE-CAMPUS-EXT-4.jpg',
  },
  {
    slug: 'nrb-bearings-guest-house-aurangabad',
    title: 'Guest House — NRB Bearings',
    client: 'NRB Bearings',
    type: 'Commercial',
    location: 'Aurangabad, India',
    year: 2011,
    area: '20,000 sq ft',
    image: 'https://teamdesign.in/wp-content/uploads/2018/12/NRB-Bearings-Auragabad-4-1.jpg',
  },
  {
    slug: 'gokul-cultural-centre-mumbai',
    title: 'Gokul Cultural Centre',
    client: "South Kanara Brahmin's Association",
    type: 'Institutional',
    location: 'Mumbai',
    year: 2017,
    area: '75,000 sq ft',
    image: 'https://teamdesign.in/wp-content/uploads/2018/12/Gokul-Cam_01-1.jpg',
  },
  {
    slug: 'glass-kitchen-alibaug',
    title: 'Glass Kitchen',
    client: 'Private Client',
    type: 'Residential',
    location: 'Mandwa, Alibaug',
    year: 2014,
    area: '1,500 sq ft',
    image: 'https://teamdesign.in/wp-content/uploads/2018/12/Glass-Kitchen-5-1.jpg',
  },
  {
    slug: 'college-engineering-management-nagpur',
    title: 'College for Engineering & Management',
    client: 'Institute of Technology & Management',
    type: 'Institutional',
    location: 'Kamptee, Nagpur',
    year: 2010,
    area: '300,000 sq ft',
    image: 'https://teamdesign.in/wp-content/uploads/2018/12/COLLEGE-OF-ENG-_-MANAGEMENT-5.jpg',
  },
  {
    slug: 'bungalow-ahmedabad',
    title: 'Bungalow in Ahmedabad',
    client: 'Mr. Y Sulliya',
    type: 'Residential',
    location: 'Ahmedabad',
    year: 2014,
    area: '3,000 sq ft',
    image: 'https://teamdesign.in/wp-content/uploads/2018/12/Bungalow-in-Ahmedabad-Inida-4.jpg',
  },
  {
    slug: 'bhandari-house-bhinmal',
    title: 'Bhandari House',
    client: 'Mr. Gautam Bhandari',
    type: 'Residential',
    location: 'Bhinmal, Rajasthan',
    year: 2013,
    area: '8,000 sq ft',
    image: 'https://teamdesign.in/wp-content/uploads/2018/11/Bhandari-House.jpg',
  },
  {
    slug: 'venus-wires-office-khopoli',
    title: 'Building for Precision Metals — Venus Wires',
    client: 'Venus Wires',
    type: 'Commercial',
    location: 'Khopoli, Maharashtra',
    year: 2009,
    area: '10,000 sq ft',
    image: 'https://teamdesign.in/wp-content/uploads/2018/12/PRECISION-METALS-9-1.jpg',
  },
  {
    slug: 'qudrati-greens-indore',
    title: 'Qudrati Greens',
    client: 'Bakir Qudrati',
    type: 'Commercial',
    location: 'Indore, Madhya Pradesh',
    year: 2026,
    area: '40,000 sq ft',
    image: '/projects/qudrati-greens-indore/1.png',
  },
  {
    slug: 'nikhil-gupta-bungalow',
    title: "Nikhil Gupta's Bungalow",
    client: 'Nikhil Gupta',
    type: 'Residential',
    location: 'Awas, Alibaug',
    year: 2026,
    area: '15,000 sq ft',
    image: '/projects/nikhil-gupta-bungalow/2.jpg',
  },
  {
    slug: 'jhaveri-zaveri-residence',
    title: 'Jhaveri Zaveri Residence',
    client: 'Rupen Jhaveri & Binaisha Zaveri',
    type: 'Interiors',
    location: 'Mumbai',
    year: 2019,
    area: '2,500 sq ft',
    image: '/projects/jhaveri-zaveri-residence/1.jpg',
  },
  {
    slug: 'mohan-shenoi-residence',
    title: 'Mohan Shenoi Residence',
    client: 'Mohan Shenoi',
    type: 'Interiors',
    location: 'Mumbai',
    year: 2022,
    area: '5,000 sq ft',
    image: '/projects/mohan-shenoi-residence/1.jpg',
  },
  {
    slug: 'rahul-sanjana-residence',
    title: 'Rahul & Sanjana Residence',
    client: 'Rahul & Sanjana Shenoi',
    type: 'Interiors',
    location: 'Mumbai',
    year: 2017,
    area: '2,500 sq ft',
    image: '/projects/rahul-sanjana-residence/1.jpg',
  },
  {
    slug: 'usha-shenoi-residence',
    title: 'Usha Shenoi Residence',
    client: 'Usha Shenoi',
    type: 'Interiors',
    location: 'Mumbai',
    year: 2016,
    area: '2,500 sq ft',
    image: '/projects/usha-shenoi-residence/1.jpg',
  },
];

function WorkContent() {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get('type');
  const initial = FILTERS.includes(typeParam ?? '') ? typeParam! : 'All';
  const [active, setActive] = useState(initial);

  useEffect(() => {
    if (typeParam && FILTERS.includes(typeParam)) setActive(typeParam);
  }, [typeParam]);

  const filtered = (active === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.type === active)
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
          <Link key={project.slug} href={`/portfolio/${project.slug}`} className={styles.card}>
            <div className={styles.cardImage}>
              <FadeImage src={project.image} alt={project.title} fill sizes="(max-width: 900px) 50vw, 33vw" style={{ objectFit: 'cover' }} className={styles.img} placeholder="blur" blurDataURL={WARM_BLUR} />
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

export default function WorkPage() {
  return (
    <Suspense>
      <WorkContent />
    </Suspense>
  );
}
