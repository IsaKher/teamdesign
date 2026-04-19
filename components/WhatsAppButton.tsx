'use client';

import { usePathname } from 'next/navigation';
import styles from './WhatsAppButton.module.css';
import { STUDIO } from '@/lib/siteContent';

/** Convert a URL slug like "maharaja-agrasen-palace" → "Maharaja Agrasen Palace" */
function slugToTitle(slug: string): string {
  return slug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export default function WhatsAppButton({ number = STUDIO.whatsappNumber }: { number?: string }) {
  const pathname = usePathname();

  // Detect /portfolio/[slug] pages and pre-fill a project-specific message
  const projectMatch = pathname?.match(/^\/portfolio\/([^/]+)$/);
  const message = projectMatch
    ? `Hello, I came across the ${slugToTitle(projectMatch[1])} project on your website and I'd like to enquire about a similar project with Team Design Architects.`
    : "Hello, I'd like to discuss a project with Team Design Architects.";

  const href = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.button}
      aria-label="Chat on WhatsApp"
      data-whatsapp-button
    >
      <span className={styles.icon}>
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.128.558 4.122 1.533 5.851L.057 23.776a.75.75 0 0 0 .94.94l5.925-1.476A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.659-.528-5.168-1.444l-.37-.223-3.815.95.968-3.739-.245-.387A9.952 9.952 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
        </svg>
      </span>
      <span className={styles.label}>WhatsApp Us</span>
    </a>
  );
}
