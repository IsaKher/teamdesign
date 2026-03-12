import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, DM_Sans, Josefin_Sans } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

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
    'Architecture & Interior Design practice based in Navi Mumbai. 25+ years, 300+ projects across residential, commercial, and institutional work.',
  keywords: [
    'architecture firm Mumbai',
    'architect Navi Mumbai',
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
      'Architecture & Interior Design practice based in Navi Mumbai. 25+ years, 300+ projects.',
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable} ${josefinSans.variable}`}>
      <body>
        <Navigation />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
