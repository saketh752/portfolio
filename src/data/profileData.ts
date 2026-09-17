import { ProfileData } from '../types';

export const PROFILE_DATA: ProfileData = {
  sectionCode: '08',
  title: 'PROFILE',
  supportingLabel: 'PROFESSIONAL SNAPSHOT',
  name: 'Saketh Yadav',
  currentStatus: '5th Semester / 3rd Year, 1st Semester',
  intro: {
    primary:
      'Computer Science & Engineering student focused on Java and Spring Boot backend development, full-stack development, DevOps and cloud technologies, and microservices.',
    supporting:
      'Building projects to learn by implementing, testing, and evolving working systems.',
  },
  focusAreas: [
    'Java / Spring Boot Backend',
    'Full-Stack Development',
    'DevOps / Cloud',
    'Microservices',
  ],
  education: [
    {
      institution: 'KL University',
      location: 'Vaddeswaram',
      degree: 'B.Tech',
      field: 'Computer Science & Engineering',
      period: '2024–2028',
      scoreLabel: 'CGPA',
      scoreValue: '8.19',
      statusNote: '5th Semester / 3rd Year, 1st Semester',
    },
    {
      institution: 'SR Junior College',
      degree: 'Intermediate',
      field: 'BIEAP',
      period: '2022–2024',
      scoreLabel: 'Percentage',
      scoreValue: '86.4%',
    },
    {
      institution: 'Narayana E.M. School',
      degree: 'Secondary School (10th)',
      field: 'BSEAP',
      period: '2022',
      scoreLabel: 'Percentage',
      scoreValue: '78.67%',
    },
  ],
  technicalSkills: [
    {
      category: 'LANGUAGES',
      skills: ['Java', 'Python', 'JavaScript', 'HTML', 'CSS'],
    },
    {
      category: 'BACKEND',
      skills: ['Spring Boot', 'FastAPI', 'REST APIs', 'Microservices'],
    },
    {
      category: 'FRONTEND',
      skills: ['React', 'Next.js'],
    },
    {
      category: 'DATABASES',
      skills: ['MySQL', 'PostgreSQL', 'MongoDB'],
    },
    {
      category: 'DEVOPS & CLOUD',
      skills: ['Docker', 'CI/CD', 'Linux', 'AWS', 'Kubernetes'],
    },
    {
      category: 'CORE CS',
      skills: ['Data Structures & Algorithms', 'Object-Oriented Programming'],
    },
    {
      category: 'TOOLS',
      skills: ['Git', 'GitHub'],
    },
  ],
  featuredProject: {
    title: 'AI FITNESS PLATFORM',
    category: 'Full-Stack · AI',
    status: 'EVOLVING',
    description:
      'A full-stack AI fitness platform combining a Flutter client, Java 21 / Spring Boot core backend, Python FastAPI services for computer-vision exercise analysis and AI coaching, MySQL with Flyway, and Docker Compose.',
    repositoryUrl: 'https://github.com/saketh752/AI_Fitness_Platform',
  },
  certification: {
    name: 'AWS Certified Solutions Architect – Associate',
    issuer: 'Amazon Web Services',
    issueDate: 'June 17, 2026',
    validThrough: 'June 17, 2029',
  },
  achievements: [
    {
      title: 'Powerlifting — District Gold',
      details: 'Competitive Powerlifting Championship',
    },
    {
      title: 'Powerlifting — State Silver',
      details: 'State-level Powerlifting Championship',
    },
  ],
  resume: {
    downloadUrl: '/Saketh_Yadav_ATS_Master_Resume.pdf',
    filename: 'Saketh_Yadav_ATS_Master_Resume.pdf',
  },
  contact: {
    email: 'sakethyadav208@gmail.com',
    phone: '7702533232',
    linkedinUrl: 'https://www.linkedin.com/in/saketh-yadav-255b51318',
    githubUrl: 'https://github.com/saketh752',
    instagramUrl: 'https://www.instagram.com/saketh._.yadav.07/',
    instagramHandle: '@saketh._.yadav.07',
  },
};

