'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './CookieBanner.module.css';

const STORAGE_KEY = 'td_cookie_consent_v1';

type Choice = 'accepted' | 'declined';
interface ConsentRecord {
  choice: Choice;
  analytics: boolean;
  timestamp: number;
}

/** Read consent from localStorage. Returns null if the user hasn't decided yet. */
function readConsent(): ConsentRecord | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ConsentRecord;
  } catch {
    return null;
  }
}

/** Persist consent and broadcast a custom event so other parts of the app
 *  (e.g. an analytics loader) can react without a page reload. */
function writeConsent(rec: ConsentRecord) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rec));
    window.dispatchEvent(new CustomEvent('td:cookie-consent', { detail: rec }));
  } catch {
    /* localStorage unavailable — degrade silently */
  }
}

export default function CookieBanner() {
  // `null` = not yet decided; banner shows
  // `closed` = banner hidden (decision saved or on a route that hides it)
  const [view, setView] = useState<'hidden' | 'banner' | 'manage'>('hidden');
  const [analyticsOn, setAnalyticsOn] = useState(true);

  useEffect(() => {
    // Only show after the first paint to avoid hydration mismatch
    const existing = readConsent();
    if (!existing) {
      // Defer slightly so the page has settled visually first
      const t = window.setTimeout(() => setView('banner'), 600);
      return () => window.clearTimeout(t);
    }
  }, []);

  function accept() {
    writeConsent({ choice: 'accepted', analytics: true, timestamp: Date.now() });
    setView('hidden');
  }

  function decline() {
    writeConsent({ choice: 'declined', analytics: false, timestamp: Date.now() });
    setView('hidden');
  }

  function saveManage() {
    writeConsent({
      choice: analyticsOn ? 'accepted' : 'declined',
      analytics: analyticsOn,
      timestamp: Date.now(),
    });
    setView('hidden');
  }

  if (view === 'hidden') return null;

  return (
    <div
      className={styles.banner}
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
    >
      {view === 'banner' ? (
        <>
          <p className={styles.text}>
            We use a small number of cookies — one to remember this choice, and (if you accept) anonymous analytics that help us understand which pages people read. We don&rsquo;t use advertising or tracking cookies. See our <Link href="/privacy">privacy policy</Link>.
          </p>
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.btnLink}
              onClick={() => setView('manage')}
            >
              Manage
            </button>
            <button
              type="button"
              className={styles.btnGhost}
              onClick={decline}
            >
              Decline
            </button>
            <button
              type="button"
              className={styles.btnPrimary}
              onClick={accept}
            >
              Accept
            </button>
          </div>
        </>
      ) : (
        <div className={styles.managePanel}>
          <div className={styles.manageHeader}>
            <span className={styles.manageTitle}>Cookie preferences</span>
            <button
              type="button"
              className={styles.manageClose}
              onClick={() => setView('banner')}
              aria-label="Back to cookie banner"
            >
              ×
            </button>
          </div>

          <div className={styles.toggleRow}>
            <div className={styles.toggleInfo}>
              <span className={styles.toggleLabel}>Essential</span>
              <span className={styles.toggleHint}>
                Required for the site to work — remembers this consent choice and supports form submissions. Cannot be disabled.
              </span>
            </div>
            <span className={styles.required}>Always on</span>
          </div>

          <div className={styles.toggleRow}>
            <div className={styles.toggleInfo}>
              <span className={styles.toggleLabel}>Analytics</span>
              <span className={styles.toggleHint}>
                Anonymous, aggregated stats — page views, country, device type. Helps us see which work resonates and where the site is slow.
              </span>
            </div>
            <label className={styles.toggle}>
              <input
                type="checkbox"
                checked={analyticsOn}
                onChange={(e) => setAnalyticsOn(e.target.checked)}
                aria-label="Analytics cookies"
              />
              <span className={styles.toggleSlider} />
            </label>
          </div>

          <div className={styles.manageActions}>
            <button
              type="button"
              className={styles.btnGhost}
              onClick={() => setView('banner')}
            >
              Back
            </button>
            <button
              type="button"
              className={styles.btnPrimary}
              onClick={saveManage}
            >
              Save preferences
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
