'use client';

import { useState } from 'react';
import styles from './page.module.css';

const FAQS = [
  {
    q: 'How reliable is the fee estimate on this page?',
    a: 'The estimator gives you a directional range based on current Mumbai market construction benchmarks — it\'s a starting point, not a commitment. Your actual fee depends on the confirmed scope, site conditions, and project complexity. The figure you will actually pay is agreed in a signed Letter of Appointment before any work begins. Treat this as a sense-check, not a quote.',
  },
  {
    q: 'I\'ve never hired an architect before. What does working with one actually look like?',
    a: 'It starts with a free conversation — no preparation needed, no commitment required. We listen to what you want to build, what matters to you, and what you\'re working with. If it\'s a fit, we send a fee proposal. From there, the project moves through five structured phases — Discovery, Concept Design, Design Development, Technical Documentation, and Site Supervision — each with clear deliverables and your sign-off before we proceed.',
  },
  {
    q: 'What\'s the difference between the architectural fee and the construction cost?',
    a: 'The architectural fee is what you pay us — for design, drawings, coordination, and site supervision. The construction cost is what you pay the contractor who actually builds. These are entirely separate figures going to different parties. Our fee is calculated as a percentage of the construction cost, so the two are related — but they are not the same thing.',
  },
  {
    q: 'How long does a project take from first meeting to completion?',
    a: 'It depends on scale and complexity. As a rough guide: design and documentation typically takes 4–8 months. Construction varies widely — a residential interior might take 3–4 months; a new bungalow, 12–18 months. We give you a realistic timeline at the start of the project, not an optimistic one. Delays in approvals, contractor availability, and client sign-offs are the most common variables.',
  },
  {
    q: 'Can I hire you for just the design, and manage the construction myself?',
    a: 'No. We only take on projects we can see through to completion. A building that is designed by one party and supervised by another almost always suffers — decisions get made on site that contradict the design intent, and no one is accountable for the gap. We stay on the project until handover.',
  },
  {
    q: 'What happens if I want to make changes after the design is approved?',
    a: 'Two consolidated revision rounds are included in each phase. If you want to change direction after signing off on a phase — reverse a decision, expand the scope, change the programme — that is treated as new work and billed at day rates. This is why our approval process is deliberate: we ask the right questions upfront so sign-offs mean something.',
  },
  {
    q: 'Do you work on projects outside Mumbai?',
    a: 'Yes. We have completed projects from Srinagar to Thrissur — hillside residences in Kashmir, coastal homes in Kerala, institutional buildings across Maharashtra. The studio is based in Mumbai but distance has never been a constraint when the project is right.',
  },
  {
    q: 'Is GST included in the figures shown, and how does payment work?',
    a: 'All figures on this page exclude GST. GST at 18% applies to all professional fees under Indian tax law and is invoiced separately with full GST-compliant documentation. Payment is structured in six stages, each linked to a completed and approved milestone — so you only ever pay for work that has been done and signed off.',
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
