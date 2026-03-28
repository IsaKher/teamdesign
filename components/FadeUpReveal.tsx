'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FadeUpRevealProps {
  children: ReactNode;
  /** Stagger delay in seconds */
  delay?: number;
  /** Override the vertical travel distance (default 20px) */
  distance?: number;
  className?: string;
}

/**
 * Luxury scroll-triggered reveal.
 * Quiet authority: slow entrance, zero bounce, ease like a heavy door swinging open.
 * Specs: opacity 0→1, y 20→0, duration 0.8s, ease [0.16, 1, 0.3, 1]
 */
export default function FadeUpReveal({
  children,
  delay = 0,
  distance = 20,
  className,
}: FadeUpRevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
