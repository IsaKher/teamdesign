export const revalidate = 3600;

import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'People',
  description: 'Meet the team behind Team Design Architects — led by Principal Architect Tasadduq Kher. 25+ years building across Mumbai, Maharashtra, and India.',
  keywords: ['Team Design Architects team', 'Tasadduq Kher architect', 'Mumbai architecture firm team', 'principal architect Mumbai'],
  alternates: { canonical: 'https://teamdesignarchitects.com/people' },
  openGraph: {
    title: 'People — Team Design Architects',
    description: 'Meet the team behind Team Design Architects — led by Principal Architect Tasadduq Kher. 25+ years building across Mumbai and India.',
    url: 'https://teamdesignarchitects.com/people',
    images: [{ url: 'https://teamdesignarchitects.com/tasadduq-kher.webp', width: 900, height: 1200, alt: 'Tasadduq Kher — Principal Architect, Team Design' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'People — Team Design Architects',
    description: 'Meet the team behind Team Design Architects, led by Principal Architect Tasadduq Kher.',
    images: ['https://teamdesignarchitects.com/tasadduq-kher.webp'],
  },
};
import MemberImage from './MemberImage';
import styles from './page.module.css';
import { getTeamMembers, type SanityTeamMember } from '@/lib/sanity';
import { WARM_BLUR } from '@/lib/siteContent';

export default async function PeoplePage() {
  const members = await getTeamMembers();

  const principal    = members.find(m => m.tier === 'principal') ?? null;
  const featured     = members.filter(m => m.tier === 'featured');
  const core         = members.filter(m => m.tier === 'core');
  const operations   = members.filter(m => m.tier === 'operations');

  return (
    <>
      {/* Page header */}
      <div className={styles.pageHero}>
        <span className={styles.pageLabel}>The Practice</span>
        <h1 className={styles.pageTitle}>Architects & Designers</h1>
        <p className={styles.pageSubtitle}>Architecture is made by people, not firms. Meet the team behind Team Design.</p>
      </div>

      {/* Principal */}
      {principal && (
        <section className={styles.principalSection}>
          <div className={styles.principalInner}>
            <div className={styles.principalImage}>
              <Image
                src={principal.photoUrl ?? '/tasadduq-kher.webp'}
                alt={principal.photoAlt ?? `${principal.name} — Principal Architect, Team Design`}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 40vw"
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
                placeholder="blur"
                blurDataURL={principal.photoLqip ?? WARM_BLUR}
              />
            </div>
            <div className={styles.principalText}>
              <span className={styles.sectionLabel}>Principal Architect</span>
              <h2 className={styles.principalName}>{principal.name}</h2>
              <p className={styles.principalRole}>{principal.role}</p>
              <p className={styles.principalBio}>{principal.bio}</p>
              <div className={styles.credentials}>
                {principal.education && (
                  <div className={styles.cred}>
                    <span className={styles.credValue}>{principal.education}</span>
                  </div>
                )}
                {principal.founding && (
                  <div className={styles.cred}>
                    <span className={styles.credLabel}>Founded Team Design</span>
                    <span className={styles.credValue}>{principal.founding}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Core Management */}
      {(featured.length > 0 || core.length > 0) && (
        <section className={styles.coreSection}>
          <div className={styles.coreHeader}>
            <span className={styles.sectionLabel}>Core Management</span>
            <h2 className={styles.teamTitle}>The people who shape every project.</h2>
          </div>

          {/* Featured members — large cards */}
          {featured.length > 0 && (
            <div className={styles.coreTier1}>
              {featured.map(member => (
                <MemberCard key={member.name} member={member} large />
              ))}
            </div>
          )}

          {/* Standard core members */}
          {core.length > 0 && (
            <div className={styles.coreTier2}>
              {core.map(member => (
                <MemberCard key={member.name} member={member} />
              ))}
            </div>
          )}
        </section>
      )}

      {/* Core Operations */}
      {operations.length > 0 && (
        <section className={styles.opsSection}>
          <div className={styles.opsHeader}>
            <span className={styles.sectionLabel}>Core Operations</span>
            <h2 className={styles.opsTitle}>Keeping the studio running.</h2>
          </div>
          <div className={styles.opsRow}>
            {operations.map(member => (
              <div key={member.name} className={styles.opsCard}>
                <span className={styles.opsName}>{member.name}</span>
                <span className={styles.opsRole}>{member.role}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

// ─── Shared card component ────────────────────────────────────────────────────

function MemberCard({ member, large = false }: { member: SanityTeamMember; large?: boolean }) {
  const cardClass = large
    ? `${styles.memberCard} ${styles.memberCardLarge}`
    : styles.memberCard;

  const sizes = large
    ? '(max-width: 768px) 100vw, 30vw'
    : '(max-width: 768px) 50vw, 20vw';

  const firstSentence = member.bio ? member.bio.split('.')[0] + '.' : '';

  return (
    <div className={cardClass}>
      <div className={styles.memberImage}>
        <MemberImage
          src={member.photoUrl ?? ''}
          name={member.name}
          sizes={sizes}
        />
        {firstSentence && (
          <div className={styles.memberOverlay}>
            <p className={styles.memberBioHover}>{firstSentence}</p>
          </div>
        )}
      </div>
      <div className={styles.memberMeta}>
        <span className={styles.memberName}>{member.name}</span>
        <span className={styles.memberRole}>{member.role}</span>
        {member.award && (
          <span className={styles.memberAward}>{member.award}</span>
        )}
      </div>
    </div>
  );
}
