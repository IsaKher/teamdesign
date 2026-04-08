'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navigation.module.css';
import { STUDIO } from '@/lib/siteContent';

const navItems = [
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Studio',    href: '/studio'    },
  { label: 'Process',   href: '/process'   },
  { label: 'Team',      href: '/people'    },
  { label: 'Contact',   href: '/contact'   },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isHeroPage = pathname === '/' || pathname.startsWith('/portfolio/');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`${styles.nav} ${scrolled || !isHeroPage ? styles.solid : styles.transparent} ${menuOpen ? styles.menuOpen : ''}`}
    >
      {/* ─── Main nav row ──────────────────────────────────────────── */}
      <div className={styles.inner}>

        {/* Left — Logo + tagline */}
        <Link href="/" className={styles.wordmark} aria-label="Team Design Architects — home">
          <span className={styles.seal}>
            <Image
              src="/logo.png"
              alt="Team Design Architects"
              fill
              sizes="80px"
              className={styles.logoImage}
              priority
            />
          </span>
          <span className={styles.divider} />
          <span className={styles.tagline}>Architecture &amp; Interior Design<br />Mumbai</span>
        </Link>

        {/* Right — nav links + mobile burger */}
        <div className={styles.navRight}>
          <nav className={`${styles.links} ${styles.linksRight}`}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.link} ${pathname.startsWith(item.href) ? styles.active : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            className={styles.burger}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>

      </div>

      {/* ─── Mobile backdrop ───────────────────────────────────────── */}
      <div
        className={`${styles.mobileBackdrop} ${menuOpen ? styles.mobileBackdropVisible : ''}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* ─── Mobile menu ───────────────────────────────────────────── */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}>
        <button
          className={styles.mobileClose}
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        >
          ✕
        </button>
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className={styles.mobileLink}>
            {item.label}
          </Link>
        ))}
        <div className={styles.mobileContact}>
          <a href={`tel:${STUDIO.phone.replace(/\s/g, '')}`}>Call Studio</a>
        </div>
      </div>
    </header>
  );
}
