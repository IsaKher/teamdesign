import Image from 'next/image';
import styles from './page.module.css';

const TEAM = [
  {
    name: 'Tasadduq Kher',
    role: 'Founder & Principal Architect',
    education: 'B.Arch, Rachana Sansad Academy of Architecture, Mumbai',
    bio: 'Tasadduq founded the practice in 1996, beginning his career under Architect P K Das as mentor. A former visiting professor at the Academy of Architecture, Mumbai for nearly a decade, he believes deeply that the quality of our surroundings affects the quality of our lives. A traveler, book lover, and motorcycle enthusiast, his personal philosophy is simple: "There is one life to live and one must live it in every aspect, leaving no regrets." His expertise spans acknowledged design talent, mentoring the design team, and demonstrated success across 25+ years of practice.',
    image: '/tasadduq-kher.png',
    isPrincipal: true,
    founding: 1999,
  },
  {
    name: 'Zainab (Xen) Kher',
    role: 'Partner & Head of Design',
    education: 'B.Arch with Honours, Academy of Architecture, Mumbai (2004)',
    bio: 'Zainab co-drives the design direction of the practice alongside Tasadduq. Registered with the Council of Architecture, New Delhi, she was recognised by Architects & Interiors India magazine in 2016 as one of India\'s top 50 architects under the age of 35 — an award presented by Hafeez Contractor at the iGEN Design Forum. Her intellectually rigorous approach to the analysis and interpretation of a client brief informs every project she leads. "Manners maketh the man," she says, citing Laurie Baker. "I think they also make good architecture." An artist, singer, and world traveler, her dream is to travel the world twice over in a single lifetime.',
    image: 'https://teamdesign.in/wp-content/uploads/2018/12/KALIMATA-MANDIR_Cam_01-1.jpg',
    award: 'Top 50 Architects Under 35 — Architects & Interiors India, 2016',
  },
  {
    name: 'Zakir',
    role: 'Partner & Senior Designer',
    education: 'B.Arch, Academy of Architecture, Mumbai',
    bio: 'With over 25 years in design and construction, Zakir\'s approach is characterised by a tenacious focus on creative design through every stage of every project. He believes that complexities and limitations are not allowed to impact a project negatively — the search for design opportunities is perpetual. Traveled globally through his work, his expertise encompasses freshness of concepts, design intervention, innovation in working details, and site coordination.',
    image: 'https://teamdesign.in/wp-content/uploads/2018/12/Gokul-Cam_01-1.jpg',
  },
  {
    name: 'Hussain',
    role: 'Senior Architect',
    education: 'B.Arch, Rizvi College of Architecture, Mumbai',
    bio: 'Nearly 9 years with the firm, progressing from intern to Senior Architect. Hussain\'s thesis on the reintegration of Devdasi women in Indian society introduced a social dimension to his practice that has never left. He approaches design with an "out of the box thinking" mindset, holds a strong concern for carbon footprint (cycling to work daily), and finds his energy in road trips, trekking, adventure sports, and organic vegetable gardening.',
    image: 'https://teamdesign.in/wp-content/uploads/2018/12/Service-Industru-Education-Complex-Goa-5-1.jpg',
  },
  {
    name: 'Yusuf',
    role: 'Project Lead / Architect',
    education: 'B.Arch',
    bio: 'Joined Team Design in 2017 and has since led projects including MSB School, ITM College Campuses, bungalow projects, and government corporate office interiors. Yusuf\'s expertise covers conceptual design, public approvals, statutory approvals, contract documentation, and construction administration. A swimmer, reader, filmmaker, and traveler, his philosophy is that "the journey is more important than the destination."',
    image: 'https://teamdesign.in/wp-content/uploads/2018/12/MBA-Hostel-Building-ITM-Navi-Mumbai-India-5-1.jpg',
  },
  {
    name: 'Ali',
    role: 'Project Manager / Project Head',
    education: 'Post Graduate in Polymer Sciences, University of Pune',
    bio: 'With over 10 years in construction and project management, Ali focuses on technical details, analyses, offers, budgets, specifications, measurements, site supervision, and final acceptance. He believes a healthy body is the way to a happy, constructive mind — cricket and fitness are his constants outside work. His keen eye for detail, site coordination, and troubleshooting skills keep complex projects running on time.',
    image: 'https://teamdesign.in/wp-content/uploads/2018/12/NRB-Bearings-Auragabad-4-1.jpg',
  },
  {
    name: 'Mustafa',
    role: 'Construction Partner / Project Head',
    education: 'B.Com, Elphinstone College, Mumbai University',
    bio: 'Over 15 years in interior fit-out works, Mustafa also runs his own construction company. He believes every finished project — big or small — is the product of a team, and that the right partnerships and respect for everyone\'s role are crucial in achieving a great result. Musical by nature, he has a rare ability to resolve complexities with a smile and a cup of coffee. His expertise is in team spirit, site coordination, and troubleshooting.',
    image: 'https://teamdesign.in/wp-content/uploads/2018/12/Mariwala-Estate-Annexe-6-1.jpg',
  },
  {
    name: 'Raza',
    role: 'Architect',
    education: 'B.Arch',
    bio: 'Currently leading the Wedding Destination Campus project, drawing on the detailing and intricacies of Rajasthani Architecture. Raza\'s philosophy is that effective design should resonate with its intended audience — striking a harmonious and unexpected chord. Design that resonates, he believes, can only be the natural conclusion of a process that starts with listening and learning about people, behaviours, and the world in which we live. Swimmer, adventurer, trekker, and music lover.',
    image: 'https://teamdesign.in/wp-content/uploads/2018/12/w-2-1.jpg',
  },
  {
    name: 'Taher',
    role: 'Junior Architect',
    education: 'B.Arch, Rizvi College of Architecture, Mumbai',
    bio: 'Associated with Team Design since 2016, Taher\'s thesis on rehabilitation centres for widows — teaching them subjects of their interest, honing their skills and weaving them back into the urban fabric — introduced a social dimension to his practice that has never left. He approaches design as a tool for dignity, spaces that restore as much as they shelter. An architectural photographer, weekend footballer, artist, and filmmaker, he lives by the motto: "I am good when solo, but great with a team."',
    image: 'https://teamdesign.in/wp-content/uploads/2018/12/HOSTEL-BUILDING-3-1.jpg',
  },
  {
    name: 'Jacob',
    role: 'Architect',
    education: 'B.Arch, Pillai College of Architecture',
    bio: 'Currently working on temple projects that require a great deal of historic and religious knowledge. Jacob is a gifted artist whose concepts take their first form through sketches — the drawn line is how he thinks. His personal passion for automobiles and football coexists with a design sensibility that is sensitive, deeply researched, and responsive to the cultural weight of the programmes he works on.',
    image: 'https://teamdesign.in/wp-content/uploads/2018/12/KALIMATA-MANDIR_Cam_03-1.jpg',
  },
  {
    name: 'Huzaifa',
    role: 'Architect',
    education: 'B.Arch, Mumbai University',
    bio: 'Joined the firm as an intern and grew into a full architect, with a project focus on institutional and villa projects. Friendly, approachable, always ready to help, and punctual — Huzaifa brings the same obsessive attention to detail he applies to finding the perfect dish (a self-proclaimed foodie) to every drawing he produces. His careful documentation and site coordination keep projects running exactly as designed.',
    image: 'https://teamdesign.in/wp-content/uploads/2018/12/COLLEGE-CAMPUS-EXT-1-1.jpg',
  },
  {
    name: 'Raj',
    role: 'Architect',
    education: 'B.Arch, Mumbai University',
    bio: 'Experience across residential homes, offices, and high-density condominiums. Gentle and soft spoken but absolutely resolved in his judgements, Raj brings a quiet tenacity to every project he touches. A reading enthusiast who also enjoys cooking, his expertise lies in resolve and perseverance, quick design responses and resolutions, site coordination, and precise drawing detailing.',
    image: 'https://teamdesign.in/wp-content/uploads/2018/12/Glass-Kitchen-5-1.jpg',
  },
  {
    name: 'Ankita',
    role: 'Architect',
    education: 'B.Arch, Mumbai University',
    bio: 'Working at Team Design since 2017, currently leading high-end government-initiated projects. A fast learner, good listener, punctual, and persevering, Ankita lives by the belief that learning is a never-ending process. A music enthusiast, her expertise lies in team spirit, project planning, attention to detail, and creating a friendly working atmosphere.',
    image: 'https://teamdesign.in/wp-content/uploads/2018/12/Bungalow-in-Ahmedabad-Inida-1.jpg',
  },
  {
    name: 'Pranali',
    role: 'Architect',
    education: 'B.Arch',
    bio: 'Pranali\'s passion is taking complicated problems and turning them into simple and beautiful design solutions. A creative and dedicated individual, she brings a joyful working attitude to every project and a love of reading that informs the depth and curiosity she brings to her design research. Her expertise is in conceptual and creative planning, design solutions, and the ability to find the elegant answer in a complex brief.',
    image: 'https://teamdesign.in/wp-content/uploads/2018/12/Luxurious-5BHK-Villa-Mr-1.jpg',
  },
  {
    name: 'Gauri',
    role: 'Architect',
    education: 'B.Arch, D Y Patil College, Mumbai University',
    bio: 'Around two years of experience, bringing a problem-resolving attitude and an eye for detail to every project she joins. Her philosophy — that learning is a process that is never constant — drives her to keep finding new approaches. Selective in her music taste, she loves to travel and capture moments with her camera. Her expertise is in coordination, troubleshooting, and bringing a careful eye to every drawing that leaves the studio.',
    image: 'https://teamdesign.in/wp-content/uploads/2018/12/Bhandari-House.jpg',
  },
  {
    name: 'Ummehaani (Haani)',
    role: 'Office Manager',
    education: 'Arts Graduate, Mithibai College, Mumbai',
    bio: 'The organisational heart of the studio, Haani manages office operations with a passion for organising and planning that keeps every department running smoothly. She also runs her own NGO. An active social worker and music enthusiast, her infectious laugh and innocent spirit make her the lighthearted presence every studio needs. Her expertise is in the smooth working of all departments, coordination of project agendas, site visits, and meetings, and making sure the right messages reach the right people at the right time.',
    image: 'https://teamdesign.in/wp-content/uploads/2018/12/DSC_5975-1.jpg',
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
                {'award' in member && member.award && (
                  <span className={styles.memberRole} style={{ color: 'var(--color-accent, #b8860b)', fontSize: '11px', marginTop: '4px' }}>{member.award}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
