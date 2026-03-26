'use client';
import { useState } from 'react';
import FadeIn from './FadeIn';
import FadeImage from './FadeImage';
import Image from 'next/image';
import Lightbox, { LightboxImage } from './Lightbox';
import styles from '../app/portfolio/[slug]/page.module.css';
import { WARM_BLUR } from '@/lib/siteContent';
import type { ContentBlock } from '@/lib/projectData';

interface Props {
  contentBlocks?: ContentBlock[];
  gallery: string[];
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
    gallery.forEach((src) => {
      allImages.push({ src });
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
                  <FadeIn key={i} direction="up">
                    <div className={styles.blockPara}>
                      <p className={styles.blockParaText}>{block.text}</p>
                    </div>
                  </FadeIn>
                );
              case 'fullWidthImage': {
                const idx = imageIndexMap.get(block.src) ?? 0;
                return (
                  <FadeIn key={i} direction="up" threshold={0.05}>
                    <div className={styles.blockFullImage}>
                      <div
                        className={`${styles.blockFullImageWrap} ${styles.clickable}`}
                        onClick={() => setLightboxIndex(idx)}
                      >
                        <FadeImage
                          src={block.src}
                          alt={block.caption ?? `${projectTitle} — image ${i + 1}`}
                          fill
                          sizes="100vw"
                          style={{ objectFit: 'cover' }}
                          placeholder="blur"
                          blurDataURL={WARM_BLUR}
                        />
                      </div>
                      {block.caption && (
                        <span className={styles.blockCaption}>{block.caption}</span>
                      )}
                    </div>
                  </FadeIn>
                );
              }
              case 'halfWidthImages':
                return (
                  <FadeIn key={i} direction="up" threshold={0.05}>
                    <div className={styles.blockHalf}>
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
                                alt={block.captions?.[j] ?? `${projectTitle} — image ${j + 1}`}
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                style={{ objectFit: 'cover' }}
                                placeholder="blur"
                                blurDataURL={WARM_BLUR}
                              />
                            </div>
                            {block.captions?.[j] && (
                              <span className={styles.blockCaption}>{block.captions[j]}</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </FadeIn>
                );
              case 'pullQuote':
                return (
                  <FadeIn key={i} direction="up">
                    <div className={styles.blockPullQuote}>
                      <blockquote className={styles.blockPullQuoteText}>
                        {block.text}
                      </blockquote>
                    </div>
                  </FadeIn>
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
        <FadeIn direction="up" threshold={0.05}>
          <section className={styles.gallery}>
            {gallery.map((src, i) => (
              <div
                key={i}
                className={`${styles.galleryItem} ${i % 3 === 0 ? styles.galleryFull : ''} ${styles.clickable}`}
                onClick={() => setLightboxIndex(i)}
              >
                <Image
                  src={src}
                  alt={`${projectTitle}, gallery image ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }}
                  placeholder="blur"
                  blurDataURL={WARM_BLUR}
                />
              </div>
            ))}
          </section>
        </FadeIn>

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
