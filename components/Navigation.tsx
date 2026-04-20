'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navigation.module.css';
import { STUDIO } from '@/lib/siteContent';

const leftItems = [
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Studio',    href: '/studio'    },
];

const rightItems = [
  { label: 'Process',   href: '/process'   },
  { label: 'Contact',   href: '/contact'   },
];

const allItems = [...leftItems, ...rightItems];

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const pathname   = usePathname();

  const isHeroPage = pathname === '/' || pathname.startsWith('/portfolio/');
  // Only the home page gets the reversed collapse (links hidden at top, revealed on scroll)
  const isHomePage = pathname === '/';

  /* Direct DOM class manipulation — no React re-render on scroll */
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const update = () => {
      const y = window.scrollY;
      const scrolled = y > 40;
      // Filmstrip section height: ~520px mobile, ~680px desktop
      const filmstripBottom = window.innerWidth <= 768 ? 520 : 680;
      const pastFilmstrip   = y > filmstripBottom;

      el.classList.toggle(styles.solid,       scrolled || !isHeroPage);
      el.classList.toggle(styles.transparent, !scrolled && isHeroPage);
      // Reversed on home page: collapsed (links hidden) at top, links revealed on scroll
      el.classList.toggle(styles.collapsed,   isHomePage && !pastFilmstrip);
    };

    update(); // sync initial state after mount
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [isHeroPage, isHomePage]);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <header
      ref={headerRef}
      className={`${styles.nav} ${isHeroPage ? styles.transparent : styles.solid} ${isHomePage ? styles.collapsed : ''} ${menuOpen ? styles.menuOpen : ''}`}
    >
      {/* ─── Desktop row ───────────────────────────────────────────── */}
      <div className={styles.inner}>

        {/* Left links */}
        <nav className={styles.linksLeft} aria-label="Primary navigation left">
          {leftItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.link} ${pathname.startsWith(item.href) ? styles.active : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Centred logo — desktop shows seal, mobile shows wordmark */}
        <Link href="/" className={styles.logoWrap} aria-label="Team Design Architects — home">
          <span className={styles.seal}>
            <Image
              src="/logo.png"
              alt="Team Design Architects"
              fill
              sizes="112px"
              className={styles.logoImage}
              priority
            />
          </span>
          <span className={styles.mobileWordmark}>Team Design</span>
        </Link>

        {/* Right links + mobile burger */}
        <div className={styles.navRight}>
          <nav className={styles.linksRight} aria-label="Primary navigation right">
            {rightItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.link} ${pathname.startsWith(item.href) ? styles.active : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

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
        <button className={styles.mobileClose} onClick={() => setMenuOpen(false)} aria-label="Close menu">✕</button>
        {allItems.map((item) => (
          <Link key={item.href} href={item.href} className={styles.mobileLink}>{item.label}</Link>
        ))}
        <div className={styles.mobileContact}>
          <a href={`tel:${STUDIO.phone.replace(/\s/g, '')}`}>Call Studio</a>
        </div>
      </div>
    </header>
  );
}
