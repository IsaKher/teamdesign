import { cache } from 'react';
import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import type { ContentBlock } from '@/lib/projectData';

// ─── Client ──────────────────────────────────────────────────────────────────

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'il220i1c',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
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
  related: { slug: string; title: string; type: string; image: string | null; lqip: string | null }[];
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
  try {
    return await client.fetch(
      `*[_type == "siteSettings"][0] {
        phone,
        email,
        whatsapp,
        linkedinUrl,
        instagramUrl,
        yearsInPractice,
        projectCount,
        clientCount,
        sqftCompleted
      }`,
      {},
      { next: { tags: [CACHE_TAG] } }
    );
  } catch (err) {
    console.error('[Sanity] getSiteSettings failed:', err);
    return null;
  }
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
  try {
    return await client.fetch(
      `*[_type == "job" && isOpen == true] | order(orderRank asc) {
        title,
        type,
        duration,
        brief,
        linkedinUrl
      }`,
      {},
      { next: { tags: [CACHE_TAG] } }
    );
  } catch (err) {
    console.error('[Sanity] getJobs failed:', err);
    return [];
  }
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
  try {
    return await client.fetch(
      `*[_type == "project"].slug.current`,
      {},
      { next: { tags: [CACHE_TAG] } }
    );
  } catch (err) {
    console.error('[Sanity] getAllProjectSlugs failed:', err);
    return [];
  }
}

/** Full list for portfolio grid page — only published */
export async function getAllProjects(): Promise<SanityProject[]> {
  try {
    const rows = await client.fetch(
      `*[_type == "project" && isPublished == true] | order(orderRank asc) {
        "slug": slug.current,
        title,
        client,
        "type": projectType,
        location,
        year,
        area,
        "image": mainImage.asset->url,
        "lqip": mainImage.asset->metadata.lqip
      }`,
      {},
      { next: { tags: [CACHE_TAG] } }
    );
    return rows.map((p: SanityProject) => ({ ...p, image: thumbUrl(p.image) }));
  } catch (err) {
    console.error('[Sanity] getAllProjects failed:', err);
    return [];
  }
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
      related: raw.related?.filter(Boolean).map((r: { slug: string; title: string; type: string; image: string | null; lqip: string | null }) => ({ ...r, image: thumbUrl(r.image) })) ?? [],
    };
  } catch (err) {
    console.error('[Sanity] getProjectBySlug failed:', err);
    return null;
  }
});

/** Lightweight list for prev/next navigation — only published */
export async function getAllProjectsForNav(): Promise<{ slug: string; title: string; type: string; location: string; mainImage: string | null; mainImageLqip: string | null }[]> {
  try {
    const rows = await client.fetch(
      `*[_type == "project" && isPublished == true] | order(orderRank asc) {
        "slug": slug.current,
        title,
        "type": projectType,
        location,
        "mainImage": mainImage.asset->url,
        "mainImageLqip": mainImage.asset->metadata.lqip
      }`,
      {},
      { next: { tags: [CACHE_TAG] } }
    );
    return rows.map((item: { slug: string; title: string; type: string; location: string; mainImage: string | null; mainImageLqip: string | null }) => ({ ...item, mainImage: thumbUrl(item.mainImage) }));
  } catch (err) {
    console.error('[Sanity] getAllProjectsForNav failed:', err);
    return [];
  }
}

/** Featured projects for homepage grid — only published */
export async function getFeaturedProjects(): Promise<SanityFeaturedProject[]> {
  try {
    const rows = await client.fetch(
      `*[_type == "project" && isPublished == true && isFeatured == true] | order(orderRank asc) [0...4] {
        "slug": slug.current,
        title,
        client,
        "type": projectType,
        location,
        "image": mainImage.asset->url,
        "lqip": mainImage.asset->metadata.lqip,
        "tagline": shortDescription
      }`,
      {},
      { next: { tags: [CACHE_TAG] } }
    );
    return rows.map((p: SanityFeaturedProject) => ({ ...p, image: thumbUrl(p.image) }));
  } catch (err) {
    console.error('[Sanity] getFeaturedProjects failed:', err);
    return [];
  }
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
  try {
    const rows = await client.fetch(
      `*[_type == "teamMember"] | order(orderRank asc) {
        name,
        role,
        tier,
        bio,
        education,
        award,
        founding,
        "photoUrl": photo.asset->url,
        "photoAlt": photo.alt,
        "photoLqip": photo.asset->metadata.lqip,
        orderRank
      }`,
      {},
      { next: { tags: [CACHE_TAG] } }
    );
    return rows.map((m: SanityTeamMember) => ({ ...m, photoUrl: thumbUrl(m.photoUrl) }));
  } catch (err) {
    console.error('[Sanity] getTeamMembers failed:', err);
    return [];
  }
}

/** Testimonials for homepage slider */
export async function getTestimonials(): Promise<SanityTestimonial[]> {
  try {
    return await client.fetch(
      `*[_type == "testimonial"] | order(orderRank asc) {
        quote,
        "name": clientName,
        "title": clientTitle,
        "project": projectName
      }`,
      {},
      { next: { tags: [CACHE_TAG] } }
    );
  } catch (err) {
    console.error('[Sanity] getTestimonials failed:', err);
    return [];
  }
}
