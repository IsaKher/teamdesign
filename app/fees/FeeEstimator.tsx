'use client';

import { useState } from 'react';
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
  residential:   '8–10',
  commercial:    '6–8',
  institutional: '6–8',
  interiors:     '10–12',
};

const COST_LABEL: Record<ProjectType, string> = {
  residential:   'of construction cost',
  commercial:    'of construction cost',
  institutional: 'of construction cost',
  interiors:     'of cost of interior works',
};

function fmtINR(n: number): string {
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  if (n >= 1000)   return `₹${Math.round(n / 1000)}K`;
  return `₹${Math.round(n)}`;
}

const PROJECT_TYPES: { key: ProjectType; label: string }[] = [
  { key: 'residential',   label: 'Residential' },
  { key: 'commercial',    label: 'Commercial' },
  { key: 'institutional', label: 'Institutional' },
  { key: 'interiors',     label: 'Interiors' },
];

export default function FeeEstimator() {
  const [area, setArea]         = useState(1500);
  const [type, setType]         = useState<ProjectType>('residential');

  const cr  = CONSTRUCTION_RATES[type];
  const fr  = FEE_RATES[type];
  // Percentage of slider travel — drives the amber fill on the track
  const sliderPct = `${Math.round(((area - 300) / (15000 - 300)) * 100)}%`;

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

  return (
    <div className={styles.estimatorCard}>
      {/* Left panel */}
      <div className={styles.estimatorLeft}>
        <span className={styles.estimatorFieldLabel}>Built-up area</span>
        <div className={styles.areaDisplay}>
          <span className={styles.areaValue}>{area.toLocaleString('en-IN')}</span>
          <span className={styles.areaUnit}>sq ft</span>
        </div>

        <div className={styles.sliderWrap}>
          <input
            type="range"
            min={300}
            max={15000}
            step={100}
            value={area}
            onChange={e => setArea(Number(e.target.value))}
            className={styles.slider}
            style={{ '--pct': sliderPct } as React.CSSProperties}
            aria-label="Built-up area in square feet"
          />
          <div className={styles.sliderLabels}>
            <span>300 sq ft</span>
            <span>15,000 sq ft</span>
          </div>
        </div>

        <span className={styles.estimatorFieldLabel} style={{ marginTop: '36px' }}>Project type</span>
        <div className={styles.typeButtons}>
          {PROJECT_TYPES.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setType(key)}
              className={`${styles.typeBtn} ${type === key ? styles.typeBtnActive : ''}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className={styles.estimatorRight}>
        <span className={styles.estimatorFieldLabel}>Estimated architectural fee</span>

        <div className={styles.feeRange}>
          {fmtINR(feeLow)} – {fmtINR(feeHigh)}
        </div>
        <span className={styles.feePct}>
          {PCT_LABEL[type]}% {COST_LABEL[type]}
        </span>

        <div className={styles.feeBreakdown}>
          <div className={styles.feeRow}>
            <span>Est. construction / works cost</span>
            <span>{fmtINR(constLow)} – {fmtINR(constHigh)}</span>
          </div>
          <div className={styles.feeRow}>
            <span>Professional fee</span>
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

        <p className={styles.estimatorDisclaimer}>
          Indicative estimate based on Mumbai market construction costs. Structural, MEP &amp; specialist consultant fees excluded. Actual fee confirmed in Letter of Appointment. Not a binding quotation.
        </p>
      </div>
    </div>
  );
}
