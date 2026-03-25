'use client';
import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';

export default function DrawingSection() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className={styles.drawing}>
      <div className={`${styles.drawingFrame} ${visible ? styles.drawingVisible : ''}`}>
        <span className={`${styles.corner} ${styles.cornerTL}`} aria-hidden="true" />
        <span className={`${styles.corner} ${styles.cornerTR}`} aria-hidden="true" />
        <span className={`${styles.corner} ${styles.cornerBL}`} aria-hidden="true" />
        <span className={`${styles.corner} ${styles.cornerBR}`} aria-hidden="true" />

        <div className={styles.drawingImageWrap}>
          <Image
            src="/studio-sketch.png"
            alt="Team Design Studio Building — Architectural Illustration, Kopar Khairane"
            fill
            priority
            sizes="(max-width: 900px) 100vw, calc(100vw - 160px)"
            style={{ objectFit: 'cover', objectPosition: 'center 25%' }}
          />
          <div className={`${styles.annot} ${styles.annotA}`}>
            <span className={styles.annotDot} />
            <span className={styles.annotLine} />
            <span className={styles.annotText}>Primary Tower</span>
          </div>
          <div className={`${styles.annot} ${styles.annotB}`}>
            <span className={styles.annotText}>Rooftop Planting</span>
            <span className={styles.annotLine} />
            <span className={styles.annotDot} />
          </div>
          <div className={`${styles.annot} ${styles.annotC}`}>
            <span className={styles.annotDot} />
            <span className={styles.annotLine} />
            <span className={styles.annotText}>Studio Entrance</span>
          </div>
        </div>

        <div className={styles.titleBlock}>
          <div className={styles.titleCell}>
            <span className={styles.titleCellLabel}>Practice</span>
            <span className={styles.titleCellValue}>Team Design Architects</span>
          </div>
          <div className={styles.titleCell}>
            <span className={styles.titleCellLabel}>Location</span>
            <span className={styles.titleCellValue}>Kopar Khairane, Navi Mumbai</span>
          </div>
          <div className={styles.titleCell}>
            <span className={styles.titleCellLabel}>Established</span>
            <span className={styles.titleCellValue}>1996</span>
          </div>
          <div className={styles.titleCell}>
            <span className={styles.titleCellLabel}>Drawing</span>
            <span className={styles.titleCellValue}>Studio Building — Exterior Elevation</span>
          </div>
          <div className={styles.titleCellCoords}>
            <span className={styles.titleCellLabel}>Coordinates</span>
            <span className={styles.coordsValue}>19°6′27″N&nbsp;&nbsp;73°0′29″E</span>
          </div>
        </div>
      </div>
    </section>
  );
}
