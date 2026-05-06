export const revalidate = 3600;

import type { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Team Design Architects in Mumbai. Start a conversation about your residential, commercial, or institutional project.',
  keywords: ['contact architect Mumbai', 'hire architect Mumbai', 'architecture firm contact Mumbai', 'Team Design contact'],
  alternates: { canonical: 'https://teamdesignarchitects.com/contact' },
  openGraph: {
    title: 'Contact — Team Design Architects',
    description: 'Get in touch with Team Design Architects in Mumbai. Start a conversation about your project.',
    url: 'https://teamdesignarchitects.com/contact',
    images: [{ url: 'https://teamdesignarchitects.com/studio-story.webp', width: 1200, height: 800, alt: 'Team Design Studio — Mumbai' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact — Team Design Architects',
    description: 'Get in touch with Team Design Architects. Start a conversation about your project.',
    images: ['https://teamdesignarchitects.com/studio-story.webp'],
  },
};
import ContactClient from './ContactClient';
import StudioMapWrapper from '@/components/StudioMapWrapper';
import { getSiteSettings } from '@/lib/sanity';
import { STUDIO } from '@/lib/siteContent';

export default async function ContactPage() {
  const settings = await getSiteSettings();

  const contact = {
    phone:    settings?.phone    ?? STUDIO.phone,
    email:    settings?.email    ?? STUDIO.email,
    whatsapp: settings?.whatsapp ?? STUDIO.whatsappNumber,
  };

  return (
    <>
      <div className={styles.pageHero}>
        <span className={styles.pageLabel}>Get In Touch</span>
        <h1 className={styles.pageTitle}>Begin a conversation.</h1>
        <p className={styles.pageSubtitle}>
          Every project starts with a conversation. Tell us about what you&apos;re building — we&apos;ll take it from there.
        </p>
      </div>

      <ContactClient contact={contact} />

      {/* ─── Map ─────────────────────────────────────────────────────────── */}
      <div className={styles.mapSection}>
        <StudioMapWrapper />
      </div>
    </>
  );
}
