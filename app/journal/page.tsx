export const revalidate = 3600;

import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';
import { getJournalPosts } from '@/lib/sanity';
import { WARM_BLUR } from '@/lib/siteContent';
import FadeUpReveal from '@/components/FadeUpReveal';

export const metadata: Metadata = {
  title: 'Journal — Architecture Insights & Practice Notes',
  description:
    'Thinking from the Team Design studio — on materials, sustainable design, the design process, and buildings that last.',
  keywords: [
    'architecture journal Mumbai',
    'architecture insights India',
    'sustainable design Mumbai',
    'architecture process notes',
    'Team Design blog',
  ],
  alternates: { canonical: 'https://teamdesignarchitects.com/journal' },
  openGraph: {
    title: 'Journal — Team Design Architects',
    description:
      'Thinking from the Team Design studio — on materials, sustainable design, the design process, and buildings that last.',
    url: 'https://teamdesignarchitects.com/journal',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Journal — Team Design Architects',
    description:
      'Thinking from the Team Design studio — on materials, sustainable design, the design process, and buildings that last.',
  },
};

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default async function JournalPage() {
  const posts = await getJournalPosts();

  return (
    <>
      {/* ─── Page Hero ─────────────────────────────────────────────── */}
      <div className={styles.pageHero}>
        <span className={styles.pageLabel}>Journal</span>
        <h1 className={styles.pageTitle}>Notes from the Studio</h1>
        <p className={styles.pageSubtitle}>
          Thinking on materials, sustainable design, process, and the ideas that shape our buildings.
        </p>
      </div>

      {/* ─── Posts Grid ────────────────────────────────────────────── */}
      <section className={styles.postsSection}>
        {posts.length === 0 ? (
          <FadeUpReveal>
            <div className={styles.empty}>
              <p>New writing coming soon. Check back shortly.</p>
            </div>
          </FadeUpReveal>
        ) : (
          <div className={styles.grid}>
            {posts.map((post, i) => (
              <FadeUpReveal key={post.slug} delay={i * 0.05}>
                <Link href={`/journal/${post.slug}`} className={styles.card}>
                  <div className={styles.cardImageWrap}>
                    {post.coverImage ? (
                      <Image
                        src={post.coverImage}
                        alt={post.coverImageAlt ?? post.title}
                        fill
                        sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        style={{ objectFit: 'cover' }}
                        placeholder={post.coverImageLqip ? 'blur' : 'empty'}
                        blurDataURL={post.coverImageLqip ?? WARM_BLUR}
                      />
                    ) : (
                      <div className={styles.cardImagePlaceholder} />
                    )}
                  </div>

                  <div className={styles.cardBody}>
                    <div className={styles.cardMeta}>
                      {post.category && (
                        <span className={styles.cardCategory}>{post.category}</span>
                      )}
                      <span className={styles.cardDate}>{formatDate(post.publishedAt)}</span>
                      {post.readTime && (
                        <span className={styles.cardReadTime}>{post.readTime} min read</span>
                      )}
                    </div>
                    <h2 className={styles.cardTitle}>{post.title}</h2>
                    {post.excerpt && (
                      <p className={styles.cardExcerpt}>{post.excerpt}</p>
                    )}
                    <span className={styles.cardLink}>Read article →</span>
                  </div>
                </Link>
              </FadeUpReveal>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
