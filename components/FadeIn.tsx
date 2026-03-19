'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface FadeInProps {
  children: ReactNode;
  /** Delay in seconds before animation starts */
  delay?: number;
  /** Direction to fade in from */
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  /** Distance in px to travel */
  distance?: number;
  /** Fraction of element visible before triggering */
  threshold?: number;
  className?: string;
}

export default function FadeIn({
  children,
  delay = 0,
  direction = 'up',
  distance = 28,
  threshold = 0.15,
  className,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: threshold });

  const directionOffset = {
    up:    { x: 0,         y: distance  },
    down:  { x: 0,         y: -distance },
    left:  { x: distance,  y: 0         },
    right: { x: -distance, y: 0         },
    none:  { x: 0,         y: 0         },
  }[direction];

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...directionOffset }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}
