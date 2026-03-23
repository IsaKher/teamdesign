import Image from 'next/image';
import styles from './page.module.css';
import { CORE_VALUES, DESIGN_IDEALS, SERVICES, PRESS_ITEMS } from '@/lib/siteContent';

export const metadata = { title: 'Studio' };

export default function StudioPage() {
  return (
    <>
      <div className={styles.pageHero}>
        <span className={styles.pageLabel}>About</span>
        <h1 className={styles.pageTitle}>Studio</h1>
      </div>

      {/* ─── Architectural Drawing ─────────────────────────── */}
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
          </div>
        </div>
      </section>

      {/* Founding story */}
      <section className={styles.story}>
        <div className={styles.storyInner}>
          <div className={styles.storyText}>
            <span className={styles.sectionLabel}>Founded 1999</span>
            <h2 className={styles.storyTitle}>Twenty-five years of<br />considered practice.</h2>
            <p className={styles.para}>M/s. Team Design Architects was established in 1999 with a small office in Lower Parel East, Mumbai. Over the years, it has grown significantly in both range and scale of projects — accumulating extensive experience in planning, designing, and executing large architectural and interior projects.</p>
            <p className={styles.para}>Work spans from high-tech banking dealing rooms in Mumbai to environmental-friendly rural projects. Projects range from Srinagar in North India to Thrissur in South India. The firm has created design guidelines for ICICI Bank, Reliance General Insurance, J&K Bank, Tata Capital, and Kotak Mahindra Bank.</p>
            <p className={styles.para}>The collaborative process is as important as the outcome. Translating ideas and dreams skillfully into the language of architecture is neither simple nor linear — it calls for experience and creativity, elegant solutions to complicated problems. Team Design brings both.</p>
            <p className={styles.para}>A young, energetic architectural practice with a mix of experience and youthful creativity — working to craft exquisitely designed spaces that complement their surroundings and reflect their clients' values.</p>
          </div>
          <div className={styles.storyImageCol}>
            <div className={styles.storyImage}>
              <Image
                src="https://teamdesign.in/wp-content/uploads/2018/12/COLLEGE-CAMPUS-EXT-4.jpg"
                alt="Team Design Studio"
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className={styles.storyStats}>
              <div className={styles.stat}><span className={styles.statVal}>1999</span><span className={styles.statLbl}>Year Founded</span></div>
              <div className={styles.stat}><span className={styles.statVal}>300+</span><span className={styles.statLbl}>Projects Completed</span></div>
              <div className={styles.stat}><span className={styles.statVal}>2M+</span><span className={styles.statLbl}>Square Feet Built</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className={styles.process}>
        <div className={styles.processHeader}>
          <span className={styles.sectionLabel}>What We Stand For</span>
          <h2 className={styles.processTitle}>Six Core Values</h2>
          <p className={styles.processSub}>The principles that guide every project — from first conversation to final handover.</p>
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

      {/* Design Ideals */}
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

      {/* Services */}
      <section className={styles.awards}>
        <span className={styles.sectionLabel}>What We Do</span>
        <h2 className={styles.awardsTitle}>Services</h2>
        <div className={styles.awardsGrid}>
          {SERVICES.map((a, i) => (
            <div key={i} className={styles.awardItem}>
              <div className={styles.awardTop}>
                <span className={styles.awardType}>{a.type}</span>
                <span className={styles.awardYear}>{a.year}</span>
              </div>
              <h3 className={styles.awardTitle}>{a.title}</h3>
              <span className={styles.awardBody}>{a.body}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Press */}
      <section className={styles.press}>
        <span className={styles.sectionLabel}>Press & Recognition</span>
        <h2 className={styles.pressTitle}>In the News</h2>
        <div className={styles.pressList}>
          {PRESS_ITEMS.map((p, i) => (
            <div key={i} className={styles.pressItem}>
              <span className={styles.pressYear}>{p.year}</span>
              <div className={styles.pressContent}>
                <span className={styles.pressPub}>{p.pub}</span>
                <span className={styles.pressTitle2}>{p.title}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
