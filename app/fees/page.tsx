import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.css';
import FeeEstimator from './FeeEstimator';
import { getSiteSettings } from '@/lib/sanity';
import { STUDIO } from '@/lib/siteContent';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Fees & Engagement',
  description: 'Transparent, COA-compliant fee structures for residential, commercial, institutional, and interior architecture. Use our fee estimator to get an indicative range.',
  keywords: ['architect fees Mumbai', 'architecture fee structure India', 'COA fee schedule', 'architect cost Mumbai', 'Team Design fees'],
  alternates: { canonical: 'https://teamdesign.in/fees' },
  openGraph: {
    title: 'Fees & Engagement — Team Design Architects',
    description: 'Transparent, phase-linked fee structures for every project type. COA-compliant. No surprises.',
    url: 'https://teamdesign.in/fees',
    images: [{ url: 'https://teamdesign.in/studio-sketch.webp', width: 1200, height: 800, alt: 'Team Design Architects — Fees & Engagement' }],
  },
};

const SERVICE_CARDS = [
  {
    category: 'Residential Architecture',
    title: 'Independent Homes & Bungalows',
    subtitle: 'Private residences, villas, duplex homes, farmhouses.',
    pct: '8–10',
    costBase: 'of construction cost',
    items: [
      'Discovery, concept, design development',
      'Complete working drawings + specifications',
      '2 consolidated revision rounds per phase',
      'Statutory submission drawings (MCGM / MHADA)',
      '3D massing model & reference visualisations',
      'Site supervision throughout construction',
      'Snagging, handover & as-built drawings',
    ],
    note: 'COA mandatory minimum: 7.5% · Team Design minimum: 8%',
  },
  {
    category: 'Interior Architecture',
    title: 'Interiors, Fit-Outs & Refurbishments',
    subtitle: 'Residential interiors, retail, hospitality, offices, religious spaces.',
    pct: '10–12',
    costBase: 'of cost of interior works',
    items: [
      'Space planning & concept design',
      'Material palette & finish specifications',
      'Detailed joinery, ceiling & flooring drawings',
      '3D reference renders (photorealistic is separate)',
      'Procurement advisory & FF&E coordination',
      'Site supervision of all interior works',
      'Snagging, handover & as-built record',
    ],
    note: 'COA mandatory minimum: 7.5% · Billed on interior works cost only — independent of structural shell fee',
  },
  {
    category: 'Commercial Architecture',
    title: 'Offices, Retail, Banking & Hospitality',
    subtitle: 'Corporate campuses, banking fit-outs, retail, mixed-use developments.',
    pct: '6–8',
    costBase: 'of construction cost',
    items: [
      'Site analysis & brief development',
      'Complete architectural design',
      'Corporate design guidelines (if applicable)',
      'Full construction documentation',
      'Regulatory compliance & approvals',
      'Contractor coordination & site supervision',
    ],
    note: 'COA mandatory minimum: 5% · Rate reflects complexity of commercial engagements',
  },
  {
    category: 'Institutional Architecture',
    title: 'Education, Healthcare & Civic',
    subtitle: 'Schools, colleges, campus extensions, healthcare facilities, civic buildings.',
    pct: '6–8',
    costBase: 'of construction cost',
    items: [
      'Masterplan & campus integration study',
      'Accessibility & statutory compliance',
      'Full architectural documentation',
      'Sustainable design support (IGBC / GRIHA)',
      'Full consultant coordination',
      'Site supervision',
    ],
    note: 'COA mandatory minimum: 5% · Identical buildings on same campus: 50% reduction',
  },
];

const ADDITIONAL_CHARGES = [
  {
    label: 'Documentation & Communication',
    value: '+10% of fee',
    desc: 'Mandatory in all engagements per COA regulations. Covers drawing prints, courier, coordination correspondence, and full project records throughout.',
  },
  {
    label: 'GST',
    value: '+18% on fee',
    desc: 'Applicable on all professional fees and documentation charges per Indian tax law. Invoiced with full GST-compliant documentation and breakdown.',
  },
  {
    label: 'Reimbursables',
    value: 'At actuals',
    desc: 'Travel, accommodation, physical models, and authority submission fees at actual cost with receipts. Advisory: ₹15,000/day outstation · ₹5,000/day local.',
  },
];

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

const INCLUDED_ITEMS = [
  'All design team meetings and client presentations',
  'Site visits at all critical construction stages',
  'Coordination with structural and MEP consultants',
  'Regulatory drawings for statutory submissions',
  'Material and finish schedules',
  'Contractor tender document support',
  'Shop drawing review',
  'Snagging list and defects documentation',
  'As-built drawings at project completion',
  'Full project file and correspondence record',
];

const NOT_INCLUDED = [
  'Structural, MEP, and specialist consultant fees',
  'Government statutory fees and stamp duty',
  'Photorealistic renders (separate add-on)',
  '3D walkthroughs (separate add-on)',
  'Physical models',
  'Government liaisoning attendance',
  'Post-occupation advisory services',
];

const PROTECTIONS_CLIENT = [
  { text: 'Phase-linked payments — you pay only for work completed before proceeding to the next stage' },
  { text: 'GFC drawings released only after 70% of pre-construction fees are bank-confirmed' },
  { text: 'Written confirmation required before any scope change is executed' },
  { text: 'All deliverables documented and dated with full project records maintained throughout' },
  { text: 'COA-compliant fee minimums — we meet or exceed the mandatory scale in every engagement' },
];

const PROTECTIONS_PRACTICE = [
  { text: 'NOC issued only after all outstanding fees and dues are fully cleared' },
  { text: 'No concept-only engagements — we see every project through to site completion' },
  { text: 'Post-approval design changes triggered by the client are billed at day rates' },
  { text: 'Government liaisoning is a segregated service — never assumed within the architectural fee' },
  { text: 'GST at 18% is always additional — every figure on this page is exclusive' },
];

export default async function FeesPage() {
  const settings = await getSiteSettings();
  const whatsapp = settings?.whatsapp ?? STUDIO.whatsappNumber;

  return (
    <>
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

      {/* ─── Professional Fees by Service Type ───────────────────────────── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          Professional fees{' '}
          <em className={styles.titleItalic}>by service type</em>
        </h2>
        <p className={styles.sectionSub}>
          All fees are a percentage of the actual construction cost — the total value of works on which we render professional services, excluding land. COA mandatory minimums are noted on each card.
        </p>

        <div className={styles.serviceGrid}>
          {SERVICE_CARDS.map((card) => (
            <div key={card.title} className={styles.serviceCard}>
              <span className={styles.cardCategory}>{card.category}</span>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardSubtitle}>{card.subtitle}</p>
              <div className={styles.cardPct}>
                <sup className={styles.pctSign}>%</sup>
                <span className={styles.pctRange}>{card.pct}</span>
              </div>
              <span className={styles.pctLabel}>{card.costBase}</span>
              <ul className={styles.cardList}>
                {card.items.map((item) => (
                  <li key={item} className={styles.cardItem}>
                    <span className={styles.cardDash}>—</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className={styles.cardFooter}>
                <span className={styles.cardNote}>{card.note}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Additional charges */}
        <div className={styles.chargesGrid}>
          {ADDITIONAL_CHARGES.map((c) => (
            <div key={c.label} className={styles.chargeCard}>
              <span className={styles.chargeLabel}>{c.label}</span>
              <div className={styles.chargeValue}>{c.value}</div>
              <p className={styles.chargeDesc}>{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Premium Add-ons ─────────────────────────────────────────────── */}
      <section className={styles.addOnSection}>
        <span className={styles.addOnBanner}>Premium add-on services — not included in base fee</span>
        <p className={styles.addOnIntro}>
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

      {/* ─── What's Included ─────────────────────────────────────────────── */}
      <section className={styles.includedSection}>
        <div className={styles.includedPanelLight}>
          <h3 className={styles.includedHeading}>
            In every<br />
            <em className={styles.includedItalic}>engagement.</em>
          </h3>
          <ol className={styles.includedList}>
            {INCLUDED_ITEMS.map((item, i) => (
              <li key={item} className={styles.includedItem}>
                <span className={styles.includedNum}>{String(i + 1).padStart(2, '0')}</span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className={styles.includedPanelDark}>
          <h3 className={styles.includedHeadingDark}>
            Never<br />
            <em className={styles.includedItalicDark}>assumed.</em>
          </h3>
          <ol className={styles.includedListDark}>
            {NOT_INCLUDED.map((item, i) => (
              <li key={item} className={styles.includedItemDark}>
                <span className={styles.includedNumDark}>{String(i + 1).padStart(2, '0')}</span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ─── How We Protect Both Parties ─────────────────────────────────── */}
      <section className={styles.protectSection}>
        <h2 className={styles.sectionTitle} style={{ paddingLeft: 'var(--margin-page)', paddingRight: 'var(--margin-page)' }}>
          How we protect<br />
          <em className={styles.titleItalic}>both parties.</em>
        </h2>
        <div className={styles.protectGrid}>
          <div className={styles.protectCol}>
            <span className={styles.protectColLabel}>For our clients</span>
            {PROTECTIONS_CLIENT.map((p) => (
              <div key={p.text} className={styles.protectItem}>
                <span className={styles.protectDash}>—</span>
                <p className={styles.protectText}>{p.text}</p>
              </div>
            ))}
          </div>
          <div className={styles.protectCol}>
            <span className={styles.protectColLabel}>For the practice</span>
            {PROTECTIONS_PRACTICE.map((p) => (
              <div key={p.text} className={styles.protectItem}>
                <span className={styles.protectDash}>—</span>
                <p className={styles.protectText}>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
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
