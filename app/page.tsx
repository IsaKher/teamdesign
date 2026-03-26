import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';
import TestimonialSlider from '@/components/TestimonialSlider';
import FadeIn from '@/components/FadeIn';
import HeroParallax from '@/components/HeroParallax';
import MagneticButton from '@/components/MagneticButton';
import { STATS, FEATURED_PROJECTS, TESTIMONIALS, WARM_BLUR } from '@/lib/siteContent';

export default function HomePage() {
  return (
    <>
      {/* ─── Hero + Stats (one shared image) ──────────────────────────── */}
      <div className={styles.heroWrapper}>
        <HeroParallax />
        <div className={styles.heroImageWrap} data-hero-parallax>
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
            <span className={styles.heroLabel}>Architecture &amp; Interior Design · Mumbai</span>
            <h1 className={styles.heroTitle}>Team Design</h1>
            <div className={styles.heroCtas}>
              <MagneticButton><Link href="/work" className={styles.heroCta}>View Our Work</Link></MagneticButton>
              <MagneticButton><Link href="/contact" className={styles.heroCtaSecondary}>Begin a Conversation →</Link></MagneticButton>
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
                      sizes="(max-width: 900px) 100vw, 33vw"
                      style={{ objectFit: 'cover' }}
                      className={styles.projectImage}
                      placeholder="blur"
                      blurDataURL={WARM_BLUR}
                    />
                    <div className={styles.projectOverlay}>
                      <span className={styles.viewHint}>View →</span>
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

          {/* Left — testimonials */}
          <div className={styles.testimonialCol}>
            <span className="label">From Our Clients</span>
            <TestimonialSlider testimonials={TESTIMONIALS} interval={6000} />
          </div>

          {/* Right — press recognition */}
          <div className={styles.recognitionCol}>
            <span className="label">Press &amp; Recognition</span>
            <div className={styles.recognitionLines}>
              <FadeIn direction="up" delay={0}>
                <p className={styles.recognitionLine}>
                  Named one of India&apos;s 50 Most Talented Young Architects Under 35 by <em>Architects &amp; Interiors India</em>, 2016.
                </p>
              </FadeIn>
              <FadeIn direction="up" delay={0.1}>
                <p className={styles.recognitionLine}>
                  Honoured at the 5th <em>iGEN Design Forum</em> among 50 young practitioners shaping Indian architecture, 2016.
                </p>
              </FadeIn>
              <FadeIn direction="up" delay={0.2}>
                <p className={styles.recognitionLine}>
                  Featured in <em>DuPont India &amp; Corian®</em> Women Leadership in Architecture &amp; Design, 2015.
                </p>
              </FadeIn>
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
              Tasadduq Kher founded Team Design in 1996 after graduating from Rachana Sansad Academy of Architecture — one of India&apos;s most respected architectural institutions. Over 25 years, he has led a practice that has shaped Mumbai&apos;s residential, commercial, and institutional landscape.
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
                <span className={styles.credValue}>1996</span>
                <span className={styles.credLabel}>Year Practice Founded</span>
              </div>
            </div>
            <Link href="/people" className={styles.principalLink}>Meet the Team →</Link>
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
