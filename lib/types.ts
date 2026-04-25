// Shared type definitions used across Sanity queries and rendering components.

export interface RelatedProject {
  slug: string;
  title: string;
  type: string;
  image: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  title: string;
}

export type ContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'fullWidthImage'; src: string; alt?: string | null; caption?: string; lqip?: string | null }
  | { type: 'halfWidthImages'; images: [string, string]; alts?: [string | null | undefined, string | null | undefined]; captions?: [string, string]; lqips?: [string | null | undefined, string | null | undefined] }
  | { type: 'pullQuote'; text: string };
