import { MetadataRoute } from 'next';

const BASE_URL = 'https://teamdesign.in';

const PORTFOLIO_SLUGS = [
  'wedding-destination-raipur',
  'kalimata-mandir-navi-mumbai',
  'service-industry-campus-goa',
  'mist-view-bungalows-lonavala',
  'mba-hostel-towers-itm',
  'mariwala-estate-annexe-lonavala',
  'villa-merchant-tirupur',
  'jk-bank-branch-samba',
  'college-campus-extension-itm',
  'nrb-bearings-guest-house-aurangabad',
  'gokul-cultural-centre-mumbai',
  'glass-kitchen-alibaug',
  'college-engineering-management-nagpur',
  'bungalow-ahmedabad',
  'bhandari-house-bhinmal',
  'venus-wires-office-khopoli',
  // formerly under /interiors — consolidated here
  'womens-bank-branch-srinagar',
  'show-flat-mumbai',
  'unilazer-ventures-office',
  'jk-bank-nbc-bkc',
  'high-networth-branch-shopian',
  'hdfc-bank-office-jammu',
  'garden-glory-penthouse-thane',
  'airport-lounge-srinagar',
  'exclusive-villa-mumbai',
  'electronic-bank-lobby-srinagar',
  'kishore-mariwala-home-mumbai',
  'gordon-serrao-home-navi-mumbai',
  'cinemarc-cinema-theatre',
  // newer projects
  'qudrati-greens-indore',
  'nikhil-gupta-bungalow',
  'jhaveri-zaveri-residence',
  'mohan-shenoi-residence',
  'rahul-sanjana-residence',
  'usha-shenoi-residence',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL,                        lastModified: new Date(), changeFrequency: 'monthly', priority: 1.0 },
    { url: `${BASE_URL}/portfolio`,         lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/process`,           lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.7 },
    { url: `${BASE_URL}/studio`,            lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.7 },
    { url: `${BASE_URL}/people`,            lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.6 },
    { url: `${BASE_URL}/contact`,           lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.8 },
  ];

  const workPages: MetadataRoute.Sitemap = PORTFOLIO_SLUGS.map((slug) => ({
    url: `${BASE_URL}/portfolio/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...workPages];
}
