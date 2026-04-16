export const revalidate = 3600;

import type { Metadata } from 'next';
import { getAllProjects } from '@/lib/sanity';
import PortfolioClient from './PortfolioClient';

export const metadata: Metadata = {
  title: 'Portfolio',
  description: '300+ completed projects across residential, commercial, institutional, and interior architecture. Explore the work of Team Design Architects, based in Mumbai.',
  keywords: ['architecture portfolio Mumbai', 'residential architect Mumbai', 'commercial architecture India', 'interior design portfolio', 'Team Design work'],
  alternates: { canonical: 'https://teamdesign.in/portfolio' },
  openGraph: {
    title: 'Portfolio — Team Design Architects',
    description: '300+ completed projects across residential, commercial, institutional, and interior architecture in Mumbai and across India.',
    url: 'https://teamdesign.in/portfolio',
    images: [{ url: 'https://teamdesign.in/interiors-cta.webp', width: 1536, height: 1024, alt: 'Team Design Architects — Selected Work' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio — Team Design Architects',
    description: '300+ completed projects across residential, commercial, and institutional architecture.',
    images: ['https://teamdesign.in/interiors-cta.webp'],
  },
};

export default async function PortfolioPage() {
  const projects = await getAllProjects();
  return <PortfolioClient projects={projects} />;
}
