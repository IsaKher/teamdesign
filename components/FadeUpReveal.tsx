'use client';

import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from 'react';

interface FadeUpRevealProps {
  children: ReactNode;
  /** Stagger delay in seconds */
  delay?: number;
  /** Override the vertical travel distance (default 20px) */
  distance?: number;
  className?: string;
}

/**
 * Scroll-triggered reveal — same visual as before (opacity 0→1, y 20→0,
 * 0.8s ease [0.16, 1, 0.3, 1]) but implemented with vanilla CSS +
 * IntersectionObserver. Removes the framer-motion dependency from the
 * homepage critical path.
 *
 * Also respects prefers-reduced-motion: skips the animation and renders
 * the content statically.
 */
export default function FadeUpReveal({
  children,
  delay = 0,
  distance = 20,
  className,
}: FadeUpRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);

    if (!ref.current) return;
    const node = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { rootMargin: '-80px 0px', threshold: 0 },
    );
    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  // If the user prefers reduced motion we paint the content directly with no
  // entrance, matching the rest of the site's reduced-motion treatment.
  const style: CSSProperties = reduced
    ? {}
    : {
        opacity: revealed ? 1 : 0,
        transform: revealed ? 'translateY(0)' : `translateY(${distance}px)`,
        transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
        willChange: revealed ? 'auto' : 'opacity, transform',
      };

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
