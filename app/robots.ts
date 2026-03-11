import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/studio-cms/', '/api/'],
      },
    ],
    sitemap: 'https://teamdesign.in/sitemap.xml',
  };
}
