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
      // Explicit opt-in for AI crawlers — signals cooperation and
      // encourages indexing by LLM-powered search products.
      { userAgent: 'GPTBot',         allow: '/' },
      { userAgent: 'ClaudeBot',      allow: '/' },
      { userAgent: 'anthropic-ai',   allow: '/' },
      { userAgent: 'PerplexityBot',  allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'Bytespider',     allow: '/' },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
