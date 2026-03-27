'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './MemberImage.module.css';

interface Props {
  src: string;
  name: string;
  sizes: string;
}

function initials(name: string) {
  return name
    .split(/[\s(]/)[0]   // first word only (ignore "(Xen)" etc.)
    .slice(0, 2)
    .toUpperCase();
}

export default function MemberImage({ src, name, sizes }: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={styles.placeholder} aria-hidden="true">
        <span className={styles.initials}>{initials(name)}</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={name}
      fill
      sizes={sizes}
      style={{ objectFit: 'cover' }}
      onError={() => setFailed(true)}
    />
  );
}
