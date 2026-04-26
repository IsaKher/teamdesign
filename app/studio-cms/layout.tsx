import type { Metadata } from 'next';

/** Belt-and-suspenders alongside robots.ts: meta-robots tag tells crawlers
 *  not to index the embedded Sanity Studio even if they ignore robots.txt. */
export const metadata: Metadata = {
  title: 'Studio CMS',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function StudioCmsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
