'use client';

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';

export default function FadeImage({ style, ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false);
  return (
    <Image
      {...props}
      style={{ ...style, opacity: loaded ? 1 : 0, transition: 'opacity 0.55s ease' }}
      onLoad={() => setLoaded(true)}
    />
  );
}
