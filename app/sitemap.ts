import { MetadataRoute } from 'next';
import { getAllProjects } from '@/lib/sanity';
import { STUDIO } from '@/lib/siteContent';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? STUDIO.site;

// Hardcoded date for static pages — update when content meaningfully changes.
// Avoids regenerating lastModified on every build, which would force re-crawls.
const STATIC_LAST_MODIFIED = new Date('2026-04-01');

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch only published projects from Sanity — sitemap stays in sync with CMS
  const projects = await getAllProjects();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL,                        lastModified: STATIC_LAST_MODIFIED, changeFrequency: 'monthly', priority: 1.0 },
    { url: `${BASE_URL}/portfolio`,         lastModified: STATIC_LAST_MODIFIED, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/process`,           lastModified: STATIC_LAST_MODIFIED, changeFrequency: 'yearly',  priority: 0.7 },
    { url: `${BASE_URL}/studio`,            lastModified: STATIC_LAST_MODIFIED, changeFrequency: 'yearly',  priority: 0.7 },
    { url: `${BASE_URL}/people`,            lastModified: STATIC_LAST_MODIFIED, changeFrequency: 'yearly',  priority: 0.6 },
    { url: `${BASE_URL}/contact`,           lastModified: STATIC_LAST_MODIFIED, changeFrequency: 'yearly',  priority: 0.8 },
  ];

  const projectPages: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${BASE_URL}/portfolio/${p.slug}`,
    lastModified: STATIC_LAST_MODIFIED,
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...projectPages];
}
