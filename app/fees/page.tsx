import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.css';
import FeeEstimator from './FeeEstimator';
import FAQAccordion from './FAQAccordion';
import { getSiteSettings } from '@/lib/sanity';
import { STUDIO } from '@/lib/siteContent';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Fees & Engagement',
  description: 'Transparent, COA-compliant architect fees for residential, commercial, and interior projects in Mumbai. Use the estimator for an indicative range.',
  keywords: ['architect fees Mumbai', 'architecture fee structure India', 'COA fee schedule', 'architect cost Mumbai', 'Team Design fees'],
  alternates: { canonical: 'https://teamdesignarchitects.com/fees' },
  openGraph: {
    title: 'Fees & Engagement — Team Design Architects',
    description: 'Transparent, phase-linked fee structures for every project type. COA-compliant. No surprises.',
    url: 'https://teamdesignarchitects.com/fees',
    images: [{ url: 'https://teamdesignarchitects.com/studio-sketch.webp', width: 1200, height: 800, alt: 'Team Design Architects — Fees & Engagement' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fees & Engagement — Team Design Architects',
    description: 'Transparent, phase-linked architect fees. COA-compliant. No surprises.',
    images: ['https://teamdesignarchitects.com/studio-sketch.webp'],
  },
};

const PAYMENT_STAGES = [
  {
    step: '01',
    title: 'Letter of Appointment',
    pct: '10%',
    desc: 'On signing the Letter of Appointment. Confirms engagement and activates the studio.',
  },
  {
    step: '02',
    title: 'Concept Approval',
    pct: '20%',
    desc: 'On client sign-off of the concept design direction. Unlocks design development phase.',
  },
  {
    step: '03',
    title: 'Design Development',
    pct: '25%',
    desc: 'On approval of developed design drawings. Activates full technical documentation.',
  },
  {
    step: '04',
    title: 'Technical Documentation',
    pct: '25%',
    desc: 'On completion of construction drawings and BOQ. GFC drawings released after 70% pre-construction fees cleared.',
  },
  {
    step: '05',
    title: 'Site Supervision',
    pct: '10%',
    desc: 'On commencement of construction works on site. Covers all supervision visits and coordination.',
  },
  {
    step: '06',
    title: 'Project Completion',
    pct: '10%',
    desc: 'On practical completion and handover. NOC issued only after all outstanding fees are fully cleared.',
  },
];

export default async function FeesPage() {
  const settings = await getSiteSettings();
  const whatsapp = settings?.whatsapp ?? STUDIO.whatsappNumber;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'How reliable is the fee estimate on this page?',
                acceptedAnswer: { '@type': 'Answer', text: 'The estimator gives you a directional range based on current Mumbai market construction benchmarks — it\'s a starting point, not a commitment. Your actual fee depends on the confirmed scope, site conditions, and project complexity. The figure you will actually pay is agreed in a signed Letter of Appointment before any work begins.' },
              },
              {
                '@type': 'Question',
                name: 'I\'ve never hired an architect before. What does working with one actually look like?',
                acceptedAnswer: { '@type': 'Answer', text: 'It starts with a free conversation — no preparation needed, no commitment required. We listen to what you want to build, what matters to you, and what you\'re working with. From there, the project moves through five structured phases — Discovery, Concept Design, Design Development, Technical Documentation, and Site Supervision — each with clear deliverables and your sign-off before we proceed.' },
              },
              {
                '@type': 'Question',
                name: 'What\'s the difference between the architectural fee and the construction cost?',
                acceptedAnswer: { '@type': 'Answer', text: 'The architectural fee is what you pay us — for design, drawings, coordination, and site supervision. The construction cost is what you pay the contractor who actually builds. These are entirely separate figures going to different parties. Our fee is calculated as a percentage of the construction cost.' },
              },
              {
                '@type': 'Question',
                name: 'How long does a project take from first meeting to completion?',
                acceptedAnswer: { '@type': 'Answer', text: 'Design and documentation typically takes 4–8 months. Construction varies widely — a residential interior might take 3–4 months; a new bungalow, 12–18 months. We give you a realistic timeline at the start of the project, not an optimistic one.' },
              },
              {
                '@type': 'Question',
                name: 'Can I hire you for just the design, and manage the construction myself?',
                acceptedAnswer: { '@type': 'Answer', text: 'No. We only take on projects we can see through to completion. A building that is designed by one party and supervised by another almost always suffers. We stay on the project until handover.' },
              },
              {
                '@type': 'Question',
                name: 'What happens if I want to make changes after the design is approved?',
                acceptedAnswer: { '@type': 'Answer', text: 'Two consolidated revision rounds are included in each phase. Changes requested after client sign-off are treated as new work and billed at day rates. We ask the right questions upfront so sign-offs mean something.' },
              },
              {
                '@type': 'Question',
                name: 'Do you work on projects outside Mumbai?',
                acceptedAnswer: { '@type': 'Answer', text: 'Yes. We have completed projects from Srinagar to Thrissur — hillside residences in Kashmir, coastal homes in Kerala, institutional buildings across Maharashtra. Distance has never been a constraint when the project is right.' },
              },
              {
                '@type': 'Question',
                name: 'Is GST included in the figures shown, and how does payment work?',
                acceptedAnswer: { '@type': 'Answer', text: 'All figures on this page exclude GST. GST at 18% applies to all professional fees and is invoiced separately with full documentation. Payment is structured in six stages, each linked to a completed and approved milestone.' },
              },
            ],
          }),
        }}
      />

      {/* ─── Hero ─────────────────────────────────────────────────────────── */}
      <div className={styles.pageHero}>
        <div className={styles.heroInner}>
          <span className={styles.heroLabel}>Fees &amp; Engagement</span>
          <h1 className={styles.heroTitle}>
            Fees that reflect<br />
            the work.{' '}
            <em className={styles.heroItalic}>Fully.</em>
          </h1>
          <p className={styles.heroSub}>
            Architecture is a sustained engagement — not a transaction. Our fee structure is transparent, COA-compliant, and designed to align our interests with yours from the first conversation to the day you take occupation.
          </p>
        </div>
      </div>

      {/* ─── Fee Estimator ───────────────────────────────────────────────── */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>Fee Estimator</span>
          <span className={styles.sectionRule} />
        </div>
        <h2 className={styles.sectionTitle}>
          Get an indicative{' '}
          <em className={styles.titleItalic}>fee range.</em>
        </h2>
        <p className={styles.sectionSub}>
          Answer two questions and get a ballpark in under a minute. Most people come here with no idea what to expect — that&apos;s exactly what this is for.
        </p>
        <FeeEstimator />
      </section>

      {/* ─── Payment Schedule ────────────────────────────────────────────── */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>Payment Schedule</span>
          <span className={styles.sectionRule} />
        </div>
        <h2 className={styles.sectionTitle}>
          Staged payments,{' '}
          <em className={styles.titleItalic}>phase by phase.</em>
        </h2>
        <p className={styles.sectionSub}>
          You never pay for work that hasn&apos;t been done. Each payment is linked to a completed, approved deliverable — so our incentives are always aligned with yours.
        </p>

        <div className={styles.stairsWrap}>
          {PAYMENT_STAGES.map((stage, i) => (
            <div
              key={stage.step}
              className={styles.stairStep}
              style={{ marginLeft: `${i * 68}px` }}
            >
              <span className={styles.stairNum}>{stage.step}</span>
              <h4 className={styles.stairTitle}>{stage.title}</h4>
              <p className={styles.stairDesc}>{stage.desc}</p>
              <span className={styles.stairPct}>{stage.pct}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FAQ ─────────────────────────────────────────────────────────── */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>Common Questions</span>
          <span className={styles.sectionRule} />
        </div>
        <h2 className={styles.sectionTitle}>
          Things people<br />
          <em className={styles.titleItalic}>ask us.</em>
        </h2>
        <FAQAccordion />
      </section>

      {/* ─── CTA ─────────────────────────────────────────────────────────── */}
      <section className={styles.cta}>
        <div className={styles.ctaInner}>
          <span className={styles.ctaLabel}>Ready to discuss your project?</span>
          <h2 className={styles.ctaTitle}>Start with a conversation.</h2>
          <p className={styles.ctaText}>
            The first meeting is free and commits you to nothing. We&apos;ll listen to your brief, give you an honest assessment, and tell you what a proper engagement would look like.
          </p>
          <div className={styles.ctaLinks}>
            <Link href="/contact" className={styles.ctaPrimary}>Get in Touch →</Link>
            <a
              href={`https://wa.me/${whatsapp}?text=${encodeURIComponent("Hi, I'd like to discuss a project and understand your fees.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaWhatsApp}
            >
              WhatsApp Studio →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
