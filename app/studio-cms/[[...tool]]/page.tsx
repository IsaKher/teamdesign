'use client';

import { NextStudio } from 'next-sanity/studio';
import config from '../../../sanity.config';

// CMS must always be server-rendered (never statically cached)
export const dynamic = 'force-dynamic';

export default function StudioPage() {
  return <NextStudio config={config} />;
}
