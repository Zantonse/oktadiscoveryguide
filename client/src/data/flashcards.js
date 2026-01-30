// Flashcard content for the Discovery Guide drill mode
// Extracted and organized from learning content for quick drilling

export const flashcards = {
  sales: {
    golden: [
      {
        id: 'sales-golden-1',
        front: 'Opening a conversation about timing',
        back: 'What prompted you to look at this now?',
        why: 'Reveals timing, urgency, and triggering events. Often uncovers audit findings, incidents, or leadership mandates.',
        unlocks: ['timeline', 'pain_points', 'business_impact']
      },
      {
        id: 'sales-golden-2',
        front: 'Understanding their vision for success',
        back: 'What would success look like for this initiative?',
        why: 'Gets them to articulate their vision. Helps you align your solution to their outcomes.',
        unlocks: ['success_criteria', 'business_impact', 'decision_process']
      },
      {
        id: 'sales-golden-3',
        front: 'Uncovering current pain points indirectly',
        back: 'How do you handle [specific process] today?',
        why: 'Opens discussion of current pain points without asking directly about problems.',
        unlocks: ['current_state', 'pain_points']
      },
      {
        id: 'sales-golden-4',
        front: 'Mapping the buying committee',
        back: 'Who else is involved in evaluating solutions?',
        why: 'Maps the buying committee. Reveals politics and priorities of different stakeholders.',
        unlocks: ['decision_process', 'success_criteria']
      },
      {
        id: 'sales-golden-5',
        front: 'Creating urgency and cost of inaction',
        back: "What happens if this doesn't get addressed?",
        why: 'Creates urgency. Gets them to articulate the cost of inaction.',
        unlocks: ['business_impact', 'timeline']
      },
      {
        id: 'sales-golden-6',
        front: 'Learning from past attempts',
        back: 'What have you tried before?',
        why: "Reveals past failures and what they've learned. Shows what to avoid.",
        unlocks: ['current_state', 'pain_points', 'success_criteria']
      }
    ],
    discovery: [
      {
        id: 'sales-disc-1',
        front: 'Current Challenges: Understanding problems',
        back: 'What challenges are you facing with access management today?',
        area: 'pain_points'
      },
      {
        id: 'sales-disc-2',
        front: 'Current Challenges: Impact on productivity',
        back: "How are these issues affecting your team's productivity?",
        area: 'pain_points'
      },
      {
        id: 'sales-disc-3',
        front: 'Business Impact: Quantifying problems',
        back: "What's the impact of these challenges on your business?",
        area: 'business_impact'
      },
      {
        id: 'sales-disc-4',
        front: 'Business Impact: Time investment',
        back: 'How much time does your team spend on access requests?',
        area: 'business_impact'
      },
      {
        id: 'sales-disc-5',
        front: 'Budget: Funding availability',
        back: 'Is there budget allocated for this initiative?',
        area: 'budget'
      },
      {
        id: 'sales-disc-6',
        front: 'Budget: Approval process',
        back: 'Who typically signs off on investments like this?',
        area: 'budget'
      },
      {
        id: 'sales-disc-7',
        front: 'Timeline: Understanding urgency drivers',
        back: "What's driving your timeline?",
        area: 'timeline'
      },
      {
        id: 'sales-disc-8',
        front: 'Timeline: Key deadlines',
        back: 'Are there any deadlines or events we should know about?',
        area: 'timeline'
      },
      {
        id: 'sales-disc-9',
        front: 'Decision Process: Stakeholder mapping',
        back: 'What does your decision-making process look like?',
        area: 'decision_process'
      },
      {
        id: 'sales-disc-10',
        front: 'Decision Process: Evaluation criteria',
        back: 'What criteria are most important to your team?',
        area: 'decision_process'
      },
      {
        id: 'sales-disc-11',
        front: 'Success Criteria: Defining outcomes',
        back: 'How would you measure whether this was a good investment?',
        area: 'success_criteria'
      },
      {
        id: 'sales-disc-12',
        front: 'Success Criteria: Requirements',
        back: 'What are the must-haves vs nice-to-haves?',
        area: 'success_criteria'
      },
      {
        id: 'sales-disc-13',
        front: 'Current State: Process understanding',
        back: 'How do you handle access requests today?',
        area: 'current_state'
      },
      {
        id: 'sales-disc-14',
        front: 'Current State: Existing tools',
        back: 'What tools are you using for identity governance?',
        area: 'current_state'
      }
    ]
  },
  technical: {
    golden: [
      {
        id: 'tech-golden-1',
        front: 'Understanding their environment',
        back: 'Walk me through your current architecture.',
        why: 'Opens comprehensive discussion of their environment. Shows you care about their context.',
        unlocks: ['architecture', 'integrations', 'pain_points']
      },
      {
        id: 'tech-golden-2',
        front: 'Identifying technical pain points',
        back: 'What limitations are you hitting with your current solution?',
        why: 'Gets specific technical pain points without being negative about their choices.',
        unlocks: ['pain_points', 'requirements']
      },
      {
        id: 'tech-golden-3',
        front: 'Prioritizing integrations',
        back: 'What does your integration priority list look like?',
        why: 'Reveals critical applications and helps prioritize the solution design.',
        unlocks: ['integrations', 'requirements', 'timeline']
      },
      {
        id: 'tech-golden-4',
        front: 'Probing specific scenarios',
        back: 'How do you handle [specific technical scenario] today?',
        why: 'Gets into implementation details and reveals gaps in current approach.',
        unlocks: ['architecture', 'pain_points', 'requirements']
      },
      {
        id: 'tech-golden-5',
        front: 'Surfacing migration concerns',
        back: "What's your biggest concern about migration?",
        why: "Surfaces risks and requirements that might not come up otherwise.",
        unlocks: ['migration', 'resources', 'requirements']
      },
      {
        id: 'tech-golden-6',
        front: 'Understanding resource needs',
        back: 'What would your team need to be successful with this?',
        why: 'Reveals resource constraints and training needs.',
        unlocks: ['resources', 'requirements', 'migration']
      }
    ],
    discovery: [
      {
        id: 'tech-disc-1',
        front: 'Architecture: Current identity systems',
        back: 'What does your current identity architecture look like?',
        area: 'architecture'
      },
      {
        id: 'tech-disc-2',
        front: 'Architecture: Directory structure',
        back: 'How is your directory structure organized?',
        area: 'architecture'
      },
      {
        id: 'tech-disc-3',
        front: 'Architecture: Cloud vs on-prem',
        back: 'Are you primarily on-prem, cloud, or hybrid?',
        area: 'architecture'
      },
      {
        id: 'tech-disc-4',
        front: 'Integrations: System connections',
        back: 'What systems would need to integrate with IGA?',
        area: 'integrations'
      },
      {
        id: 'tech-disc-5',
        front: 'Integrations: Critical applications',
        back: 'What are your most critical applications?',
        area: 'integrations'
      },
      {
        id: 'tech-disc-6',
        front: 'Integrations: HR system',
        back: "What's your HR system and how does it connect to identity?",
        area: 'integrations'
      },
      {
        id: 'tech-disc-7',
        front: 'Requirements: Must-haves',
        back: 'What are the must-have technical requirements?',
        area: 'requirements'
      },
      {
        id: 'tech-disc-8',
        front: 'Requirements: API strategy',
        back: 'What does your API strategy look like?',
        area: 'requirements'
      },
      {
        id: 'tech-disc-9',
        front: 'Compliance: Frameworks',
        back: 'What compliance frameworks apply to your organization?',
        area: 'compliance'
      },
      {
        id: 'tech-disc-10',
        front: 'Compliance: Data residency',
        back: 'Are there any data residency requirements?',
        area: 'compliance'
      },
      {
        id: 'tech-disc-11',
        front: 'Resources: Team capacity',
        back: 'What resources are available for implementation?',
        area: 'resources'
      },
      {
        id: 'tech-disc-12',
        front: 'Resources: Internal expertise',
        back: 'Do you have internal expertise or need partner support?',
        area: 'resources'
      },
      {
        id: 'tech-disc-13',
        front: 'Migration: Transition planning',
        back: 'What would migration look like from your current solution?',
        area: 'migration'
      },
      {
        id: 'tech-disc-14',
        front: 'Migration: Parallel systems',
        back: 'Are there any systems that need to run in parallel?',
        area: 'migration'
      }
    ]
  },
  aiAgents: {
    golden: [
      {
        id: 'ai-golden-1',
        front: 'Understanding AI strategy',
        back: 'Where is AI in your technology roadmap?',
        why: "Reveals strategic priority and leadership buy-in. Shows if AI is a priority or experiment.",
        unlocks: ['ai_initiatives', 'timeline', 'decision_process']
      },
      {
        id: 'ai-golden-2',
        front: 'Getting concrete examples',
        back: 'What specific agent use cases are you exploring?',
        why: 'Gets concrete examples instead of abstract discussions. Reveals maturity level.',
        unlocks: ['agent_use_cases', 'security_concerns', 'current_approach']
      },
      {
        id: 'ai-golden-3',
        front: 'Uncovering security fears',
        back: 'What keeps you up at night about AI security?',
        why: 'Reveals their specific fears and priorities. Shows what to address first.',
        unlocks: ['security_concerns', 'governance_needs', 'shadow_ai']
      },
      {
        id: 'ai-golden-4',
        front: 'Understanding tool access patterns',
        back: 'How are your agents accessing tools and data today?',
        why: 'Gets into technical implementation. Reveals MCP usage and credential patterns.',
        unlocks: ['mcp_tool_access', 'current_approach', 'security_concerns']
      },
      {
        id: 'ai-golden-5',
        front: 'Assessing shadow AI visibility',
        back: 'Do you have visibility into all AI tools in your organization?',
        why: "Opens shadow AI discussion. Usually reveals gaps they're concerned about.",
        unlocks: ['shadow_ai', 'governance_needs', 'security_concerns']
      },
      {
        id: 'ai-golden-6',
        front: 'Testing governance maturity',
        back: "What happens when an agent needs to access something it shouldn't?",
        why: 'Tests their thinking about agent governance. Reveals maturity of approach.',
        unlocks: ['security_concerns', 'governance_needs', 'current_approach']
      }
    ],
    discovery: [
      {
        id: 'ai-disc-1',
        front: 'AI Initiatives: Current projects',
        back: 'What AI or GenAI initiatives are you working on?',
        area: 'ai_initiatives'
      },
      {
        id: 'ai-disc-2',
        front: 'AI Initiatives: Leadership perspective',
        back: 'How is leadership thinking about AI adoption?',
        area: 'ai_initiatives'
      },
      {
        id: 'ai-disc-3',
        front: 'Agent Use Cases: Specific scenarios',
        back: 'Are these customer-facing or internal agents?',
        area: 'agent_use_cases'
      },
      {
        id: 'ai-disc-4',
        front: 'Agent Use Cases: System access needs',
        back: 'What systems would agents need to access?',
        area: 'agent_use_cases'
      },
      {
        id: 'ai-disc-5',
        front: 'Agent Use Cases: Autonomy level',
        back: 'How autonomous would these agents be?',
        area: 'agent_use_cases'
      },
      {
        id: 'ai-disc-6',
        front: 'MCP & Tool Access: Protocol familiarity',
        back: 'Are you familiar with MCP (Model Context Protocol)?',
        area: 'mcp_tool_access'
      },
      {
        id: 'ai-disc-7',
        front: 'MCP & Tool Access: Credential management',
        back: 'How do you manage agent credentials for tool access?',
        area: 'mcp_tool_access'
      },
      {
        id: 'ai-disc-8',
        front: 'Security Concerns: Data access',
        back: 'How are you thinking about data access controls for agents?',
        area: 'security_concerns'
      },
      {
        id: 'ai-disc-9',
        front: 'Security Concerns: Agent misbehavior',
        back: 'What happens if an agent goes rogue or misbehaves?',
        area: 'security_concerns'
      },
      {
        id: 'ai-disc-10',
        front: 'Security Concerns: Auditing',
        back: 'How do you audit what agents are doing?',
        area: 'security_concerns'
      },
      {
        id: 'ai-disc-11',
        front: 'Governance: Regulations',
        back: 'Are you tracking the EU AI Act or other regulations?',
        area: 'governance_needs'
      },
      {
        id: 'ai-disc-12',
        front: 'Governance: Documentation needs',
        back: 'What documentation do you need for AI systems?',
        area: 'governance_needs'
      },
      {
        id: 'ai-disc-13',
        front: 'Shadow AI: Visibility',
        back: 'Are teams deploying AI without going through IT?',
        area: 'shadow_ai'
      },
      {
        id: 'ai-disc-14',
        front: 'Shadow AI: Discovery',
        back: 'How do you discover new AI agents being created?',
        area: 'shadow_ai'
      },
      {
        id: 'ai-disc-15',
        front: 'Current Approach: Authentication',
        back: 'How are you handling AI authentication today?',
        area: 'current_approach'
      },
      {
        id: 'ai-disc-16',
        front: 'Current Approach: Build vs Buy',
        back: 'Are you building custom auth or using existing solutions?',
        area: 'current_approach'
      }
    ]
  }
};

// Objection handler flashcards
export const objectionFlashcards = [
  {
    id: 'obj-1',
    objection: '"Every vendor says that..."',
    meaning: "They've heard pitches before and are tired of empty claims",
    response: 'Acknowledge the skepticism. Ask what specifically they\'ve been disappointed by. Offer specific proof points.',
    avoid: 'Making more claims without evidence'
  },
  {
    id: 'obj-2',
    objection: '"We\'re not ready for this yet"',
    meaning: "They don't see the urgency or haven't connected the problem to your solution",
    response: 'Ask what would make them ready. Understand what\'s higher priority and why.',
    avoid: 'Pushing harder or creating artificial urgency'
  },
  {
    id: 'obj-3',
    objection: '"We\'ll probably build this ourselves"',
    meaning: "They haven't seen clear differentiation or don't trust vendors",
    response: 'Ask about their build vs buy criteria. Understand the TCO of building internally.',
    avoid: 'Dismissing their ability to build'
  },
  {
    id: 'obj-4',
    objection: '"Our current solution handles this"',
    meaning: "They haven't connected their pain to the limitations of their current solution",
    response: 'Ask specific questions about how they handle particular scenarios. Dig into gaps.',
    avoid: 'Badmouthing their current solution'
  },
  {
    id: 'obj-5',
    objection: '"I don\'t have budget for this"',
    meaning: "Either truly constrained or you haven't established enough value",
    response: 'Ask about what they do have budget for. Understand their priority framework.',
    avoid: 'Immediately offering discounts'
  },
  {
    id: 'obj-6',
    objection: '"Send me some information"',
    meaning: "Polite way of ending without commitment. You haven't earned a next meeting.",
    response: 'Ask what specific information would be helpful. Try to understand what\'s missing.',
    avoid: 'Accepting and hoping they\'ll read it'
  }
];

// Competitor handler flashcards
export const competitorFlashcards = {
  sailpoint: [
    {
      id: 'comp-sp-1',
      objection: 'SailPoint is the market leader',
      response: 'SailPoint has legacy market share, but the market is shifting to unified identity platforms. Many SailPoint customers are evaluating consolidation.',
      differentiator: 'Okta is unified platform (IGA + Workforce Identity)'
    },
    {
      id: 'comp-sp-2',
      objection: 'SailPoint has more features',
      response: 'Feature depth matters, but so does time to value. Ask: How long did their implementation take? How much do they spend on PS annually?',
      differentiator: 'Faster time to value - cloud-native from start'
    }
  ],
  saviynt: [
    {
      id: 'comp-sav-1',
      objection: 'Saviynt has PAM too',
      response: "Converged doesn't mean best-of-breed. How are they handling workforce identity? Most Saviynt customers still need separate SSO/MFA.",
      differentiator: 'Okta has stronger workforce identity foundation'
    },
    {
      id: 'comp-sav-2',
      objection: 'Saviynt is cheaper',
      response: "Compare total cost including implementation and ongoing maintenance. What's included in that price?",
      differentiator: 'More consistent global support'
    }
  ],
  microsoft: [
    {
      id: 'comp-ms-1',
      objection: 'We get it free with E5',
      response: "It's included, but is it sufficient? What about non-Microsoft apps? Salesforce, Workday, ServiceNow? Those need governance too.",
      differentiator: 'Okta provides governance across ALL apps, not just Microsoft'
    },
    {
      id: 'comp-ms-2',
      objection: "We're standardizing on Microsoft",
      response: 'Most enterprises have 200+ apps, majority non-Microsoft. Entra ID Governance only covers a fraction.',
      differentiator: 'Better for heterogeneous environments'
    }
  ],
  diy: [
    {
      id: 'comp-diy-1',
      objection: "We'll build it ourselves",
      response: "You can, but should you? Your devs should focus on AI capabilities, not reinventing identity. What's the TCO of DIY auth long-term?",
      differentiator: "Don't reinvent the wheel on security"
    },
    {
      id: 'comp-diy-2',
      objection: 'LangChain handles auth',
      response: 'LangChain provides patterns, not enterprise identity management. Who manages credentials? Who audits access?',
      differentiator: 'Enterprise-grade from day one'
    }
  ]
};

// Common mistakes flashcards
export const mistakeFlashcards = [
  {
    id: 'mistake-1',
    mistake: 'Jumping to pitching too early',
    why: "You haven't earned the right to pitch yet. Without understanding their problems, your pitch is just noise.",
    instead: "Stay in discovery mode until you fully understand their situation and they've expressed genuine interest."
  },
  {
    id: 'mistake-2',
    mistake: 'Asking generic questions',
    why: 'Generic questions get generic answers. "What keeps you up at night?" signals you didn\'t prepare.',
    instead: 'Ask specific questions that show you understand their industry and role.'
  },
  {
    id: 'mistake-3',
    mistake: 'Talking more than listening',
    why: "Every minute you talk is a minute you're not learning. Stakeholders notice when you're not listening.",
    instead: 'Practice active listening. Pause before responding. Reference what they just said.'
  },
  {
    id: 'mistake-4',
    mistake: 'Not following up on vague answers',
    why: 'Vague answers hide the real story. Accepting them means missing critical information.',
    instead: 'Dig deeper with "Tell me more about that" or "Can you give me an example?"'
  },
  {
    id: 'mistake-5',
    mistake: 'Asking about budget too early',
    why: 'Budget questions feel transactional before trust is established.',
    instead: "Wait until you've established value and they're engaged before discussing budget."
  },
  {
    id: 'mistake-6',
    mistake: 'Badmouthing competitors',
    why: 'It makes you look insecure and unprofessional. Stakeholders may have relationships with those vendors.',
    instead: 'Acknowledge competitors professionally and differentiate on your strengths.'
  },
  {
    id: 'mistake-7',
    mistake: 'Chasing every tangent',
    why: 'You lose focus and control of the conversation. Some tangents are tests.',
    instead: 'Acknowledge tangents briefly, note them, and redirect back to the main topic.'
  }
];

// Helper function to get all flashcards for a track
export function getFlashcardsForTrack(track) {
  const trackData = flashcards[track];
  if (!trackData) return [];

  return [
    ...trackData.golden.map(card => ({ ...card, type: 'golden' })),
    ...trackData.discovery.map(card => ({ ...card, type: 'discovery' }))
  ];
}

// Helper function to get all flashcards
export function getAllFlashcards() {
  return [
    ...getFlashcardsForTrack('sales'),
    ...getFlashcardsForTrack('technical'),
    ...getFlashcardsForTrack('aiAgents'),
    ...objectionFlashcards.map(card => ({ ...card, type: 'objection' })),
    ...mistakeFlashcards.map(card => ({ ...card, type: 'mistake' }))
  ];
}

// Helper function to shuffle an array
export function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
