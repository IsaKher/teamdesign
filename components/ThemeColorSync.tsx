'use client';
import { useEffect } from 'react';

const DARK  = '#14100C';
const LIGHT = '#F4EEE6';

/**
 * Sets the browser theme-color (iOS Dynamic Island / Android status bar) and
 * the <html> background (overscroll bounce area) to dark on the hero/filmstrip
 * section, then flips to cream once the user scrolls past it.
 *
 * Rendered only on the home page. The page.tsx viewport export sets the
 * SSR-time themeColor to DARK so there is no flash before JS runs.
 */
export default function ThemeColorSync() {
  useEffect(() => {
    // Find or create the theme-color meta tag
    let meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name  = 'theme-color';
      document.head.appendChild(meta);
    }

    function apply(color: string) {
      if (meta) meta.content = color;
      // Controls the overscroll-bounce / rubber-band area colour
      document.documentElement.style.backgroundColor = color;
    }

    // Initialise — hero / filmstrip are dark
    apply(DARK);

    // Threshold: the mobile category filmstrip is ~520px tall (60px nav +
    // 22px strip padding + 380px cards + 20px + 40px swipe hint).
    // Once scrolled past it we are into the cream-background content area.
    const THRESHOLD = 540;

    let last = window.scrollY > THRESHOLD;

    function onScroll() {
      const past = window.scrollY > THRESHOLD;
      if (past !== last) {
        last = past;
        apply(past ? LIGHT : DARK);
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      // Restore default when unmounted (navigating away)
      apply(LIGHT);
      document.documentElement.style.backgroundColor = '';
    };
  }, []);

  return null;
}
