import Image from 'next/image';
import styles from './page.module.css';

export const metadata = { title: 'Studio' };

export default function StudioPage() {
  return (
    <>
      <div className={styles.pageHero}>
        <span className={styles.pageLabel}>About</span>
        <h1 className={styles.pageTitle}>Studio</h1>
      </div>

      {/* Founding story */}
      <section className={styles.story}>
        <div className={styles.storyInner}>
          <div className={styles.storyText}>
            <span className={styles.sectionLabel}>Founded 1999</span>
            <h2 className={styles.storyTitle}>Twenty-five years of<br />considered practice.</h2>
            <p className={styles.para}>Team Design was founded in Mumbai in 1999 by Tasadduq Kher, after graduating from Rachana Sansad Academy of Architecture. From its original studio in Lower Parel East, the practice has grown into a team of ten architects and designers working across residential, commercial, and institutional projects.</p>
            <p className={styles.para}>The firm's philosophy is that the best architecture serves people precisely — it begins with understanding how a client actually lives or works, and ends with spaces that make those routines easier, more beautiful, and more meaningful. Not everything needs to be a statement. Some buildings just need to be right.</p>
            <p className={styles.para}>Over 25 years and 300+ completed projects, Team Design has worked with some of Mumbai&apos;s most prominent figures — Kishore Mariwala, founder of Marico; Ronnie Screwvala, founder of UTV and UpGrad — and with institutions, developers, and individual clients who return again and again because the process works.</p>
            <p className={styles.para}>While the studio is rooted in Mumbai, Team Design accepts commissions across India. Current and recent projects span Mumbai, Navi Mumbai, Pune, Tamil Nadu, Lonavala, and Jammu &amp; Kashmir.</p>
          </div>
          <div className={styles.storyImageCol}>
            <div className={styles.storyImage}>
              <Image src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000&q=80" alt="Team Design Studio" fill sizes="(max-width: 768px) 100vw, 45vw" style={{ objectFit: 'cover' }} />
            </div>
            <div className={styles.storyStats}>
              <div className={styles.stat}><span className={styles.statVal}>1999</span><span className={styles.statLbl}>Year Founded</span></div>
              <div className={styles.stat}><span className={styles.statVal}>10+</span><span className={styles.statLbl}>Team Members</span></div>
              <div className={styles.stat}><span className={styles.statVal}>Navi Mumbai</span><span className={styles.statLbl}>Current Studio</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Engagement Process */}
      <section className={styles.process}>
        <div className={styles.processHeader}>
          <span className={styles.sectionLabel}>How We Work</span>
          <h2 className={styles.processTitle}>The Commission Process</h2>
          <p className={styles.processSub}>From first conversation to handover — a clear, collaborative process designed to protect your investment and deliver an exceptional result.</p>
        </div>
        <div className={styles.processSteps}>
          {[
            { num: '01', title: 'Brief & Discovery', desc: 'We meet at the site or studio to understand your brief, lifestyle, budget, and aspirations. No design work begins until we deeply understand the project.' },
            { num: '02', title: 'Concept Design', desc: 'We develop two to three concept directions — plans, sections, and key perspectives. You choose the direction that resonates, and we refine it together.' },
            { num: '03', title: 'Design Development', desc: 'The approved concept is developed into construction drawings, specifications, and material selections. All regulatory approvals are managed by our team.' },
            { num: '04', title: 'Construction & Site', desc: 'We supervise construction through qualified contractors, conduct regular site visits, and manage quality control from foundation to finish. Typical residential projects run 12–18 months on site.' },
          ].map(step => (
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

      {/* Services */}
      <section className={styles.services}>
        <span className={styles.sectionLabel}>What We Do</span>
        <div className={styles.serviceGrid}>
          {[
            { title: 'Architecture', desc: 'Full-service architectural design from feasibility through construction administration. Residential, commercial, and institutional projects.' },
            { title: 'Interior Design', desc: 'Integrated interior design for homes, offices, hospitality spaces. Material selection, furniture, lighting, and joinery to the finish.' },
            { title: 'Sustainable Design', desc: 'Sustainable design principles integrated into every project — passive cooling, material lifecycle, orientation, and IGBC/GRIHA certification support.' },
          ].map(s => (
            <div key={s.title} className={styles.serviceItem}>
              <h3 className={styles.serviceTitle}>{s.title}</h3>
              <p className={styles.serviceDesc}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Awards */}
      <section className={styles.awards}>
        <span className={styles.sectionLabel}>Recognition</span>
        <h2 className={styles.awardsTitle}>Awards & Accreditation</h2>
        <div className={styles.awardsGrid}>
          {[
            { title: 'IIID Award for Excellence', body: 'Institute of Indian Interior Designers', year: '2019', type: 'Award' },
            { title: 'CREDAI MCHI Award — Commercial', body: 'Confederation of Real Estate Developers', year: '2018', type: 'Award' },
            { title: 'IGBC Green Building Certification', body: 'Indian Green Building Council', year: 'Active', type: 'Certification' },
            { title: 'COA Registered Practice', body: 'Council of Architecture, India', year: 'Since 1999', type: 'Accreditation' },
          ].map((a, i) => (
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
          {[
            { pub: 'Architectural Digest India', title: 'The Mont Blanc Residence — A Study in Restraint', year: '2013' },
            { pub: 'Architect & Interiors India', title: 'Team Design: 20 Years of Mumbai Practice', year: '2019' },
            { pub: 'The Times of India', title: 'J&K Bank\'s BKC Business Centre Opens', year: '2018' },
          ].map((p, i) => (
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
