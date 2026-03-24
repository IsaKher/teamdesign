'use client';
import { useRef, useState } from 'react';

interface Props {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

export default function MagneticButton({ children, strength = 0.28, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const isResting = offset.x === 0 && offset.y === 0;

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setOffset({
      x: (e.clientX - cx) * strength,
      y: (e.clientY - cy) * strength,
    });
  };

  const handleMouseLeave = () => setOffset({ x: 0, y: 0 });

  return (
    <div
      ref={ref}
      className={className}
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
