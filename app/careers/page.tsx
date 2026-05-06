export const revalidate = 3600;

import type { Metadata } from 'next';
import styles from './page.module.css';
import CareersClient from './CareersClient';
import { getJobs, getSiteSettings } from '@/lib/sanity';
import { STUDIO } from '@/lib/siteContent';

export const metadata: Metadata = {
  title: 'Careers — Join the Practice',
  description:
    'Work with Team Design Architects in Mumbai. We are an architecture and interior design studio looking for architects, designers, and interns with a passion for craft.',
  keywords: [
    'architecture jobs Mumbai',
    'architect jobs India',
    'interior design jobs Mumbai',
    'architecture internship Mumbai',
    'Team Design careers',
    'architecture firm hiring Mumbai',
  ],
  alternates: { canonical: 'https://teamdesignarchitects.com/careers' },
  openGraph: {
    title: 'Careers — Team Design Architects',
    description:
      'Join a Mumbai architecture and interior design studio with 25+ years of practice. We are looking for architects, designers, and interns.',
    url: 'https://teamdesignarchitects.com/careers',
    images: [
      {
        url: 'https://teamdesignarchitects.com/studio-story.webp',
        width: 1200,
        height: 800,
        alt: 'Team Design Studio — Mumbai',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Careers — Team Design Architects',
    description:
      'Join a Mumbai architecture and interior design studio with 25+ years of practice.',
    images: ['https://teamdesignarchitects.com/studio-story.webp'],
  },
};

export default async function CareersPage() {
  const [jobs, settings] = await Promise.all([getJobs(), getSiteSettings()]);

  const contact = {
    email:      settings?.email      ?? STUDIO.email,
    whatsapp:   settings?.whatsapp   ?? STUDIO.whatsappNumber,
    linkedinUrl: settings?.linkedinUrl ?? STUDIO.linkedinUrl,
  };

  return (
    <>
      {/* ─── Page hero ──────────────────────────────────────────── */}
      <div className={styles.pageHero}>
        <span className={styles.pageLabel}>Work With Us</span>
        <h1 className={styles.pageTitle}>Join the practice.</h1>
        <p className={styles.pageSubtitle}>
          We are a small studio with a 25-year body of work. We work across scales — from a single room to a campus. We are looking for people who draw before they model, and who understand that a building is experienced before it is photographed.
        </p>
      </div>

      {/* ─── What we look for ───────────────────────────────────── */}
      <div className={styles.lookForSection}>
        <blockquote className={styles.lookForQuote}>
          &ldquo;You think in sections and can explain why. You&rsquo;re fluent in at least one 3D tool but don&rsquo;t treat software as the design. You can hold a conversation about materials and light — and you know the difference between a building that looks good and one that works.&rdquo;
        </blockquote>
      </div>

      <CareersClient jobs={jobs} contact={contact} />
    </>
  );
}
