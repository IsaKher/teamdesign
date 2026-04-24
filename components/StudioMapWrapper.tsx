import dynamic from 'next/dynamic';

/* Leaflet requires window — load entirely client-side, no SSR */
export default dynamic(() => import('./StudioMap'), {
  ssr: false,
  loading: () => (
    <div style={{
      width: '100%',
      height: '520px',
      background: '#F0EBE3',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <span style={{
        fontFamily: 'var(--font-sans)',
        fontSize: '11px',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'rgba(20, 16, 12, 0.30)',
      }}>
        Loading map
      </span>
    </div>
  ),
});
