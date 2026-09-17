import {
  PersonalData,
  IdentityDimension,
  ProjectData,
  SkillItem,
  ToolkitIntro,
  FieldLogMilestone,
  FieldLogIntro,
  FieldLogStage,
  FramePhotoItem,
  FrameIntro,
  WeblogTeaser,
} from '../types';

export const PERSONAL_DATA: PersonalData = {
  name: 'SAKETH YADAV',
  primaryTitle: 'DEVELOPER',
  degree: 'B.Tech / Computer Science & Engineering',
  philosophy: 'BUILD → LEARN → EVOLVE',
  tagline: 'Engineering student actively building, learning, and evolving across backend, full-stack, DevOps, and modern software systems.',
};

export const IDENTITY_INTRO = {
  sectionCode: '02',
  title: 'IDENTITY',
  tagline: 'THREE SIDES. ONE PERSON.',
  description: 'Engineering is the core foundation. Editing and powerlifting provide creative vision, patient discipline, and real-world perspective.',
};

export const IDENTITY_DIMENSIONS: IdentityDimension[] = [
  {
    id: 'developer',
    number: '01',
    title: 'DEVELOPER',
    subtitle: 'CORE SYSTEM // FOUNDATION',
    paragraphs: [
      "I don't just build projects to have something to put on GitHub.",
      "I pick an idea, break it down, learn the concepts needed to build it, and then turn what I learn into something that actually works.",
      "For me, the project is part of the learning process. Every project introduces a new problem, a new concept, or a better way of doing something.",
      "I'm not just building projects — I'm evolving through them.",
      "I learn by building, breaking, fixing, and building again."
    ],
    callout: 'BUILD → LEARN → EVOLVE',
  },
  {
    id: 'editor',
    number: '02',
    title: 'EDITOR',
    subtitle: 'VISUAL PERSPECTIVE // CREATIVE',
    paragraphs: [
      "Editing is where I explore my creative side.",
      "I mostly work with Lightroom, using it for color correction, exposure, contrast, tones, and overall image enhancement to give photographs a different feel.",
      "I enjoy taking photographs that may look ordinary or dull and giving them a new perspective through editing.",
      "I also occasionally work with Photoshop and edit videos, experimenting with visuals and different styles.",
      "Editing isn't just about making an image look better for me. It's about bringing a different view to something that already exists."
    ],
    skills: ['Lightroom', 'Color Grading', 'Exposure & Tones', 'Photoshop', 'Video Editing'],
  },
  {
    id: 'powerlifter',
    number: '03',
    title: 'POWERLIFTER',
    subtitle: 'DISCIPLINE // PROGRESSION',
    paragraphs: [
      "Powerlifting taught me that progress doesn't happen overnight.",
      "You show up, put in the work, fail sometimes, learn from it, and come back stronger. That mindset has followed me outside the gym too.",
      "I've competed in powerlifting and won District Gold and State Silver.",
      "The medals are part of the journey, but the bigger lesson is understanding that strength is built one repetition at a time."
    ],
    achievements: [
      { label: 'DISTRICT GOLD', level: 'Competitive Honor' },
      { label: 'STATE SILVER', level: 'State Championship' },
    ],
  },
];

export const BUILDS_INTRO = {
  sectionCode: '03',
  title: 'BUILDS',
  supportingLine: 'Projects are where concepts become reality. Learning through architectural trial, real implementation, and continuous iteration.',
};

export const FEATURED_PROJECT: ProjectData = {
  id: 'ai-fitness-platform',
  title: 'AI FITNESS PLATFORM',
  tagline: 'Intelligent, Vision-Powered & Hyper-Personalized Fitness Ecosystem',
  category: 'Full-Stack · AI',
  version: 'v0.3.0',
  status: 'EVOLVING',
  githubUrl: 'https://github.com/saketh752/AI_Fitness_Platform',
  whatItIs:
    'An end-to-end, multi-tier intelligent athletic coaching and health ecosystem. It bridges real-time Computer Vision biomechanical kinematic tracking with autonomous LLM-driven coaching agents, personalized nutrition macro planning, and active workout tracking with medical safety tripwires.',
  technicalHighlights: [
    'Multi-tier architecture: Spring Boot 21 core monolith paired with high-performance Python FastAPI microservices.',
    'Real-time computer vision pose estimation via Google MediaPipe and OpenCV calculating sub-degree kinematic joint angles.',
    'Autonomous AI coaching powered by Groq Cloud (Llama 3 / Qwen) with conversational memory and medical safety guardrails.',
    'Cross-platform client built with Flutter & Dart, backed by MySQL 8.0, Flyway DB migrations, and Dockerized orchestration.',
  ],
  technologies: [
    'Flutter',
    'Dart',
    'Java 21',
    'Spring Boot',
    'Python 3.11',
    'FastAPI',
    'MediaPipe',
    'OpenCV',
    'Groq (Llama 3)',
    'MySQL 8.0',
    'Docker',
  ],
  overview: [
    'AI Fitness Platform is designed to operate as a 24/7 intelligent athletic trainer and sports scientist in your pocket.',
    'The platform analyzes barbell squats, push-ups, bicep curls, deadlifts, and lunges with sub-degree kinematic joint angle precision, delivering live form scores (0–100) and instant corrective feedback.',
    'Integrated medical risk safeguards intercept high-risk symptoms (such as acute joint strain or chest pain) prior to LLM processing, safely directing athletes to medical professionals when needed.',
    'A unified workout engine logs weights, reps, set completions, and rest countdowns, gamified through achievement milestones, XP badges, and progressive overload graphs.',
  ],
  architectureDetails: [
    {
      title: 'Client Application (Flutter Multiplatform)',
      description:
        'Cross-platform mobile and web frontend with responsive Material 3 UI, camera video ingestion module, and offline fallback stores.',
    },
    {
      title: 'Core Monolith (Java 21 / Spring Boot)',
      description:
        'Handles JWT authentication, security filters, health risk onboarding engines, session trackers, nutrition planners, and microservice orchestration.',
    },
    {
      title: 'AI Agent Microservice (Python FastAPI / Port 8000)',
      description:
        'Context-aware conversational agent utilizing Groq LLMs (Llama 3/Qwen) with session memory, goal adaptation, and medical safety guardrails.',
    },
    {
      title: 'Computer Vision Kinematics (Python FastAPI / Port 5000)',
      description:
        'Pose estimation engine utilizing Google MediaPipe, OpenCV, and SciPy trigonometry for real-time repetition counting and form scoring.',
    },
    {
      title: 'Persistence & Data Layer (MySQL 8.0)',
      description:
        'Relational persistence with InnoDB engine, utf8mb4 encoding, and Flyway automated schema versioning.',
    },
  ],
  techStackCategories: [
    {
      layer: 'Mobile & Web Client',
      technologies: ['Flutter 3.x', 'Dart', 'Material 3', 'Provider State Management'],
    },
    {
      layer: 'Monolith Backend',
      technologies: ['Java 21', 'Spring Boot 4.x', 'Spring Security (JWT)', 'Spring Data JPA', 'Flyway'],
    },
    {
      layer: 'AI & LLM Services',
      technologies: ['Python 3.11', 'FastAPI', 'Groq SDK (Llama 3 / Qwen)', 'Pydantic'],
    },
    {
      layer: 'Computer Vision Engine',
      technologies: ['Google MediaPipe', 'OpenCV', 'NumPy', 'SciPy Kinematics'],
    },
    {
      layer: 'Database & Storage',
      technologies: ['MySQL 8.0', 'JPA / Hibernate', 'JDBC'],
    },
    {
      layer: 'DevOps & Infrastructure',
      technologies: ['Docker', 'Docker Compose', 'Render Blueprint', 'GitHub Actions CI/CD'],
    },
  ],
  keyFeatures: [
    {
      title: 'Autonomous AI Coach',
      description:
        'Context-aware workout split, macro targets, and physical progress understanding with conversational memory.',
    },
    {
      title: 'Kinematic Form Analysis',
      description:
        'Sub-degree joint angle calculators with 0-100 real-time form scoring and depth cues.',
    },
    {
      title: 'Active Workout Tracker',
      description:
        'Live weight and repetition tracking with countdown rest timers, streaks, and XP milestones.',
    },
    {
      title: 'Dynamic Macro Engine',
      description:
        'Personalized TDEE/BMR calculations with real-time calorie balance rings and budget optimization.',
    },
  ],
  visualsNote:
    'Architecture diagrams, UI flow mockups, and Docker multi-container configurations are documented in the repository under /UI&Ux and V0.3_MASTER_TECHNICAL_AUDIT.md.',
};

export const TOOLKIT_INTRO: ToolkitIntro = {
  sectionCode: '04',
  title: 'TOOLKIT',
  supportingLine:
    'A structured inventory of engineering languages, architectures, and creative tools used to build resilient systems.',
};

export const TOOLKIT_SKILLS: SkillItem[] = [
  // Core Languages & Paradigms
  {
    id: 'java',
    name: 'Java',
    role: 'Object-Oriented Backend Language',
    domain: 'engineering',
    weight: 'dominant',
    relatedIds: ['springboot', 'oop', 'dsa', 'mysql', 'microservices'],
  },
  {
    id: 'python',
    name: 'Python',
    role: 'Dynamic Programming & Scripting',
    domain: 'engineering',
    weight: 'dominant',
    relatedIds: ['fastapi', 'restapis', 'linux', 'docker'],
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    role: 'Web & Client-Side Runtime',
    domain: 'engineering',
    weight: 'standard',
    relatedIds: ['html', 'css', 'react', 'nextjs'],
  },
  {
    id: 'html',
    name: 'HTML',
    role: 'Semantic Web Structure',
    domain: 'engineering',
    weight: 'standard',
    relatedIds: ['css', 'javascript', 'react'],
  },
  {
    id: 'css',
    name: 'CSS',
    role: 'Layout & Responsive Styling',
    domain: 'engineering',
    weight: 'standard',
    relatedIds: ['html', 'javascript', 'react'],
  },
  {
    id: 'dsa',
    name: 'DSA',
    role: 'Data Structures & Algorithmic Foundations',
    domain: 'engineering',
    weight: 'standard',
    relatedIds: ['java', 'python', 'oop'],
  },
  {
    id: 'oop',
    name: 'OOP',
    role: 'Object-Oriented Architecture & Design Patterns',
    domain: 'engineering',
    weight: 'standard',
    relatedIds: ['java', 'dsa', 'springboot', 'dart'],
  },

  // Frontend & Client Frameworks
  {
    id: 'react',
    name: 'React',
    role: 'Declarative Component Framework',
    domain: 'engineering',
    weight: 'dominant',
    relatedIds: ['javascript', 'nextjs', 'html', 'css', 'figma'],
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    role: 'Server-Side & Hybrid React Framework',
    domain: 'engineering',
    weight: 'standard',
    relatedIds: ['react', 'javascript', 'restapis'],
  },

  // Backend Frameworks & Systems
  {
    id: 'springboot',
    name: 'Spring Boot',
    role: 'Enterprise Backend & Microservice Framework',
    domain: 'engineering',
    weight: 'dominant',
    relatedIds: ['java', 'restapis', 'microservices', 'mysql', 'postgresql', 'docker'],
  },
  {
    id: 'fastapi',
    name: 'FastAPI',
    role: 'High-Performance Python API Microservices',
    domain: 'engineering',
    weight: 'dominant',
    relatedIds: ['python', 'restapis', 'microservices', 'docker'],
  },
  {
    id: 'restapis',
    name: 'REST APIs',
    role: 'Distributed HTTP Service Architecture',
    domain: 'engineering',
    weight: 'standard',
    relatedIds: ['springboot', 'fastapi', 'microservices', 'react', 'nextjs', 'flutter'],
  },
  {
    id: 'microservices',
    name: 'Microservices',
    role: 'Decoupled Service Architecture & Orchestration',
    domain: 'engineering',
    weight: 'dominant',
    relatedIds: ['springboot', 'fastapi', 'restapis', 'docker', 'kubernetes'],
  },

  // Databases & Storage
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    role: 'Relational Database with ACID Reliability',
    domain: 'engineering',
    weight: 'standard',
    relatedIds: ['springboot', 'restapis', 'docker'],
  },
  {
    id: 'mysql',
    name: 'MySQL',
    role: 'Relational Persistence & Schema Management',
    domain: 'engineering',
    weight: 'standard',
    relatedIds: ['springboot', 'restapis', 'docker'],
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    role: 'Document / NoSQL Data Store',
    domain: 'engineering',
    weight: 'standard',
    relatedIds: ['javascript', 'restapis', 'fastapi'],
  },

  // DevOps, Cloud & Tooling
  {
    id: 'docker',
    name: 'Docker',
    role: 'Containerization & Isolated Environments',
    domain: 'engineering',
    weight: 'dominant',
    relatedIds: ['kubernetes', 'cicd', 'linux', 'springboot', 'fastapi'],
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes',
    role: 'Container Orchestration & Cluster Management',
    domain: 'engineering',
    weight: 'standard',
    relatedIds: ['docker', 'aws', 'microservices', 'linux'],
  },
  {
    id: 'linux',
    name: 'Linux',
    role: 'Server Environments & POSIX CLI Workflows',
    domain: 'engineering',
    weight: 'standard',
    relatedIds: ['docker', 'git', 'aws', 'kubernetes'],
  },
  {
    id: 'aws',
    name: 'AWS',
    role: 'Cloud Infrastructure & Managed Services',
    domain: 'engineering',
    weight: 'standard',
    relatedIds: ['docker', 'kubernetes', 'cicd', 'linux'],
  },
  {
    id: 'git',
    name: 'Git',
    role: 'Distributed Version Control & Branch Management',
    domain: 'engineering',
    weight: 'standard',
    relatedIds: ['github', 'cicd', 'linux'],
  },
  {
    id: 'github',
    name: 'GitHub',
    role: 'Code Collaboration & CI/CD Workflows',
    domain: 'engineering',
    weight: 'standard',
    relatedIds: ['git', 'cicd'],
  },
  {
    id: 'cicd',
    name: 'CI/CD',
    role: 'Automated Build, Test & Deployment Pipelines',
    domain: 'engineering',
    weight: 'standard',
    relatedIds: ['git', 'github', 'docker', 'aws'],
  },

  // Creative Branch (Bridged to Engineering)
  {
    id: 'figma',
    name: 'Figma',
    role: 'UI/UX Wireframing & Design Systems',
    domain: 'creative',
    weight: 'standard',
    relatedIds: ['react', 'flutter', 'css', 'photoshop'],
  },
  {
    id: 'flutter',
    name: 'Flutter',
    role: 'Cross-Platform Native UI Framework',
    domain: 'creative',
    weight: 'dominant',
    relatedIds: ['dart', 'figma', 'restapis'],
  },
  {
    id: 'dart',
    name: 'Dart',
    role: 'Strongly Typed Client Language',
    domain: 'creative',
    weight: 'standard',
    relatedIds: ['flutter', 'oop'],
  },
  {
    id: 'lightroom',
    name: 'Lightroom',
    role: 'Color Grading, Exposure & Tonal Enhancement',
    domain: 'creative',
    weight: 'dominant',
    relatedIds: ['photoshop', 'capcut'],
  },
  {
    id: 'photoshop',
    name: 'Photoshop',
    role: 'Digital Compositing, Retouching & Graphics',
    domain: 'creative',
    weight: 'standard',
    relatedIds: ['lightroom', 'figma', 'capcut'],
  },
  {
    id: 'capcut',
    name: 'CapCut',
    role: 'Pacing, Video Sequencing & Motion Edits',
    domain: 'creative',
    weight: 'standard',
    relatedIds: ['photoshop', 'lightroom'],
  },
];

export const FIELD_LOG_INTRO: FieldLogIntro = {
  sectionCode: '05',
  title: 'FIELD LOG',
  tagline: 'HANDS-ON ENGINEERING JOURNEY',
  statement:
    "I don't have professional industry experience yet. What I do have is hands-on experience learning through projects, experimentation, and turning concepts into working systems.",
};

export const FIELD_LOG_STAGES: FieldLogStage[] = [
  {
    number: '01',
    title: 'FROM LEARNING TO BUILDING',
    description:
      'Started with Java and programming fundamentals, then moved from solving individual problems to building working applications.',
  },
  {
    number: '02',
    title: 'BACKEND FOUNDATIONS',
    description:
      'Moved into Java, Spring Boot, REST APIs, databases, and object-oriented design, gradually understanding what happens behind an application instead of only working on the surface.',
  },
  {
    number: '03',
    title: 'DISTRIBUTED SYSTEMS',
    description:
      'Started exploring microservices, API gateways, service-to-service communication, containerization, and the architectural problems that appear when applications grow beyond a single service.',
  },
  {
    number: '04',
    title: 'CLOUD & DEVOPS',
    description:
      'Expanded into Linux, Docker, CI/CD, AWS, and Kubernetes to understand how applications are built, packaged, deployed, and operated.',
  },
  {
    number: '05',
    title: 'BUILDING WITH AI',
    description:
      'Built the AI Fitness Platform as a larger polyglot system combining Java/Spring Boot, Python/FastAPI, computer vision, AI coaching, Flutter, MySQL, and Docker.',
  },
];

export const FIELD_LOG_MILESTONES: FieldLogMilestone[] = [
  {
    id: 'foundations',
    stageNumber: '01',
    title: 'FOUNDATIONS & OBJECT-ORIENTED LOGIC',
    category: 'CORE PROGRAMMING',
    summary:
      'Starting with foundational programming syntax, algorithmic problem solving, and object-oriented paradigms in Java. Built CLI projects to practice memory allocation, control flow, loops, and data structures.',
    learnings: [
      'Mastered core Java OOP concepts: encapsulation, inheritance, polymorphism, and abstraction.',
      'Implemented fundamental linear search and array manipulation algorithms without relying on heavy abstractions.',
      'Developed Git CLI workflows: feature branching, atomic commits, and repository version management.',
    ],
    repository: {
      name: 'java-practice',
      url: 'https://github.com/saketh752/java-practice',
      type: 'EXPERIMENT & STUDY',
      technologies: ['Java', 'OOP', 'Data Structures', 'Git'],
      highlight:
        'Console-based Student Management System implementing arrays, searching, and object state.',
    },
  },
  {
    id: 'fullstack-building',
    stageNumber: '02',
    title: 'FULL-STACK BUILDING & PERSISTENCE',
    category: 'CLIENT-SERVER ARCHITECTURE',
    summary:
      'Transitioned from command-line scripts to building interactive web applications. Focused on component hierarchies, asynchronous state, RESTful endpoints, relational databases, and third-party webhook handling.',
    learnings: [
      'Built reactive React UI with dynamic cart state persistence in localStorage and interactive modal flows.',
      'Constructed an Express.js REST API with CORS configurations and SQLite relational persistence.',
      'Implemented secure webhook endpoints with cryptographic signature verification (Razorpay test integration) and password hashing with bcryptjs.',
      'Deployed client applications to live cloud hosting environments (Vercel).',
    ],
    repository: {
      name: 'tribal-handicrafts-platform',
      url: 'https://github.com/saketh752/tribal-handicrafts-platform',
      liveUrl: 'https://tribal-handicrafts-platform.vercel.app',
      type: 'HANDS-ON BUILD',
      technologies: ['React', 'Node.js', 'Express', 'SQLite', 'Razorpay Webhooks', 'Vercel'],
      highlight:
        'Full-stack storefront featuring cart drawers, role-based auth routes, and cryptographic payment webhooks.',
    },
  },
  {
    id: 'systems-microservices',
    stageNumber: '03',
    title: 'SYSTEMS & MICROSERVICE ARCHITECTURES',
    category: 'ENTERPRISE BACKEND',
    summary:
      'Explored enterprise architectural patterns, decomposing monolithic tasks into decoupled microservices. Implemented API Gateway routing, reactive filters, and client-side load balancing in Java 21.',
    learnings: [
      'Configured Spring Cloud Gateway utilizing Spring WebFlux for high-throughput, non-blocking reactive request routing.',
      'Integrated Spring Cloud LoadBalancer across decoupled service boundaries (OrderService, RestaurantService, CartService, ProductService).',
      'Engineered service isolation principles to prevent cascading failures across distributed microservices.',
    ],
    repository: {
      name: 'SOA-MicroServices',
      url: 'https://github.com/saketh752/SOA-MicroServices',
      type: 'HANDS-ON BUILD',
      technologies: [
        'Java 21',
        'Spring Boot 4.x',
        'Spring Cloud Gateway',
        'WebFlux',
        'Spring Cloud LoadBalancer',
        'Maven',
      ],
      highlight:
        'Food delivery and e-commerce microservices orchestrated via Spring Cloud Gateway with reactive routing.',
    },
  },
  {
    id: 'ecosystem-integration',
    stageNumber: '04',
    title: 'MULTI-TIER ECOSYSTEM INTEGRATION',
    category: 'DISTRIBUTED INTELLIGENCE',
    summary:
      'Synthesized backend monoliths, specialized Python microservices, computer vision pipelines, and cross-platform mobile clients into an end-to-end intelligent coaching ecosystem.',
    learnings: [
      'Architected polyglot service communication: Java 21 / Spring Boot 8080 core linked to Python 3.11 / FastAPI microservices on ports 5000 and 8000.',
      'Integrated real-time biomechanical computer vision with Google MediaPipe and OpenCV calculating sub-degree joint kinematic angles.',
      'Engineered autonomous LLM coaching agents (Groq Cloud / Llama 3) with conversational memory and medical safety guardrails.',
      'Automated multi-container development and isolated testing with Docker Compose and Flyway database migrations.',
    ],
    repository: {
      name: 'AI_Fitness_Platform',
      url: 'https://github.com/saketh752/AI_Fitness_Platform',
      type: 'HANDS-ON BUILD',
      technologies: [
        'Flutter',
        'Dart',
        'Java 21',
        'Spring Boot',
        'Python',
        'FastAPI',
        'MediaPipe',
        'MySQL 8.0',
        'Docker Compose',
      ],
      highlight:
        'Flagship multi-tier athletic coaching platform bridging real-time pose kinematics with LLM intelligence.',
    },
  },
  {
    id: 'curriculum-evolution',
    stageNumber: '05',
    title: 'SYSTEMATIC CURRICULUM & ACTIVE EVOLUTION',
    category: 'CONTINUOUS LEARNING OS',
    summary:
      'Maintaining a structured engineering knowledge operating system tracking 21 core computer science modules, active practice logs, and architectural revisions to continuously turn theoretical concepts into practical capability.',
    learnings: [
      'Structured 21-track curriculum spanning OS, Computer Networks, DBMS, System Design, DevOps, and Testing.',
      'Disciplined daily execution framework: Learn → Practice → Project → Revision.',
      'Iterative project engineering mindset: building, breaking, fixing, and building again.',
    ],
    repository: {
      name: 'software-engineering-academy',
      url: 'https://github.com/saketh752/software-engineering-academy',
      type: 'CURRICULUM OS',
      technologies: [
        'Curriculum Engineering',
        'Obsidian OS',
        'System Design',
        'Algorithms',
        'DevOps Study',
      ],
      highlight:
        'Personal engineering state journal and 21-module CS curriculum tracking structured daily progression.',
    },
  },
];

export const FRAME_INTRO: FrameIntro = {
  sectionCode: '06',
  title: 'THE FRAME',
  tagline: 'CREATIVE DIRECTION · PHOTO EDITING · VISUAL MOOD',
  philosophy: 'I don’t just take photographs. I experiment with how they feel.',
  statement:
    'Shaping light, color, and atmosphere. Exploring the intersection of precision and emotion through Lightroom. Engineering brings systems, structure, and logic; editing brings light, color, and visual mood. Both demand attention to detail, precision, and patience.',
};

export const FRAME_PHOTOS: FramePhotoItem[] = [
  {
    id: 'frame-01-mountain-sunrise',
    index: '01',
    title: 'Mountain Sunrise & Mist',
    category: 'Sunset / Landscape',
    mood: 'Warm golden hour mist & high-altitude perspective reach',
    imageSrc: '/frame/frame-01-mountain-sunrise.jpg',
    aspectRatio: '3/4',
    orientation: 'vertical',
    primaryTool: 'Lightroom',
    detailsPending: true,
    isHero: true,
  },
  {
    id: 'frame-02-river-barrage',
    index: '02',
    title: 'River Barrage & Overcast Sunbeams',
    category: 'River / Cityscape',
    mood: 'Dramatic monsoon cloud cover with piercing light rays',
    imageSrc: '/frame/frame-02-river-barrage.jpg',
    aspectRatio: '3/4',
    orientation: 'vertical',
    primaryTool: 'Lightroom',
    detailsPending: true,
  },
  {
    id: 'frame-03-temple-gopuram',
    index: '03',
    title: 'Temple Gopuram',
    category: 'Architecture / Temple',
    mood: 'Clear azure daytime & stone sculptural depth',
    imageSrc: '/frame/frame-03-temple-gopuram.jpg',
    aspectRatio: '9/16',
    orientation: 'vertical',
    primaryTool: 'Lightroom',
    detailsPending: true,
  },
  {
    id: 'frame-04-highrise-facade',
    index: '04',
    title: 'Residential High-Rise & Red Spine',
    category: 'Urban Architecture',
    mood: 'Warm late-afternoon sunlight & architectural contrast',
    imageSrc: '/frame/frame-04-highrise-facade.jpg',
    aspectRatio: '3/4',
    orientation: 'vertical',
    primaryTool: 'Lightroom',
    detailsPending: true,
  },
  {
    id: 'frame-05-coastal-portrait',
    index: '05',
    title: 'Coastal Shoreline Profile',
    category: 'Portrait',
    mood: 'Atmospheric coastal ocean & muted shore tones',
    imageSrc: '/frame/frame-05-coastal-portrait.jpg',
    aspectRatio: '4/3',
    orientation: 'horizontal',
    primaryTool: 'Lightroom',
    detailsPending: true,
  },
  {
    id: 'frame-06-urban-twilight',
    index: '06',
    title: 'Urban Street at Dusk',
    category: 'Urban Architecture',
    mood: 'Quiet evening twilight & warm streetlamp glow',
    imageSrc: '/frame/frame-06-urban-twilight.jpg',
    aspectRatio: '3/4',
    orientation: 'vertical',
    primaryTool: 'Lightroom',
    detailsPending: true,
  },
  {
    id: 'frame-07-poolside-towers',
    index: '07',
    title: 'Poolside & Residential Towers',
    category: 'Architecture & Leisure',
    mood: 'Moody overcast storm sky & vibrant aqua water',
    imageSrc: '/frame/frame-07-poolside-towers.jpg',
    aspectRatio: '3/4',
    orientation: 'vertical',
    primaryTool: 'Lightroom',
    detailsPending: true,
  },
  {
    id: 'frame-08-track-skyline',
    index: '08',
    title: 'Athletic Track & Evening Skyline',
    category: 'Sports & Motion',
    mood: 'Violet dusk sky & stadium motion',
    imageSrc: '/frame/frame-08-track-skyline.jpg',
    aspectRatio: '3/4',
    orientation: 'vertical',
    primaryTool: 'Lightroom',
    detailsPending: true,
  },
  {
    id: 'frame-09-river-bridge',
    index: '09',
    title: 'River Bridge & Sandbanks Overlook',
    category: 'River / Cityscape',
    mood: 'Atmospheric mist & expansive river vista',
    imageSrc: '/frame/frame-09-river-bridge.jpg',
    aspectRatio: '4/5',
    orientation: 'vertical',
    primaryTool: 'Lightroom',
    detailsPending: true,
  },
];

export const WEBLOG_TEASER: WeblogTeaser = {
  sectionCode: '07',
  title: 'WEBLOG',
  tagline: 'PERSONAL JOURNAL · LIFE · LEARNING · EVERYTHING IN BETWEEN',
  paragraphs: [
    'There’s more to me than the code I write.',
    'I’m Saketh — an engineering student still figuring out where life is taking me. Somewhere between building software, lifting weights, editing photographs, watching stories from worlds that don’t exist, and dreaming about places I haven’t seen yet, I’m slowly figuring out the kind of person I want to become.',
    'I don’t have everything planned out, and I don’t think I need to. I just want to keep building, exploring, failing, learning, and becoming a little better than the person I was yesterday.',
  ],
  curiosityPrompt: 'CURIOUS ENOUGH TO KNOW WHO I AM?',
  actionLabel: 'READ MY STORY →',
};
