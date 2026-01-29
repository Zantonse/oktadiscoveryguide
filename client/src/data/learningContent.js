// Learning content for the Discovery Guide educational section

export const discoveryFundamentals = {
  title: 'Discovery Fundamentals',
  description: 'Master the art of discovery conversations',
  sections: [
    {
      id: 'what-is-discovery',
      title: 'What is Discovery?',
      content: `Discovery is the process of understanding a prospect's current state, challenges, and desired outcomes before positioning a solution. It's about uncovering the real problems behind stated needs.`,
      keyPoints: [
        'Discovery is about listening, not pitching',
        'The goal is to understand, not to convince',
        'Good discovery creates value for both parties',
        'It builds trust and positions you as a partner, not a vendor'
      ]
    },
    {
      id: 'discovery-mindset',
      title: 'The Discovery Mindset',
      content: `Approach every conversation with genuine curiosity. Your job is to be a detective, not a salesperson. The best discoveries feel like conversations, not interrogations.`,
      keyPoints: [
        'Be genuinely curious about their business',
        'Listen more than you talk (aim for 70/30)',
        'Ask follow-up questions based on what they say',
        'Don\'t assume you know their problems',
        'Be patient - trust takes time to build',
        'Take notes and reference what they\'ve shared'
      ]
    },
    {
      id: 'common-mistakes',
      title: 'Common Mistakes to Avoid',
      content: `Even experienced sellers fall into these traps. Awareness is the first step to improvement.`,
      mistakes: [
        {
          mistake: 'Jumping to pitching too early',
          why: 'You haven\'t earned the right to pitch yet. Without understanding their problems, your pitch is just noise.',
          instead: 'Stay in discovery mode until you fully understand their situation and they\'ve expressed genuine interest.'
        },
        {
          mistake: 'Asking generic questions',
          why: 'Generic questions get generic answers. "What keeps you up at night?" signals you didn\'t prepare.',
          instead: 'Ask specific questions that show you understand their industry and role.'
        },
        {
          mistake: 'Talking more than listening',
          why: 'Every minute you talk is a minute you\'re not learning. Stakeholders notice when you\'re not listening.',
          instead: 'Practice active listening. Pause before responding. Reference what they just said.'
        },
        {
          mistake: 'Not following up on vague answers',
          why: 'Vague answers hide the real story. Accepting them means missing critical information.',
          instead: 'Dig deeper with "Tell me more about that" or "Can you give me an example?"'
        },
        {
          mistake: 'Asking about budget too early',
          why: 'Budget questions feel transactional before trust is established.',
          instead: 'Wait until you\'ve established value and they\'re engaged before discussing budget.'
        },
        {
          mistake: 'Badmouthing competitors',
          why: 'It makes you look insecure and unprofessional. Stakeholders may have relationships with those vendors.',
          instead: 'Acknowledge competitors professionally and differentiate on your strengths.'
        },
        {
          mistake: 'Chasing every tangent',
          why: 'You lose focus and control of the conversation. Some tangents are tests.',
          instead: 'Acknowledge tangents briefly, note them, and redirect back to the main topic.'
        }
      ]
    }
  ]
};

export const discoveryFramework = {
  title: 'Discovery Framework',
  description: 'Structured approach for each discovery track',
  tracks: {
    sales: {
      name: 'Sales Discovery',
      description: 'Business-focused discovery for Okta Identity Governance',
      areas: [
        {
          id: 'pain_points',
          name: 'Current Challenges',
          description: 'Understand what problems they face today',
          questions: [
            'What challenges are you facing with access management today?',
            'What prompted you to look at this now?',
            'How are these issues affecting your team\'s productivity?',
            'What have you tried to address these challenges?'
          ],
          signals: ['Mentions audit findings', 'Describes manual processes', 'Talks about security incidents']
        },
        {
          id: 'business_impact',
          name: 'Business Impact',
          description: 'Quantify the cost of their problems',
          questions: [
            'What\'s the impact of these challenges on your business?',
            'How much time does your team spend on access requests?',
            'Have there been any compliance or audit issues?',
            'What would it mean to solve these problems?'
          ],
          signals: ['Mentions specific costs', 'Describes risk exposure', 'Talks about lost productivity']
        },
        {
          id: 'budget',
          name: 'Budget & Resources',
          description: 'Understand their financial constraints and priorities',
          questions: [
            'Is there budget allocated for this initiative?',
            'How does this compare to other priorities?',
            'Who typically signs off on investments like this?',
            'What\'s your fiscal year timeline?'
          ],
          signals: ['Mentions budget availability', 'Discusses approval process', 'References other priorities']
        },
        {
          id: 'timeline',
          name: 'Timeline & Urgency',
          description: 'Uncover what\'s driving the timeline',
          questions: [
            'What\'s driving your timeline?',
            'Are there any deadlines or events we should know about?',
            'When would you ideally have this in place?',
            'What happens if this doesn\'t get addressed soon?'
          ],
          signals: ['Mentions audit deadlines', 'Describes compliance requirements', 'Has a specific go-live date']
        },
        {
          id: 'decision_process',
          name: 'Decision Process',
          description: 'Map out how decisions get made',
          questions: [
            'Who else is involved in evaluating solutions?',
            'What does your decision-making process look like?',
            'Have you evaluated other solutions?',
            'What criteria are most important to your team?'
          ],
          signals: ['Names other stakeholders', 'Describes evaluation process', 'Mentions competitors']
        },
        {
          id: 'success_criteria',
          name: 'Success Criteria',
          description: 'Define what success looks like',
          questions: [
            'What would success look like for this initiative?',
            'How would you measure whether this was a good investment?',
            'What are the must-haves vs nice-to-haves?',
            'What would make your leadership happy with this decision?'
          ],
          signals: ['Defines specific metrics', 'Describes desired outcomes', 'Sets clear expectations']
        },
        {
          id: 'current_state',
          name: 'Current State',
          description: 'Understand how they operate today',
          questions: [
            'How do you handle access requests today?',
            'What tools are you using for identity governance?',
            'How do access reviews work in your organization?',
            'What does your joiner/mover/leaver process look like?'
          ],
          signals: ['Describes manual processes', 'Names current tools', 'Identifies gaps']
        }
      ],
      flow: [
        { step: 1, area: 'current_state', goal: 'Understand their world first' },
        { step: 2, area: 'pain_points', goal: 'Uncover specific challenges' },
        { step: 3, area: 'business_impact', goal: 'Quantify the problem' },
        { step: 4, area: 'timeline', goal: 'Establish urgency' },
        { step: 5, area: 'decision_process', goal: 'Map stakeholders' },
        { step: 6, area: 'budget', goal: 'Qualify opportunity' },
        { step: 7, area: 'success_criteria', goal: 'Align on outcomes' }
      ]
    },
    technical: {
      name: 'Technical Discovery',
      description: 'Architecture-focused discovery for IGA implementations',
      areas: [
        {
          id: 'architecture',
          name: 'Current Architecture',
          description: 'Map their existing systems and tools',
          questions: [
            'What does your current identity architecture look like?',
            'What identity systems are you running today?',
            'How is your directory structure organized?',
            'Are you primarily on-prem, cloud, or hybrid?'
          ],
          signals: ['Names specific systems', 'Describes architecture patterns', 'Mentions cloud platforms']
        },
        {
          id: 'integrations',
          name: 'Integration Requirements',
          description: 'Understand what needs to connect',
          questions: [
            'What systems would need to integrate with IGA?',
            'What are your most critical applications?',
            'Do you have any custom applications that need governance?',
            'What\'s your HR system and how does it connect to identity?'
          ],
          signals: ['Lists critical applications', 'Describes integration patterns', 'Identifies dependencies']
        },
        {
          id: 'pain_points',
          name: 'Technical Pain Points',
          description: 'Identify gaps and limitations',
          questions: [
            'What limitations are you hitting with current tools?',
            'Where are the biggest technical gaps today?',
            'What\'s causing the most friction for your team?',
            'What would you change about your current setup?'
          ],
          signals: ['Describes specific limitations', 'Mentions workarounds', 'Identifies bottlenecks']
        },
        {
          id: 'requirements',
          name: 'Technical Requirements',
          description: 'Define must-have capabilities',
          questions: [
            'What are the must-have technical requirements?',
            'Are there specific protocols or standards you need?',
            'What does your API strategy look like?',
            'Do you have any scale or performance requirements?'
          ],
          signals: ['Lists specific requirements', 'Mentions compliance needs', 'Describes performance expectations']
        },
        {
          id: 'compliance',
          name: 'Security & Compliance',
          description: 'Understand regulatory requirements',
          questions: [
            'What compliance frameworks apply to your organization?',
            'What are your security requirements for identity systems?',
            'How do you handle audit logging and reporting?',
            'Are there any data residency requirements?'
          ],
          signals: ['Names compliance frameworks', 'Describes security requirements', 'Mentions audit needs']
        },
        {
          id: 'resources',
          name: 'Resources & Timeline',
          description: 'Understand constraints',
          questions: [
            'What resources are available for implementation?',
            'What\'s your ideal timeline for deployment?',
            'Do you have internal expertise or need partner support?',
            'Are there any change freeze periods to consider?'
          ],
          signals: ['Describes team capacity', 'Sets timeline expectations', 'Identifies constraints']
        },
        {
          id: 'migration',
          name: 'Migration Considerations',
          description: 'Plan for transition',
          questions: [
            'What would migration look like from your current solution?',
            'Are there any systems that need to run in parallel?',
            'What\'s your approach to change management?',
            'How do you handle data migration typically?'
          ],
          signals: ['Describes migration concerns', 'Identifies parallel requirements', 'Sets expectations']
        }
      ],
      flow: [
        { step: 1, area: 'architecture', goal: 'Map the landscape' },
        { step: 2, area: 'integrations', goal: 'Identify connections' },
        { step: 3, area: 'pain_points', goal: 'Uncover technical gaps' },
        { step: 4, area: 'requirements', goal: 'Define must-haves' },
        { step: 5, area: 'compliance', goal: 'Understand constraints' },
        { step: 6, area: 'resources', goal: 'Assess capacity' },
        { step: 7, area: 'migration', goal: 'Plan transition' }
      ]
    },
    aiAgents: {
      name: 'AI Agents Discovery',
      description: 'Discovery for AI security and agentic identity solutions',
      areas: [
        {
          id: 'ai_initiatives',
          name: 'AI Initiatives & Roadmap',
          description: 'Understand their AI journey',
          questions: [
            'What AI or GenAI initiatives are you working on?',
            'Where is AI in your technology roadmap?',
            'How is leadership thinking about AI adoption?',
            'What\'s driving your interest in AI?'
          ],
          signals: ['Describes AI projects', 'Mentions AI strategy', 'References leadership priorities']
        },
        {
          id: 'agent_use_cases',
          name: 'Agent Use Cases',
          description: 'Identify specific agent scenarios',
          questions: [
            'What specific AI agent use cases are you exploring?',
            'Are these customer-facing or internal agents?',
            'What systems would agents need to access?',
            'How autonomous would these agents be?'
          ],
          signals: ['Names specific use cases', 'Describes autonomy level', 'Lists system access needs']
        },
        {
          id: 'mcp_tool_access',
          name: 'MCP & Tool Access',
          description: 'Understand agent-tool patterns',
          questions: [
            'Are you familiar with MCP (Model Context Protocol)?',
            'How are your agents accessing tools and data sources?',
            'What patterns are you using for agent tool access?',
            'How do you manage agent credentials for tool access?'
          ],
          signals: ['Mentions MCP', 'Describes tool access patterns', 'Identifies credential challenges']
        },
        {
          id: 'security_concerns',
          name: 'Security Concerns',
          description: 'Uncover AI security worries',
          questions: [
            'What are your biggest security concerns around AI agents?',
            'How are you thinking about data access controls for agents?',
            'What happens if an agent goes rogue or misbehaves?',
            'How do you audit what agents are doing?'
          ],
          signals: ['Describes security worries', 'Mentions data concerns', 'Asks about controls']
        },
        {
          id: 'governance_needs',
          name: 'Governance & Compliance',
          description: 'Understand regulatory requirements',
          questions: [
            'What compliance requirements apply to your AI initiatives?',
            'Are you tracking the EU AI Act or other regulations?',
            'How are auditors asking about AI governance?',
            'What documentation do you need for AI systems?'
          ],
          signals: ['Names regulations', 'Describes audit requirements', 'Mentions documentation needs']
        },
        {
          id: 'shadow_ai',
          name: 'Shadow AI',
          description: 'Discover ungoverned AI deployments',
          questions: [
            'Do you have visibility into all AI tools in your organization?',
            'Are teams deploying AI without going through IT?',
            'How do you discover new AI agents being created?',
            'What\'s your policy on AI tool usage?'
          ],
          signals: ['Admits visibility gaps', 'Describes shadow AI concerns', 'Mentions discovery needs']
        },
        {
          id: 'timeline',
          name: 'AI Deployment Timeline',
          description: 'Understand urgency',
          questions: [
            'What\'s your timeline for AI agent deployments?',
            'Are any agents already in production?',
            'When do you need security controls in place?',
            'What\'s driving your timeline?'
          ],
          signals: ['Sets specific dates', 'Describes urgency drivers', 'Mentions production timelines']
        },
        {
          id: 'decision_process',
          name: 'Decision Process',
          description: 'Map AI security stakeholders',
          questions: [
            'Who owns AI security decisions in your organization?',
            'How do CISO, CTO, and AI Platform teams coordinate?',
            'Who else should be part of this conversation?',
            'What\'s the approval process for AI security tools?'
          ],
          signals: ['Names stakeholders', 'Describes org structure', 'Identifies decision makers']
        },
        {
          id: 'current_approach',
          name: 'Current Approach',
          description: 'Understand how they handle AI auth today',
          questions: [
            'How are you handling AI authentication today?',
            'What identity systems are your agents using?',
            'Are you building custom auth or using existing solutions?',
            'What\'s working and what\'s not?'
          ],
          signals: ['Describes current state', 'Names existing tools', 'Identifies gaps']
        }
      ],
      flow: [
        { step: 1, area: 'ai_initiatives', goal: 'Understand their AI journey' },
        { step: 2, area: 'agent_use_cases', goal: 'Identify specific scenarios' },
        { step: 3, area: 'current_approach', goal: 'Map current state' },
        { step: 4, area: 'security_concerns', goal: 'Uncover worries' },
        { step: 5, area: 'mcp_tool_access', goal: 'Understand tool patterns' },
        { step: 6, area: 'shadow_ai', goal: 'Assess visibility' },
        { step: 7, area: 'governance_needs', goal: 'Define compliance needs' },
        { step: 8, area: 'timeline', goal: 'Establish urgency' },
        { step: 9, area: 'decision_process', goal: 'Map stakeholders' }
      ]
    }
  }
};

export const goldenQuestions = {
  title: 'Golden Questions',
  description: 'High-impact questions that unlock multiple discovery areas',
  intro: 'Golden questions are open-ended questions that encourage stakeholders to share context, reveal priorities, and open new conversation threads. They work because they show genuine curiosity and give stakeholders control over what to share.',
  tracks: {
    sales: {
      questions: [
        {
          question: 'What prompted you to look at this now?',
          why: 'Reveals timing, urgency, and triggering events. Often uncovers audit findings, incidents, or leadership mandates.',
          unlocks: ['timeline', 'pain_points', 'business_impact']
        },
        {
          question: 'What would success look like for this initiative?',
          why: 'Gets them to articulate their vision. Helps you align your solution to their outcomes.',
          unlocks: ['success_criteria', 'business_impact', 'decision_process']
        },
        {
          question: 'How do you handle [specific process] today?',
          why: 'Opens discussion of current pain points without asking directly about problems.',
          unlocks: ['current_state', 'pain_points']
        },
        {
          question: 'Who else is involved in evaluating solutions?',
          why: 'Maps the buying committee. Reveals politics and priorities of different stakeholders.',
          unlocks: ['decision_process', 'success_criteria']
        },
        {
          question: 'What happens if this doesn\'t get addressed?',
          why: 'Creates urgency. Gets them to articulate the cost of inaction.',
          unlocks: ['business_impact', 'timeline']
        },
        {
          question: 'What have you tried before?',
          why: 'Reveals past failures and what they\'ve learned. Shows what to avoid.',
          unlocks: ['current_state', 'pain_points', 'success_criteria']
        }
      ]
    },
    technical: {
      questions: [
        {
          question: 'Walk me through your current architecture.',
          why: 'Opens comprehensive discussion of their environment. Shows you care about their context.',
          unlocks: ['architecture', 'integrations', 'pain_points']
        },
        {
          question: 'What limitations are you hitting with your current solution?',
          why: 'Gets specific technical pain points without being negative about their choices.',
          unlocks: ['pain_points', 'requirements']
        },
        {
          question: 'What does your integration priority list look like?',
          why: 'Reveals critical applications and helps prioritize the solution design.',
          unlocks: ['integrations', 'requirements', 'timeline']
        },
        {
          question: 'How do you handle [specific technical scenario] today?',
          why: 'Gets into implementation details and reveals gaps in current approach.',
          unlocks: ['architecture', 'pain_points', 'requirements']
        },
        {
          question: 'What\'s your biggest concern about migration?',
          why: 'Surfaces risks and requirements that might not come up otherwise.',
          unlocks: ['migration', 'resources', 'requirements']
        },
        {
          question: 'What would your team need to be successful with this?',
          why: 'Reveals resource constraints and training needs.',
          unlocks: ['resources', 'requirements', 'migration']
        }
      ]
    },
    aiAgents: {
      questions: [
        {
          question: 'Where is AI in your technology roadmap?',
          why: 'Reveals strategic priority and leadership buy-in. Shows if AI is a priority or experiment.',
          unlocks: ['ai_initiatives', 'timeline', 'decision_process']
        },
        {
          question: 'What specific agent use cases are you exploring?',
          why: 'Gets concrete examples instead of abstract discussions. Reveals maturity level.',
          unlocks: ['agent_use_cases', 'security_concerns', 'current_approach']
        },
        {
          question: 'What keeps you up at night about AI security?',
          why: 'Reveals their specific fears and priorities. Shows what to address first.',
          unlocks: ['security_concerns', 'governance_needs', 'shadow_ai']
        },
        {
          question: 'How are your agents accessing tools and data today?',
          why: 'Gets into technical implementation. Reveals MCP usage and credential patterns.',
          unlocks: ['mcp_tool_access', 'current_approach', 'security_concerns']
        },
        {
          question: 'Do you have visibility into all AI tools in your organization?',
          why: 'Opens shadow AI discussion. Usually reveals gaps they\'re concerned about.',
          unlocks: ['shadow_ai', 'governance_needs', 'security_concerns']
        },
        {
          question: 'What happens when an agent needs to access something it shouldn\'t?',
          why: 'Tests their thinking about agent governance. Reveals maturity of approach.',
          unlocks: ['security_concerns', 'governance_needs', 'current_approach']
        }
      ]
    }
  }
};

export const stakeholderPsychology = {
  title: 'Stakeholder Psychology',
  description: 'Understanding what drives engagement and resistance',
  sections: [
    {
      id: 'interest-levels',
      title: 'Interest Level Behaviors',
      description: 'How stakeholders behave at different interest levels',
      levels: [
        {
          range: '1-3',
          label: 'Disengaged/Skeptical',
          behaviors: [
            'Short, guarded answers (one sentence or less)',
            'Checking watch, mentioning other meetings',
            'Won\'t elaborate even on follow-ups',
            'Phrases like "Look...", "I\'m not sure this is...", "We\'re doing fine..."',
            'May start wrapping up the conversation'
          ],
          response: 'They\'re ready to end the meeting. You need to ask a question that resonates with their actual problems, not generic discovery.'
        },
        {
          range: '4-5',
          label: 'Neutral/Evaluating',
          behaviors: [
            'Direct answers but no volunteered information',
            'Professional but reserved',
            'Needs convincing before opening up',
            'Phrases like "It depends...", "We\'re looking at options...", "That\'s one consideration..."'
          ],
          response: 'They\'re giving you a chance but haven\'t seen value yet. Focus on understanding their specific situation.'
        },
        {
          range: '6-7',
          label: 'Engaged/Interested',
          behaviors: [
            'Sharing more context unprompted',
            'Asking clarifying questions back',
            'Showing genuine curiosity',
            'Phrases like "That\'s interesting...", "We\'ve been thinking about...", "Tell me more..."',
            'May mention pain points proactively'
          ],
          response: 'They see value. Keep building on what\'s working. Don\'t jump to pitching yet.'
        },
        {
          range: '8-10',
          label: 'Very Engaged/Ready to Act',
          behaviors: [
            'Volunteering information freely',
            'Asking about next steps, timelines, pricing',
            'Sharing internal politics and decision dynamics',
            'Phrases like "This is exactly what we need...", "Who else should be in this conversation?"',
            'May mention budget availability or urgency'
          ],
          response: 'They\'re bought in. Start transitioning to next steps and action items.'
        }
      ]
    },
    {
      id: 'what-increases',
      title: 'What Increases Interest',
      description: 'Behaviors that build engagement and trust',
      behaviors: [
        {
          behavior: 'Asking thoughtful follow-up questions',
          why: 'Shows you\'re listening and care about understanding their specific situation',
          example: 'When they mention an audit finding, ask "How did leadership respond to that?"'
        },
        {
          behavior: 'Referencing what they said earlier',
          why: 'Demonstrates active listening and makes them feel heard',
          example: '"Earlier you mentioned the reorg. How has that affected this initiative?"'
        },
        {
          behavior: 'Uncovering real pain points',
          why: 'Shows you understand their world and can potentially help',
          example: 'Probing until you understand the specific business impact of their challenges'
        },
        {
          behavior: 'Demonstrating industry knowledge',
          why: 'Builds credibility and reduces the burden on them to explain basics',
          example: 'Referencing relevant compliance frameworks or industry-specific challenges'
        },
        {
          behavior: 'Building rapport naturally',
          why: 'Makes the conversation feel collaborative rather than transactional',
          example: 'Showing genuine curiosity, appropriate humor, and respect for their time'
        },
        {
          behavior: 'Handling objections professionally',
          why: 'Shows maturity and confidence without being defensive',
          example: 'Acknowledging concerns, asking clarifying questions, then addressing directly'
        },
        {
          behavior: 'Staying focused despite tangents',
          why: 'Shows professionalism and respect for the limited meeting time',
          example: 'Acknowledging a tangent briefly, noting it for follow-up, then redirecting'
        }
      ]
    },
    {
      id: 'what-decreases',
      title: 'What Decreases Interest',
      description: 'Mistakes that damage engagement',
      behaviors: [
        {
          behavior: 'Asking generic questions',
          why: 'Signals you didn\'t prepare and don\'t understand their situation',
          example: '"What keeps you up at night?" with no specific context'
        },
        {
          behavior: 'Jumping to pitching',
          why: 'Shows you care more about selling than understanding their needs',
          example: 'Launching into a product demo before understanding their problems'
        },
        {
          behavior: 'Ignoring what they said',
          why: 'Makes them feel unheard and wastes their time',
          example: 'Asking about something they already addressed'
        },
        {
          behavior: 'Using too much jargon',
          why: 'Creates distance and can feel condescending',
          example: 'Overusing product terminology they might not know'
        },
        {
          behavior: 'Talking more than listening',
          why: 'Every minute you talk is a minute you\'re not learning',
          example: 'Monologuing about features instead of asking questions'
        },
        {
          behavior: 'Being pushy or aggressive',
          why: 'Creates resistance and damages trust',
          example: 'Pressing for commitments before they\'re ready'
        },
        {
          behavior: 'Badmouthing competitors',
          why: 'Looks insecure and unprofessional',
          example: 'Criticizing a competitor\'s product or company directly'
        },
        {
          behavior: 'Getting distracted by tangents',
          why: 'Loses control of the conversation and wastes time',
          example: 'Chasing every side topic instead of staying focused'
        }
      ]
    },
    {
      id: 'buying-signals',
      title: 'Reading Buying Signals',
      description: 'Signs that indicate readiness to move forward',
      signals: [
        {
          signal: 'Asking about implementation',
          meaning: 'They\'re envisioning the solution in their environment',
          examples: ['"What would implementation look like?"', '"How long does deployment typically take?"']
        },
        {
          signal: 'Introducing other stakeholders',
          meaning: 'They want others to hear what you have to say',
          examples: ['"Who else should be in this conversation?"', '"Can we get Sarah from security on the next call?"']
        },
        {
          signal: 'Asking about pricing',
          meaning: 'They\'re mentally budgeting for this solution',
          examples: ['"What\'s the pricing model?"', '"What would this cost for our size?"']
        },
        {
          signal: 'Discussing internal processes',
          meaning: 'They\'re thinking about how to make this happen',
          examples: ['"We\'d need to run this by legal..."', '"Our procurement process usually takes..."']
        },
        {
          signal: 'Sharing confidential information',
          meaning: 'They trust you and see you as a potential partner',
          examples: ['Sharing budget details', 'Discussing internal politics', 'Mentioning upcoming changes']
        },
        {
          signal: 'Asking for references',
          meaning: 'They want validation from similar organizations',
          examples: ['"Who else in our industry is using this?"', '"Can we talk to a reference customer?"']
        }
      ]
    },
    {
      id: 'handling-skepticism',
      title: 'Handling Skepticism',
      description: 'Common objections and how to address them',
      objections: [
        {
          objection: '"Every vendor says that..."',
          meaning: 'They\'ve heard pitches before and are tired of empty claims',
          response: 'Acknowledge the skepticism. Ask what specifically they\'ve been disappointed by. Offer specific proof points.'
        },
        {
          objection: '"We\'re not ready for this yet"',
          meaning: 'They don\'t see the urgency or haven\'t connected the problem to your solution',
          response: 'Ask what would make them ready. Understand what\'s higher priority and why.'
        },
        {
          objection: '"We\'ll probably build this ourselves"',
          meaning: 'They haven\'t seen clear differentiation or don\'t trust vendors',
          response: 'Ask about their build vs buy criteria. Understand the TCO of building internally.'
        },
        {
          objection: '"Our current solution handles this"',
          meaning: 'They haven\'t connected their pain to the limitations of their current solution',
          response: 'Ask specific questions about how they handle particular scenarios. Dig into gaps.'
        },
        {
          objection: '"I don\'t have budget for this"',
          meaning: 'Either truly constrained or you haven\'t established enough value',
          response: 'Ask about what they do have budget for. Understand their priority framework.'
        },
        {
          objection: '"Send me some information"',
          meaning: 'Polite way of ending without commitment. You haven\'t earned a next meeting.',
          response: 'Ask what specific information would be helpful. Try to understand what\'s missing.'
        }
      ]
    }
  ]
};

export const competitorGuide = {
  title: 'Competitive Intelligence',
  description: 'Know your competition and how to differentiate',
  intro: 'Understanding competitors helps you anticipate objections and position Okta effectively. Never badmouth competitors - acknowledge them professionally and differentiate on your strengths.',
  categories: {
    iga: {
      name: 'IGA Competitors',
      description: 'Identity Governance & Administration competitors',
      competitors: [
        {
          name: 'SailPoint',
          type: 'Market Leader',
          strengths: [
            'Most mature IGA platform',
            'Strong enterprise customer base (Fortune 500)',
            '300+ connectors',
            'AI-driven recommendations'
          ],
          weaknesses: [
            'Complex implementations - long deployment times',
            'Higher total cost of ownership',
            'Not unified with workforce identity (SSO/MFA separate)',
            'Heavy professional services dependency'
          ],
          differentiators: [
            'Okta is unified platform (IGA + Workforce Identity)',
            'Faster time to value - cloud-native from start',
            'Lower TCO without heavy PS requirements',
            'Better admin and end-user experience'
          ],
          handlers: {
            'SailPoint is the market leader': 'SailPoint has legacy market share, but the market is shifting to unified identity platforms. Many SailPoint customers are evaluating consolidation.',
            'SailPoint has more features': 'Feature depth matters, but so does time to value. Ask: How long did their implementation take? How much do they spend on PS annually?'
          }
        },
        {
          name: 'Saviynt',
          type: 'Cloud-Native Challenger',
          strengths: [
            'True cloud-native architecture',
            'Converged IGA + PAM',
            'Strong cloud infrastructure governance',
            'Competitive pricing vs SailPoint'
          ],
          weaknesses: [
            'Smaller market presence',
            'Variable implementation quality',
            'UI/UX not as polished',
            'Limited workforce identity capabilities'
          ],
          differentiators: [
            'Okta has stronger workforce identity foundation',
            'Better ecosystem and marketplace integrations',
            'More consistent global support',
            'Proven at larger scale'
          ],
          handlers: {
            'Saviynt has PAM too': 'Converged doesn\'t mean best-of-breed. How are they handling workforce identity? Most Saviynt customers still need separate SSO/MFA.',
            'Saviynt is cheaper': 'Compare total cost including implementation and ongoing maintenance. What\'s included in that price?'
          }
        },
        {
          name: 'Microsoft Entra ID Governance',
          type: 'Platform Bundling',
          strengths: [
            'Bundled with Microsoft 365 E5 (perceived as "free")',
            'Native integration with Microsoft ecosystem',
            'Growing feature set',
            'Familiar UI for Microsoft admins'
          ],
          weaknesses: [
            'Limited non-Microsoft application support',
            'Basic governance compared to dedicated IGA',
            'Access reviews are simplistic',
            'Not suitable for complex governance needs'
          ],
          differentiators: [
            'Okta provides governance across ALL apps, not just Microsoft',
            'Deeper IGA capabilities',
            'Better for heterogeneous environments',
            'Avoid Microsoft lock-in'
          ],
          handlers: {
            'We get it free with E5': 'It\'s included, but is it sufficient? What about non-Microsoft apps? Salesforce, Workday, ServiceNow? Those need governance too.',
            'We\'re standardizing on Microsoft': 'Most enterprises have 200+ apps, majority non-Microsoft. Entra ID Governance only covers a fraction.'
          }
        }
      ]
    },
    ai: {
      name: 'AI/Agent Security Competitors',
      description: 'Competitors in the AI and agentic identity space',
      competitors: [
        {
          name: 'Cloud Provider Native (AWS/Azure/GCP)',
          type: 'Platform Security',
          strengths: [
            'Native integration with their AI services',
            'No additional vendor required',
            'Included in cloud spend',
            'Familiar to cloud teams'
          ],
          weaknesses: [
            'Siloed per cloud - no cross-cloud view',
            'Basic identity governance',
            'No purpose-built agent security',
            'Doesn\'t handle multi-cloud or hybrid'
          ],
          differentiators: [
            'Unified identity across all clouds',
            'Purpose-built agent identity management',
            'Cross-cloud visibility and governance',
            'Works with any LLM provider'
          ],
          handlers: {
            'We use AWS/Azure native security': 'That works for one cloud. What about agents accessing systems across clouds? Or using multiple LLM providers?',
            'It\'s included with our cloud spend': 'Basic IAM is included. Agent-specific identity, governance, and compliance are different requirements.'
          }
        },
        {
          name: 'Platform Native (Salesforce, ServiceNow)',
          type: 'Embedded Security',
          strengths: [
            'Native integration with their platform',
            'Leverages existing permissions',
            'No additional cost',
            'Fast to deploy within that platform'
          ],
          weaknesses: [
            'Only works within that platform',
            'No cross-system agent governance',
            'Limited visibility into agent actions',
            'Can\'t handle multi-platform agents'
          ],
          differentiators: [
            'Agents don\'t stay within platform boundaries',
            'Cross-platform agent identity and governance',
            'Unified audit trail across all agent actions',
            'Handle agent-to-agent trust relationships'
          ],
          handlers: {
            'Salesforce Agentforce handles security': 'Within Salesforce, yes. But when agents need to access ServiceNow, Workday, or external APIs?',
            'Our platforms have their own security': 'They do for their own data. But modern agents are cross-functional. How do you govern an agent that touches 5 different systems?'
          }
        },
        {
          name: 'DIY / LangChain Auth',
          type: 'Build Your Own',
          strengths: [
            'Full control and customization',
            'No additional vendor cost',
            'Developer flexibility'
          ],
          weaknesses: [
            'Security burden on dev team',
            'No governance or compliance',
            'Maintenance overhead',
            'No audit trail',
            'Inconsistent implementation'
          ],
          differentiators: [
            'Don\'t reinvent the wheel on security',
            'Enterprise-grade from day one',
            'Compliance and audit built-in',
            'Let devs focus on AI, not auth'
          ],
          handlers: {
            'We\'ll build it ourselves': 'You can, but should you? Your devs should focus on AI capabilities, not reinventing identity. What\'s the TCO of DIY auth long-term?',
            'LangChain handles auth': 'LangChain provides patterns, not enterprise identity management. Who manages credentials? Who audits access?'
          }
        }
      ]
    }
  }
};

export const scenarioPlaybooks = {
  title: 'Scenario Playbooks',
  description: 'Tips for handling specific discovery scenarios',
  tracks: {
    sales: {
      name: 'Sales Scenarios',
      scenarios: [
        {
          id: 'audit-fire',
          name: 'Audit Finding',
          description: 'Organization just received audit findings',
          tips: [
            'Show urgency matches theirs - this is a real problem right now',
            'Ask specific questions about the findings (which controls failed?)',
            'Focus on time to remediation and what auditors need to see',
            'Offer quick wins while building toward sustainable solution',
            'Budget conversations are easier - there\'s clear justification'
          ],
          avoid: [
            'Being too salesy when they\'re under stress',
            'Minimizing the severity of their situation',
            'Overpromising on timeline without understanding scope'
          ],
          probeAreas: ['Specific audit findings', 'Remediation timeline', 'What auditors want to see', 'Previous remediation attempts']
        },
        {
          id: 'iga-replacement',
          name: 'Replacing Legacy IGA',
          description: 'Looking to replace existing solution',
          tips: [
            'Understand what went wrong with current solution',
            'Ask about implementation pain points and ongoing costs',
            'Focus on how to avoid repeating past mistakes',
            'Address migration concerns directly',
            'Discuss change management and user adoption'
          ],
          avoid: [
            'Bashing their current vendor (they chose it)',
            'Minimizing migration complexity',
            'Making promises you can\'t keep about timeline'
          ],
          probeAreas: ['Why current solution isn\'t working', 'Implementation experience', 'Ongoing maintenance burden', 'User adoption challenges']
        },
        {
          id: 'iga-first-time',
          name: 'First IGA Purchase',
          description: 'No formal IGA solution today',
          tips: [
            'Be patient with education on IGA concepts',
            'Understand their current manual processes in detail',
            'Paint a picture of what "good" looks like',
            'Start with their biggest pain points',
            'Suggest phased approach to reduce risk'
          ],
          avoid: [
            'Overwhelming them with features',
            'Assuming they know IGA terminology',
            'Pushing for a big bang deployment'
          ],
          probeAreas: ['Current manual processes', 'Biggest pain points', 'What triggered this evaluation', 'Resource constraints']
        }
      ]
    },
    technical: {
      name: 'Technical Scenarios',
      scenarios: [
        {
          id: 'cloud-migration',
          name: 'Cloud Migration',
          description: 'Migrating to cloud infrastructure',
          tips: [
            'Map their current state and target architecture',
            'Understand hybrid requirements during transition',
            'Align timeline with their migration milestones',
            'Discuss connector requirements for cloud services',
            'Address how to handle parallel environments'
          ],
          avoid: [
            'Assuming all cloud (may have hybrid needs)',
            'Ignoring their timeline constraints',
            'Forgetting about legacy systems that must persist'
          ],
          probeAreas: ['Cloud platforms in use', 'Migration timeline', 'Hybrid requirements', 'Legacy systems to support']
        },
        {
          id: 'devops',
          name: 'DevOps Integration',
          description: 'Need to fit developer workflows',
          tips: [
            'Lead with APIs and automation capabilities',
            'Ask about their CI/CD pipeline and tooling',
            'Discuss infrastructure-as-code patterns',
            'Understand their service account challenges',
            'Show respect for developer experience'
          ],
          avoid: [
            'Ignoring the importance of developer experience',
            'Suggesting manual processes for developer access',
            'Missing the GitOps/IaC requirements'
          ],
          probeAreas: ['CI/CD tooling', 'Infrastructure-as-code usage', 'Service account management', 'Developer self-service needs']
        }
      ]
    },
    aiAgents: {
      name: 'AI Agents Scenarios',
      scenarios: [
        {
          id: 'ai-cautious',
          name: 'AI Cautious Organization',
          description: 'Skeptical about AI, focused on risk',
          tips: [
            'Lead with security and compliance capabilities',
            'Reference specific regulations they might face (EU AI Act)',
            'Share proof points from similar cautious organizations',
            'Don\'t push AI adoption - focus on governance of existing AI',
            'Acknowledge their concerns are valid'
          ],
          avoid: [
            'Being too bullish on AI benefits',
            'Dismissing their security concerns',
            'Pushing faster AI adoption than they\'re ready for'
          ],
          probeAreas: ['Specific security concerns', 'Regulatory requirements', 'Shadow AI already happening', 'Board/leadership concerns']
        },
        {
          id: 'ai-native',
          name: 'AI Native Company',
          description: 'AI deeply embedded, needs to scale governance',
          tips: [
            'Skip AI basics - they know this space',
            'Ask technical questions about their architecture',
            'Discuss specific frameworks (LangChain, CrewAI)',
            'Focus on scaling governance without slowing innovation',
            'Be prepared for them to have built some of this already'
          ],
          avoid: [
            'Explaining AI fundamentals',
            'Generic security pitches',
            'Ignoring what they\'ve already built'
          ],
          probeAreas: ['Production agent challenges', 'Credential management approach', 'Multi-agent orchestration', 'MCP adoption plans']
        },
        {
          id: 'shadow-ai',
          name: 'Shadow AI Problem',
          description: 'Dealing with unauthorized AI deployments',
          tips: [
            'Focus on discovery and visibility capabilities',
            'Help them understand what they can see vs control',
            'Suggest quick wins to show progress',
            'Balance security with not alienating business teams',
            'Offer ways to govern without blocking innovation'
          ],
          avoid: [
            'Scaring them more about what they don\'t know',
            'Suggesting heavy-handed blocking approaches',
            'Ignoring the business pressure to move fast on AI'
          ],
          probeAreas: ['What they\'ve discovered so far', 'Business teams involved', 'Current visibility tools', 'Governance philosophy']
        }
      ]
    }
  }
};

export const learningTopics = [
  { id: 'fundamentals', name: 'Discovery Fundamentals', icon: 'compass' },
  { id: 'framework', name: 'Discovery Framework', icon: 'map' },
  { id: 'golden-questions', name: 'Golden Questions', icon: 'star' },
  { id: 'psychology', name: 'Stakeholder Psychology', icon: 'brain' },
  { id: 'competitors', name: 'Competitive Intelligence', icon: 'target' },
  { id: 'playbooks', name: 'Scenario Playbooks', icon: 'book' }
];
