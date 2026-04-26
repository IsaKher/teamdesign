import { MetadataRoute } from 'next';
import { STUDIO } from '@/lib/siteContent';

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? STUDIO.site;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Block both bare and trailing-slash forms so misbehaving crawlers
        // can't waste budget on the redirect chain.
        disallow: ['/studio-cms', '/studio-cms/', '/api', '/api/'],
      },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
