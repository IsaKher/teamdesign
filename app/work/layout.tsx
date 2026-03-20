import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://teamdesign.in/work',
  },
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
