'use client';

import { useState } from 'react';
import styles from './page.module.css';

const PROJECT_TYPES = [
  { id: 'res', label: 'Residential',   pLo: 8,  pHi: 10, cLo: 1800, cHi: 2400, unit: 'of construction cost' },
  { id: 'com', label: 'Commercial',    pLo: 6,  pHi: 8,  cLo: 2000, cHi: 2800, unit: 'of construction cost' },
  { id: 'ins', label: 'Institutional', pLo: 6,  pHi: 8,  cLo: 1600, cHi: 2200, unit: 'of construction cost' },
  { id: 'int', label: 'Interiors',     pLo: 10, pHi: 12, cLo: 900,  cHi: 1400, unit: 'of interior works cost' },
];

function fmt(n: number): string {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(1)}Cr`;
  if (n >= 100000)   return `₹${(n / 100000).toFixed(1)}L`;
  return `₹${Math.round(n / 1000)}K`;
}

export default function FeesEstimator() {
  const [area, setArea]     = useState(1500);
  const [typeId, setTypeId] = useState('res');
  const t = PROJECT_TYPES.find(x => x.id === typeId)!;

  const cLo = area * t.cLo;
  const cHi = area * t.cHi;
  const fLo = (cLo * t.pLo) / 100;
  const fHi = (cHi * t.pHi) / 100;
  const dLo = fLo * 0.1;
  const dHi = fHi * 0.1;
  const gLo = (fLo + dLo) * 0.18;
  const gHi = (fHi + dHi) * 0.18;
  const tLo = fLo + dLo + gLo;
  const tHi = fHi + dHi + gHi;

  return (
    <div className={styles.estimatorWidget}>
      <div className={styles.estimatorGrid}>

        {/* Controls */}
        <div className={styles.estControls}>
          <div className={styles.estField}>
            <label className={styles.estFieldLabel}>Built-up area</label>
            <div className={styles.areaDisplay}>
              {area.toLocaleString('en-IN')}
              <span className={styles.areaUnit}>sq ft</span>
            </div>
            <input
              type="range"
              className={styles.slider}
              min={300}
              max={15000}
              step={100}
              value={area}
              onChange={e => setArea(Number(e.target.value))}
              aria-label="Built-up area in square feet"
            />
            <div className={styles.sliderRange}>
              <span>300 sq ft</span>
              <span>15,000 sq ft</span>
            </div>
          </div>

          <div className={styles.estField}>
            <label className={styles.estFieldLabel}>Project type</label>
            <div className={styles.typeButtons}>
              {PROJECT_TYPES.map(p => (
                <button
                  key={p.id}
                  className={`${styles.typeBtn}${typeId === p.id ? ` ${styles.typeBtnActive}` : ''}`}
                  onClick={() => setTypeId(p.id)}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className={styles.estResult}>
          <div>
            <p className={styles.erLabel}>Estimated architectural fee</p>
            <div className={styles.erRange}>{fmt(fLo)} – {fmt(fHi)}</div>
            <p className={styles.erPct}>{t.pLo}–{t.pHi}% {t.unit}</p>

            <div className={styles.erBreakdown}>
              <div className={styles.erLine}>
                <span className={styles.erLineLabel}>Est. construction / works cost</span>
                <span className={styles.erLineValue}>{fmt(cLo)} – {fmt(cHi)}</span>
              </div>
              <div className={styles.erLine}>
                <span className={styles.erLineLabel}>Professional fee</span>
                <span className={styles.erLineValue}>{fmt(fLo)} – {fmt(fHi)}</span>
              </div>
              <div className={styles.erLine}>
                <span className={styles.erLineLabel}>Documentation charges (+10%)</span>
                <span className={styles.erLineValue}>{fmt(dLo)} – {fmt(dHi)}</span>
              </div>
              <div className={styles.erLine}>
                <span className={styles.erLineLabel}>GST at 18%</span>
                <span className={styles.erLineValue}>{fmt(gLo)} – {fmt(gHi)}</span>
              </div>
              <div className={`${styles.erLine} ${styles.erLineTotal}`}>
                <span className={styles.erLineLabelStrong}>Total payable (incl. GST)</span>
                <span className={styles.erLineValueStrong}>{fmt(tLo)} – {fmt(tHi)}</span>
              </div>
            </div>
          </div>

          <p className={styles.erDisc}>
            Indicative estimate based on Mumbai market construction costs. Structural, MEP &amp; specialist
            consultant fees excluded. Actual fee confirmed in Letter of Appointment. Not a binding quotation.
          </p>
        </div>

      </div>
    </div>
  );
}
