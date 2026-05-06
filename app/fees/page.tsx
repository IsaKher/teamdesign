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

const ADD_ONS = [
  {
    category: 'Visualisation',
    title: 'Photorealistic 3D Renders',
    price: '₹15,000 / view',
    desc: 'Exterior or interior. One revision round per view included. Additional revisions billed separately.',
  },
  {
    category: 'Visualisation',
    title: 'Cinematic 3D Walkthrough',
    price: '₹10,000 / 30 sec',
    desc: 'Animated architectural walkthrough video. Custom assets, lighting & post-production included.',
  },
  {
    category: 'Documentation',
    title: 'Bill of Quantities (BOQ)',
    price: 'Project-specific',
    desc: 'Detailed material scheduling for rigorous contractor tendering and accurate budget control.',
  },
  {
    category: 'Compliance',
    title: 'Vastu Integration',
    price: 'Day rate applicable',
    desc: 'Requires all parameters in writing before concept begins. Post-approval changes trigger redesign fee.',
  },
];

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
                name: 'Is the first meeting free?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. The initial consultation carries no fee and no commitment. We listen to your project, ask the right questions, and tell you honestly whether and how we can help. If we\'re not the right fit, we\'ll say so.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can I hire you for just one phase — concept design only?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'No. We don\'t offer concept-only or partial engagements. We take on projects we can see through to completion. This protects the integrity of the design and ensures the building that gets built is the one that was designed.',
                },
              },
              {
                '@type': 'Question',
                name: 'What happens if I want to change the design after it\'s been approved?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Two consolidated revision rounds are included per phase. Changes requested after client sign-off — including scope changes, programme changes, or reversals of approved decisions — are treated as new work and billed at day rates.',
                },
              },
              {
                '@type': 'Question',
                name: 'Do fees increase if the project budget grows?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. Fees are a percentage of the actual construction cost, so they scale with the scope of works. This alignment is intentional — if the project grows, so does our workload. If it shrinks, so does our fee.',
                },
              },
              {
                '@type': 'Question',
                name: 'What exactly is included in site supervision?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Regular site visits at critical construction stages, review of contractor shop drawings, issuing clarifications and variation orders, snagging and defects documentation, and as-built drawings at handover. Government liaisoning — physical attendance at MCGM, MHADA, or other authorities — is a separate, segregated service.',
                },
              },
              {
                '@type': 'Question',
                name: 'Are your fees negotiable?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'We meet or exceed the COA mandatory minimums on every project — these are non-negotiable by law. Our rates reflect 25+ years of practice, a full in-house team, and a commitment to seeing every project through to completion. We compete on quality and transparency, not on undercutting.',
                },
              },
              {
                '@type': 'Question',
                name: 'When is GST charged and how is it invoiced?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'GST at 18% is applicable on all professional fees and documentation charges under Indian tax law. It is always invoiced separately with full GST-compliant documentation. Every figure on this page is exclusive of GST.',
                },
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
          Adjust for built-up area and project type. Figures include COA documentation charges and GST — based on current Mumbai construction cost benchmarks.
        </p>
        <FeeEstimator />
      </section>

      {/* ─── Premium Add-ons ─────────────────────────────────────────────── */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>Premium Add-on Services</span>
          <span className={styles.sectionRule} />
        </div>
        <h2 className={styles.sectionTitle}>
          Optional{' '}
          <em className={styles.titleItalic}>add-on services.</em>
        </h2>
        <p className={styles.sectionSub}>
          The following are billed separately. Requesting them without prior written agreement does not constitute an entitlement.
        </p>
        <div className={styles.addOnGrid}>
          {ADD_ONS.map((item) => (
            <div key={item.title} className={styles.addOnCard}>
              <span className={styles.addOnCategory}>{item.category}</span>
              <h3 className={styles.addOnTitle}>{item.title}</h3>
              <div className={styles.addOnPrice}>{item.price}</div>
              <p className={styles.addOnDesc}>{item.desc}</p>
            </div>
          ))}
        </div>
        <p className={styles.addOnDisclaimer}>
          Government liaisoning — physical attendance at MCGM, MHADA, or other authorities — is a segregated service, never assumed within the architectural fee. The client bears sole responsibility for all statutory fees and approval timelines.
        </p>
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
