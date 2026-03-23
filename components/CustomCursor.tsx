'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;

    let rafId: number;
    let mx = -100, my = -100;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!visible) setVisible(true);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest('a, button, [role="button"], label')) {
        el.classList.add(styles.expand);
      } else {
        el.classList.remove(styles.expand);
      }
    };

    const tick = () => {
      el.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
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
  }, [visible]);

  return (
    <div
      ref={cursorRef}
      className={`${styles.cursor} ${visible ? styles.visible : ''}`}
      aria-hidden="true"
    />
  );
}
