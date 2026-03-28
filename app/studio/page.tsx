import Image from 'next/image';
import type { Metadata } from 'next';
import styles from './page.module.css';
import { CORE_VALUES, SERVICES, WARM_BLUR } from '@/lib/siteContent';
import DrawingSection from './DrawingSection';

export const metadata: Metadata = {
  title: 'Studio',
  description: 'Twenty-five years of architecture and interiors — built across India, rooted in Mumbai. Learn about the Team Design practice, our values, and our services.',
  keywords: ['architecture studio Mumbai', 'architecture practice India', 'Team Design history', 'Mumbai architect studio'],
  alternates: { canonical: 'https://teamdesign.in/studio' },
  openGraph: {
    title: 'Studio — Team Design Architects',
    description: 'Twenty-five years of architecture and interiors — built across India, rooted in Mumbai.',
    url: 'https://teamdesign.in/studio',
    images: [{ url: 'https://teamdesign.in/studio-story.webp', width: 1200, height: 800, alt: 'Team Design Studio — Architecture & Interiors, Mumbai' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Studio — Team Design Architects',
    description: 'Twenty-five years of architecture and interiors — built across India, rooted in Mumbai.',
    images: ['https://teamdesign.in/studio-story.webp'],
  },
};

export default function StudioPage() {
  return (
    <>
      {/* ─── Page Hero ───────────────────────────────────────────── */}
      <div className={styles.pageHero}>
        <span className={styles.pageLabel}>About the Practice</span>
        <h1 className={styles.pageTitle}>Studio</h1>
        <p className={styles.pageSubtitle}>
          Twenty-five years of architecture and interiors — built across India, rooted in Mumbai.
        </p>
      </div>

      {/* ─── Architectural Drawing ───────────────────────────────── */}
      <DrawingSection />

      {/* ─── Founding Story ──────────────────────────────────────── */}
      <section className={styles.story}>
        <div className={styles.storyInner}>
          <div className={styles.storyText}>
            <h2 className={styles.storyTitle}>A practice built on<br />craft and conviction.</h2>
            <div className={styles.annotatedPara}>
              <span className={styles.paraNote}>Scale</span>
              <p className={styles.para}>
                Team Design began in 1996 as a small office in Lower Parel, Mumbai. Over twenty-five years the practice has grown across scales and sectors — from private apartments to institutional campuses, from banking environments designed to national standards to homes shaped entirely around the daily rhythms of a single family.
              </p>
            </div>
            <div className={styles.annotatedPara}>
              <span className={styles.paraNote}>Context</span>
              <p className={styles.para}>
                The work spans from high-tech banking dealing rooms in the city to environmental-friendly rural projects — from Srinagar in the north to Thrissur in the south. For institutions like ICICI Bank, J&K Bank, Tata Capital, and Kotak Mahindra Bank, the firm has authored the design language that defines how those brands are experienced in built form.
              </p>
            </div>
            <div className={styles.annotatedPara}>
              <span className={styles.paraNote}>Process</span>
              <p className={styles.para}>
                The collaborative process is as important as the outcome. Translating ideas into architecture is neither simple nor linear — it calls for experience and creativity, and for elegant solutions to genuinely complicated problems.
              </p>
            </div>
          </div>
          <div className={styles.storyImageCol}>
            <div className={styles.storyImage}>
              <Image
                src="/studio-story.webp"
                alt="Team Design Studio — Architecture & Interiors, Mumbai"
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                style={{ objectFit: 'cover' }}
                placeholder="blur"
                blurDataURL={WARM_BLUR}
              />
            </div>
            <div className={styles.storyStats}>
              <div className={styles.stat}>
                <span className={styles.statVal}>300+</span>
                <span className={styles.statLbl}>Projects</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statVal}>500+</span>
                <span className={styles.statLbl}>Clients</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statVal}>20L+</span>
                <span className={styles.statLbl}>Sq Ft Built</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Pull Quote ──────────────────────────────────────────── */}
      <div className={styles.pullQuote}>
        <blockquote className={styles.pullQuoteText}>
          "If a building can feel like it naturally belongs — fitting logically in a place, an environment,
          a time and culture — then the people who inhabit it will feel a sense of belonging there as well."
        </blockquote>
      </div>

      {/* ─── Core Values — inverted triangle ─────────────────────── */}
      <section className={styles.process}>
        <div className={styles.processHeader}>
          <span className={styles.sectionLabel}>What We Stand For</span>
          <h2 className={styles.processTitle}>Six principles.<br />Every project.</h2>
        </div>
        <div className={styles.processSteps}>
          {CORE_VALUES.map(step => (
            <div key={step.num} className={styles.processStep}>
              <span className={styles.processNum}>{step.num}</span>
              <div className={styles.processContent}>
                <h3 className={styles.processStepTitle}>{step.title}</h3>
                <p className={styles.processStepDesc}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

{/* ─── Services — specification table ──────────────────────── */}
      <section className={styles.specSection}>
        <div className={styles.specHeader}>
          <span className={styles.sectionLabel}>What We Do</span>
          <h2 className={styles.awardsTitle}>Services</h2>
        </div>
        <div className={styles.specTable}>
          <div className={styles.specHeadRow}>
            <span>Ref</span>
            <span>Service</span>
            <span>Type</span>
            <span>Scope</span>
            <span>Description</span>
          </div>
          {SERVICES.map((s, i) => (
            <div key={i} className={styles.specRow}>
              <span className={styles.specRef}>{String(i + 1).padStart(2, '0')}</span>
              <span className={styles.specTitle}>{s.title}</span>
              <span className={styles.specType}>{s.type}</span>
              <span className={styles.specScope}>{s.year}</span>
              <span className={styles.specDesc}>{s.body}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
