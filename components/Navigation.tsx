'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navigation.module.css';

const navItems = [
  { label: 'Work', href: '/work' },
  { label: 'Interiors', href: '/interiors' },
  { label: 'Studio', href: '/studio' },
  { label: 'People', href: '/people' },
  { label: 'Contact', href: '/contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Only homepage and individual project pages have a full-screen dark hero
  const isHeroPage = pathname === '/' || pathname.startsWith('/work/');

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
      <div className={styles.inner}>
        {/* Wordmark */}
        <Link href="/" className={styles.wordmark}>
          <span className={styles.seal}>
            <Image
              src="/logo.png"
              alt="Team Design Architects"
              fill
              sizes="56px"
              className={styles.logoImage}
              priority
            />
          </span>
          <span className={styles.divider} />
          <span className={styles.firmName}>Team Design</span>
        </Link>

        {/* Desktop nav links */}
        <nav className={styles.links}>
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

        {/* Mobile menu toggle */}
        <button
          className={styles.burger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={styles.mobileLink}>
              {item.label}
            </Link>
          ))}
          <div className={styles.mobileContact}>
            <a href="tel:+919876543210">Call Studio</a>
          </div>
        </div>
      )}
    </header>
  );
}
