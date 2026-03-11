import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import styles from './page.module.css';

// ─── Static project data ──────────────────────────────────────────────────────
// Replace with Sanity data fetch once CMS is connected.
// Format: slug → project data

interface RelatedProject {
  slug: string;
  title: string;
  type: string;
  image: string;
}

interface Testimonial {
  quote: string;
  author: string;
  title: string;
}

interface Project {
  title: string;
  client: string;
  type: string;
  location: string;
  year: number;
  area: string;
  description: string;
  mainImage: string;
  gallery: string[];
  testimonial: Testimonial | null;
  related: RelatedProject[];
}

const PROJECT_DATA: Record<string, Project> = {
  'mont-blanc-mariwala-residence': {
    title: 'Mont Blanc Residence',
    client: 'Kishore Mariwala',
    type: 'Residential',
    location: 'August Kranti Marg, Mumbai',
    year: 2012,
    area: '8,200 sq ft',
    description: `A private residence commissioned by Kishore Mariwala — founder of Marico — on one of South Mumbai's most prestigious addresses. The brief was to design a home that balanced the scale and quality appropriate to its context with a genuine sense of warmth and livability.

The design responds to the site's orientation and the client's daily rhythms. Principal living spaces are arranged to capture morning light, while the primary bedroom sequence is oriented away from the street. Materials were selected for their tactile quality as much as their visual presence — natural stone, warm timber, and hand-finished plaster finishes that improve with age.

The project was delivered on time and within budget, as attested in the client's testimonial, and remains one of the firm's most personally meaningful commissions.`,
    mainImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=2000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&q=80',
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1200&q=80',
    ],
    testimonial: {
      quote: 'Team Design managed the entire project lifecycle — from concept and design to contractor management, budget adherence, and on-time delivery. The result exceeded every expectation.',
      author: 'Kishore Mariwala',
      title: 'Founder, Marico',
    },
    related: [
      { slug: 'unilazer-ventures-office', title: 'Unilazer Ventures Office', type: 'Commercial', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80' },
      { slug: 'villa-lonavala', title: 'Weekend Villa, Lonavala', type: 'Residential', image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80' },
      { slug: 'bungalow-tirupur', title: 'Private Bungalow, Tirupur', type: 'Residential', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80' },
    ],
  },
  'unilazer-ventures-office': {
    title: 'Unilazer Ventures Office',
    client: 'Ronnie Screwvala',
    type: 'Commercial',
    location: 'Mumbai',
    year: 2015,
    area: '4,500 sq ft',
    description: `Commissioned by Ronnie Screwvala — founder of UTV and UpGrad — this office fitout for Unilazer Ventures was designed as a workspace that reflects both creative ambition and operational discipline.

The brief called for an environment that could accommodate both focused individual work and collaborative team sessions without the two modes bleeding into one another. The solution layers private alcoves against a central open floor, with material transitions — from warm timber to exposed concrete — signalling the shift between modes.

The result is a workspace that performs as its owner works: with rigour, clarity, and a quiet confidence that doesn't need to announce itself.`,
    mainImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=2000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1497366754035-f200586c52a8?w=1200&q=80',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&q=80',
    ],
    testimonial: null,
    related: [
      { slug: 'mont-blanc-mariwala-residence', title: 'Mont Blanc Residence', type: 'Residential', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80' },
      { slug: 'jk-bank-business-centre', title: 'National Business Centre', type: 'Commercial', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80' },
      { slug: 'villa-lonavala', title: 'Weekend Villa, Lonavala', type: 'Residential', image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80' },
    ],
  },
  'jk-bank-business-centre': {
    title: 'National Business Centre',
    client: 'J&K Bank',
    type: 'Commercial',
    location: 'BKC, Mumbai',
    year: 2018,
    area: '22,000 sq ft',
    description: `J&K Bank's National Business Centre in BKC — Mumbai's central financial district — required a workspace that carried the weight of institutional credibility while remaining welcoming to the bank's diverse client base.

At 22,000 sq ft across multiple floors, the project demanded a coherent design language that could hold together across scale: from the imposing double-height banking hall to the more intimate private consultation rooms on the upper floors.

The palette is deliberately restrained — limestone, dark timber, and polished metal — allowing the architecture to provide the assurance that a financial institution requires without straying into the cold formalism that too often defines banking interiors.`,
    mainImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=2000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=1200&q=80',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&q=80',
    ],
    testimonial: null,
    related: [
      { slug: 'unilazer-ventures-office', title: 'Unilazer Ventures Office', type: 'Commercial', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80' },
      { slug: 'itm-college-navi-mumbai', title: 'ITM College Extension', type: 'Institutional', image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=600&q=80' },
      { slug: 'mont-blanc-mariwala-residence', title: 'Mont Blanc Residence', type: 'Residential', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80' },
    ],
  },
  'itm-college-navi-mumbai': {
    title: 'ITM College Extension',
    client: 'ITM Group',
    type: 'Institutional',
    location: 'Navi Mumbai',
    year: 2016,
    area: '45,000 sq ft',
    description: `The ITM College Extension in Navi Mumbai added 45,000 sq ft of academic and support facilities to an existing campus. The challenge was to integrate a substantial new building into a campus that had evolved organically over two decades.

The design establishes a dialogue with the existing structures through shared material references while introducing a clearer organisational logic — a central spine that connects new and old, with faculty offices and seminar rooms branching off either side.

The project was followed, in 2017, by the adjacent MBA Hostel Towers, which brought a further 68,000 sq ft of student accommodation to the same campus.`,
    mainImage: 'https://images.unsplash.com/photo-1562774053-701939374585?w=2000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&q=80',
      'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&q=80',
    ],
    testimonial: null,
    related: [
      { slug: 'mba-hostel-towers', title: 'MBA Hostel Towers', type: 'Institutional', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80' },
      { slug: 'jk-bank-business-centre', title: 'National Business Centre', type: 'Commercial', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80' },
      { slug: 'kalimata-temple-kharghar', title: 'Kalimata Temple', type: 'Institutional', image: 'https://images.unsplash.com/photo-1568085756714-1588610b0d2b?w=600&q=80' },
    ],
  },
  'kalimata-temple-kharghar': {
    title: 'Kalimata Temple',
    client: 'Temple Trust',
    type: 'Institutional',
    location: 'Kharghar, Navi Mumbai',
    year: 2014,
    area: '12,000 sq ft',
    description: `The Kalimata Temple at Kharghar required a design that honoured the spiritual gravity of its programme while serving a large and growing devotee community.

The design draws on the formal vocabulary of Hindu temple architecture — the vertical hierarchy of the shikara, the processional logic of the mandapa — while translating it into a contemporary material language. The building is designed to be experienced as much as seen: the transition from the bright forecourt into the cool dim of the sanctum, the quality of light at different times of day, the acoustic character of the space under prayer.

The temple has become a significant community landmark in Kharghar since its completion.`,
    mainImage: 'https://images.unsplash.com/photo-1568085756714-1588610b0d2b?w=2000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
    ],
    testimonial: null,
    related: [
      { slug: 'itm-college-navi-mumbai', title: 'ITM College Extension', type: 'Institutional', image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=600&q=80' },
      { slug: 'mba-hostel-towers', title: 'MBA Hostel Towers', type: 'Institutional', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80' },
      { slug: 'mont-blanc-mariwala-residence', title: 'Mont Blanc Residence', type: 'Residential', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80' },
    ],
  },
  'bungalow-tirupur': {
    title: 'Private Bungalow',
    client: 'Private Client',
    type: 'Residential',
    location: 'Tirupur, Tamil Nadu',
    year: 2019,
    area: '5,800 sq ft',
    description: `A private family residence in Tirupur, Tamil Nadu — a project that required sensitivity to both the client's cultural context and the climatic demands of the region.

The design orientates the main living spaces to catch the prevailing breeze, with deep overhangs that shade the glazed elevations from direct sun while admitting diffused light throughout the day. A central courtyard provides natural ventilation to the interior rooms.

Materials are local: Kadappa stone for the floors, Athangudi tiles in the formal rooms, and a lime render finish on the exterior that improves with weathering.`,
    mainImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=2000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80',
      'https://images.unsplash.com/photo-1600566752734-2a0cd26b1ac4?w=1200&q=80',
    ],
    testimonial: null,
    related: [
      { slug: 'mont-blanc-mariwala-residence', title: 'Mont Blanc Residence', type: 'Residential', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80' },
      { slug: 'villa-lonavala', title: 'Weekend Villa, Lonavala', type: 'Residential', image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80' },
      { slug: 'unilazer-ventures-office', title: 'Unilazer Ventures Office', type: 'Commercial', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80' },
    ],
  },
  'mba-hostel-towers': {
    title: 'MBA Hostel Towers',
    client: 'ITM Group',
    type: 'Institutional',
    location: 'Navi Mumbai',
    year: 2017,
    area: '68,000 sq ft',
    description: `The MBA Hostel Towers at ITM Group's Navi Mumbai campus accommodates 400+ postgraduate students across two towers, linked by a shared podium of common facilities.

Student accommodation at this scale risks becoming anonymous. The design resists this through a careful treatment of the common spaces — the ground-floor courtyard, the sky terraces at alternate floors, the social kitchen alcoves — that give each resident a sense of neighbourhood within the larger building.

The project followed the successful completion of the ITM College Extension in 2016 and represents the final phase of Team Design's decade-long involvement with the ITM campus.`,
    mainImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=2000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1562774053-701939374585?w=1200&q=80',
    ],
    testimonial: null,
    related: [
      { slug: 'itm-college-navi-mumbai', title: 'ITM College Extension', type: 'Institutional', image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=600&q=80' },
      { slug: 'jk-bank-business-centre', title: 'National Business Centre', type: 'Commercial', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80' },
      { slug: 'kalimata-temple-kharghar', title: 'Kalimata Temple', type: 'Institutional', image: 'https://images.unsplash.com/photo-1568085756714-1588610b0d2b?w=600&q=80' },
    ],
  },
  'villa-lonavala': {
    title: 'Weekend Villa',
    client: 'Private Client',
    type: 'Residential',
    location: 'Lonavala, Maharashtra',
    year: 2021,
    area: '4,200 sq ft',
    description: `A weekend retreat in Lonavala, designed for a Mumbai family seeking complete separation from city life. The brief was unambiguous: a house that disappears into its hillside site, opens generously to the valley views, and makes no demand on its occupants to maintain or manage it.

The building is organised along a single east–west bar, with all principal rooms oriented to face the valley. The roof is a gentle slope that follows the hillside grade, so that from the approach road the house reads as a low-profile extension of the terrain rather than an imposition on it.

Materials were selected for their durability with minimal maintenance: exposed board-formed concrete, local basalt stone, and Western red cedar cladding that will silver with age.`,
    mainImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=2000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80',
    ],
    testimonial: null,
    related: [
      { slug: 'mont-blanc-mariwala-residence', title: 'Mont Blanc Residence', type: 'Residential', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80' },
      { slug: 'bungalow-tirupur', title: 'Private Bungalow, Tirupur', type: 'Residential', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80' },
      { slug: 'unilazer-ventures-office', title: 'Unilazer Ventures Office', type: 'Commercial', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80' },
    ],
  },
};

const ALL_SLUGS = Object.keys(PROJECT_DATA);

const FALLBACK: Project = {
  title: 'Project',
  client: 'Private Client',
  type: 'Architecture',
  location: 'Mumbai',
  year: 2020,
  area: '—',
  description: 'Project details coming soon.',
  mainImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=2000&q=85',
  gallery: [],
  testimonial: null,
  related: [],
};

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = PROJECT_DATA[params.slug];
  if (!project) return { title: 'Project' };
  return {
    title: project.title,
    description: `${project.type} · ${project.location} · ${project.year} — Team Design Architects`,
  };
}

// ─── Static params (pre-renders all known slugs at build time) ────────────────

export function generateStaticParams() {
  return ALL_SLUGS.map((slug) => ({ slug }));
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
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

      {/* Description */}
      <section className={styles.content}>
        <div className={styles.contentInner}>
          {project.description.split('\n\n').map((para, i) => (
            <p key={i} className={styles.para}>{para}</p>
          ))}
        </div>
      </section>

      {/* Gallery */}
      {project.gallery.length > 0 && (
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
      )}

      {/* Testimonial */}
      {project.testimonial && (
        <section className={styles.testimonial}>
          <blockquote className={styles.quote}>
            &ldquo;{project.testimonial.quote}&rdquo;
          </blockquote>
          <div className={styles.quoteAuthor}>
            <span className={styles.authorName}>{project.testimonial.author}</span>
            <span className={styles.authorTitle}>{project.testimonial.title}</span>
          </div>
        </section>
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
