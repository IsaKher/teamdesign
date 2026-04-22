'use client';

import { useState, useCallback } from 'react';
import styles from './page.module.css';

const FAQ_ITEMS = [
  {
    q: 'Is the fee calculated on estimated or actual construction cost?',
    a: 'Both — in stages. At appointment, the fee is computed on an agreed estimated cost and invoiced progressively. At project close-out, it is regularised against the actual contract value: all accepted contractor bills, including structural, MEP, and finishes, excluding land. If actual costs exceed the estimate — which is common — the fee adjusts upward proportionately. If the declared cost appears materially below Mumbai benchmarks for the scope, we reserve the right to estimate independently.',
  },
  {
    q: 'When are Good for Construction (GFC) drawings released?',
    a: "During review phases, all drawings are issued as low-resolution, watermarked PDFs marked 'Not For Construction — Preliminary Review Only.' Native CAD files and final, un-watermarked GFC sets are transmitted only after 70% of the estimated total fee is confirmed as realised in our bank account. No exceptions. This protects both parties: the client receives complete, construction-ready documentation the moment the contractual threshold is met.",
  },
  {
    q: 'What is the NOC clause, and when does it apply?',
    a: 'Indian law requires a formal No Objection Certificate (NOC) from the original architect before a new architect can legally take over a partially completed project. Our Letter of Appointment makes this explicit: the NOC is issued strictly upon full clearance of all outstanding fees, interest, and dues for completed stages. This is not punitive — it is a legal standard that ensures design responsibility transfers only after financial obligations are honoured.',
  },
  {
    q: 'How is Vastu handled?',
    a: 'Vastu Shastra compliance is not an assumed baseline — it is a discrete requirement that must be declared before work begins. All Vastu parameters must be provided in writing before the Concept Design phase commences. If you rely on an external Vastu consultant, their written sign-off is required at Concept Approval. Any Vastu-driven changes requested after the floor plan has been formally approved constitute a change of brief and automatically trigger a Redesign Fee at the standard day rate.',
  },
  {
    q: 'Are 3D renders and walkthroughs included in the fee?',
    a: 'Basic 3D massing models for spatial comprehension are included during Design Development. Photorealistic exterior or interior renders, and animated cinematic walkthroughs, are premium services billed separately: ₹15,000 per photorealistic view; ₹10,000 per 30 seconds of animated walkthrough. Revisions to rendered content are additionally billed, as rendering time represents significant computing and labour cost.',
  },
  {
    q: 'Can I engage Team Design for concept design only?',
    a: 'No. We do not offer concept design as a standalone engagement. Producing a concept without seeing it through to complete technical documentation and site supervision creates serious execution risk for the client and compromises design integrity. Our minimum engagement covers Discovery through Technical Documentation. Site Supervision is included by default. Clients who engage another firm to execute our drawings do so at their own risk and we assume no liability for built outcomes in such cases.',
  },
  {
    q: 'What happens if I suspend or exit the project?',
    a: 'If the project is suspended for more than 30 consecutive days, or if an invoice remains unpaid beyond the 15-day cure period, we reserve the right to suspend all services immediately. If the project resumes after 90 days, a fresh financial assessment and a remobilization fee are required. On termination without cause: all phase fees are due immediately, plus a kill fee of 20% of the remaining balance. The design retainer is non-refundable in all circumstances.',
  },
  {
    q: 'What is the late payment policy?',
    a: 'Invoices unpaid beyond 15 days from the date of issue attract compound interest at 2% per month on the outstanding amount. Invoices are raised on the exact day a milestone deliverable is submitted — not deferred to month-end. Persistent non-payment is treated as breach of the commercial agreement and may trigger suspension of all services.',
  },
  {
    q: 'Is government liaisoning included in the fee?',
    a: 'Our responsibility is strictly limited to preparing statutory submission drawings in conformance with applicable building bylaws. Physical liaisoning with municipal authorities — attending MCGM or MHADA offices, following up on file movement — is not included and is engaged as a separate service. Stage 4 payment is triggered on submission to authority, not on approval, because municipal timelines are entirely outside our control. The client bears sole responsibility for all statutory fees and approval timelines.',
  },
  {
    q: "What is the architect's liability if the contractor deviates from the drawings?",
    a: "Our liability is limited to the professional services we have agreed to perform. If a contractor unilaterally deviates from the issued GFC drawings, design responsibility for those deviations rests with the contractor. Our maximum aggregate liability under any engagement is capped at the total professional fees received for that specific project. This protects the firm's broader operations from asymmetric claims arising from contractor error or client-directed site changes made without our knowledge.",
  },
];

export default function FeesFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggle = useCallback((i: number) => {
    setOpenIndex(prev => (prev === i ? null : i));
  }, []);

  return (
    <div>
      {FAQ_ITEMS.map((item, i) => (
        <div key={i} className={styles.faqItem}>
          <button
            className={styles.faqQuestion}
            onClick={() => toggle(i)}
            aria-expanded={openIndex === i}
          >
            {item.q}
            <span className={`${styles.faqToggle}${openIndex === i ? ` ${styles.faqToggleOpen}` : ''}`}>
              +
            </span>
          </button>
          {openIndex === i && <p className={styles.faqAnswer}>{item.a}</p>}
        </div>
      ))}
    </div>
  );
}
