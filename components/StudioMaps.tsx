import styles from './StudioMaps.module.css';

const STUDIOS = [
  {
    id: 'kopar',
    label: 'Studio — Kopar Khairane',
    lines: ['A-145/6A, Pawane Village MIDC Road', 'MIDC Sector 2, Kopar Khairane', 'Navi Mumbai 400710'],
    directionsUrl: 'https://maps.app.goo.gl/YourKoparLink',
    embedSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3932.3340292292432!2d73.01871717530642!3d19.093272051429953!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c0dd511e9333%3A0x31eae71d7409b702!2sTeam%20Design%2C%20Architects!5e1!3m2!1sen!2sca!4v1778186665100!5m2!1sen!2sca',
  },
  {
    id: 'parel',
    label: 'Studio — Parel',
    lines: ['10G, Thacker Industrial Estate', 'NM Joshi Marg, Parel (E)', 'Mumbai 400013'],
    directionsUrl: 'https://maps.app.goo.gl/ygVTjd4QU5RYgFLS6',
    embedSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3934.734373466891!2d72.82884187530436!3d18.991975954604797!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cf8ad38e3ac9%3A0x59bdef9bfc5e301f!2sTEAMSWIFT%20PROJECTS%20PVT.LTD.!5e1!3m2!1sen!2sca!4v1778186733022!5m2!1sen!2sca',
  },
];

export default function StudioMaps() {
  return (
    <div className={styles.mapsGrid}>
      {STUDIOS.map((studio) => (
        <div key={studio.id} className={styles.studioCol}>
          <div className={styles.studioInfo}>
            <span className={styles.studioLabel}>{studio.label}</span>
            <address className={styles.studioAddress}>
              {studio.lines.map((line, i) => (
                <span key={i}>{line}{i < studio.lines.length - 1 && <br />}</span>
              ))}
            </address>
            <a
              href={studio.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.directionsLink}
            >
              Get Directions →
            </a>
          </div>
          <div className={styles.mapWrap}>
            <iframe
              src={studio.embedSrc}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={studio.label}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
