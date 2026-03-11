import Image from 'next/image';
import styles from './page.module.css';

const TEAM = [
  {
    name: 'Tasadduq Kher',
    role: 'Principal Architect & Founder',
    education: 'B.Arch, Rachana Sansad Academy of Architecture, Mumbai',
    founding: 1999,
    bio: 'Tasadduq Kher founded Team Design in 1999. Over 25 years, his practice has shaped residential, commercial, and institutional architecture across Mumbai and beyond. His approach begins with understanding how people live and work — then finding the design logic that serves those needs with precision and quiet intelligence. He believes that the best architecture is noticed not for its volume but for how naturally it fits into a life.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
    isPrincipal: true,
  },
  {
    name: 'Raza Khan',
    role: 'Senior Architect',
    education: 'B.Arch',
    bio: 'Raza has a deep passion for the intricacies of Rajasthani architecture — its geometry, its response to climate, its layering of cultural memory into built form. He brings this same precision and sensitivity to every project he leads at Team Design.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80',
  },
  {
    name: 'Taher Shaikh',
    role: 'Architect',
    education: 'B.Arch — Thesis: Rehabilitation Centres for Widows',
    bio: 'Taher\'s thesis on rehabilitation centres for widows introduced a social dimension to his practice that has never left. He approaches design as a tool for dignity — spaces that restore as much as they shelter.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80',
  },
  {
    name: 'Huzaifa Mirza',
    role: 'Junior Architect',
    education: 'B.Arch',
    bio: 'A self-proclaimed foodie, Huzaifa brings the same obsessive attention to detail he applies to finding the perfect dish to every drawing he produces. His careful documentation and site coordination keep projects running exactly as designed.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=80',
  },
];

export default function PeoplePage() {
  const principal = TEAM.find(m => m.isPrincipal)!;
  const team = TEAM.filter(m => !m.isPrincipal);

  return (
    <>
      {/* Page header */}
      <div className={styles.pageHero}>
        <span className={styles.pageLabel}>The Practice</span>
        <h1 className={styles.pageTitle}>People</h1>
        <p className={styles.pageSubtitle}>Architecture is made by people, not firms. Meet the team behind Team Design.</p>
      </div>

      {/* Principal */}
      <section className={styles.principalSection}>
        <div className={styles.principalInner}>
          <div className={styles.principalImage}>
            <Image src={principal.image} alt={principal.name} fill sizes="(max-width: 768px) 100vw, 40vw" style={{ objectFit: 'cover' }} />
          </div>
          <div className={styles.principalText}>
            <span className={styles.sectionLabel}>Principal Architect</span>
            <h2 className={styles.principalName}>{principal.name}</h2>
            <p className={styles.principalRole}>{principal.role}</p>
            <p className={styles.principalBio}>{principal.bio}</p>
            <div className={styles.credentials}>
              <div className={styles.cred}>
                <span className={styles.credValue}>{principal.education}</span>
              </div>
              <div className={styles.cred}>
                <span className={styles.credLabel}>Founded Team Design</span>
                <span className={styles.credValue}>{principal.founding}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className={styles.teamSection}>
        <div className={styles.teamHeader}>
          <span className={styles.sectionLabel}>The Team</span>
          <h2 className={styles.teamTitle}>Architecture is a collaborative act.</h2>
        </div>
        <div className={styles.teamGrid}>
          {team.map((member) => (
            <div key={member.name} className={styles.memberCard}>
              <div className={styles.memberImage}>
                <Image src={member.image} alt={member.name} fill sizes="(max-width: 768px) 100vw, 25vw" style={{ objectFit: 'cover' }} />
                <div className={styles.memberOverlay}>
                  <p className={styles.memberBioHover}>{member.bio.split('.')[0]}.</p>
                </div>
              </div>
              <div className={styles.memberMeta}>
                <span className={styles.memberName}>{member.name}</span>
                <span className={styles.memberRole}>{member.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
