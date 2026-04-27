import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, DM_Sans, Josefin_Sans } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import SmoothScroll from '@/components/SmoothScroll';
import CookieBanner from '@/components/CookieBanner';
import ConsentGatedAnalytics from '@/components/ConsentGatedAnalytics';
import { getSiteSettings } from '@/lib/sanity';
import { STUDIO } from '@/lib/siteContent';

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? STUDIO.site;

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-sans',
  display: 'swap',
});

const josefinSans = Josefin_Sans({
  subsets: ['latin'],
  weight: ['100', '300'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Team Design Architects',
    template: '%s — Team Design Architects',
  },
  description:
    'Architecture & Interior Design practice based in Mumbai. 25+ years, 300+ projects across residential, commercial, and institutional work.',
  keywords: [
    'architecture firm Mumbai',
    'architect Mumbai',
    'interior design Mumbai',
    'residential architect Mumbai',
    'commercial architect Mumbai',
    'Team Design Architects',
    'Tasadduq Kher architect',
  ],
  authors: [{ name: 'Team Design Architects', url: SITE }],
  creator: 'Team Design Architects',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE,
    siteName: 'Team Design Architects',
    title: 'Team Design Architects',
    description:
      'Architecture & Interior Design practice based in Mumbai. 25+ years, 300+ projects.',
    images: [
      {
        url: `${SITE}/hero-building.webp`,
        width: 1536,
        height: 1024,
        alt: 'Team Design Architects — Architecture & Interior Design, Mumbai',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Team Design Architects',
    description:
      'Architecture & Interior Design — Mumbai. 25+ years, 300+ projects.',
    images: [`${SITE}/hero-building.webp`],
  },
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: SITE,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#F4EEE6',
};

const schemaOrgJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['ProfessionalService', 'LocalBusiness'],
      '@id': `${SITE}/#business`,
      name: 'Team Design Architects',
      alternateName: 'Team Design',
      description:
        'Architecture & Interior Design practice based in Mumbai. 25+ years, 300+ projects across residential, commercial, and institutional work.',
      url: SITE,
      telephone: '+91-9876543210',
      foundingDate: '1996',
      image: `${SITE}/hero-building.webp`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Mumbai',
        addressRegion: 'Maharashtra',
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 19.033,
        longitude: 73.0297,
      },
      areaServed: [
        { '@type': 'City', name: 'Mumbai' },
        { '@type': 'AdministrativeArea', name: 'Maharashtra' },
        { '@type': 'Country', name: 'India' },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Architectural & Interior Design Services',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Residential Architecture' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Commercial Architecture' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Institutional Architecture' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Interior Design' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Urban Planning' } },
        ],
      },
      sameAs: [SITE],
    },
    {
      '@type': 'Person',
      '@id': `${SITE}/people#tasadduq-kher`,
      name: 'Tasadduq Kher',
      jobTitle: 'Principal Architect',
      worksFor: { '@id': `${SITE}/#business` },
      alumniOf: {
        '@type': 'EducationalOrganization',
        name: 'Rachana Sansad Academy of Architecture',
        address: { '@type': 'PostalAddress', addressLocality: 'Mumbai' },
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE}/#website`,
      url: SITE,
      name: 'Team Design Architects',
      description: 'Architecture & Interior Design practice based in Mumbai. 25+ years, 300+ projects.',
      publisher: { '@id': `${SITE}/#business` },
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE}/portfolio?type={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
  ],
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();
  const phone = settings?.phone ?? STUDIO.phone;

  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable} ${josefinSans.variable}`}>
      <head>
        {/* Warm up Sanity CDN connection before the browser needs it — free LCP win */}
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrgJsonLd) }}
        />
      </head>
      <body>
        {/* First focusable element — keyboard users tab here to jump past nav */}
        <a href="#main-content" className="skipLink">Skip to content</a>
        <SmoothScroll />
        <Navigation phone={phone} />
        <main id="main-content" tabIndex={-1}>{children}</main>
        <Footer />
        <WhatsAppButton />
        <CookieBanner />
        {/* Mounts Vercel Analytics + Speed Insights only when the user has
            consented via the cookie banner. */}
        <ConsentGatedAnalytics />
      </body>
    </html>
  );
}
