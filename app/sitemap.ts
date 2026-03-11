import { MetadataRoute } from 'next';

const BASE_URL = 'https://teamdesign.in';

const PROJECT_SLUGS = [
  'mont-blanc-mariwala-residence',
  'unilazer-ventures-office',
  'jk-bank-business-centre',
  'itm-college-navi-mumbai',
  'kalimata-temple-kharghar',
  'bungalow-tirupur',
  'mba-hostel-towers',
  'villa-lonavala',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const projectUrls = PROJECT_SLUGS.map((slug) => ({
    url: `${BASE_URL}/work/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/work`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/interiors`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/people`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/studio`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...projectUrls,
  ];
}
