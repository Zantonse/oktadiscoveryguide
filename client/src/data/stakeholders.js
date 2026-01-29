// Stakeholders organized by track, then by level
export const stakeholdersByTrack = {
  sales: {
    executive: [
      {
        id: 'ciso',
        title: 'CISO',
        fullTitle: 'Chief Information Security Officer',
        level: 'executive',
        description: 'Security strategy and risk management',
        avatar: 'shield'
      },
      {
        id: 'cio',
        title: 'CIO',
        fullTitle: 'Chief Information Officer',
        level: 'executive',
        description: 'IT strategy and digital transformation',
        avatar: 'monitor'
      }
    ],
    management: [
      {
        id: 'it-director',
        title: 'IT Director',
        fullTitle: 'Director of IT Operations',
        level: 'management',
        description: 'IT teams and day-to-day operations',
        avatar: 'clipboard'
      }
    ],
    technical: [
      {
        id: 'iam-engineer',
        title: 'IAM Engineer',
        fullTitle: 'Identity & Access Management Engineer',
        level: 'technical',
        description: 'IAM implementation and maintenance',
        avatar: 'key'
      }
    ]
  },
  technical: {
    executive: [
      {
        id: 'ciso-tech',
        title: 'CISO',
        fullTitle: 'Chief Information Security Officer',
        level: 'executive',
        description: 'Security architecture oversight',
        avatar: 'shield'
      }
    ],
    management: [
      {
        id: 'it-director-tech',
        title: 'IT Director',
        fullTitle: 'Director of IT Infrastructure',
        level: 'management',
        description: 'Infrastructure and platform teams',
        avatar: 'clipboard'
      },
      {
        id: 'security-manager',
        title: 'Security Manager',
        fullTitle: 'Security Operations Manager',
        level: 'management',
        description: 'Security tools and processes',
        avatar: 'shield'
      }
    ],
    technical: [
      {
        id: 'iam-engineer-tech',
        title: 'IAM Engineer',
        fullTitle: 'Senior IAM Engineer',
        level: 'technical',
        description: 'IAM architecture and implementation',
        avatar: 'key'
      },
      {
        id: 'systems-architect',
        title: 'Architect',
        fullTitle: 'Enterprise Systems Architect',
        level: 'technical',
        description: 'System integration and design',
        avatar: 'layers'
      }
    ]
  },
  aiAgents: {
    executive: [
      {
        id: 'ciso-ai',
        title: 'CISO',
        fullTitle: 'Chief Information Security Officer',
        level: 'executive',
        description: 'AI security and risk governance',
        avatar: 'shield'
      },
      {
        id: 'cto',
        title: 'CTO',
        fullTitle: 'Chief Technology Officer',
        level: 'executive',
        description: 'AI strategy and innovation',
        avatar: 'cpu'
      }
    ],
    management: [
      {
        id: 'ai-platform-lead',
        title: 'AI Platform Lead',
        fullTitle: 'Director of AI Platform',
        level: 'management',
        description: 'AI infrastructure and operations',
        avatar: 'bot'
      },
      {
        id: 'data-science-manager',
        title: 'DS Manager',
        fullTitle: 'Data Science Manager',
        level: 'management',
        description: 'ML/AI team and model deployment',
        avatar: 'chart'
      }
    ],
    technical: [
      {
        id: 'ml-engineer',
        title: 'ML Engineer',
        fullTitle: 'Machine Learning Engineer',
        level: 'technical',
        description: 'Model development and deployment',
        avatar: 'code'
      },
      {
        id: 'platform-engineer',
        title: 'Platform Engineer',
        fullTitle: 'AI Platform Engineer',
        level: 'technical',
        description: 'AI infrastructure and agent systems',
        avatar: 'server'
      }
    ]
  }
};

export const levelLabels = {
  executive: 'Executive Level',
  management: 'Management Level',
  technical: 'Technical Level'
};

// Get stakeholders for a specific track
export function getStakeholdersForTrack(track) {
  return stakeholdersByTrack[track] || stakeholdersByTrack.sales;
}

// Legacy export for backwards compatibility
export const stakeholders = stakeholdersByTrack.sales;
