import Image from 'next/image';
import styles from './page.module.css';

const PRINCIPAL = {
  name: 'Tasadduq Kher',
  role: 'Founder & Principal Architect',
  education: 'B.Arch, Rachana Sansad Academy of Architecture, Mumbai',
  bio: 'Tasadduq founded the practice in 1996, beginning his career under Architect P K Das as mentor. A former visiting professor at the Academy of Architecture, Mumbai for nearly a decade, he believes deeply that the quality of our surroundings affects the quality of our lives. A traveler, book lover, and motorcycle enthusiast, his personal philosophy is simple: "There is one life to live and one must live it in every aspect, leaving no regrets." His expertise spans acknowledged design talent, mentoring the design team, and demonstrated success across 25+ years of practice.',
  image: '/tasadduq-kher.png',
  founding: 1999,
};

const CORE_TIER1 = [
  {
    name: 'Zainab (Xen)',
    role: 'Partner & Head of Design',
    education: 'B.Arch with Honours, Academy of Architecture, Mumbai (2004)',
    bio: 'Zainab co-drives the design direction of the practice alongside Tasadduq. Registered with the Council of Architecture, New Delhi, she was recognised by Architects & Interiors India magazine in 2016 as one of India\'s top 50 architects under the age of 35 — an award presented by Hafeez Contractor at the iGEN Design Forum. Her intellectually rigorous approach to the analysis and interpretation of a client brief informs every project she leads.',
    image: 'https://teamdesign.in/wp-content/uploads/2018/12/KALIMATA-MANDIR_Cam_01-1.jpg',
    award: 'Top 50 Architects Under 35 — Architects & Interiors India, 2016',
  },
];

const OPERATIONS_TEAM = [
  { name: 'Hamid',  role: 'Head of Transportation' },
  { name: 'Vijay',  role: 'Head of Day-to-Day Management' },
];

const CORE_TIER2 = [
  {
    name: 'Zakir',
    role: 'Partner & Senior Designer',
    bio: 'With over 25 years in design and construction, Zakir\'s approach is characterised by a tenacious focus on creative design through every stage of every project. He believes that complexities and limitations are not allowed to impact a project negatively — the search for design opportunities is perpetual.',
    image: 'https://teamdesign.in/wp-content/uploads/2018/12/Gokul-Cam_01-1.jpg',
  },
  {
    name: 'Ali',
    role: 'Project Manager / Project Head',
    bio: 'With over 10 years in construction and project management, Ali focuses on technical details, analyses, budgets, specifications, measurements, site supervision, and final acceptance. His keen eye for detail, site coordination, and troubleshooting skills keep complex projects running on time.',
    image: 'https://teamdesign.in/wp-content/uploads/2018/12/NRB-Bearings-Auragabad-4-1.jpg',
  },
  {
    name: 'Mustafa',
    role: 'Construction Partner / Project Head',
    bio: 'Over 15 years in interior fit-out works, Mustafa also runs his own construction company. He believes every finished project — big or small — is the product of a team, and that the right partnerships and respect for everyone\'s role are crucial in achieving a great result.',
    image: 'https://teamdesign.in/wp-content/uploads/2018/12/Mariwala-Estate-Annexe-6-1.jpg',
  },
  {
    name: 'Taher',
    role: 'Junior Architect',
    bio: 'Associated with Team Design since 2016, Taher\'s thesis on rehabilitation centres for widows introduced a social dimension to his practice that has never left. He approaches design as a tool for dignity — spaces that restore as much as they shelter.',
    image: 'https://teamdesign.in/wp-content/uploads/2018/12/HOSTEL-BUILDING-3-1.jpg',
  },
  {
    name: 'Sarrah',
    role: 'Design & Operations',
    bio: 'Sarrah brings a meticulous and organised approach to both design coordination and operational flow within the studio. Her ability to balance creative demands with practical execution makes her an integral part of the core management team.',
    image: 'https://teamdesign.in/wp-content/uploads/2018/12/DSC_5975-1.jpg',
  },
];

export default function PeoplePage() {
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
            <Image src={PRINCIPAL.image} alt={PRINCIPAL.name} fill sizes="(max-width: 768px) 100vw, 40vw" style={{ objectFit: 'cover', objectPosition: 'center top' }} />
          </div>
          <div className={styles.principalText}>
            <span className={styles.sectionLabel}>Principal Architect</span>
            <h2 className={styles.principalName}>{PRINCIPAL.name}</h2>
            <p className={styles.principalRole}>{PRINCIPAL.role}</p>
            <p className={styles.principalBio}>{PRINCIPAL.bio}</p>
            <div className={styles.credentials}>
              <div className={styles.cred}>
                <span className={styles.credValue}>{PRINCIPAL.education}</span>
              </div>
              <div className={styles.cred}>
                <span className={styles.credLabel}>Founded Team Design</span>
                <span className={styles.credValue}>{PRINCIPAL.founding}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Management */}
      <section className={styles.coreSection}>
        <div className={styles.coreHeader}>
          <span className={styles.sectionLabel}>Core Management</span>
          <h2 className={styles.teamTitle}>The people who shape every project.</h2>
        </div>

        {/* Tier 1 — Zainab */}
        <div className={styles.coreTier1}>
          {CORE_TIER1.map((member) => (
            <div key={member.name} className={`${styles.memberCard} ${styles.memberCardLarge}`}>
              <div className={styles.memberImage}>
                <Image src={member.image} alt={member.name} fill sizes="(max-width: 768px) 100vw, 30vw" style={{ objectFit: 'cover' }} />
                <div className={styles.memberOverlay}>
                  <p className={styles.memberBioHover}>{member.bio.split('.')[0]}.</p>
                </div>
              </div>
              <div className={styles.memberMeta}>
                <span className={styles.memberName}>{member.name}</span>
                <span className={styles.memberRole}>{member.role}</span>
                {member.award && (
                  <span className={styles.memberAward}>{member.award}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Tier 2 — Zakir, Ali, Mustafa, Taher, Sarrah */}
        <div className={styles.coreTier2}>
          {CORE_TIER2.map((member) => (
            <div key={member.name} className={styles.memberCard}>
              <div className={styles.memberImage}>
                <Image src={member.image} alt={member.name} fill sizes="(max-width: 768px) 50vw, 20vw" style={{ objectFit: 'cover' }} />
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
      {/* Core Operations */}
      <section className={styles.opsSection}>
        <div className={styles.opsHeader}>
          <span className={styles.sectionLabel}>Core Operations</span>
          <h2 className={styles.opsTitle}>Keeping the studio running.</h2>
        </div>
        <div className={styles.opsRow}>
          {OPERATIONS_TEAM.map((member) => (
            <div key={member.name} className={styles.opsCard}>
              <span className={styles.opsName}>{member.name}</span>
              <span className={styles.opsRole}>{member.role}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
