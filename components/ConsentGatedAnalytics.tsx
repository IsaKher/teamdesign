'use client';

import { useEffect, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

declare function gtag(...args: unknown[]): void;

const STORAGE_KEY = 'td_cookie_consent_v1';
const CONSENT_EVENT = 'td:cookie-consent';

interface ConsentRecord {
  choice: 'accepted' | 'declined';
  analytics: boolean;
  timestamp: number;
}

/**
 * Mounts Vercel Analytics + Speed Insights only when the user has given
 * explicit consent via the cookie banner.
 *
 * Subscribes to the `td:cookie-consent` CustomEvent (emitted by
 * CookieBanner) so a fresh accept/decline takes effect immediately —
 * no page reload required.
 *
 * Vercel Analytics is technically cookieless and would not legally
 * require consent in most jurisdictions, but we promised the gate in
 * the privacy policy and cookie banner copy. Honour it.
 */
export default function ConsentGatedAnalytics() {
  const [analyticsOn, setAnalyticsOn] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    function readConsent(): boolean {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return false;
        const rec = JSON.parse(raw) as ConsentRecord;
        return rec.analytics === true;
      } catch {
        return false;
      }
    }

    function applyConsent(analytics: boolean) {
      setAnalyticsOn(analytics);
      if (typeof gtag !== 'undefined') {
        gtag('consent', 'update', {
          analytics_storage: analytics ? 'granted' : 'denied',
        });
      }
    }

    applyConsent(readConsent());

    function onConsent(e: Event) {
      const detail = (e as CustomEvent<ConsentRecord>).detail;
      applyConsent(detail?.analytics === true);
    }

    window.addEventListener(CONSENT_EVENT, onConsent);
    return () => window.removeEventListener(CONSENT_EVENT, onConsent);
  }, []);

  if (!analyticsOn) return null;

  return (
    <>
      {/* Vercel Analytics + Speed Insights — still consent-gated */}
      <Analytics />
      <SpeedInsights />
    </>
  );
}
