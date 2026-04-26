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
import ReadMoreIntro from '@/components/ReadMoreIntro';
import ThemeColorSync from '@/components/ThemeColorSync';
import { WARM_BLUR } from '@/lib/siteContent';
import { getTestimonials, getSiteSettings } from '@/lib/sanity';

/** SSR-time theme colour — dark to match the filmstrip before JS runs */
export const viewport: Viewport = {
  themeColor: '#3B1E08',
};

export default async function HomePage() {
  const [rawTestimonials, settings] = await Promise.all([
    getTestimonials(),
    getSiteSettings(),
  ]);
  const testimonials = rawTestimonials.filter(
    (t, i, arr) => arr.findIndex(x => x.quote === t.quote && x.name === t.name && x.title === t.title) === i
  );

  return (
    <>
      {/*
        Preload hint for the LCP carousel image. Next.js doesn't auto-generate
        a preload tag for fill-mode images, so we add it manually for the first
        category card. Mobile widths first since most traffic is mobile and
        LCP audits target mobile.
      */}
      <link
        rel="preload"
        as="image"
        imageSrcSet="/_next/image?url=%2Fprojects%2Frahul-sanjana-residence%2F1.jpg&w=384&q=70 384w, /_next/image?url=%2Fprojects%2Frahul-sanjana-residence%2F1.jpg&w=640&q=70 640w, /_next/image?url=%2Fprojects%2Frahul-sanjana-residence%2F1.jpg&w=1080&q=70 1080w"
        imageSizes="(max-width: 600px) 280px, (max-width: 1199px) 480px, 760px"
        fetchPriority="high"
      />

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

      {/* ─── Value proposition + intro ───────────────────────────────────── */}
      <div className={styles.valuePropWrap}>
        <h1 className={styles.valueProp}>
          Twenty-five years of architecture and interiors — from homes to institutions, across India.
        </h1>
        <div className={styles.introText}>
          <p>
            Team Design is an architecture and interior design practice based in Mumbai. Founded by Tasadduq Kher in 1996, the studio has spent twenty-five years shaping the built environment — from private homes and luxury residences to commercial offices, retail spaces, and large-scale institutional buildings across India.
          </p>
          <ReadMoreIntro>
            <p>
              Architecture and interiors are treated as a single discipline here. Every project — whether a family home in the Mumbai suburbs or a multi-storey commercial development in the city — is considered from structure to finish, with the same care given to how a space is experienced as to how it is built.
            </p>
            <p>
              With over 300 completed projects spanning residential, commercial, and institutional work, Team Design brings the same rigour to every scale of commission, across Mumbai, Maharashtra, and beyond.
            </p>
          </ReadMoreIntro>
        </div>
      </div>

      {/* ─── Credentials — directly below intro ──────────────────────────── */}
      <section className={styles.credentials}>
        <div className={styles.credentialsInner}>

          {/* Press recognition — first in DOM so it stacks above testimonials on mobile */}
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
                  <div className={styles.recognitionLogoImgWrap}>
                    <Image
                      src="/logos/ai-india.png"
                      alt="Architect and Interiors India"
                      fill
                      sizes="(max-width: 600px) 140px, 180px"
                      className={styles.recognitionLogoImg}
                      style={{ objectFit: 'contain', objectPosition: 'left center' }}
                    />
                  </div>
                </div>
                <div className={styles.recognitionLogo}>
                  <div className={styles.recognitionLogoImgWrap}>
                    <Image
                      src="/logos/igen-forum.png"
                      alt="iGEN Design Forum"
                      fill
                      sizes="(max-width: 600px) 80px, 100px"
                      className={styles.recognitionLogoImg}
                      style={{ objectFit: 'contain', objectPosition: 'center center' }}
                    />
                  </div>
                </div>
                <div className={styles.recognitionLogo}>
                  <div className={styles.recognitionLogoImgWrap}>
                    <Image
                      src="/logos/dupont-corian.jpg"
                      alt="DuPont India and Corian"
                      fill
                      sizes="(max-width: 600px) 160px, 200px"
                      className={styles.recognitionLogoImg}
                      style={{ objectFit: 'contain', objectPosition: 'left center' }}
                    />
                  </div>
                </div>
              </div>
            </FadeUpReveal>
          </div>

          {/* Testimonials — second in DOM so they stack below recognition on mobile */}
          <div className={styles.testimonialCol}>
            <span className="label">From Our Clients</span>
            <TestimonialSlider testimonials={testimonials} interval={6000} />
          </div>

        </div>
      </section>

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
              Tasadduq Kher founded Team Design in 1996 after graduating from Rachana Sansad Academy of Architecture — one of India&apos;s most respected architectural institutions. Over twenty-five years, he has led a practice that has shaped Mumbai&apos;s residential, commercial, and institutional landscape.
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
