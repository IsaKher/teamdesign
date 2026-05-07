export const revalidate = 3600;

import Link from 'next/link';
import styles from './page.module.css';
import FadeIn from '@/components/FadeIn';
import { getSiteSettings } from '@/lib/sanity';
import { STUDIO } from '@/lib/siteContent';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How We Work',
  description: 'How Team Design takes a project from first meeting to handover — Discovery, Concept, Design Development, Technical Documentation, and Site Supervision.',
  keywords: ['architecture design process', 'how architects work', 'Team Design process', 'architecture project phases Mumbai'],
  alternates: { canonical: 'https://teamdesignarchitects.com/process' },
  openGraph: {
    title: 'How We Work — Team Design Architects',
    description: 'From first meeting to handover — the five phases of the Team Design process.',
    url: 'https://teamdesignarchitects.com/process',
    images: [{ url: 'https://teamdesignarchitects.com/studio-sketch.webp', width: 1200, height: 800, alt: 'Team Design — Architectural Process & Studio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How We Work — Team Design Architects',
    description: 'From first meeting to handover — the five phases of the Team Design process.',
    images: ['https://teamdesignarchitects.com/studio-sketch.webp'],
  },
};

const PHASES = [
  {
    number: '01',
    title: 'Discovery',
    subtitle: 'Understanding you, your site, and your ambition.',
    duration: '2 – 4 weeks',
    description:
      'Every project begins with listening. We spend time understanding who you are, how you live or work, what this building must accomplish, and what it must feel like. We visit the site, study its orientation, access, context, and constraints. We ask questions others don\'t — about light at different times of day, about how a family actually uses a kitchen, about what you loved and disliked about every space you\'ve ever occupied.',
    deliverables: [
      'Site analysis report',
      'Client brief document',
      'Preliminary space programme',
      'Project timeline & fee proposal',
    ],
    clientRole: [
      'Share site ownership documents and any existing surveys or drawings',
      'Describe how you currently live or work — what you love and what frustrates you',
      'Be available for a 2–3 hour site visit and initial briefing session',
    ],
  },
  {
    number: '02',
    title: 'Concept Design',
    subtitle: 'Finding the idea that will hold everything together.',
    duration: '4 – 6 weeks',
    description:
      'We explore multiple design directions, testing ideas against your brief, your budget, and the logic of the site. This is the most creative phase — where spatial diagrams become plans, where the relationship between inside and outside is resolved, where the character of the building first emerges. We present concepts as sketches, moodboards, and physical or digital models, and refine based on your response until the design direction is locked.',
    deliverables: [
      'Concept sketches & diagrams',
      'Moodboard & material references',
      'Preliminary floor plans & sections',
      'Outline cost estimate',
    ],
    clientRole: [
      'Attend two concept presentation sessions (in-studio or remote)',
      'Consolidate all feedback and return it within 7 days of each presentation',
      'Sign off on the chosen design direction before development begins',
    ],
  },
  {
    number: '03',
    title: 'Design Development',
    subtitle: 'Turning a concept into a building you can build.',
    duration: '6 – 10 weeks',
    description:
      'Once the concept is approved, we develop it into a complete design. Every room, every detail, every material is resolved. We coordinate with structural and MEP engineers, ensure the design meets regulatory requirements, and prepare detailed drawings that are precise enough to get an accurate contractor quote. We refine the interior palette, select fixtures and finishes, and present 3D renders and walkthroughs so you can experience the space before it is built.',
    deliverables: [
      'Detailed architectural drawings',
      'Interior design specifications',
      '3D renders & walkthroughs',
      'Coordinated structural & MEP drawings',
      'Regulatory submission package',
    ],
    clientRole: [
      'Review and confirm material, finish, and fixture selections',
      'Confirm your budget ceiling so documentation is calibrated correctly',
      'Obtain any statutory permissions required by your local authority',
    ],
  },
  {
    number: '04',
    title: 'Technical Documentation',
    subtitle: 'The instruction manual for your contractor.',
    duration: '4 – 6 weeks',
    description:
      'This phase produces the complete construction documentation package — working drawings, schedules, specifications, and Bill of Quantities. These are the documents that contractors price from and build from. The quality of this documentation directly determines the quality of the building and the accuracy of the budget. We take this phase seriously because ambiguity on paper becomes dispute on site.',
    deliverables: [
      'Construction drawings (all disciplines)',
      'Material & finish schedules',
      'Door, window & joinery schedules',
      'Bill of Quantities',
      'Tender documents & contractor evaluation',
    ],
    clientRole: [
      'Review and approve construction drawings before they are issued for tender',
      'Appoint a structural consultant if not already engaged',
      'Evaluate shortlisted contractors with us and confirm your appointment',
    ],
  },
  {
    number: '05',
    title: 'Site Supervision',
    subtitle: 'Ensuring what was designed is what gets built.',
    duration: 'Duration of construction',
    description:
      'Design does not end when drawings are issued. We make regular site visits, review contractor shop drawings, issue clarifications, and ensure that every detail is being executed as specified. When conditions on site differ from what was assumed — as they inevitably do — we resolve them with decisions that honour the design intent. We manage the handover process, compile as-built drawings, and remain available after occupation for any queries.',
    deliverables: [
      'Regular site inspection reports',
      'Shop drawing review',
      'Variation orders & cost control',
      'Snagging & defects list',
      'Handover documentation & as-built drawings',
    ],
    clientRole: [
      'Appoint and contract the selected contractor directly',
      'Process contractor payment invoices on the agreed schedule',
      'Be available for a weekly site update call or visit',
    ],
  },
];

// Parallax images shown after each phase — one per phase
const PARALLAX_IMAGES = [
  '/images/Discovery.jpg',                   // after Discovery
  '/images/Concept%20Design.jpg',            // after Concept Design
  '/images/Design%20Development.jpg',        // after Design Development
  '/images/Technical%20Documentation.jpg',   // after Technical Documentation
  '/images/Site%20Supervision.jpg',          // after Site Supervision
];

export default async function ProcessPage() {
  const settings = await getSiteSettings();
  const whatsapp = settings?.whatsapp ?? STUDIO.whatsappNumber;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: "How to Work With an Architect — Team Design's 5-Phase Process",
            description: 'Team Design takes every project through five structured phases, from the initial brief to post-occupancy handover. Architecture is not a commodity — each phase has defined deliverables, client sign-off points, and a clear scope.',
            totalTime: 'P6M',
            step: [
              {
                '@type': 'HowToStep',
                position: 1,
                name: 'Discovery',
                text: 'Site visit, client brief, space programme, and project timeline. We spend time understanding who you are, how you live or work, what this building must accomplish, and what it must feel like. Duration: 2–4 weeks. Deliverables: site analysis report, client brief document, preliminary space programme, project timeline and fee proposal.',
              },
              {
                '@type': 'HowToStep',
                position: 2,
                name: 'Concept Design',
                text: 'Multiple design directions explored and tested against brief, budget, and site logic. Presented as sketches, moodboards, and models. Refined until the design direction is locked. Duration: 4–6 weeks. Deliverables: concept sketches and diagrams, moodboard and material references, preliminary floor plans and sections, outline cost estimate.',
              },
              {
                '@type': 'HowToStep',
                position: 3,
                name: 'Design Development',
                text: 'Complete design resolution — every room, detail, and material decided. Structural and MEP coordination, regulatory submission preparation, 3D renders and walkthroughs. Duration: 6–10 weeks. Deliverables: detailed architectural drawings, interior design specifications, 3D renders and walkthroughs, coordinated structural and MEP drawings, regulatory submission package.',
              },
              {
                '@type': 'HowToStep',
                position: 4,
                name: 'Technical Documentation',
                text: 'Full construction documentation package — working drawings, schedules, specifications, and Bill of Quantities. The documents contractors price from and build from. Duration: 4–6 weeks. Deliverables: construction drawings across all disciplines, material and finish schedules, door/window/joinery schedules, Bill of Quantities, tender documents and contractor evaluation.',
              },
              {
                '@type': 'HowToStep',
                position: 5,
                name: 'Site Supervision',
                text: 'Regular site visits, shop drawing review, variation control, and handover documentation. Design does not end when drawings are issued — we remain on site through construction to ensure the building that gets built is the one that was designed. Duration: duration of construction. Deliverables: site inspection reports, shop drawing review, variation orders and cost control, snagging and defects list, handover documentation and as-built drawings.',
              },
            ],
          }),
        }}
      />
      {/* Page hero */}
      <div className={styles.pageHero}>
        <div className={styles.heroInner}>
          <span className={styles.heroLabel}>How We Work</span>
          <h1 className={styles.heroTitle}>A process built<br />around your project.</h1>
          <p className={styles.heroSub}>
            Architecture is not a commodity. Every project is different — in site, client, programme, and budget. What stays constant is the rigour and care we bring to each phase.
          </p>
        </div>
      </div>

      {/* Phases interleaved with parallax panels */}
      <div className={styles.phasesTop} />

      {PHASES.map((phase, i) => (
        <div key={phase.number}>
          <section className={styles.phaseWrapper}>
            <FadeIn direction="up" delay={0.05} threshold={0.08}>
              <div className={styles.phase}>
                <div className={styles.phaseLeft}>
                  <span className={styles.phaseNumber}>{phase.number}</span>
                  {i < PHASES.length - 1 && <div className={styles.phaseLine} />}
                </div>

                <div className={styles.phaseRight}>
                  <div className={styles.phaseHeader}>
                    <div>
                      <span className={styles.phaseDuration}>{phase.duration}</span>
                      <h2 className={styles.phaseTitle}>{phase.title}</h2>
                      <p className={styles.phaseSubtitle}>{phase.subtitle}</p>
                    </div>
                  </div>

                  <p className={styles.phaseDesc}>{phase.description}</p>

                  <div className={styles.phaseBoxes}>
                    <div className={styles.deliverables}>
                      <span className={styles.deliverablesLabel}>Deliverables</span>
                      <ul className={styles.deliverablesList}>
                        {phase.deliverables.map((d) => (
                          <li key={d} className={styles.deliverableItem}>
                            <span className={styles.deliverableDot} />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className={styles.clientRole}>
                      <span className={styles.clientRoleLabel}>Your role</span>
                      <ul className={styles.deliverablesList}>
                        {phase.clientRole.map((c) => (
                          <li key={c} className={styles.deliverableItem}>
                            <span className={styles.clientRoleDot} />
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </section>

          {/* Parallax image panel after each phase */}
          <div
            className={styles.parallaxPanel}
            style={{ backgroundImage: `url(${PARALLAX_IMAGES[i]})` }}
            aria-hidden="true"
          />
        </div>
      ))}

      <div className={styles.phasesBottom} />

      {/* CTA */}
      <section className={styles.cta}>
        <div className={styles.ctaInner}>
          <span className={styles.ctaLabel}>Ready to begin?</span>
          <h2 className={styles.ctaTitle}>Start with a conversation.</h2>
          <p className={styles.ctaText}>
            The first meeting costs nothing and commits you to nothing. We&apos;ll listen to your project, ask the right questions, and tell you honestly whether and how we can help.
          </p>
          <div className={styles.ctaLinks}>
            <Link href="/contact" className={styles.ctaPrimary}>Get in Touch →</Link>
            <a
              href={`https://wa.me/${whatsapp}?text=${encodeURIComponent("Hi, I'd like to learn more about how Team Design works and discuss a potential project.")}`}
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
