import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';
import TestimonialSlider from '@/components/TestimonialSlider';
import FadeIn from '@/components/FadeIn';
import { STATS, FEATURED_PROJECTS, SELECTED_CLIENTS, TESTIMONIALS, WARM_BLUR } from '@/lib/siteContent';

export default function HomePage() {
  return (
    <>
      {/* ─── Hero + Stats (one shared image) ──────────────────────────── */}
      <div className={styles.heroWrapper}>
        <div className={styles.heroImageWrap}>
          <Image
            src="/hero-building.png"
            alt="Team Design — Architecture & Interiors, Mumbai"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
            className={styles.heroImage}
            placeholder="blur"
            blurDataURL={WARM_BLUR}
          />
          <div className={styles.heroOverlayLeft} />
        </div>

        <section className={styles.hero}>
          <div className={styles.heroText}>
            <div className={styles.heroTaglineBlock}>
              <span className={styles.heroLabel}>Mumbai · Est. 1999 · Architecture & Interiors</span>
              <span className={styles.heroPhilosophy}>Spaces shaped by site, light, and the people who inhabit them.</span>
            </div>
            <div className={styles.heroCtas}>
              <Link href="/work" className={styles.heroCta}>View Our Work</Link>
              <Link href="/contact" className={styles.heroCtaSecondary}>Begin a Conversation →</Link>
            </div>
          </div>
        </section>

        <section className={styles.statBar}>
          {STATS.map((stat, i) => (
            <FadeIn key={i} delay={i * 0.1} direction="up">
              <div className={styles.stat}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            </FadeIn>
          ))}
        </section>
      </div>

      {/* ─── Selected Work ─────────────────────────────────────────────── */}
      <section className={styles.workSection}>
        <FadeIn direction="up">
        <div className={styles.sectionHeader}>
          <div>
            <span className="label">Portfolio</span>
            <h2 className={styles.sectionTitle}>Selected Work</h2>
          </div>
          <Link href="/work" className={styles.viewAll}>View All Work →</Link>
        </div>
        </FadeIn>

        <div className={styles.categoryLinks}>
          <Link href="/work?type=Residential" className={styles.categoryLink}>Residential</Link>
          <Link href="/work?type=Commercial" className={styles.categoryLink}>Commercial</Link>
          <Link href="/work?type=Institutional" className={styles.categoryLink}>Institutional</Link>
          <Link href="/work?type=Interiors" className={styles.categoryLink}>Interiors</Link>
        </div>

        <div className={styles.projectGrid}>

          {/* ── Lead project — full-width cinematic strip ── */}
          <FadeIn direction="up">
            <Link href={`/work/${FEATURED_PROJECTS[0].slug}`} className={styles.projectHeroCard}>
              <div className={styles.projectHeroImageWrap}>
                <Image
                  src={FEATURED_PROJECTS[0].image}
                  alt={FEATURED_PROJECTS[0].title}
                  fill
                  priority
                  sizes="100vw"
                  style={{ objectFit: 'cover' }}
                  className={styles.projectHeroImage}
                  placeholder="blur"
                  blurDataURL={WARM_BLUR}
                />
                <div className={styles.projectHeroOverlay} />
                <div className={styles.projectHeroContent}>
                  <span className={styles.projectHeroType}>{FEATURED_PROJECTS[0].type}</span>
                  <h3 className={styles.projectHeroTitle}>{FEATURED_PROJECTS[0].title}</h3>
                  <p className={styles.projectHeroTagline}>{FEATURED_PROJECTS[0].tagline}</p>
                </div>
              </div>
            </Link>
          </FadeIn>

          {/* ── Supporting three ── */}
          <div className={styles.projectRow}>
            {FEATURED_PROJECTS.slice(1).map((project, i) => (
              <FadeIn key={project.slug} delay={i * 0.12} direction="up">
                <Link href={`/work/${project.slug}`} className={styles.projectCard}>
                  <div className={styles.projectImageWrap}>
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      style={{ objectFit: 'cover' }}
                      className={styles.projectImage}
                      placeholder="blur"
                      blurDataURL={WARM_BLUR}
                    />
                    <div className={styles.projectOverlay}>
                      <p className={styles.projectCardTagline}>{project.tagline}</p>
                    </div>
                  </div>
                  <div className={styles.projectMeta}>
                    <span className={styles.projectType}>{project.type}</span>
                    <h3 className={styles.projectTitle}>{project.title}</h3>
                    <span className={styles.projectClient}>{project.client} · {project.location}</span>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>

        </div>
      </section>

      {/* ─── Credentials ───────────────────────────────────────────────── */}
      <section className={styles.credentials}>
        <div className={styles.credentialsInner}>

          {/* Testimonial carousel */}
          <div className={styles.testimonialCol}>
            <span className="label">Client Testimonials</span>
            <TestimonialSlider testimonials={TESTIMONIALS} interval={6000} />
          </div>

          {/* Selected clients list */}
          <div className={styles.clientsCol}>
            <span className="label">Selected Clients</span>
            <div className={styles.clientList}>
              {SELECTED_CLIENTS.map((client, i) => (
                <div key={i} className={styles.clientItem}>
                  <div className={styles.clientLeft}>
                    <span className={styles.clientName}>{client.name}</span>
                    <span className={styles.clientDesc}>{client.description}</span>
                  </div>
                  <span className={styles.clientProject}>{client.project}</span>
                </div>
              ))}
            </div>

            {/* Press strip */}
            <div className={styles.pressStrip}>
              <span className={styles.pressStripLabel}>As recognised by</span>
              <div className={styles.pressStripLogos}>
                {['Architects & Interiors India', 'iGEN Design Forum', 'DuPont Corian® India'].map((pub) => (
                  <span key={pub} className={styles.pressStripItem}>{pub}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Principal ─────────────────────────────────────────────────── */}
      <section className={styles.principal}>
        <div className={styles.principalInner}>
          <div className={styles.principalImageCol}>
            <div className={styles.principalImageWrap}>
              <Image
                src="/tasadduq-kher.png"
                alt="Tasadduq Kher — Principal Architect"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
                placeholder="blur"
                blurDataURL={WARM_BLUR}
              />
            </div>
          </div>

          <div className={styles.principalTextCol}>
            <span className="label">Principal Architect</span>
            <h2 className={styles.principalName}>Tasadduq Kher</h2>
            <p className={styles.principalBio}>
              Tasadduq Kher founded Team Design in 1999 after graduating from Rachana Sansad Academy of Architecture — one of India&apos;s most respected architectural institutions. Over 25 years, he has led a practice that has shaped Mumbai&apos;s residential, commercial, and institutional landscape.
            </p>
            <p className={styles.principalBio}>
              His approach begins with understanding how people live and work — then finding the design logic that serves those needs precisely. The result is work that is quiet rather than declarative, and enduring rather than fashionable.
            </p>
            <div className={styles.principalCredentials}>
              <div className={styles.credential}>
                <span className={styles.credValue}>B.Arch</span>
                <span className={styles.credLabel}>Rachana Sansad Academy of Architecture, Mumbai</span>
              </div>
              <div className={styles.credential}>
                <span className={styles.credValue}>1999</span>
                <span className={styles.credLabel}>Year Practice Founded</span>
              </div>
            </div>
            <Link href="/people" className={styles.principalLink}>Meet the Team →</Link>
          </div>
        </div>
      </section>

      {/* ─── Recognition ───────────────────────────────────────────────── */}
      <section className={styles.recognition}>
        <div className={styles.recognitionInner}>
          <div className={styles.recognitionHeader}>
            <span className="label">Press & Recognition</span>
            <h2 className={styles.recognitionTitle}>25 years of practice,<br />noticed and published.</h2>
          </div>

          <div className={styles.recognitionItems}>
            <FadeIn direction="up" delay={0}>
            <div className={styles.recognitionItem}>
              <span className={styles.recognitionYear}>2016</span>
              <div className={styles.recognitionContent}>
                <span className={styles.recognitionPub}>Architects &amp; Interiors India</span>
                <p className={styles.recognitionHeadline}>
                  Zainab Kher recognised as one of India&apos;s 50 Most Talented Young Architects Under 35 — the firm&apos;s most prominent individual award.
                </p>
              </div>
            </div>

            </FadeIn>

            <FadeIn direction="up" delay={0.1}>
            <div className={styles.recognitionItem}>
              <span className={styles.recognitionYear}>2016</span>
              <div className={styles.recognitionContent}>
                <span className={styles.recognitionPub}>iGEN Design Forum</span>
                <p className={styles.recognitionHeadline}>
                  Honoured at the 5th iGEN Design Forum, celebrating 50 young and dynamic design practitioners shaping the future of Indian architecture.
                </p>
              </div>
            </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.2}>
            <div className={styles.recognitionItem}>
              <span className={styles.recognitionYear}>2015</span>
              <div className={styles.recognitionContent}>
                <span className={styles.recognitionPub}>DuPont India &amp; Corian®</span>
                <p className={styles.recognitionHeadline}>
                  Featured in Women Leadership in Architecture &amp; Design — a national discussion on the rising influence of women in Indian design practice.
                </p>
              </div>
            </div>
            </FadeIn>
          </div>

          <div className={styles.recognitionFooter}>
            <Link href="/studio" className={styles.recognitionLink}>Full Studio Profile →</Link>
          </div>
        </div>
      </section>

      {/* ─── Interiors CTA ─────────────────────────────────────────────── */}
      <section className={styles.interiorsCta}>
        <div className={styles.interiorsImageWrap}>
          <Image
            src="/interiors-cta.png"
            alt="Team Design Architects — Studio wall of architectural sketches and drawings, Mumbai"
            width={1536}
            height={1024}
            sizes="100vw"
            style={{ width: '100%', height: 'auto', display: 'block' }}
            placeholder="blur"
            blurDataURL={WARM_BLUR}
          />
          <div className={styles.interiorsOverlay} />
        </div>
        <div className={styles.interiorsContent}>
          <span className="label" style={{ color: 'rgba(244,238,230,0.55)' }}>Interior Design</span>
          <h2 className={styles.interiorsTitle}>Spaces that feel<br />like they belong to you.</h2>
          <Link href="/work?type=Interiors" className={styles.interiorsLink}>View Interiors Work →</Link>
        </div>
      </section>
    </>
  );
}
