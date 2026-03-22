import Image from 'next/image';
import Link from 'next/link';
import styles from './Footer.module.css';
import { STUDIO } from '@/lib/siteContent';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Link href="/" className={styles.top}>
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
      </Link>

      <div className={styles.grid}>
        <div className={styles.col}>
          <span className={styles.colLabel}>Studio</span>
          <a
            href={STUDIO.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.addressLink}
          >
            <address className={styles.address}>
              A-145/6A, Pawane Village Midc Road<br />
              T.T.C. Industrial Area, MIDC Sector 2<br />
              Kopar Khairane, Navi Mumbai<br />
              Maharashtra 400710, India
            </address>
          </a>
        </div>

        <div className={styles.col}>
          <span className={styles.colLabel}>Contact</span>
          <div className={styles.links}>
            <a href={`tel:${STUDIO.phone.replace(/\s/g, '')}`}>{STUDIO.phone}</a>
            <a href={`mailto:${STUDIO.email}`}>{STUDIO.email}</a>
            <a href={`https://wa.me/${STUDIO.whatsappNumber}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>
        </div>

        <div className={styles.col}>
          <span className={styles.colLabel}>Navigate</span>
          <nav className={styles.links}>
            <Link href="/work">Work</Link>
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
