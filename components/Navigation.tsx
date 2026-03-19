'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navigation.module.css';

const navItems = [
  {
    label: 'Work',
    href: '/work',
    dropdown: [
      { label: 'Residential', href: '/work?type=Residential' },
      { label: 'Commercial',  href: '/work?type=Commercial'  },
      { label: 'Institutional', href: '/work?type=Institutional' },
    ],
  },
  {
    label: 'Interiors',
    href: '/interiors',
    dropdown: [
      { label: 'Residential', href: '/interiors?type=Residential' },
      { label: 'Commercial',  href: '/interiors?type=Commercial'  },
      { label: 'Institutional', href: '/interiors?type=Institutional' },
    ],
  },
  { label: 'Studio',  href: '/studio'  },
  { label: 'People',  href: '/people'  },
  { label: 'Contact', href: '/contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

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
          {navItems.map((item) =>
            item.dropdown ? (
              /* Items with dropdown — wrapper fills full nav height to close the gap */
              <div key={item.href} className={styles.navItem}>
                <Link
                  href={item.href}
                  className={`${styles.link} ${pathname.startsWith(item.href) ? styles.active : ''}`}
                >
                  {item.label}
                </Link>

                <div className={styles.dropdown}>
                  {item.dropdown.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      className={styles.dropdownLink}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.link} ${pathname.startsWith(item.href) ? styles.active : ''}`}
              >
                {item.label}
              </Link>
            )
          )}
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
            <div key={item.href}>
              <Link href={item.href} className={styles.mobileLink}>
                {item.label}
              </Link>
              {item.dropdown && (
                <div className={styles.mobileSublinks}>
                  {item.dropdown.map((sub) => (
                    <Link key={sub.href} href={sub.href} className={styles.mobileSublinkItem}>
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className={styles.mobileContact}>
            <a href="tel:+919876543210">Call Studio</a>
          </div>
        </div>
      )}
    </header>
  );
}
