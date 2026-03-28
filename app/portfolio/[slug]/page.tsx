export const revalidate = 0;

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
  const position = idx + 1;
  const prevProj = allProjects[(idx - 1 + TOTAL) % TOTAL];
  const nextProj = allProjects[(idx + 1) % TOTAL];

  const projectJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description.replace(/\n+/g, ' ').slice(0, 300),
    ...(project.mainImage ? { image: project.mainImage } : {}),
    dateCreated: String(project.year),
    locationCreated: { '@type': 'Place', name: project.location },
    author: { '@type': 'Organization', name: 'Team Design Architects', url: 'https://teamdesign.in' },
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

      {/* Related */}
      {project.related.length > 0 && (
        <section className={styles.related}>
          <div className={styles.relatedHeader}>
            <span className="label">Continue Browsing</span>
            <h2 className={styles.relatedTitle}>Related Projects</h2>
          </div>
          <div className={styles.relatedGrid}>
            {project.related.map((r) => r.image && (
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
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Project nav */}
      <nav className={styles.projectNav}>
        <Link href={`/portfolio/${prevProj.slug}`} className={styles.projectNavPrev}>
          <span>←</span><span>{prevProj.title}</span>
        </Link>
        <span className={styles.projectNavCounter}>{position} / {TOTAL}</span>
        <Link href="/portfolio" className={styles.projectNavAll}>
          <span>Portfolio</span><span>→</span>
        </Link>
      </nav>

      {/* Next Project */}
      <Link href={`/portfolio/${nextProj.slug}`} className={styles.nextProject}>
        <div className={styles.nextProjectImageWrap}>
          {nextProj.mainImage ? (
            <Image
              src={nextProj.mainImage}
              alt={nextProj.title}
              fill
              sizes="100vw"
              style={{ objectFit: 'cover' }}
              placeholder="blur"
              blurDataURL={nextProj.mainImageLqip ?? WARM_BLUR}
              className={styles.nextProjectImage}
            />
          ) : (
            <div style={{ position: 'absolute', inset: 0, background: 'var(--color-surface)' }} />
          )}
          <div className={styles.nextProjectOverlay} />
        </div>
        <div className={styles.nextProjectContent}>
          <span className={styles.nextProjectLabel}>{position === TOTAL ? 'Back to Start' : 'Next Project'}</span>
          <span className={styles.nextProjectTitle}>{nextProj.title}</span>
          <span className={styles.nextProjectMeta}>{nextProj.type} · {nextProj.location}</span>
        </div>
      </Link>
    </>
  );
}
