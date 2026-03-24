import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import styles from './page.module.css';
import FadeIn from '@/components/FadeIn';
import FadeImage from '@/components/FadeImage';
import WhatsAppIcon from '@/components/icons/WhatsAppIcon';
import StickyProjectCTA from '@/components/StickyProjectCTA';
import { PROJECT_DATA, FALLBACK, type ContentBlock } from '@/lib/projectData';
import { STUDIO, WARM_BLUR } from '@/lib/siteContent';

const ALL_SLUGS = Object.keys(PROJECT_DATA);

// Next project (wraps around)
function getNextProject(currentSlug: string) {
  const idx = ALL_SLUGS.indexOf(currentSlug);
  const nextSlug = ALL_SLUGS[(idx + 1) % ALL_SLUGS.length];
  return { slug: nextSlug, ...PROJECT_DATA[nextSlug] };
}

const BASE = STUDIO.site;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = PROJECT_DATA[params.slug];
  if (!project) return { title: 'Project Not Found' };

  const desc = project.description.replace(/\n+/g, ' ').slice(0, 155).trim();
  const canonical = `${BASE}/work/${params.slug}`;
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
      images: [{ url: project.mainImage, width: 1200, height: 800, alt: project.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: desc,
      images: [project.mainImage],
    },
  };
}

export function generateStaticParams() {
  return ALL_SLUGS.map((slug) => ({ slug }));
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = PROJECT_DATA[params.slug] ?? {
    ...FALLBACK,
    title: params.slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
  };

  const nextProj = getNextProject(params.slug);

  const projectJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description.replace(/\n+/g, ' ').slice(0, 300),
    image: project.mainImage,
    dateCreated: String(project.year),
    locationCreated: {
      '@type': 'Place',
      name: project.location,
    },
    author: {
      '@type': 'Organization',
      name: 'Team Design Architects',
      url: 'https://teamdesign.in',
    },
    genre: project.type,
    url: `${BASE}/work/${params.slug}`,
  };

  const whatsappHref = `https://wa.me/${STUDIO.whatsappNumber}?text=${encodeURIComponent(`Hi, I'm interested in discussing a project similar to "${project.title}" (${project.location}). Can we connect?`)}`;

  return (
    <>
      <StickyProjectCTA href={whatsappHref} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroImageWrap}>
          <Image
            src={project.mainImage}
            alt={`${project.title} — ${project.type} by Team Design Architects, ${project.location}`}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover' }}
            placeholder="blur"
            blurDataURL={WARM_BLUR}
          />
          <div className={styles.heroOverlay} />
        </div>
      </section>

      {/* Project header */}
      <section className={styles.header}>
        <div className={styles.headerInner}>
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

      {/* Opening brief — first paragraph displayed large */}
      <div className={styles.openingBrief}>
        <p className={styles.openingBriefText}>
          {project.description.split('\n\n')[0]}
        </p>
      </div>

      {/* Project Story — Challenge / Strategy / Result */}
      <section className={styles.content}>
        <div className={styles.contentInner}>
          {project.description.split('\n\n').map((para, i) => {
            const labels = ['The Brief', 'The Approach', 'The Outcome'];
            const label = labels[i] ?? null;
            return (
              <div key={i} className={styles.storyBeat}>
                {label && <span className={styles.storyLabel}>{label}</span>}
                <p className={styles.para}>{para}</p>
              </div>
            );
          })}
        </div>

        {/* Inline WhatsApp — project-specific */}
        <div className={styles.whatsappInline}>
          <a
            href={`https://wa.me/${STUDIO.whatsappNumber}?text=${encodeURIComponent(`Hi, I'm interested in discussing a project similar to "${project.title}" (${project.location}). Can we connect?`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.whatsappInlineLink}
          >
            <WhatsAppIcon />
            Ask about this project on WhatsApp
          </a>
        </div>
      </section>

      {/* Editorial content blocks — replaces gallery when defined for a project */}
      {project.contentBlocks && project.contentBlocks.length > 0 ? (
        <section className={styles.blocks}>
          {project.contentBlocks.map((block: ContentBlock, i: number) => {
            switch (block.type) {
              case 'paragraph':
                return (
                  <FadeIn key={i} direction="up">
                    <div className={styles.blockPara}>
                      <p className={styles.blockParaText}>{block.text}</p>
                    </div>
                  </FadeIn>
                );
              case 'fullWidthImage':
                return (
                  <FadeIn key={i} direction="up" threshold={0.05}>
                    <div className={styles.blockFullImage}>
                      <div className={styles.blockFullImageWrap}>
                        <FadeImage
                          src={block.src}
                          alt={block.caption ?? `${project.title} — image ${i + 1}`}
                          fill
                          sizes="100vw"
                          style={{ objectFit: 'cover' }}
                          placeholder="blur"
                          blurDataURL={WARM_BLUR}
                        />
                      </div>
                      {block.caption && (
                        <span className={styles.blockCaption}>{block.caption}</span>
                      )}
                    </div>
                  </FadeIn>
                );
              case 'halfWidthImages':
                return (
                  <FadeIn key={i} direction="up" threshold={0.05}>
                    <div className={styles.blockHalf}>
                      {block.images.map((src, j) => (
                        <div key={j} className={styles.blockHalfItem}>
                          <div className={styles.blockHalfImageWrap}>
                            <FadeImage
                              src={src}
                              alt={block.captions?.[j] ?? `${project.title} — image ${j + 1}`}
                              fill
                              sizes="50vw"
                              style={{ objectFit: 'cover' }}
                              placeholder="blur"
                              blurDataURL={WARM_BLUR}
                            />
                          </div>
                          {block.captions?.[j] && (
                            <span className={styles.blockCaption}>{block.captions[j]}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </FadeIn>
                );
              case 'pullQuote':
                return (
                  <FadeIn key={i} direction="up">
                    <div className={styles.blockPullQuote}>
                      <blockquote className={styles.blockPullQuoteText}>
                        &ldquo;{block.text}&rdquo;
                      </blockquote>
                    </div>
                  </FadeIn>
                );
              default:
                return null;
            }
          })}
        </section>
      ) : project.gallery.length > 0 ? (
        <FadeIn direction="up" threshold={0.05}>
          <section className={styles.gallery}>
            {project.gallery.map((src, i) => (
              <div
                key={i}
                className={`${styles.galleryItem} ${i % 3 === 0 ? styles.galleryFull : ''}`}
              >
                <Image
                  src={src}
                  alt={`${project.title}, ${project.location} — gallery image ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }}
                  placeholder="blur"
                  blurDataURL={WARM_BLUR}
                />
              </div>
            ))}
          </section>
        </FadeIn>
      ) : null}

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
            href={`https://wa.me/${STUDIO.whatsappNumber}`}
            className={styles.ctaWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp Studio →
          </a>
          <Link href="/contact" className={styles.ctaContact}>
            Or use the contact form
          </Link>
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
            {project.related.map((r) => (
              <Link key={r.slug} href={`/work/${r.slug}`} className={styles.relatedCard}>
                <div className={styles.relatedImage}>
                  <Image
                    src={r.image}
                    alt={`${r.title} — ${r.type} by Team Design Architects`}
                    fill
                    sizes="33vw"
                    style={{ objectFit: 'cover' }}
                    placeholder="blur"
                    blurDataURL={WARM_BLUR}
                  />
                </div>
                <span className={styles.relatedType}>{r.type}</span>
                <span className={styles.relatedName}>{r.title}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Next Project */}
      <Link href={`/work/${nextProj.slug}`} className={styles.nextProject}>
        <div className={styles.nextProjectImageWrap}>
          <Image
            src={nextProj.mainImage}
            alt={nextProj.title}
            fill
            sizes="100vw"
            style={{ objectFit: 'cover' }}
            placeholder="blur"
            blurDataURL={WARM_BLUR}
            className={styles.nextProjectImage}
          />
          <div className={styles.nextProjectOverlay} />
        </div>
        <div className={styles.nextProjectContent}>
          <span className={styles.nextProjectLabel}>Next Project</span>
          <span className={styles.nextProjectTitle}>{nextProj.title}</span>
          <span className={styles.nextProjectMeta}>{nextProj.type} · {nextProj.location}</span>
        </div>
      </Link>
    </>
  );
}
