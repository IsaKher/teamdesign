'use client';

import { useState, FormEvent } from 'react';
import styles from './page.module.css';
import { STUDIO, JOBS } from '@/lib/siteContent';

const ROLES = ['Architect', 'Intern', 'Open Application'] as const;
type Role = typeof ROLES[number];

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

export default function CareersPage() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [role, setRole] = useState<Role | ''>('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');
    const form = e.currentTarget;
    const data = {
      name:      (form.elements.namedItem('name')      as HTMLInputElement).value,
      email:     (form.elements.namedItem('email')     as HTMLInputElement).value,
      phone:     (form.elements.namedItem('phone')     as HTMLInputElement).value,
      role,
      portfolio: (form.elements.namedItem('portfolio') as HTMLInputElement).value,
      note:      (form.elements.namedItem('note')      as HTMLTextAreaElement).value,
      website:   (form.elements.namedItem('website')   as HTMLInputElement).value,
    };
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10_000);
    try {
      const res = await fetch('/api/careers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        signal: controller.signal,
      });
      clearTimeout(timeout);
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Submission failed');
      }
      setStatus('success');
      form.reset();
      setRole('');
    } catch (err: unknown) {
      clearTimeout(timeout);
      setStatus('error');
      const isTimeout = err instanceof Error && err.name === 'AbortError';
      setErrorMsg(
        isTimeout
          ? 'Request timed out — please send your portfolio via WhatsApp directly.'
          : err instanceof Error ? err.message : 'Something went wrong.'
      );
    }
  }

  const waArchitect = `https://wa.me/${STUDIO.whatsappNumber}?text=${encodeURIComponent("Hi, I'd like to apply as an architect at Team Design. Sending my portfolio.")}`;
  const waIntern    = `https://wa.me/${STUDIO.whatsappNumber}?text=${encodeURIComponent("Hi, I'd like to apply for an internship at Team Design. Sending my portfolio.")}`;
  const waApply     = `https://wa.me/${STUDIO.whatsappNumber}?text=${encodeURIComponent("Hi, I'm applying at Team Design. Sending my portfolio.")}`;

  return (
    <>
      {/* ─── Page hero ──────────────────────────────────────────── */}
      <div className={styles.pageHero}>
        <span className={styles.pageLabel}>Work With Us</span>
        <h1 className={styles.pageTitle}>Join the practice.</h1>
        <p className={styles.pageSubtitle}>
          We are a small studio with a 25-year body of work. We work across scales — from a single room to a campus. We are looking for people who draw before they model, and who understand that a building is experienced before it is photographed.
        </p>
      </div>

      {/* ─── What we look for ───────────────────────────────────── */}
      <div className={styles.lookForSection}>
        <blockquote className={styles.lookForQuote}>
          &ldquo;You think in sections and can explain why. You&rsquo;re fluent in at least one 3D tool but don&rsquo;t treat software as the design. You can hold a conversation about materials and light — and you know the difference between a building that looks good and one that works.&rdquo;
        </blockquote>
      </div>

      {/* ─── Current openings ───────────────────────────────────── */}
      <div className={styles.openingsSection}>
        <span className={styles.sectionLabel}>Current Openings</span>
        {JOBS.length > 0 ? (
          <div className={styles.jobsGrid}>
            {JOBS.map((job) => (
              <div key={job.title} className={styles.jobCard}>
                <div className={styles.jobMeta}>
                  <span className={styles.jobType}>{job.type}</span>
                  {job.duration && <span className={styles.jobDuration}>{job.duration}</span>}
                </div>
                <h2 className={styles.jobTitle}>{job.title}</h2>
                <p className={styles.jobBrief}>{job.brief}</p>
                <div className={styles.jobActions}>
                  <a href="#apply" className={styles.applyBtn}>Apply via Website</a>
                  {job.linkedinUrl && (
                    <a href={job.linkedinUrl} target="_blank" rel="noopener noreferrer" className={styles.linkedinApply}>
                      Apply on LinkedIn →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.noOpenings}>
            <p className={styles.noOpeningsText}>
              No positions open right now — but we keep strong portfolios on file and reach out when the right project comes in. Send us your work below.
            </p>
            <a href={STUDIO.linkedinUrl} target="_blank" rel="noopener noreferrer" className={styles.linkedinFollow}>
              <LinkedInIcon />
              <span>Follow us on LinkedIn to hear about openings first</span>
            </a>
          </div>
        )}
      </div>

      {/* ─── Two tracks ─────────────────────────────────────────── */}
      <div className={styles.tracksSection}>
        <div className={styles.trackCard}>
          <span className={styles.trackLabel}>For Architects</span>
          <h2 className={styles.trackTitle}>Design staff &amp; project leads</h2>
          <p className={styles.trackBody}>
            We work on buildings that need to be thought through completely — from site strategy to material detail. If you&rsquo;re looking for a practice where design is taken seriously at every scale, and where you&rsquo;ll have genuine ownership of your work, talk to us.
          </p>
          <ul className={styles.trackList}>
            <li>3+ years experience in an architecture practice</li>
            <li>Strong hand drawing and design presentation skills</li>
            <li>Fluent in AutoCAD; SketchUp, Revit, or 3ds Max preferred</li>
            <li>COA registration preferred, not required</li>
          </ul>
          <a href={waArchitect} target="_blank" rel="noopener noreferrer" className={styles.trackWhatsapp}>
            Send portfolio via WhatsApp →
          </a>
        </div>

        <div className={styles.trackCard}>
          <span className={styles.trackLabel}>For Interns</span>
          <h2 className={styles.trackTitle}>Students &amp; recent graduates</h2>
          <p className={styles.trackBody}>
            Internships at Team Design are working engagements — you&rsquo;ll be part of live projects, client meetings, and site visits from day one. We take on interns year-round, typically for 6 months.
          </p>
          <ul className={styles.trackList}>
            <li>3rd year architecture students and above</li>
            <li>Portfolio of academic and studio work required</li>
            <li>Navi Mumbai / Mumbai base preferred; outstation applicants considered</li>
            <li>Stipend provided</li>
          </ul>
          <a href={waIntern} target="_blank" rel="noopener noreferrer" className={styles.trackWhatsapp}>
            Send portfolio via WhatsApp →
          </a>
        </div>
      </div>

      {/* ─── Application form ───────────────────────────────────── */}
      <div className={styles.formSection} id="apply">
        <div className={styles.formIntro}>
          <span className={styles.sectionLabel}>Apply</span>
          <h2 className={styles.formTitle}>Send us your work.</h2>
          <p className={styles.formSubtitle}>
            We look at every portfolio. If there&rsquo;s a fit — now or when the right brief comes in — we&rsquo;ll reach out.
          </p>
        </div>

        <div className={styles.formWrap}>
          {status === 'success' ? (
            <div className={styles.successMessage}>
              <p className={styles.successTitle}>Portfolio received.</p>
              <p className={styles.successText}>
                Thank you — we&rsquo;ll look through your work carefully. If there&rsquo;s a fit, we&rsquo;ll be in touch.
              </p>
              <a href={waApply} className={styles.successWhatsapp} target="_blank" rel="noopener noreferrer">
                Follow up on WhatsApp →
              </a>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <input name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true"
                style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }} />

              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label htmlFor="name" className={styles.label}>Your Name</label>
                  <input id="name" name="name" type="text" className={styles.input} placeholder="Rahul Mehta" required />
                </div>
                <div className={styles.field}>
                  <label htmlFor="phone" className={styles.label}>Phone / WhatsApp</label>
                  <input id="phone" name="phone" type="tel" className={styles.input} placeholder="+91 98765 43210" />
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="email" className={styles.label}>Email Address</label>
                <input id="email" name="email" type="email" className={styles.input} placeholder="rahul@example.com" required />
              </div>

              <div className={styles.field}>
                <span className={styles.label}>I&rsquo;m applying as</span>
                <div className={styles.roleCards}>
                  {ROLES.map((r) => (
                    <label key={r} className={styles.roleCard}>
                      <input type="radio" name="role" value={r} className={styles.roleCardInput}
                        onChange={() => setRole(r)} required />
                      <span className={styles.roleCardLabel}>{r}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="portfolio" className={styles.label}>Portfolio Link</label>
                <input id="portfolio" name="portfolio" type="url" className={styles.input}
                  placeholder="Behance, Google Drive, Issuu, or personal site" required />
                <span className={styles.fieldHint}>Any link we can open — Google Drive, Behance, Issuu, Dropbox, or your own website</span>
              </div>

              <div className={styles.field}>
                <label htmlFor="note" className={styles.label}>A brief note</label>
                <textarea id="note" name="note" className={styles.textarea} rows={4}
                  placeholder="Tell us where you are in your career, what kind of work you are drawn to, and why Team Design." />
                <span className={styles.fieldHint}>3–4 sentences is plenty. No cover letter needed.</span>
              </div>

              {status === 'error' && <p className={styles.errorMessage}>{errorMsg}</p>}

              <div className={styles.submitRow}>
                <button type="submit" className={styles.submit} disabled={status === 'submitting'}>
                  {status === 'submitting' ? 'Sending...' : 'Send Application →'}
                </button>
                <span className={styles.orText}>or</span>
                <a href={waApply} target="_blank" rel="noopener noreferrer" className={styles.whatsappAlt}>
                  Send via WhatsApp
                </a>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* ─── LinkedIn follow ─────────────────────────────────────── */}
      <div className={styles.linkedinSection}>
        <p className={styles.linkedinText}>
          Follow Team Design on LinkedIn for project updates and to be the first to hear when positions open.
        </p>
        <a href={STUDIO.linkedinUrl} target="_blank" rel="noopener noreferrer" className={styles.linkedinBtn}>
          <LinkedInIcon />
          Follow on LinkedIn
        </a>
      </div>
    </>
  );
}
