export const revalidate = 3600;

import type { Viewport } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';
import TestimonialSlider from '@/components/TestimonialSlider';
import FadeUpReveal from '@/components/FadeUpReveal';
import MagneticButton from '@/components/MagneticButton';
import CategoryFilmstrip from '@/components/CategoryFilmstrip';
import ReadMoreBio from '@/components/ReadMoreBio';
import ThemeColorSync from '@/components/ThemeColorSync';
import { WARM_BLUR } from '@/lib/siteContent';
import { getTestimonials, getSiteSettings } from '@/lib/sanity';

/** SSR-time theme colour — dark to match the filmstrip before JS runs */
export const viewport: Viewport = {
  themeColor: '#3B1E08',
};

export default async function HomePage() {
  const [testimonials, settings] = await Promise.all([
    getTestimonials(),
    getSiteSettings(),
  ]);

  return (
    <>
      {/* Syncs iOS/Android status-bar theme-color with scroll position */}
      <ThemeColorSync />

      {/* ─── Category filter filmstrip ────────────────────────────────────── */}
      <CategoryFilmstrip />

      {/* ─── Stat Bar + CTAs ─────────────────────────────────────────────── */}
      <section className={styles.statBar}>
        {[
          { value: settings?.yearsInPractice ?? '25+',        label: 'Years' },
          { value: settings?.projectCount    ?? '300+',       label: 'Projects' },
          { value: settings?.clientCount     ?? '500+',       label: 'Clients' },
          { value: settings?.sqftCompleted   ?? '2M+ sq ft',  label: 'Sq Ft' },
        ].map((stat, i) => (
          <div key={i} className={styles.stat}>
            <span className={styles.statValue}>{stat.value}</span>
            <span className={styles.statLabel}>{stat.label}</span>
          </div>
        ))}
        {/* CTA column — lives inside stat bar for contextual placement */}
        <div className={styles.statCta}>
          <MagneticButton><Link href="/portfolio" className={styles.heroCta}>View Our Work</Link></MagneticButton>
          <Link href="/contact" className={styles.heroCtaSecondary}>Discuss a Project →</Link>
        </div>
      </section>

      {/* ─── Credentials — directly below stats to reinforce trust ──────── */}
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

              {/* ─── Press logo strip ─────────────────────────────── */}
              <div className={styles.recognitionLogos}>
                <div className={styles.recognitionLogo}>
                  <span className={styles.recognitionLogoLabel}>50 Under 35</span>
                  <span className={styles.recognitionLogoName}>Architects &amp; Interiors India</span>
                </div>
                <div className={styles.recognitionLogo}>
                  <span className={styles.recognitionLogoLabel}>Young Practitioners</span>
                  <span className={styles.recognitionLogoName}>iGEN Design Forum</span>
                </div>
                <div className={styles.recognitionLogo}>
                  <span className={styles.recognitionLogoLabel}>Women in Architecture</span>
                  <span className={styles.recognitionLogoName}>DuPont India &amp; Corian®</span>
                </div>
              </div>
            </FadeUpReveal>
          </div>

        </div>
      </section>

      {/* ─── Value proposition ───────────────────────────────────────────── */}
      <div className={styles.valuePropWrap}>
        <h1 className={styles.valueProp}>
          Twenty-five years of architecture and interiors — from homes to institutions, across India.
        </h1>
      </div>

      {/* ─── Principal ───────────────────────────────────────────────────── */}
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
            <ReadMoreBio>
              <p className={styles.principalBio}>
                His approach begins with understanding how people live and work — then finding the design logic that serves those needs precisely. The result is work that is quiet rather than declarative, and enduring rather than fashionable.
              </p>
            </ReadMoreBio>
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

      {/* ─── How We Work ─────────────────────────────────────────────────── */}
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


    </>
  );
}
