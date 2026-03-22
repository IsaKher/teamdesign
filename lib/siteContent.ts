import type { Testimonial } from '@/components/TestimonialSlider';

// ─── Studio constants ────────────────────────────────────────────────────────
export const STUDIO = {
  phone: '+91 98765 43210',
  whatsappNumber: '919876543210',
  email: 'studio@teamdesign.in',
  address: {
    area: 'Kopar Khairane',
    city: 'Navi Mumbai, Maharashtra',
    country: 'India',
  },
  founded: 1999,
  site: 'https://teamdesign.in',
} as const;

// ─── Homepage data ───────────────────────────────────────────────────────────
export const STATS = [
  { value: '25+', label: 'Years in Practice' },
  { value: '300+', label: 'Projects Completed' },
  { value: '500+', label: 'Clients Served' },
  { value: '20L+ sq ft', label: 'Built Space' },
];

export const FEATURED_PROJECTS = [
  {
    slug: 'kishore-mariwala-home-mumbai',
    title: 'Contemporary Modern Home',
    client: 'Kishore Mariwala',
    type: 'Residential',
    location: 'Kemps Corner, Mumbai',
    image: 'https://teamdesign.in/wp-content/uploads/2018/01/Kishore-Mariwala-1.jpg',
  },
  {
    slug: 'unilazer-ventures-office',
    title: 'Office for Unilazer Ventures',
    client: 'Ronnie Screwvala',
    type: 'Commercial',
    location: 'Worli, Mumbai',
    image: 'https://teamdesign.in/wp-content/uploads/2018/12/Unilazer-Ventures-Pvt-Ltd-3-1.jpg',
  },
  {
    slug: 'jk-bank-nbc-bkc',
    title: 'National Business Centre',
    client: 'J&K Bank',
    type: 'Commercial',
    location: 'BKC, Mumbai',
    image: 'https://teamdesign.in/wp-content/uploads/2018/12/J_K-Bank-NBC-BKC-20-1.jpg',
  },
  {
    slug: 'college-campus-extension-itm',
    title: 'College Campus Extension',
    client: 'ITM Group',
    type: 'Institutional',
    location: 'Navi Mumbai',
    image: 'https://teamdesign.in/wp-content/uploads/2018/12/COLLEGE-CAMPUS-EXT-4.jpg',
  },
];

export const SELECTED_CLIENTS = [
  { name: 'Kishore Mariwala', description: 'Founder, Marico', project: 'Mont Blanc Residence, Mumbai' },
  { name: 'Ronnie Screwvala', description: 'Founder, UTV / UpGrad', project: 'Unilazer Ventures Office, Mumbai' },
  { name: 'J&K Bank', description: 'National Commercial Bank', project: 'Business Centre, BKC Mumbai' },
  { name: 'ITM Group', description: 'Educational Institution', project: 'College Extension & MBA Hostel, Navi Mumbai' },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: 'Team Design managed the entire project lifecycle — from concept and design to contractor management, budget adherence, and on-time delivery. The result exceeded every expectation.',
    name: 'Kishore Mariwala',
    title: 'Founder, Marico',
    project: 'Mont Blanc Residence, Mumbai',
  },
  {
    quote: "What struck us most was how the design translated our company's character into architecture. The Unilazer office doesn't just look good — it shapes how our teams think and collaborate every day.",
    name: 'Ronnie Screwvala',
    title: 'Founder, UTV / UpGrad',
    project: 'Unilazer Ventures Office, Mumbai',
  },
  {
    quote: 'The Business Centre sets a new standard for banking architecture in India. Team Design delivered a building that is both operationally rigorous and genuinely inspiring to work in.',
    name: 'J&K Bank',
    title: 'National Commercial Bank',
    project: 'National Business Centre, BKC Mumbai',
  },
  {
    quote: 'From the initial brief to handover, Team Design demonstrated exceptional professionalism at every stage. The ITM expansion has elevated the campus experience for thousands of students.',
    name: 'ITM Group',
    title: 'Educational Institution',
    project: 'College Extension & MBA Hostel, Navi Mumbai',
  },
];

export const PRESS_ITEMS = [
  {
    pub: 'Architects & Interiors India',
    title: "Zainab Kher recognised as one of India's top 50 architects under 35",
    year: '2016',
  },
  {
    pub: 'iGEN Design Forum',
    title: '5th iGEN Design Forum — honouring 50 young and dynamic design practitioners',
    year: '2016',
  },
  {
    pub: 'DuPont India & Corian®',
    title: 'Women Leadership in Architecture & Design — discussing leadership roles of women in India',
    year: '2015',
  },
];

// ─── Studio page data ────────────────────────────────────────────────────────
export const CORE_VALUES = [
  {
    num: '01',
    title: 'Dependable Professionalism',
    desc: 'A beautiful project is delivered through good service, detailed drawings and specifications with excellent project management. We pride ourselves on offering clients certainty and confidence in keeping projects on time and on budget.',
  },
  {
    num: '02',
    title: 'Reliable Team Depth',
    desc: 'Team members communicate well and are motivated by architectural innovation. The depth of our team means no project outgrows our capacity — and every client has access to the full knowledge of the practice.',
  },
  {
    num: '03',
    title: 'Strong Domain Knowledge',
    desc: 'We lead by design, combining global research with local action. Our experience across residential, commercial, institutional, and interior projects means we bring informed precedent to every new brief.',
  },
  {
    num: '04',
    title: 'Freshness of Concepts',
    desc: 'We deliver bespoke, global-standard buildings and interiors — no two being the same. There is no predetermined style or model. We take a fresh approach with every project, our work evolving organically without preconceived constraints.',
  },
  {
    num: '05',
    title: 'Energetic Competence',
    desc: 'Projects manifest macro-to-micro attention at every level. The delivery stage is a central element in ensuring design integrity is maintained and provides a smooth, efficient progression through all stages.',
  },
  {
    num: '06',
    title: 'Wisdom of Experience',
    desc: 'If a building can feel like it naturally belongs — fitting logically in a place, an environment, a time and culture — then the people who inhabit it will likely feel a sense of belonging there as well. This methodology connects theories of beauty, confidence, economy, and comfort.',
  },
];

export const DESIGN_IDEALS = [
  {
    title: 'Approach Over Aesthetic',
    desc: 'There is no predetermined style or model — we take a fresh approach with every project. We recognise each issue as unique and adapt to multiple sectors and applications.',
  },
  {
    title: 'Honest & Authentic',
    desc: 'Every element is part of an integrated whole and contributes to the bigger picture. Our approach suits the local climate, landscape, and culture — authentic material, authentic process.',
  },
  {
    title: 'Balance & Dialogue',
    desc: 'Space versus form. Object versus place. All brief and site parameters are addressed — we aim for the best solution, ticking every box without compromising the design integrity of the whole.',
  },
  {
    title: 'The Idea Behind the Design',
    desc: '"The Egg" — the idea behind every solution provides order and strength beyond merely responding to the brief. Good architecture has a reason that can be articulated, even when it is felt before it is understood.',
  },
  {
    title: 'Holistic Thinking',
    desc: 'A culture of continuous improvement fosters innovation and excellence. We take a fresh approach to every project — our work evolves organically without the constraints of preconceived ideas or prescribed formulas.',
  },
  {
    title: 'Belonging',
    desc: 'If a building feels like it naturally belongs in its environment, a time and culture — then the people who inhabit it will feel a sense of belonging there as well. This belief underpins everything we design.',
  },
];

export const SERVICES = [
  {
    title: 'Architectural Design',
    body: 'Space and light design with contextual sensitivity',
    year: 'Full Service',
    type: 'Architecture',
  },
  {
    title: 'Interior Design',
    body: 'Residential, commercial, retail, hospitality and religious spaces',
    year: 'Full Service',
    type: 'Interiors',
  },
  {
    title: 'Sustainable Design',
    body: 'Solar power, rainwater harvesting, eco-friendly materials, IGBC/GRIHA support',
    year: 'Integrated',
    type: 'Sustainability',
  },
  {
    title: 'Design Guidelines',
    body: 'Corporate identity systems for ICICI Bank, J&K Bank, Tata Capital, Kotak Mahindra Bank',
    year: 'Consulting',
    type: 'Brand & Standards',
  },
];
