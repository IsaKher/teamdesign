'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import styles from './TestimonialSlider.module.css';

export interface Testimonial {
  quote: string;
  name: string;
  title: string;
  project: string;
}

interface TestimonialSliderProps {
  testimonials: Testimonial[];
  /** Auto-advance interval in ms. Default: 6000 */
  interval?: number;
}

export default function TestimonialSlider({
  testimonials,
  interval = 6000,
}: TestimonialSliderProps) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((index: number) => {
    setCurrent(((index % testimonials.length) + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  const goNext = useCallback(() => goTo(current + 1), [current, goTo]);

  // Auto-advance
  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(goNext, interval);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [goNext, interval, isPaused]);

  // Reset timer when manually navigating
  const handleDotClick = (index: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    goTo(index);
    // Restart auto-advance after manual navigation
    setIsPaused(false);
  };

  return (
    <div
      className={styles.slider}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Sliding track — moves left as current increases */}
      <div
        className={styles.track}
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {testimonials.map((t, i) => (
          <div key={i} className={styles.slide} aria-hidden={i !== current}>
            <blockquote className={styles.quote}>
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <div className={styles.author}>
              <span className={styles.authorName}>{t.name}</span>
              <span className={styles.authorTitle}>
                {t.title} &middot; {t.project}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className={styles.progressBar}>
        <div
          key={current}
          className={styles.progressFill}
          style={{ animationDuration: `${interval}ms` }}
        />
      </div>

      {/* Dot navigation */}
      <div className={styles.dots} role="tablist" aria-label="Testimonials">
        {testimonials.map((t, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === current}
            aria-label={`Testimonial from ${t.name}`}
            className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
            onClick={() => handleDotClick(i)}
          />
        ))}
      </div>
    </div>
  );
}
