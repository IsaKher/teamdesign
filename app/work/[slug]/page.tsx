import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import styles from './page.module.css';
import FadeIn from '@/components/FadeIn';

interface RelatedProject {
  slug: string;
  title: string;
  type: string;
  image: string;
}

interface Testimonial {
  quote: string;
  author: string;
  title: string;
}

interface Project {
  title: string;
  client: string;
  type: string;
  location: string;
  year: number;
  area: string;
  description: string;
  mainImage: string;
  gallery: string[];
  testimonial: Testimonial | null;
  related: RelatedProject[];
}

const PROJECT_DATA: Record<string, Project> = {
  // ─── ARCHITECTURAL PROJECTS ────────────────────────────────────────────────
  'wedding-destination-raipur': {
    title: 'Wedding Destination',
    client: 'Mr. Ritesh Mandani',
    type: 'Commercial',
    location: 'Raipur, Chhattisgarh',
    year: 2014,
    area: '150,000 sq ft',
    description: `Create a destination for weddings on a 7 acres property — by designing breathtaking landscape pockets of different sizes depending on the scale of the event and the brief given by the client, along with banquet halls, theme restaurants and fully furnished accommodation with ample parking space.

The design draws on the detailing and intricacies of rich Rajasthani Architecture, reinterpreted through a contemporary lens. The result is a campus that is simultaneously rooted in Indian cultural tradition and unmistakably modern in its execution.

Each event space has been conceived to accommodate gatherings of varying scales, from intimate family ceremonies to large public celebrations, with landscaped corridors between them that allow events to run in parallel without interference.`,
    mainImage: 'https://teamdesign.in/wp-content/uploads/2018/12/w-2-1.jpg',
    gallery: [
      'https://teamdesign.in/wp-content/uploads/2018/12/w-4-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/w-8-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/w-10-1.jpg',
    ],
    testimonial: null,
    related: [
      { slug: 'gokul-cultural-centre-mumbai', title: 'Gokul Cultural Centre', type: 'Institutional', image: 'https://teamdesign.in/wp-content/uploads/2018/12/Gokul-Cam_01-1.jpg' },
      { slug: 'mariwala-estate-annexe-lonavala', title: 'Mariwala Estate Annexe', type: 'Bungalows', image: 'https://teamdesign.in/wp-content/uploads/2018/12/Mariwala-Estate-Annexe-6-1.jpg' },
      { slug: 'nrb-bearings-guest-house-aurangabad', title: 'Guest House — NRB Bearings', type: 'Commercial', image: 'https://teamdesign.in/wp-content/uploads/2018/12/NRB-Bearings-Auragabad-4-1.jpg' },
    ],
  },

  'kalimata-mandir-navi-mumbai': {
    title: 'Temple Building — Goddess Kali',
    client: 'Bengali Cultural Association',
    type: 'Institutional',
    location: 'Kharghar, Navi Mumbai',
    year: 2017,
    area: '15,000 sq ft',
    description: `A temple designed after extensive research on Kalimata temples across India. The structure incorporates East Indian and Bengal architectural elements — a stilted floor for cultural performances, first floor residential space, and a rooftop courtyard fronting the main temple.

The design honours the spiritual gravity of its programme while serving a large and growing devotee community. The formal vocabulary of Hindu temple architecture — the vertical hierarchy of the shikara, the processional logic of the mandapa — is translated into a contemporary material language that connects to its Bengali roots.

The building is experienced as much as seen: the transition from the bright forecourt into the cool interior of the sanctum, the quality of light at different times of day, the acoustic character of the space under prayer. The temple has become a significant community landmark in Kharghar since its completion.`,
    mainImage: 'https://teamdesign.in/wp-content/uploads/2018/12/KALIMATA-MANDIR_Cam_01-1.jpg',
    gallery: [
      'https://teamdesign.in/wp-content/uploads/2018/12/KALIMATA-MANDIR_Cam_03-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/KALIMATA-MANDIR_Cam_04-1.jpg',
    ],
    testimonial: null,
    related: [
      { slug: 'gokul-cultural-centre-mumbai', title: 'Gokul Cultural Centre', type: 'Institutional', image: 'https://teamdesign.in/wp-content/uploads/2018/12/Gokul-Cam_01-1.jpg' },
      { slug: 'college-campus-extension-itm', title: 'College Campus Extension — ITM', type: 'Institutional', image: 'https://teamdesign.in/wp-content/uploads/2018/12/COLLEGE-CAMPUS-EXT-4.jpg' },
      { slug: 'mba-hostel-towers-itm', title: 'MBA Hostel Towers — ITM', type: 'Institutional', image: 'https://teamdesign.in/wp-content/uploads/2018/12/MBA-Hostel-Building-ITM-Navi-Mumbai-India-5-1.jpg' },
    ],
  },

  'service-industry-campus-goa': {
    title: 'Service Industry Education Campus',
    client: 'Institute of Technology and Management',
    type: 'Institutional',
    location: 'Bicholim, Goa',
    year: 2009,
    area: '1,500,000 sq ft',
    description: `The shape of this 70-acre plot with a north-east constricted mouth helped generate the concept of five fingers radiating from the entrance. Each finger functions as a separate institute — covering hospitality, management, health sciences, banking training, and a centre of excellence.

The layout radiates from the entrance through zones of common facilities, a forest area, institute space, and residential units surrounded by a service road. The five-finger concept allows each institute to maintain its own identity while sharing infrastructure and connecting back to a common arrival sequence.

At 1.5 million square feet, this is one of the largest projects in the firm's portfolio. The scale demanded a planning logic that was both legible from the air and navigable on foot — the radiating geometry provides both.`,
    mainImage: 'https://teamdesign.in/wp-content/uploads/2018/12/Service-Industru-Education-Complex-Goa-5-1.jpg',
    gallery: [
      'https://teamdesign.in/wp-content/uploads/2018/12/Service-Industru-Education-Complex-Goa-4-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/Service-Industru-Education-Complex-Goa-6-1.jpg',
    ],
    testimonial: null,
    related: [
      { slug: 'college-engineering-management-nagpur', title: 'College for Engineering & Management', type: 'Institutional', image: 'https://teamdesign.in/wp-content/uploads/2018/12/COLLEGE-OF-ENG-_-MANAGEMENT-5.jpg' },
      { slug: 'college-campus-extension-itm', title: 'College Campus Extension — ITM', type: 'Institutional', image: 'https://teamdesign.in/wp-content/uploads/2018/12/COLLEGE-CAMPUS-EXT-4.jpg' },
      { slug: 'mba-hostel-towers-itm', title: 'MBA Hostel Towers — ITM', type: 'Institutional', image: 'https://teamdesign.in/wp-content/uploads/2018/12/MBA-Hostel-Building-ITM-Navi-Mumbai-India-5-1.jpg' },
    ],
  },

  'mist-view-bungalows-lonavala': {
    title: 'Mist View Bungalows',
    client: 'Private Clients',
    type: 'Bungalows',
    location: 'Lonavala, Maharashtra',
    year: 2010,
    area: '15,000 sq ft',
    description: `Located at 2,200 feet elevation near Tungarli Lake, this development comprises four bungalows on a 25,000 sq ft plot. Each features extensive living spaces with large terraces, four bedrooms, kitchen, bathrooms, and servants quarters.

The outdoor terrace is private and the form of each house shields it from the neighbour. Designed with Vaastu principles and south-facing roofs for solar panels, the project integrates sustainable living with the natural setting of the Western Ghats.

The project demonstrates how sensitive site planning can achieve privacy and individuality within a multi-unit development — each bungalow occupies its own distinct position on the hillside, connected by landscaped paths rather than shared walls.`,
    mainImage: 'https://teamdesign.in/wp-content/uploads/2018/12/MIST-VIEW-7-1.jpg',
    gallery: [
      'https://teamdesign.in/wp-content/uploads/2018/12/MIST-VIEW-4-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/MIST-VIEW-10-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/MIST-VIEW-6-1.jpg',
    ],
    testimonial: null,
    related: [
      { slug: 'mariwala-estate-annexe-lonavala', title: 'Mariwala Estate Annexe', type: 'Bungalows', image: 'https://teamdesign.in/wp-content/uploads/2018/12/Mariwala-Estate-Annexe-6-1.jpg' },
      { slug: 'bhandari-house-bhinmal', title: 'Bhandari House', type: 'Bungalows', image: 'https://teamdesign.in/wp-content/uploads/2018/11/Bhandari-House.jpg' },
      { slug: 'villa-merchant-tirupur', title: 'Luxurious 5BHK Villa', type: 'Residential', image: 'https://teamdesign.in/wp-content/uploads/2018/12/Luxurious-5BHK-Villa-Mr-1.jpg' },
    ],
  },

  'mba-hostel-towers-itm': {
    title: 'MBA Hostel Towers — ITM',
    client: 'Institute of Technology and Management',
    type: 'Institutional',
    location: 'Navi Mumbai',
    year: 2005,
    area: '85,000 sq ft',
    description: `This twin hostel building — 11 floors and 16 floors each — provides each student with a handsomely furnished private living area and bath, plus a shared study space. Students also share access to a beautiful podium with comfortable lounges, a computer lab, gym facility, and common study rooms.

The facility was created to accommodate growing enrollment at Institute of Technology and Management, one of Navi Mumbai's respected colleges offering degrees in Business Management, Hospitality, and Engineering.

Student accommodation at this scale risks becoming anonymous. The design resists this through careful treatment of the common spaces — the ground-floor courtyard, the sky terraces at alternate floors, the social kitchen alcoves — that give each resident a sense of neighbourhood within the larger building.`,
    mainImage: 'https://teamdesign.in/wp-content/uploads/2018/12/MBA-Hostel-Building-ITM-Navi-Mumbai-India-5-1.jpg',
    gallery: [
      'https://teamdesign.in/wp-content/uploads/2018/12/HOSTEL-BUILDING-4-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/HOSTEL-BUILDING-3-1.jpg',
    ],
    testimonial: null,
    related: [
      { slug: 'college-campus-extension-itm', title: 'College Campus Extension — ITM', type: 'Institutional', image: 'https://teamdesign.in/wp-content/uploads/2018/12/COLLEGE-CAMPUS-EXT-4.jpg' },
      { slug: 'college-engineering-management-nagpur', title: 'College for Engineering & Management', type: 'Institutional', image: 'https://teamdesign.in/wp-content/uploads/2018/12/COLLEGE-OF-ENG-_-MANAGEMENT-5.jpg' },
      { slug: 'service-industry-campus-goa', title: 'Service Industry Education Campus', type: 'Institutional', image: 'https://teamdesign.in/wp-content/uploads/2018/12/Service-Industru-Education-Complex-Goa-5-1.jpg' },
    ],
  },

  'mariwala-estate-annexe-lonavala': {
    title: 'Mariwala Estate Annexe',
    client: 'Mr. Harsh Mariwala',
    type: 'Bungalows',
    location: 'Lonavala, Maharashtra',
    year: 2016,
    area: '12,000 sq ft',
    description: `Mariwala Estate, a 70,000 sq ft sprawl, is located in the embrace of Mother Nature — just a couple of kilometres from the Mumbai-Pune Expressway, away from the common din and yet connected to the market, hospital, bank and a Jain temple.

The existing structure required strengthening while preserving its Art Deco character. New additions include a clubhouse, cantilever lap pool, staff quarters, and redesigned landscape. The gallery provides views of mountains, waterfalls, and the scenic Lonavala skies.

The project is a study in the art of the annexe — how to add to a beloved existing structure without diminishing it. Each new element was tested against the question of whether it improves the estate as a whole, and only those that passed were retained in the final design.`,
    mainImage: 'https://teamdesign.in/wp-content/uploads/2018/12/Mariwala-Estate-Annexe-6-1.jpg',
    gallery: [
      'https://teamdesign.in/wp-content/uploads/2018/12/5-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/Mariwala-Estate-Annexe-4-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/1-1.jpg',
    ],
    testimonial: {
      quote: 'Team Design managed the entire project lifecycle — from concept and design to contractor management, budget adherence, and on-time delivery. The result exceeded every expectation.',
      author: 'Kishore V. Mariwala',
      title: 'Industrialist',
    },
    related: [
      { slug: 'mist-view-bungalows-lonavala', title: 'Mist View Bungalows', type: 'Bungalows', image: 'https://teamdesign.in/wp-content/uploads/2018/12/MIST-VIEW-7-1.jpg' },
      { slug: 'bhandari-house-bhinmal', title: 'Bhandari House', type: 'Bungalows', image: 'https://teamdesign.in/wp-content/uploads/2018/11/Bhandari-House.jpg' },
      { slug: 'glass-kitchen-alibaug', title: 'Glass Kitchen', type: 'Bungalows', image: 'https://teamdesign.in/wp-content/uploads/2018/12/Glass-Kitchen-5-1.jpg' },
    ],
  },

  'villa-merchant-tirupur': {
    title: 'Luxurious 5BHK Villa',
    client: 'Mr. S Merchant',
    type: 'Residential',
    location: 'Tirupur, India',
    year: 2017,
    area: '6,000 sq ft',
    description: `Designed strictly as per Vaastu and climate, this 5BHK bungalow is designed tastefully to meet the client's every requirement. With two rooms on the ground floor, the master suite and three kids' rooms along with a separate study and family room were designed on the first floor.

The large cantilever roofs give climatic protection and also serve as a signature feature from the front elevation. The dining room on the ground floor extends into the garden area and allows a peaceful evening sit-out on fair weather days.

The design orientates main living spaces to catch the prevailing breeze, with deep overhangs that shade glazed elevations from direct sun while admitting diffused light throughout the day. Materials are responsive to the Tamil Nadu climate: cool stone floors, lime render on the exterior, and heavy masonry walls that moderate the internal temperature.`,
    mainImage: 'https://teamdesign.in/wp-content/uploads/2018/12/Luxurious-5BHK-Villa-Mr-1.jpg',
    gallery: [
      'https://teamdesign.in/wp-content/uploads/2018/12/Luxuerious-5BHK-Villa-Mr-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/Luxuriewous-5BHK-Villa-Mr-1.jpg',
    ],
    testimonial: null,
    related: [
      { slug: 'bungalow-ahmedabad', title: 'Bungalow in Ahmedabad', type: 'Bungalows', image: 'https://teamdesign.in/wp-content/uploads/2018/12/Bungalow-in-Ahmedabad-Inida-4.jpg' },
      { slug: 'bhandari-house-bhinmal', title: 'Bhandari House', type: 'Bungalows', image: 'https://teamdesign.in/wp-content/uploads/2018/11/Bhandari-House.jpg' },
      { slug: 'mist-view-bungalows-lonavala', title: 'Mist View Bungalows', type: 'Bungalows', image: 'https://teamdesign.in/wp-content/uploads/2018/12/MIST-VIEW-7-1.jpg' },
    ],
  },

  'jk-bank-branch-samba': {
    title: 'J&K Bank Branch Building',
    client: 'J&K Bank',
    type: 'Commercial',
    location: 'Samba, J&K State',
    year: 2018,
    area: '6,500 sq ft',
    description: `This project is an initiative taken by J&K Bank to improve the banking experience for the industrialists of Jammu & Samba. The building of ground plus one storey houses a full-fledged bank branch at the lower level — with an electronic ATM lobby having 24×7 direct access from the road.

The upper level houses a cluster office along with a business centre that will encourage businessmen and provide a fully equipped space to hold important business collaborations and meetings, helping take their business further.

The design balances institutional credibility with accessibility — the ATM lobby is designed for frictionless 24-hour use, while the upper floor business centre carries the warmth and discretion required for high-value client meetings. The two programmes are distinct in character but unified by a consistent material language.`,
    mainImage: 'https://teamdesign.in/wp-content/uploads/2018/12/J_K-Bank-Branch-Building-Samba-J_K-State-1-1.jpg',
    gallery: [
      'https://teamdesign.in/wp-content/uploads/2018/12/J_K-Bank-Branch-Building-Samba-J_K-State-3-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/J_K-Bank-Branch-Building-Samba-J_K-State-4-1.jpg',
    ],
    testimonial: null,
    related: [
      { slug: 'nrb-bearings-guest-house-aurangabad', title: 'Guest House — NRB Bearings', type: 'Commercial', image: 'https://teamdesign.in/wp-content/uploads/2018/12/NRB-Bearings-Auragabad-4-1.jpg' },
      { slug: 'venus-wires-office-khopoli', title: 'Building for Precision Metals', type: 'Commercial', image: 'https://teamdesign.in/wp-content/uploads/2018/12/PRECISION-METALS-9-1.jpg' },
      { slug: 'gokul-cultural-centre-mumbai', title: 'Gokul Cultural Centre', type: 'Institutional', image: 'https://teamdesign.in/wp-content/uploads/2018/12/Gokul-Cam_01-1.jpg' },
    ],
  },

  'college-campus-extension-itm': {
    title: 'College Campus Extension — ITM',
    client: 'Institute of Technology and Management',
    type: 'Institutional',
    location: 'Kharghar, Navi Mumbai',
    year: 2014,
    area: '5,876 sq mt',
    description: `Fifteen years after the ITM Kharghar campus was built, growth in student intake demand, coupled with an FSI limit increase for institutional projects, necessitated an expansion to the building in the complex. The challenge in extending this campus was threefold: demolish a part of the complex to create room for a bigger building; enable the campus to operate unhindered while construction work is in progress; continue the language and style of the architecture in the new building so that the whole design has a cohesive appearance.

The design establishes a dialogue with the existing structures through shared material references while introducing a clearer organisational logic — a central spine that connects new and old, with faculty offices and seminar rooms branching off either side.

This project was followed, in 2005, by the adjacent MBA Hostel Towers, which brought a further 85,000 sq ft of student accommodation to the same campus. Team Design's decade-long involvement with ITM represents one of the firm's deepest institutional relationships.`,
    mainImage: 'https://teamdesign.in/wp-content/uploads/2018/12/COLLEGE-CAMPUS-EXT-4.jpg',
    gallery: [
      'https://teamdesign.in/wp-content/uploads/2018/12/COLLEGE-CAMPUS-EXT-1-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/COLLEGE-CAMPUS-EXT-3-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/COLLEGE-CAMPUS-EXT-2-1.jpg',
    ],
    testimonial: {
      quote: 'Team Design brought extensive experience in campus development and institutional projects. Their approach to integrating the new building with the existing campus was exactly what we needed.',
      author: 'S K Samanta',
      title: 'ITM Group',
    },
    related: [
      { slug: 'mba-hostel-towers-itm', title: 'MBA Hostel Towers — ITM', type: 'Institutional', image: 'https://teamdesign.in/wp-content/uploads/2018/12/MBA-Hostel-Building-ITM-Navi-Mumbai-India-5-1.jpg' },
      { slug: 'college-engineering-management-nagpur', title: 'College for Engineering & Management', type: 'Institutional', image: 'https://teamdesign.in/wp-content/uploads/2018/12/COLLEGE-OF-ENG-_-MANAGEMENT-5.jpg' },
      { slug: 'service-industry-campus-goa', title: 'Service Industry Education Campus', type: 'Institutional', image: 'https://teamdesign.in/wp-content/uploads/2018/12/Service-Industru-Education-Complex-Goa-5-1.jpg' },
    ],
  },

  'nrb-bearings-guest-house-aurangabad': {
    title: 'Guest House — NRB Bearings',
    client: 'NRB Bearings',
    type: 'Commercial',
    location: 'Aurangabad, India',
    year: 2011,
    area: '20,000 sq ft',
    description: `NRB Bearings, based in Aurangabad, provide world-class bearing solutions to Indian and global markets. The project was to design a guest house building that would house their important officials.

The building infrastructure is state of the art with amenities including a gym, business centre, and an open terrace garden at the podium level — to which a leading café chain was given access, creating an active ground-level presence for the building.

The brief called for a facility that would impress senior guests while remaining practical for extended stays. The suite arrangement balances the hotel-like quality expected by visiting executives with the comfort and ease of serviced accommodation, avoiding the impersonality of a corporate hotel.`,
    mainImage: 'https://teamdesign.in/wp-content/uploads/2018/12/NRB-Bearings-Auragabad-4-1.jpg',
    gallery: [
      'https://teamdesign.in/wp-content/uploads/2018/12/NRB-Bearings-Auragabad-1-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/NRB-Bearings-Auragabad-2-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/NRB-Bearings-Auragabad-3-1.jpg',
    ],
    testimonial: null,
    related: [
      { slug: 'jk-bank-branch-samba', title: 'J&K Bank Branch Building', type: 'Commercial', image: 'https://teamdesign.in/wp-content/uploads/2018/12/J_K-Bank-Branch-Building-Samba-J_K-State-1-1.jpg' },
      { slug: 'venus-wires-office-khopoli', title: 'Building for Precision Metals', type: 'Commercial', image: 'https://teamdesign.in/wp-content/uploads/2018/12/PRECISION-METALS-9-1.jpg' },
      { slug: 'wedding-destination-raipur', title: 'Wedding Destination', type: 'Commercial', image: 'https://teamdesign.in/wp-content/uploads/2018/12/w-2-1.jpg' },
    ],
  },

  'gokul-cultural-centre-mumbai': {
    title: 'Gokul Cultural Centre',
    client: "South Kanara Brahmin's Association",
    type: 'Institutional',
    location: 'Mumbai',
    year: 2017,
    area: '75,000 sq ft',
    description: `The Kanada community wanted to redevelop a plot that housed an existing temple and marriage hall with a multi-storey building that utilises the FSI potential of the site. Keeping the sensitivity of the devotees and the people associated with it in mind, the new building aligns itself to the axis of the new temple and is designed to look both traditional and modern.

The building houses air-conditioned marriage halls, dining spaces, a dance academy, other training rooms, administrative offices, and a guest house with fully equipped bedrooms on the top floor.

The project posed a particular challenge: honouring the religious and community significance of the original temple while accommodating a contemporary mixed-use programme within a single cohesive architectural language. The solution carefully layers the secular and sacred so that each is enhanced by proximity to the other.`,
    mainImage: 'https://teamdesign.in/wp-content/uploads/2018/12/Gokul-Cam_01-1.jpg',
    gallery: [
      'https://teamdesign.in/wp-content/uploads/2018/12/Gokul-Cam_021-1.jpg',
    ],
    testimonial: null,
    related: [
      { slug: 'kalimata-mandir-navi-mumbai', title: 'Temple Building — Goddess Kali', type: 'Institutional', image: 'https://teamdesign.in/wp-content/uploads/2018/12/KALIMATA-MANDIR_Cam_01-1.jpg' },
      { slug: 'wedding-destination-raipur', title: 'Wedding Destination', type: 'Commercial', image: 'https://teamdesign.in/wp-content/uploads/2018/12/w-2-1.jpg' },
      { slug: 'college-campus-extension-itm', title: 'College Campus Extension — ITM', type: 'Institutional', image: 'https://teamdesign.in/wp-content/uploads/2018/12/COLLEGE-CAMPUS-EXT-4.jpg' },
    ],
  },

  'glass-kitchen-alibaug': {
    title: 'Glass Kitchen',
    client: 'Private Client',
    type: 'Bungalows',
    location: 'Mandwa, Alibaug',
    year: 2014,
    area: '1,500 sq ft',
    description: `Using nature as the basis for design — a building must grow, as nature grows, from the inside out. Nature grows from the idea of a seed and reaches out to its surroundings. A building is akin to an organism and mirrors the beauty and complexity of nature.

The client, being a chef herself, wanted to develop a part of the property into a dedicated kitchen facility cum study cum relaxation groove, right opposite an existing swimming pool. The building was designed to be a "no-building" — surrounded by four large trees at four corners with glass walls that embrace the beauty of nature at any given time.

The result is a small structure with an outsized relationship to its site: from inside, the four trees become the walls, and the garden beyond becomes the room. The kitchen operates as much outdoors as in, with operable glass panels that dissolve the boundary entirely when the weather allows.`,
    mainImage: 'https://teamdesign.in/wp-content/uploads/2018/12/Glass-Kitchen-5-1.jpg',
    gallery: [
      'https://teamdesign.in/wp-content/uploads/2018/12/Glass-Kitchen-4-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/Glass-Kitchen-2-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/Glass-Kitchen-3-copy-1.jpg',
    ],
    testimonial: null,
    related: [
      { slug: 'mariwala-estate-annexe-lonavala', title: 'Mariwala Estate Annexe', type: 'Bungalows', image: 'https://teamdesign.in/wp-content/uploads/2018/12/Mariwala-Estate-Annexe-6-1.jpg' },
      { slug: 'bungalow-ahmedabad', title: 'Bungalow in Ahmedabad', type: 'Bungalows', image: 'https://teamdesign.in/wp-content/uploads/2018/12/Bungalow-in-Ahmedabad-Inida-4.jpg' },
      { slug: 'mist-view-bungalows-lonavala', title: 'Mist View Bungalows', type: 'Bungalows', image: 'https://teamdesign.in/wp-content/uploads/2018/12/MIST-VIEW-7-1.jpg' },
    ],
  },

  'college-engineering-management-nagpur': {
    title: 'College for Engineering & Management',
    client: 'Institute of Technology & Management',
    type: 'Institutional',
    location: 'Kamptee, Nagpur',
    year: 2010,
    area: '300,000 sq ft',
    description: `This 14-acre property is situated in Kamptee, 20km from the bustling city of Nagpur. Kamptee has an old and very picturesque army cantonment area. The campus is designed to accommodate a management institute and an engineering college in the first phase, totalling 400,000 sq ft.

The project was part-built as inherited, so Team Design built on the existing building footprint and completed the building with a stunning front entrance gate along with the entire site planning and landscape.

The challenge was to give coherence to a campus that had begun without a master plan. The solution establishes a clear arrival sequence — from gate to courtyard to building entrance — that makes the campus feel intentional and complete, while the new wings continue the architectural language of the inherited structures.`,
    mainImage: 'https://teamdesign.in/wp-content/uploads/2018/12/COLLEGE-OF-ENG-_-MANAGEMENT-5.jpg',
    gallery: [
      'https://teamdesign.in/wp-content/uploads/2018/12/College-of-Engineerin-_-Management-Nagpur-1-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/College-of-Engineerin-_-Management-Nagp-2-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/College-of-Engineerin-_-Management-Nagp-3-1.jpg',
    ],
    testimonial: null,
    related: [
      { slug: 'mba-hostel-towers-itm', title: 'MBA Hostel Towers — ITM', type: 'Institutional', image: 'https://teamdesign.in/wp-content/uploads/2018/12/MBA-Hostel-Building-ITM-Navi-Mumbai-India-5-1.jpg' },
      { slug: 'college-campus-extension-itm', title: 'College Campus Extension — ITM', type: 'Institutional', image: 'https://teamdesign.in/wp-content/uploads/2018/12/COLLEGE-CAMPUS-EXT-4.jpg' },
      { slug: 'service-industry-campus-goa', title: 'Service Industry Education Campus', type: 'Institutional', image: 'https://teamdesign.in/wp-content/uploads/2018/12/Service-Industru-Education-Complex-Goa-5-1.jpg' },
    ],
  },

  'bungalow-ahmedabad': {
    title: 'Bungalow in Ahmedabad',
    client: 'Mr. Y Sulliya',
    type: 'Bungalows',
    location: 'Ahmedabad',
    year: 2014,
    area: '3,000 sq ft',
    description: `This property sits in the lush green city of Ahmedabad on a 6,500 sq ft plot. The design brief was a modern and well-designed 4-bedroom bungalow with a large east-facing sun terrace and large common living spaces. Architecture, interiors, and landscape were all part of the scope.

The bungalow has been meticulously planned, offering a perfect symphony of elegance and privacy. The east terrace captures the morning sun while shielding the primary rooms from the intense afternoon heat — a climatic response that is also responsible for the house's most distinctive external gesture.

The project demonstrates the firm's commitment to integrated design: the architectural envelope, the interior palette, and the landscape were developed as a single composition, with each element reinforcing the others.`,
    mainImage: 'https://teamdesign.in/wp-content/uploads/2018/12/Bungalow-in-Ahmedabad-Inida-4.jpg',
    gallery: [
      'https://teamdesign.in/wp-content/uploads/2018/12/Bungalow-in-Ahmedabad-Inida-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/Bungalow-in-Ahmedabad-Inida-6.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/Bungalow-in-Ahmedabad-Inida-5.jpg',
    ],
    testimonial: null,
    related: [
      { slug: 'bhandari-house-bhinmal', title: 'Bhandari House', type: 'Bungalows', image: 'https://teamdesign.in/wp-content/uploads/2018/11/Bhandari-House.jpg' },
      { slug: 'villa-merchant-tirupur', title: 'Luxurious 5BHK Villa', type: 'Residential', image: 'https://teamdesign.in/wp-content/uploads/2018/12/Luxurious-5BHK-Villa-Mr-1.jpg' },
      { slug: 'glass-kitchen-alibaug', title: 'Glass Kitchen', type: 'Bungalows', image: 'https://teamdesign.in/wp-content/uploads/2018/12/Glass-Kitchen-5-1.jpg' },
    ],
  },

  'bhandari-house-bhinmal': {
    title: 'Bhandari House',
    client: 'Mr. Gautam Bhandari',
    type: 'Bungalows',
    location: 'Bhinmal, Rajasthan',
    year: 2013,
    area: '8,000 sq ft',
    description: `A house is not just an enclosure within four walls; it is a place which gives true satisfaction and comfort — called home. The design was conceived to make two identical 4-bedroom villas with large living spaces and a family area at each level.

Located in Bhinmal in Rajasthan, the design draws on the formal traditions of the region — thick walls, sheltered courtyard spaces, and carefully positioned openings that modulate the Rajasthani climate. Each villa is independent in plan but shares a common architectural language, creating a sense of family continuity within the compound.

The project is a reminder that the finest residential architecture is measured not by its ambition but by how naturally it becomes home to the people who live in it.`,
    mainImage: 'https://teamdesign.in/wp-content/uploads/2018/11/Bhandari-House.jpg',
    gallery: [
      'https://teamdesign.in/wp-content/uploads/2018/11/REVISED-CAM-3-.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/11/REVISED-CAM-1-.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/11/LAYOUT.jpg',
    ],
    testimonial: null,
    related: [
      { slug: 'bungalow-ahmedabad', title: 'Bungalow in Ahmedabad', type: 'Bungalows', image: 'https://teamdesign.in/wp-content/uploads/2018/12/Bungalow-in-Ahmedabad-Inida-4.jpg' },
      { slug: 'villa-merchant-tirupur', title: 'Luxurious 5BHK Villa', type: 'Residential', image: 'https://teamdesign.in/wp-content/uploads/2018/12/Luxurious-5BHK-Villa-Mr-1.jpg' },
      { slug: 'mist-view-bungalows-lonavala', title: 'Mist View Bungalows', type: 'Bungalows', image: 'https://teamdesign.in/wp-content/uploads/2018/12/MIST-VIEW-7-1.jpg' },
    ],
  },

  'venus-wires-office-khopoli': {
    title: 'Building for Precision Metals — Venus Wires',
    client: 'Venus Wires',
    type: 'Commercial',
    location: 'Khopoli, Maharashtra',
    year: 2009,
    area: '10,000 sq ft',
    description: `Precision Metal Pvt. Ltd — exporters, suppliers, and manufacturers of steel bars and bright bars — have their manufacturing sheds on a 14-acre property in Khopoli, about 80km from Mumbai. The project was to design an office building that would cater to the overall needs of today's small corporate house.

This mid-sized office building offers a grand space and enables employees to work with leisure and complete peace of mind. The design responds to the industrial character of the surrounding site while asserting a civic quality appropriate to a client-facing headquarters building.

The building demonstrates that corporate architecture at the scale of an industrial estate can still be thoughtful and dignified — it need not apologise for its context, but it need not be defined by it either.`,
    mainImage: 'https://teamdesign.in/wp-content/uploads/2018/12/PRECISION-METALS-9-1.jpg',
    gallery: [
      'https://teamdesign.in/wp-content/uploads/2018/12/PRECISION-METALS-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/PRECISION-METALS-3-1.jpg',
    ],
    testimonial: null,
    related: [
      { slug: 'nrb-bearings-guest-house-aurangabad', title: 'Guest House — NRB Bearings', type: 'Commercial', image: 'https://teamdesign.in/wp-content/uploads/2018/12/NRB-Bearings-Auragabad-4-1.jpg' },
      { slug: 'jk-bank-branch-samba', title: 'J&K Bank Branch Building', type: 'Commercial', image: 'https://teamdesign.in/wp-content/uploads/2018/12/J_K-Bank-Branch-Building-Samba-J_K-State-1-1.jpg' },
      { slug: 'wedding-destination-raipur', title: 'Wedding Destination', type: 'Commercial', image: 'https://teamdesign.in/wp-content/uploads/2018/12/w-2-1.jpg' },
    ],
  },

  // ─── INTERIOR DESIGN PROJECTS ──────────────────────────────────────────────
  'womens-bank-branch-srinagar': {
    title: "Women's Bank Branch — J&K Bank",
    client: 'Jammu & Kashmir Bank',
    type: 'Institutional',
    location: 'Srinagar, J&K',
    year: 2018,
    area: '6,500 sq ft',
    description: `The design of this 6,500 sq ft, ground plus three floor premise embodies the true essence of the women of Jammu and Kashmir. The concept revolves around the logo colours of the bank, metamorphosed into feminine pastel shades, which also demarcate the four seasons of the region.

The ground floor reflects the shades of autumn, the first floor sings the hues of spring, the second floor honours the glory of winter, and the third floor tells the story of summer. All these elements were carefully thought and implemented by means of fabrics, graphics, lattice work, and light fixtures.

The layout allows women from all walks of life — a young mother with a newborn, a senior citizen on a wheelchair, a professional, or a teenager — to conduct banking operations with ease and satisfaction.`,
    mainImage: 'https://teamdesign.in/wp-content/uploads/2018/12/Women_s-Bank-Branch-J_K-Bank-Srinagar-1-1.jpg',
    gallery: [
      'https://teamdesign.in/wp-content/uploads/2018/12/Women_s-Bank-Branch-J_K-Bank-Srinagar-2-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/Women_s-Bank-Branch-J_K-Bank-Srinagar-3-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/Women_s-Bank-Branch-J_K-Bank-Srinagar-4-1.jpg',
    ],
    testimonial: null,
    related: [
      { slug: 'jk-bank-nbc-bkc', title: 'National Business Centre — J&K Bank', type: 'Commercial', image: 'https://teamdesign.in/wp-content/uploads/2018/12/J_K-Bank-NBC-BKC-20-1.jpg' },
      { slug: 'airport-lounge-srinagar', title: 'Executive Airport Lounge', type: 'Concept', image: 'https://teamdesign.in/wp-content/uploads/2018/12/AIRPORT-LOUNGE-J_K-BANK-Srinagar-2-1.jpg' },
      { slug: 'high-networth-branch-shopian', title: 'High Networth Bank Branch', type: 'Concept', image: 'https://teamdesign.in/wp-content/uploads/2018/12/High-Networth-Bank-Branch-Shopian-5-1.jpg' },
    ],
  },

  'show-flat-mumbai': {
    title: 'Show Flat',
    client: 'Mumbai Builder',
    type: 'Residential',
    location: 'Mumbai',
    year: 2014,
    area: '1,500 sq ft',
    description: `Located in Mumbai, this 3BHK apartment was designed as a sample flat for future buyers. The challenge was to design a modern space with all corners and niches put to optimum use, and to evolve a space that one can call home sweet home.

The design balances aspiration with domesticity: the flat had to inspire potential buyers while remaining believably livable. Every storage decision was made visible, every awkward corner resolved, and every room staged to suggest the quality of life available within its compact footprint.

The result is a flat that works hard for its size — intelligent planning makes it feel larger than its area suggests, while material choices ensure it photographs and presents with warmth rather than the clinical sterility that too often defines show homes.`,
    mainImage: 'https://teamdesign.in/wp-content/uploads/2018/12/DSC_5975-1.jpg',
    gallery: [
      'https://teamdesign.in/wp-content/uploads/2018/12/DSC_5945-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/DSC_6006-1.jpg',
    ],
    testimonial: null,
    related: [
      { slug: 'exclusive-villa-mumbai', title: 'Exclusive Villa', type: 'Residential', image: 'https://teamdesign.in/wp-content/uploads/2018/12/Exclusive-Villa-Renouned-Indian-Family-Mumbai-India-4-1.jpg' },
      { slug: 'kishore-mariwala-home-mumbai', title: 'Contemporary Modern Home', type: 'Residential', image: 'https://teamdesign.in/wp-content/uploads/2018/01/Kishore-Mariwala-1.jpg' },
      { slug: 'gordon-serrao-home-navi-mumbai', title: 'Classic Modern Home', type: 'Residential', image: 'https://teamdesign.in/wp-content/uploads/2018/12/Serrao-Home-4-1.jpg' },
    ],
  },

  'unilazer-ventures-office': {
    title: 'Office for Unilazer Ventures',
    client: 'Unilazer Ventures Pvt Ltd & Swades Foundation',
    type: 'Commercial',
    location: 'Worli, Mumbai',
    year: 2014,
    area: '6,500 sq ft',
    description: `Completed in just 60 days, this office in the heart of Mumbai's business hub flaunts a distinct personality via clean lines and a simple palette. With the company being predominantly media-based and partially an NGO, several key elements like vibrant colours in the form of graphics on the walls build an abstract connect — yet the ambience remains present-day and chic to cater to the other business clientele.

Faced with the challenge of completing the exercise from start to handover in just 60 days, the onus was on quick and effective delivery. Choice of material and colour was worked out to sport à la mode refinement.

The 600 sq mt office space sports executive cabins in the centre with staff along its periphery. Glass walls open up the area, allowing natural light to flood the space. Clean lines dress the office with a focus on functionality without compromising on storage, security and privacy. Yellow Jaisalmer stone slabs light up the floor and add zing to the interiors.`,
    mainImage: 'https://teamdesign.in/wp-content/uploads/2018/12/Unilazer-Ventures-Pvt-Ltd-3-1.jpg',
    gallery: [
      'https://teamdesign.in/wp-content/uploads/2018/12/Unilazer-Ventures-Pvt-Ltd-10-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/Unilazer-Ventures-Pvt-Ltd-8-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/Unilazer-Ventures-Pvt-Ltd-5-1.jpg',
    ],
    testimonial: null,
    related: [
      { slug: 'jk-bank-nbc-bkc', title: 'National Business Centre — J&K Bank', type: 'Commercial', image: 'https://teamdesign.in/wp-content/uploads/2018/12/J_K-Bank-NBC-BKC-20-1.jpg' },
      { slug: 'hdfc-bank-office-jammu', title: 'HDFC Bank Corporate Office', type: 'Commercial', image: 'https://teamdesign.in/wp-content/uploads/2018/12/NSP_9833-1.jpg' },
      { slug: 'cinemarc-cinema-theatre', title: 'Cinemarc Cinema Theatre', type: 'Commercial', image: 'https://teamdesign.in/wp-content/uploads/2018/12/Cinemarc-Cinema-Theatre-3-1.jpg' },
    ],
  },

  'jk-bank-nbc-bkc': {
    title: 'National Business Centre — J&K Bank',
    client: 'Jammu & Kashmir Bank',
    type: 'Commercial',
    location: 'Bandra Kurla Complex, Mumbai',
    year: 2013,
    area: '70,000 sq ft',
    description: `The challenge was to strike the right balance between the 'Kashmiri Art and Crafts' and the present-day 'Contemporary Look and Feel' in the business capital of India.

The design incorporated walnut wood lattices, Paper Mache panels, carved furniture, and bidri metal artifacts imported from Srinagar. At 70,000 sq ft across multiple floors, the project demanded a coherent design language that could hold together at scale — from the imposing double-height banking hall to the more intimate private consultation rooms on the upper floors.

The palette is deliberately restrained — walnut, stone, and polished metal — allowing the architecture to provide the assurance a financial institution requires while the Kashmiri craft elements bring warmth, regional identity, and the unmistakable quality of handwork that no corporate formula can replicate.`,
    mainImage: 'https://teamdesign.in/wp-content/uploads/2018/12/J_K-Bank-NBC-BKC-20-1.jpg',
    gallery: [
      'https://teamdesign.in/wp-content/uploads/2018/12/J_K-Bank-NBC-BKC-12-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/J_K-Bank-NBC-BKC-9-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/J_K-Bank-NBC-BKC-23-1.jpg',
    ],
    testimonial: null,
    related: [
      { slug: 'unilazer-ventures-office', title: 'Office for Unilazer Ventures', type: 'Commercial', image: 'https://teamdesign.in/wp-content/uploads/2018/12/Unilazer-Ventures-Pvt-Ltd-3-1.jpg' },
      { slug: 'hdfc-bank-office-jammu', title: 'HDFC Bank Corporate Office', type: 'Commercial', image: 'https://teamdesign.in/wp-content/uploads/2018/12/NSP_9833-1.jpg' },
      { slug: 'womens-bank-branch-srinagar', title: "Women's Bank Branch — J&K Bank", type: 'Institutional', image: 'https://teamdesign.in/wp-content/uploads/2018/12/Women_s-Bank-Branch-J_K-Bank-Srinagar-1-1.jpg' },
    ],
  },

  'high-networth-branch-shopian': {
    title: 'High Networth Bank Branch',
    client: 'Jammu & Kashmir Bank',
    type: 'Concept',
    location: 'Shopian, J&K',
    year: 2017,
    area: '4,000 sq ft',
    description: `Standing in bank queues is redundant, and there has been an increasing need for banks that offer a lounge-like treatment to high net worth individuals. Team Design is helping J&K Bank set up these premium premises across the state and beyond, making a statement about how banking can feel at its best.

The bank is designed to offer personal attention to every customer and deliver a consistent banking experience across all channels. The design features an 'Elite' reception, waiting lounge, relationship manager office, and business rooms to give premium customers an elegant and private experience.

This concept demonstrates how the bank branch — traditionally a civic space defined by queues and counters — can be reimagined as a place of discretion and ease, where the transaction is almost incidental to the quality of the environment.`,
    mainImage: 'https://teamdesign.in/wp-content/uploads/2018/12/High-Networth-Bank-Branch-Shopian-5-1.jpg',
    gallery: [
      'https://teamdesign.in/wp-content/uploads/2018/12/High-Networth-Bank-Branch-Shopian-10-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/High-Networth-Bank-Branch-Shopian-7-1.jpg',
    ],
    testimonial: null,
    related: [
      { slug: 'airport-lounge-srinagar', title: 'Executive Airport Lounge', type: 'Concept', image: 'https://teamdesign.in/wp-content/uploads/2018/12/AIRPORT-LOUNGE-J_K-BANK-Srinagar-2-1.jpg' },
      { slug: 'electronic-bank-lobby-srinagar', title: 'Electronic Bank Lobby', type: 'Concept', image: 'https://teamdesign.in/wp-content/uploads/2018/12/Electronic-Bank-Lobby-J_K-Bank-Srinagar-5-1.jpg' },
      { slug: 'jk-bank-nbc-bkc', title: 'National Business Centre — J&K Bank', type: 'Commercial', image: 'https://teamdesign.in/wp-content/uploads/2018/12/J_K-Bank-NBC-BKC-20-1.jpg' },
    ],
  },

  'hdfc-bank-office-jammu': {
    title: 'HDFC Bank Corporate Office',
    client: 'HDFC Bank',
    type: 'Commercial',
    location: 'Narhwal, Jammu',
    year: 2015,
    area: '13,000 sq ft',
    description: `Ever-changing space requirements. Real estate costs. Talent retention. Sustainability goals. The modern corporate office must respond to all of these simultaneously — and do so within a budget that leaves no room for waste.

The 13,000 sq ft project incorporates private offices, open workstations, a reception and waiting area, break room, kitchenette, cafeteria, and other support spaces. Specialised training and presentation rooms accommodate the training of working staff and presentations to potential clients.

The design creates a workplace that balances the efficiency HDFC Bank requires with an environment that attracts and retains talent — warm enough to feel like a place where people choose to spend time, and disciplined enough to make that time productive.`,
    mainImage: 'https://teamdesign.in/wp-content/uploads/2018/12/NSP_9833-1.jpg',
    gallery: [
      'https://teamdesign.in/wp-content/uploads/2018/12/NSP_0096-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/NSP_0010-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/NSP_9972-1.jpg',
    ],
    testimonial: null,
    related: [
      { slug: 'unilazer-ventures-office', title: 'Office for Unilazer Ventures', type: 'Commercial', image: 'https://teamdesign.in/wp-content/uploads/2018/12/Unilazer-Ventures-Pvt-Ltd-3-1.jpg' },
      { slug: 'jk-bank-nbc-bkc', title: 'National Business Centre — J&K Bank', type: 'Commercial', image: 'https://teamdesign.in/wp-content/uploads/2018/12/J_K-Bank-NBC-BKC-20-1.jpg' },
      { slug: 'cinemarc-cinema-theatre', title: 'Cinemarc Cinema Theatre', type: 'Commercial', image: 'https://teamdesign.in/wp-content/uploads/2018/12/Cinemarc-Cinema-Theatre-3-1.jpg' },
    ],
  },

  'garden-glory-penthouse-thane': {
    title: 'Garden Glory Penthouse',
    client: 'Indian Family',
    type: 'Residential',
    location: 'Thane',
    year: 2013,
    area: '15,000 sq ft',
    description: `In a city starved of green spaces, this penthouse in Thane, Maharashtra boasts an expansive 10,000 sq ft terrace garden surrounding just 5,000 sq ft of actual livable space. The home centres on a terrace garden, transforming the living area into an oasis of calm.

The 6-bedroom layout includes dining, living, study, kitchen, and servant quarters, all enveloped in greenery. All rooms open to corridors overlooking gardens and terraces. Floor-to-ceiling glass doors in the entrance corridor provide sweeping views of the terrace beyond. White garden furniture provides freshness among the plants.

A neutral interior palette serves as backdrop, with colour introduced through rugs, jaali designs, and soft furnishings. Warm and ambient lighting bestows a homely feel. Sustainable features include power-efficient LED fixtures, VRV/HVAC equipment, green-certified sanitary ware, and natural greenery ensuring environmental responsibility throughout.`,
    mainImage: 'https://teamdesign.in/wp-content/uploads/2018/12/Garden-Glory-Penthouse-Indian-Family-Thane-India-7-1.jpg',
    gallery: [
      'https://teamdesign.in/wp-content/uploads/2018/12/Garden-Glory-Penthouse-Indian-Family-Thane-India-5-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/Garden-Glory-Penthouse-Indian-Family-Thane-India-4-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/Garden-Glory-Penthouse-Indian-Family-Thane-India-10-1.jpg',
    ],
    testimonial: null,
    related: [
      { slug: 'exclusive-villa-mumbai', title: 'Exclusive Villa', type: 'Residential', image: 'https://teamdesign.in/wp-content/uploads/2018/12/Exclusive-Villa-Renouned-Indian-Family-Mumbai-India-4-1.jpg' },
      { slug: 'kishore-mariwala-home-mumbai', title: 'Contemporary Modern Home', type: 'Residential', image: 'https://teamdesign.in/wp-content/uploads/2018/01/Kishore-Mariwala-1.jpg' },
      { slug: 'gordon-serrao-home-navi-mumbai', title: 'Classic Modern Home', type: 'Residential', image: 'https://teamdesign.in/wp-content/uploads/2018/12/Serrao-Home-4-1.jpg' },
    ],
  },

  'airport-lounge-srinagar': {
    title: 'Executive Airport Lounge — J&K Bank',
    client: 'Jammu & Kashmir Bank',
    type: 'Concept',
    location: 'Airport Terminal, Srinagar',
    year: 2013,
    area: '2,500 sq ft',
    description: `Travel is meant to be a rich experience — a means of engaging with culture, cuisine, and pleasure. This executive airport lounge for J&K Bank was conceived as a space that embodies the art and culture of the Kashmir Valley, giving travellers departing from Srinagar a final encounter with the region's remarkable design heritage.

The brief emphasised finding the ultimate in pre-flight comfort at an airport lounge that invites you to stay awhile. The design draws on Kashmiri craft traditions — carved wood, papier-mâché, and the intricate geometric patterns of the region — translated into a contemporary hospitality setting.

The result is a lounge that feels unmistakably of its place: specific to Srinagar in the way that the best airport environments honour their cities rather than erasing them.`,
    mainImage: 'https://teamdesign.in/wp-content/uploads/2018/12/AIRPORT-LOUNGE-J_K-BANK-Srinagar-2-1.jpg',
    gallery: [
      'https://teamdesign.in/wp-content/uploads/2018/12/AIRPORT-LOUNGE-J_K-BANK-Srinagar-3-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/AIRPORT-LOUNGE-J_K-BANK-Srinagar-6-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/AIRPORT-LOUNGE-J_K-BANK-Srinagar-5-1.jpg',
    ],
    testimonial: null,
    related: [
      { slug: 'high-networth-branch-shopian', title: 'High Networth Bank Branch', type: 'Concept', image: 'https://teamdesign.in/wp-content/uploads/2018/12/High-Networth-Bank-Branch-Shopian-5-1.jpg' },
      { slug: 'electronic-bank-lobby-srinagar', title: 'Electronic Bank Lobby', type: 'Concept', image: 'https://teamdesign.in/wp-content/uploads/2018/12/Electronic-Bank-Lobby-J_K-Bank-Srinagar-5-1.jpg' },
      { slug: 'womens-bank-branch-srinagar', title: "Women's Bank Branch — J&K Bank", type: 'Institutional', image: 'https://teamdesign.in/wp-content/uploads/2018/12/Women_s-Bank-Branch-J_K-Bank-Srinagar-1-1.jpg' },
    ],
  },

  'exclusive-villa-mumbai': {
    title: 'Exclusive Villa',
    client: 'Private Client',
    type: 'Residential',
    location: 'Mumbai',
    year: 2016,
    area: '10,000 sq ft',
    description: `Man and nature have always been locked together in a perpetual battle — man trying to civilise the world, and nature being a force to be reckoned with. What happens when an unstoppable force meets an immovable object? 'Symbiosis' is the answer.

This design merges contemporary and organic aesthetics into a luxurious apartment. The concept separates two floors: the lower level contains living, kitchen, and entertainment spaces, while bedrooms occupy the upper floor for privacy. The architects incorporated abundant windows with dark flooring and accent lines, complemented by bright furnishings, colourful wall art, and wood-panelled walls to balance monochromatic tones.

The result is a home that feels simultaneously disciplined and alive — a space in which the owners' collections, personalities, and daily routines are all given room to breathe.`,
    mainImage: 'https://teamdesign.in/wp-content/uploads/2018/12/Exclusive-Villa-Renouned-Indian-Family-Mumbai-India-4-1.jpg',
    gallery: [
      'https://teamdesign.in/wp-content/uploads/2018/12/Exclusive-Villa-Renouned-Indian-Family-Mumbai-India-2-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/Exclusive-Villa-Renouned-Indian-Family-Mumbai-India-1-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/Exclusive-Villa-Renouned-Indian-Family-Mumbai-India-6-1.jpg',
    ],
    testimonial: null,
    related: [
      { slug: 'garden-glory-penthouse-thane', title: 'Garden Glory Penthouse', type: 'Residential', image: 'https://teamdesign.in/wp-content/uploads/2018/12/Garden-Glory-Penthouse-Indian-Family-Thane-India-7-1.jpg' },
      { slug: 'kishore-mariwala-home-mumbai', title: 'Contemporary Modern Home', type: 'Residential', image: 'https://teamdesign.in/wp-content/uploads/2018/01/Kishore-Mariwala-1.jpg' },
      { slug: 'show-flat-mumbai', title: 'Show Flat', type: 'Residential', image: 'https://teamdesign.in/wp-content/uploads/2018/12/DSC_5975-1.jpg' },
    ],
  },

  'electronic-bank-lobby-srinagar': {
    title: 'Electronic Bank Lobby — J&K Bank',
    client: 'J&K Bank',
    type: 'Concept',
    location: 'Lal Chowk, Srinagar',
    year: 2018,
    area: '2,000 sq ft',
    description: `The E-Lobby is a new facility provided by leading banks to empower customers to conduct banking transactions as per their convenience, without any time restriction — saving time, eliminating queues, and offering additional services that ATMs do not provide.

The challenge was to design a space that was state-of-the-art and confidently modern, while also inheriting the corporate brand and keeping in mind the cultural heritage of the region. This generated soft forms that reflect the gentleness of the people, whites that depict the magic of snow, digital lines on the floor that signify today's tech era, and three colours that speak to the brand.

A much-talked-about design waiting to be built — this concept demonstrates how banking infrastructure can become a cultural landmark rather than a generic utility.`,
    mainImage: 'https://teamdesign.in/wp-content/uploads/2018/12/Electronic-Bank-Lobby-J_K-Bank-Srinagar-5-1.jpg',
    gallery: [
      'https://teamdesign.in/wp-content/uploads/2018/12/Electronic-Bank-Lobby-J_K-Bank-Srinagar-1-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/Electronic-Bank-Lobby-J_K-Bank-Srinagar-4-1.jpg',
    ],
    testimonial: null,
    related: [
      { slug: 'high-networth-branch-shopian', title: 'High Networth Bank Branch', type: 'Concept', image: 'https://teamdesign.in/wp-content/uploads/2018/12/High-Networth-Bank-Branch-Shopian-5-1.jpg' },
      { slug: 'airport-lounge-srinagar', title: 'Executive Airport Lounge', type: 'Concept', image: 'https://teamdesign.in/wp-content/uploads/2018/12/AIRPORT-LOUNGE-J_K-BANK-Srinagar-2-1.jpg' },
      { slug: 'womens-bank-branch-srinagar', title: "Women's Bank Branch — J&K Bank", type: 'Institutional', image: 'https://teamdesign.in/wp-content/uploads/2018/12/Women_s-Bank-Branch-J_K-Bank-Srinagar-1-1.jpg' },
    ],
  },

  'kishore-mariwala-home-mumbai': {
    title: 'Contemporary Modern Home',
    client: 'Mr. Kishore Mariwala',
    type: 'Residential',
    location: "Kemps Corner, Mumbai",
    year: 2009,
    area: '2,600 sq mt',
    description: `Evolving design sensibilities are truly taking over, blurring boundaries in a holistic global outlook. The design augments the plush feel of the rest of the home as it is replicated in other elements such as blinds and ceiling.

Each room stands in signature attendance — every detail meeting a special character of the users. Every colour, every picture, every kitchen utensil, every artifact, every piece of furniture and fabric was specifically chosen to make the home unique to its owner.

The project is one of the firm's most personally meaningful commissions — a private residence for Kishore Mariwala, founder of Marico, designed at the scale and quality befitting its address in South Mumbai. The completed home represents over two decades of working relationship between the client and the firm.`,
    mainImage: 'https://teamdesign.in/wp-content/uploads/2018/01/Kishore-Mariwala-1.jpg',
    gallery: [
      'https://teamdesign.in/wp-content/uploads/2018/01/Kishore-Mariwala-5.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/01/Kishore-Mariwala-7.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/01/Kishore-Mariwala-8.jpg',
    ],
    testimonial: {
      quote: 'Team Design managed the entire project lifecycle — from concept and design to contractor management, budget adherence, and on-time delivery. The result exceeded every expectation.',
      author: 'Kishore V. Mariwala',
      title: 'Industrialist, Founder of Marico',
    },
    related: [
      { slug: 'garden-glory-penthouse-thane', title: 'Garden Glory Penthouse', type: 'Residential', image: 'https://teamdesign.in/wp-content/uploads/2018/12/Garden-Glory-Penthouse-Indian-Family-Thane-India-7-1.jpg' },
      { slug: 'exclusive-villa-mumbai', title: 'Exclusive Villa', type: 'Residential', image: 'https://teamdesign.in/wp-content/uploads/2018/12/Exclusive-Villa-Renouned-Indian-Family-Mumbai-India-4-1.jpg' },
      { slug: 'gordon-serrao-home-navi-mumbai', title: 'Classic Modern Home', type: 'Residential', image: 'https://teamdesign.in/wp-content/uploads/2018/12/Serrao-Home-4-1.jpg' },
    ],
  },

  'gordon-serrao-home-navi-mumbai': {
    title: 'Classic Modern Home',
    client: 'Gordon Serrao',
    type: 'Residential',
    location: 'Vashi, Navi Mumbai',
    year: 2012,
    area: '3,500 sq mt',
    description: `Located in Vashi, a suburb of Mumbai, this is a home filled with contemporary warmth that is inviting, cosy, and elegant all at the same time. This was achieved by creating a palette of earth tones combined with a variety of textures running the gamut from smoothly polished to rough and weathered.

The family room is a prime example of how textures and warm shades can create a sophisticated and warm feel. The interiors avoid the extremes of either cool minimalism or heavy traditionalism, finding instead a register that feels effortlessly lived-in from the moment the family moves in.

The project comes with the endorsement of the client himself — Gordon Serrao, a hotelier whose professional life is spent evaluating the quality of hospitality environments, praised the professionalism of the Team Design process from first meeting to handover.`,
    mainImage: 'https://teamdesign.in/wp-content/uploads/2018/12/Serrao-Home-4-1.jpg',
    gallery: [
      'https://teamdesign.in/wp-content/uploads/2018/12/Serrao-Home-3-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/Serrao-Home-6-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/Serrao-Home-8-1.jpg',
    ],
    testimonial: {
      quote: 'Team Design showed great professionalism from start to completion. The quality of their work and their commitment to the client is truly commendable.',
      author: 'Gordon Serrao',
      title: 'Hotelier',
    },
    related: [
      { slug: 'kishore-mariwala-home-mumbai', title: 'Contemporary Modern Home', type: 'Residential', image: 'https://teamdesign.in/wp-content/uploads/2018/01/Kishore-Mariwala-1.jpg' },
      { slug: 'garden-glory-penthouse-thane', title: 'Garden Glory Penthouse', type: 'Residential', image: 'https://teamdesign.in/wp-content/uploads/2018/12/Garden-Glory-Penthouse-Indian-Family-Thane-India-7-1.jpg' },
      { slug: 'exclusive-villa-mumbai', title: 'Exclusive Villa', type: 'Residential', image: 'https://teamdesign.in/wp-content/uploads/2018/12/Exclusive-Villa-Renouned-Indian-Family-Mumbai-India-4-1.jpg' },
    ],
  },

  'cinemarc-cinema-theatre': {
    title: 'Cinemarc Cinema Theatre',
    client: 'Mr. N Suryavanshi',
    type: 'Commercial',
    location: 'Vadodara, India',
    year: 2015,
    area: '20,000 sq mt',
    description: `This project was fast-paced with a clear design brief. Approximately 20,000 sq ft of space on the top floor of a new shopping complex was given to Team Design to design into a modern cineplex.

Bold use of colour, clear circulation patterns, and all other services were carefully thought through and designed to suit the needs of the end user and to the satisfaction of the client.

The cinema sits within a retail complex, and the design had to establish a distinct identity for the cineplex — a destination in its own right — while drawing visitors through the retail floors to reach it. The arrival sequence, from ground-floor entrance to upper-floor auditorium, is as much a part of the experience as the auditorium itself.`,
    mainImage: 'https://teamdesign.in/wp-content/uploads/2018/12/Cinemarc-Cinema-Theatre-3-1.jpg',
    gallery: [
      'https://teamdesign.in/wp-content/uploads/2018/12/Cinemarc-Cinema-Theatre-2-1.jpg',
      'https://teamdesign.in/wp-content/uploads/2018/12/Cinemarc-Cinema-Theatre-5-1.jpg',
    ],
    testimonial: null,
    related: [
      { slug: 'unilazer-ventures-office', title: 'Office for Unilazer Ventures', type: 'Commercial', image: 'https://teamdesign.in/wp-content/uploads/2018/12/Unilazer-Ventures-Pvt-Ltd-3-1.jpg' },
      { slug: 'hdfc-bank-office-jammu', title: 'HDFC Bank Corporate Office', type: 'Commercial', image: 'https://teamdesign.in/wp-content/uploads/2018/12/NSP_9833-1.jpg' },
      { slug: 'jk-bank-nbc-bkc', title: 'National Business Centre — J&K Bank', type: 'Commercial', image: 'https://teamdesign.in/wp-content/uploads/2018/12/J_K-Bank-NBC-BKC-20-1.jpg' },
    ],
  },
};

const ALL_SLUGS = Object.keys(PROJECT_DATA);

const FALLBACK: Project = {
  title: 'Project',
  client: 'Private Client',
  type: 'Architecture',
  location: 'Mumbai',
  year: 2020,
  area: '—',
  description: 'Project details coming soon.',
  mainImage: 'https://teamdesign.in/wp-content/uploads/2018/12/COLLEGE-CAMPUS-EXT-4.jpg',
  gallery: [],
  testimonial: null,
  related: [],
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = PROJECT_DATA[params.slug];
  if (!project) return { title: 'Project' };
  return {
    title: project.title,
    description: `${project.type} · ${project.location} · ${project.year} — Team Design Architects`,
  };
}

export function generateStaticParams() {
  return ALL_SLUGS.map((slug) => ({ slug }));
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = PROJECT_DATA[params.slug] ?? {
    ...FALLBACK,
    title: params.slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
  };

  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroImageWrap}>
          <Image
            src={project.mainImage}
            alt={project.title}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
          <div className={styles.heroOverlay} />
        </div>
      </section>

      {/* Project header */}
      <section className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.meta}>
            <span className={styles.metaItem}>{project.type}</span>
            <span className={styles.metaDot}>·</span>
            <span className={styles.metaItem}>{project.location}</span>
            <span className={styles.metaDot}>·</span>
            <span className={styles.metaItem}>{project.year}</span>
            <span className={styles.metaDot}>·</span>
            <span className={styles.metaItem}>{project.area}</span>
          </div>
          <h1 className={styles.title}>{project.title}</h1>
          {project.client && (
            <span className={styles.client}>Client: {project.client}</span>
          )}
        </div>
      </section>

      {/* Project Story — Challenge / Strategy / Result */}
      <section className={styles.content}>
        <div className={styles.contentInner}>
          {project.description.split('\n\n').map((para, i) => {
            const labels = ['The Brief', 'The Approach', 'The Outcome'];
            const label = labels[i] ?? null;
            return (
              <div key={i} className={styles.storyBeat}>
                {label && <span className={styles.storyLabel}>{label}</span>}
                <p className={styles.para}>{para}</p>
              </div>
            );
          })}
        </div>

        {/* Inline WhatsApp — project-specific */}
        <div className={styles.whatsappInline}>
          <a
            href={`https://wa.me/919876543210?text=${encodeURIComponent(`Hi, I'm interested in discussing a project similar to "${project.title}" (${project.location}). Can we connect?`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.whatsappInlineLink}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.128.558 4.122 1.533 5.851L.057 23.776a.75.75 0 0 0 .94.94l5.925-1.476A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.659-.528-5.168-1.444l-.37-.223-3.815.95.968-3.739-.245-.387A9.952 9.952 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
            Ask about this project on WhatsApp
          </a>
        </div>
      </section>

      {/* Gallery */}
      {project.gallery.length > 0 && (
        <FadeIn direction="up" threshold={0.05}>
          <section className={styles.gallery}>
            {project.gallery.map((src, i) => (
              <div
                key={i}
                className={`${styles.galleryItem} ${i % 3 === 0 ? styles.galleryFull : ''}`}
              >
                <Image
                  src={src}
                  alt={`${project.title} — image ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            ))}
          </section>
        </FadeIn>
      )}

      {/* Testimonial */}
      {project.testimonial && (
        <FadeIn direction="up">
        <section className={styles.testimonial}>
          <blockquote className={styles.quote}>
            &ldquo;{project.testimonial.quote}&rdquo;
          </blockquote>
          <div className={styles.quoteAuthor}>
            <span className={styles.authorName}>{project.testimonial.author}</span>
            <span className={styles.authorTitle}>{project.testimonial.title}</span>
          </div>
        </section>
        </FadeIn>
      )}

      {/* CTA */}
      <section className={styles.cta}>
        <p className={styles.ctaText}>Planning a similar project?</p>
        <h2 className={styles.ctaTitle}>Begin a conversation.</h2>
        <div className={styles.ctaLinks}>
          <a
            href="https://wa.me/919876543210"
            className={styles.ctaWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp Studio →
          </a>
          <Link href="/contact" className={styles.ctaContact}>
            Or use the contact form
          </Link>
        </div>
      </section>

      {/* Related */}
      {project.related.length > 0 && (
        <section className={styles.related}>
          <div className={styles.relatedHeader}>
            <span className="label">Continue Browsing</span>
            <h2 className={styles.relatedTitle}>Related Projects</h2>
          </div>
          <div className={styles.relatedGrid}>
            {project.related.map((r) => (
              <Link key={r.slug} href={`/work/${r.slug}`} className={styles.relatedCard}>
                <div className={styles.relatedImage}>
                  <Image
                    src={r.image}
                    alt={r.title}
                    fill
                    sizes="33vw"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <span className={styles.relatedType}>{r.type}</span>
                <span className={styles.relatedName}>{r.title}</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
