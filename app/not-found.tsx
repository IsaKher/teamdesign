import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './not-found.module.css';

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'The page you were looking for has moved or no longer exists.',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <span className={styles.label}>Error 404</span>
        <h1 className={styles.title}>
          The page <em className={styles.italic}>has wandered off.</em>
        </h1>
        <p className={styles.body}>
          The link you followed may be broken, or the page may have moved.
          Either way — there&rsquo;s plenty more to see.
        </p>

        <nav aria-label="Suggested destinations" className={styles.links}>
          <Link href="/" className={styles.linkPrimary}>
            <span className={styles.linkLabel}>Home</span>
            <span className={styles.linkHint}>Start at the beginning</span>
          </Link>
          <Link href="/portfolio" className={styles.linkPrimary}>
            <span className={styles.linkLabel}>Portfolio</span>
            <span className={styles.linkHint}>300+ projects across India</span>
          </Link>
          <Link href="/contact" className={styles.linkPrimary}>
            <span className={styles.linkLabel}>Contact</span>
            <span className={styles.linkHint}>Begin a conversation</span>
          </Link>
        </nav>
      </div>
    </section>
  );
}
