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
          {[
            {
              num: '01',
              title: 'Dependable Professionalism',
              desc: 'A beautiful project is delivered through good service, detailed drawings and specifications with excellent project management. We pride ourselves on offering clients certainty and confidence in keeping projects on time and on budget.',
            },
            {
              num: '02',
              title: 'Reliable Team Depth',
              desc: 'Team members communicate well and are motivated by architectural innovation. The depth of our team means no project outgrows our capacity — and every client has access to the full knowledge of the practice.',
            },
            {
              num: '03',
              title: 'Strong Domain Knowledge',
              desc: 'We lead by design, combining global research with local action. Our experience across residential, commercial, institutional, and interior projects means we bring informed precedent to every new brief.',
            },
            {
              num: '04',
              title: 'Freshness of Concepts',
              desc: 'We deliver bespoke, global-standard buildings and interiors — no two being the same. There is no predetermined style or model. We take a fresh approach with every project, our work evolving organically without preconceived constraints.',
            },
            {
              num: '05',
              title: 'Energetic Competence',
              desc: 'Projects manifest macro-to-micro attention at every level. The delivery stage is a central element in ensuring design integrity is maintained and provides a smooth, efficient progression through all stages.',
            },
            {
              num: '06',
              title: 'Wisdom of Experience',
              desc: 'If a building can feel like it naturally belongs — fitting logically in a place, an environment, a time and culture — then the people who inhabit it will likely feel a sense of belonging there as well. This methodology connects theories of beauty, confidence, economy, and comfort.',
            },
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

      {/* Design Ideals */}
      <section className={styles.services}>
        <span className={styles.sectionLabel}>Design Philosophy</span>
        <div className={styles.serviceGrid}>
          {[
            {
              title: 'Approach Over Aesthetic',
              desc: 'There is no predetermined style or model — we take a fresh approach with every project. We recognise each issue as unique and adapt to multiple sectors and applications.',
            },
            {
              title: 'Honest & Authentic',
              desc: 'Every element is part of an integrated whole and contributes to the bigger picture. Our approach suits the local climate, landscape, and culture — authentic material, authentic process.',
            },
            {
              title: 'Balance & Dialogue',
              desc: 'Space versus form. Object versus place. All brief and site parameters are addressed — we aim for the best solution, ticking every box without compromising the design integrity of the whole.',
            },
            {
              title: 'The Idea Behind the Design',
              desc: '"The Egg" — the idea behind every solution provides order and strength beyond merely responding to the brief. Good architecture has a reason that can be articulated, even when it is felt before it is understood.',
            },
            {
              title: 'Holistic Thinking',
              desc: 'A culture of continuous improvement fosters innovation and excellence. We take a fresh approach to every project — our work evolves organically without the constraints of preconceived ideas or prescribed formulas.',
            },
            {
              title: 'Belonging',
              desc: 'If a building feels like it naturally belongs in its environment, a time and culture — then the people who inhabit it will feel a sense of belonging there as well. This belief underpins everything we design.',
            },
          ].map(s => (
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
          {[
            {
              title: 'Architectural Design',
              body: 'Space and light design with contextual sensitivity',
              year: 'Full Service',
              type: 'Architecture',
            },
            {
              title: 'Interior Design',
              body: 'Residential, commercial, retail, hospitality and religious spaces',
              year: 'Full Service',
              type: 'Interiors',
            },
            {
              title: 'Sustainable Design',
              body: 'Solar power, rainwater harvesting, eco-friendly materials, IGBC/GRIHA support',
              year: 'Integrated',
              type: 'Sustainability',
            },
            {
              title: 'Design Guidelines',
              body: 'Corporate identity systems for ICICI Bank, J&K Bank, Tata Capital, Kotak Mahindra Bank',
              year: 'Consulting',
              type: 'Brand & Standards',
            },
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
            {
              pub: 'Architects & Interiors India',
              title: "Zainab Kher recognised as one of India's top 50 architects under 35",
              year: '2016',
            },
            {
              pub: 'iGEN Design Forum',
              title: '5th iGEN Design Forum — honouring 50 young and dynamic design practitioners',
              year: '2016',
            },
            {
              pub: 'DuPont India & Corian®',
              title: 'Women Leadership in Architecture & Design — discussing leadership roles of women in India',
              year: '2015',
            },
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
