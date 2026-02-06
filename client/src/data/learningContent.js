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
  title: 'AI Security Discovery Framework',
  description: 'Structured approach for AI security discovery',
  tracks: {
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
        },
        {
          id: 'product_fit',
          name: 'Product Fit (Okta vs Auth0)',
          description: 'Determine which products fit their use cases',
          questions: [
            'Who are the users of your AI applications - employees or customers?',
            'Are you building internal AI tools for your workforce, or customer-facing AI products, or both?',
            'Do you have existing Okta Workforce Identity deployed today?',
            'What\'s more important to you - governance and compliance, or developer speed and flexibility?',
            'How are you thinking about multi-cloud vs single-cloud for AI deployments?'
          ],
          signals: ['Identifies workforce vs customer use cases', 'Mentions existing identity infrastructure', 'Describes budget and decision criteria'],
          productGuidance: {
            oktaIndicators: [
              'Employees using AI tools (ChatGPT Enterprise, Copilot)',
              'Shadow AI discovery needs',
              'Compliance and governance focus (CISO-driven)',
              'Existing Okta Workforce Identity deployment',
              'Enterprise with formal procurement process'
            ],
            auth0Indicators: [
              'Customer-facing AI applications (B2C, B2B2C)',
              'Developer-led AI product development',
              'Need for Token Vault (agent credential storage)',
              'RAG pipeline security requirements (Auth0 FGA)',
              'Fast-moving startups or product teams'
            ],
            bothIndicators: [
              'Large enterprise with both workforce and customer AI',
              'Internal AI governance + customer-facing AI products',
              'Different buyers (CISO for Okta, CTO for Auth0)'
            ]
          }
        },
        // New discovery areas based on Robinhood transcript analysis
        {
          id: 'token_exchange_patterns',
          name: 'Token Exchange Patterns',
          description: 'Understand their token exchange needs (ID-JAG, OBO, CIBA)',
          questions: [
            'How are you handling token exchange when agents access APIs on behalf of users?',
            'Do you need to preserve user context when services call other services?',
            'Are there scenarios where you need step-up authentication for sensitive operations?',
            'How do agents get tokens to access downstream services?',
            'What happens when an agent needs to act on behalf of a user who initiated the request?'
          ],
          signals: ['Mentions OBO flows', 'Describes token exchange needs', 'Asks about user context preservation', 'Needs step-up auth for sensitive ops'],
          technicalContext: {
            idJag: {
              name: 'ID-JAG (Identity Assertion JWT)',
              description: 'Short-lived, one-time token for AI agent token exchange via Cross App Access (XAA)',
              useCase: 'Agent needs to access a resource on behalf of itself (workload identity)',
              flow: 'Agent → Okta (client credentials + ID-JAG) → Access token for downstream service'
            },
            obo: {
              name: 'On-Behalf-Of Token Exchange',
              description: 'Retain user context when service-to-service calls occur',
              useCase: 'Microservice architecture where user identity must flow through the chain',
              flow: 'User token → Service A → OBO exchange → Service B (with user context preserved)'
            },
            ciba: {
              name: 'CIBA (Client-Initiated Backchannel Authentication)',
              description: 'Step-up authentication requiring human approval on separate device',
              useCase: 'Sensitive operations (PII access, financial transactions) requiring out-of-band approval',
              flow: 'Agent requests sensitive op → CIBA push to user device → User approves → Agent proceeds'
            }
          }
        },
        {
          id: 'multi_agent_architecture',
          name: 'Multi-Agent Architecture',
          description: 'Understand their agent-to-agent patterns',
          questions: [
            'Do you have agents that need to call other agents?',
            'How do agents verify other agents are legitimate before trusting them?',
            'What\'s your orchestration layer for multi-agent workflows?',
            'How do you handle chain-of-custody for requests that flow through multiple agents?',
            'Are you using any agent frameworks like LangGraph, CrewAI, or AutoGen?'
          ],
          signals: ['Describes multi-agent patterns', 'Asks about agent-to-agent trust', 'Mentions orchestration challenges', 'Uses agent frameworks'],
          technicalContext: {
            workloadPrinciple: 'Each agent has its own identity (client_id in tokens) - the Workload Principle',
            managedConnections: 'IT admin defines which resources each agent can access via Managed Connections',
            resourceTypes: ['Authorization server (OAuth scopes)', 'Secret (API keys)', 'Service account (impersonation)'],
            trustPatterns: ['Agent verifies calling agent\'s client_id', 'Scope-based authorization', 'Audit trail of agent chain']
          }
        },
        {
          id: 'third_party_integrations',
          name: 'Third-Party MCP Integrations',
          description: 'Understand governance needs for external tool access',
          questions: [
            'What third-party MCP servers are your agents connecting to?',
            'How do you govern what external tools agents can access?',
            'Are vendors like Atlassian, PagerDuty, or Slack providing MCP servers you need to integrate?',
            'How do you translate your internal ACLs to third-party permission models?',
            'What happens when a third-party MCP server returns data the user shouldn\'t see?'
          ],
          signals: ['Names third-party MCP providers', 'Describes ACL translation challenges', 'Worried about data leakage', 'Needs external tool governance'],
          technicalContext: {
            challenge: 'Third-party MCP servers may not respect your internal permission model',
            solution: 'Use XAA to control what resources agents can access, regardless of MCP server',
            aclTranslation: 'Map internal roles/permissions to third-party-specific scopes',
            auditNeeds: 'Log all third-party tool access for compliance and incident response'
          }
        }
      ],
      flow: [
        { step: 1, area: 'ai_initiatives', goal: 'Understand their AI journey' },
        { step: 2, area: 'agent_use_cases', goal: 'Identify specific scenarios' },
        { step: 3, area: 'current_approach', goal: 'Map current state' },
        { step: 4, area: 'security_concerns', goal: 'Uncover worries' },
        { step: 5, area: 'mcp_tool_access', goal: 'Understand tool patterns' },
        { step: 6, area: 'token_exchange_patterns', goal: 'Understand token exchange needs' },
        { step: 7, area: 'multi_agent_architecture', goal: 'Map agent-to-agent patterns' },
        { step: 8, area: 'third_party_integrations', goal: 'Assess external tool governance' },
        { step: 9, area: 'shadow_ai', goal: 'Assess visibility' },
        { step: 10, area: 'governance_needs', goal: 'Define compliance needs' },
        { step: 11, area: 'product_fit', goal: 'Determine Okta vs Auth0 fit' },
        { step: 12, area: 'timeline', goal: 'Establish urgency' },
        { step: 13, area: 'decision_process', goal: 'Map stakeholders' }
      ]
    }
  }
};

export const goldenQuestions = {
  title: 'Golden Questions',
  description: 'High-impact questions that unlock multiple discovery areas and lead to product recommendations',
  intro: 'Golden questions are open-ended questions that encourage stakeholders to share context, reveal priorities, and open new conversation threads. They work because they show genuine curiosity and give stakeholders control over what to share. The best questions naturally lead to Okta or Auth0 product fit.',
  tracks: {
    aiAgents: {
      questions: [
        {
          question: 'Where is AI in your technology roadmap?',
          why: 'Reveals strategic priority and leadership buy-in. Shows if AI is a priority or experiment.',
          unlocks: ['ai_initiatives', 'timeline', 'decision_process'],
          productHint: 'Early stage → Okta ISPM for shadow AI. Advanced stage → Okta Agent Identity or Auth0 Token Vault.'
        },
        {
          question: 'Who are the users of your AI applications - your employees or your customers?',
          why: 'Critical for product selection. Workforce = Okta, Customers = Auth0, Both = Both products.',
          unlocks: ['agent_use_cases', 'product_fit', 'decision_process'],
          productHint: 'Employees → Okta Workforce Identity for AI. Customers → Auth0 for GenAI Applications. Both → Recommend both products.'
        },
        {
          question: 'What specific agent use cases are you exploring?',
          why: 'Gets concrete examples instead of abstract discussions. Reveals maturity level and product fit.',
          unlocks: ['agent_use_cases', 'security_concerns', 'current_approach', 'product_fit'],
          productHint: 'Internal agents → Okta. Customer-facing agents → Auth0. Autonomous agents → Either (depends on governance vs developer focus).'
        },
        {
          question: 'What keeps you up at night about AI security?',
          why: 'Reveals their specific fears and priorities. Shows what to address first.',
          unlocks: ['security_concerns', 'governance_needs', 'shadow_ai'],
          productHint: 'Shadow AI → Okta ISPM. Data exposure → Auth0 FGA. Credential management → Auth0 Token Vault.'
        },
        {
          question: 'How are your agents accessing tools and data today?',
          why: 'Gets into technical implementation. Reveals MCP usage and credential patterns.',
          unlocks: ['mcp_tool_access', 'current_approach', 'security_concerns'],
          productHint: 'Hardcoded credentials → Auth0 Token Vault. DIY OAuth → Okta Agent Identity. MCP servers → Auth0 XAA.'
        },
        {
          question: 'Do you have visibility into all AI tools in your organization?',
          why: 'Opens shadow AI discussion. Usually reveals gaps they\'re concerned about.',
          unlocks: ['shadow_ai', 'governance_needs', 'security_concerns'],
          productHint: 'No visibility → Okta ISPM for AI (OAuth grant monitoring). Clear Okta product fit.'
        },
        {
          question: 'What happens when an agent needs to access something it shouldn\'t?',
          why: 'Tests their thinking about agent governance. Reveals maturity of approach.',
          unlocks: ['security_concerns', 'governance_needs', 'current_approach'],
          productHint: 'Need policy engine → Okta AI Governance. Need fine-grained permissions → Auth0 FGA.'
        },
        {
          question: 'Are you building this AI application for internal use or as a product feature for your customers?',
          why: 'Direct product selection question. Internal = Okta territory, Product = Auth0 territory.',
          unlocks: ['agent_use_cases', 'product_fit', 'decision_process'],
          productHint: 'Internal → Okta Workforce Identity + ISPM. Product → Auth0 for GenAI + Token Vault + FGA.'
        },
        {
          question: 'Do you already have Okta Workforce Identity or another enterprise identity platform?',
          why: 'Existing Okta deployment makes Okta AI products easier to justify (extend existing investment).',
          unlocks: ['current_approach', 'product_fit', 'decision_process'],
          productHint: 'Existing Okta → Easy upsell for Okta AI products. No Okta → Consider Auth0 for developer-friendly approach.'
        },
        // New golden questions based on Robinhood transcript
        {
          question: 'How do you handle token exchange when an agent needs to access a downstream service on behalf of a user?',
          why: 'Reveals their token exchange sophistication. Most teams struggle with OBO flows and preserving user context.',
          unlocks: ['token_exchange_patterns', 'current_approach', 'security_concerns'],
          productHint: 'Custom DIY → XAA with ID-JAG. User context needed → OBO Token Exchange. Sensitive ops → CIBA for step-up auth.'
        },
        {
          question: 'What happens when one agent needs to call another agent - how do you establish trust?',
          why: 'Multi-agent architectures are common but agent-to-agent auth is often overlooked. Opens product conversations.',
          unlocks: ['multi_agent_architecture', 'security_concerns', 'agent_use_cases'],
          productHint: 'No agent-to-agent trust → Agent Identity for each workload. Orchestrator patterns → XAA for delegation.'
        },
        {
          question: 'What third-party MCP servers are you integrating with, and how do you govern that access?',
          why: 'External tools like Atlassian, PagerDuty MCP servers need governance. Often reveals compliance gaps.',
          unlocks: ['third_party_integrations', 'mcp_tool_access', 'governance_needs'],
          productHint: 'No governance → ISPM for visibility. ACL translation challenges → XAA for controlled access.'
        },
        {
          question: 'Are there scenarios where your agent needs human approval before proceeding with a sensitive operation?',
          why: 'Step-up auth for AI is an emerging need. CIBA enables out-of-band approval without blocking the agent.',
          unlocks: ['token_exchange_patterns', 'security_concerns', 'governance_needs'],
          productHint: 'Sensitive ops need approval → CIBA for transactional verification. Audit requirements → Agent Identity with logging.'
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
  description: 'Know your competition and how to differentiate Okta & Auth0',
  intro: 'Understanding competitors helps you anticipate objections and position Okta and Auth0 effectively. Never badmouth competitors - acknowledge them professionally and differentiate on your strengths. Know when to recommend Okta (workforce/governance) vs Auth0 (CIAM/developer) vs both.',
  categories: {
    ai: {
      name: 'AI/Agent Security Competitors',
      description: 'Competitors in the AI and agentic identity space',
      competitors: [
        {
          name: 'Microsoft Entra ID (Azure AD)',
          type: 'Enterprise Identity Platform',
          strengths: [
            'Microsoft 365 integration',
            'Conditional Access policies',
            'Existing enterprise licensing',
            'Familiar to IT teams'
          ],
          weaknesses: [
            'No AI-specific features (no agent identity, no shadow AI discovery)',
            'Limited CIAM capabilities (not for customer-facing AI apps)',
            'Complex to configure for agentic workflows',
            'Microsoft ecosystem lock-in'
          ],
          oktaAdvantages: [
            'Okta ISPM for AI - purpose-built shadow AI discovery (OAuth grant monitoring)',
            'Okta Agent Identity - machine identity management for autonomous agents',
            'Cloud-agnostic (works across AWS, Azure, GCP)',
            'Better for multi-cloud AI deployments'
          ],
          auth0Advantages: [
            'Auth0 for customer-facing AI apps (B2C, B2B2C) - Entra is workforce-focused',
            'Auth0 Token Vault - purpose-built for AI agent credentials',
            'Auth0 FGA - fine-grained authorization for RAG pipelines',
            'Developer-friendly (Entra has steep learning curve)'
          ],
          handlers: {
            'We already have Microsoft Entra': 'Entra is great for workforce identity. But does it discover shadow AI usage? Does it have purpose-built agent identity? Does it handle customer-facing AI apps?',
            'Entra is included with Microsoft 365': 'Workforce identity is included. AI-specific features like shadow AI discovery, agent credential management, and CIAM for AI apps are different requirements.',
            'We\'re a Microsoft shop': 'Okta integrates with Microsoft 365. Auth0 complements Entra for customer-facing AI. You can have both - Entra for employees, Okta/Auth0 for AI.'
          }
        },
        {
          name: 'AWS IAM + Cognito',
          type: 'Cloud Platform Security',
          strengths: [
            'Native AWS integration',
            'No additional vendor required',
            'Included in cloud spend',
            'Familiar to AWS teams'
          ],
          weaknesses: [
            'AWS-only (no cross-cloud support)',
            'Not purpose-built for AI agents',
            'Cognito is complex for developers',
            'No shadow AI discovery or governance'
          ],
          oktaAdvantages: [
            'Cross-cloud support (AWS, Azure, GCP)',
            'Okta Agent Identity works with any cloud provider',
            'Okta ISPM discovers shadow AI across all environments',
            'Unified governance across multi-cloud AI deployments'
          ],
          auth0Advantages: [
            'Auth0 is cloud-agnostic (not locked to AWS)',
            'Auth0 Token Vault - better developer experience than AWS Secrets Manager',
            'Auth0 for customer-facing AI apps - Cognito is complex and limited',
            'Auth0 FGA for RAG security - purpose-built for AI, not generic IAM'
          ],
          handlers: {
            'We use AWS IAM for everything': 'That works for AWS resources. But what about agents accessing Azure, GCP, or on-prem systems? What about customer-facing AI apps?',
            'Cognito handles user auth': 'Cognito is for user authentication. Auth0 is purpose-built for AI agent workflows - Token Vault, async auth, agent delegation.',
            'We don\'t want another vendor': 'Fair concern. But AWS IAM isn\'t designed for agentic workflows. What\'s the cost of building custom solutions vs using purpose-built tools?'
          }
        },
        {
          name: 'Ping Identity',
          type: 'Legacy IAM Vendor',
          strengths: [
            'Established enterprise vendor',
            'On-prem deployment options',
            'Federal compliance (FedRAMP)'
          ],
          weaknesses: [
            'Legacy architecture (not cloud-native)',
            'No AI-specific features',
            'Poor developer experience',
            'Slow innovation cycle',
            'Complex and expensive'
          ],
          oktaAdvantages: [
            'Modern, cloud-native architecture',
            'Purpose-built AI features (ISPM, Agent Identity, AI Governance)',
            'Faster innovation cycle (quarterly releases)',
            'Better user experience for admins and developers'
          ],
          auth0Advantages: [
            'Developer-first approach (Ping is IT-admin focused)',
            'Auth0 Token Vault and FGA don\'t exist in Ping',
            'Modern APIs and SDKs (Ping is legacy)',
            'Purpose-built for customer-facing AI apps'
          ],
          handlers: {
            'We\'re a Ping customer already': 'Ping is solid for traditional IAM. But does it have shadow AI discovery? Agent identity? Token Vault? You can complement Ping with Okta/Auth0 for AI.',
            'Ping is FedRAMP certified': 'Okta is also FedRAMP authorized. Auth0 is for commercial/CIAM use cases. Which AI workloads need FedRAMP vs commercial security?',
            'We don\'t want to switch vendors': 'You don\'t have to. Okta/Auth0 can complement Ping for AI-specific use cases. Keep Ping for legacy, add Okta/Auth0 for AI.'
          }
        },
        {
          name: 'Pangea (API Security Startup)',
          type: 'AI Security Startup',
          strengths: [
            'Developer-friendly APIs',
            'Purpose-built for AI',
            'Fast integration',
            'AI Guard feature (prompt injection protection)'
          ],
          weaknesses: [
            'Small startup (funding risk, longevity unclear)',
            'Limited enterprise governance features',
            'No workforce identity (only CIAM)',
            'Point solution (not full identity platform)',
            'Limited compliance certifications'
          ],
          oktaAdvantages: [
            'Enterprise-grade platform with proven scale',
            'Comprehensive AI governance (not just API security)',
            'Okta Workforce Identity for employee AI tools (Pangea doesn\'t have)',
            'SOC2, ISO 27001, FedRAMP certified'
          ],
          auth0Advantages: [
            'Auth0 is Okta-owned (enterprise backing, not startup risk)',
            'More comprehensive CIAM platform (not just AI)',
            'Better ecosystem (integrations, marketplace)',
            'Proven at scale (thousands of production customers)'
          ],
          handlers: {
            'Pangea is purpose-built for AI': 'So is Auth0 Token Vault and Okta Agent Identity. But Pangea is a point solution. What about workforce identity? Shadow AI discovery? Audit compliance?',
            'Pangea has AI Guard for prompt injection': 'That\'s application security, not identity security. Different layers. Auth0/Okta handle identity, authentication, authorization.',
            'Pangea is cheaper': 'Lower cost upfront, but is it enterprise-ready? What\'s the risk of a startup pivot or shutdown? What about compliance certifications?'
          }
        },
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
          oktaAdvantages: [
            'Unified identity across all clouds',
            'Purpose-built agent identity management',
            'Cross-cloud visibility and governance',
            'Works with any LLM provider'
          ],
          auth0Advantages: [
            'Auth0 is cloud-agnostic',
            'Better for customer-facing AI apps (AWS Cognito is complex)',
            'Auth0 Token Vault - purpose-built for agents',
            'Developer-friendly vs cloud-native IAM complexity'
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
          oktaAdvantages: [
            'Agents don\'t stay within platform boundaries',
            'Cross-platform agent identity and governance',
            'Unified audit trail across all agent actions',
            'Handle agent-to-agent trust relationships'
          ],
          auth0Advantages: [
            'Auth0 for customer-facing agents (Salesforce is internal-only)',
            'Auth0 Token Vault for agents accessing multiple platforms',
            'Auth0 XAA for cross-app agent delegation'
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
            'Inconsistent implementation',
            'Risk of credential exposure'
          ],
          oktaAdvantages: [
            'Don\'t reinvent the wheel on security',
            'Enterprise-grade from day one',
            'Compliance and audit built-in',
            'Okta Agent Identity - proven at scale'
          ],
          auth0Advantages: [
            'Auth0 Token Vault - purpose-built for agent credentials',
            'Let devs focus on AI, not auth plumbing',
            'Auth0 FGA - don\'t build custom authorization logic',
            'Developer-friendly but enterprise-secure'
          ],
          handlers: {
            'We\'ll build it ourselves': 'You can, but should you? Your devs should focus on AI capabilities, not reinventing identity. What\'s the TCO of DIY auth long-term?',
            'LangChain handles auth': 'LangChain provides patterns, not enterprise identity management. Who manages credentials? Who audits access? Auth0 Token Vault integrates with LangChain.',
            'We don\'t want vendor lock-in': 'Fair. But building custom auth creates technical debt. Auth0 uses OAuth standards - you can migrate if needed. DIY auth is harder to migrate.'
          }
        }
      ]
    },
    oktaVsAuth0: {
      name: 'Okta vs Auth0: When to Use Which',
      description: 'Guide to positioning Okta and Auth0 products for different use cases',
      positioning: [
        {
          scenario: 'Workforce AI Tools (Internal)',
          description: 'Employees using ChatGPT Enterprise, Copilot, internal AI assistants',
          recommendation: 'Okta',
          products: [
            'Okta Workforce Identity for AI - SSO for employee AI tools',
            'Okta ISPM for AI - Shadow AI discovery (OAuth grant monitoring)',
            'Okta AI Governance - Audit and compliance for internal AI'
          ],
          reasoning: 'Okta is purpose-built for workforce identity. Extends existing Okta deployment. Focused on governance and compliance.',
          buyer: 'CISO, VP of IT, Compliance Officer'
        },
        {
          scenario: 'Customer-Facing AI Applications',
          description: 'AI chatbots, customer service agents, B2C/B2B2C AI products',
          recommendation: 'Auth0',
          products: [
            'Auth0 for GenAI Applications - User authentication for AI apps',
            'Auth0 Token Vault - Secure agent credentials for customer data access',
            'Auth0 FGA - Fine-grained authorization for multi-tenant AI'
          ],
          reasoning: 'Auth0 is purpose-built for CIAM (Customer Identity and Access Management). Developer-friendly, fast integration, scales for consumer apps.',
          buyer: 'CTO, VP Engineering, Product Manager, CAIO'
        },
        {
          scenario: 'Autonomous AI Agents (Machine Identity)',
          description: 'Production agents with their own identity, agent-to-service auth',
          recommendation: 'Okta or Auth0',
          products: [
            'Okta Identity for AI Agents - Enterprise-grade machine identity, governance',
            'Auth0 Token Vault + XAA - Developer-friendly agent credentials and delegation'
          ],
          reasoning: 'Choose Okta for enterprise governance focus. Choose Auth0 for developer experience focus. Both support machine identity for agents.',
          buyer: 'CTO, Platform Engineer, AI Platform Lead'
        },
        {
          scenario: 'Hybrid: Internal + Customer AI',
          description: 'Enterprise with both employee AI tools AND customer-facing AI products',
          recommendation: 'Both Okta and Auth0',
          products: [
            'Okta Workforce Identity + ISPM for internal AI governance',
            'Auth0 for GenAI + Token Vault + FGA for customer-facing AI'
          ],
          reasoning: 'Large enterprises often need both. Okta for workforce, Auth0 for customers. Two distinct identity domains.',
          buyer: 'CISO + CTO + CAIO (cross-functional decision)'
        },
        {
          scenario: 'RAG Pipeline Security',
          description: 'Secure retrieval augmented generation with permission-aware filtering',
          recommendation: 'Auth0',
          products: [
            'Auth0 FGA (Fine-Grained Authorization) - Relationship-based access control',
            'Auth0 Token Vault - Secure agent access to vector databases'
          ],
          reasoning: 'Auth0 FGA is purpose-built for dynamic, relationship-based permissions. ReBAC model handles "show user only documents they can access."',
          buyer: 'Data Science Manager, AI Platform Lead, ML Engineer'
        },
        {
          scenario: 'Shadow AI Discovery',
          description: 'Find out what AI tools employees are using without IT approval',
          recommendation: 'Okta',
          products: [
            'Okta ISPM for AI - Browser OAuth grant monitoring',
            'Okta Workforce Identity - Enforce SSO for approved AI tools'
          ],
          reasoning: 'Okta ISPM discovers shadow AI through OAuth grant visibility. Then enforce governance with Okta Workforce Identity.',
          buyer: 'CISO, VP of IT, Compliance Officer'
        }
      ]
    }
  }
};

export const scenarioPlaybooks = {
  title: 'Scenario Playbooks',
  description: 'Tips for handling specific AI security discovery scenarios',
  tracks: {
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
