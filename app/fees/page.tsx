export const revalidate = 3600;

import { Fragment } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.css';
import FadeIn from '@/components/FadeIn';
import { getSiteSettings } from '@/lib/sanity';
import { STUDIO } from '@/lib/siteContent';
import FeesEstimator from './FeesEstimator';
import FeesFaq from './FeesFaq';

export const metadata: Metadata = {
  title: 'Fees & Engagement',
  description:
    'Transparent, COA-compliant architectural fees for residential, commercial, institutional and interior projects in Mumbai. Fee estimator, payment schedule, and full engagement terms.',
  keywords: [
    'architect fees Mumbai',
    'architecture fee structure India',
    'COA fee schedule architect',
    'architectural design cost Mumbai',
    'Team Design fees',
  ],
  alternates: { canonical: 'https://teamdesign.in/fees' },
  openGraph: {
    title: 'Fees & Engagement — Team Design Architects',
    description:
      'Transparent architectural fees, COA-compliant. Residential 8–10%, Interiors 10–12%, Commercial & Institutional 6–8%. Full schedule, estimator and engagement terms.',
    url: 'https://teamdesign.in/fees',
    images: [
      {
        url: 'https://teamdesign.in/hero-building.webp',
        width: 1200,
        height: 800,
        alt: 'Team Design Architects — Fees & Engagement',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fees & Engagement — Team Design Architects',
    description:
      'COA-compliant architectural fees in Mumbai. Transparent schedule, estimator and full engagement terms.',
    images: ['https://teamdesign.in/hero-building.webp'],
  },
};

const STRIP_ITEMS = [
  { num: '01', text: 'COA-compliant minimums — we meet or exceed the mandatory scale in every engagement.' },
  { num: '02', text: "Phase-linked payments — you pay for what's done before we proceed to the next stage." },
  { num: '03', text: 'GFC drawings released only after 70% of pre-construction fees are bank-confirmed.' },
  { num: '04', text: 'NOC issued only after all outstanding fees and dues are fully cleared.' },
  { num: '05', text: 'GST at 18% is always additional. Every figure on this page is exclusive.' },
  { num: '06', text: 'No concept-only engagements. We see every project through to site completion.' },
];

const FEE_CARDS = [
  {
    tag: 'Residential Architecture',
    type: 'Independent Homes & Bungalows',
    desc: 'Private residences, villas, duplex homes, farmhouses.',
    pct: '8–10',
    unit: 'of construction cost',
    items: [
      'Discovery, concept, design development',
      'Complete working drawings + specifications',
      '2 consolidated revision rounds per phase',
      'Statutory submission drawings (MCGM / MHADA)',
      '3D massing model & reference visualisations',
      'Site supervision throughout construction',
      'Snagging, handover & as-built drawings',
    ],
    coa: 'COA mandatory minimum: 7.5% · Team Design minimum: 8%',
  },
  {
    tag: 'Interior Architecture',
    type: 'Interiors, Fit-Outs & Refurbishments',
    desc: 'Residential interiors, retail, hospitality, offices, religious spaces.',
    pct: '10–12',
    unit: 'of cost of interior works',
    items: [
      'Space planning & concept design',
      'Material palette & finish specifications',
      'Detailed joinery, ceiling & flooring drawings',
      '3D reference renders (photorealistic is separate)',
      'Procurement advisory & FF&E coordination',
      'Site supervision of all interior works',
      'Snagging, handover & as-built record',
    ],
    coa: 'COA mandatory minimum: 7.5% · Billed on interior works cost only — independent of structural shell fee',
  },
  {
    tag: 'Commercial Architecture',
    type: 'Offices, Retail, Banking & Hospitality',
    desc: 'Corporate campuses, banking fit-outs, retail, mixed-use developments.',
    pct: '6–8',
    unit: 'of construction cost',
    items: [
      'Site analysis & brief development',
      'Complete architectural design',
      'Corporate design guidelines (if applicable)',
      'Full construction documentation',
      'Regulatory compliance & approvals',
      'Contractor coordination & site supervision',
    ],
    coa: 'COA mandatory minimum: 5% · Rate reflects complexity of commercial engagements',
  },
  {
    tag: 'Institutional Architecture',
    type: 'Education, Healthcare & Civic',
    desc: 'Schools, colleges, campus extensions, healthcare facilities, civic buildings.',
    pct: '6–8',
    unit: 'of construction cost',
    items: [
      'Masterplan & campus integration study',
      'Accessibility & statutory compliance',
      'Full architectural documentation',
      'Sustainable design support (IGBC / GRIHA)',
      'Full consultant coordination',
      'Site supervision',
    ],
    coa: 'COA mandatory minimum: 5% · Identical buildings on same campus: 50% reduction',
  },
];

const CHARGES = [
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

const ADDONS = [
  {
    tag: 'Visualisation',
    name: 'Photorealistic 3D Renders',
    price: '₹15,000 / view',
    desc: 'Exterior or interior. One revision round per view included. Additional revisions billed separately.',
  },
  {
    tag: 'Visualisation',
    name: 'Cinematic 3D Walkthrough',
    price: '₹10,000 / 30 sec',
    desc: 'Animated architectural walkthrough video. Custom assets, lighting & post-production included.',
  },
  {
    tag: 'Documentation',
    name: 'Bill of Quantities (BOQ)',
    price: 'Project-specific',
    desc: 'Detailed material scheduling for rigorous contractor tendering and accurate budget control.',
  },
  {
    tag: 'Compliance',
    name: 'Vastu Integration',
    price: 'Day rate applicable',
    desc: 'Requires all parameters in writing before concept begins. Post-approval changes trigger redesign fee.',
  },
];

const STAGES = [
  {
    num: '01',
    name: 'Design Retainer',
    trigger: 'Due at signing of Letter of Appointment, before any work begins',
    pct: '5–10%',
    cum: '5–10%',
  },
  {
    num: '02',
    name: 'Concept Design',
    trigger: 'Due on presentation and client approval of concept scheme',
    pct: '10–15%',
    cum: '~25%',
  },
  {
    num: '03',
    name: 'Preliminary Drawings',
    trigger: 'Due on submission of preliminary drawings and massing model',
    pct: '15%',
    cum: '~40%',
  },
  {
    num: '04',
    name: 'Statutory Submission',
    trigger: 'Due on submission to municipal authority — not contingent on approval',
    pct: '10%',
    cum: '~50%',
  },
  {
    num: '05',
    name: 'GFC / Working Drawings',
    trigger: 'Native CAD files released only after this payment is bank-confirmed',
    pct: '20%',
    cum: '70%',
  },
  {
    num: '06',
    name: 'Site Execution',
    trigger: 'Pro-rated: 5% at plinth · 5% at roof slab · balance monthly',
    pct: '25%',
    cum: '95%',
  },
  {
    num: '07',
    name: 'Completion & Handover',
    trigger: 'Due on issue of Virtual Completion Certificate and as-built drawings',
    pct: '5%',
    cum: '100%',
  },
];

const INCLUDED = [
  'Site visit and site analysis at commencement',
  'Client brief and full space programme development',
  'Concept design — two consolidated revision rounds',
  'Design development and interior material palette',
  'Basic 3D massing models for spatial comprehension',
  'Complete construction drawings across all architectural disciplines',
  'Material, finish, door, window & joinery schedules',
  'Statutory approval and planning submission drawings',
  'Coordination with structural and MEP consultants',
  'Regular site inspections and supervision visits',
  'Shop drawing review and variation order management',
  'Snagging, defect review, and formal handover',
  'As-built record drawings issued at project close',
];

const EXCLUDED = [
  'Structural engineer fees — contracted and paid separately',
  'MEP (mechanical, electrical, plumbing) consultant fees',
  'Landscape architect fees',
  'Statutory application and municipal authority fees',
  'Physical government liaisoning and approval follow-up',
  'Photorealistic 3D renders and animated walkthroughs',
  'Bill of Quantities and detailed cost estimation',
  'Vastu Shastra consultation and integration',
  'Physical models, large-format prints & presentation boards',
  'Revisions beyond two rounds per phase (day rate applies)',
  'Redesigns triggered by change of brief after sign-off',
  'Outstation travel and accommodation at actuals',
  'Contractor bills verification (+1% of construction cost)',
  'GST at 18% on all professional fees',
];

const POLICIES = [
  {
    title: 'Intellectual Property',
    body: 'All drawings, models, and design documents are the IP of Team Design until all fees are settled. Protected under Sections 13 and 57 of the Indian Copyright Act. On full settlement, the client receives a non-exclusive, non-transferable licence to construct on the specified site only. Reuse on another plot requires a separate licensing fee.',
    warn: false,
  },
  {
    title: 'GFC Drawing Gate',
    body: "During review phases, all drawings are issued as low-resolution, watermarked PDFs: 'Not For Construction.' Native CAD files and final GFC sets are released only after 70% of the estimated total fee is bank-confirmed. This is the firm's primary protection against clients who exit after receiving working drawings.",
    warn: false,
  },
  {
    title: 'NOC on Termination',
    body: 'Municipal authorities require a No Objection Certificate (NOC) from the original architect before a new firm can legally take over. The NOC is issued strictly upon full clearance of all outstanding fees, interest, and dues for completed stages. This prevents clients from replacing the architect without settling their obligations.',
    warn: true,
  },
  {
    title: 'Vastu Policy',
    body: 'Vastu compliance is not assumed. If required, all parameters must be declared in writing before concept design begins. External Vastu consultants must provide written sign-off at Concept Approval. Vastu-driven changes after floor plan sign-off constitute a change of brief and trigger a Redesign Fee at the standard day rate.',
    warn: false,
  },
  {
    title: 'Revision & Scope',
    body: 'Two consolidated revision rounds are included per phase. A round requires a single written set of comments. Piecemeal or sequential requests, and redesigns after phase sign-off, are billed at ₹15,000/day. No scope changes are valid without a written Change Order signed by both parties.',
    warn: false,
  },
  {
    title: 'Suspension & Termination',
    body: 'Suspension for 30+ days or invoice unpaid beyond 15 days allows immediate suspension of services. Resumption after 90 days requires fresh financial assessment and a remobilization fee. On termination: all phase fees due immediately + 20% kill fee on balance. Design retainer non-refundable in all cases.',
    warn: true,
  },
  {
    title: 'Late Payment',
    body: 'Invoices are raised the exact day a milestone is submitted. Invoices unpaid beyond 15 days attract compound interest at 2% per month. This is stated in the Letter of Appointment. Persistent non-payment constitutes breach of the commercial agreement and triggers service suspension.',
    warn: false,
  },
  {
    title: 'Liability Cap',
    body: "Team Design's aggregate liability is capped at the total professional fees received for the specific project. We bear no liability for construction defects arising from a contractor's unilateral deviation from GFC drawings. Structural liability rests with the licensed structural engineer of record.",
    warn: false,
  },
  {
    title: 'Letter of Appointment',
    body: 'No work commences without a signed Letter of Appointment confirming scope, fee basis, payment schedule, exclusions, and revision policy. Verbal agreements are not recognised. Governed by the Indian Contract Act, 1872.',
    warn: false,
  },
];

export default async function FeesPage() {
  const settings = await getSiteSettings();
  const whatsapp = settings?.whatsapp ?? STUDIO.whatsappNumber;
  void whatsapp; // available if needed later

  return (
    <>
      {/* ─── Hero ──────────────────────────────────────────────────────── */}
      <div className={styles.hero}>
        <FadeIn direction="up" delay={0.05}>
          <div className={styles.heroInner}>
            <span className={styles.heroLabel}>Fees &amp; Engagement</span>
            <h1 className={styles.heroTitle}>
              Fees that reflect<br />the work. <em>Fully.</em>
            </h1>
            <p className={styles.heroSub}>
              Architecture is a sustained engagement — not a transaction. Our fee structure is transparent,
              COA-compliant, and designed to align our interests with yours from the first conversation to
              the day you take occupation.
            </p>
          </div>
        </FadeIn>
      </div>

      {/* ─── Info strip ────────────────────────────────────────────────── */}
      <div className={styles.strip}>
        {STRIP_ITEMS.map(item => (
          <div key={item.num} className={styles.stripItem}>
            <span className={styles.stripNum}>{item.num}</span>
            <span className={styles.stripText}>{item.text}</span>
          </div>
        ))}
      </div>

      {/* ─── Estimator ─────────────────────────────────────────────────── */}
      <div className={styles.estimatorSection}>
        <FadeIn direction="up" delay={0.05}>
          <p className={styles.sectionLabel}>Fee Estimator</p>
          <h2 className={styles.sectionTitle}>
            Get an indicative <em>fee range.</em>
          </h2>
          <p className={styles.sectionIntro}>
            Adjust for built-up area and project type. Figures include COA documentation charges and GST —
            based on current Mumbai construction cost benchmarks.
          </p>
        </FadeIn>
      </div>
      <div className={styles.estimatorOuter}>
        <FeesEstimator />
      </div>

      {/* ─── Fee structure ─────────────────────────────────────────────── */}
      <div className={styles.section}>
        <FadeIn direction="up" delay={0.05}>
          <p className={styles.sectionLabel}>Fee Structure</p>
          <h2 className={styles.sectionTitle}>
            Professional fees <em>by service type</em>
          </h2>
          <p className={styles.sectionIntro}>
            All fees are a percentage of the actual construction cost — the total value of works on which we
            render professional services, excluding land. COA mandatory minimums are noted on each card.
          </p>
        </FadeIn>

        <FadeIn direction="up" delay={0.08}>
          <div className={styles.feeGrid}>
            {FEE_CARDS.map((card, i) => (
              <div key={i} className={styles.feeCard}>
                <span className={styles.feeCardTag}>{card.tag}</span>
                <p className={styles.feeCardType}>{card.type}</p>
                <p className={styles.feeCardDesc}>{card.desc}</p>
                <div className={styles.feeCardNum}>
                  <sup>%</sup>{card.pct}
                </div>
                <p className={styles.feeCardUnit}>{card.unit}</p>
                <ul className={styles.feeCardList}>
                  {card.items.map((item, j) => <li key={j}>{item}</li>)}
                </ul>
                <p className={styles.feeCardCoa}>{card.coa}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn direction="up" delay={0.05}>
          <div className={styles.chargesRow}>
            {CHARGES.map((c, i) => (
              <div key={i} className={styles.chargeItem}>
                <p className={styles.chargeLabel}>{c.label}</p>
                <p className={styles.chargeValue}>{c.value}</p>
                <p className={styles.chargeDesc}>{c.desc}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn direction="up" delay={0.05}>
          <div className={styles.addonsHeader}>
            <p className={styles.addonsHeaderLabel}>Premium Add-On Services — Not included in base fee</p>
            <p className={styles.addonsHeaderNote}>
              The following are billed separately. Requesting them without prior written agreement does not
              constitute an entitlement.
            </p>
          </div>
          <div className={styles.addonsGrid}>
            {ADDONS.map((a, i) => (
              <div key={i} className={styles.addonItem}>
                <p className={styles.addonTag}>{a.tag}</p>
                <p className={styles.addonName}>{a.name}</p>
                <p className={styles.addonPrice}>{a.price}</p>
                <p className={styles.addonDesc}>{a.desc}</p>
              </div>
            ))}
          </div>
          <p className={styles.addonsNote}>
            Government liaisoning — physical attendance at MCGM, MHADA, or other authorities — is a
            segregated service, never assumed within the architectural fee. The client bears sole
            responsibility for all statutory fees and approval timelines.
          </p>
        </FadeIn>
      </div>

      {/* ─── Payment schedule ──────────────────────────────────────────── */}
      <div className={styles.section}>
        <FadeIn direction="up" delay={0.05}>
          <p className={styles.sectionLabel}>Payment Schedule</p>
          <h2 className={styles.sectionTitle}>
            Staged payments, <em>phase by phase.</em>
          </h2>
          <p className={styles.sectionIntro}>
            Every payment is linked to a deliverable — invoiced on the exact day a milestone is submitted.
            Work on the next phase begins only after the invoice is fully settled.
          </p>
          <div className={styles.schedNote}>
            A non-refundable design retainer of 5–10% of the estimated total fee is payable at
            appointment — before any work commences. This covers initial site analysis and mobilisation.
            Non-refundable under all circumstances.
          </div>
        </FadeIn>

        <FadeIn direction="up" delay={0.1}>
          <div className={styles.timeline}>
            {STAGES.map((stage, i) => (
              <Fragment key={stage.num}>
                <div className={styles.timelineStage}>
                  <div className={styles.timelineNodeCol}>
                    <div className={styles.timelineDot} />
                    {i < STAGES.length - 1 && <div className={styles.timelineConnector} />}
                  </div>
                  <div className={styles.timelineBody}>
                    <span className={styles.timelineStageNum}>{stage.num}</span>
                    <p className={styles.timelineStageName}>{stage.name}</p>
                    <p className={styles.timelineStageTrigger}>{stage.trigger}</p>
                    <p className={styles.timelineStageCum}>Cumulative: {stage.cum}</p>
                  </div>
                  <span className={styles.timelinePct}>{stage.pct}</span>
                </div>

                {/* GFC gate marker appears after stage 05 */}
                {i === 4 && (
                  <div className={styles.gfcGateMarker}>
                    <span className={styles.gfcGateMarkerLabel}>
                      GFC Drawing Gate — 70% Threshold
                    </span>
                    <p className={styles.gfcGateMarkerText}>
                      Native CAD files and final un-watermarked Good for Construction drawings are released
                      only after 70% of the estimated total fee is confirmed in our bank account.
                      Non-negotiable.
                    </p>
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        </FadeIn>
      </div>

      {/* ─── Included / Excluded ───────────────────────────────────────── */}
      <div className={styles.section} style={{ paddingBottom: 0, borderBottom: 'none' }}>
        <FadeIn direction="up" delay={0.05}>
          <p className={styles.sectionLabel}>Scope of Services</p>
          <h2 className={styles.sectionTitle}>
            What&apos;s included — <em>and what isn&apos;t.</em>
          </h2>
        </FadeIn>
      </div>
      <FadeIn direction="up" delay={0.05}>
        <div className={styles.ieGrid} style={{ borderBottom: '1px solid var(--color-rule)' }}>
          <div className={`${styles.iePanel} ${styles.ieIncluded}`}>
            <div className={styles.iePanelInner}>
              <p className={styles.iePanelHeader}>✓&nbsp;&nbsp;Included in the professional fee</p>
              <ul className={styles.ieList}>
                {INCLUDED.map((item, i) => (
                  <li key={i} className={styles.ieItem}>
                    <span className={styles.ieMark}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className={`${styles.iePanel} ${styles.ieExcluded}`}>
            <div className={styles.iePanelInner}>
              <p className={styles.iePanelHeader}>—&nbsp;&nbsp;Excluded / billed separately</p>
              <ul className={styles.ieList}>
                {EXCLUDED.map((item, i) => (
                  <li key={i} className={styles.ieItem}>
                    <span className={styles.ieMark}>—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* ─── Policies ──────────────────────────────────────────────────── */}
      <div className={styles.section}>
        <FadeIn direction="up" delay={0.05}>
          <p className={styles.sectionLabel}>Commercial Policies</p>
          <h2 className={styles.sectionTitle}>
            How we protect <em>both parties.</em>
          </h2>
        </FadeIn>
        <FadeIn direction="up" delay={0.08}>
          <div className={styles.policiesList}>
            {/* Left column: policies 01–05 */}
            <div className={styles.policiesCol}>
              {POLICIES.slice(0, 5).map((p, i) => (
                <div
                  key={i}
                  className={`${styles.policyItem}${p.warn ? ` ${styles.policyItemWarn}` : ''}`}
                >
                  <span className={styles.policyItemNum}>0{i + 1}</span>
                  <div>
                    <p className={styles.policyItemTitle}>{p.title}</p>
                    <p className={styles.policyItemBody}>{p.body}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right column: policies 06–09 */}
            <div className={styles.policiesCol}>
              {POLICIES.slice(5).map((p, i) => (
                <div
                  key={i}
                  className={`${styles.policyItem}${p.warn ? ` ${styles.policyItemWarn}` : ''}`}
                >
                  <span className={styles.policyItemNum}>0{i + 6}</span>
                  <div>
                    <p className={styles.policyItemTitle}>{p.title}</p>
                    <p className={styles.policyItemBody}>{p.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>

      {/* ─── FAQ ───────────────────────────────────────────────────────── */}
      <div className={styles.section}>
        <FadeIn direction="up" delay={0.05}>
          <p className={styles.sectionLabel}>Common Questions</p>
          <h2 className={styles.sectionTitle}>
            Fees &amp; policies, <em>answered plainly.</em>
          </h2>
        </FadeIn>
        <FeesFaq />
      </div>

      {/* ─── CTA ───────────────────────────────────────────────────────── */}
      <div className={styles.cta}>
        <div className={styles.ctaInner}>
          <span className={styles.ctaLabel}>Ready to begin</span>
          <h2 className={styles.ctaTitle}>
            The first conversation<br /><em>costs nothing.</em>
          </h2>
          <p className={styles.ctaSub}>
            Tell us about your project. We&apos;ll tell you honestly what it will take — and what it will cost.
          </p>
          <div className={styles.ctaButtons}>
            <Link href="/contact" className={styles.ctaPrimary}>
              Discuss a Project
            </Link>
          </div>
        </div>
      </div>

      {/* ─── Legal disclaimer ──────────────────────────────────────────── */}
      <div className={styles.disclaimer}>
        <p className={styles.disclaimerText}>
          All fees are indicative ranges based on the Council of Architecture Scale of Charges (Architects
          (Professional Conduct) Regulations, 1989) and Team Design&apos;s standard conditions of
          engagement. Actual fees are confirmed in writing in the Letter of Appointment for each project.
          All figures are exclusive of GST at 18%. Documentation and communication charges of 10% of the
          professional fee are additional and mandatory in all engagements. Reimbursable expenses charged at
          actuals. GFC drawings released only upon 70% fee realisation confirmed in bank. NOC issued only
          upon full settlement of all outstanding dues. Vastu compliance, 3D visualisation, BOQ, and
          government liaisoning are not included in the base fee and are billed as separate engagements.
          Late payment interest at 2% per month compounding beyond 15 days. Maximum aggregate liability
          capped at total professional fees received for the project. Governed by the Indian Contract Act,
          1872, and the Architects (Professional Conduct) Regulations, 1989.
        </p>
      </div>
    </>
  );
}
