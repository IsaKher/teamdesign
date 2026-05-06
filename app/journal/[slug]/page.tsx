export const revalidate = 3600;

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';
import { getJournalPostBySlug, getJournalPostSlugs } from '@/lib/sanity';
import { WARM_BLUR } from '@/lib/siteContent';
import type { ContentBlock } from '@/lib/types';

// ─── Static generation ────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const slugs = await getJournalPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getJournalPostBySlug(slug);
  if (!post) return { title: 'Not Found' };

  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    alternates: { canonical: `https://teamdesignarchitects.com/journal/${slug}` },
    openGraph: {
      title: `${post.title} — Team Design Architects`,
      description: post.excerpt ?? undefined,
      url: `https://teamdesignarchitects.com/journal/${slug}`,
      ...(post.coverImage && {
        images: [{ url: post.coverImage, alt: post.coverImageAlt ?? post.title }],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt ?? undefined,
      ...(post.coverImage && { images: [post.coverImage] }),
    },
  };
}

// ─── Portable Text renderer ───────────────────────────────────────────────────

interface PtBlock {
  _type: 'block';
  _key: string;
  style: string;
  children: { _key: string; _type: string; marks: string[]; text: string }[];
  markDefs?: { _key: string; _type: string; href?: string }[];
}

interface PtImage {
  _type: 'image';
  _key: string;
  url?: string;
  alt?: string;
  caption?: string;
  lqip?: string;
}

type PtNode = PtBlock | PtImage;

function renderInline(
  child: PtBlock['children'][0],
  markDefs: PtBlock['markDefs'],
) {
  let node: React.ReactNode = child.text;
  if (child.marks.includes('strong')) node = <strong key={child._key}>{node}</strong>;
  if (child.marks.includes('em')) node = <em key={child._key}>{node}</em>;
  const linkMark = child.marks.find((m) => markDefs?.find((d) => d._key === m && d._type === 'link'));
  if (linkMark) {
    const def = markDefs?.find((d) => d._key === linkMark);
    if (def?.href) {
      node = (
        <a key={child._key} href={def.href} target="_blank" rel="noopener noreferrer">
          {node}
        </a>
      );
    }
  }
  return node;
}

function PortableText({ blocks }: { blocks: ContentBlock[] }) {
  const nodes = blocks as unknown as PtNode[];
  return (
    <>
      {nodes.map((block) => {
        if (block._type === 'image') {
          const img = block as PtImage;
          return (
            <figure key={img._key} className={styles.bodyFigure}>
              {img.url && (
                <div className={styles.bodyFigureImgWrap}>
                  <Image
                    src={img.url}
                    alt={img.alt ?? ''}
                    fill
                    sizes="(max-width: 800px) 100vw, 800px"
                    style={{ objectFit: 'cover' }}
                    placeholder={img.lqip ? 'blur' : 'empty'}
                    blurDataURL={img.lqip ?? WARM_BLUR}
                  />
                </div>
              )}
              {img.caption && (
                <figcaption className={styles.bodyCaption}>{img.caption}</figcaption>
              )}
            </figure>
          );
        }

        const b = block as PtBlock;
        const children = b.children?.map((child) => renderInline(child, b.markDefs));

        if (b.style === 'h2') return <h2 key={b._key} className={styles.bodyH2}>{children}</h2>;
        if (b.style === 'h3') return <h3 key={b._key} className={styles.bodyH3}>{children}</h3>;
        if (b.style === 'blockquote') {
          return <blockquote key={b._key} className={styles.bodyQuote}>{children}</blockquote>;
        }
        return <p key={b._key} className={styles.bodyP}>{children}</p>;
      })}
    </>
  );
}

// ─── Date formatter ───────────────────────────────────────────────────────────

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function JournalPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getJournalPostBySlug(slug);
  if (!post) notFound();

  return (
    <article>
      {/* ─── Article hero ────────────────────────────────────────── */}
      <div className={styles.hero}>
        <div className={styles.heroText}>
          <div className={styles.heroMeta}>
            {post.category && (
              <span className={styles.heroCategoryTag}>{post.category}</span>
            )}
            <time className={styles.heroDate} dateTime={post.publishedAt}>
              {formatDate(post.publishedAt)}
            </time>
            {post.readTime && (
              <span className={styles.heroReadTime}>{post.readTime} min read</span>
            )}
          </div>
          <h1 className={styles.heroTitle}>{post.title}</h1>
          {post.excerpt && (
            <p className={styles.heroExcerpt}>{post.excerpt}</p>
          )}
        </div>

        {post.coverImage && (
          <div className={styles.heroCoverWrap}>
            <Image
              src={post.coverImage}
              alt={post.coverImageAlt ?? post.title}
              fill
              priority
              sizes="100vw"
              style={{ objectFit: 'cover' }}
              placeholder={post.coverImageLqip ? 'blur' : 'empty'}
              blurDataURL={post.coverImageLqip ?? WARM_BLUR}
            />
          </div>
        )}
      </div>

      {/* ─── Article body ────────────────────────────────────────── */}
      <div className={styles.bodyWrap}>
        <div className={styles.bodyInner}>
          {post.body?.length > 0 && <PortableText blocks={post.body} />}
        </div>
      </div>

      {/* ─── Back link ───────────────────────────────────────────── */}
      <div className={styles.backWrap}>
        <Link href="/journal" className={styles.backLink}>← All Journal Posts</Link>
      </div>
    </article>
  );
}
