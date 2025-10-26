export type QuestionType = 'multiple-choice' | 'rating' | 'binary' | 'image-choice';

export interface QuestionOption {
  id: string;
  text: string;
  icon?: string;
  image?: string;
  scores: Record<string, number>;
}

export interface Question {
  id: number;
  type: QuestionType;
  question: string;
  description?: string;
  options: QuestionOption[];
}

export const questions: Question[] = [
  {
    id: 1,
    type: 'multiple-choice',
    question: "What's your ideal work environment?",
    description: "Choose the setting where you thrive most",
    options: [
      {
        id: 'remote-solo',
        text: 'Remote, working independently with deep focus',
        icon: 'Home',
        scores: { architect: 3, codeWizard: 3, dataScientist: 2 }
      },
      {
        id: 'office-collab',
        text: 'Office with collaborative team environment',
        icon: 'Users',
        scores: { devOps: 3, uiUx: 3, techSupport: 3 }
      },
      {
        id: 'hybrid-flex',
        text: 'Hybrid with flexible hours and autonomy',
        icon: 'Zap',
        scores: { cloudNavigator: 3, innovationPioneer: 3, qaDetective: 2 }
      },
      {
        id: 'startup-fast',
        text: 'Fast-paced startup with rapid iteration',
        icon: 'Rocket',
        scores: { innovationPioneer: 4, devOps: 2, codeWizard: 2 }
      }
    ]
  },
  {
    id: 2,
    type: 'binary',
    question: "When solving a problem, do you prefer...",
    options: [
      {
        id: 'plan-first',
        text: 'Planning everything before coding',
        icon: 'FileText',
        scores: { architect: 4, qaDetective: 3, cloudNavigator: 2 }
      },
      {
        id: 'code-first',
        text: 'Diving into code and iterating',
        icon: 'Code',
        scores: { codeWizard: 4, innovationPioneer: 3, devOps: 2 }
      }
    ]
  },
  {
    id: 3,
    type: 'rating',
    question: "How much do you enjoy working with visual design?",
    description: "Rate from 1 (not at all) to 5 (love it!)",
    options: [
      { id: '1', text: '1', scores: { securityGuardian: 2, dataScientist: 2, devOps: 1 } },
      { id: '2', text: '2', scores: { architect: 1, qaDetective: 1 } },
      { id: '3', text: '3', scores: { codeWizard: 1, cloudNavigator: 1 } },
      { id: '4', text: '4', scores: { uiUx: 3, innovationPioneer: 2 } },
      { id: '5', text: '5', scores: { uiUx: 5 } }
    ]
  },
  {
    id: 4,
    type: 'multiple-choice',
    question: "Which technology excites you most?",
    options: [
      {
        id: 'ai-ml',
        text: 'AI & Machine Learning',
        icon: 'Brain',
        scores: { dataScientist: 4, innovationPioneer: 3 }
      },
      {
        id: 'cloud-infra',
        text: 'Cloud Infrastructure & DevOps',
        icon: 'Cloud',
        scores: { cloudNavigator: 4, devOps: 4 }
      },
      {
        id: 'security',
        text: 'Cybersecurity & Encryption',
        icon: 'Shield',
        scores: { securityGuardian: 5 }
      },
      {
        id: 'frontend',
        text: 'Frontend Frameworks & UI',
        icon: 'Palette',
        scores: { uiUx: 4, codeWizard: 2 }
      },
      {
        id: 'backend',
        text: 'Backend Systems & APIs',
        icon: 'Database',
        scores: { architect: 4, codeWizard: 3 }
      }
    ]
  },
  {
    id: 5,
    type: 'binary',
    question: "Do you prefer...",
    options: [
      {
        id: 'build-new',
        text: 'Building new features from scratch',
        icon: 'Sparkles',
        scores: { codeWizard: 3, innovationPioneer: 4, uiUx: 2 }
      },
      {
        id: 'optimize-existing',
        text: 'Optimizing and debugging existing code',
        icon: 'Wrench',
        scores: { qaDetective: 4, devOps: 3, architect: 2 }
      }
    ]
  },
  {
    id: 6,
    type: 'multiple-choice',
    question: "What's your learning style?",
    options: [
      {
        id: 'docs-reading',
        text: 'Reading documentation thoroughly',
        icon: 'Book',
        scores: { architect: 3, dataScientist: 2, securityGuardian: 2 }
      },
      {
        id: 'hands-on',
        text: 'Hands-on experimentation',
        icon: 'Beaker',
        scores: { codeWizard: 3, innovationPioneer: 3, devOps: 2 }
      },
      {
        id: 'video-tutorials',
        text: 'Video tutorials and courses',
        icon: 'Video',
        scores: { uiUx: 2, techSupport: 2, cloudNavigator: 2 }
      },
      {
        id: 'pair-programming',
        text: 'Pair programming and mentorship',
        icon: 'Users2',
        scores: { techSupport: 3, qaDetective: 2, devOps: 2 }
      }
    ]
  },
  {
    id: 7,
    type: 'rating',
    question: "How comfortable are you with public speaking/presenting?",
    description: "Rate from 1 (terrified) to 5 (love it!)",
    options: [
      { id: '1', text: '1', scores: { codeWizard: 2, securityGuardian: 2 } },
      { id: '2', text: '2', scores: { dataScientist: 1, qaDetective: 1 } },
      { id: '3', text: '3', scores: { devOps: 1, architect: 1 } },
      { id: '4', text: '4', scores: { cloudNavigator: 2, uiUx: 2 } },
      { id: '5', text: '5', scores: { techSupport: 4, innovationPioneer: 3 } }
    ]
  },
  {
    id: 8,
    type: 'binary',
    question: "Would you rather...",
    options: [
      {
        id: 'automate-everything',
        text: 'Automate everything possible',
        icon: 'Bot',
        scores: { devOps: 4, cloudNavigator: 3, codeWizard: 2 }
      },
      {
        id: 'manual-control',
        text: 'Have manual control and oversight',
        icon: 'Eye',
        scores: { qaDetective: 4, securityGuardian: 3, architect: 2 }
      }
    ]
  },
  {
    id: 9,
    type: 'multiple-choice',
    question: "What type of project sounds most appealing?",
    options: [
      {
        id: 'user-facing',
        text: 'User-facing app with great UX',
        icon: 'Smartphone',
        scores: { uiUx: 4, codeWizard: 2 }
      },
      {
        id: 'data-pipeline',
        text: 'Data pipeline and analytics platform',
        icon: 'BarChart',
        scores: { dataScientist: 5, architect: 2 }
      },
      {
        id: 'security-system',
        text: 'Security and authentication system',
        icon: 'Lock',
        scores: { securityGuardian: 5, architect: 2 }
      },
      {
        id: 'ci-cd',
        text: 'CI/CD and deployment automation',
        icon: 'GitBranch',
        scores: { devOps: 5, cloudNavigator: 3 }
      },
      {
        id: 'innovative-poc',
        text: 'Proof-of-concept with new tech',
        icon: 'Lightbulb',
        scores: { innovationPioneer: 5, dataScientist: 2 }
      }
    ]
  },
  {
    id: 10,
    type: 'rating',
    question: "How detail-oriented are you?",
    description: "Rate from 1 (big picture) to 5 (every detail matters)",
    options: [
      { id: '1', text: '1', scores: { innovationPioneer: 2, techSupport: 1 } },
      { id: '2', text: '2', scores: { cloudNavigator: 1, uiUx: 1 } },
      { id: '3', text: '3', scores: { codeWizard: 1, devOps: 1 } },
      { id: '4', text: '4', scores: { architect: 3, dataScientist: 2 } },
      { id: '5', text: '5', scores: { qaDetective: 4, securityGuardian: 4 } }
    ]
  },
  {
    id: 11,
    type: 'binary',
    question: "When deadlines are tight, do you...",
    options: [
      {
        id: 'ship-fast',
        text: 'Ship quickly, iterate later',
        icon: 'Zap',
        scores: { innovationPioneer: 3, codeWizard: 2, techSupport: 2 }
      },
      {
        id: 'quality-first',
        text: 'Ensure quality, even if delayed',
        icon: 'CheckCircle',
        scores: { qaDetective: 4, securityGuardian: 3, architect: 3 }
      }
    ]
  },
  {
    id: 12,
    type: 'multiple-choice',
    question: "What energizes you most at work?",
    options: [
      {
        id: 'solving-puzzles',
        text: 'Solving complex technical puzzles',
        icon: 'Puzzle',
        scores: { architect: 3, dataScientist: 3, securityGuardian: 2 }
      },
      {
        id: 'helping-users',
        text: 'Helping users and solving their problems',
        icon: 'Heart',
        scores: { techSupport: 5, uiUx: 3 }
      },
      {
        id: 'building-systems',
        text: 'Building scalable systems',
        icon: 'Server',
        scores: { cloudNavigator: 4, devOps: 4, architect: 3 }
      },
      {
        id: 'creating-beautiful',
        text: 'Creating beautiful, intuitive interfaces',
        icon: 'Paintbrush',
        scores: { uiUx: 5, codeWizard: 1 }
      },
      {
        id: 'exploring-new',
        text: 'Exploring cutting-edge technologies',
        icon: 'Compass',
        scores: { innovationPioneer: 5, dataScientist: 2 }
      }
    ]
  }
];

export const personalityTypes = {
  architect: {
    name: 'The Architect',
    icon: 'Building2',
    color: 'primary',
    tagline: 'Strategic System Designer'
  },
  codeWizard: {
    name: 'The Code Wizard',
    icon: 'Wand2',
    color: 'secondary',
    tagline: 'Full-Stack Sorcerer'
  },
  securityGuardian: {
    name: 'The Security Guardian',
    icon: 'Shield',
    color: 'accent',
    tagline: 'Cybersecurity Champion'
  },
  dataScientist: {
    name: 'The Data Scientist',
    icon: 'BarChart3',
    color: 'chart-2',
    tagline: 'Analytics Mastermind'
  },
  devOps: {
    name: 'The DevOps Engineer',
    icon: 'Cog',
    color: 'chart-3',
    tagline: 'Infrastructure Automator'
  },
  uiUx: {
    name: 'The UI/UX Magician',
    icon: 'Palette',
    color: 'chart-5',
    tagline: 'Design Visionary'
  },
  qaDetective: {
    name: 'The QA Detective',
    icon: 'SearchCheck',
    color: 'chart-4',
    tagline: 'Quality Investigator'
  },
  techSupport: {
    name: 'The Tech Support Hero',
    icon: 'HeartHandshake',
    color: 'destructive',
    tagline: 'Problem-Solving Champion'
  },
  cloudNavigator: {
    name: 'The Cloud Navigator',
    icon: 'CloudCog',
    color: 'secondary',
    tagline: 'Cloud Architecture Expert'
  },
  innovationPioneer: {
    name: 'The Innovation Pioneer',
    icon: 'Sparkles',
    color: 'warning',
    tagline: 'Emerging Tech Explorer'
  }
};