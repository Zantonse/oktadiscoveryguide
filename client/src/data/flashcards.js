// Flashcard content for the Discovery Guide drill mode
// Extracted and organized from learning content for quick drilling

export const flashcards = {
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

// Competitor handler flashcards (AI Security focused)
export const competitorFlashcards = {
  cloudNative: [
    {
      id: 'comp-cloud-1',
      objection: 'We use AWS/Azure native security',
      response: 'That works for one cloud. What about agents accessing systems across clouds? Or using multiple LLM providers?',
      differentiator: 'Unified identity across all clouds'
    },
    {
      id: 'comp-cloud-2',
      objection: "It's included with our cloud spend",
      response: 'Basic IAM is included. Agent-specific identity, governance, and compliance are different requirements.',
      differentiator: 'Purpose-built agent identity management'
    }
  ],
  platformNative: [
    {
      id: 'comp-platform-1',
      objection: 'Salesforce Agentforce handles security',
      response: 'Within Salesforce, yes. But when agents need to access ServiceNow, Workday, or external APIs?',
      differentiator: 'Cross-platform agent identity and governance'
    },
    {
      id: 'comp-platform-2',
      objection: 'Our platforms have their own security',
      response: 'They do for their own data. But modern agents are cross-functional. How do you govern an agent that touches 5 different systems?',
      differentiator: 'Unified audit trail across all agent actions'
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
