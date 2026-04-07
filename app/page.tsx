export const revalidate = 0;

import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';
import TestimonialSlider from '@/components/TestimonialSlider';
import FadeIn from '@/components/FadeIn';
import FadeUpReveal from '@/components/FadeUpReveal';
import HeroParallax from '@/components/HeroParallax';
import MagneticButton from '@/components/MagneticButton';
import HeroCarousel from '@/components/HeroCarousel';
import { WARM_BLUR } from '@/lib/siteContent';
import { getFeaturedProjects, getTestimonials, getSiteSettings } from '@/lib/sanity';

export default async function HomePage() {
  const [featuredProjects, testimonials, settings] = await Promise.all([
    getFeaturedProjects(),
    getTestimonials(),
    getSiteSettings(),
  ]);

  // Safety guard — don't render the portfolio section until we have projects
  const hasFeatured = featuredProjects.length >= 4;
  return (
    <>
      {/* ─── Hero + Stats (one shared image) ──────────────────────────── */}
      <div className={styles.heroWrapper}>
        <HeroParallax />
        <div className={styles.heroImageWrap} data-hero-parallax>
          <HeroCarousel />
          <div className={styles.heroOverlayBottom} />
        </div>

        <section className={styles.hero}>
          <div className={styles.heroText}>
            <span className={styles.heroLabel}>Architecture &amp; Interior Design · Mumbai</span>
            <h1 className={styles.heroTitle}>Team Design</h1>
            <p className={styles.heroPositioning}>Private homes and institutional buildings. Thirty years of practice in Mumbai.</p>
            <div className={styles.heroCtas}>
              <MagneticButton><Link href="/portfolio" className={styles.heroCta}>View Our Work</Link></MagneticButton>
              <MagneticButton><Link href="/contact" className={styles.heroCtaSecondary}>Discuss a Project →</Link></MagneticButton>
            </div>
          </div>
        </section>

        <section className={styles.statBar}>
          {[
            { value: settings?.yearsInPractice ?? '25+',       label: 'Years in Practice' },
            { value: settings?.projectCount    ?? '300+',      label: 'Projects Completed' },
            { value: settings?.clientCount     ?? '500+',      label: 'Clients Served' },
            { value: settings?.sqftCompleted   ?? '20L+ sq ft', label: 'Built Space' },
          ].map((stat, i) => (
            <div key={i} className={styles.stat}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </section>
      </div>

      {/* ─── Selected Work ─────────────────────────────────────────────── */}
      <section className={styles.portfolioSection}>
        <FadeUpReveal>
          <div className={styles.sectionHeader}>
            <div>
              <span className="label">Portfolio</span>
              <h2 className={styles.sectionTitle}>Selected Work</h2>
            </div>
            <Link href="/portfolio" className={styles.viewAll}>View Portfolio →</Link>
          </div>
        </FadeUpReveal>

        <div className={styles.categoryLinks}>
          <Link href="/portfolio?type=Residential" className={styles.categoryLink}>Residential</Link>
          <Link href="/portfolio?type=Commercial" className={styles.categoryLink}>Commercial</Link>
          <Link href="/portfolio?type=Institutional" className={styles.categoryLink}>Institutional</Link>
          <Link href="/portfolio?type=Interiors" className={styles.categoryLink}>Interiors</Link>
        </div>

        {hasFeatured && <div className={styles.projectGrid}>

          {/* ── Lead project — full-width cinematic strip ── */}
          <FadeUpReveal>
            <Link href={`/portfolio/${featuredProjects[0].slug}`} className={styles.projectHeroCard}>
              <div className={styles.projectHeroImageWrap}>
                {featuredProjects[0].image && (
                  <Image
                    src={featuredProjects[0].image}
                    alt={featuredProjects[0].title}
                    fill
                    priority
                    sizes="100vw"
                    style={{ objectFit: 'cover' }}
                    className={styles.projectHeroImage}
                    placeholder="blur"
                    blurDataURL={featuredProjects[0].lqip ?? WARM_BLUR}
                  />
                )}
                <div className={styles.projectHeroOverlay} />
                <div className={styles.projectHeroContent}>
                  <span className={styles.projectHeroType}>{featuredProjects[0].type}</span>
                  <h3 className={styles.projectHeroTitle}>{featuredProjects[0].title}</h3>
                  <p className={styles.projectHeroTagline}>{featuredProjects[0].tagline}</p>
                  <span className={styles.projectHeroViewHint}>View →</span>
                </div>
              </div>
            </Link>
          </FadeUpReveal>

          {/* ── Supporting three ── */}
          <div className={styles.projectRow}>
            {featuredProjects.slice(1).map((project, i) => (
              <FadeUpReveal key={project.slug} delay={i * 0.1}>
                <Link href={`/portfolio/${project.slug}`} className={styles.projectCard}>
                  <div className={styles.projectImageWrap}>
                    {project.image && <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 900px) 100vw, 33vw"
                      style={{ objectFit: 'cover' }}
                      className={styles.projectImage}
                      placeholder="blur"
                      blurDataURL={project.lqip ?? WARM_BLUR}
                    />}
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
              </FadeUpReveal>
            ))}
          </div>

        </div>}
      </section>

      {/* ─── Credentials ───────────────────────────────────────────────── */}
      <section className={styles.credentials}>
        <div className={styles.credentialsInner}>

          {/* Left — testimonials */}
          <div className={styles.testimonialCol}>
            <span className="label">From Our Clients</span>
            <TestimonialSlider testimonials={testimonials} interval={6000} />
          </div>

          {/* Right — press recognition */}
          <div className={styles.recognitionCol}>
            <span className="label">Press &amp; Recognition</span>
            <FadeUpReveal>
              <div className={styles.recognitionLines}>
                <p className={styles.recognitionLine}>
                  Named one of India&apos;s 50 Most Talented Young Architects Under 35 by <em>Architects &amp; Interiors India</em>.
                </p>
                <p className={styles.recognitionLine}>
                  Honoured at the <em>iGEN Design Forum</em> among 50 young practitioners shaping Indian architecture.
                </p>
                <p className={styles.recognitionLine}>
                  Featured in <em>DuPont India &amp; Corian®</em> Women Leadership in Architecture &amp; Design.
                </p>
              </div>
            </FadeUpReveal>
          </div>

        </div>
      </section>

      {/* ─── How We Work ───────────────────────────────────────────── */}
      <section className={styles.processSection}>
        <FadeUpReveal>
          <div className={styles.sectionHeader}>
            <div>
              <span className="label">How We Work</span>
              <h2 className={styles.sectionTitle}>A process built<br />around your project.</h2>
            </div>
            <Link href="/process" className={styles.viewAll}>Full Process →</Link>
          </div>
        </FadeUpReveal>

        <div className={styles.processRows}>
          {[
            { number: '01', title: 'Discovery',               subtitle: 'Understanding you, your site, and your ambition.' },
            { number: '02', title: 'Concept Design',          subtitle: 'Finding the idea that will hold everything together.' },
            { number: '03', title: 'Design Development',      subtitle: 'Turning a concept into a building you can build.' },
            { number: '04', title: 'Technical Documentation', subtitle: 'The instruction manual for your contractor.' },
            { number: '05', title: 'Site Supervision',        subtitle: 'Ensuring what was designed is what gets built.' },
          ].map((phase) => (
            <Link key={phase.number} href="/process" className={styles.processRow}>
              <div className={styles.processLeft}>
                <span className={styles.processNumber}>{phase.number}</span>
                <span className={styles.processTitle}>{phase.title}</span>
              </div>
              <p className={styles.processSubtitle}>{phase.subtitle}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── Principal ─────────────────────────────────────────────────── */}
      <section className={styles.principal}>
        <div className={styles.principalInner}>
          <div className={styles.principalImageCol}>
            <div className={styles.principalImageWrap}>
              <Image
                src="/tasadduq-kher.webp"
                alt="Tasadduq Kher — Principal Architect"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
                placeholder="blur"
                blurDataURL={WARM_BLUR}
              />
            </div>
          </div>

          <FadeUpReveal delay={0.1} className={styles.principalTextCol}>
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
          </FadeUpReveal>
        </div>
      </section>


      {/* ─── Interiors CTA ─────────────────────────────────────────────── */}
      <section className={styles.interiorsCta}>
        <div className={styles.interiorsImageWrap}>
          <Image
            src="/interiors-cta.webp"
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
          <Link href="/portfolio?type=Interiors" className={styles.interiorsLink}>View Interiors Work →</Link>
        </div>
      </section>
    </>
  );
}
