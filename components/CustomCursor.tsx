'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let rafId: number;
    // Actual pointer position
    let mx = -200, my = -200;
    let isHover = false;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      setVisible(true);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      isHover = !!t.closest('a, button, [role="button"], label');
    };

    const tick = () => {
      // Both dot and ring sit exactly at pointer — no lag
      dot.style.transform  = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      ring.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;

      // Toggle hover classes
      if (isHover) {
        ring.classList.add(styles.ringExpand);
        dot.classList.add(styles.dotHide);
      } else {
        ring.classList.remove(styles.ringExpand);
        dot.classList.remove(styles.dotHide);
      }

      rafId = requestAnimationFrame(tick);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    document.addEventListener('mouseover', onOver);
    rafId = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Dot — sits exactly at pointer tip */}
      <div
        ref={dotRef}
        className={`${styles.dot} ${visible ? styles.visible : ''}`}
        aria-hidden="true"
      />
      {/* Ring — trails behind with eased lag */}
      <div
        ref={ringRef}
        className={`${styles.ring} ${visible ? styles.visible : ''}`}
        aria-hidden="true"
      />
    </>
  );
}
