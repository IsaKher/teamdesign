import Image from 'next/image';
import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.seal}>
          <Image
            src="/logo.png"
            alt="Team Design Architects"
            width={112}
            height={112}
            className={styles.sealImage}
          />
        </div>

        <div className={styles.firmTitle}>
          <span className={styles.name}>Team Design Architects</span>
          <span className={styles.sub}>& Interior Designers · Est. 1999</span>
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.col}>
          <span className={styles.colLabel}>Studio</span>
          <address className={styles.address}>
            Kopar Khairane<br />
            Navi Mumbai, Maharashtra<br />
            India
          </address>
        </div>

        <div className={styles.col}>
          <span className={styles.colLabel}>Contact</span>
          <div className={styles.links}>
            <a href="tel:+919876543210">+91 98765 43210</a>
            <a href="mailto:studio@teamdesign.in">studio@teamdesign.in</a>
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>
        </div>

        <div className={styles.col}>
          <span className={styles.colLabel}>Navigate</span>
          <nav className={styles.links}>
            <Link href="/work">Work</Link>
            <Link href="/interiors">Interiors</Link>
            <Link href="/studio">Studio</Link>
            <Link href="/people">People</Link>
            <Link href="/process">How We Work</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>

        <div className={styles.col}>
          <span className={styles.colLabel}>Practice</span>
          <div className={styles.links}>
            <span>Architecture</span>
            <span>Interior Design</span>
            <span>Sustainable Design</span>
            <span>Institutional</span>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>© {new Date().getFullYear()} Team Design Architects & Interior Designers. All rights reserved.</span>
        <span>teamdesign.in · Mumbai, India</span>
      </div>
    </footer>
  );
}
