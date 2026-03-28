import Image from 'next/image';
import Link from 'next/link';
import styles from './Footer.module.css';
import { STUDIO } from '@/lib/siteContent';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>

        <div className={styles.left}>
          <Link href="/" className={styles.sealWrap} aria-label="Team Design Architects — home">
            <Image
              src="/logo.png"
              alt="Team Design Architects"
              width={72}
              height={72}
              className={styles.sealImage}
            />
          </Link>
          <div className={styles.firmInfo}>
            <span className={styles.name}>Team Design Architects</span>
            <span className={styles.meta}>
              Mumbai, India&ensp;·&ensp;
              <a href={`mailto:${STUDIO.email}`}>{STUDIO.email}</a>&ensp;·&ensp;
              <a href={`tel:${STUDIO.phone.replace(/\s/g, '')}`}>{STUDIO.phone}</a>
            </span>
          </div>
        </div>

        <nav className={styles.nav} aria-label="Footer navigation">
          <Link href="/portfolio">Portfolio</Link>
          <Link href="/studio">Studio</Link>
          <Link href="/process">Process</Link>
          <Link href="/people">Team</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/careers">Careers</Link>
        </nav>

      </div>

      <div className={styles.bottom}>
        <span>© {new Date().getFullYear()} Team Design Architects &amp; Interior Designers</span>
        <span>Est. 1996 · Mumbai</span>
      </div>
    </footer>
  );
}
