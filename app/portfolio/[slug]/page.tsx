export const revalidate = 3600;

import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import styles from './page.module.css';
import FadeIn from '@/components/FadeIn';
import WhatsAppIcon from '@/components/icons/WhatsAppIcon';
import ProjectContent from '@/components/ProjectContent';
import { getProjectBySlug, getAllProjectsForNav, getAllProjectSlugs, getSiteSettings } from '@/lib/sanity';
import { STUDIO, WARM_BLUR } from '@/lib/siteContent';

const BASE = STUDIO.site;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  if (!project) return { title: 'Project Not Found' };

  const desc = project.description.replace(/\n+/g, ' ').slice(0, 155).trim();
  const canonical = `${BASE}/portfolio/${params.slug}`;
  const ogTitle = `${project.title} — Team Design Architects`;

  return {
    title: `${project.title} · ${project.location}`,
    description: desc,
    keywords: [
      project.type.toLowerCase() + ' architecture',
      `architect ${project.location}`,
      project.title,
      'Team Design Architects',
      'architecture India',
    ],
    alternates: { canonical },
    openGraph: {
      type: 'article',
      url: canonical,
      title: ogTitle,
      description: desc,
      siteName: 'Team Design Architects',
      ...(project.mainImage ? { images: [{ url: project.mainImage, width: 1200, height: 800, alt: project.mainImageAlt ?? project.title }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: desc,
      ...(project.mainImage ? { images: [project.mainImage] } : {}),
    },
  };
}

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const [project, allProjects, settings] = await Promise.all([
    getProjectBySlug(params.slug),
    getAllProjectsForNav(),
    getSiteSettings(),
  ]);
  const whatsapp = settings?.whatsapp ?? STUDIO.whatsappNumber;
  const email    = settings?.email    ?? STUDIO.email;

  if (!project) notFound();

  const TOTAL = allProjects.length;
  const idx = allProjects.findIndex(p => p.slug === params.slug);
  const nextProj = allProjects[(idx + 1) % TOTAL];

  const projectJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description.replace(/\n+/g, ' ').slice(0, 300),
    ...(project.mainImage ? { image: project.mainImage } : {}),
    dateCreated: String(project.year),
    locationCreated: { '@type': 'Place', name: project.location },
    author: { '@type': 'Organization', name: 'Team Design Architects', url: BASE },
    genre: project.type,
    url: `${BASE}/portfolio/${params.slug}`,
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',      item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Portfolio', item: `${BASE}/portfolio` },
      { '@type': 'ListItem', position: 3, name: project.title, item: `${BASE}/portfolio/${params.slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroImageWrap}>
          {project.mainImage ? (
            <Image
              src={project.mainImage}
              alt={project.mainImageAlt ?? `${project.title} — ${project.type} by Team Design Architects, ${project.location}`}
              fill
              priority
              sizes="100vw"
              style={{ objectFit: 'cover' }}
              placeholder="blur"
              blurDataURL={project.mainImageLqip ?? WARM_BLUR}
            />
          ) : (
            <div style={{ position: 'absolute', inset: 0, background: 'var(--color-surface)' }} />
          )}
          <div className={styles.heroOverlay} />
        </div>
      </section>

      {/* Project header */}
      <section className={styles.header}>
        <div className={styles.headerInner}>
          <Link href="/portfolio" className={styles.backLink}>← Portfolio</Link>
          <div className={styles.meta}>
            <span className={styles.metaItem}>{project.type}</span>
            <span className={styles.metaDot}>·</span>
            <span className={styles.metaItem}>{project.location}</span>
            <span className={styles.metaDot}>·</span>
            <span className={styles.metaItem}>{project.year}</span>
            <span className={styles.metaDot}>·</span>
            <span className={styles.metaItem}>{project.area}</span>
          </div>
          <h1 className={styles.title}>{project.title}</h1>
          {project.client && (
            <span className={styles.client}>Client: {project.client}</span>
          )}
        </div>
      </section>

      {/* Opening brief */}
      <div className={styles.openingBrief}>
        <p className={styles.openingBriefText}>
          {project.description.split('\n\n')[0]}
        </p>
      </div>

      {/* Project story */}
      <section className={styles.content}>
        <div className={styles.contentInner}>
          {project.description.split('\n\n').slice(1).map((para, i) => {
            const labels = ['The Approach', 'The Outcome'];
            const label = labels[i] ?? null;
            return (
              <div key={i} className={styles.storyBeat}>
                {label && <span className={styles.storyLabel}>{label}</span>}
                <p className={styles.para}>{para}</p>
              </div>
            );
          })}
        </div>

        <div className={styles.whatsappInline}>
          <a
            href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(`Hi, I'm interested in discussing a project similar to "${project.title}" (${project.location}). Can we connect?`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.whatsappInlineLink}
          >
            <WhatsAppIcon />
            Ask about this project on WhatsApp
          </a>
        </div>
      </section>

      {/* Editorial content blocks / gallery */}
      <ProjectContent
        contentBlocks={project.contentBlocks}
        gallery={project.gallery}
        projectTitle={project.title}
      />

      {/* Testimonial */}
      {project.testimonial && (
        <FadeIn direction="up">
          <section className={styles.testimonial}>
            <blockquote className={styles.quote}>
              &ldquo;{project.testimonial.quote}&rdquo;
            </blockquote>
            <div className={styles.quoteAuthor}>
              <span className={styles.authorName}>{project.testimonial.author}</span>
              <span className={styles.authorTitle}>{project.testimonial.title}</span>
            </div>
          </section>
        </FadeIn>
      )}

      {/* CTA */}
      <section className={styles.cta}>
        <p className={styles.ctaText}>Planning a similar project?</p>
        <h2 className={styles.ctaTitle}>Begin a conversation.</h2>
        <div className={styles.ctaLinks}>
          <a
            href={`https://wa.me/${whatsapp}`}
            className={styles.ctaWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp Studio →
          </a>
          <a href={`mailto:${email}`} className={styles.ctaEmail}>
            {email}
          </a>
        </div>
      </section>

      {/* Similar Projects — editor-curated first, then auto-discovered, then
          scored fallback from allProjects so the section never disappears */}
      {(() => {
        type Card = { slug: string; title: string; type: string; location: string; image: string | null; lqip: string | null };
        const seen = new Set<string>([params.slug]);
        const merged: Card[] = [];

        // 1. Editor-curated (highest priority)
        for (const r of project.related) {
          if (!seen.has(r.slug) && merged.length < 3) { merged.push(r); seen.add(r.slug); }
        }
        // 2. Auto-discovered via Sanity query (same location / same type)
        for (const r of project.autoRelated) {
          if (!seen.has(r.slug) && merged.length < 3) { merged.push(r); seen.add(r.slug); }
        }
        // 3. Scored fallback from allProjects (already fetched for prev/next nav)
        //    so the row never disappears even when Sanity autoRelated is empty
        if (merged.length < 4) {
          const scored = allProjects
            .filter(p => !seen.has(p.slug))
            .map(p => ({
              slug: p.slug, title: p.title, type: p.type,
              location: p.location, image: p.mainImage, lqip: p.mainImageLqip,
              score: (p.type === project.type ? 2 : 0) + (p.location === project.location ? 1 : 0),
            }))
            .sort((a, b) => b.score - a.score);
          for (const p of scored) {
            if (merged.length >= 4) break;
            merged.push(p);
            seen.add(p.slug);
          }
        }

        if (merged.length === 0) return null;

        // Contextual header
        const sharesCity = merged.some(r => r.location === project.location);
        const headerText = sharesCity
          ? `More projects in ${project.location}`
          : `More ${project.type} projects`;

        return (
          <section className={styles.related}>
            <div className={styles.relatedHeader}>
              <span className={styles.relatedEyebrow}>Continue Browsing</span>
              <h2 className={styles.relatedTitle}>{headerText}</h2>
            </div>
            <div className={styles.relatedGrid}>
              {merged.map((r) => r.image && (
                <Link key={r.slug} href={`/portfolio/${r.slug}`} className={styles.relatedCard}>
                  <div className={styles.relatedImage}>
                    <Image
                      src={r.image}
                      alt={`${r.title} — ${r.type} by Team Design Architects`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      style={{ objectFit: 'cover' }}
                      placeholder="blur"
                      blurDataURL={r.lqip ?? WARM_BLUR}
                    />
                  </div>
                  <span className={styles.relatedType}>{r.type}</span>
                  <span className={styles.relatedName}>{r.title}</span>
                  <span className={styles.relatedLocation}>{r.location}</span>
                </Link>
              ))}
            </div>
          </section>
        );
      })()}


    </>
  );
}
