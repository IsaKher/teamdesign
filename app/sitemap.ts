import { MetadataRoute } from 'next';
import { getAllProjects } from '@/lib/sanity';

const BASE_URL = 'https://teamdesign.in';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch only published projects from Sanity — sitemap stays in sync with CMS
  const projects = await getAllProjects();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL,                        lastModified: new Date(), changeFrequency: 'monthly', priority: 1.0 },
    { url: `${BASE_URL}/portfolio`,         lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/process`,           lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.7 },
    { url: `${BASE_URL}/studio`,            lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.7 },
    { url: `${BASE_URL}/people`,            lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.6 },
    { url: `${BASE_URL}/contact`,           lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.8 },
  ];

  const projectPages: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${BASE_URL}/portfolio/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...projectPages];
}
