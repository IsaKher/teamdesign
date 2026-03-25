export interface RelatedProject {
  slug: string;
  title: string;
  type: string;
  image: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  title: string;
}

export type ContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'fullWidthImage'; src: string; caption?: string }
  | { type: 'halfWidthImages'; images: [string, string]; captions?: [string, string] }
  | { type: 'pullQuote'; text: string };

export interface Project {
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
  contentBlocks?: ContentBlock[];
}

export const PROJECT_DATA: Record<string, Project> = {
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
    contentBlocks: [
      { type: 'paragraph', text: 'A wedding destination conceived at the scale of ceremony itself — seven acres in Raipur designed to hold intimate family gatherings and large public celebrations simultaneously, without interference between them.' },
      { type: 'fullWidthImage', src: 'https://teamdesign.in/wp-content/uploads/2018/12/w-4-1.jpg', caption: 'Landscape gardens — Raipur, Chhattisgarh, 2014' },
      { type: 'pullQuote', text: 'The result is a campus that is simultaneously rooted in Indian cultural tradition and unmistakably modern in its execution.' },
      { type: 'halfWidthImages', images: ['https://teamdesign.in/wp-content/uploads/2018/12/w-8-1.jpg', 'https://teamdesign.in/wp-content/uploads/2018/12/w-10-1.jpg'], captions: ['Banquet corridor', 'Event pavilion'] },
      { type: 'paragraph', text: 'Landscaped corridors between event spaces allow multiple functions to run in parallel. The Rajasthani architectural vocabulary — arches, jaali screens, carved stonework — is reinterpreted in a contemporary material language.' },
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
    contentBlocks: [
      { type: 'paragraph', text: 'A temple designed after extensive research on Kalimata temples across India — translating the vertical hierarchy of the shikara and the processional logic of the mandapa into a contemporary material language rooted in its Bengali community.' },
      { type: 'fullWidthImage', src: 'https://teamdesign.in/wp-content/uploads/2018/12/KALIMATA-MANDIR_Cam_03-1.jpg', caption: 'East elevation — Kharghar, Navi Mumbai, 2017' },
      { type: 'pullQuote', text: 'The building is experienced as much as seen: the transition from the bright forecourt into the cool interior of the sanctum.' },
      { type: 'fullWidthImage', src: 'https://teamdesign.in/wp-content/uploads/2018/12/KALIMATA-MANDIR_Cam_04-1.jpg', caption: 'Rooftop courtyard fronting the main temple' },
      { type: 'paragraph', text: 'The temple has become a significant community landmark in Kharghar since its completion — a building that honours the spiritual gravity of its programme while serving a large and growing devotee community.' },
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
    contentBlocks: [
      { type: 'paragraph', text: 'At 1.5 million square feet across 70 acres in Bicholim, this is one of the largest projects in the firm\'s portfolio — a five-institute campus whose radiating geometry is legible from the air and navigable on foot.' },
      { type: 'fullWidthImage', src: 'https://teamdesign.in/wp-content/uploads/2018/12/Service-Industru-Education-Complex-Goa-4-1.jpg', caption: 'Campus entrance — Bicholim, Goa, 2009' },
      { type: 'pullQuote', text: 'The five-finger concept allows each institute to maintain its own identity while sharing infrastructure and connecting back to a common arrival sequence.' },
      { type: 'fullWidthImage', src: 'https://teamdesign.in/wp-content/uploads/2018/12/Service-Industru-Education-Complex-Goa-6-1.jpg', caption: 'Institute facade and landscaped approach' },
      { type: 'paragraph', text: 'Each finger functions as a separate institute — covering hospitality, management, health sciences, banking training, and a centre of excellence — radiating from the entrance through zones of common facilities and forest.' },
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
    contentBlocks: [
      { type: 'paragraph', text: 'Located at 2,200 feet elevation near Tungarli Lake, four bungalows on a 25,000 sq ft hillside plot — each designed with Vaastu principles, south-facing solar roofs, and a careful site plan that achieves genuine privacy within a multi-unit development.' },
      { type: 'fullWidthImage', src: 'https://teamdesign.in/wp-content/uploads/2018/12/MIST-VIEW-4-1.jpg', caption: 'Exterior elevation — Lonavala, Maharashtra, 2010' },
      { type: 'pullQuote', text: 'Each bungalow occupies its own distinct position on the hillside, connected by landscaped paths rather than shared walls.' },
      { type: 'halfWidthImages', images: ['https://teamdesign.in/wp-content/uploads/2018/12/MIST-VIEW-10-1.jpg', 'https://teamdesign.in/wp-content/uploads/2018/12/MIST-VIEW-6-1.jpg'], captions: ['Terrace living area', 'South-facing facade'] },
      { type: 'paragraph', text: 'The outdoor terrace is private and the form of each house shields it from its neighbour. The Western Ghats setting — misty mornings, forested slopes, the lake below — is the primary material of the design.' },
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
    contentBlocks: [
      { type: 'paragraph', text: 'Twin hostel towers of 11 and 16 floors in Navi Mumbai, providing each of the 600 students with a private furnished room — and the whole community with a courtyard, computer lab, gym, and social kitchen alcoves that resist the anonymity of large-scale student housing.' },
      { type: 'fullWidthImage', src: 'https://teamdesign.in/wp-content/uploads/2018/12/HOSTEL-BUILDING-4-1.jpg', caption: 'Twin towers — Navi Mumbai, 2005' },
      { type: 'pullQuote', text: 'Student accommodation at this scale risks becoming anonymous. The design resists this through careful treatment of the common spaces.' },
      { type: 'fullWidthImage', src: 'https://teamdesign.in/wp-content/uploads/2018/12/HOSTEL-BUILDING-3-1.jpg', caption: 'Podium level — landscaped courtyard and lounges' },
      { type: 'paragraph', text: 'Sky terraces at alternate floors and ground-level courtyards give each resident a sense of neighbourhood within the larger building — the quality that defines student life at its best.' },
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
    contentBlocks: [
      { type: 'paragraph', text: 'The art of the annexe: how to add a cantilever lap pool, clubhouse, and redesigned landscape to a beloved 70,000 sq ft Art Deco estate in Lonavala without diminishing a single element of what was already there.' },
      { type: 'fullWidthImage', src: 'https://teamdesign.in/wp-content/uploads/2018/12/5-1.jpg', caption: 'Cantilever lap pool — Lonavala, Maharashtra, 2016' },
      { type: 'pullQuote', text: 'Each new element was tested against the question of whether it improves the estate as a whole, and only those that passed were retained in the final design.' },
      { type: 'halfWidthImages', images: ['https://teamdesign.in/wp-content/uploads/2018/12/Mariwala-Estate-Annexe-4-1.jpg', 'https://teamdesign.in/wp-content/uploads/2018/12/1-1.jpg'], captions: ['Estate grounds and landscape', 'Restored Art Deco facade'] },
      { type: 'paragraph', text: 'The gallery provides views of mountains, waterfalls, and the scenic Lonavala skies — a setting that demanded restraint as the primary design virtue.' },
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
    contentBlocks: [
      { type: 'paragraph', text: 'A 5BHK villa in Tirupur designed strictly to Vaastu and the Tamil Nadu climate — deep cantilever roofs for shade, stone floors for coolness, heavy masonry walls that moderate the internal temperature through the long summer.' },
      { type: 'fullWidthImage', src: 'https://teamdesign.in/wp-content/uploads/2018/12/Luxuerious-5BHK-Villa-Mr-1.jpg', caption: 'Garden elevation — Tirupur, Tamil Nadu, 2017' },
      { type: 'pullQuote', text: 'Materials are responsive to the Tamil Nadu climate: cool stone floors, lime render on the exterior, and heavy masonry walls that moderate the internal temperature.' },
      { type: 'fullWidthImage', src: 'https://teamdesign.in/wp-content/uploads/2018/12/Luxuriewous-5BHK-Villa-Mr-1.jpg', caption: 'Dining room opening to the garden sit-out' },
      { type: 'paragraph', text: 'Main living spaces are oriented to catch the prevailing breeze. The cantilever roofs serve simultaneously as shade structure and as the villa\'s most distinctive external gesture.' },
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
    contentBlocks: [
      { type: 'paragraph', text: 'A ground-plus-one bank branch in Samba, J&K — designed to serve the industrialists of Jammu with a 24-hour ATM lobby at street level and a fully equipped business centre above for high-value client meetings.' },
      { type: 'fullWidthImage', src: 'https://teamdesign.in/wp-content/uploads/2018/12/J_K-Bank-Branch-Building-Samba-J_K-State-3-1.jpg', caption: 'Branch exterior — Samba, J&K State, 2018' },
      { type: 'pullQuote', text: 'The design balances institutional credibility with accessibility — the ATM lobby designed for frictionless 24-hour use, the business centre carrying discretion required for high-value client meetings.' },
      { type: 'fullWidthImage', src: 'https://teamdesign.in/wp-content/uploads/2018/12/J_K-Bank-Branch-Building-Samba-J_K-State-4-1.jpg', caption: 'Business centre — upper floor' },
      { type: 'paragraph', text: 'The two programmes are distinct in character but unified by a consistent material language — the same approach to banking architecture that Team Design has refined across dozens of J&K Bank commissions.' },
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
    contentBlocks: [
      { type: 'paragraph', text: 'Fifteen years after the original ITM Kharghar campus was built, a 5,876 sq mt expansion — requiring simultaneous demolition, live-campus construction, and the continuation of an established architectural language.' },
      { type: 'fullWidthImage', src: 'https://teamdesign.in/wp-content/uploads/2018/12/COLLEGE-CAMPUS-EXT-1-1.jpg', caption: 'Campus facade — Kharghar, Navi Mumbai, 2014' },
      { type: 'pullQuote', text: 'The challenge was threefold: demolish part of the complex, enable the campus to operate unhindered during construction, and continue the architectural language so the whole reads as one.' },
      { type: 'halfWidthImages', images: ['https://teamdesign.in/wp-content/uploads/2018/12/COLLEGE-CAMPUS-EXT-3-1.jpg', 'https://teamdesign.in/wp-content/uploads/2018/12/COLLEGE-CAMPUS-EXT-2-1.jpg'], captions: ['Central connecting spine', 'Faculty wing entrance'] },
      { type: 'paragraph', text: 'Team Design\'s decade-long involvement with ITM — from the campus extension to the adjacent MBA Hostel Towers — represents one of the firm\'s deepest and most enduring institutional relationships.' },
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
    contentBlocks: [
      { type: 'paragraph', text: 'A guest house for NRB Bearings in Aurangabad — a building designed to house and impress senior officials from a world-class bearings manufacturer, with a gym, business centre, and a café-activated terrace garden at the podium.' },
      { type: 'fullWidthImage', src: 'https://teamdesign.in/wp-content/uploads/2018/12/NRB-Bearings-Auragabad-1-1.jpg', caption: 'Main entrance — Aurangabad, Maharashtra, 2011' },
      { type: 'pullQuote', text: 'The suite arrangement balances the hotel-like quality expected by visiting executives with the comfort and ease of serviced accommodation.' },
      { type: 'halfWidthImages', images: ['https://teamdesign.in/wp-content/uploads/2018/12/NRB-Bearings-Auragabad-2-1.jpg', 'https://teamdesign.in/wp-content/uploads/2018/12/NRB-Bearings-Auragabad-3-1.jpg'], captions: ['Executive suite interior', 'Terrace garden at podium'] },
      { type: 'paragraph', text: 'A leading café chain at ground level creates an active street presence, while the upper floors maintain the privacy and discretion required for extended corporate stays.' },
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
    contentBlocks: [
      { type: 'paragraph', text: 'A mixed-use cultural centre for the South Kanara Brahmin\'s Association in Mumbai — new temple, marriage halls, dining spaces, dance academy, and guest house, all within a single building that honours its sacred programme while serving a contemporary community.' },
      { type: 'fullWidthImage', src: 'https://teamdesign.in/wp-content/uploads/2018/12/Gokul-Cam_021-1.jpg', caption: 'Gokul Cultural Centre — Mumbai, 2017' },
      { type: 'pullQuote', text: 'The solution carefully layers the secular and sacred so that each is enhanced by proximity to the other — the hall and the temple in quiet dialogue.' },
      { type: 'paragraph', text: 'The building aligns itself to the axis of the existing temple and is designed to look both traditional and modern — a formal commitment that demanded precision in every material and proportional decision.' },
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
    contentBlocks: [
      { type: 'paragraph', text: 'A dedicated kitchen and study for a chef-client in Alibaug — designed as a "no-building" surrounded by four large trees, with glass walls that dissolve the boundary between interior and garden entirely.' },
      { type: 'fullWidthImage', src: 'https://teamdesign.in/wp-content/uploads/2018/12/Glass-Kitchen-4-1.jpg', caption: 'Glass Kitchen — Mandwa, Alibaug, 2014' },
      { type: 'pullQuote', text: 'From inside, the four trees become the walls, and the garden beyond becomes the room. The kitchen operates as much outdoors as in.' },
      { type: 'halfWidthImages', images: ['https://teamdesign.in/wp-content/uploads/2018/12/Glass-Kitchen-2-1.jpg', 'https://teamdesign.in/wp-content/uploads/2018/12/Glass-Kitchen-3-copy-1.jpg'], captions: ['Interior looking out to the garden', 'Evening — glass panels open'] },
      { type: 'paragraph', text: 'Opposite an existing swimming pool, this small structure has an outsized relationship to its site — the concept grew from the idea of a seed reaching out to its surroundings.' },
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
    contentBlocks: [
      { type: 'paragraph', text: 'A 14-acre campus in Kamptee, 20km from Nagpur — a management institute and engineering college inherited part-built, completed by Team Design with a master plan, arrival sequence, and a new front gate that makes the campus feel intentional and whole.' },
      { type: 'fullWidthImage', src: 'https://teamdesign.in/wp-content/uploads/2018/12/College-of-Engineerin-_-Management-Nagpur-1-1.jpg', caption: 'Main entrance gate — Kamptee, Nagpur, 2010' },
      { type: 'pullQuote', text: 'The challenge was to give coherence to a campus that had begun without a master plan — establishing a clear arrival sequence that makes it feel intentional and complete.' },
      { type: 'halfWidthImages', images: ['https://teamdesign.in/wp-content/uploads/2018/12/College-of-Engineerin-_-Management-Nagp-2-1.jpg', 'https://teamdesign.in/wp-content/uploads/2018/12/College-of-Engineerin-_-Management-Nagp-3-1.jpg'], captions: ['Academic wing', 'Campus courtyard'] },
      { type: 'paragraph', text: 'New wings continue the architectural language of the inherited structures while the gate-to-courtyard-to-entrance arrival sequence provides the order and legibility the campus previously lacked.' },
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
    contentBlocks: [
      { type: 'paragraph', text: 'A 4-bedroom bungalow on a 6,500 sq ft plot in Ahmedabad — architecture, interiors, and landscape developed as a single composition, with an east-facing sun terrace that captures the morning light while shielding rooms from the intense afternoon heat.' },
      { type: 'fullWidthImage', src: 'https://teamdesign.in/wp-content/uploads/2018/12/Bungalow-in-Ahmedabad-Inida-1.jpg', caption: 'East terrace elevation — Ahmedabad, Gujarat, 2014' },
      { type: 'pullQuote', text: 'The bungalow has been meticulously planned, offering a perfect symphony of elegance and privacy.' },
      { type: 'halfWidthImages', images: ['https://teamdesign.in/wp-content/uploads/2018/12/Bungalow-in-Ahmedabad-Inida-6.jpg', 'https://teamdesign.in/wp-content/uploads/2018/12/Bungalow-in-Ahmedabad-Inida-5.jpg'], captions: ['Living room interior', 'Garden landscape'] },
      { type: 'paragraph', text: 'The east terrace is the climatic logic made visible — the design\'s most distinctive external gesture, responsible simultaneously for shade, privacy, and the quality of light inside.' },
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
    contentBlocks: [
      { type: 'paragraph', text: 'Two identical 4-bedroom villas in Bhinmal, Rajasthan — drawing on the formal traditions of the region: thick walls, sheltered courtyards, and carefully positioned openings that modulate the desert climate while creating a sense of family continuity within the compound.' },
      { type: 'fullWidthImage', src: 'https://teamdesign.in/wp-content/uploads/2018/11/REVISED-CAM-3-.jpg', caption: 'Exterior elevation — Bhinmal, Rajasthan, 2013' },
      { type: 'pullQuote', text: 'The finest residential architecture is measured not by its ambition but by how naturally it becomes home to the people who live in it.' },
      { type: 'halfWidthImages', images: ['https://teamdesign.in/wp-content/uploads/2018/11/REVISED-CAM-1-.jpg', 'https://teamdesign.in/wp-content/uploads/2018/11/LAYOUT.jpg'], captions: ['Villa entrance courtyard', 'Site plan — compound layout'] },
      { type: 'paragraph', text: 'Each villa is independent in plan but shares a common architectural language — the project is a reminder that home is not a style, it is a quality of inhabitation.' },
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
    contentBlocks: [
      { type: 'paragraph', text: 'A 10,000 sq ft office building for a precision steel manufacturer on a 14-acre industrial property in Khopoli — designed to assert a civic quality appropriate to a client-facing headquarters while responding honestly to its industrial context.' },
      { type: 'fullWidthImage', src: 'https://teamdesign.in/wp-content/uploads/2018/12/PRECISION-METALS-1.jpg', caption: 'Office building — Khopoli, Maharashtra, 2009' },
      { type: 'pullQuote', text: 'Corporate architecture at the scale of an industrial estate can still be thoughtful and dignified — it need not apologise for its context, but it need not be defined by it either.' },
      { type: 'fullWidthImage', src: 'https://teamdesign.in/wp-content/uploads/2018/12/PRECISION-METALS-3-1.jpg', caption: 'Reception and entrance lobby' },
      { type: 'paragraph', text: 'A grand entrance space enables employees to work with leisure and complete peace of mind — a reminder that the quality of the working environment is itself a form of operational investment.' },
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
    contentBlocks: [
      { type: 'paragraph', text: 'A 6,500 sq ft, ground-plus-three bank branch designed to embody the women of Jammu and Kashmir — each floor given a different seasonal palette derived from the region\'s landscape, demarcated through fabrics, graphics, lattice work, and light.' },
      { type: 'fullWidthImage', src: 'https://teamdesign.in/wp-content/uploads/2018/12/Women_s-Bank-Branch-J_K-Bank-Srinagar-2-1.jpg', caption: 'Ground floor — autumn palette. Srinagar, 2018' },
      { type: 'pullQuote', text: 'Ground floor: autumn. First floor: spring. Second floor: winter. Third floor: summer. Each a different season, each a different palette, each the same bank.' },
      { type: 'halfWidthImages', images: ['https://teamdesign.in/wp-content/uploads/2018/12/Women_s-Bank-Branch-J_K-Bank-Srinagar-3-1.jpg', 'https://teamdesign.in/wp-content/uploads/2018/12/Women_s-Bank-Branch-J_K-Bank-Srinagar-4-1.jpg'], captions: ['First floor — spring palette', 'Second floor — winter palette'] },
      { type: 'paragraph', text: 'The layout allows women from all walks of life — a young mother, a senior citizen, a professional, a teenager — to conduct banking with ease and satisfaction.' },
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
    contentBlocks: [
      { type: 'paragraph', text: 'A 3BHK show flat in Mumbai — designed to inspire potential buyers while remaining believably livable. Every storage decision made visible, every awkward corner resolved, every room staged to suggest the quality of life available within a compact footprint.' },
      { type: 'fullWidthImage', src: 'https://teamdesign.in/wp-content/uploads/2018/12/DSC_5945-1.jpg', caption: 'Living and dining area — Mumbai, 2014' },
      { type: 'pullQuote', text: 'Intelligent planning makes the flat feel larger than its area suggests, while material choices ensure it presents with warmth rather than the clinical sterility that too often defines show homes.' },
      { type: 'fullWidthImage', src: 'https://teamdesign.in/wp-content/uploads/2018/12/DSC_6006-1.jpg', caption: 'Master bedroom' },
      { type: 'paragraph', text: 'The challenge is deceptively simple: design a home that looks lived-in before anyone has lived in it. The result is a flat that works hard for its size.' },
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
    contentBlocks: [
      { type: 'paragraph', text: 'Completed in 60 days from start to handover — a 6,500 sq ft office in Worli for a media entrepreneur and NGO, designed with glass walls, natural light, and Yellow Jaisalmer stone floors that set the entire register of the space.' },
      { type: 'fullWidthImage', src: 'https://teamdesign.in/wp-content/uploads/2018/12/Unilazer-Ventures-Pvt-Ltd-10-1.jpg', caption: 'Open workspace — Worli, Mumbai, 2014' },
      { type: 'pullQuote', text: 'Clean lines dress the office with a focus on functionality without compromising on storage, security and privacy.' },
      { type: 'halfWidthImages', images: ['https://teamdesign.in/wp-content/uploads/2018/12/Unilazer-Ventures-Pvt-Ltd-8-1.jpg', 'https://teamdesign.in/wp-content/uploads/2018/12/Unilazer-Ventures-Pvt-Ltd-5-1.jpg'], captions: ['Executive cabin', 'Entrance reception'] },
      { type: 'paragraph', text: 'Executive cabins in the centre, staff along the periphery. Glass walls open up the area, allowing natural light to flood the space. The delivery timescale demanded material decisions that could be made quickly and still last.' },
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
    contentBlocks: [
      { type: 'paragraph', text: 'A 70,000 sq ft National Business Centre for J&K Bank in Mumbai\'s BKC — balancing Kashmiri art and craft with the present-day contemporary look and feel expected in India\'s financial capital.' },
      { type: 'fullWidthImage', src: 'https://teamdesign.in/wp-content/uploads/2018/12/J_K-Bank-NBC-BKC-12-1.jpg', caption: 'Banking hall — Bandra Kurla Complex, Mumbai, 2013' },
      { type: 'pullQuote', text: 'The palette is deliberately restrained — walnut, stone, and polished metal — allowing the Kashmiri craft elements to bring warmth, regional identity, and the unmistakable quality of handwork.' },
      { type: 'halfWidthImages', images: ['https://teamdesign.in/wp-content/uploads/2018/12/J_K-Bank-NBC-BKC-9-1.jpg', 'https://teamdesign.in/wp-content/uploads/2018/12/J_K-Bank-NBC-BKC-23-1.jpg'], captions: ['Walnut lattice and Paper Mache detail', 'Private consultation room'] },
      { type: 'paragraph', text: 'Walnut wood lattices, Paper Mache panels, carved furniture, and bidri metal artifacts from Srinagar — at 70,000 sq ft, the project demanded a design language that could hold together from the double-height banking hall to the intimate private rooms above.' },
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
    contentBlocks: [
      { type: 'paragraph', text: 'A premium bank branch concept for J&K Bank in Shopian — designed to give high net worth individuals a lounge-like experience with an Elite reception, waiting lounge, relationship manager office, and business rooms.' },
      { type: 'fullWidthImage', src: 'https://teamdesign.in/wp-content/uploads/2018/12/High-Networth-Bank-Branch-Shopian-10-1.jpg', caption: 'Elite lounge — Shopian, J&K, 2017' },
      { type: 'pullQuote', text: 'This concept demonstrates how the bank branch can be reimagined as a place of discretion and ease, where the transaction is almost incidental to the quality of the environment.' },
      { type: 'fullWidthImage', src: 'https://teamdesign.in/wp-content/uploads/2018/12/High-Networth-Bank-Branch-Shopian-7-1.jpg', caption: 'Relationship manager suite' },
      { type: 'paragraph', text: 'Team Design is helping J&K Bank set up these premium premises across the state and beyond — making a statement about how banking can feel at its best.' },
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
    contentBlocks: [
      { type: 'paragraph', text: 'A 13,000 sq ft corporate office for HDFC Bank in Jammu — private offices, open workstations, training rooms, cafeteria, and breakout spaces, designed to balance the efficiency a bank requires with an environment that genuinely attracts and retains talent.' },
      { type: 'fullWidthImage', src: 'https://teamdesign.in/wp-content/uploads/2018/12/NSP_0096-1.jpg', caption: 'Corporate office — Narhwal, Jammu, 2015' },
      { type: 'pullQuote', text: 'A workplace warm enough to feel like a place where people choose to spend time, and disciplined enough to make that time productive.' },
      { type: 'halfWidthImages', images: ['https://teamdesign.in/wp-content/uploads/2018/12/NSP_0010-1.jpg', 'https://teamdesign.in/wp-content/uploads/2018/12/NSP_9972-1.jpg'], captions: ['Open plan workstations', 'Training and presentation room'] },
      { type: 'paragraph', text: 'Ever-changing space requirements, real estate costs, talent retention, sustainability goals — the modern corporate office must respond to all of these simultaneously, and within a budget that leaves no room for waste.' },
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
    contentBlocks: [
      { type: 'paragraph', text: 'A penthouse in Thane with 10,000 sq ft of terrace garden surrounding just 5,000 sq ft of livable space — in a city starved of green, a home that inverts the usual ratio and puts nature at its centre.' },
      { type: 'fullWidthImage', src: 'https://teamdesign.in/wp-content/uploads/2018/12/Garden-Glory-Penthouse-Indian-Family-Thane-India-5-1.jpg', caption: 'Terrace garden — Thane, Maharashtra, 2013' },
      { type: 'pullQuote', text: 'The home centres on a terrace garden, transforming the living area into an oasis of calm in a city that rarely offers one.' },
      { type: 'halfWidthImages', images: ['https://teamdesign.in/wp-content/uploads/2018/12/Garden-Glory-Penthouse-Indian-Family-Thane-India-4-1.jpg', 'https://teamdesign.in/wp-content/uploads/2018/12/Garden-Glory-Penthouse-Indian-Family-Thane-India-10-1.jpg'], captions: ['Garden terrace looking inward', 'Floor-to-ceiling glass corridor'] },
      { type: 'paragraph', text: 'A neutral interior palette serves as backdrop, with colour introduced through rugs, jaali designs, and soft furnishings. All six bedrooms open to corridors overlooking gardens and terraces.' },
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
    contentBlocks: [
      { type: 'paragraph', text: 'An executive airport lounge for J&K Bank at Srinagar Airport — designed as the traveller\'s final encounter with the Kashmir Valley, drawing on the region\'s craft traditions to create a space that feels unmistakably of its place.' },
      { type: 'fullWidthImage', src: 'https://teamdesign.in/wp-content/uploads/2018/12/AIRPORT-LOUNGE-J_K-BANK-Srinagar-3-1.jpg', caption: 'Lounge — Srinagar Airport, J&K, 2013' },
      { type: 'pullQuote', text: 'A lounge that feels unmistakably of its place: specific to Srinagar in the way that the best airport environments honour their cities rather than erasing them.' },
      { type: 'halfWidthImages', images: ['https://teamdesign.in/wp-content/uploads/2018/12/AIRPORT-LOUNGE-J_K-BANK-Srinagar-6-1.jpg', 'https://teamdesign.in/wp-content/uploads/2018/12/AIRPORT-LOUNGE-J_K-BANK-Srinagar-5-1.jpg'], captions: ['Kashmiri craft detail', 'Seating area'] },
      { type: 'paragraph', text: 'Carved wood, papier-mâché, and intricate geometric patterns of the region — translated into a contemporary hospitality setting. The brief emphasised the ultimate in pre-flight comfort for a lounge that invites you to stay awhile.' },
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
    contentBlocks: [
      { type: 'paragraph', text: 'A two-level villa in Mumbai merging contemporary and organic aesthetics — living and entertainment below, bedrooms above for privacy. Abundant windows, dark flooring, accent lines, wood-panelled walls: a home that feels simultaneously disciplined and alive.' },
      { type: 'fullWidthImage', src: 'https://teamdesign.in/wp-content/uploads/2018/12/Exclusive-Villa-Renouned-Indian-Family-Mumbai-India-2-1.jpg', caption: 'Living room — Mumbai, 2016' },
      { type: 'pullQuote', text: 'The result is a home in which the owners\' collections, personalities, and daily routines are all given room to breathe.' },
      { type: 'halfWidthImages', images: ['https://teamdesign.in/wp-content/uploads/2018/12/Exclusive-Villa-Renouned-Indian-Family-Mumbai-India-1-1.jpg', 'https://teamdesign.in/wp-content/uploads/2018/12/Exclusive-Villa-Renouned-Indian-Family-Mumbai-India-6-1.jpg'], captions: ['Entertainment level', 'Upper bedroom floor'] },
      { type: 'paragraph', text: 'What happens when an unstoppable force meets an immovable object? Symbiosis. The design answers the question by making nature and human habitation not adversaries but complements.' },
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
    contentBlocks: [
      { type: 'paragraph', text: 'An E-Lobby concept for J&K Bank at Lal Chowk, Srinagar — state-of-the-art and confidently modern, while inheriting the corporate brand and the cultural heritage of the region in equal measure.' },
      { type: 'fullWidthImage', src: 'https://teamdesign.in/wp-content/uploads/2018/12/Electronic-Bank-Lobby-J_K-Bank-Srinagar-1-1.jpg', caption: 'E-Lobby concept — Lal Chowk, Srinagar, 2018' },
      { type: 'pullQuote', text: 'Soft forms that reflect the gentleness of the people, whites that depict the magic of snow, digital lines on the floor that signify today\'s tech era.' },
      { type: 'fullWidthImage', src: 'https://teamdesign.in/wp-content/uploads/2018/12/Electronic-Bank-Lobby-J_K-Bank-Srinagar-4-1.jpg', caption: 'Digital floor graphics and service counter' },
      { type: 'paragraph', text: 'A much-talked-about design waiting to be built — demonstrating how banking infrastructure can become a cultural landmark rather than a generic utility.' },
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
    contentBlocks: [
      {
        type: 'paragraph',
        text: 'A private residence for one of Mumbai\'s most prominent industrialists, designed at the full scale of South Mumbai living. The brief was deceptively simple: create a home that belongs to its owner without feeling designed — where every object earns its place.',
      },
      {
        type: 'fullWidthImage',
        src: 'https://teamdesign.in/wp-content/uploads/2018/01/Kishore-Mariwala-5.jpg',
        caption: 'Living room — Kemps Corner, Mumbai',
      },
      {
        type: 'pullQuote',
        text: 'Every colour, every picture, every piece of furniture and fabric was specifically chosen to make the home unique to its owner.',
      },
      {
        type: 'halfWidthImages',
        images: [
          'https://teamdesign.in/wp-content/uploads/2018/01/Kishore-Mariwala-7.jpg',
          'https://teamdesign.in/wp-content/uploads/2018/01/Kishore-Mariwala-8.jpg',
        ],
        captions: ['Private study', 'Master bedroom'],
      },
      {
        type: 'paragraph',
        text: 'The project represents over two decades of a working relationship between the firm and the Mariwala family. Its completion — on time, on budget, and to the satisfaction of an exceptionally discerning client — remains one of Team Design\'s most personally meaningful commissions.',
      },
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
    contentBlocks: [
      { type: 'paragraph', text: 'A home in Vashi, Navi Mumbai, filled with contemporary warmth — earth tones, layered textures from smoothly polished to rough and weathered, designed for a hotelier whose professional life is spent evaluating the quality of hospitality environments.' },
      { type: 'fullWidthImage', src: 'https://teamdesign.in/wp-content/uploads/2018/12/Serrao-Home-3-1.jpg', caption: 'Living room — Vashi, Navi Mumbai, 2012' },
      { type: 'pullQuote', text: 'A palette of earth tones combined with a variety of textures — from smoothly polished to rough and weathered — that together create a sophisticated and warm feel.' },
      { type: 'halfWidthImages', images: ['https://teamdesign.in/wp-content/uploads/2018/12/Serrao-Home-6-1.jpg', 'https://teamdesign.in/wp-content/uploads/2018/12/Serrao-Home-8-1.jpg'], captions: ['Family room', 'Master bedroom'] },
      { type: 'paragraph', text: 'The interiors avoid the extremes of cool minimalism or heavy traditionalism, finding instead a register that feels effortlessly lived-in from the moment the family moves in.' },
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
    contentBlocks: [
      { type: 'paragraph', text: 'A modern cineplex on the top floor of a new shopping complex in Vadodara — 20,000 sq ft designed to establish a destination identity distinct from the retail below, with bold colour, clear circulation, and an arrival sequence that is itself part of the experience.' },
      { type: 'fullWidthImage', src: 'https://teamdesign.in/wp-content/uploads/2018/12/Cinemarc-Cinema-Theatre-2-1.jpg', caption: 'Cineplex entrance — Vadodara, Gujarat, 2015' },
      { type: 'pullQuote', text: 'The arrival sequence, from ground-floor entrance to upper-floor auditorium, is as much a part of the experience as the auditorium itself.' },
      { type: 'fullWidthImage', src: 'https://teamdesign.in/wp-content/uploads/2018/12/Cinemarc-Cinema-Theatre-5-1.jpg', caption: 'Auditorium interior' },
      { type: 'paragraph', text: 'Bold use of colour, clear circulation, all services carefully thought through and designed to suit the needs of the end user — fast-paced brief, delivered with clarity.' },
    ],
  },

  // ─── 2026 PROJECTS ─────────────────────────────────────────────────────────

  'qudrati-greens-indore': {
    title: 'Qudrati Greens',
    client: 'Bakir Qudrati',
    type: 'Commercial',
    location: 'Indore, Madhya Pradesh',
    year: 2026,
    area: '40,000 sq ft',
    description: `A mixed-use residential and commercial building in Indore for Bakir Qudrati, director of Bombay Machine Tools Private Limited. The programme brings together residential and commercial functions within a single built form, addressing the density and scale of a rapidly growing city.

The design seeks a civic presence appropriate to its corner site — a building that reads as both welcoming and purposeful, offering the neighbourhood a new kind of ground-level engagement while providing its residents with calm above.`,
    mainImage: '/projects/qudrati-greens-indore/1.png',
    gallery: [
      '/projects/qudrati-greens-indore/2.png',
      '/projects/qudrati-greens-indore/3.png',
    ],
    testimonial: null,
    related: [],
    contentBlocks: [
      { type: 'paragraph', text: 'A mixed-use residential and commercial building in Indore — 40,000 sq ft designed to balance civic presence with practical utility.' },
      { type: 'fullWidthImage', src: '/projects/qudrati-greens-indore/2.png', caption: 'Qudrati Greens — Indore, Madhya Pradesh, 2026' },
      { type: 'pullQuote', text: 'A building that reads as both welcoming and purposeful, offering the neighbourhood a new kind of ground-level engagement.' },
      { type: 'fullWidthImage', src: '/projects/qudrati-greens-indore/3.png' },
    ],
  },

  'nikhil-gupta-bungalow': {
    title: "Nikhil Gupta's Bungalow",
    client: 'Nikhil Gupta',
    type: 'Residential',
    location: 'Awas, Alibaug',
    year: 2026,
    area: '15,000 sq ft',
    description: `A private bungalow in Alibaug for a client who travels widely and lives deliberately. At 15,000 sq ft the brief was generous but undemanding — the client asked only for spaces that settle into the landscape without demanding attention.

The design reflects an ease of occupation. Rooms open to the outside in multiple directions, light moves through the day, and the distinction between inside and outside is consistently softened. A home that holds its occupant lightly.`,
    mainImage: '/projects/nikhil-gupta-bungalow/2.jpg',
    gallery: [
      '/projects/nikhil-gupta-bungalow/1.jpg',
      '/projects/nikhil-gupta-bungalow/3.jpg',
      '/projects/nikhil-gupta-bungalow/4.jpg',
      '/projects/nikhil-gupta-bungalow/5.jpg',
      '/projects/nikhil-gupta-bungalow/6.png',
      '/projects/nikhil-gupta-bungalow/7.png',
      '/projects/nikhil-gupta-bungalow/8.png',
    ],
    testimonial: null,
    related: [],
    contentBlocks: [
      { type: 'paragraph', text: 'A 15,000 sq ft private residence in Alibaug — designed for a client who travels widely and asked only for spaces that feel easy to inhabit.' },
      { type: 'fullWidthImage', src: '/projects/nikhil-gupta-bungalow/2.jpg', caption: 'Awas, Alibaug, 2026' },
      { type: 'halfWidthImages', images: ['/projects/nikhil-gupta-bungalow/6.png', '/projects/nikhil-gupta-bungalow/7.png'], captions: ['Dining area', 'Entrance porch'] },
      { type: 'pullQuote', text: 'Rooms open to the outside in multiple directions. The distinction between inside and outside is consistently softened.' },
      { type: 'halfWidthImages', images: ['/projects/nikhil-gupta-bungalow/3.jpg', '/projects/nikhil-gupta-bungalow/8.png'], captions: ['Living spaces', 'Living room'] },
      { type: 'fullWidthImage', src: '/projects/nikhil-gupta-bungalow/4.jpg' },
      { type: 'halfWidthImages', images: ['/projects/nikhil-gupta-bungalow/1.jpg', '/projects/nikhil-gupta-bungalow/5.jpg'], captions: ['Under construction — Awas, Alibaug', 'Structure nearing completion'] },
    ],
  },

  'jhaveri-zaveri-residence': {
    title: 'Jhaveri Zaveri Residence',
    client: 'Rupen Jhaveri & Binaisha Zaveri',
    type: 'Interiors',
    location: 'Mumbai',
    year: 2019,
    area: '2,500 sq ft',
    description: `A residence in Mumbai designed for Rupen Jhaveri, Group President at Piramal Finance Limited, and Binaisha Zaveri, Director at Tribhovandas Bhimji Zaveri. The 2,500 sq ft apartment balances the demands of a working couple's life with quiet moments of domesticity.

Considered material choices, controlled light, and spaces that shift in character through the day. The interior language is warm but precise — nothing is incidental.`,
    mainImage: '/projects/jhaveri-zaveri-residence/1.jpg',
    gallery: [
      '/projects/jhaveri-zaveri-residence/2.jpg',
      '/projects/jhaveri-zaveri-residence/3.jpg',
      '/projects/jhaveri-zaveri-residence/4.jpg',
    ],
    testimonial: null,
    related: [],
    contentBlocks: [
      { type: 'paragraph', text: 'A 2,500 sq ft Mumbai residence for two professionally active clients — designed to balance the energy of working life with spaces of genuine domestic calm.' },
      { type: 'fullWidthImage', src: '/projects/jhaveri-zaveri-residence/2.jpg', caption: 'Jhaveri Zaveri Residence — Mumbai, 2019' },
      { type: 'pullQuote', text: 'Considered material choices, controlled light, and spaces that shift in character through the day. Nothing is incidental.' },
      { type: 'halfWidthImages', images: ['/projects/jhaveri-zaveri-residence/3.jpg', '/projects/jhaveri-zaveri-residence/4.jpg'] },
    ],
  },

  'mohan-shenoi-residence': {
    title: 'Mohan Shenoi Residence',
    client: 'Mohan Shenoi',
    type: 'Interiors',
    location: 'Mumbai',
    year: 2022,
    area: '5,000 sq ft',
    description: `A 5,000 sq ft residence in Mumbai for Mohan Shenoi, formerly Director at Kotak Mahindra Prime and Head of Retail Segment at ICICI Bank. The brief called for spaces of quiet authority — rooms that work as well for large family gatherings as for solitary evenings.

The material palette is warm and restrained. Proportions are generous without being excessive. The apartment reads as the home of someone who has earned their comfort and wears it without display.`,
    mainImage: '/projects/mohan-shenoi-residence/1.jpg',
    gallery: [
      '/projects/mohan-shenoi-residence/2.jpg',
      '/projects/mohan-shenoi-residence/3.jpg',
      '/projects/mohan-shenoi-residence/4.jpg',
      '/projects/mohan-shenoi-residence/5.jpg',
      '/projects/mohan-shenoi-residence/6.jpg',
      '/projects/mohan-shenoi-residence/7.jpg',
    ],
    testimonial: null,
    related: [],
    contentBlocks: [
      { type: 'paragraph', text: 'A 5,000 sq ft residence in Mumbai — spaces of quiet authority that work as well for large family gatherings as for solitary evenings.' },
      { type: 'fullWidthImage', src: '/projects/mohan-shenoi-residence/6.jpg', caption: 'Mohan Shenoi Residence — Mumbai, 2022' },
      { type: 'pullQuote', text: 'The apartment reads as the home of someone who has earned their comfort and wears it without display.' },
      { type: 'halfWidthImages', images: ['/projects/mohan-shenoi-residence/2.jpg', '/projects/mohan-shenoi-residence/3.jpg'] },
      { type: 'fullWidthImage', src: '/projects/mohan-shenoi-residence/7.jpg' },
      { type: 'halfWidthImages', images: ['/projects/mohan-shenoi-residence/4.jpg', '/projects/mohan-shenoi-residence/5.jpg'] },
    ],
  },

  'rahul-sanjana-residence': {
    title: 'Rahul & Sanjana Residence',
    client: 'Rahul & Sanjana Shenoi',
    type: 'Interiors',
    location: 'Mumbai',
    year: 2017,
    area: '2,500 sq ft',
    description: `A 2,500 sq ft Mumbai residence designed for Rahul Shenoi, Director at EY specialising in Risk Analytics and Digital Transformation, and Sanjana Shenoi. The programme navigates the overlap of home and work life that defines their schedule.

Spaces that read as relaxed but are precisely considered in their arrangement. The interior holds two different modes of living — the focused and the unwound — without forcing a choice between them.`,
    mainImage: '/projects/rahul-sanjana-residence/1.jpg',
    gallery: [
      '/projects/rahul-sanjana-residence/2.jpg',
      '/projects/rahul-sanjana-residence/3.jpg',
      '/projects/rahul-sanjana-residence/4.jpg',
    ],
    testimonial: null,
    related: [],
    contentBlocks: [
      { type: 'paragraph', text: 'A 2,500 sq ft Mumbai residence that navigates the overlap of home and work life without forcing a choice between the two.' },
      { type: 'fullWidthImage', src: '/projects/rahul-sanjana-residence/2.jpg', caption: 'Rahul & Sanjana Residence — Mumbai, 2017' },
      { type: 'pullQuote', text: 'Spaces that read as relaxed but are precisely considered in their arrangement.' },
      { type: 'halfWidthImages', images: ['/projects/rahul-sanjana-residence/3.jpg', '/projects/rahul-sanjana-residence/4.jpg'] },
    ],
  },

  'usha-shenoi-residence': {
    title: 'Usha Shenoi Residence',
    client: 'Usha Shenoi',
    type: 'Interiors',
    location: 'Mumbai',
    year: 2016,
    area: '2,500 sq ft',
    description: `A residence in Mumbai for Usha Shenoi — teacher, humanitarian, and social worker. The design reflects her character directly: warm, unpretentious, filled with light.

At 2,500 sq ft the apartment is not large, but it holds people easily. Spaces open generously, materials are honest, and nothing asks for more attention than it deserves. A home shaped entirely by who lives in it.`,
    mainImage: '/projects/usha-shenoi-residence/1.jpg',
    gallery: [
      '/projects/usha-shenoi-residence/2.jpg',
      '/projects/usha-shenoi-residence/3.jpg',
    ],
    testimonial: null,
    related: [],
    contentBlocks: [
      { type: 'paragraph', text: 'A 2,500 sq ft Mumbai residence for a teacher and social worker — warm, unpretentious, and filled with light.' },
      { type: 'fullWidthImage', src: '/projects/usha-shenoi-residence/2.jpg', caption: 'Usha Shenoi Residence — Mumbai, 2016' },
      { type: 'pullQuote', text: 'A home shaped entirely by who lives in it.' },
      { type: 'fullWidthImage', src: '/projects/usha-shenoi-residence/3.jpg' },
    ],
  },
};

export const FALLBACK: Project = {
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
