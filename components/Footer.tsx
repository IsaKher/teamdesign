import Image from 'next/image';
import Link from 'next/link';
import styles from './Footer.module.css';
import { STUDIO } from '@/lib/siteContent';
import { getSiteSettings } from '@/lib/sanity';
import ObfuscatedEmail from './ObfuscatedEmail';

export default async function Footer() {
  const settings = await getSiteSettings();
  // Fall back to siteContent.ts constants if Sanity is unavailable
  const phone = settings?.phone    ?? STUDIO.phone;
  const email = settings?.email    ?? STUDIO.email;

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>

        <div className={styles.left}>
          <Link href="/" className={styles.sealWrap} aria-label="Team Design Architects — home">
            <Image
              src="/logo.png"
              alt="Team Design Architects"
              width={152}
              height={152}
              className={styles.sealImage}
            />
          </Link>
          <div className={styles.firmInfo}>
            <span className={styles.name}>Team Design Architects</span>
            <span className={styles.meta}>
              Mumbai, India&ensp;·&ensp;
              <ObfuscatedEmail
                user={email.split('@')[0]}
                domain={email.split('@')[1]}
                className={styles.emailLink}
              />&ensp;·&ensp;
              <a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a>
            </span>
          </div>
        </div>

        <nav className={styles.nav} aria-label="Footer navigation">
          <Link href="/portfolio">Portfolio</Link>
          <Link href="/studio">Studio</Link>
          <Link href="/process">Process</Link>
          <Link href="/fees">Fees</Link>
          <Link href="/careers">Careers</Link>
          <Link href="/contact">Contact</Link>
        </nav>

      </div>

      <div className={styles.bottom}>
        <span>© {new Date().getFullYear()} Team Design Architects &amp; Interior Designers</span>
        <span className={styles.legal}>
          <Link href="/privacy">Privacy</Link>
          <span aria-hidden="true">·</span>
          <Link href="/terms">Terms</Link>
        </span>
        <span>Est. 1996 · Mumbai</span>
      </div>
    </footer>
  );
}
