'use client';

import { useEffect, useRef, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './StudioMap.module.css';

const STUDIOS = [
  {
    id: 'parel',
    label: 'Studio — Parel',
    position: [18.9919709, 72.8314168] as [number, number],
    lines: ['10G, Thacker Industrial Estate', 'NM Joshi Marg, Parel (E)', 'Mumbai 400013'],
    directionsUrl: 'https://maps.app.goo.gl/ygVTjd4QU5RYgFLS6',
  },
  {
    id: 'kopar',
    label: 'Studio — Kopar Khairane',
    position: [19.1030, 73.0069] as [number, number],
    lines: ['A-145/6A, Pawane Village Midc Road', 'MIDC Sector 2, Kopar Khairane', 'Mumbai 400710'],
    directionsUrl: 'https://maps.google.com/?q=A-145+Pawane+Village+MIDC+Kopar+Khairane+Mumbai+400710',
  },
];

type Studio = typeof STUDIOS[number];

/* Auto-fits the viewport to show both pins with breathing room */
function BoundsHandler() {
  const map = useMap();
  useEffect(() => {
    const bounds = L.latLngBounds(STUDIOS.map(s => s.position));
    map.fitBounds(bounds, { padding: [80, 120] });
  }, [map]);
  return null;
}

/* Opens its popup immediately on mount and keeps it open */
function PermanentMarker({ studio, pin }: { studio: Studio; pin: L.DivIcon }) {
  const markerRef = useRef<L.Marker>(null);

  useEffect(() => {
    // Defer one tick so the map tile layer is ready
    const id = setTimeout(() => markerRef.current?.openPopup(), 0);
    return () => clearTimeout(id);
  }, []);

  return (
    <Marker ref={markerRef} position={studio.position} icon={pin}>
      <Popup
        autoClose={false}
        closeButton={false}
        minWidth={220}
      >
        <span className={styles.popupLabel}>{studio.label}</span>
        <address className={styles.popupAddress}>
          {studio.lines.map((line, i) => (
            <span key={i}>{line}{i < studio.lines.length - 1 && <br />}</span>
          ))}
        </address>
        <a
          href={studio.directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.popupDirections}
        >
          Get Directions →
        </a>
      </Popup>
    </Marker>
  );
}

export default function StudioMap() {
  const pin = useMemo(() =>
    L.divIcon({
      className: '',
      html: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="38" viewBox="0 0 28 38" fill="none">
        <path d="M14 0C6.268 0 0 6.268 0 14c0 9.333 14 24 14 24S28 23.333 28 14C28 6.268 21.732 0 14 0z" fill="#C4956A"/>
        <circle cx="14" cy="14" r="5" fill="#3B1E08"/>
      </svg>`,
      iconSize: [28, 38],
      iconAnchor: [14, 38],
      popupAnchor: [0, -42],
    }),
    []
  );

  return (
    <div className={styles.mapWrap}>
      <MapContainer
        center={[19.05, 72.92]}
        zoom={11}
        scrollWheelZoom={false}
        closePopupOnClick={false}
        className={styles.map}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        {STUDIOS.map(studio => (
          <PermanentMarker key={studio.id} studio={studio} pin={pin} />
        ))}
        <BoundsHandler />
      </MapContainer>
    </div>
  );
}
