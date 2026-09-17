export interface NavItem {
  id: string;
  label: string;
  code: string;
}

export interface PersonalData {
  name: string;
  primaryTitle: string;
  degree: string;
  philosophy: string;
  tagline: string;
}

export interface IdentityDimension {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  paragraphs: string[];
  callout?: string;
  achievements?: {
    label: string;
    level: string;
  }[];
  skills?: string[];
}

export interface ProjectData {
  id: string;
  title: string;
  tagline: string;
  category: string;
  version: string;
  status: string;
  githubUrl: string;
  demoUrl?: string;
  whatItIs: string;
  technicalHighlights: string[];
  technologies: string[];
  overview: string[];
  architectureDetails: {
    title: string;
    description: string;
  }[];
  techStackCategories: {
    layer: string;
    technologies: string[];
  }[];
  keyFeatures: {
    title: string;
    description: string;
  }[];
  visualsNote: string;
}

export interface SkillItem {
  id: string;
  name: string;
  role: string;
  domain: 'engineering' | 'creative';
  weight?: 'dominant' | 'standard' | 'supporting';
  relatedIds: string[];
}

export interface ToolkitIntro {
  sectionCode: string;
  title: string;
  supportingLine: string;
}

export interface FieldLogStage {
  number: string;
  title: string;
  description: string;
}

export interface FieldLogMilestone {
  id: string;
  stageNumber: string;
  title: string;
  category: string;
  summary: string;
  learnings: string[];
  repository?: {
    name: string;
    url: string;
    type: 'HANDS-ON BUILD' | 'EXPERIMENT & STUDY' | 'CURRICULUM OS';
    technologies: string[];
    highlight: string;
    liveUrl?: string;
  };
}

export interface FieldLogIntro {
  sectionCode: string;
  title: string;
  tagline: string;
  statement: string;
}

export interface FramePhotoItem {
  id: string;
  index: string;
  title: string;
  category: string;
  mood: string;
  imageSrc: string;
  aspectRatio: string;
  orientation: 'vertical' | 'horizontal';
  primaryTool: 'Lightroom' | 'Lightroom & Photoshop';
  detailsPending?: boolean;
  isHero?: boolean;
}

export interface FrameIntro {
  sectionCode: string;
  title: string;
  tagline: string;
  philosophy: string;
  statement: string;
}

export interface WeblogTeaser {
  sectionCode: string;
  title: string;
  tagline: string;
  paragraphs: string[];
  curiosityPrompt: string;
  actionLabel: string;
}

export interface JournalChapter {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  content: string[];
}

export interface PersonalStory {
  title: string;
  subtitle: string;
  author: string;
  tagline: string;
  chapters: JournalChapter[];
}

export interface EducationEntry {
  institution: string;
  degree: string;
  field?: string;
  location?: string;
  period: string;
  scoreLabel: string;
  scoreValue: string;
  statusNote?: string;
}

export interface SkillCategoryGroup {
  category: string;
  skills: string[];
}

export interface CertificationItem {
  name: string;
  issuer: string;
  issueDate: string;
  validThrough: string;
}

export interface AchievementItem {
  title: string;
  details: string;
}

export interface ProfileData {
  sectionCode: string;
  title: string;
  supportingLabel: string;
  name: string;
  currentStatus: string;
  intro: {
    primary: string;
    supporting: string;
  };
  focusAreas: string[];
  education: EducationEntry[];
  technicalSkills: SkillCategoryGroup[];
  featuredProject: {
    title: string;
    category: string;
    status: string;
    description: string;
    repositoryUrl: string;
  };
  certification: CertificationItem;
  achievements: AchievementItem[];
  resume: {
    downloadUrl: string;
    filename: string;
  };
  contact: {
    email: string;
    phone: string;
    linkedinUrl: string;
    githubUrl: string;
    instagramUrl: string;
    instagramHandle: string;
  };
}
