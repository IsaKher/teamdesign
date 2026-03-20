import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://teamdesign.in/interiors',
  },
};

export default function InteriorsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
