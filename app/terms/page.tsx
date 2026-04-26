import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '../privacy/page.module.css';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms governing the use of the Team Design Architects website.',
  alternates: { canonical: 'https://teamdesign.in/terms' },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <>
      <div className={styles.pageHero}>
        <div className={styles.heroInner}>
          <span className={styles.heroLabel}>Terms</span>
          <h1 className={styles.heroTitle}>
            Terms of <em className={styles.heroItalic}>using this site.</em>
          </h1>
          <p className={styles.heroSub}>
            Short and reasonable. Please read these once before using the site.
          </p>
          <span className={styles.updated}>Last updated · 25 April 2026</span>
        </div>
      </div>

      <section className={styles.body}>
        <div className={styles.bodyInner}>

          <div className={styles.section}>
            <h2>About these terms</h2>
            <p>
              By using teamdesign.in, you agree to what&rsquo;s below. If anything here doesn&rsquo;t sit right with you, the simplest answer is to not use the site. None of this is meant to be adversarial — these are just the ground rules.
            </p>
          </div>

          <div className={styles.section}>
            <h2>Using the site</h2>
            <p>
              You&rsquo;re welcome to browse the site, contact us, and apply for roles. You agree not to:
            </p>
            <ul>
              <li>Try to break, scrape, or interfere with how the site works</li>
              <li>Use automated tools to flood our forms or otherwise abuse them</li>
              <li>Submit content that&rsquo;s false, unlawful, or someone else&rsquo;s without permission</li>
              <li>Use the site for anything illegal under Indian law</li>
            </ul>
            <p>
              If you do, we may block your access without notice. We&rsquo;d rather not, so please don&rsquo;t.
            </p>
          </div>

          <div className={styles.section}>
            <h2>What belongs to us</h2>
            <p>
              Everything you see on this site — the project photographs, drawings, written descriptions, the design of the site itself — belongs to Team Design Architects or has been licensed to us. You can share links, take screenshots for personal reference, or quote brief passages with attribution. You cannot copy our project images or written content into your own materials, AI training datasets, or commercial work without written permission.
            </p>
            <p>
              Our name and logo are trademarks. Please don&rsquo;t use them in a way that suggests we endorse something we don&rsquo;t.
            </p>
          </div>

          <div className={styles.section}>
            <h2>What you send us</h2>
            <p>
              When you submit a form — a project enquiry, a job application, a portfolio link — you confirm that the information is yours to share, and that you&rsquo;re happy for us to review it for the purpose you sent it. We use what you send only to reply to you. See the <Link href="/privacy">privacy policy</Link> for the longer version.
            </p>
            <p>
              If you send us creative work (a portfolio, design ideas), it stays yours. We don&rsquo;t claim any rights to it just because you showed it to us.
            </p>
          </div>

          <div className={styles.section}>
            <h2>What this site is and isn&rsquo;t</h2>
            <p>
              The site shows our work, our process, and our fees in good faith. Project images, descriptions, and indicative fee figures are accurate at the time they&rsquo;re published, but they don&rsquo;t form a quotation, contract, or commitment. Actual fees and scope are agreed in writing through a Letter of Appointment for each project.
            </p>
            <p>
              Information here is not architectural, legal, or financial advice for your own project. For that, please get in touch and we&rsquo;ll have a proper conversation.
            </p>
          </div>

          <div className={styles.section}>
            <h2>Links to other sites</h2>
            <p>
              We sometimes link to other websites — LinkedIn, WhatsApp, news articles, partner studios. We&rsquo;re not responsible for what happens once you leave our site. Their terms and privacy practices are theirs.
            </p>
          </div>

          <div className={styles.section}>
            <h2>No warranty</h2>
            <p>
              We do our best to keep the site accurate, available, and free of errors — but we offer it &ldquo;as is.&rdquo; To the fullest extent permitted by law, we make no warranties about uninterrupted availability, freedom from bugs, or fitness for any particular purpose. If the site is briefly unavailable, our email and phone still work.
            </p>
          </div>

          <div className={styles.section}>
            <h2>Liability</h2>
            <p>
              To the extent allowed by Indian law, Team Design Architects is not liable for any indirect, incidental, or consequential losses arising from your use of this site — including loss of data, lost business opportunities, or reliance on information here. Nothing in these terms limits liability for fraud, gross negligence, or anything else that can&rsquo;t be limited by law.
            </p>
          </div>

          <div className={styles.section}>
            <h2>Changes</h2>
            <p>
              We may update these terms occasionally — when our practice changes, or when laws around websites change. The &ldquo;last updated&rdquo; date at the top reflects the most recent change. Continued use of the site after a change means you accept the updated version.
            </p>
          </div>

          <div className={styles.section}>
            <h2>Governing law</h2>
            <p>
              These terms are governed by the laws of India. Any dispute that can&rsquo;t be resolved between us through good-faith conversation will be subject to the exclusive jurisdiction of the courts at Mumbai, Maharashtra.
            </p>
          </div>

          <div className={styles.section}>
            <h2>Getting in touch</h2>
            <p>
              Questions about anything here? Email <a href="mailto:studio@teamdesign.in">studio@teamdesign.in</a> or visit our <Link href="/contact">contact page</Link>.
            </p>
          </div>

        </div>
      </section>
    </>
  );
}
