// AI Security stakeholders organized by level
export const stakeholdersByTrack = {
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
  return stakeholdersByTrack.aiAgents; // Always return AI stakeholders
}

// Legacy export for backwards compatibility
export const stakeholders = stakeholdersByTrack.aiAgents;
