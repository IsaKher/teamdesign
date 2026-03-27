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
  gallery: string[];
  contentBlocks: ContentBlock[];
  testimonial: { quote: string; author: string; title: string } | null;
  related: { slug: string; title: string; type: string; image: string | null }[];
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
  tagline: string;
}

// ─── Content block transformer ────────────────────────────────────────────────
// Converts Sanity's schema types back to the ContentBlock type used by ProjectContent

interface RawSanityBlock {
  _type: string;
  text?: string;
  imageUrl?: string | null;
  caption?: string;
  imageLeftUrl?: string | null;
  captionLeft?: string;
  imageRightUrl?: string | null;
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
          return { type: 'fullWidthImage', src: block.imageUrl, caption: block.caption };
        case 'halfWidthImagesBlock':
          if (!block.imageLeftUrl || !block.imageRightUrl) return null;
          return {
            type: 'halfWidthImages',
            images: [block.imageLeftUrl, block.imageRightUrl],
            captions: [block.captionLeft ?? '', block.captionRight ?? ''],
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
  return client.fetch(
    `*[_type == "project"].slug.current`,
    {},
    { next: { tags: [CACHE_TAG] } }
  );
}

/** Full list for portfolio grid page — only published */
export async function getAllProjects(): Promise<SanityProject[]> {
  return client.fetch(
    `*[_type == "project" && isPublished == true] | order(orderRank asc) {
      "slug": slug.current,
      title,
      client,
      "type": projectType,
      location,
      year,
      area,
      "image": mainImage.asset->url
    }`,
    {},
    { next: { tags: [CACHE_TAG] } }
  );
}

/** Single project detail page */
export async function getProjectBySlug(slug: string): Promise<SanityProjectDetail | null> {
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
      "gallery": gallery[].asset->url,
      "contentBlocks": contentBlocks[] {
        _type,
        text,
        "imageUrl": image.asset->url,
        caption,
        "imageLeftUrl": imageLeft.asset->url,
        captionLeft,
        "imageRightUrl": imageRight.asset->url,
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
        "image": mainImage.asset->url
      }
    }`,
    { slug },
    { next: { tags: [CACHE_TAG] } }
  );

  if (!raw) return null;

  return {
    ...raw,
    gallery: raw.gallery?.filter(Boolean) ?? [],
    contentBlocks: transformContentBlocks(raw.contentBlocks ?? []),
    related: raw.related?.filter(Boolean) ?? [],
  };
}

/** Lightweight list for prev/next navigation — only published */
export async function getAllProjectsForNav(): Promise<{ slug: string; title: string; type: string; location: string; mainImage: string | null }[]> {
  return client.fetch(
    `*[_type == "project" && isPublished == true] | order(orderRank asc) {
      "slug": slug.current,
      title,
      "type": projectType,
      location,
      "mainImage": mainImage.asset->url
    }`,
    {},
    { next: { tags: [CACHE_TAG] } }
  );
}

/** Featured projects for homepage grid — only published */
export async function getFeaturedProjects(): Promise<SanityFeaturedProject[]> {
  return client.fetch(
    `*[_type == "project" && isPublished == true && isFeatured == true] | order(orderRank asc) [0...4] {
      "slug": slug.current,
      title,
      client,
      "type": projectType,
      location,
      "image": mainImage.asset->url,
      "tagline": shortDescription
    }`,
    {},
    { next: { tags: [CACHE_TAG] } }
  );
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
  orderRank: number;
}

/** All team members ordered by display rank */
export async function getTeamMembers(): Promise<SanityTeamMember[]> {
  return client.fetch(
    `*[_type == "teamMember"] | order(orderRank asc) {
      name,
      role,
      tier,
      bio,
      education,
      award,
      founding,
      "photoUrl": photo.asset->url,
      orderRank
    }`,
    {},
    { next: { tags: [CACHE_TAG] } }
  );
}

/** Testimonials for homepage slider */
export async function getTestimonials(): Promise<SanityTestimonial[]> {
  return client.fetch(
    `*[_type == "testimonial"] | order(orderRank asc) {
      quote,
      "name": clientName,
      "title": clientTitle,
      "project": projectName
    }`,
    {},
    { next: { tags: [CACHE_TAG] } }
  );
}
