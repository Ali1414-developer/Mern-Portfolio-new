export const fallbackProjects = [
  {
    _id: 'proj-1',
    title: 'UrbanBite',
    slug: 'urbanbite',
    category: 'Full Stack',
    shortDescription: 'Full-stack restaurant management and ordering platform with customer storefront and multi-role operations.',
    description: 'UrbanBite is a comprehensive full-stack restaurant management and ordering platform built on the MERN stack. It includes a high-performance customer-facing web application with authenticated ordering, interactive digital menus, real-time shopping cart, and seamless checkout, coupled with secure administrative and receptionist operations panels for live order tracking and kitchen fulfillment.',
    technologies: ['React', 'Node.js', 'Express.js', 'MongoDB Atlas', 'REST APIs', 'Tailwind CSS'],
    features: [
      'Customer-facing restaurant website & interactive digital menu',
      'User authentication & protected customer profiles',
      'Real-time cart calculation and streamlined checkout',
      'Comprehensive order lifecycle management',
      'Dedicated Admin Panel for menu, user, and sales control',
      'Receptionist Panel for real-time kitchen coordination',
      'Restaurant table and order status management'
    ],
    image: '/assets/projects/urbanbite.webp',
    gallery: [
      '/assets/projects/urbanbite-1.webp',
      '/assets/projects/urbanbite-2.webp'
    ],
    liveUrl: 'https://urban-bite-website.vercel.app/',
    githubUrl: 'https://github.com/Ali1414-developer',
    additionalLinks: [
      {
        label: 'Admin Portal',
        url: 'https://urban-admin-seven.vercel.app/login'
      }
    ],
    featured: true,
    order: 1,
    role: 'Lead Full Stack MERN Developer',
    status: 'Production'
  },
  {
    _id: 'proj-2',
    title: 'Pesticides ERP',
    slug: 'pesticides-erp',
    category: 'ERP',
    shortDescription: 'Enterprise Resource Planning & Business Management System for agricultural chemical distribution.',
    description: 'A specialized, production-oriented business management ERP system engineered for the agricultural supplies and pesticides industry. Delivers end-to-end operational visibility across inventory, sales channels, vendor relationships, batch expiration tracking, and point-of-sale accounting.',
    technologies: ['React', 'Vite', 'Tailwind CSS', 'MERN Architecture', 'Express.js', 'MongoDB'],
    features: [
      'Comprehensive Executive Admin Dashboard with real-time financial metrics',
      'Field Sales and Dispatch Operations Dashboard',
      'Dynamic Inventory & Product Catalog Management',
      'Category and formula taxonomy management',
      'High-throughput Point of Sale (POS) interface',
      'Vendor procurement & supply chain directory',
      'Customer credit and transaction histories',
      'Automated batch expiration alerts and stock protection',
      'Financial, stock, and sales reporting engine',
      'Role-based User Access Management and Security Settings'
    ],
    image: '/assets/projects/pesticides-erp.webp',
    gallery: [],
    liveUrl: '',
    githubUrl: 'https://github.com/Ali1414-developer',
    additionalLinks: [],
    featured: true,
    order: 2,
    role: 'ERP Architect & Full Stack Developer',
    status: 'Completed'
  },
  {
    _id: 'proj-3',
    title: 'Pharmacy ERP',
    slug: 'pharmacy-erp',
    category: 'ERP',
    shortDescription: 'Pharmacy Management ERP with automated stock thresholds, batch alerts, and sales portals.',
    description: 'An enterprise pharmacy management solution built to govern pharmaceutical stock, point-of-sale invoicing, medicine supplier ledgers, and critical expiration warnings. Features dual portals for pharmacy management and floor salesmen.',
    technologies: ['React', 'Vite', 'Tailwind CSS', 'React Router', 'Framer Motion', 'Lucide React', 'Node.js', 'Express', 'MongoDB', 'Mongoose'],
    features: [
      'Dedicated Admin Portal for inventory oversight and supplier contracts',
      'Fast-entry Salesman Portal tailored for retail counter checkout',
      'Medicine database with dosage, salt, and batch attributes',
      'Supplier procurement records and restock orders',
      'Daily sales auditing and margin analysis',
      'Automated low-stock and expiry notifications',
      'Granular permission settings and audit logs'
    ],
    image: '/assets/projects/pharmacy-erp.webp',
    gallery: [],
    liveUrl: '',
    githubUrl: 'https://github.com/Ali1414-developer',
    additionalLinks: [],
    featured: true,
    order: 3,
    role: 'Full Stack MERN Developer',
    status: 'Completed'
  },
  {
    _id: 'proj-4',
    title: 'RazaWears',
    slug: 'razawears',
    category: 'Frontend',
    shortDescription: 'Modern e-commerce single-page application built with React 19, Vite, and Tailwind CSS.',
    description: 'A responsive fashion e-commerce storefront delivering rapid client-side routing, modular product filtering, cart drawer persistence, and dedicated departmental showcases across apparel categories.',
    technologies: ['React 19', 'Vite', 'Tailwind CSS', 'React Router DOM', 'React Icons'],
    features: [
      'Modular departmental collections: Men, Women, Kids, and Sale',
      'Authentication flows (Login / Signup modal states)',
      'Dynamic shopping cart with persistent line-item counters',
      'Responsive checkout review and order summary',
      'Dedicated user account dashboard view'
    ],
    image: '/assets/projects/razawears.webp',
    gallery: [],
    liveUrl: '',
    githubUrl: 'https://github.com/Ali1414-developer',
    additionalLinks: [],
    featured: true,
    order: 4,
    role: 'Frontend Engineer',
    status: 'Completed'
  },
  {
    _id: 'proj-5',
    title: 'Plantaria',
    slug: 'plantaria',
    category: 'Frontend',
    shortDescription: 'Botanical e-commerce storefront with integrated direct WhatsApp cart ordering.',
    description: 'An organic botanical e-commerce web application engineered with lightweight vanilla technologies, providing frictionless plant purchasing through direct-to-WhatsApp order dispatching.',
    technologies: ['HTML5', 'CSS3', 'Vanilla JavaScript'],
    features: [
      'Botanical catalog showcase with filtering',
      'Lightweight client-side shopping bag',
      'Automated WhatsApp cart link generator with formatted order summary'
    ],
    image: '/assets/projects/plantaria.webp',
    gallery: [],
    liveUrl: '',
    githubUrl: 'https://github.com/Ali1414-developer',
    additionalLinks: [],
    featured: false,
    order: 5,
    role: 'Frontend Developer',
    status: 'Completed'
  },
  {
    _id: 'proj-6',
    title: 'Wavestream',
    slug: 'wavestream',
    category: 'Frontend',
    shortDescription: 'Streamlined web music player with dynamic playlists and interactive audio playback controls.',
    description: 'Interactive audio application with responsive playback scrubbing, queue management, volume leveling, and sleek dark UI presentation.',
    technologies: ['JavaScript', 'HTML5 Audio API', 'CSS3', 'UI Design'],
    features: [
      'Playlist queue management',
      'Custom playback bar with scrub seeking',
      'Responsive audio visualizer controls'
    ],
    image: '/assets/projects/wavestream.webp',
    gallery: [],
    liveUrl: '',
    githubUrl: 'https://github.com/Ali1414-developer',
    additionalLinks: [],
    featured: false,
    order: 6,
    role: 'Software Developer',
    status: 'Completed'
  },
  {
    _id: 'proj-7',
    title: 'Campus Event Finder',
    slug: 'campus-event-finder',
    category: 'UI/UX',
    shortDescription: 'Figma UI/UX design system and interactive prototype for university event discovery.',
    description: 'End-to-end Figma UI/UX project engineered for academic campus communities, emphasizing calendar visualization, ticket booking, and club activity notifications.',
    technologies: ['Figma', 'UI/UX Design', 'Design Systems', 'Wireframing', 'Prototyping'],
    features: [
      'High-fidelity mobile and desktop Figma prototypes',
      'Interactive design system with typography, color tokens, and atomic components',
      'Event calendar filtering, booking flow, and campus map overlays'
    ],
    image: '/assets/projects/campus-event-finder.webp',
    gallery: [],
    liveUrl: '',
    githubUrl: 'https://github.com/Ali1414-developer',
    additionalLinks: [],
    featured: false,
    order: 7,
    role: 'UI/UX Designer',
    status: 'Completed'
  },
  {
    _id: 'proj-8',
    title: 'AcademiX',
    slug: 'academix',
    category: 'Full Stack',
    shortDescription: 'Academic assignment evaluation and coursework grading platform.',
    description: 'An educational software project designed to streamline assignment submission, automated criteria verification, and academic feedback exchange between instructors and students.',
    technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs'],
    features: [
      'Student coursework submission portal',
      'Automated grading criteria verification workflow',
      'Instructor feedback and evaluation dashboard'
    ],
    image: '/assets/projects/academix.webp',
    gallery: [],
    liveUrl: '',
    githubUrl: 'https://github.com/Ali1414-developer',
    additionalLinks: [],
    featured: false,
    order: 8,
    role: 'Full Stack Developer',
    status: 'Completed'
  }
];

export const fallbackExperiences = [
  {
    _id: 'exp-1',
    company: 'Software Productivity Strategists (SPS)',
    position: 'Web Development Intern',
    location: 'Remote / Pakistan',
    startDate: '1 Year Program',
    endDate: 'Completed',
    current: false,
    description: 'Completed a rigorous 1-year Web Development Internship track focusing on full-stack web architectures, production code quality, and scalable engineering practices. Successfully achieved a qualifying assessment score of 81.6% (40/49).',
    responsibilities: [
      'Engineered full-stack and web software solutions across multiple project sprints',
      'Implemented clean, modular, and maintainable component architectures',
      'Collaborated on database integration and backend REST API communication',
      'Graduated from track with an 81.6% (40/49) qualifying assessment performance'
    ],
    technologies: ['Web Development', 'Full Stack', 'JavaScript', 'REST APIs', 'Database Integration'],
    order: 1
  },
  {
    _id: 'exp-2',
    company: 'Hat Tech Media',
    position: 'MERN Intern',
    location: 'Pakistan',
    startDate: 'Internship',
    endDate: 'Completed',
    current: false,
    description: 'Engineered web applications utilizing the MERN stack (MongoDB, Express, React, Node.js), focusing on API development, state management, and responsive user interfaces.',
    responsibilities: [
      'Developed full-stack application modules using React and Node.js/Express',
      'Constructed MongoDB database schemas and configured RESTful API endpoints',
      'Integrated frontend user interfaces with secure backend services'
    ],
    technologies: ['MongoDB', 'Express.js', 'React', 'Node.js', 'REST APIs'],
    order: 2
  },
  {
    _id: 'exp-3',
    company: 'ARCH Technologies',
    position: 'Frontend Web Developer Intern',
    location: 'Pakistan',
    startDate: 'January 2026',
    endDate: 'February 2026',
    current: false,
    description: 'Developed responsive, client-facing web application interfaces using React and Bootstrap, ensuring high fidelity to design specifications and cross-browser consistency.',
    responsibilities: [
      'Constructed modular frontend components in React',
      'Styled responsive layouts using Bootstrap and modern CSS practices',
      'Refactored legacy UI components to improve render performance and maintainability'
    ],
    technologies: ['React', 'Bootstrap', 'JavaScript', 'CSS3', 'HTML5'],
    order: 3
  }
];

export const fallbackSkills = [
  { _id: 's-1', name: 'React', category: 'Frontend', icon: 'react', description: 'Component-driven SPA architecture, hooks, state management', order: 1, featured: true },
  { _id: 's-2', name: 'JavaScript', category: 'Frontend', icon: 'javascript', description: 'Modern ES6+, asynchronous programming, DOM APIs', order: 2, featured: true },
  { _id: 's-3', name: 'Tailwind CSS', category: 'Frontend', icon: 'tailwind', description: 'Utility-first modern styling, responsive design systems', order: 3, featured: true },
  { _id: 's-4', name: 'Vite', category: 'Frontend', icon: 'vite', description: 'Next-generation lightning-fast frontend bundling', order: 4, featured: true },
  { _id: 's-5', name: 'React Router', category: 'Frontend', icon: 'router', description: 'Client-side SPA navigation and route protection', order: 5, featured: false },
  { _id: 's-6', name: 'HTML5', category: 'Frontend', icon: 'html', description: 'Semantic, accessible, and structured markup', order: 6, featured: false },
  { _id: 's-7', name: 'CSS3', category: 'Frontend', icon: 'css', description: 'Modern animations, Flexbox, Grid, CSS custom properties', order: 7, featured: false },

  { _id: 's-8', name: 'Node.js', category: 'Backend', icon: 'node', description: 'Event-driven JavaScript runtime for server development', order: 8, featured: true },
  { _id: 's-9', name: 'Express.js', category: 'Backend', icon: 'express', description: 'Robust RESTful API design, middleware, and route handling', order: 9, featured: true },
  { _id: 's-10', name: 'REST APIs', category: 'Backend', icon: 'api', description: 'Stateless, scalable HTTP endpoint architecture and design', order: 10, featured: true },

  { _id: 's-11', name: 'MongoDB', category: 'Database', icon: 'mongodb', description: 'NoSQL document database, aggregation pipelines, indexing', order: 11, featured: true },
  { _id: 's-12', name: 'Mongoose', category: 'Database', icon: 'mongoose', description: 'Schema modeling, validations, and lifecycle middleware', order: 12, featured: true },

  { _id: 's-13', name: 'C++', category: 'Programming', icon: 'cpp', description: 'High-performance systems programming and algorithm implementation', order: 13, featured: true },
  { _id: 's-14', name: 'OOP', category: 'Programming', icon: 'oop', description: 'Encapsulation, inheritance, polymorphism, abstraction', order: 14, featured: true },
  { _id: 's-15', name: 'Data Structures & Algorithms', category: 'Programming', icon: 'dsa', description: 'Time/space optimization, graph, tree, search, and sort logic', order: 15, featured: true },

  { _id: 's-16', name: 'Docker', category: 'DevOps', icon: 'docker', description: 'Containerization of full-stack services and environments', order: 16, featured: true },
  { _id: 's-17', name: 'Linux', category: 'DevOps', icon: 'linux', description: 'Shell scripting, server administration, permissions, CLI', order: 17, featured: true },
  { _id: 's-18', name: 'CI/CD', category: 'DevOps', icon: 'cicd', description: 'Automated continuous integration and deployment workflows', order: 18, featured: true },
  { _id: 's-19', name: 'GitHub Actions', category: 'DevOps', icon: 'actions', description: 'Automated pipeline configurations and test runners', order: 19, featured: false },
  { _id: 's-20', name: 'Cloud Deployment', category: 'DevOps', icon: 'cloud', description: 'Serverless deployment, Vercel, cloud architecture', order: 20, featured: true },

  { _id: 's-21', name: 'Git', category: 'Tools', icon: 'git', description: 'Distributed version control, branching, rebasing', order: 21, featured: true },
  { _id: 's-22', name: 'GitHub', category: 'Tools', icon: 'github', description: 'Collaborative development, pull requests, issue tracking', order: 22, featured: true },
  { _id: 's-23', name: 'Figma', category: 'Design', icon: 'figma', description: 'Wireframing, UI/UX prototyping, design system tokenization', order: 23, featured: true }
];

export const fallbackEducation = [
  {
    _id: 'edu-1',
    institution: 'Air University, Multan Campus',
    degree: 'Software Engineering',
    field: 'Software Engineering',
    startDate: '',
    endDate: '',
    description: 'Degree program emphasizing software engineering methodologies, data structures, algorithms, object-oriented programming in C++, full-stack web engineering, and enterprise system design.',
    location: 'Multan, Punjab, Pakistan',
    order: 1
  }
];

export const fallbackCertifications = [
  {
    _id: 'cert-1',
    title: 'Web Development Track (1-Year Program)',
    issuer: 'Software Productivity Strategists (SPS)',
    issueDate: 'Completed',
    credentialId: 'Score: 81.6% (40/49)',
    credentialUrl: '',
    image: '',
    description: 'One-year comprehensive track covering full-stack web technologies, modern JavaScript, architecture design, and assessed with an 81.6% final qualification score.'
  },
  {
    _id: 'cert-2',
    title: 'HTML and CSS: Building a Single-Page Website',
    issuer: 'Coursera Project Network',
    issueDate: 'Feb 26, 2026',
    credentialId: 'AXDX2VLJ6YEY',
    credentialUrl: 'https://coursera.org/verify/AXDX2VLJ6YEY',
    image: '/certificates/cert-coursera-html-css.png',
    description: 'Online project authorized by Coursera verifying practical mastery in building responsive single-page web structures with semantic HTML and CSS.'
  },
  {
    _id: 'cert-3',
    title: 'Elements of AI',
    issuer: 'MinnaLearn & University of Helsinki',
    issueDate: 'Feb 14, 2026',
    credentialId: 'gv4v0s2tk6h (2 ECTS)',
    credentialUrl: 'https://certificates.mooc.fi/validate/gv4v0s2tk6h',
    image: '/certificates/cert-elements-of-ai.png',
    description: 'Completed accredited 2 ECTS credits program covering core artificial intelligence concepts, algorithms, search strategies, and neural networks.'
  },
  {
    _id: 'cert-4',
    title: 'Web Development Internship & Training Program',
    issuer: 'Arch Technologies',
    issueDate: 'Jan - Feb 2026 (8 Weeks)',
    credentialId: 'Verified Completion',
    credentialUrl: '',
    image: '/certificates/cert-arch-technologies.png',
    description: 'Eight-week hands-on intensive web development training and internship focusing on modern frontend stacks, full-stack pipelines, and industry best practices.'
  },
  {
    _id: 'cert-5',
    title: 'Validate HTML Forms with JavaScript and HTML',
    issuer: 'Coursera Project Network',
    issueDate: 'Feb 27, 2026',
    credentialId: 'E7BJ5HQC8MVE',
    credentialUrl: 'https://coursera.org/verify/E7BJ5HQC8MVE',
    image: '/certificates/cert-coursera-html-forms.png',
    description: 'Hands-on project verifying client-side validation logic, JavaScript regular expressions, DOM event listeners, and form user feedback workflows.'
  },
  {
    _id: 'cert-6',
    title: 'Introduction to SQL',
    issuer: 'DataFlair',
    issueDate: 'March 25, 2025',
    credentialId: '7EF99A68C8-7CAB377BF9-7591C18FF2',
    credentialUrl: '',
    image: '/certificates/cert-dataflair-sql.png',
    description: 'Database fundamentals training covering relational SQL queries, joins, constraints, table relationships, and data manipulation language.'
  },
  {
    _id: 'cert-7',
    title: 'Resume Writing and Job Interviewing',
    issuer: 'HP LIFE - HP Foundation',
    issueDate: 'Feb 28, 2026',
    credentialId: '7c57baa8-2778-476d-97a9-0641536fa08f',
    credentialUrl: '',
    image: '/certificates/cert-hp-resume.png',
    description: 'Professional certification on constructing tailored resumes, self-assessment strategy, portfolio presentation, and interview readiness.'
  },
  {
    _id: 'cert-8',
    title: 'Professional Networking for Career Growth',
    issuer: 'HP LIFE - HP Foundation',
    issueDate: 'Feb 28, 2026',
    credentialId: '73afafa0-862a-44d6-ad91-f5426a5cfcc8',
    credentialUrl: '',
    image: '/certificates/cert-hp-networking.png',
    description: 'Certification covering networking strategy, personal branding, relationship building, and digital tools for professional tech career development.'
  }
];

export const fallbackSiteSettings = {
  name: 'Ali Raza',
  title: 'MERN Full Stack Developer | ERP Developer',
  tagline: 'Crafting scalable MERN architectures, enterprise ERP systems, and intuitive user experiences with precision and modern engineering.',
  about: 'I am a Software Engineering professional from Air University, Multan Campus, based in Layyah, Punjab, Pakistan. My primary focus centers on MERN Full Stack Development, ERP Software Engineering, REST API architecture, and database-driven solutions. With experience spanning a 1-year Web Development track at SPS and multiple enterprise ERP builds, I bridge robust backend logic with responsive, animated user interfaces while continuously expanding into Docker, Linux, and Cloud DevOps.',
  email: 'aliraza777212@gmail.com',
  location: 'Layyah, Punjab, Pakistan',
  resumeUrl: '#',
  linkedinUrl: 'https://www.linkedin.com/in/ali-raza-baloch/',
  githubUrl: 'https://github.com/Ali1414-developer',
  profileImage: '',
  seoTitle: 'Ali Raza | MERN Full Stack Developer & ERP Developer',
  seoDescription: 'Personal portfolio of Ali Raza - Software Engineering professional specializing in MERN stack web applications, ERP platforms, REST APIs, and modern UI/UX design.'
};
