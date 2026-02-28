export type TagColor = "marketing" | "design" | "business" | "technology" | "engineering";

export interface Tag {
  label: string;
  color: TagColor;
}

export interface FeaturedJob {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  tags: Tag[];
  logo: string;
  logoBg: string;
  logoColor: string;
}

export interface LatestJob {
  id: number;
  title: string;
  company: string;
  location: string;
  tags: Tag[];
  logo: string;
  logoBg: string;
  logoColor: string;
}

export interface JobDetail extends FeaturedJob {
  salary: string;
  experience: string;
  jobLevel: string;
  deadline: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  about: string;
  website: string;
  founded: string;
  employees: string;
  industry: string;
}

export const featuredJobs: FeaturedJob[] = [
  {
    id: 1,
    title: "Email Marketing",
    company: "Revolut",
    location: "Madrid, Spain",
    type: "Full Time",
    description: "Revolut is looking for Email Marketing to help team ma ...",
    tags: [
      { label: "Marketing", color: "marketing" },
      { label: "Design", color: "design" },
    ],
    logo: "R",
    logoBg: "#000000",
    logoColor: "#ffffff",
  },
  {
    id: 2,
    title: "Brand Designer",
    company: "Dropbox",
    location: "San Fransisco, US",
    type: "Full Time",
    description: "Dropbox is looking for Brand Designer to help the team t ...",
    tags: [
      { label: "Design", color: "design" },
      { label: "Business", color: "business" },
    ],
    logo: "D",
    logoBg: "#0061FF",
    logoColor: "#ffffff",
  },
  {
    id: 3,
    title: "Email Marketing",
    company: "Pitch",
    location: "Berlin, Germany",
    type: "Full Time",
    description: "Pitch is looking for Customer Manager to join marketing t ...",
    tags: [{ label: "Marketing", color: "marketing" }],
    logo: "P",
    logoBg: "#000000",
    logoColor: "#ffffff",
  },
  {
    id: 4,
    title: "Visual Designer",
    company: "Blinklist",
    location: "Granada, Spain",
    type: "Full Time",
    description: "Blinklist is looking for Visual Designer to help team desi ...",
    tags: [{ label: "Design", color: "design" }],
    logo: "B",
    logoBg: "#00C48C",
    logoColor: "#ffffff",
  },
  {
    id: 5,
    title: "Product Designer",
    company: "ClassPass",
    location: "Manchester, UK",
    type: "Full Time",
    description: "ClassPass is looking for Product Designer to help us ...",
    tags: [
      { label: "Marketing", color: "marketing" },
      { label: "Design", color: "design" },
    ],
    logo: "C",
    logoBg: "#4640DE",
    logoColor: "#ffffff",
  },
  {
    id: 6,
    title: "Lead Designer",
    company: "Canva",
    location: "Ontario, Canada",
    type: "Full Time",
    description: "Canva is looking for Lead Engineer to help develop n ...",
    tags: [
      { label: "Design", color: "design" },
      { label: "Business", color: "business" },
    ],
    logo: "C",
    logoBg: "#00C4CC",
    logoColor: "#ffffff",
  },
  {
    id: 7,
    title: "Brand Strategist",
    company: "GoDaddy",
    location: "Marseille, France",
    type: "Full Time",
    description: "GoDaddy is looking for Brand Strategist to join the team ...",
    tags: [{ label: "Marketing", color: "marketing" }],
    logo: "G",
    logoBg: "#1BDBDB",
    logoColor: "#ffffff",
  },
  {
    id: 8,
    title: "Data Analyst",
    company: "Twitter",
    location: "San Diego, US",
    type: "Full Time",
    description: "Twitter is looking for Data Analyst to help team desi ...",
    tags: [{ label: "Technology", color: "technology" }],
    logo: "T",
    logoBg: "#1DA1F2",
    logoColor: "#ffffff",
  },
];

export const latestJobs: LatestJob[] = [
  {
    id: 1,
    title: "Social Media Assistant",
    company: "Nomad",
    location: "Paris, France",
    tags: [
      { label: "Full-Time", color: "design" },
      { label: "Marketing", color: "marketing" },
      { label: "Design", color: "design" },
    ],
    logo: "N",
    logoBg: "#56CDAD1A",
    logoColor: "#56CDAD",
  },
  {
    id: 2,
    title: "Social Media Assistant",
    company: "Netlify",
    location: "Paris, France",
    tags: [
      { label: "Full-Time", color: "design" },
      { label: "Marketing", color: "marketing" },
      { label: "Design", color: "design" },
    ],
    logo: "N",
    logoBg: "#4640DE1A",
    logoColor: "#4640DE",
  },
  {
    id: 3,
    title: "Brand Designer",
    company: "Dropbox",
    location: "San Fransisco, USA",
    tags: [
      { label: "Full-Time", color: "design" },
      { label: "Marketing", color: "marketing" },
      { label: "Design", color: "design" },
    ],
    logo: "D",
    logoBg: "#0061FF1A",
    logoColor: "#0061FF",
  },
  {
    id: 4,
    title: "Brand Designer",
    company: "Maze",
    location: "San Fransisco, USA",
    tags: [
      { label: "Full-Time", color: "design" },
      { label: "Marketing", color: "marketing" },
      { label: "Design", color: "design" },
    ],
    logo: "M",
    logoBg: "#4640DE",
    logoColor: "#ffffff",
  },
  {
    id: 5,
    title: "Interactive Developer",
    company: "Terraform",
    location: "Hamburg, Germany",
    tags: [
      { label: "Full-Time", color: "design" },
      { label: "Marketing", color: "marketing" },
      { label: "Design", color: "design" },
    ],
    logo: "T",
    logoBg: "#7B61FF1A",
    logoColor: "#7B61FF",
  },
  {
    id: 6,
    title: "Interactive Developer",
    company: "Udacity",
    location: "Hamburg, Germany",
    tags: [
      { label: "Full-Time", color: "design" },
      { label: "Marketing", color: "marketing" },
      { label: "Design", color: "design" },
    ],
    logo: "U",
    logoBg: "#02ABB11A",
    logoColor: "#02ABB1",
  },
  {
    id: 7,
    title: "HR Manager",
    company: "Packer",
    location: "Lucern, Switzerland",
    tags: [
      { label: "Full-Time", color: "design" },
      { label: "Marketing", color: "marketing" },
      { label: "Design", color: "design" },
    ],
    logo: "P",
    logoBg: "#FF55001A",
    logoColor: "#FF5500",
  },
  {
    id: 8,
    title: "HR Manager",
    company: "Webflow",
    location: "Lucern, Switzerland",
    tags: [
      { label: "Full-Time", color: "design" },
      { label: "Marketing", color: "marketing" },
      { label: "Design", color: "design" },
    ],
    logo: "W",
    logoBg: "#4640DE",
    logoColor: "#ffffff",
  },
];

export const jobDetails: JobDetail[] = [
  {
    id: 1,
    title: "Email Marketing",
    company: "Revolut",
    location: "Madrid, Spain",
    type: "Full Time",
    description: "Revolut is looking for Email Marketing to help team ma ...",
    tags: [
      { label: "Marketing", color: "marketing" },
      { label: "Design", color: "design" },
    ],
    logo: "R",
    logoBg: "#000000",
    logoColor: "#ffffff",
    salary: "$50,000 – $70,000",
    experience: "3+ Years",
    jobLevel: "Senior Level",
    deadline: "July 31, 2025",
    about:
      "Revolut is a global technology company that supercharges your finances. With 35+ million customers worldwide, Revolut is on a mission to deliver a global financial super app that puts you in control.",
    website: "https://revolut.com",
    founded: "2015",
    employees: "5,000+",
    industry: "Financial Technology",
    responsibilities: [
      "Develop and execute email marketing campaigns from concept to deployment.",
      "Manage email lists, segmentation, and targeting strategies.",
      "Analyse campaign performance metrics and A/B test results.",
      "Collaborate with design and content teams to produce compelling emails.",
      "Maintain email calendar and ensure timely delivery.",
      "Ensure compliance with CAN-SPAM, GDPR and other regulations.",
    ],
    requirements: [
      "3+ years of experience in email marketing.",
      "Proficiency in Mailchimp, HubSpot, or similar platforms.",
      "Strong analytical skills with experience in Google Analytics.",
      "Excellent written communication and copywriting skills.",
      "Understanding of HTML/CSS for email templates.",
    ],
    niceToHave: [
      "Experience with marketing automation workflows.",
      "Familiarity with CRM systems.",
      "Knowledge of SEO and content marketing.",
    ],
  },
  {
    id: 2,
    title: "Brand Designer",
    company: "Dropbox",
    location: "San Fransisco, US",
    type: "Full Time",
    description: "Dropbox is looking for Brand Designer to help the team t ...",
    tags: [
      { label: "Design", color: "design" },
      { label: "Business", color: "business" },
    ],
    logo: "D",
    logoBg: "#0061FF",
    logoColor: "#ffffff",
    salary: "$90,000 – $120,000",
    experience: "4+ Years",
    jobLevel: "Senior Level",
    deadline: "August 15, 2025",
    about:
      "Dropbox is a leading cloud storage and collaboration platform trusted by over 700 million registered users and 100,000 teams worldwide to keep their content safe and accessible.",
    website: "https://dropbox.com",
    founded: "2007",
    employees: "2,500+",
    industry: "Cloud Storage",
    responsibilities: [
      "Define and evolve the visual language and brand identity of Dropbox.",
      "Create high-quality assets for marketing, product, and events.",
      "Partner with cross-functional teams to ensure brand consistency.",
      "Lead design reviews and provide constructive feedback.",
      "Build and maintain a comprehensive design system.",
      "Stay current with design trends and bring fresh ideas.",
    ],
    requirements: [
      "4+ years of brand or product design experience.",
      "Mastery of Figma, Illustrator, and Photoshop.",
      "Strong portfolio showcasing brand identity work.",
      "Excellent attention to detail and typographic sensibility.",
      "Ability to manage multiple projects in a fast-paced environment.",
    ],
    niceToHave: [
      "Experience with motion graphics or video production.",
      "Background in print and packaging design.",
      "Familiarity with user research methods.",
    ],
  },
  {
    id: 3,
    title: "Email Marketing",
    company: "Pitch",
    location: "Berlin, Germany",
    type: "Full Time",
    description: "Pitch is looking for Customer Manager to join marketing t ...",
    tags: [{ label: "Marketing", color: "marketing" }],
    logo: "P",
    logoBg: "#000000",
    logoColor: "#ffffff",
    salary: "€55,000 – €75,000",
    experience: "2+ Years",
    jobLevel: "Mid Level",
    deadline: "September 1, 2025",
    about:
      "Pitch is a collaborative presentation platform used by forward-thinking teams around the world to build, share, and track decks that make an impact.",
    website: "https://pitch.com",
    founded: "2018",
    employees: "200+",
    industry: "SaaS / Productivity",
    responsibilities: [
      "Own the full email marketing lifecycle from planning to reporting.",
      "Build automated drip campaigns to nurture leads and retain customers.",
      "Write clear, concise, and conversion-focused email copy.",
      "Segment audiences for personalised messaging.",
      "Report weekly KPIs to the marketing leadership team.",
      "Collaborate with product on lifecycle communication strategies.",
    ],
    requirements: [
      "2+ years in email marketing or CRM marketing.",
      "Hands-on experience with Klaviyo, Iterable, or Braze.",
      "Data-driven mindset with proficiency in Excel or Sheets.",
      "Creative writing skills with attention to brand voice.",
      "Experience running A/B tests and interpreting results.",
    ],
    niceToHave: [
      "Understanding of product-led growth (PLG) motions.",
      "Startup background or experience in B2B SaaS.",
      "Basic Liquid or Handlebars templating knowledge.",
    ],
  },
  {
    id: 4,
    title: "Visual Designer",
    company: "Blinklist",
    location: "Granada, Spain",
    type: "Full Time",
    description: "Blinklist is looking for Visual Designer to help team desi ...",
    tags: [{ label: "Design", color: "design" }],
    logo: "B",
    logoBg: "#00C48C",
    logoColor: "#ffffff",
    salary: "€45,000 – €65,000",
    experience: "2+ Years",
    jobLevel: "Mid Level",
    deadline: "August 30, 2025",
    about:
      "Blinklist is a key ideas app that distils the most important insights from non-fiction books, helping 25 million users grow professionally in just 15 minutes a day.",
    website: "https://blinklist.com",
    founded: "2012",
    employees: "300+",
    industry: "EdTech / Media",
    responsibilities: [
      "Design visually compelling interfaces for iOS, Android, and web.",
      "Produce marketing illustrations, icons, and motion graphics.",
      "Collaborate closely with product managers and engineers.",
      "Iterate rapidly based on user feedback and data.",
      "Maintain and extend the Blinklist design system.",
      "Present design work clearly to stakeholders.",
    ],
    requirements: [
      "2+ years of visual or UI design experience.",
      "Proficiency in Figma and Adobe Creative Suite.",
      "Strong sense of layout, colour, and typography.",
      "Portfolio demonstrating pixel-perfect execution.",
      "Good communication skills in English.",
    ],
    niceToHave: [
      "Experience with After Effects or Lottie animations.",
      "Familiarity with accessibility standards (WCAG).",
      "Interest in reading and personal development content.",
    ],
  },
  {
    id: 5,
    title: "Product Designer",
    company: "ClassPass",
    location: "Manchester, UK",
    type: "Full Time",
    description: "ClassPass is looking for Product Designer to help us ...",
    tags: [
      { label: "Marketing", color: "marketing" },
      { label: "Design", color: "design" },
    ],
    logo: "C",
    logoBg: "#4640DE",
    logoColor: "#ffffff",
    salary: "£65,000 – £85,000",
    experience: "4+ Years",
    jobLevel: "Senior Level",
    deadline: "October 10, 2025",
    about:
      "ClassPass is a global fitness and wellness membership connecting millions of members to top studios, gyms, and salons in 30 countries.",
    website: "https://classpass.com",
    founded: "2013",
    employees: "1,000+",
    industry: "Health & Wellness",
    responsibilities: [
      "Lead end-to-end product design for core consumer features.",
      "Conduct user research, usability testing, and synthesise insights.",
      "Produce high-fidelity prototypes and design specs.",
      "Collaborate with engineering during implementation.",
      "Champion accessibility and inclusive design practices.",
      "Mentor junior designers and contribute to team culture.",
    ],
    requirements: [
      "4+ years of product design experience in consumer apps.",
      "Expert-level Figma skills and strong prototyping ability.",
      "Experience shipping mobile and web products at scale.",
      "Ability to communicate design rationale to diverse audiences.",
      "Track record of measurable impact through design.",
    ],
    niceToHave: [
      "Experience with quantitative research methods.",
      "Passion for fitness and healthy lifestyle.",
      "Background working in a marketplace or two-sided platform.",
    ],
  },
  {
    id: 6,
    title: "Lead Designer",
    company: "Canva",
    location: "Ontario, Canada",
    type: "Full Time",
    description: "Canva is looking for Lead Engineer to help develop n ...",
    tags: [
      { label: "Design", color: "design" },
      { label: "Business", color: "business" },
    ],
    logo: "C",
    logoBg: "#00C4CC",
    logoColor: "#ffffff",
    salary: "CA$110,000 – CA$140,000",
    experience: "6+ Years",
    jobLevel: "Lead / Principal",
    deadline: "November 1, 2025",
    about:
      "Canva is a global online design and publishing tool with a mission to empower the world to design. With over 150 million monthly active users in 190 countries, Canva is one of the world's most valuable design companies.",
    website: "https://canva.com",
    founded: "2013",
    employees: "4,000+",
    industry: "Design / SaaS",
    responsibilities: [
      "Set the design vision and strategy for key product areas.",
      "Lead and grow a team of talented product designers.",
      "Drive alignment between design, product, and engineering.",
      "Define OKRs for the design team and track progress.",
      "Establish and evolve design principles and best practices.",
      "Represent design at executive level presentations.",
    ],
    requirements: [
      "6+ years of product design with 2+ years in a leadership role.",
      "Proven ability to develop and retain design talent.",
      "Strong strategic thinking paired with attention to craft.",
      "Excellent written and verbal communication skills.",
      "Deep empathy for users combined with business acumen.",
    ],
    niceToHave: [
      "Experience scaling a design organisation.",
      "Background in design systems or platform thinking.",
      "Public speaking or conference presentation experience.",
    ],
  },
  {
    id: 7,
    title: "Brand Strategist",
    company: "GoDaddy",
    location: "Marseille, France",
    type: "Full Time",
    description: "GoDaddy is looking for Brand Strategist to join the team ...",
    tags: [{ label: "Marketing", color: "marketing" }],
    logo: "G",
    logoBg: "#1BDBDB",
    logoColor: "#ffffff",
    salary: "€60,000 – €80,000",
    experience: "4+ Years",
    jobLevel: "Mid-Senior Level",
    deadline: "September 20, 2025",
    about:
      "GoDaddy is the world's largest services platform for entrepreneurs around the globe, empowering over 21 million customers and 75 million domain names worldwide.",
    website: "https://godaddy.com",
    founded: "1997",
    employees: "9,000+",
    industry: "Web Services / Tech",
    responsibilities: [
      "Define and articulate GoDaddy's brand positioning in the French market.",
      "Develop brand guidelines and communication frameworks.",
      "Lead market research and competitive analysis initiatives.",
      "Partner with creative teams to ensure brand consistency.",
      "Measure brand health metrics and present findings to leadership.",
      "Collaborate with agencies on major campaign briefs.",
    ],
    requirements: [
      "4+ years in brand strategy, brand management, or marketing.",
      "Strong understanding of consumer insights and research methods.",
      "Excellent presentation and storytelling skills.",
      "Experience working with global brand campaigns.",
      "Fluent in French and English.",
    ],
    niceToHave: [
      "Experience in SMB or entrepreneurship-focused brands.",
      "Background in digital marketing strategy.",
      "MBA or equivalent business education.",
    ],
  },
  {
    id: 8,
    title: "Data Analyst",
    company: "Twitter",
    location: "San Diego, US",
    type: "Full Time",
    description: "Twitter is looking for Data Analyst to help team desi ...",
    tags: [{ label: "Technology", color: "technology" }],
    logo: "T",
    logoBg: "#1DA1F2",
    logoColor: "#ffffff",
    salary: "$95,000 – $130,000",
    experience: "3+ Years",
    jobLevel: "Senior Level",
    deadline: "October 31, 2025",
    about:
      "Twitter is what's happening in the world and what people are talking about right now. Serving over 300 million monetizable daily active users, Twitter is the home of real-time conversation.",
    website: "https://twitter.com",
    founded: "2006",
    employees: "7,500+",
    industry: "Social Media / Tech",
    responsibilities: [
      "Analyse large datasets to uncover trends and actionable insights.",
      "Build dashboards and visualisations in Looker or Tableau.",
      "Partner with product and engineering teams on data strategy.",
      "Design and monitor key business metrics and KPIs.",
      "Conduct ad-hoc deep-dive analyses for leadership.",
      "Ensure data quality, integrity, and governance.",
    ],
    requirements: [
      "3+ years of data analysis or business intelligence experience.",
      "Advanced SQL skills and proficiency in Python or R.",
      "Experience with BI tools such as Looker, Tableau, or Metabase.",
      "Ability to clearly communicate insights to non-technical stakeholders.",
      "Strong problem-solving skills and statistical knowledge.",
    ],
    niceToHave: [
      "Experience with dbt or modern data stack tools.",
      "Background in social media or consumer tech analytics.",
      "Exposure to machine learning or predictive modelling.",
    ],
  },
];
