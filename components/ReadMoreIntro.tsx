'use client';

import { useState } from 'react';
import styles from './ReadMoreIntro.module.css';

export default function ReadMoreIntro({ children }: { children: React.ReactNode }) {
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
