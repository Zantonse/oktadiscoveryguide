// Flashcard content for the Discovery Guide drill mode
// Extracted and organized from learning content for quick drilling

export const flashcards = {
  aiAgents: {
    golden: [
      {
        id: 'ai-golden-1',
        front: 'Understanding AI strategy',
        back: 'Where is AI in your technology roadmap?',
        why: 'Reveals strategic priority and leadership buy-in. Shows if AI is a priority or experiment.',
        unlocks: ['ai_initiatives', 'timeline', 'decision_process'],
      },
      {
        id: 'ai-golden-2',
        front: 'Getting concrete examples',
        back: 'What specific agent use cases are you exploring?',
        why: 'Gets concrete examples instead of abstract discussions. Reveals maturity level.',
        unlocks: ['agent_use_cases', 'security_concerns', 'current_approach'],
      },
      {
        id: 'ai-golden-3',
        front: 'Uncovering security fears',
        back: 'What keeps you up at night about AI security?',
        why: 'Reveals their specific fears and priorities. Shows what to address first.',
        unlocks: ['security_concerns', 'governance_needs', 'shadow_ai'],
      },
      {
        id: 'ai-golden-4',
        front: 'Understanding tool access patterns',
        back: 'How are your agents accessing tools and data today?',
        why: 'Gets into technical implementation. Reveals MCP usage and credential patterns.',
        unlocks: ['mcp_tool_access', 'current_approach', 'security_concerns'],
      },
      {
        id: 'ai-golden-5',
        front: 'Assessing shadow AI visibility',
        back: 'Do you have visibility into all AI tools in your organization?',
        why: "Opens shadow AI discussion. Usually reveals gaps they're concerned about.",
        unlocks: ['shadow_ai', 'governance_needs', 'security_concerns'],
      },
      {
        id: 'ai-golden-6',
        front: 'Testing governance maturity',
        back: "What happens when an agent needs to access something it shouldn't?",
        why: 'Tests their thinking about agent governance. Reveals maturity of approach.',
        unlocks: ['security_concerns', 'governance_needs', 'current_approach'],
      },
      // New golden questions based on Robinhood transcript
      {
        id: 'ai-golden-7',
        front: 'Understanding token exchange needs',
        back: 'How do you handle token exchange when an agent needs to access a downstream service on behalf of a user?',
        why: 'Reveals their token exchange sophistication. Most teams struggle with OBO flows.',
        unlocks: ['token_exchange_patterns', 'current_approach', 'security_concerns'],
      },
      {
        id: 'ai-golden-8',
        front: 'Understanding multi-agent trust',
        back: 'What happens when one agent needs to call another agent - how do you establish trust?',
        why: 'Multi-agent architectures are common but agent-to-agent auth is often overlooked.',
        unlocks: ['multi_agent_architecture', 'security_concerns', 'agent_use_cases'],
      },
      {
        id: 'ai-golden-9',
        front: 'Understanding third-party MCP governance',
        back: 'What third-party MCP servers are you integrating with, and how do you govern that access?',
        why: 'External tools like Atlassian, PagerDuty MCP servers need governance.',
        unlocks: ['third_party_integrations', 'mcp_tool_access', 'governance_needs'],
      },
      {
        id: 'ai-golden-10',
        front: 'Understanding step-up auth needs',
        back: 'Are there scenarios where your agent needs human approval before proceeding with a sensitive operation?',
        why: 'Step-up auth for AI is an emerging need. CIBA enables out-of-band approval.',
        unlocks: ['token_exchange_patterns', 'security_concerns', 'governance_needs'],
      },
      // New golden questions based on real customer discovery transcripts
      {
        id: 'ai-golden-11',
        front: 'Exposing the OAuth vs Agent Identity gap',
        back: "How is what you've built for AI agent auth different from a regular OAuth client ID and secret?",
        why: 'This is the #1 question real customers ask. Reveals whether they understand workload principal vs regular OAuth.',
        unlocks: ['current_approach', 'token_exchange_patterns', 'agent_use_cases'],
      },
      {
        id: 'ai-golden-12',
        front: 'Uncovering brokered consent gaps',
        back: 'For third-party services like Salesforce or Asana, do users log in and authorize separately, or does that go through your identity provider?',
        why: 'Exposes the brokered consent gap. Most orgs have separate OAuth flows that bypass their IDP.',
        unlocks: ['third_party_integrations', 'token_exchange_patterns', 'security_concerns'],
      },
      {
        id: 'ai-golden-13',
        front: 'Understanding incremental build patterns',
        back: 'Did your team design the agent security architecture up front, or did it evolve piece by piece?',
        why: 'Most teams build incrementally and realize they need to step back. Validates their experience.',
        unlocks: ['current_approach', 'agent_use_cases', 'security_concerns'],
      },
      {
        id: 'ai-golden-14',
        front: 'Testing user context visibility',
        back: 'When you look at your agent architecture, do you have visibility into the user who initiated the request all the way through to the downstream resource?',
        why: 'Tests whether they understand the workload principal + subject relationship. Many lose user context.',
        unlocks: ['token_exchange_patterns', 'security_concerns', 'multi_agent_architecture'],
      },
      // Golden questions from Aryaka and Hunter transcripts
      {
        id: 'ai-golden-15',
        front: 'Justifying switch from open-source auth',
        back: 'What value would justify moving from your current auth solution to something purpose-built for AI agents?',
        why: 'Customers on Keycloak/open-source need to see value beyond basic auth. Find the gaps as they scale AI.',
        unlocks: ['current_approach', 'agent_use_cases', 'product_fit'],
      },
      {
        id: 'ai-golden-16',
        front: 'Understanding authz timing in agent pipeline',
        back: 'Does your authorization check happen when the agent analyzes the prompt to decide which tools to use, or when it actually makes the API call?',
        why: 'Sophisticated question that reveals deep understanding. Most teams only check at API time and miss prompt-time filtering.',
        unlocks: ['security_concerns', 'mcp_tool_access', 'token_exchange_patterns'],
      },
      {
        id: 'ai-golden-17',
        front: 'Training-based vs technical governance',
        back: 'Are your AI governance controls mostly training and policy, or do you have technical enforcement?',
        why: "Many orgs rely on training only. Technical controls (ISPM) fill the gap that training can't.",
        unlocks: ['governance_needs', 'shadow_ai', 'security_concerns'],
      },
      {
        id: 'ai-golden-18',
        front: 'Productivity tools vs app-integrated agents',
        back: 'Are your agents just being used as productivity tools today, or are any of them actually integrated with internal applications and data?',
        why: 'Reveals maturity level. Copilot/ChatGPT for productivity is very different from agents connected to internal apps.',
        unlocks: ['agent_use_cases', 'ai_initiatives', 'timeline'],
      },
      // New golden questions from 23 real customer discovery transcripts
      {
        id: 'ai-golden-19',
        front: 'Universal agent inventory question',
        back: 'How many AI agents exist in your organization today?',
        why: "The universal opener. 70% of CISOs can't answer this. Reveals ISPM need immediately and shows shadow AI visibility gap.",
        unlocks: ['shadow_ai', 'governance_needs', 'ai_initiatives'],
      },
      {
        id: 'ai-golden-20',
        front: 'Getting concrete architecture',
        back: 'Walk me through how one of your agents works end-to-end — from user input to API call to data response.',
        why: 'Gets concrete instead of abstract. Forces them to reveal architecture gaps, token exchange patterns, and governance holes.',
        unlocks: ['agent_use_cases', 'mcp_tool_access', 'current_approach', 'security_concerns'],
      },
      {
        id: 'ai-golden-21',
        front: 'The #1 FGA discovery question',
        back: 'Does the agent inherit the full permissions of the user or developer who created it, or do you scope it down?',
        why: 'THE #1 discovery question across all 23 transcripts. FGA is universally needed but rarely explicitly controlled.',
        unlocks: ['security_concerns', 'governance_needs', 'mcp_tool_access'],
      },
      {
        id: 'ai-golden-22',
        front: 'Testing governance maturity — lifecycle reviews',
        back: 'Are you adding lifecycle reviews, access reviews, or revocation processes specifically for your AI agents?',
        why: "Tests governance maturity. Most organizations haven't thought about agent lifecycle beyond creation.",
        unlocks: ['governance_needs', 'security_concerns', 'current_approach'],
      },
      {
        id: 'ai-golden-23',
        front: 'AI classification maturity question',
        back: 'Would you classify your AI as summarization, creative, or autonomous? Which category has the most agents?',
        why: "Uses customer's own language for AI categorization. Reveals where they are on maturity spectrum and which products matter most.",
        unlocks: ['ai_initiatives', 'agent_use_cases', 'security_concerns'],
      },
      {
        id: 'ai-golden-24',
        front: 'Third-party MCP consent gap',
        back: "What happens when your agent needs to access a system that's not behind your IDP — like a third-party Salesforce or Atlassian MCP server?",
        why: 'Exposes the brokered consent gap. Most teams have separate OAuth flows that bypass their IDP entirely.',
        unlocks: [
          'mcp_tool_access',
          'third_party_integrations',
          'security_concerns',
          'current_approach',
        ],
      },
    ],
    discovery: [
      {
        id: 'ai-disc-1',
        front: 'AI Initiatives: Current projects',
        back: 'What AI or GenAI initiatives are you working on?',
        area: 'ai_initiatives',
      },
      {
        id: 'ai-disc-2',
        front: 'AI Initiatives: Leadership perspective',
        back: 'How is leadership thinking about AI adoption?',
        area: 'ai_initiatives',
      },
      {
        id: 'ai-disc-3',
        front: 'Agent Use Cases: Specific scenarios',
        back: 'Are these customer-facing or internal agents?',
        area: 'agent_use_cases',
      },
      {
        id: 'ai-disc-4',
        front: 'Agent Use Cases: System access needs',
        back: 'What systems would agents need to access?',
        area: 'agent_use_cases',
      },
      {
        id: 'ai-disc-5',
        front: 'Agent Use Cases: Autonomy level',
        back: 'How autonomous would these agents be?',
        area: 'agent_use_cases',
      },
      {
        id: 'ai-disc-6',
        front: 'MCP & Tool Access: Protocol familiarity',
        back: 'Are you familiar with MCP (Model Context Protocol)?',
        area: 'mcp_tool_access',
      },
      {
        id: 'ai-disc-7',
        front: 'MCP & Tool Access: Credential management',
        back: 'How do you manage agent credentials for tool access?',
        area: 'mcp_tool_access',
      },
      {
        id: 'ai-disc-8',
        front: 'Security Concerns: Data access',
        back: 'How are you thinking about data access controls for agents?',
        area: 'security_concerns',
      },
      {
        id: 'ai-disc-9',
        front: 'Security Concerns: Agent misbehavior',
        back: 'What happens if an agent goes rogue or misbehaves?',
        area: 'security_concerns',
      },
      {
        id: 'ai-disc-10',
        front: 'Security Concerns: Auditing',
        back: 'How do you audit what agents are doing?',
        area: 'security_concerns',
      },
      {
        id: 'ai-disc-11',
        front: 'Governance: Regulations',
        back: 'Are you tracking the EU AI Act or other regulations?',
        area: 'governance_needs',
      },
      {
        id: 'ai-disc-12',
        front: 'Governance: Documentation needs',
        back: 'What documentation do you need for AI systems?',
        area: 'governance_needs',
      },
      {
        id: 'ai-disc-13',
        front: 'Shadow AI: Visibility',
        back: 'Are teams deploying AI without going through IT?',
        area: 'shadow_ai',
      },
      {
        id: 'ai-disc-14',
        front: 'Shadow AI: Discovery',
        back: 'How do you discover new AI agents being created?',
        area: 'shadow_ai',
      },
      {
        id: 'ai-disc-15',
        front: 'Current Approach: Authentication',
        back: 'How are you handling AI authentication today?',
        area: 'current_approach',
      },
      {
        id: 'ai-disc-16',
        front: 'Current Approach: Build vs Buy',
        back: 'Are you building custom auth or using existing solutions?',
        area: 'current_approach',
      },
      // New discovery cards based on Robinhood transcript
      {
        id: 'ai-disc-17',
        front: 'Token Exchange: Agent-to-service access',
        back: 'How do agents get tokens to access downstream services?',
        area: 'token_exchange_patterns',
      },
      {
        id: 'ai-disc-18',
        front: 'Token Exchange: User context preservation',
        back: 'Do you need to preserve user context when services call other services?',
        area: 'token_exchange_patterns',
      },
      {
        id: 'ai-disc-19',
        front: 'Token Exchange: Step-up auth',
        back: 'Are there scenarios where you need step-up authentication for sensitive operations?',
        area: 'token_exchange_patterns',
      },
      {
        id: 'ai-disc-20',
        front: 'Multi-Agent: Agent-to-agent calls',
        back: 'Do you have agents that need to call other agents?',
        area: 'multi_agent_architecture',
      },
      {
        id: 'ai-disc-21',
        front: 'Multi-Agent: Trust establishment',
        back: 'How do agents verify other agents are legitimate before trusting them?',
        area: 'multi_agent_architecture',
      },
      {
        id: 'ai-disc-22',
        front: 'Multi-Agent: Framework usage',
        back: 'Are you using any agent frameworks like LangGraph, CrewAI, or AutoGen?',
        area: 'multi_agent_architecture',
      },
      {
        id: 'ai-disc-23',
        front: 'Third-Party MCP: External servers',
        back: 'What third-party MCP servers are your agents connecting to?',
        area: 'third_party_integrations',
      },
      {
        id: 'ai-disc-24',
        front: 'Third-Party MCP: ACL translation',
        back: 'How do you translate your internal ACLs to third-party permission models?',
        area: 'third_party_integrations',
      },
      {
        id: 'ai-disc-25',
        front: 'Third-Party MCP: Governance',
        back: 'How do you govern what external tools agents can access?',
        area: 'third_party_integrations',
      },
      // New discovery cards based on real customer transcripts
      {
        id: 'ai-disc-26',
        front: 'Current Approach: OAuth vs Agent difference',
        back: 'How is what you built for agents different from a regular OAuth client ID and secret?',
        area: 'current_approach',
      },
      {
        id: 'ai-disc-27',
        front: 'Current Approach: Incremental build',
        back: 'Did your team build this incrementally, or did you design the architecture up front?',
        area: 'current_approach',
      },
      {
        id: 'ai-disc-28',
        front: 'Third-Party MCP: Separate OAuth',
        back: 'For services like Salesforce or Asana — do users have to log in separately and authorize once?',
        area: 'third_party_integrations',
      },
      {
        id: 'ai-disc-29',
        front: 'MCP & Tool Access: Gateway architecture',
        back: 'Have you built or are you building an MCP gateway to route between different MCP servers?',
        area: 'mcp_tool_access',
      },
      {
        id: 'ai-disc-30',
        front: 'Shadow AI: Agent count visibility',
        back: 'Do you know how many AI agents exist in your organization today?',
        area: 'shadow_ai',
      },
      {
        id: 'ai-disc-31',
        front: 'Shadow AI: Chrome browser extension',
        back: 'Are you using a managed Chrome browser where you could deploy extensions for agent discovery?',
        area: 'shadow_ai',
      },
      {
        id: 'ai-disc-32',
        front: 'Token Exchange: ID token passthrough',
        back: 'Are you passing the ID token all the way through to MCP servers, or do you exchange it along the way?',
        area: 'token_exchange_patterns',
      },
      {
        id: 'ai-disc-33',
        front: 'Multi-Agent: Autonomous discovery',
        back: 'How do you discover agents that are autonomous — talking to each other without a user in the loop?',
        area: 'multi_agent_architecture',
      },
    ],
  },
}

// Product selection flashcards (Okta vs Auth0)
export const productFlashcards = [
  {
    id: 'prod-1',
    front: 'When to recommend Okta Workforce Identity for AI',
    back: 'Employees using AI tools (ChatGPT Enterprise, Copilot, internal AI assistants)',
    productIndicators: [
      'Workforce use case',
      'Existing Okta deployment',
      'CISO/IT-driven',
      'Governance focus',
    ],
    buyer: 'CISO, VP of IT, Compliance Officer',
  },
  {
    id: 'prod-2',
    front: 'When to recommend Auth0 for GenAI Applications',
    back: 'Customer-facing AI applications (AI chatbots, B2C/B2B2C products, SaaS AI features)',
    productIndicators: [
      'Customer identity',
      'Developer-led',
      'Fast time-to-market',
      'SaaS product',
    ],
    buyer: 'CTO, VP Engineering, Product Manager, CAIO',
  },
  {
    id: 'prod-3',
    front: 'When to recommend Okta ISPM for AI',
    back: 'Shadow AI discovery needs (employees using unauthorized AI tools, OAuth grant visibility)',
    productIndicators: ['No visibility into AI usage', 'Compliance concerns', 'CISO priority'],
    buyer: 'CISO, Security Architect, Compliance Officer',
  },
  {
    id: 'prod-4',
    front: 'When to recommend Auth0 Token Vault',
    back: 'AI agents need to securely store and manage credentials for accessing third-party APIs on behalf of users',
    productIndicators: [
      'Credential management pain',
      'Hardcoded API keys',
      'Agent-to-service auth',
    ],
    buyer: 'AI Platform Lead, ML Engineer, Data Science Manager',
  },
  {
    id: 'prod-5',
    front: 'When to recommend Auth0 FGA (Fine-Grained Authorization)',
    back: 'RAG pipeline security - need relationship-based access control (ReBAC) to filter documents by user permissions',
    productIndicators: ['RAG use case', 'Multi-tenant AI', 'Complex permission rules'],
    buyer: 'Data Science Manager, AI Platform Lead, Security Architect',
  },
  {
    id: 'prod-6',
    front: 'When to recommend BOTH Okta and Auth0',
    back: 'Enterprise with both internal AI tools (workforce) AND customer-facing AI products',
    productIndicators: ['Hybrid use cases', 'Multiple buyers (CISO + CTO)', 'Large organization'],
    buyer: 'CISO + CTO + CAIO (cross-functional)',
  },
  {
    id: 'prod-7',
    front: 'When to recommend Okta Identity for AI Agents',
    back: 'Production autonomous agents need machine identity, OAuth 2.0, credential rotation, and governance',
    productIndicators: ['Enterprise scale', 'Governance requirements', 'Agent-to-service auth'],
    buyer: 'CISO, Platform Engineer, AI Platform Lead',
  },
  {
    id: 'prod-8',
    front: 'When to recommend Auth0 Cross App Access (XAA)',
    back: 'Agents accessing multiple systems with delegation patterns, MCP server security',
    productIndicators: ['Multi-agent systems', 'MCP usage', 'Complex delegation needs'],
    buyer: 'CTO, AI Platform Lead, Platform Engineer',
  },
  {
    id: 'prod-9',
    front: 'Okta vs Auth0 decision question',
    back: 'Ask: "Who are the users of your AI applications - your employees or your customers?"',
    reasoning: 'Employees → Okta. Customers → Auth0. Both → Both products.',
    followUp: 'Do you have existing Okta Workforce Identity deployed?',
  },
  {
    id: 'prod-10',
    front: 'Objection: "We already have Microsoft Entra"',
    back: 'Okta: Purpose-built AI features (ISPM, Agent Identity). Auth0: Better for customer-facing AI apps.',
    oktaAdvantage: 'Okta ISPM for shadow AI discovery, cloud-agnostic',
    auth0Advantage: 'Auth0 for CIAM, Token Vault, FGA for RAG security',
  },
  {
    id: 'prod-11',
    front: 'Objection: "Auth0 pricing seems high"',
    back: 'Compare to cost of building DIY auth (developer time, maintenance, security risk, credential exposure)',
    response: "What's the TCO of building and maintaining custom auth vs purpose-built solution?",
    value: 'Developer focus on AI, not auth plumbing. Enterprise-grade security from day one.',
  },
  {
    id: 'prod-12',
    front: 'Objection: "We\'re already using AWS IAM"',
    back: 'AWS IAM is AWS-only. Okta/Auth0 are cloud-agnostic. What about agents in Azure, GCP, or on-prem?',
    oktaAdvantage: 'Cross-cloud agent identity',
    auth0Advantage: 'Purpose-built for AI agent workflows (Token Vault, XAA)',
  },
  // Token Exchange Pattern flashcards (from Okta documentation)
  {
    id: 'tech-1',
    front: 'What is ID-JAG (Identity Assertion JWT)?',
    back: 'Short-lived, one-time token for AI agent token exchange via Cross App Access (XAA). Agent uses client credentials + ID-JAG to get access tokens for downstream services.',
    useCase: 'Agent needs to access a resource on behalf of itself (workload identity)',
    flow: 'Agent → Okta (client credentials + ID-JAG) → Access token for downstream service',
    productFit: 'XAA',
  },
  {
    id: 'tech-2',
    front: 'What is On-Behalf-Of (OBO) Token Exchange?',
    back: 'Retain user context when service-to-service calls occur. The downstream service knows WHO originally requested the action.',
    useCase: 'Microservice architecture where user identity must flow through the chain',
    flow: 'User token → Service A → OBO exchange → Service B (with user context preserved)',
    productFit: 'Token Vault',
  },
  {
    id: 'tech-3',
    front: 'What is CIBA (Client-Initiated Backchannel Authentication)?',
    back: 'Step-up authentication requiring human approval on separate device. Agent pauses and waits for user to approve before proceeding with sensitive operation.',
    useCase:
      'Sensitive operations (PII access, financial transactions) requiring out-of-band approval',
    flow: 'Agent requests sensitive op → CIBA push to user device → User approves → Agent proceeds',
    productFit: 'Auth for GenAI',
  },
  {
    id: 'tech-4',
    front: 'What is a Workload Principle?',
    back: 'Each AI agent has its own identity (client_id in tokens). This is the Workload Principle - treating agents as first-class identity citizens.',
    useCase: 'Agents need their own identity for audit, access control, and trust establishment',
    productFit: 'Agent Identity',
  },
  {
    id: 'tech-5',
    front: 'What are Managed Connections?',
    back: 'IT admin defines which resources each agent can access. Three resource types: Authorization server (OAuth scopes), Secret (API keys), Service account (impersonation).',
    useCase: 'IT governance over what agents can access without blocking developer velocity',
    productFit: 'XAA',
  },
  {
    id: 'tech-6',
    front: 'When to use ID-JAG vs OBO vs CIBA?',
    back: 'ID-JAG: Agent acting as itself. OBO: Preserving user context through service chain. CIBA: Step-up auth for sensitive operations.',
    decisionTree:
      'Agent identity needed → ID-JAG. User context needed → OBO. Human approval needed → CIBA.',
    productFit: 'XAA + Token Vault',
  },
  // New technical flashcards based on real customer discovery transcripts
  {
    id: 'tech-7',
    front: 'What is Brokered Consent?',
    back: "OAuth consent brokered through Okta for third-party resources (Salesforce, Asana) that don't natively use your IDP. User authorizes once, Okta manages the refresh token ongoing.",
    useCase:
      "Agent accessing third-party MCP servers where the resource server doesn't talk to Okta for validation",
    flow: 'User grants OAuth consent once → Okta brokers and stores refresh token → Agent uses token for ongoing access',
    productFit: 'XAA (on roadmap Q2)',
  },
  {
    id: 'tech-8',
    front: 'What is the common MCP Gateway pattern?',
    back: 'Chatbot → MCP Gateway (validates JWT, routes requests) → Individual MCP Servers (Salesforce, Asana, internal tools). The gateway decides which downstream server fulfills the request.',
    useCase: 'Organizations with multiple MCP servers need a central routing and validation layer',
    flow: 'User prompt → Chatbot → Token exchange → MCP Gateway → Downstream MCP server',
    productFit: 'XAA + Agent Identity',
  },
  {
    id: 'tech-9',
    front: 'Coarse-grained vs Fine-grained authorization for agents?',
    back: 'Coarse-grained: OAuth scopes mapped to MCP tools (e.g., inventory:read). Fine-grained (FGA): Relationship-based per-resource permissions (e.g., user X can view document Y). Use both layers together.',
    useCase:
      'Scopes control what tools the agent can call. FGA controls what data the user can access through those tools.',
    productFit: 'Okta auth servers (coarse) + Auth0 FGA (fine)',
  },
  {
    id: 'tech-10',
    front: 'How does agent discovery work in ISPM?',
    back: 'Two methods: (1) Platform connectors — read-only API to Microsoft, AWS, Google to discover agents, permissions, and owners. (2) Chrome browser extension — captures OAuth consent grants for user-in-the-flow agents.',
    useCase: 'Shadow AI discovery and agent inventory',
    productFit: 'Okta ISPM for AI',
  },
  {
    id: 'tech-11',
    front: 'How is an AI agent different from a regular OAuth client app?',
    back: 'An AI agent is a first-class identity in Universal Directory with its own profile, owner, credentials (workload principal), and managed connections. Unlike a regular OAuth app, the agent has explicit relationships to users and resources, with policy-controlled token exchange via ID-JAG.',
    useCase: 'Understanding the core value proposition vs DIY OAuth',
    productFit: 'Okta Agent Identity',
  },
  // New product recommendation flashcards from customer discovery patterns
  {
    id: 'prod-13',
    front: 'When to recommend ISPM as the entry point',
    back: 'Customer can\'t answer "how many agents do you have?" or doesn\'t have visibility into AI tool usage.',
    productIndicators: [
      'No agent inventory',
      'Shadow AI visibility gap',
      'Compliance concerns',
      'Pre-pilot stage',
    ],
    buyer: 'CISO, Security Architect',
    why: 'ISPM is pure discovery play. No commitment needed, just visibility. 70% of customers are pre-pilot — ISPM gets them to see the problem.',
  },
  {
    id: 'prod-14',
    front: 'When to recommend FGA as the first product',
    back: 'Customer\'s #1 concern is "agents are accessing too much data" or "we can\'t scope down agent permissions."',
    productIndicators: [
      'Permission overflow problem',
      'Multi-tenant agents',
      'RAG security needs',
      'Fine-grained control pain',
    ],
    buyer: 'Data Science Manager, AI Platform Lead, Security Architect',
    why: "FGA solves the universal permission-scoping problem. Every customer has this pain but most haven't framed it yet.",
  },
  {
    id: 'prod-15',
    front: 'When to offer POC instead of demo',
    back: 'Customer has already started building their own solution or is technically mature (Auth0 customers, enterprise architects).',
    productIndicators: [
      'Custom MCP gateway built',
      'Early-stage production agents',
      'Team evaluating multiple vendors',
      'Technical buy-in already present',
    ],
    buyer: 'CTO, AI Platform Lead, Platform Engineer',
    why: "Technical customers don't need slides. They need hands-on evaluation. Offer: Colab notebook + preview tenant + checkpoint call in 1 week.",
  },
]

// Objection handler flashcards
export const objectionFlashcards = [
  {
    id: 'obj-1',
    objection: '"Every vendor says that..."',
    meaning: "They've heard pitches before and are tired of empty claims",
    response:
      "Acknowledge the skepticism. Ask what specifically they've been disappointed by. Offer specific proof points.",
    avoid: 'Making more claims without evidence',
  },
  {
    id: 'obj-2',
    objection: '"We\'re not ready for this yet"',
    meaning: "They don't see the urgency or haven't connected the problem to your solution",
    response: "Ask what would make them ready. Understand what's higher priority and why.",
    avoid: 'Pushing harder or creating artificial urgency',
  },
  {
    id: 'obj-3',
    objection: '"We\'ll probably build this ourselves"',
    meaning: "They haven't seen clear differentiation or don't trust vendors",
    response: 'Ask about their build vs buy criteria. Understand the TCO of building internally.',
    avoid: 'Dismissing their ability to build',
  },
  {
    id: 'obj-4',
    objection: '"Our current solution handles this"',
    meaning: "They haven't connected their pain to the limitations of their current solution",
    response: 'Ask specific questions about how they handle particular scenarios. Dig into gaps.',
    avoid: 'Badmouthing their current solution',
  },
  {
    id: 'obj-5',
    objection: '"I don\'t have budget for this"',
    meaning: "Either truly constrained or you haven't established enough value",
    response: 'Ask about what they do have budget for. Understand their priority framework.',
    avoid: 'Immediately offering discounts',
  },
  {
    id: 'obj-6',
    objection: '"Send me some information"',
    meaning: "Polite way of ending without commitment. You haven't earned a next meeting.",
    response: "Ask what specific information would be helpful. Try to understand what's missing.",
    avoid: "Accepting and hoping they'll read it",
  },
  // Real-world objections observed in customer discovery calls
  {
    id: 'obj-7',
    objection: '"How is this agent different from a regular client ID and secret?"',
    meaning:
      "They've built OAuth for agents and don't see the difference. This is the most common real-world objection.",
    response:
      'Explain the workload principal: the agent is a first-class identity with its own profile, owner, and managed connections. The key difference is preserving the user-to-agent relationship via ID-JAG token exchange.',
    avoid: 'Deflecting to a demo instead of directly answering the question',
  },
  {
    id: 'obj-8',
    objection: '"We already started building this ourselves"',
    meaning:
      "They've invested effort and need validation, not dismissal. But they paused because they see gaps.",
    response:
      "Validate their work. Ask what prompted the pause. Offer to help assess gaps. Show what Okta provides natively that they'd otherwise have to maintain.",
    avoid: 'Making them feel their effort was wasted or that they should have come to you first',
  },
  {
    id: 'obj-9',
    objection: '"We read the docs and got confused"',
    meaning:
      'Genuine interest but the complexity is a barrier. They need hands-on help, not more docs.',
    response:
      'Offer a POC environment with a guided Colab notebook. Suggest a checkpoint call in 1-2 weeks.',
    avoid: 'Sending more documentation or links to the same docs',
  },
  {
    id: 'obj-10',
    objection: '"That\'s on your roadmap — what about today?"',
    meaning: 'They need a solution now. Roadmap items are promises, not products.',
    response:
      'Be transparent with dates. Show what works today. Offer workarounds or design patterns for current capabilities.',
    avoid: 'Being vague about timelines or overselling roadmap features',
  },
  // Objections from Aryaka and Hunter transcripts
  {
    id: 'obj-11',
    objection: '"We went with Keycloak/open-source for cost reasons"',
    meaning:
      "They already evaluated commercial auth and decided on cost. Basic auth isn't the value prop.",
    response:
      'Show value beyond basic auth: Token Vault, FGA for RAG security, MCP auth, ISPM. Position as complementary.',
    avoid: "Trying to compete on basic authentication — they've already decided",
  },
  {
    id: 'obj-12',
    objection: '"We\'re a Microsoft shop — we already have Entra"',
    meaning:
      "They see no reason to add another IDP. Need to see AI-specific value Entra doesn't provide.",
    response:
      "Lead with ISPM (IDP-agnostic, works with Entra). Show agent discovery and AI governance capabilities. Don't position as IDP replacement.",
    avoid: 'Saying "we would need to be the IDP" — this kills the deal instantly',
  },
  {
    id: 'obj-13',
    objection: '"I was wondering if Okta was doing something outside of normal authentication"',
    meaning: "They already have auth solved. They're looking for the AI-specific value prop.",
    response:
      "Skip auth. Lead with: agent discovery (ISPM), agent identity (separate from users), fine-grained authorization (FGA). These are things their current auth can't do.",
    avoid: 'Presenting the standard IAM pitch when they want AI-specific capabilities',
  },
  {
    id: 'obj-14',
    objection:
      '"How do you define the fine-grained model? I understand RBAC but not relationships"',
    meaning: 'They need concrete examples and hands-on access. ReBAC is new to most teams.',
    response:
      'Show the FGA modeling playground with their specific use case. Walk through tuples and relationship definitions. Offer sandbox access.',
    avoid: 'Explaining concepts abstractly — show the code and the modeling tool',
  },
  // New objections from 23 real customer discovery transcripts
  {
    id: 'obj-15',
    objection: '"What does this cost?"',
    meaning:
      "Price-first buyer asking before understanding product. Signals they're price-sensitive or evaluating multiple vendors.",
    response:
      'Don\'t answer yet. Ask: "What problem are we solving first? Once we understand the value, we can talk pricing." Establish value before cost discussion.',
    avoid: 'Quoting price without understanding their use case',
  },
  {
    id: 'obj-16',
    objection: '"We\'ll wait until the market matures"',
    meaning:
      "Build-vs-wait objection. They're hesitant about committing before seeing where the industry settles.",
    response:
      "Ask what happens if agents ship without security framework in the meantime. Show them competitors aren't waiting. Position early movers as having advantage.",
    avoid: 'Respecting the wait — create urgency around risk and competitive positioning',
  },
  {
    id: 'obj-17',
    objection: '"We already have an MCP gateway"',
    meaning: 'They built something custom. Validate their investment. But dig into gaps.',
    response:
      'Validate the build: "That\'s smart, many teams are building this." Then ask about: token exchange patterns, user context preservation, fine-grained authorization, credential rotation. Listen for gaps.',
    avoid: "Dismissing their custom solution — they've invested effort and pride in it",
  },
  {
    id: 'obj-18',
    objection: '"We\'re evaluating multiple vendors"',
    meaning:
      "Multi-vendor eval underway. Need to understand who else they're looking at and what criteria matter.",
    response:
      'Ask: "Who else are you evaluating?" and "What\'s most important in your evaluation?" Position against specific competitors (Transmit Security, Ping, CyberArk). Differentiate clearly.',
    avoid: "Assuming they'll pick Okta/Auth0 — they won't unless you position clearly",
  },
  {
    id: 'obj-19',
    objection: '"Our authorization is a mess — we need to fix that first"',
    meaning:
      "Authorization debt is real. They see the problem but think it's a prerequisite to solving agents.",
    response:
      'Flip it: "That\'s exactly why you need FGA now. AI agents will expose your authz gaps. FGA was designed for this exact problem." Position ISPM + FGA as the fix.',
    avoid: 'Accepting "fix authz first" — this is procrastination disguised as prudence',
  },
  {
    id: 'obj-20',
    objection: '"We already have Microsoft Entra, why do we need Okta?"',
    meaning:
      "The Entra objection. They see Okta as redundant when they're already a Microsoft shop.",
    response:
      "Lead with ISPM (IDP-agnostic, works alongside Entra). Highlight: shadow AI discovery, agent identity as separate from user identity, audit compliance for AI. Don't position as Entra replacement.",
    avoid: 'Saying "you need to switch to Okta" — this kills the deal instantly',
  },
  {
    id: 'obj-21',
    objection: '"Budget is locked for this year"',
    meaning:
      'Budget cycle objection. Common especially mid-year. FY budgets are already committed.',
    response:
      'Ask: "When does next FY planning start?" and "Can we do a POC now with budget commitment for next year?" Position as discovery-phase initiative with commitment downstream.',
    avoid: 'Accepting as final — budget-timing objections are often surmountable',
  },
]

// Competitor handler flashcards (AI Security focused with Okta/Auth0 positioning)
export const competitorFlashcards = {
  microsoftEntra: [
    {
      id: 'comp-entra-1',
      objection: 'We already have Microsoft Entra',
      response:
        'Entra is great for workforce identity. But does it discover shadow AI usage? Does it have purpose-built agent identity?',
      oktaAdvantage: 'Okta ISPM for AI - shadow AI discovery, Agent Identity',
      auth0Advantage: 'Auth0 for customer-facing AI apps (Entra is workforce-focused)',
    },
    {
      id: 'comp-entra-2',
      objection: 'Entra is included with Microsoft 365',
      response:
        'Workforce identity is included. AI-specific features like shadow AI discovery, agent credential management, and CIAM for AI apps are different requirements.',
      oktaAdvantage: 'Purpose-built AI governance features',
      auth0Advantage: 'CIAM for AI products, Token Vault, FGA',
    },
  ],
  cloudNative: [
    {
      id: 'comp-cloud-1',
      objection: 'We use AWS/Azure native security',
      response:
        'That works for one cloud. What about agents accessing systems across clouds? Or using multiple LLM providers?',
      oktaAdvantage: 'Cross-cloud agent identity and governance',
      auth0Advantage: 'Cloud-agnostic, better developer experience than Cognito',
    },
    {
      id: 'comp-cloud-2',
      objection: "It's included with our cloud spend",
      response:
        'Basic IAM is included. Agent-specific identity, governance, and compliance are different requirements.',
      oktaAdvantage: 'Purpose-built agent identity management',
      auth0Advantage: 'Auth0 Token Vault for agent credentials, FGA for RAG',
    },
  ],
  platformNative: [
    {
      id: 'comp-platform-1',
      objection: 'Salesforce Agentforce handles security',
      response:
        'Within Salesforce, yes. But when agents need to access ServiceNow, Workday, or external APIs?',
      oktaAdvantage: 'Cross-platform agent identity and governance',
      auth0Advantage: 'Auth0 Token Vault for multi-system agent access',
    },
    {
      id: 'comp-platform-2',
      objection: 'Our platforms have their own security',
      response:
        'They do for their own data. But modern agents are cross-functional. How do you govern an agent that touches 5 different systems?',
      oktaAdvantage: 'Unified audit trail across all agent actions',
      auth0Advantage: 'Auth0 XAA for agent-to-app delegation',
    },
  ],
  diy: [
    {
      id: 'comp-diy-1',
      objection: "We'll build it ourselves",
      response:
        "You can, but should you? Your devs should focus on AI capabilities, not reinventing identity. What's the TCO of DIY auth long-term?",
      oktaAdvantage: 'Enterprise-grade agent identity from day one',
      auth0Advantage: 'Auth0 Token Vault - purpose-built, secure-by-default',
    },
    {
      id: 'comp-diy-2',
      objection: 'LangChain handles auth',
      response:
        'LangChain provides patterns, not enterprise identity management. Who manages credentials? Who audits access? Auth0 Token Vault integrates with LangChain.',
      oktaAdvantage: 'Enterprise governance and compliance',
      auth0Advantage: 'Developer-friendly integration with agent frameworks',
    },
  ],
  pingIdentity: [
    {
      id: 'comp-ping-1',
      objection: "We're a Ping customer already",
      response:
        'Ping is solid for traditional IAM. But does it have shadow AI discovery? Agent identity? Token Vault? You can complement Ping with Okta/Auth0 for AI.',
      oktaAdvantage: 'Modern AI-specific features (ISPM, Agent Identity)',
      auth0Advantage: 'Developer experience, Token Vault, FGA for AI',
    },
  ],
  pangea: [
    {
      id: 'comp-pangea-1',
      objection: 'Pangea is purpose-built for AI',
      response:
        'So is Auth0 Token Vault and Okta Agent Identity. But Pangea is a point solution. What about workforce identity? Shadow AI discovery? Audit compliance?',
      oktaAdvantage: 'Enterprise platform with proven scale, compliance certifications',
      auth0Advantage: 'Okta-owned, comprehensive CIAM, proven at scale',
    },
  ],
  transmitSecurity: [
    {
      id: 'comp-transmit-1',
      objection: "We're looking at Transmit Security",
      response:
        'Transmit focuses on fraud and runtime security. Okta/Auth0 is identity-native with ISPM for discovery, Agent Identity for workload principals, and Token Vault for credential management. What specific capability are you evaluating?',
      oktaAdvantage:
        'Enterprise identity management + ISPM for shadow AI discovery + Agent Identity',
      auth0Advantage:
        'Identity-native approach + Token Vault for credential management + FGA for authorization',
    },
    {
      id: 'comp-transmit-2',
      objection: 'Transmit has AI-native security',
      response:
        "Transmit is strong on runtime protection. But they don't have enterprise identity management, ISPM for AI discovery, or relationship-based access control for agents. They're a point solution in the runtime layer.",
      oktaAdvantage: 'Identity-first platform with ISPM and Agent Identity',
      auth0Advantage: 'Comprehensive identity platform with Token Vault and FGA',
    },
  ],
  cyberArk: [
    {
      id: 'comp-cyber-1',
      objection: 'CyberArk handles our privileged access',
      response:
        'CyberArk is PAM (Privileged Access Management). AI agents need OAuth-based workload identity with managed connections, not vault-based privileged access. Different problem, different solution.',
      oktaAdvantage: 'Workload identity management designed for AI agents and services',
      auth0Advantage: 'Developer-friendly identity platform with agent-specific features',
    },
    {
      id: 'comp-cyber-2',
      objection: 'We checked CyberArk for AI agents',
      response:
        "What did you learn? CyberArk can store credentials, but it doesn't solve token exchange, agent discovery, or fine-grained authorization for AI. Okta/Auth0 solve the identity layer that CyberArk doesn't.",
      oktaAdvantage:
        'Complete identity platform for agents (ISPM + Agent Identity + Token Exchange)',
      auth0Advantage: 'Purpose-built for AI agent authentication and authorization',
    },
  ],
}

// Common mistakes flashcards
export const mistakeFlashcards = [
  {
    id: 'mistake-1',
    mistake: 'Jumping to pitching too early',
    why: "You haven't earned the right to pitch yet. Without understanding their problems, your pitch is just noise.",
    instead:
      "Stay in discovery mode until you fully understand their situation and they've expressed genuine interest.",
  },
  {
    id: 'mistake-2',
    mistake: 'Asking generic questions',
    why: 'Generic questions get generic answers. "What keeps you up at night?" signals you didn\'t prepare.',
    instead: 'Ask specific questions that show you understand their industry and role.',
  },
  {
    id: 'mistake-3',
    mistake: 'Talking more than listening',
    why: "Every minute you talk is a minute you're not learning. Stakeholders notice when you're not listening.",
    instead: 'Practice active listening. Pause before responding. Reference what they just said.',
  },
  {
    id: 'mistake-4',
    mistake: 'Not following up on vague answers',
    why: 'Vague answers hide the real story. Accepting them means missing critical information.',
    instead: 'Dig deeper with "Tell me more about that" or "Can you give me an example?"',
  },
  {
    id: 'mistake-5',
    mistake: 'Asking about budget too early',
    why: 'Budget questions feel transactional before trust is established.',
    instead: "Wait until you've established value and they're engaged before discussing budget.",
  },
  {
    id: 'mistake-6',
    mistake: 'Badmouthing competitors',
    why: 'It makes you look insecure and unprofessional. Stakeholders may have relationships with those vendors.',
    instead: 'Acknowledge competitors professionally and differentiate on your strengths.',
  },
  {
    id: 'mistake-7',
    mistake: 'Chasing every tangent',
    why: 'You lose focus and control of the conversation. Some tangents are tests.',
    instead: 'Acknowledge tangents briefly, note them, and redirect back to the main topic.',
  },
  // New mistakes from 23 real customer discovery transcripts
  {
    id: 'mistake-8',
    mistake: 'Talking to the wrong person',
    why: 'Tapestry (MFA help desk person, not AI-involved), Restoration Hardware (general IAM person). Wrong contact = wasted call.',
    instead:
      'Before the call, verify the contact\'s AI involvement. Ask the caller: "Are you involved in AI initiatives?" If not, ask for the right person.',
  },
  {
    id: 'mistake-9',
    mistake: 'Not asking about competitors',
    why: "Dropbox, Qualtrics, Amphenol all mentioned evaluating others. If you don't ask, you can't position against them.",
    instead:
      'Always ask: "Are you evaluating other vendors?" and "Who?" Listen for Transmit Security, Ping, CyberArk, Microsoft Entra. Know your positioning.',
  },
  {
    id: 'mistake-10',
    mistake: 'Deferring pricing questions',
    why: 'Multiple calls ended with "we\'ll get back to you on pricing." You lose momentum and credibility.',
    instead:
      'Have ballpark ranges ready (e.g., "Typically $X-Y for this use case"). If pressed for exact quotes, say you need requirements first, but give a range now.',
  },
  {
    id: 'mistake-11',
    mistake: 'Excessive small talk eating discovery time',
    why: "Amphenol (35% small talk), Tapestry (20%). You've got 30-45 minutes. Every minute of chat is a minute of discovery lost.",
    instead:
      'Build rapport in 2-3 minutes max. Then transition: "Let\'s dive into your AI security challenges..." Keep discovery-focused.',
  },
]

// Helper function to get all flashcards for a track
export function getFlashcardsForTrack(track) {
  const trackData = flashcards[track]
  if (!trackData) return []

  return [
    ...trackData.golden.map((card) => ({ ...card, type: 'golden' })),
    ...trackData.discovery.map((card) => ({ ...card, type: 'discovery' })),
  ]
}

// Helper function to get all flashcards
export function getAllFlashcards() {
  // Flatten competitor flashcards
  const allCompetitorCards = Object.values(competitorFlashcards)
    .flat()
    .map((card) => ({ ...card, type: 'competitor' }))

  // Get flashcards from all tracks dynamically
  const allTrackCards = Object.keys(flashcards).flatMap((trackKey) =>
    getFlashcardsForTrack(trackKey)
  )

  return [
    ...allTrackCards,
    ...productFlashcards.map((card) => ({ ...card, type: 'product' })),
    ...objectionFlashcards.map((card) => ({ ...card, type: 'objection' })),
    ...allCompetitorCards,
    ...mistakeFlashcards.map((card) => ({ ...card, type: 'mistake' })),
  ]
}

// Helper function to shuffle an array
export function shuffleArray(array) {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}
