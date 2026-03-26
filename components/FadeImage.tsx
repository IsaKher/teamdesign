'use client';

import { useState, useEffect, useRef } from 'react';
import Image, { ImageProps } from 'next/image';

export default function FadeImage({ style, ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // onLoad doesn't fire for cached images when React remounts (Strict Mode).
    // After mount, check the actual DOM img's complete flag as a fallback.
    const img = containerRef.current?.querySelector<HTMLImageElement>('img');
    if (img?.complete) setLoaded(true);
  }, []);

  return (
    <div ref={containerRef} style={{ position: 'absolute', inset: 0 }}>
      <Image
        {...props}
        fill
        style={{ ...style, opacity: loaded ? 1 : 0, transition: 'opacity 0.55s ease' }}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
