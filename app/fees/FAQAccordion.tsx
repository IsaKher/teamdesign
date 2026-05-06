'use client';

import { useState } from 'react';
import styles from './page.module.css';

const FAQS = [
  {
    q: 'Is the first meeting free?',
    a: 'Yes. The initial consultation carries no fee and no commitment. We listen to your project, ask the right questions, and tell you honestly whether and how we can help. If we\'re not the right fit, we\'ll say so.',
  },
  {
    q: 'Can I hire you for just one phase — concept design only?',
    a: 'No. We don\'t offer concept-only or partial engagements. We take on projects we can see through to completion. This protects the integrity of the design and ensures the building that gets built is the one that was designed.',
  },
  {
    q: 'What happens if I want to change the design after it\'s been approved?',
    a: 'Two consolidated revision rounds are included per phase. Changes requested after client sign-off — including scope changes, programme changes, or reversals of approved decisions — are treated as new work and billed at day rates.',
  },
  {
    q: 'Do fees increase if the project budget grows?',
    a: 'Yes. Fees are a percentage of the actual construction cost, so they scale with the scope of works. This alignment is intentional — if the project grows, so does our workload. If it shrinks, so does our fee.',
  },
  {
    q: 'What exactly is included in site supervision?',
    a: 'Regular site visits at critical construction stages, review of contractor shop drawings, issuing clarifications and variation orders, snagging and defects documentation, and as-built drawings at handover. Government liaisoning — physical attendance at MCGM, MHADA, or other authorities — is a separate, segregated service.',
  },
  {
    q: 'Are your fees negotiable?',
    a: 'We meet or exceed the COA mandatory minimums on every project — these are non-negotiable by law. Our rates reflect 25+ years of practice, a full in-house team, and a commitment to seeing every project through to completion. We compete on quality and transparency, not on undercutting.',
  },
  {
    q: 'When is GST charged and how is it invoiced?',
    a: 'GST at 18% is applicable on all professional fees and documentation charges under Indian tax law. It is always invoiced separately with full GST-compliant documentation. Every figure on this page is exclusive of GST.',
  },
];

export default function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className={styles.faqList}>
      {FAQS.map((item, i) => (
        <div key={i} className={styles.faqItem}>
          <button
            className={styles.faqQuestion}
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
          >
            <span>{item.q}</span>
            <span className={`${styles.faqIcon} ${open === i ? styles.faqIconOpen : ''}`}>+</span>
          </button>
          {/* Always rendered — hidden via CSS so crawlers can read all answers */}
          <p className={`${styles.faqAnswer} ${open === i ? '' : styles.faqAnswerHidden}`}>
            {item.a}
          </p>
        </div>
      ))}
    </div>
  );
}
