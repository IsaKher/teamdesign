'use client';
import { useState } from 'react';
import FadeImage from './FadeImage';
import Image from 'next/image';
import Lightbox, { LightboxImage } from './Lightbox';
import styles from '../app/portfolio/[slug]/page.module.css';
import { WARM_BLUR } from '@/lib/siteContent';
import type { ContentBlock } from '@/lib/types';

interface Props {
  contentBlocks?: ContentBlock[];
  gallery: { url: string; alt: string | null }[];
  projectTitle: string;
}

export default function ProjectContent({ contentBlocks, gallery, projectTitle }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Build the flat list of lightbox images from all image blocks
  const allImages: LightboxImage[] = [];

  if (contentBlocks && contentBlocks.length > 0) {
    contentBlocks.forEach((block) => {
      if (block.type === 'fullWidthImage') {
        allImages.push({ src: block.src, caption: block.caption });
      } else if (block.type === 'halfWidthImages') {
        block.images.forEach((src, j) => {
          allImages.push({ src, caption: block.captions?.[j] });
        });
      }
    });
  } else {
    gallery.forEach((img) => {
      allImages.push({ src: img.url });
    });
  }

  // Map from image src to its index in allImages (for click handler)
  const imageIndexMap = new Map<string, number>();
  allImages.forEach((img, i) => imageIndexMap.set(img.src, i));

  if (contentBlocks && contentBlocks.length > 0) {
    return (
      <>
        <section className={styles.blocks}>
          {contentBlocks.map((block: ContentBlock, i: number) => {
            switch (block.type) {
              case 'paragraph':
                return (
                  <div key={i} className={styles.blockPara}>
                    <p className={styles.blockParaText}>{block.text}</p>
                  </div>
                );
              case 'fullWidthImage': {
                const idx = imageIndexMap.get(block.src) ?? 0;
                return (
                  <div key={i} className={styles.blockFullImage}>
                    <div
                      className={`${styles.blockFullImageWrap} ${styles.clickable}`}
                      onClick={() => setLightboxIndex(idx)}
                    >
                      <FadeImage
                        src={block.src}
                        alt={block.alt ?? block.caption ?? `${projectTitle} — image ${i + 1}`}
                        fill
                        sizes="100vw"
                        style={{ objectFit: 'cover' }}
                        placeholder="blur"
                        blurDataURL={block.lqip ?? WARM_BLUR}
                      />
                    </div>
                    {block.caption && (
                      <span className={styles.blockCaption}>{block.caption}</span>
                    )}
                  </div>
                );
              }
              case 'halfWidthImages':
                return (
                  <div key={i} className={styles.blockHalf}>
                    {block.images.map((src, j) => {
                      const idx = imageIndexMap.get(src) ?? 0;
                      return (
                        <div key={j} className={styles.blockHalfItem}>
                          <div
                            className={`${styles.blockHalfImageWrap} ${styles.clickable}`}
                            onClick={() => setLightboxIndex(idx)}
                          >
                            <FadeImage
                              src={src}
                              alt={block.alts?.[j] ?? block.captions?.[j] ?? `${projectTitle} — image ${j + 1}`}
                              fill
                              sizes="(max-width: 768px) 100vw, 50vw"
                              style={{ objectFit: 'cover' }}
                              placeholder="blur"
                              blurDataURL={block.lqips?.[j] ?? WARM_BLUR}
                            />
                          </div>
                          {block.captions?.[j] && (
                            <span className={styles.blockCaption}>{block.captions[j]}</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              case 'pullQuote':
                return (
                  <div key={i} className={styles.blockPullQuote}>
                    <blockquote className={styles.blockPullQuoteText}>
                      {block.text}
                    </blockquote>
                  </div>
                );
              default:
                return null;
            }
          })}
        </section>

        {lightboxIndex !== null && (
          <Lightbox
            images={allImages}
            currentIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onNavigate={setLightboxIndex}
          />
        )}
      </>
    );
  }

  if (gallery.length > 0) {
    return (
      <>
        <section className={styles.gallery}>
          {gallery.map((img, i) => (
            <div
              key={i}
              className={`${styles.galleryItem} ${i % 3 === 0 ? styles.galleryFull : ''} ${styles.clickable}`}
              onClick={() => setLightboxIndex(i)}
            >
              <Image
                src={img.url}
                alt={img.alt ?? `${projectTitle}, gallery image ${i + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
                placeholder="blur"
                blurDataURL={WARM_BLUR}
              />
            </div>
          ))}
        </section>

        {lightboxIndex !== null && (
          <Lightbox
            images={allImages}
            currentIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onNavigate={setLightboxIndex}
          />
        )}
      </>
    );
  }

  return null;
}
