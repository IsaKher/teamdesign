'use client';

import { useEffect, useState } from 'react';
import WhatsAppIcon from '@/components/icons/WhatsAppIcon';
import styles from './StickyProjectCTA.module.css';

export default function StickyProjectCTA({ href }: { href: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > window.innerHeight * 0.75);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.bar} ${visible ? styles.barVisible : ''}`}
    >
      <WhatsAppIcon />
      <span className={styles.text}>Discuss this project</span>
    </a>
  );
}
