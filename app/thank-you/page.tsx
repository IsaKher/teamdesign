import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.css';
import { getSiteSettings } from '@/lib/sanity';
import { STUDIO } from '@/lib/siteContent';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Message received',
  description: 'Your enquiry has been sent. A member of the team will reply within one to two business days.',
  // Don't index the conversion page — only meaningful when reached via the form
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://teamdesignarchitects.com/thank-you' },
};

export default async function ThankYouPage() {
  const settings = await getSiteSettings();
  const whatsapp = settings?.whatsapp ?? STUDIO.whatsappNumber;
  const email = settings?.email ?? STUDIO.email;

  const waLink = `https://wa.me/${whatsapp}`;

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <span className={styles.label}>Message Received</span>

        <h1 className={styles.title}>
          Thank you. We&rsquo;ll be in <em className={styles.italic}>touch shortly.</em>
        </h1>

        <p className={styles.body}>
          Your enquiry has reached the studio. A member of the team will respond
          personally within <strong className={styles.bodyEmphasis}>one to two business days</strong>.
        </p>

        <div className={styles.expectations}>
          <h2 className={styles.expectationsTitle}>What happens next</h2>
          <ol className={styles.expectationsList}>
            <li>
              <span className={styles.step}>01</span>
              <span className={styles.stepText}>
                We&rsquo;ll read your message carefully and look at any references you&rsquo;ve sent.
              </span>
            </li>
            <li>
              <span className={styles.step}>02</span>
              <span className={styles.stepText}>
                You&rsquo;ll hear back via email or WhatsApp — usually within 24 hours,
                always within two business days.
              </span>
            </li>
            <li>
              <span className={styles.step}>03</span>
              <span className={styles.stepText}>
                If there&rsquo;s a fit, we&rsquo;ll set up a 30-minute conversation —
                free, no commitment — to understand your brief properly.
              </span>
            </li>
          </ol>
        </div>

        <div className={styles.urgent}>
          <span className={styles.urgentLabel}>If it&rsquo;s urgent</span>
          <p className={styles.urgentText}>
            For a faster response, message us on WhatsApp directly. The studio is
            staffed Monday–Saturday, 9:30 AM – 7:00 PM IST.
          </p>
          <div className={styles.urgentLinks}>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.urgentWhatsapp}
            >
              Continue on WhatsApp →
            </a>
            <a href={`mailto:${email}`} className={styles.urgentEmail}>
              {email}
            </a>
          </div>
        </div>

        <nav className={styles.links} aria-label="Continue browsing">
          <Link href="/" className={styles.linkRow}>
            <span className={styles.linkLabel}>Back to Home</span>
            <span className={styles.linkArrow} aria-hidden="true">→</span>
          </Link>
          <Link href="/portfolio" className={styles.linkRow}>
            <span className={styles.linkLabel}>Browse the Portfolio</span>
            <span className={styles.linkArrow} aria-hidden="true">→</span>
          </Link>
        </nav>
      </div>
    </section>
  );
}
