import { cache } from 'react';
import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import type { ContentBlock } from '@/lib/types';
import snapshot from '@/lib/sanity-snapshot.json';

export type { ContentBlock } from '@/lib/types';

/**
 * Resilience helper. Tries the Sanity fetch; on failure or empty result
 * (when an empty fallback would mean "no content"), returns the build-time
 * snapshot instead. Logs the fall-back so deploy logs make it obvious.
 *
 * The snapshot is captured by scripts/snapshot-sanity.mjs which runs as
 * `prebuild`. If a snapshot couldn't be captured (Sanity also down at
 * build time and no previous snapshot exists), we degrade to an empty
 * shape rather than throwing.
 */
async function withFallback<T>(
  key: keyof typeof snapshot,
  fetcher: () => Promise<T>,
  treatEmptyAsFailure = true,
): Promise<T> {
  try {
    const fresh = await fetcher();
    const isEmpty = treatEmptyAsFailure && (
      (Array.isArray(fresh) && fresh.length === 0) ||
      fresh === null ||
      fresh === undefined
    );
    if (!isEmpty) return fresh;
    console.warn(`[Sanity] '${String(key)}' returned empty — using snapshot from ${snapshot.builtAt ?? 'unknown build'}`);
    return snapshot[key] as T;
  } catch (err) {
    console.error(`[Sanity] '${String(key)}' failed, using snapshot from ${snapshot.builtAt ?? 'unknown build'}:`, err);
    return snapshot[key] as T;
  }
}

// ─── Client ──────────────────────────────────────────────────────────────────

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';

if (!projectId) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID — set it in .env.local and Vercel environment variables.');
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
});

const builder = imageUrlBuilder(client);
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

/** Append Sanity CDN transform params for thumbnail use (card grids, nav, teams) */
export function thumbUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  if (!url.startsWith('https://cdn.sanity.io')) return url;
  return `${url}?w=800&q=72&auto=format&fit=max`;
}

/** Append Sanity CDN transform params for hero / full-width use */
export function heroUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  if (!url.startsWith('https://cdn.sanity.io')) return url;
  return `${url}?w=1600&q=82&auto=format&fit=max`;
}

// ─── Types ───────────────────────────────────────────────────────────────────

export interface SanityProject {
  slug: string;
  title: string;
  client: string;
  type: string;
  location: string;
  year: number;
  area: string;
  image: string | null;
  lqip: string | null;
}

export interface RelatedProjectCard {
  slug: string;
  title: string;
  type: string;
  location: string;
  image: string | null;
  lqip: string | null;
}

export interface SanityProjectDetail {
  title: string;
  client: string;
  type: string;
  location: string;
  year: number;
  area: string;
  description: string;
  mainImage: string | null;
  mainImageAlt: string | null;
  mainImageLqip: string | null;
  gallery: { url: string; alt: string | null }[];
  contentBlocks: ContentBlock[];
  testimonial: { quote: string; author: string; title: string } | null;
  /** Editor-curated related projects (Sanity reference array). Always wins. */
  related: RelatedProjectCard[];
  /** Auto-discovered: same location preferred, same type as fallback. */
  autoRelated: RelatedProjectCard[];
}

// ─── Site Settings ───────────────────────────────────────────────────────────

export interface SanitySiteSettings {
  phone: string;
  email: string;
  whatsapp: string;
  linkedinUrl: string;
  instagramUrl: string;
  yearsInPractice: string;
  projectCount: string;
  clientCount: string;
  sqftCompleted: string;
}

/** Global site settings — contact info & stats */
export async function getSiteSettings(): Promise<SanitySiteSettings | null> {
  return withFallback('settings', () => client.fetch(
    `*[_type == "siteSettings"][0] {
      phone, email, whatsapp, linkedinUrl, instagramUrl,
      yearsInPractice, projectCount, clientCount, sqftCompleted
    }`,
    {},
    { next: { tags: [CACHE_TAG] } }
  ), false /* settings is a single object, falsy is OK */);
}

// ─── Jobs ─────────────────────────────────────────────────────────────────────

export interface SanityJob {
  title: string;
  type: string;
  duration: string | null;
  brief: string;
  linkedinUrl: string | null;
}

/** Currently open job listings */
export async function getJobs(): Promise<SanityJob[]> {
  return withFallback('jobs', () => client.fetch(
    `*[_type == "job" && isOpen == true] | order(orderRank asc) {
      title, type, duration, brief, linkedinUrl
    }`,
    {},
    { next: { tags: [CACHE_TAG] } }
  ), false /* an empty job list is a valid live state */);
}

export interface SanityTestimonial {
  quote: string;
  name: string;
  title: string;
  project: string;
}

export interface SanityFeaturedProject {
  slug: string;
  title: string;
  client: string;
  type: string;
  location: string;
  image: string | null;
  lqip: string | null;
  tagline: string;
}

// ─── Content block transformer ────────────────────────────────────────────────
// Converts Sanity's schema types back to the ContentBlock type used by ProjectContent

interface RawSanityBlock {
  _type: string;
  text?: string;
  imageUrl?: string | null;
  imageAlt?: string | null;
  imageLqip?: string | null;
  caption?: string;
  imageLeftUrl?: string | null;
  imageLeftAlt?: string | null;
  imageLeftLqip?: string | null;
  captionLeft?: string;
  imageRightUrl?: string | null;
  imageRightAlt?: string | null;
  imageRightLqip?: string | null;
  captionRight?: string;
}

function transformContentBlocks(raw: RawSanityBlock[]): ContentBlock[] {
  if (!raw?.length) return [];
  return raw
    .map((block): ContentBlock | null => {
      switch (block._type) {
        case 'paragraphBlock':
          return { type: 'paragraph', text: block.text ?? '' };
        case 'pullQuoteBlock':
          return { type: 'pullQuote', text: block.text ?? '' };
        case 'fullWidthImageBlock':
          if (!block.imageUrl) return null;
          return { type: 'fullWidthImage', src: heroUrl(block.imageUrl) ?? block.imageUrl, alt: block.imageAlt, caption: block.caption, lqip: block.imageLqip };
        case 'halfWidthImagesBlock':
          if (!block.imageLeftUrl || !block.imageRightUrl) return null;
          return {
            type: 'halfWidthImages',
            images: [thumbUrl(block.imageLeftUrl) ?? block.imageLeftUrl, thumbUrl(block.imageRightUrl) ?? block.imageRightUrl],
            alts: [block.imageLeftAlt, block.imageRightAlt],
            captions: [block.captionLeft ?? '', block.captionRight ?? ''],
            lqips: [block.imageLeftLqip, block.imageRightLqip],
          };
        default:
          return null;
      }
    })
    .filter((b): b is ContentBlock => b !== null);
}

// ─── Queries ─────────────────────────────────────────────────────────────────

const CACHE_TAG = 'sanity';

/** All project slugs — for generateStaticParams */
export async function getAllProjectSlugs(): Promise<string[]> {
  return withFallback('projectSlugs', () => client.fetch(
    `*[_type == "project"].slug.current`,
    {},
    { next: { tags: [CACHE_TAG] } }
  ));
}

/** Full list for portfolio grid page — only published */
export async function getAllProjects(): Promise<SanityProject[]> {
  const rows = await withFallback<SanityProject[]>('projects', () => client.fetch(
    `*[_type == "project" && isPublished != false] | order(orderRank asc) {
      "slug": slug.current,
      title, client, "type": projectType, location, year, area,
      "image": mainImage.asset->url,
      "lqip": mainImage.asset->metadata.lqip
    }`,
    {},
    { next: { tags: [CACHE_TAG] } }
  ));
  // The snapshot stores raw URLs; the live fetch does too. Apply thumb
  // transformation either way so cards always get sized correctly.
  return rows.map((p) => ({ ...p, image: thumbUrl(p.image) }));
}

/** Single project detail page.
 *  Wrapped with React cache() so generateMetadata and the page component
 *  share the same result within one request — no double fetch to Sanity. */
export const getProjectBySlug = cache(async function getProjectBySlug(slug: string): Promise<SanityProjectDetail | null> {
  try {
    const raw = await client.fetch(
      `*[_type == "project" && slug.current == $slug][0] {
        title,
        client,
        "type": projectType,
        location,
        year,
        area,
        description,
        "mainImage": mainImage.asset->url,
        "mainImageAlt": mainImage.alt,
        "mainImageLqip": mainImage.asset->metadata.lqip,
        "gallery": gallery[]{ "url": asset->url, "alt": alt, "lqip": asset->metadata.lqip },
        "contentBlocks": contentBlocks[] {
          _type,
          text,
          "imageUrl": image.asset->url,
          "imageAlt": image.alt,
          "imageLqip": image.asset->metadata.lqip,
          caption,
          "imageLeftUrl": imageLeft.asset->url,
          "imageLeftAlt": imageLeft.alt,
          "imageLeftLqip": imageLeft.asset->metadata.lqip,
          captionLeft,
          "imageRightUrl": imageRight.asset->url,
          "imageRightAlt": imageRight.alt,
          "imageRightLqip": imageRight.asset->metadata.lqip,
          captionRight
        },
        "testimonial": testimonial-> {
          quote,
          "author": clientName,
          "title": clientTitle
        },
        "related": relatedProjects[]-> {
          "slug": slug.current,
          title,
          "type": projectType,
          location,
          "image": mainImage.asset->url,
          "lqip": mainImage.asset->metadata.lqip
        },
        // Auto-discovered related projects: same location preferred, same
        // projectType as fallback. select() pushes location matches to the
        // top so the renderer can show "More projects in <city>" first.
        "autoRelated": *[
          _type == "project"
          && isPublished != false
          && slug.current != ^.slug.current
          && (location == ^.location || projectType == ^.projectType)
        ] | order(
          select(location == ^.location => 0, 1),
          orderRank asc
        ) [0...6] {
          "slug": slug.current,
          title,
          "type": projectType,
          location,
          "image": mainImage.asset->url,
          "lqip": mainImage.asset->metadata.lqip
        }
      }`,
      { slug },
      { next: { tags: [CACHE_TAG] } }
    );

    if (!raw) return null;

    return {
      ...raw,
      mainImage: heroUrl(raw.mainImage),
      gallery: raw.gallery?.filter((g: { url: string | null }) => g?.url).map((g: { url: string; alt: string | null; lqip?: string | null }) => ({ ...g, url: thumbUrl(g.url) ?? g.url })) ?? [],
      contentBlocks: transformContentBlocks(raw.contentBlocks ?? []),
      related: raw.related?.filter(Boolean).map((r: RelatedProjectCard) => ({ ...r, image: thumbUrl(r.image) })) ?? [],
      autoRelated: raw.autoRelated?.filter(Boolean).map((r: RelatedProjectCard) => ({ ...r, image: thumbUrl(r.image) })) ?? [],
    };
  } catch (err) {
    console.error('[Sanity] getProjectBySlug failed:', err);
    return null;
  }
});

/** Lightweight list for prev/next navigation — only published */
export async function getAllProjectsForNav(): Promise<{ slug: string; title: string; type: string; location: string; mainImage: string | null; mainImageLqip: string | null }[]> {
  type NavRow = { slug: string; title: string; type: string; location: string; mainImage: string | null; mainImageLqip: string | null };
  const rows = await withFallback<NavRow[]>('navProjects', () => client.fetch(
    `*[_type == "project" && isPublished != false] | order(orderRank asc) {
      "slug": slug.current,
      title, "type": projectType, location,
      "mainImage": mainImage.asset->url,
      "mainImageLqip": mainImage.asset->metadata.lqip
    }`,
    {},
    { next: { tags: [CACHE_TAG] } }
  ));
  return rows.map((item) => ({ ...item, mainImage: thumbUrl(item.mainImage) }));
}

/** Featured projects for homepage grid — only published */
export async function getFeaturedProjects(): Promise<SanityFeaturedProject[]> {
  const rows = await withFallback<SanityFeaturedProject[]>('featured', () => client.fetch(
    `*[_type == "project" && isPublished != false && isFeatured == true] | order(orderRank asc) [0...4] {
      "slug": slug.current,
      title, client, "type": projectType, location,
      "image": mainImage.asset->url,
      "lqip": mainImage.asset->metadata.lqip,
      "tagline": shortDescription
    }`,
    {},
    { next: { tags: [CACHE_TAG] } }
  ));
  return rows.map((p) => ({ ...p, image: thumbUrl(p.image) }));
}

// ─── Team Member types & query ───────────────────────────────────────────────

export interface SanityTeamMember {
  name: string;
  role: string;
  tier: 'principal' | 'featured' | 'core' | 'operations';
  bio: string | null;
  education: string | null;
  award: string | null;
  founding: number | null;
  photoUrl: string | null;
  photoAlt: string | null;
  photoLqip: string | null;
  orderRank: number;
}

/** All team members ordered by display rank */
export async function getTeamMembers(): Promise<SanityTeamMember[]> {
  const rows = await withFallback<SanityTeamMember[]>('teamMembers', () => client.fetch(
    `*[_type == "teamMember"] | order(orderRank asc) {
      name, role, tier, bio, education, award, founding,
      "photoUrl": photo.asset->url,
      "photoAlt": photo.alt,
      "photoLqip": photo.asset->metadata.lqip,
      orderRank
    }`,
    {},
    { next: { tags: [CACHE_TAG] } }
  ));
  return rows.map((m) => ({ ...m, photoUrl: thumbUrl(m.photoUrl) }));
}

/** Testimonials for homepage slider */
export async function getTestimonials(): Promise<SanityTestimonial[]> {
  return withFallback<SanityTestimonial[]>('testimonials', () => client.fetch(
    `*[_type == "testimonial"] | order(orderRank asc) {
      quote,
      "name": clientName,
      "title": clientTitle,
      "project": projectName
    }`,
    {},
      { next: { tags: [CACHE_TAG] } }
  ));
}
