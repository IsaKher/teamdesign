'use client';
import { useRef, useState, useCallback } from 'react';

interface Props {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

export default function MagneticButton({ children, strength = 0.28, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const isResting = offset.x === 0 && offset.y === 0;

  // Cache rect on enter — one layout read per hover, not per mousemove event
  const handleMouseEnter = useCallback(() => {
    if (ref.current) rectRef.current = ref.current.getBoundingClientRect();
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = rectRef.current;
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setOffset({
      x: (e.clientX - cx) * strength,
      y: (e.clientY - cy) * strength,
    });
  }, [strength]);

  const handleMouseLeave = useCallback(() => {
    rectRef.current = null;
    setOffset({ x: 0, y: 0 });
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: isResting ? 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'transform 0.08s linear',
        display: 'contents',
      }}
    >
      {children}
    </div>
  );
}
