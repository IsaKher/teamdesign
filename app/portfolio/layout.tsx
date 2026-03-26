import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://teamdesign.in/portfolio',
  },
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
