import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Team Design Architects collects, uses, and protects your information when you visit our website or get in touch.',
  alternates: { canonical: 'https://teamdesign.in/privacy' },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <div className={styles.pageHero}>
        <div className={styles.heroInner}>
          <span className={styles.heroLabel}>Privacy</span>
          <h1 className={styles.heroTitle}>
            How we handle <em className={styles.heroItalic}>your information.</em>
          </h1>
          <p className={styles.heroSub}>
            Plain English, no fine print. We collect very little, hold it briefly, and never sell it.
          </p>
          <span className={styles.updated}>Last updated · 25 April 2026</span>
        </div>
      </div>

      <section className={styles.body}>
        <div className={styles.bodyInner}>

          <div className={styles.section}>
            <h2>Who we are</h2>
            <p>
              Team Design Architects is an architecture and interior design practice based in Mumbai, India. This website — <em>teamdesign.in</em> — is operated by us. If you have any questions about how your information is handled, the easiest path is to email <a href="mailto:studio@teamdesign.in">studio@teamdesign.in</a>.
            </p>
          </div>

          <div className={styles.section}>
            <h2>What we collect</h2>
            <p>
              We try to collect as little as possible. There are two situations where any of your information reaches us at all.
            </p>

            <h3>When you fill out a form</h3>
            <p>
              Our contact and careers forms ask for your name, email, phone number, project type, budget, timeline, and a brief note. The careers form additionally asks for a portfolio link. We only see what you choose to type in.
            </p>

            <h3>When you simply visit</h3>
            <p>
              Like most websites, we use basic analytics to understand which pages people read and where the site is slow. This is anonymous, aggregated data — page views, country, device type, approximate load times. We don&rsquo;t track you across other sites. If you decline analytics in the cookie banner, none of this is collected.
            </p>
          </div>

          <div className={styles.section}>
            <h2>Why we collect it</h2>
            <ul>
              <li><strong>To reply to you</strong> — if you write to us, we use your details to write back. That&rsquo;s the whole purpose.</li>
              <li><strong>To improve the site</strong> — analytics help us see which work resonates and where the site is broken.</li>
              <li><strong>To remember your choice</strong> — if you accept or decline cookies, that preference sits on your own device so we don&rsquo;t ask again on every visit.</li>
            </ul>
            <p>
              We don&rsquo;t use your information for marketing emails, profiling, advertising, or any kind of automated decision-making.
            </p>
          </div>

          <div className={styles.section}>
            <h2>How long we keep it</h2>
            <p>
              Form submissions sit in our inbox until the conversation is finished, then move into archive — typically up to two years for active project enquiries, longer if a project goes ahead. Career applications are kept on file for up to two years in case the right opening comes up. You can ask us to delete anything sooner at any time.
            </p>
            <p>
              Anonymous analytics data is retained by our analytics provider for the duration of their default policy, which is currently 12 months.
            </p>
          </div>

          <div className={styles.section}>
            <h2>Who else sees it</h2>
            <p>
              A small number of services help run this site. Each only sees the information it needs to do its job, and none of them sell or share your data.
            </p>
            <ul>
              <li><strong>Vercel</strong> — hosts the website and processes basic request logs (IP, page requested) to keep the site online and secure. Servers are located globally; some are in the EU.</li>
              <li><strong>Sanity</strong> — stores the content you see on the site (project descriptions, images, contact details). It does not see form submissions or analytics.</li>
              <li><strong>Email provider</strong> — when our contact and careers forms send messages to our studio inbox, they pass through a transactional email service. The message content is your form text.</li>
            </ul>
            <p>
              We&rsquo;ll never share your details with anyone outside of running the site and replying to you.
            </p>
          </div>

          <div className={styles.section}>
            <h2>Cookies</h2>
            <p>
              We use a small number of cookies. The first time you visit, a banner asks if analytics is okay. Whatever you choose, we save that choice in your browser&rsquo;s local storage so we don&rsquo;t ask again. No cookies of any kind are set before you decide.
            </p>
            <p>
              Functional cookies (the consent record itself, anything needed to make a form work) are always present — without them the site would not function. Analytics cookies only load if you accept them.
            </p>
          </div>

          <div className={styles.section}>
            <h2>Your rights</h2>
            <p>
              Whichever country you&rsquo;re in, you can:
            </p>
            <ul>
              <li>Ask what information we hold about you</li>
              <li>Ask for a copy of it</li>
              <li>Ask us to correct anything wrong</li>
              <li>Ask us to delete it</li>
              <li>Withdraw your consent at any time, including for analytics</li>
            </ul>
            <p>
              For visitors in the European Union or United Kingdom, the General Data Protection Regulation (GDPR) gives you these rights formally. The legal basis we rely on is your consent (analytics) and our legitimate interest in replying to enquiries you initiate (forms). For visitors in California, the CCPA grants similar rights — and we don&rsquo;t sell personal information.
            </p>
            <p>
              To exercise any of the above, email <a href="mailto:studio@teamdesign.in">studio@teamdesign.in</a> with &ldquo;Privacy request&rdquo; in the subject line. We&rsquo;ll respond within 30 days.
            </p>
          </div>

          <div className={styles.section}>
            <h2>Children</h2>
            <p>
              This site is not intended for children under 16. We don&rsquo;t knowingly collect information from children. If you believe a child has sent us information, write to us and we&rsquo;ll delete it.
            </p>
          </div>

          <div className={styles.section}>
            <h2>If this changes</h2>
            <p>
              If we change how this works, we&rsquo;ll update this page and refresh the date at the top. For meaningful changes — new third parties, new purposes — we&rsquo;ll do more than that and flag it visibly on the site.
            </p>
            <p>
              For anything else, our <Link href="/terms">terms of service</Link> covers how the site can be used. Or just <Link href="/contact">write to us</Link>.
            </p>
          </div>

        </div>
      </section>
    </>
  );
}
