import Image from 'next/image';
import styles from './page.module.css';
import { CORE_VALUES, DESIGN_IDEALS, SERVICES } from '@/lib/siteContent';

export const metadata = { title: 'Studio' };

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
      <section className={styles.drawing}>
        <div className={styles.drawingFrame}>
          <span className={`${styles.corner} ${styles.cornerTL}`} aria-hidden="true" />
          <span className={`${styles.corner} ${styles.cornerTR}`} aria-hidden="true" />
          <span className={`${styles.corner} ${styles.cornerBL}`} aria-hidden="true" />
          <span className={`${styles.corner} ${styles.cornerBR}`} aria-hidden="true" />

          <div className={styles.drawingImageWrap}>
            <Image
              src="/studio-sketch.png"
              alt="Team Design Studio Building — Architectural Illustration, Kopar Khairane"
              fill
              priority
              sizes="(max-width: 900px) 100vw, calc(100vw - 160px)"
              style={{ objectFit: 'cover', objectPosition: 'center 25%' }}
            />
            <div className={`${styles.annot} ${styles.annotA}`}>
              <span className={styles.annotDot} />
              <span className={styles.annotLine} />
              <span className={styles.annotText}>Primary Tower</span>
            </div>
            <div className={`${styles.annot} ${styles.annotB}`}>
              <span className={styles.annotText}>Rooftop Planting</span>
              <span className={styles.annotLine} />
              <span className={styles.annotDot} />
            </div>
            <div className={`${styles.annot} ${styles.annotC}`}>
              <span className={styles.annotDot} />
              <span className={styles.annotLine} />
              <span className={styles.annotText}>Studio Entrance</span>
            </div>
          </div>

          <div className={styles.titleBlock}>
            <div className={styles.titleCell}>
              <span className={styles.titleCellLabel}>Practice</span>
              <span className={styles.titleCellValue}>Team Design Architects</span>
            </div>
            <div className={styles.titleCell}>
              <span className={styles.titleCellLabel}>Location</span>
              <span className={styles.titleCellValue}>Kopar Khairane, Navi Mumbai</span>
            </div>
            <div className={styles.titleCell}>
              <span className={styles.titleCellLabel}>Established</span>
              <span className={styles.titleCellValue}>1999</span>
            </div>
            <div className={styles.titleCell}>
              <span className={styles.titleCellLabel}>Drawing</span>
              <span className={styles.titleCellValue}>Studio Building — Exterior Elevation</span>
            </div>
            <div className={styles.titleCellCoords}>
              <span className={styles.titleCellLabel}>Coordinates</span>
              <span className={styles.coordsValue}>19°6′27″N&nbsp;&nbsp;73°0′29″E</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Founding Story ──────────────────────────────────────── */}
      <section className={styles.story}>
        <div className={styles.storyInner}>
          <div className={styles.storyText}>
            <h2 className={styles.storyTitle}>A practice built on<br />craft and conviction.</h2>
            <div className={styles.annotatedPara}>
              <span className={styles.paraNote}>Scale</span>
              <p className={styles.para}>
                Team Design began in 1999 as a small office in Lower Parel, Mumbai. Over twenty-five years the practice has grown across scales and sectors — from private apartments to institutional campuses, from banking environments designed to national standards to homes shaped entirely around the daily rhythms of a single family.
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
                src="https://teamdesign.in/wp-content/uploads/2018/12/COLLEGE-CAMPUS-EXT-4.jpg"
                alt="ITM College Campus Extension — Team Design Architects"
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                style={{ objectFit: 'cover' }}
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

      {/* ─── Design Philosophy ───────────────────────────────────── */}
      <section className={styles.services}>
        <span className={styles.sectionLabel}>Design Philosophy</span>
        <div className={styles.serviceGrid}>
          {DESIGN_IDEALS.map(s => (
            <div key={s.title} className={styles.serviceItem}>
              <h3 className={styles.serviceTitle}>{s.title}</h3>
              <p className={styles.serviceDesc}>{s.desc}</p>
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
