import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import styles from '../../work/[slug]/page.module.css';
import FadeIn from '@/components/FadeIn';
import { PROJECT_DATA, FALLBACK } from '@/lib/projectData';

const INTERIOR_SLUGS = [
  'womens-bank-branch-srinagar',
  'show-flat-mumbai',
  'unilazer-ventures-office',
  'jk-bank-nbc-bkc',
  'high-networth-branch-shopian',
  'hdfc-bank-office-jammu',
  'garden-glory-penthouse-thane',
  'airport-lounge-srinagar',
  'exclusive-villa-mumbai',
  'electronic-bank-lobby-srinagar',
  'kishore-mariwala-home-mumbai',
  'gordon-serrao-home-navi-mumbai',
  'cinemarc-cinema-theatre',
];

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = PROJECT_DATA[params.slug];
  if (!project) return { title: 'Project' };
  return {
    title: project.title,
    description: `${project.type} · ${project.location} · ${project.year} — Team Design Architects`,
  };
}

export function generateStaticParams() {
  return INTERIOR_SLUGS.map((slug) => ({ slug }));
}

export default function InteriorDetailPage({ params }: { params: { slug: string } }) {
  const project = PROJECT_DATA[params.slug] ?? {
    ...FALLBACK,
    title: params.slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
  };

  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroImageWrap}>
          <Image
            src={project.mainImage}
            alt={project.title}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover' }}
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
            href={`https://wa.me/919876543210?text=${encodeURIComponent(`Hi, I'm interested in discussing a project similar to "${project.title}" (${project.location}). Can we connect?`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.whatsappInlineLink}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.128.558 4.122 1.533 5.851L.057 23.776a.75.75 0 0 0 .94.94l5.925-1.476A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.659-.528-5.168-1.444l-.37-.223-3.815.95.968-3.739-.245-.387A9.952 9.952 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
            Ask about this project on WhatsApp
          </a>
        </div>
      </section>

      {/* Gallery */}
      {project.gallery.length > 0 && (
        <FadeIn direction="up" threshold={0.05}>
          <section className={styles.gallery}>
            {project.gallery.map((src, i) => (
              <div
                key={i}
                className={`${styles.galleryItem} ${i % 3 === 0 ? styles.galleryFull : ''}`}
              >
                <Image
                  src={src}
                  alt={`${project.title} — image ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            ))}
          </section>
        </FadeIn>
      )}

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
            href="https://wa.me/919876543210"
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
                    alt={r.title}
                    fill
                    sizes="33vw"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <span className={styles.relatedType}>{r.type}</span>
                <span className={styles.relatedName}>{r.title}</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
