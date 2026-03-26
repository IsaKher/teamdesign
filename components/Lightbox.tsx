'use client';
import { useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import styles from './Lightbox.module.css';
import { WARM_BLUR } from '@/lib/siteContent';

export interface LightboxImage {
  src: string;
  caption?: string;
}

interface Props {
  images: LightboxImage[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({ images, currentIndex, onClose, onNavigate }: Props) {
  const current = images[currentIndex];
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < images.length - 1;
  const touchStartX = useRef(0);

  const handlePrev = useCallback(() => {
    if (hasPrev) onNavigate(currentIndex - 1);
  }, [hasPrev, currentIndex, onNavigate]);

  const handleNext = useCallback(() => {
    if (hasNext) onNavigate(currentIndex + 1);
  }, [hasNext, currentIndex, onNavigate]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose, handlePrev, handleNext]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
  };

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Image */}
      <div className={styles.imageWrap} onClick={e => e.stopPropagation()}>
        <Image
          src={current.src}
          alt={current.caption || ''}
          fill
          sizes="100vw"
          style={{ objectFit: 'contain' }}
          placeholder="blur"
          blurDataURL={WARM_BLUR}
          priority
        />
      </div>

      {/* Caption */}
      {current.caption && (
        <span className={styles.caption}>{current.caption}</span>
      )}

      {/* Navigation */}
      {hasPrev && (
        <button
          className={`${styles.nav} ${styles.navPrev}`}
          onClick={e => { e.stopPropagation(); handlePrev(); }}
          aria-label="Previous image"
        >
          ‹
        </button>
      )}
      {hasNext && (
        <button
          className={`${styles.nav} ${styles.navNext}`}
          onClick={e => { e.stopPropagation(); handleNext(); }}
          aria-label="Next image"
        >
          ›
        </button>
      )}

      {/* Close */}
      <button
        className={styles.close}
        onClick={onClose}
        aria-label="Close lightbox"
      >
        ✕
      </button>

      {/* Counter */}
      {images.length > 1 && (
        <span className={styles.counter}>{currentIndex + 1} / {images.length}</span>
      )}
    </div>
  );
}
