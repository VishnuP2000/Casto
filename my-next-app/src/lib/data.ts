import {
  CastingOpportunity,
  Artist,
  Testimonial,
  FAQItem,
  Feature,
  Stat,
  Company,
} from './types';

// ─── Casting Opportunities ─────────────────────────────────────────────────────

export const castingOpportunities: CastingOpportunity[] = [
  {
    id: '1',
    movieName: 'Echoes of Tomorrow',
    productionHouse: 'Red Chillies Entertainment',
    roleName: 'Lead Actor – Arjun',
    category: 'Movie',
    genderRequired: 'Male',
    ageRange: { min: 25, max: 35 },
    languages: ['Hindi', 'English'],
    experience: '3-5 Years',
    shootingLocation: 'Mumbai, Maharashtra',
    vacancies: 1,
    salary: { min: 200000, max: 500000, currency: 'INR' },
    auditionMode: 'Online',
    applicationDeadline: '2026-08-15',
    postedDate: '2026-07-01',
    shortDescription:
      'Seeking a charismatic lead actor for a psychological thriller. The character Arjun is a conflicted detective uncovering dark truths. Must have strong emotional range and screen presence.',
    tags: ['Thriller', 'Lead Role', 'OTT', 'Action'],
    verified: true,
    posterUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&q=80',
  },
  {
    id: '2',
    movieName: 'Neon Nights',
    productionHouse: 'Netflix India',
    roleName: 'Supporting Actress – Priya',
    category: 'Web Series',
    genderRequired: 'Female',
    ageRange: { min: 22, max: 30 },
    languages: ['Hindi', 'Tamil'],
    experience: '1-2 Years',
    shootingLocation: 'Chennai, Tamil Nadu',
    vacancies: 2,
    salary: { min: 80000, max: 150000, currency: 'INR' },
    auditionMode: 'Both',
    applicationDeadline: '2026-07-28',
    postedDate: '2026-07-03',
    shortDescription:
      'Looking for a fresh face to portray a tech entrepreneur in a cyberpunk neo-noir series. Fluency in both Hindi and Tamil is essential.',
    tags: ['Cyberpunk', 'OTT', 'Drama', 'Bilingual'],
    verified: true,
    posterUrl: 'https://images.unsplash.com/photo-1616530940355-351fabd9524b?w=400&q=80',
  },
  {
    id: '3',
    movieName: 'Rang De Dil',
    productionHouse: 'Dharma Productions',
    roleName: 'Male Lead – Vikram',
    category: 'Movie',
    genderRequired: 'Male',
    ageRange: { min: 28, max: 40 },
    languages: ['Hindi'],
    experience: '5+ Years',
    shootingLocation: 'Delhi, Rajasthan',
    vacancies: 1,
    salary: { min: 1000000, max: 3000000, currency: 'INR' },
    auditionMode: 'Offline',
    applicationDeadline: '2026-08-01',
    postedDate: '2026-06-28',
    shortDescription:
      'Epic romantic drama set in pre-Independence India. Requires horseback riding skills and period-accurate dialect coaching. High-budget Bollywood production.',
    tags: ['Period Drama', 'Romance', 'Bollywood', 'Featured'],
    verified: true,
    posterUrl: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&q=80',
  },
  {
    id: '4',
    movieName: 'Glitch',
    productionHouse: 'Amazon Prime Originals',
    roleName: 'Hacker Protagonist – Zero',
    category: 'Web Series',
    genderRequired: 'Any',
    ageRange: { min: 18, max: 28 },
    languages: ['English', 'Hindi'],
    experience: 'Fresher',
    shootingLocation: 'Bengaluru, Karnataka',
    vacancies: 1,
    salary: { min: 50000, max: 100000, currency: 'INR' },
    auditionMode: 'Online',
    applicationDeadline: '2026-07-20',
    postedDate: '2026-07-05',
    shortDescription:
      'Gen-Z cybercrime thriller. Looking for an unconventional, edgy performer who can portray a young hacker. No prior experience required – raw talent preferred.',
    tags: ['Youth', 'Thriller', 'OTT', 'Fresher-Friendly'],
    verified: true,
    posterUrl: 'https://images.unsplash.com/photo-1626908013351-800ddd734b8a?w=400&q=80',
  },
  {
    id: '5',
    movieName: 'Beyond the Lens',
    productionHouse: 'Vivo India',
    roleName: 'Brand Ambassador',
    category: 'Advertisement',
    genderRequired: 'Female',
    ageRange: { min: 20, max: 32 },
    languages: ['Hindi', 'English', 'Telugu'],
    experience: '1-2 Years',
    shootingLocation: 'Hyderabad, Telangana',
    vacancies: 3,
    salary: { min: 300000, max: 600000, currency: 'INR' },
    auditionMode: 'Online',
    applicationDeadline: '2026-07-25',
    postedDate: '2026-07-04',
    shortDescription:
      'Pan-India smartphone campaign. Seeking confident, photogenic performers for a multi-market advertisement. Proficiency in at least 2 listed languages required.',
    tags: ['Commercial', 'Brand', 'Trilingual', 'Modelling'],
    verified: true,
    posterUrl: 'https://images.unsplash.com/photo-1524253482453-3fed8d2fe12b?w=400&q=80',
  },
  {
    id: '6',
    movieName: 'Mitti di Khushboo',
    productionHouse: 'Zee Studios',
    roleName: 'Village Girl – Manpreet',
    category: 'Movie',
    genderRequired: 'Female',
    ageRange: { min: 18, max: 26 },
    languages: ['Punjabi', 'Hindi'],
    experience: 'Any',
    shootingLocation: 'Amritsar, Punjab',
    vacancies: 1,
    salary: { min: 150000, max: 350000, currency: 'INR' },
    auditionMode: 'Offline',
    applicationDeadline: '2026-08-10',
    postedDate: '2026-07-02',
    shortDescription:
      'Heart-warming rural drama about a young girl chasing her artistic dreams in Punjab. Must speak authentic Punjabi dialect and have folk dance or music background.',
    tags: ['Drama', 'Punjabi', 'Rural', 'Folk'],
    verified: false,
    posterUrl: 'https://images.unsplash.com/photo-1533563906091-fdfdffc3e3c4?w=400&q=80',
  },
  {
    id: '7',
    movieName: 'Soundwave',
    productionHouse: 'T-Series Films',
    roleName: 'Lead Singer Character',
    category: 'Music Video',
    genderRequired: 'Male',
    ageRange: { min: 18, max: 35 },
    languages: ['Hindi', 'English'],
    experience: 'Any',
    shootingLocation: 'Mumbai, Maharashtra',
    vacancies: 2,
    salary: { min: 25000, max: 75000, currency: 'INR' },
    auditionMode: 'Both',
    applicationDeadline: '2026-07-18',
    postedDate: '2026-07-06',
    shortDescription:
      'High-energy music video for a chart-topping fusion track. Looking for performers with strong stage presence and dance abilities. Lip-sync experience preferred.',
    tags: ['Music', 'Dance', 'Performance', 'High Energy'],
    verified: true,
    posterUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80',
  },
  {
    id: '8',
    movieName: 'The Last Curtain',
    productionHouse: 'Prithvi Theatre Society',
    roleName: 'Ensemble Cast Member',
    category: 'Theatre',
    genderRequired: 'Any',
    ageRange: { min: 20, max: 45 },
    languages: ['English', 'Marathi'],
    experience: '1-2 Years',
    shootingLocation: 'Mumbai, Maharashtra',
    vacancies: 6,
    salary: { min: 15000, max: 40000, currency: 'INR' },
    auditionMode: 'Offline',
    applicationDeadline: '2026-07-30',
    postedDate: '2026-07-05',
    shortDescription:
      'An intense 3-act play exploring generational trauma. Stage experience mandatory. Rehearsals start August 2026 for a 10-night run. Method acting background a plus.',
    tags: ['Theatre', 'Stage', 'Method Acting', 'Drama'],
    verified: false,
    posterUrl: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=400&q=80',
  },
];

// ─── Featured Artists ──────────────────────────────────────────────────────────

export const featuredArtists: Artist[] = [
  {
    id: '1',
    name: 'Aanya Sharma',
    category: 'Film Actress',
    location: 'Mumbai, MH',
    profilePhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80',
    bio: 'Award-winning actress with 8 years of experience in Bollywood and OTT productions.',
    skills: ['Drama', 'Action', 'Dance', 'Voice Acting'],
    experience: '5+ Years',
    languages: ['Hindi', 'English', 'Marathi'],
    rating: 4.9,
    projectsCount: 24,
    followersCount: 128000,
    verified: true,
    socialLinks: { instagram: '#', imdb: '#' },
  },
  {
    id: '2',
    name: 'Rohan Verma',
    category: 'Theatre & Film Actor',
    location: 'Delhi, DL',
    profilePhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80',
    bio: 'Stage veteran turned screen sensation. Known for intense character portrayals and method approach.',
    skills: ['Method Acting', 'Stage Combat', 'Dialect', 'Improvisation'],
    experience: '5+ Years',
    languages: ['Hindi', 'English', 'Punjabi'],
    rating: 4.8,
    projectsCount: 18,
    followersCount: 85000,
    verified: true,
    socialLinks: { instagram: '#', youtube: '#' },
  },
  {
    id: '3',
    name: 'Priya Nair',
    category: 'Model & Actress',
    location: 'Chennai, TN',
    profilePhoto: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&q=80',
    bio: 'South Indian cinema star making waves in pan-India productions. Accomplished Bharatanatyam dancer.',
    skills: ['Bharatanatyam', 'Comedy', 'Drama', 'Modelling'],
    experience: '3-5 Years',
    languages: ['Tamil', 'Malayalam', 'Telugu', 'Hindi'],
    rating: 4.7,
    projectsCount: 31,
    followersCount: 215000,
    verified: true,
    socialLinks: { instagram: '#', imdb: '#' },
  },
  {
    id: '4',
    name: 'Kabir Mehta',
    category: 'Commercial Actor',
    location: 'Bengaluru, KA',
    profilePhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80',
    bio: 'Energetic performer specializing in ad films and short-format content. 150+ brand campaigns.',
    skills: ['Improvisation', 'Physical Comedy', 'Voiceover', 'Sports'],
    experience: '3-5 Years',
    languages: ['English', 'Hindi', 'Kannada'],
    rating: 4.6,
    projectsCount: 52,
    followersCount: 62000,
    verified: true,
    socialLinks: { youtube: '#', instagram: '#' },
  },
];

// ─── Testimonials ─────────────────────────────────────────────────────────────

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Meera Krishnamurthy',
    role: 'Film Actress',
    company: 'Freelance',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
    quote:
      'Casto completely changed my career trajectory. Within two weeks of creating my profile, I landed a supporting role in a Netflix original. The platform connects you with real opportunities, not dead ends.',
    rating: 5,
    userType: 'Artist',
  },
  {
    id: '2',
    name: 'Siddharth Khanna',
    role: 'Casting Director',
    company: 'Dharma Productions',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
    quote:
      'We cast 90% of our last three productions through Casto. The filter system is exceptional — I can find exactly the type of talent I need within minutes. It has saved us countless hours of audition management.',
    rating: 5,
    userType: 'Recruiter',
  },
  {
    id: '3',
    name: 'Ananya Patel',
    role: 'Commercial Model',
    company: 'Elite Model Management',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&q=80',
    quote:
      'The portfolio builder is stunning. My profile page looks more professional than my old agency website. Brands notice the quality presentation and it has directly led to premium brand deals.',
    rating: 5,
    userType: 'Artist',
  },
  {
    id: '4',
    name: 'Vikram Rajan',
    role: 'Production Head',
    company: 'Amazon Prime Video India',
    avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200&q=80',
    quote:
      'Casto is the LinkedIn of the entertainment industry. The verified profiles give us confidence, and the application tracking dashboard keeps our team organized during massive casting calls.',
    rating: 5,
    userType: 'Recruiter',
  },
  {
    id: '5',
    name: 'Zara Ahmed',
    role: 'Theatre Actress',
    company: 'National School of Drama',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80',
    quote:
      'As a theatre artist transitioning to screen, Casto helped me showcase my stage work beautifully and connect with directors who appreciate classical training. Found my first film role here!',
    rating: 4,
    userType: 'Artist',
  },
  {
    id: '6',
    name: 'Rajesh Singhania',
    role: 'Chief Creative Officer',
    company: 'Grey Worldwide India',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80',
    quote:
      "Our ad campaigns used to take 3 weeks to cast. With Casto, we're done in 4 days. The talent pool is deep, diverse, and the performers understand commercial briefs exceptionally well.",
    rating: 5,
    userType: 'Recruiter',
  },
];

// ─── FAQ ──────────────────────────────────────────────────────────────────────

export const faqs: FAQItem[] = [
  {
    id: '1',
    question: 'How do I create a profile as an artist?',
    answer:
      'Sign up with your email, choose "Artist" account type, and complete your profile with photos, videos, skills, and experience. Profiles go live within 24 hours after our team reviews them for quality.',
    category: 'Artists',
  },
  {
    id: '2',
    question: 'Is Casto free for artists?',
    answer:
      'Yes! Artists can create profiles, upload portfolios, and apply for casting calls entirely for free. We offer optional premium plans with advanced analytics, priority visibility, and direct messaging credits.',
    category: 'Artists',
  },
  {
    id: '3',
    question: 'How do I post a casting call?',
    answer:
      'Register as a Recruiter or Production House, complete verification, and click "Post Casting Call" from your dashboard. Fill in all requirements and the listing goes live after our moderation review.',
    category: 'Recruiters',
  },
  {
    id: '4',
    question: 'How does artist verification work?',
    answer:
      'Artists submit a government ID and optionally their past work credentials. Our team manually reviews and grants the blue verified badge. This process typically takes 24–48 hours.',
    category: 'Verification',
  },
  {
    id: '5',
    question: 'Can I apply to casting calls from anywhere in India?',
    answer:
      'Absolutely. Both online and offline auditions are listed. For online auditions, you can submit from anywhere. For offline, the location is clearly displayed so you can decide based on your availability.',
    category: 'Artists',
  },
  {
    id: '6',
    question: 'How does Casto protect my personal information?',
    answer:
      'We use industry-standard encryption, never share your personal contact details without consent, and recruiters can only contact you through our in-platform messaging system. You control your visibility settings.',
    category: 'Privacy',
  },
  {
    id: '7',
    question: 'What types of productions can I find on Casto?',
    answer:
      'Everything from blockbuster Bollywood films to OTT web series, TV shows, advertisements, music videos, short films, and theatre productions. We partner with major studios and indie creators alike.',
    category: 'General',
  },
  {
    id: '8',
    question: 'How are payments handled for castings?',
    answer:
      'Casto displays the advertised compensation for each role but does not process payments directly. All financial agreements are made between the artist and production house. We are working on an escrow feature for 2026.',
    category: 'Payments',
  },
];

// ─── Features ─────────────────────────────────────────────────────────────────

export const features: Feature[] = [
  {
    id: '1',
    icon: 'User',
    title: 'Rich Artist Profiles',
    description:
      'Build a stunning digital portfolio with photos, videos, skills, and experience. Stand out with a profile that looks as premium as your talent.',
    gradient: 'from-blue-500 to-indigo-600',
  },
  {
    id: '2',
    icon: 'Search',
    title: 'Smart Casting Discovery',
    description:
      'AI-powered matching connects artists with roles that fit their unique profile. Advanced filters help recruiters find the perfect talent instantly.',
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    id: '3',
    icon: 'Shield',
    title: 'Verified & Safe',
    description:
      'Every artist and production house is verified by our team. No fake listings, no scams — just real opportunities from legitimate productions.',
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    id: '4',
    icon: 'Video',
    title: 'Video Auditions',
    description:
      'Submit video auditions directly through the platform. Directors review them on a clean dashboard and shortlist candidates with one click.',
    gradient: 'from-rose-500 to-pink-600',
  },
  {
    id: '5',
    icon: 'BarChart',
    title: 'Application Analytics',
    description:
      'Track who viewed your profile, how many applications you received, and which roles match your metrics with our powerful analytics dashboard.',
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    id: '6',
    icon: 'MessageCircle',
    title: 'Seamless Communication',
    description:
      'In-platform messaging, audition scheduling, and real-time notifications keep artists and directors connected without sharing personal contact details.',
    gradient: 'from-cyan-500 to-blue-600',
  },
];

// ─── Platform Statistics ───────────────────────────────────────────────────────

export const stats: Stat[] = [
  { label: 'Registered Artists', value: '50,000', suffix: '+', description: 'Verified talent profiles' },
  { label: 'Casting Calls Posted', value: '8,500', suffix: '+', description: 'Active & past opportunities' },
  { label: 'Production Houses', value: '1,200', suffix: '+', description: 'Verified studios & agencies' },
  { label: 'Successful Castings', value: '32,000', suffix: '+', description: 'Artists placed in productions' },
];

// ─── Companies / Production Houses ────────────────────────────────────────────

export const companies: Company[] = [
  { id: '1', name: 'Netflix India', logo: 'Netflix' },
  { id: '2', name: 'Amazon Prime', logo: 'Prime' },
  { id: '3', name: 'Dharma Productions', logo: 'Dharma' },
  { id: '4', name: 'Red Chillies', logo: 'RedChillies' },
  { id: '5', name: 'Zee Studios', logo: 'Zee' },
  { id: '6', name: 'Sony LIV', logo: 'Sony' },
  { id: '7', name: 'Disney+ Hotstar', logo: 'Hotstar' },
  { id: '8', name: 'T-Series Films', logo: 'TSeries' },
];
