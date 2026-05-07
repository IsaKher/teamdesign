'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

type ProjectType = 'residential' | 'commercial' | 'institutional' | 'interiors';

const CONSTRUCTION_RATES: Record<ProjectType, { low: number; high: number }> = {
  residential:   { low: 1800, high: 2400 },
  commercial:    { low: 2200, high: 2800 },
  institutional: { low: 1600, high: 2200 },
  interiors:     { low: 1200, high: 1800 },
};

const FEE_RATES: Record<ProjectType, { low: number; high: number }> = {
  residential:   { low: 0.08, high: 0.10 },
  commercial:    { low: 0.06, high: 0.08 },
  institutional: { low: 0.06, high: 0.08 },
  interiors:     { low: 0.10, high: 0.12 },
};

const PCT_LABEL: Record<ProjectType, string> = {
  residential:   '8–10%',
  commercial:    '6–8%',
  institutional: '6–8%',
  interiors:     '10–12%',
};

const TYPICAL_AREA: Record<ProjectType, number> = {
  residential:   1500,
  interiors:     1200,
  commercial:    2500,
  institutional: 5000,
};

// Maps to contact form radio values
const CONTACT_TYPE: Record<ProjectType, string> = {
  residential:   'residential-apartment',
  interiors:     'interiors',
  commercial:    'commercial',
  institutional: 'institutional',
};

const PROJECT_OPTIONS: { type: ProjectType; label: string; sub: string }[] = [
  { type: 'residential',   label: 'Building a home',            sub: 'New construction — apartment, villa, or bungalow' },
  { type: 'interiors',     label: 'Renovating a space',         sub: 'Interior fit-out of an existing home or office' },
  { type: 'commercial',    label: 'Office or commercial',       sub: 'Retail, workplace, hospitality, or mixed-use' },
  { type: 'institutional', label: 'School or institution',      sub: 'Hospital, campus, healthcare, or public building' },
];

const SIZE_PRESETS: { label: string; sub: string; area: number }[] = [
  { label: 'Studio / 1BHK',             sub: 'Around 400–700 sq ft',      area: 550  },
  { label: '2–3 BHK apartment',         sub: 'Around 900–1,600 sq ft',    area: 1200 },
  { label: 'Large apartment / penthouse', sub: 'Around 2,000–4,000 sq ft', area: 3000 },
  { label: 'Villa or bungalow',         sub: '5,000 sq ft and above',      area: 6000 },
];

function fmtINR(n: number): string {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(1)} Cr`;
  if (n >= 100000)   return `₹${(n / 100000).toFixed(1)}L`;
  if (n >= 1000)     return `₹${Math.round(n / 1000)}K`;
  return `₹${Math.round(n)}`;
}

const STEP_LABELS = ['Project type', 'Project size', 'Your estimate'];

export default function FeeEstimator() {
  const [step, setStep]               = useState<1 | 2 | 3>(1);
  const [type, setType]               = useState<ProjectType | null>(null);
  const [area, setArea]               = useState<number>(1500);
  const [activePreset, setActivePreset] = useState<number | null>(null);
  const [showBreakdown, setShowBreakdown] = useState(false);

  const sliderPct = `${Math.round(((area - 300) / (15000 - 300)) * 100)}%`;

  const cr = type ? CONSTRUCTION_RATES[type] : { low: 0, high: 0 };
  const fr = type ? FEE_RATES[type]          : { low: 0, high: 0 };

  const constLow  = cr.low  * area;
  const constHigh = cr.high * area;
  const feeLow    = constLow  * fr.low;
  const feeHigh   = constHigh * fr.high;
  const docLow    = feeLow  * 0.10;
  const docHigh   = feeHigh * 0.10;
  const gstLow    = (feeLow  + docLow)  * 0.18;
  const gstHigh   = (feeHigh + docHigh) * 0.18;
  const totalLow  = feeLow  + docLow  + gstLow;
  const totalHigh = feeHigh + docHigh + gstHigh;

  function selectType(t: ProjectType) {
    setType(t);
    setArea(TYPICAL_AREA[t]);
    setActivePreset(null);
    setStep(2);
  }

  function selectPreset(i: number) {
    setArea(SIZE_PRESETS[i].area);
    setActivePreset(i);
  }

  const contactHref = type
    ? `/contact?type=${CONTACT_TYPE[type]}&area=${area}`
    : '/contact';

  return (
    <div className={styles.estimatorCard}>

      {/* ─── Step indicator ───────────────────────────────────────────────── */}
      <div className={styles.stepIndicator}>
        <div className={styles.stepDots}>
          {([1, 2, 3] as const).map(s => (
            <button
              key={s}
              className={`${styles.stepDot} ${step === s ? styles.stepDotActive : ''} ${step > s ? styles.stepDotDone : ''}`}
              onClick={() => { if (step > s) setStep(s); }}
              disabled={step <= s}
              aria-label={`Go to step ${s}`}
            />
          ))}
        </div>
        <span className={styles.stepLabel}>{STEP_LABELS[step - 1]}</span>
      </div>

      {/* ─── Step 1: Project type ─────────────────────────────────────────── */}
      {step === 1 && (
        <div className={styles.stepContent}>
          <p className={styles.stepQuestion}>What are you looking to build?</p>
          <div className={styles.optionGrid}>
            {PROJECT_OPTIONS.map((opt) => (
              <button
                key={opt.type}
                className={styles.optionCard}
                onClick={() => selectType(opt.type)}
              >
                <span className={styles.optionLabel}>{opt.label}</span>
                <span className={styles.optionSub}>{opt.sub}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ─── Step 2: Project size ─────────────────────────────────────────── */}
      {step === 2 && (
        <div className={styles.stepContent}>
          <p className={styles.stepQuestion}>Roughly how big is the project?</p>
          <p className={styles.stepHint}>Pick the closest option — you can fine-tune below.</p>

          <div className={styles.sizePresets}>
            {SIZE_PRESETS.map((preset, i) => (
              <button
                key={i}
                className={`${styles.sizePreset} ${activePreset === i ? styles.sizePresetActive : ''}`}
                onClick={() => selectPreset(i)}
              >
                <span className={styles.sizePresetLabel}>{preset.label}</span>
                <span className={styles.sizePresetSub}>{preset.sub}</span>
              </button>
            ))}
          </div>

          {/* Slider — always visible, presets set its value */}
          <div className={styles.sliderBlock}>
            <div className={styles.sliderHeader}>
              <span className={styles.sliderHint}>Adjust size</span>
              <div className={styles.areaDisplay}>
                <span className={styles.areaValue}>{area.toLocaleString('en-IN')}</span>
                <span className={styles.areaUnit}>sq ft</span>
              </div>
            </div>
            <div className={styles.sliderWrap}>
              <input
                type="range" min={300} max={15000} step={100} value={area}
                onChange={e => { setArea(Number(e.target.value)); setActivePreset(null); }}
                className={styles.slider}
                style={{ '--pct': sliderPct } as React.CSSProperties}
                aria-label="Built-up area in square feet"
              />
              <div className={styles.sliderLabels}>
                <span>300 sq ft</span>
                <span>15,000 sq ft</span>
              </div>
            </div>
          </div>

          <button className={styles.continueBtn} onClick={() => setStep(3)}>
            See my estimate →
          </button>
        </div>
      )}

      {/* ─── Step 3: Result ───────────────────────────────────────────────── */}
      {step === 3 && type && (
        <div className={styles.stepContent}>
          <p className={styles.stepQuestion}>Your indicative fee range</p>

          {/* The one number that matters */}
          <div className={styles.totalRange}>
            {fmtINR(totalLow)} – {fmtINR(totalHigh)}
          </div>
          <span className={styles.totalSub}>Total payable, inclusive of GST &amp; documentation</span>

          {/* Prominent disclaimer — not a footnote */}
          <div className={styles.disclaimerBox}>
            <span className={styles.disclaimerTitle}>This is a directional estimate — not a quotation.</span>
            <p className={styles.disclaimerText}>
              These figures are based on current Mumbai market construction benchmarks and should be treated
              as a rough sense-check only. Your actual fee depends on site conditions, programme complexity,
              and the confirmed scope of works. The fee you will pay is agreed and confirmed only in a
              signed Letter of Appointment — not on this page.
            </p>
          </div>

          {/* Breakdown toggle */}
          <button
            className={styles.breakdownToggle}
            onClick={() => setShowBreakdown(v => !v)}
          >
            <span>{showBreakdown ? 'Hide breakdown' : 'How is this calculated?'}</span>
            <span className={`${styles.faqIcon} ${showBreakdown ? styles.faqIconOpen : ''}`}>+</span>
          </button>

          {showBreakdown && (
            <div className={styles.feeBreakdown}>
              <div className={styles.feeRow}>
                <span>Est. construction / works cost</span>
                <span>{fmtINR(constLow)} – {fmtINR(constHigh)}</span>
              </div>
              <div className={styles.feeRow}>
                <span>Professional fee ({PCT_LABEL[type]} of works cost)</span>
                <span>{fmtINR(feeLow)} – {fmtINR(feeHigh)}</span>
              </div>
              <div className={styles.feeRow}>
                <span>Documentation charges (+10%)</span>
                <span>{fmtINR(docLow)} – {fmtINR(docHigh)}</span>
              </div>
              <div className={styles.feeRow}>
                <span>GST at 18%</span>
                <span>{fmtINR(gstLow)} – {fmtINR(gstHigh)}</span>
              </div>
              <div className={`${styles.feeRow} ${styles.feeRowTotal}`}>
                <span>Total payable (incl. GST)</span>
                <span>{fmtINR(totalLow)} – {fmtINR(totalHigh)}</span>
              </div>
            </div>
          )}

          {/* CTA */}
          <div className={styles.estimatorCta}>
            <Link href={contactHref} className={styles.estimatorCtaBtn}>
              Discuss your actual project →
            </Link>
            <p className={styles.estimatorCtaNote}>
              The first conversation is free. No commitment required.
            </p>
          </div>

          {/* Change links */}
          <div className={styles.changeLinks}>
            <button className={styles.changeLink} onClick={() => { setStep(1); setShowBreakdown(false); }}>
              ← Change project type
            </button>
            <button className={styles.changeLink} onClick={() => { setStep(2); setShowBreakdown(false); }}>
              ← Change size
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
