'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

const FILTERS = ['All', 'Bungalows', 'Commercial', 'Institutional', 'Residential'];

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
    location: 'Kharghar, Navi Mumbai',
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
    type: 'Bungalows',
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
    location: 'Navi Mumbai',
    year: 2005,
    area: '85,000 sq ft',
    image: 'https://teamdesign.in/wp-content/uploads/2018/12/MBA-Hostel-Building-ITM-Navi-Mumbai-India-5-1.jpg',
  },
  {
    slug: 'mariwala-estate-annexe-lonavala',
    title: 'Mariwala Estate Annexe',
    client: 'Mr. Harsh Mariwala',
    type: 'Bungalows',
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
    location: 'Kharghar, Navi Mumbai',
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
    type: 'Bungalows',
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
    type: 'Bungalows',
    location: 'Ahmedabad',
    year: 2014,
    area: '3,000 sq ft',
    image: 'https://teamdesign.in/wp-content/uploads/2018/12/Bungalow-in-Ahmedabad-Inida-4.jpg',
  },
  {
    slug: 'bhandari-house-bhinmal',
    title: 'Bhandari House',
    client: 'Mr. Gautam Bhandari',
    type: 'Bungalows',
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
];

function WorkContent() {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get('type');
  const initial = FILTERS.includes(typeParam ?? '') ? typeParam! : 'All';
  const [active, setActive] = useState(initial);

  useEffect(() => {
    if (typeParam && FILTERS.includes(typeParam)) setActive(typeParam);
  }, [typeParam]);

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
        {filtered.length === 0 && (
          <div className={styles.emptyState}>
            <p>No projects found under &ldquo;{active}&rdquo;.</p>
            <button className={styles.filterBtn} onClick={() => setActive('All')}>View all projects →</button>
          </div>
        )}
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

export default function WorkPage() {
  return (
    <Suspense>
      <WorkContent />
    </Suspense>
  );
}
