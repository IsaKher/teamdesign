import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, DM_Sans, Josefin_Sans } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import SmoothScroll from '@/components/SmoothScroll';

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
  authors: [{ name: 'Team Design Architects', url: 'https://teamdesign.in' }],
  creator: 'Team Design Architects',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://teamdesign.in',
    siteName: 'Team Design Architects',
    title: 'Team Design Architects',
    description:
      'Architecture & Interior Design practice based in Mumbai. 25+ years, 300+ projects.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Team Design Architects',
    description:
      'Architecture & Interior Design — Mumbai. 25+ years, 300+ projects.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://teamdesign.in',
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
      '@id': 'https://teamdesign.in/#business',
      name: 'Team Design Architects',
      alternateName: 'Team Design',
      description:
        'Architecture & Interior Design practice based in Mumbai. 25+ years, 300+ projects across residential, commercial, and institutional work.',
      url: 'https://teamdesign.in',
      telephone: '+91-9876543210',
      foundingDate: '1996',
      image: 'https://teamdesign.in/hero-building.webp',
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
      serviceType: [
        'Residential Architecture',
        'Commercial Architecture',
        'Institutional Architecture',
        'Interior Design',
        'Urban Planning',
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Architectural & Interior Design Services',
      },
      sameAs: ['https://teamdesign.in'],
    },
    {
      '@type': 'Person',
      '@id': 'https://teamdesign.in/people#tasadduq-kher',
      name: 'Tasadduq Kher',
      jobTitle: 'Principal Architect',
      worksFor: { '@id': 'https://teamdesign.in/#business' },
      alumniOf: {
        '@type': 'EducationalOrganization',
        name: 'Rachana Sansad Academy of Architecture',
        address: { '@type': 'PostalAddress', addressLocality: 'Mumbai' },
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://teamdesign.in/#website',
      url: 'https://teamdesign.in',
      name: 'Team Design Architects',
      description: 'Architecture & Interior Design practice based in Mumbai. 25+ years, 300+ projects.',
      publisher: { '@id': 'https://teamdesign.in/#business' },
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://teamdesign.in/portfolio?type={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
        <SmoothScroll />
        <Navigation />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
