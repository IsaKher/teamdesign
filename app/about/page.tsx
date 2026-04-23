import type { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'About',
  description: 'About Team Design Architects.',
};

export default function AboutPage() {
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>About</h1>
      <p className={styles.placeholder}>Page coming soon.</p>
    </main>
  );
}
