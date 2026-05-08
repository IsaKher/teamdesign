'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './TeamCarousel.module.css';
import { WARM_BLUR } from '@/lib/siteContent';
import type { SanityTeamMember } from '@/lib/sanity';

interface Props {
  members: SanityTeamMember[];
}

function initials(name: string) {
  return name.split(/[\s(]/)[0].slice(0, 2).toUpperCase();
}

export default function TeamCarousel({ members }: Props) {
  const [active, setActive] = useState(0);

  if (members.length === 0) return null;

  const activeMember = members[active];
  const backIdx      = (active + 1) % members.length;
  const showStack    = members.length > 1;

  return (
    <section className={styles.section}>
      <div className={styles.inner}>

        {/* ── Left: card stack ─────────────────────────────────────── */}
        <div className={styles.left}>
          <div className={styles.stack}>
            {/* Invisible sizer — sets stack height from front card */}
            <div className={styles.stackSizer} aria-hidden="true" />

            {/* Elliptical shadow */}
            <div className={styles.shadow} aria-hidden="true" />

            {/* All member cards rendered in DOM — instant cut, no flash */}
            {members.map((m, i) => {
              const isFront = i === active;
              const isBack  = showStack && i === backIdx;
              const cls = isFront ? styles.cardFront
                        : isBack  ? styles.cardBack
                        :           styles.cardHidden;

              return (
                <button
                  key={m.name}
                  className={cls}
                  onClick={isBack ? () => setActive(i) : undefined}
                  disabled={!isBack && !isFront}
                  aria-label={isBack ? `View ${m.name}` : undefined}
                  tabIndex={isBack ? 0 : -1}
                >
                  {m.photoUrl ? (
                    <Image
                      src={m.photoUrl}
                      alt={m.photoAlt ?? `${m.name} — Team Design Architects`}
                      fill
                      priority={isFront}
                      sizes="(max-width: 768px) 70vw, 35vw"
                      style={{ objectFit: 'cover', objectPosition: 'center top' }}
                      placeholder="blur"
                      blurDataURL={m.photoLqip ?? WARM_BLUR}
                    />
                  ) : (
                    <span className={styles.placeholder}>{initials(m.name)}</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Name tabs — one per member */}
          {showStack && (
            <div className={styles.nameTabs} role="tablist">
              {members.map((m, i) => (
                <button
                  key={m.name}
                  role="tab"
                  aria-selected={i === active}
                  className={`${styles.nameTab} ${i === active ? styles.nameTabActive : ''}`}
                  onClick={() => setActive(i)}
                >
                  {m.name.split(' ')[0]}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Right: bio ───────────────────────────────────────────── */}
        <div className={styles.right}>
          <span className={styles.label}>{activeMember.role ?? 'Architect'}</span>
          <h2 className={styles.name}>{activeMember.name}</h2>

          {activeMember.bio && (
            <p className={styles.bio}>{activeMember.bio}</p>
          )}

          {(activeMember.education || activeMember.founding || activeMember.award) && (
            <>
              <div className={styles.divider} />
              <div className={styles.credentials}>
                {activeMember.education && (
                  <div className={styles.cred}>
                    <span className={styles.credValue}>{activeMember.education}</span>
                    <span className={styles.credLabel}>Rachana Sansad Academy of Architecture, Mumbai</span>
                  </div>
                )}
                {activeMember.founding && (
                  <div className={styles.cred}>
                    <span className={styles.credValue}>{activeMember.founding}</span>
                    <span className={styles.credLabel}>Year Practice Founded</span>
                  </div>
                )}
                {activeMember.award && (
                  <div className={styles.cred}>
                    <span className={styles.credValue}>{activeMember.award}</span>
                    <span className={styles.credLabel}>Recognition</span>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

      </div>
    </section>
  );
}
