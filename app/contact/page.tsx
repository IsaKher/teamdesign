export const revalidate = 3600;

import type { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Team Design Architects in Mumbai. Start a conversation about your residential, commercial, or institutional project.',
  keywords: ['contact architect Mumbai', 'hire architect Mumbai', 'architecture firm contact Mumbai', 'Team Design contact'],
  alternates: { canonical: 'https://teamdesign.in/contact' },
  openGraph: {
    title: 'Contact — Team Design Architects',
    description: 'Get in touch with Team Design Architects in Mumbai. Start a conversation about your project.',
    url: 'https://teamdesign.in/contact',
    images: [{ url: 'https://teamdesign.in/studio-story.webp', width: 1200, height: 800, alt: 'Team Design Studio — Mumbai' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact — Team Design Architects',
    description: 'Get in touch with Team Design Architects. Start a conversation about your project.',
    images: ['https://teamdesign.in/studio-story.webp'],
  },
};
import ContactClient from './ContactClient';
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
        <div className={styles.mapGrid}>
          <div className={styles.mapCard}>
            <span className={styles.mapCardLabel}>Parel Studio</span>
            <div className={styles.mapEmbed}>
              <iframe
                src="https://maps.google.com/maps?q=18.9919709,72.8314168&output=embed&z=17"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Parel Studio location"
              />
            </div>
            <a
              href="https://maps.app.goo.gl/ygVTjd4QU5RYgFLS6"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mapDirections}
            >
              Get Directions →
            </a>
          </div>

          <div className={styles.mapCard}>
            <span className={styles.mapCardLabel}>Kopar Khairane Studio</span>
            <div className={styles.mapEmbed}>
              <iframe
                src="https://maps.google.com/maps?q=A-145+Pawane+Village+MIDC+Kopar+Khairane+Mumbai+400710&output=embed&z=15"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Kopar Khairane Studio location"
              />
            </div>
            <a
              href={STUDIO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mapDirections}
            >
              Get Directions →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
