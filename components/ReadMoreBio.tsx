'use client';

import { useState } from 'react';
import styles from './ReadMoreBio.module.css';

/**
 * Wraps secondary bio paragraph(s).
 * On desktop: always visible, toggle hidden.
 * On mobile (≤600px): collapsed by default, reveal on tap.
 */
export default function ReadMoreBio({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={`${styles.extra} ${open ? styles.open : ''}`}>
        {children}
      </div>
      <button
        className={styles.toggle}
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        {open ? 'Read less ↑' : 'Read more ↓'}
      </button>
    </>
  );
}
