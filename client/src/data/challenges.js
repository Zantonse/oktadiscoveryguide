// Technical Deep Dive topics
export const technicalTopics = [
  {
    id: 'llm-fundamentals',
    topic: 'LLM Fundamentals',
    difficulty: 'intermediate',
    description: 'Tokens, inference, fine-tuning vs RAG, model hosting',
    openingPrompt:
      "I'm an ML engineer evaluating identity solutions for our AI platform. Let's start with the basics — can you explain how large language models handle authentication context during inference? I want to understand if you actually know how these systems work before we talk products.",
    escalationHints: [
      'Ask about token window limitations and identity context',
      'Challenge on fine-tuning vs RAG trade-offs for identity data',
      'Probe model hosting implications for credential management',
    ],
  },
  {
    id: 'agentic-ai',
    topic: 'Agentic AI',
    difficulty: 'advanced',
    description: 'Agent loops, tool calling, multi-agent orchestration, memory',
    openingPrompt:
      "We're building autonomous agents that chain together multiple tool calls. I need to understand how you think about identity in agent loops — specifically, how do you handle credential delegation when an agent spawns sub-agents?",
    escalationHints: [
      'Challenge on ReAct vs Plan-and-Execute patterns for identity',
      'Ask about agent memory and credential persistence across loops',
      'Probe multi-agent orchestration identity challenges',
    ],
  },
  {
    id: 'rag-data-pipelines',
    topic: 'RAG & Data Pipelines',
    difficulty: 'intermediate',
    description: 'Retrieval patterns, embeddings, vector DBs, chunking',
    openingPrompt:
      'We have a RAG pipeline pulling from sensitive HR documents and financial reports. My concern is access control at the retrieval layer. How do you think about identity-aware retrieval in vector databases?',
    escalationHints: [
      'Ask about embedding-level access control challenges',
      'Challenge on chunking strategies and permission inheritance',
      'Probe metadata filtering vs post-retrieval authorization',
    ],
  },
  {
    id: 'mcp-tool-access',
    topic: 'MCP & Tool Access',
    difficulty: 'advanced',
    description: 'Protocol mechanics, server/client roles, transport, auth',
    openingPrompt:
      "We're adopting MCP for our agent-tool integrations. I'm concerned about the security model — can you walk me through how MCP handles authentication between the client and server components? I want to know if you understand the protocol deeply or just the marketing.",
    escalationHints: [
      'Challenge on MCP transport layer security (stdio vs HTTP+SSE)',
      'Ask about OAuth integration with MCP server endpoints',
      'Probe dynamic tool discovery and permission scoping',
    ],
  },
  {
    id: 'identity-in-ai',
    topic: 'Identity in AI',
    difficulty: 'advanced',
    description: 'OAuth for agents, on-behalf-of flows, token exchange, workload identity',
    openingPrompt:
      "I'm the platform architect responsible for our AI workload identity strategy. We have agents acting on behalf of users across multiple services. How does OAuth work in this context? I'm skeptical that traditional identity patterns apply to AI agents.",
    escalationHints: [
      'Challenge on OBO flows for agent-to-service calls',
      'Ask about token exchange grant type for agent delegation',
      'Probe workload identity vs user identity for autonomous agents',
    ],
  },
  {
    id: 'ai-security-threats',
    topic: 'AI Security Threats',
    difficulty: 'intermediate',
    description: 'Prompt injection, data exfiltration, privilege escalation, shadow AI',
    openingPrompt:
      'We had a near-miss last month where a prompt injection attack almost exposed customer PII through one of our AI assistants. Now the CISO wants a full threat model. What are the identity-related attack vectors in AI systems that I should be most worried about?',
    escalationHints: [
      'Challenge on indirect prompt injection and identity bypass',
      'Ask about data exfiltration through tool call chains',
      'Probe privilege escalation in multi-agent systems',
    ],
  },
]

// Architecture Lab scenarios
export const architectureScenarios = [
  {
    id: 'fintech-advisor',
    industry: 'Financial Services',
    complexity: 'multi-agent',
    title: 'AI Financial Advisor with Agent Orchestration',
    description:
      "We're a mid-size fintech building a customer-facing AI advisor. It uses LangChain agents with RAG over our financial products database. The agents can look up account balances via internal APIs and initiate transfers through our payments service. We're using API keys stored in environment variables. Three teams are building agents independently with no central governance.",
    gaps: [
      'Hardcoded API keys in environment variables — no rotation, no scoping',
      'No per-user authorization — agents access all accounts equally',
      'No central governance across three independent teams',
      'No audit trail for agent-initiated transfers',
      'RAG pipeline has no access control on financial document retrieval',
      'No rate limiting or anomaly detection on agent API calls',
    ],
    productMappings: [
      {
        product: 'Token Vault',
        reason: 'Replace hardcoded API keys with secure, scoped, rotatable credentials',
      },
      {
        product: 'Auth for GenAI',
        reason: 'User authentication for the customer-facing AI advisor',
      },
      {
        product: 'Agent Identity',
        reason: 'Machine identity for each agent, enabling per-agent authorization',
      },
      {
        product: 'ISPM',
        reason: 'Central visibility and governance across three independent teams',
      },
      {
        product: 'FGA',
        reason: 'Fine-grained authorization for account-level access in RAG retrieval',
      },
    ],
  },
  {
    id: 'healthcare-assistant',
    industry: 'Healthcare',
    complexity: 'single-agent',
    title: 'Patient-Facing Clinical Assistant',
    description:
      "We're a regional hospital network deploying an AI assistant that helps patients check test results, schedule appointments, and get medication reminders. It connects to our Epic EHR system via FHIR APIs. Currently, the AI uses a single service account with broad read access. Doctors also use it internally to summarize patient notes. We need to be HIPAA compliant.",
    gaps: [
      'Single service account with overly broad read access — violates least privilege',
      'No distinction between patient-facing and doctor-facing access patterns',
      'FHIR API access not scoped to individual patient records',
      'No audit logging of which patient records the AI accessed',
      'HIPAA compliance requires access controls and audit trails',
      'No consent management for AI access to patient data',
    ],
    productMappings: [
      {
        product: 'Auth for GenAI',
        reason: 'Patient and doctor authentication for AI assistant access',
      },
      {
        product: 'FGA',
        reason: 'Patient-level scoping on FHIR API access — patients see only their own records',
      },
      {
        product: 'Agent Identity',
        reason: 'Distinct identities for patient-facing vs doctor-facing agent contexts',
      },
      { product: 'ISPM', reason: 'Audit trail and compliance reporting for HIPAA' },
    ],
  },
  {
    id: 'enterprise-copilot',
    industry: 'Technology',
    complexity: 'enterprise-scale',
    title: 'Enterprise Developer Copilot Platform',
    description:
      "We're a Fortune 500 tech company rolling out an internal developer copilot. It needs access to GitHub repos, Jira, Confluence, Slack, and our internal build systems. Different teams have different sensitivity levels — the payments team's code is restricted. We're using MCP to connect the copilot to these tools. 5,000 developers will use it. Our security team wants to understand the blast radius if the copilot is compromised.",
    gaps: [
      'MCP tool connections need per-tool authorization policies',
      'No team-level access boundaries — copilot could cross-pollinate restricted code',
      'Payments team code needs stricter access controls',
      'Blast radius of compromise spans all connected tools (GitHub, Jira, Confluence, Slack, builds)',
      '5,000 users means credential management at scale',
      'No monitoring for anomalous copilot behavior patterns',
    ],
    productMappings: [
      {
        product: 'Workforce Identity for AI',
        reason: 'SSO and identity lifecycle for 5,000 developer copilot users',
      },
      {
        product: 'Token Vault',
        reason: 'Secure credential management for MCP tool connections at scale',
      },
      {
        product: 'FGA',
        reason: 'Team-level and sensitivity-based access boundaries (payments team restrictions)',
      },
      {
        product: 'ISPM',
        reason: 'Blast radius analysis, anomaly detection, security posture monitoring',
      },
      {
        product: 'Cross App Access',
        reason: 'Agent access across GitHub, Jira, Confluence, Slack, builds via MCP',
      },
    ],
  },
  {
    id: 'retail-recommendation',
    industry: 'Retail',
    complexity: 'multi-agent',
    title: 'AI-Powered Personalization Engine',
    description:
      "We're a large e-commerce company building an AI recommendation engine. It uses multiple agents: one for product matching, one for inventory checking, and one for price optimization. The agents share data through a common message bus. Customer browsing history and purchase data feeds the RAG pipeline. We have operations in the EU and need to comply with GDPR. Currently we have no visibility into what data each agent can access.",
    gaps: [
      'No per-agent data access boundaries — agents can see all customer data',
      'Message bus has no authentication between agent communications',
      'GDPR requires data minimization — agents accessing more data than needed',
      'No consent tracking for AI processing of customer data',
      'No audit trail for which agent accessed which customer records',
      'Cross-border data flow issues with EU customer data',
    ],
    productMappings: [
      { product: 'Agent Identity', reason: 'Per-agent identity for data access boundaries' },
      {
        product: 'FGA',
        reason: 'Fine-grained authorization — each agent only accesses data it needs',
      },
      {
        product: 'AI Governance',
        reason: 'GDPR compliance, consent management, data processing records',
      },
      { product: 'ISPM', reason: 'Visibility into agent data access patterns and audit trails' },
      { product: 'Auth for GenAI', reason: 'Customer authentication for personalized AI features' },
    ],
  },
  {
    id: 'insurance-claims',
    industry: 'Insurance',
    complexity: 'multi-team',
    title: 'Automated Claims Processing Pipeline',
    description:
      "We're an insurance company automating claims processing with AI. The system reads claim documents (OCR), cross-references policy databases, checks for fraud indicators, and generates settlement recommendations. Three departments (claims, underwriting, fraud) each built their own AI tools. Claims adjusters use the AI for initial triage. The fraud detection model has access to all claims data including sensitive medical records.",
    gaps: [
      'Fraud model has unrestricted access to sensitive medical records',
      'Three departments with no unified AI governance or standards',
      'No role-based access — claims adjusters and fraud analysts share the same AI access',
      'OCR pipeline has no data classification or sensitivity tagging',
      'Settlement recommendations lack audit trail for regulatory compliance',
      'Shadow AI risk — departments building without central oversight',
    ],
    productMappings: [
      { product: 'AI Governance', reason: 'Unified governance framework across three departments' },
      {
        product: 'ISPM',
        reason: 'Shadow AI discovery, access pattern monitoring, regulatory audit trails',
      },
      {
        product: 'FGA',
        reason: 'Role-based access — fraud analysts vs claims adjusters get different data views',
      },
      {
        product: 'Agent Identity',
        reason: 'Per-model identity for the OCR, fraud, and settlement agents',
      },
      {
        product: 'Workforce Identity for AI',
        reason: 'Employee access management for claims adjuster AI tools',
      },
    ],
  },
]

// Briefing Room prompts
export const briefingPrompts = [
  {
    id: 'br-microsoft-entra',
    category: 'competitive',
    prompt:
      'Customer says: "We just saw that Microsoft added agent identity to Entra. Why would we need Okta for this?"',
    context:
      'Microsoft Entra Workload ID supports managed identities for Azure-hosted workloads. Customer is evaluating multi-cloud AI agent identity.',
    keyPoints: [
      "Acknowledge Microsoft's investment in the space validates the problem",
      'Entra Workload ID is Azure-centric — most AI agent deployments are multi-cloud or hybrid',
      'Okta is identity-provider agnostic — works across AWS, GCP, Azure, and on-prem',
      "Okta's approach covers the full lifecycle: provisioning, credential rotation, access governance",
      "Token Vault provides secure credential management that Entra doesn't address",
    ],
  },
  {
    id: 'br-a2a-protocol',
    category: 'market',
    prompt:
      'CTO asks: "What\'s your take on the A2A protocol Google just announced? How does it relate to MCP?"',
    context:
      "Google's Agent-to-Agent (A2A) protocol focuses on inter-agent communication. MCP focuses on agent-to-tool connections.",
    keyPoints: [
      "A2A and MCP solve different problems — they're complementary, not competing",
      'MCP: how agents connect to tools and data sources (Anthropic)',
      'A2A: how agents communicate with each other (Google)',
      'Both need identity and authentication — Okta secures both interaction patterns',
      'This validates the multi-protocol agent ecosystem Okta is building for',
    ],
  },
  {
    id: 'br-gartner-identity',
    category: 'analyst',
    prompt:
      'CISO says: "Gartner\'s latest report says identity is the #1 risk vector for AI agents. What specifically are they referring to?"',
    context:
      'Gartner and other analysts have highlighted non-human identity as a top emerging risk area.',
    keyPoints: [
      'Non-human identities (agents, bots, service accounts) now outnumber human identities 45:1',
      'AI agents inherit the permissions of whoever deployed them — often over-privileged',
      'Credential sprawl — agents store API keys, tokens in config files and env vars',
      "No audit trail — organizations can't track what agents accessed or why",
      'Shadow AI — departments deploying AI tools without security team awareness',
    ],
  },
  {
    id: 'br-crewai-langgraph',
    category: 'technical',
    prompt:
      'VP of Engineering: "We\'re evaluating CrewAI vs LangGraph for our agent framework. Does that choice matter from a security perspective?"',
    context:
      'CrewAI and LangGraph are popular agent orchestration frameworks with different security postures.',
    keyPoints: [
      'Framework choice affects how agents handle credentials and delegation',
      'Both frameworks need external identity management — neither provides it natively',
      'LangGraph: stateful agent graphs need consistent identity across steps',
      'CrewAI: role-based agents need per-role permission scoping',
      'Okta integrates at the identity layer below the framework — works with either choice',
      'The real risk is the same regardless: how agents authenticate to external services',
    ],
  },
  {
    id: 'br-ai-breach',
    category: 'competitive',
    prompt:
      'Customer heard about an AI agent data breach at a competitor. They want to know how Okta would have prevented it.',
    context: 'Recent AI-related security incidents have raised awareness of agent security risks.',
    keyPoints: [
      'Most AI agent breaches trace back to over-privileged credentials and lack of access boundaries',
      'Token Vault: eliminates hardcoded credentials that attackers target',
      'Agent Identity: each agent gets its own identity with scoped permissions',
      'ISPM: would detect anomalous agent behavior patterns before data exfiltration',
      "FGA: limits blast radius — even if one agent is compromised, it can only access what it's authorized for",
    ],
  },
  {
    id: 'br-build-vs-buy',
    category: 'technical',
    prompt:
      'Platform Lead: "We have a strong engineering team. Why wouldn\'t we just build agent identity management ourselves?"',
    context: 'Engineering teams often consider build vs buy for identity infrastructure.',
    keyPoints: [
      "Acknowledge their team's capability — this isn't about skill",
      'Identity is a moving target — OAuth specs, MCP auth, framework integrations evolve constantly',
      'Day-2 operations: rotation, revocation, audit, compliance reporting add ongoing burden',
      'Token Vault alone replaces months of credential management infrastructure work',
      "Their engineers' time is better spent on AI features, not identity plumbing",
      'Okta handles the scale and compliance aspects that homegrown solutions struggle with',
    ],
  },
  {
    id: 'br-too-early',
    category: 'market',
    prompt:
      'CTO says: "We\'re only running a small AI pilot. Isn\'t it too early to worry about agent identity?"',
    context: 'Common objection from organizations early in their AI journey.',
    keyPoints: [
      'Pilots become production faster than planned — better to start right',
      "Shadow AI means there's likely more AI usage than the official pilot",
      'Identity patterns set in pilot become the standard — easier to fix now',
      'ISPM can reveal AI tools employees are already using without oversight',
      'Starting with Auth for GenAI on the pilot prevents credential sprawl from day one',
      'Ask: "How quickly did your last pilot go to production?"',
    ],
  },
  {
    id: 'br-eu-ai-act',
    category: 'analyst',
    prompt:
      'Compliance Officer: "How does the EU AI Act affect our AI agent identity requirements?"',
    context:
      'EU AI Act imposes transparency, traceability, and human oversight requirements on AI systems.',
    keyPoints: [
      'EU AI Act requires traceability of AI system actions — identity is the foundation',
      'High-risk AI systems need documented access controls and audit trails',
      'AI Governance provides the compliance framework for EU AI Act requirements',
      'Agent Identity creates the audit trail needed for regulatory transparency',
      'ISPM ensures ongoing compliance monitoring, not just point-in-time audits',
      'Organizations operating in EU need this now — enforcement timelines are approaching',
    ],
  },
  {
    id: 'br-auth0-vs-okta',
    category: 'competitive',
    prompt:
      'Customer asks: "Your website shows both Okta and Auth0 products for AI. Which do I actually need? Are they competing?"',
    context: 'Customer confused by Okta and Auth0 both having AI-related products.',
    keyPoints: [
      'Okta products = workforce/internal use (employees using AI tools)',
      'Auth0 products = customer-facing (AI features in your product)',
      'Not competing — complementary for different use cases',
      'Auth0 Auth for GenAI + Token Vault: for customer-facing AI apps',
      'Okta Workforce Identity + ISPM: for employee AI tool governance',
      'Many organizations need both — ask "Is this for your employees or your customers?"',
    ],
  },
  {
    id: 'br-existing-vault',
    category: 'technical',
    prompt:
      'Security Engineer: "We already use HashiCorp Vault for secrets management. How is Token Vault different?"',
    context:
      'HashiCorp Vault is widely used for secrets management but not designed for AI agent credential flows.',
    keyPoints: [
      'HashiCorp Vault: general-purpose secrets management (static secrets, PKI, encryption)',
      'Token Vault: purpose-built for AI agent credential lifecycle (OAuth tokens, API keys, rotation)',
      'Token Vault understands agent delegation patterns — on-behalf-of flows, token exchange',
      'Token Vault integrates with agent frameworks (LangChain, CrewAI, MCP)',
      'They can coexist — HashiCorp Vault for infrastructure secrets, Token Vault for agent credentials',
      "Token Vault adds identity-aware access policies that HashiCorp Vault doesn't model",
    ],
  },
]

// Proof Point Match scenarios
export const proofPointScenarios = [
  {
    id: 'pp-healthtech-hipaa',
    industry: 'Healthcare',
    situation:
      "Series B healthtech startup. Building AI agents that access patient records via FHIR APIs. Their CISO is nervous about HIPAA exposure but the CTO wants to move fast. They're skeptical that an identity vendor understands AI workloads.",
    hesitation: 'Speed vs compliance tension. Skepticism about identity vendor AI expertise.',
    relevantPatterns: [
      'Healthcare organizations using FGA for patient-level access control in AI systems',
      'Auth for GenAI providing HIPAA-compliant authentication for AI-powered patient portals',
      'Agent Identity creating audit trails that satisfy HIPAA access logging requirements',
      'Startups deploying Token Vault early to prevent credential sprawl before production scale',
    ],
    analogies: [
      'Like putting seatbelts in during car design, not after the crash — identity-first AI development',
      'FHIR APIs already have identity concepts (patient context, practitioner scopes) — Okta extends this to AI agents',
      'Compare to how cloud-native companies baked in IAM from day one vs legacy companies retrofitting',
    ],
  },
  {
    id: 'pp-bank-modernization',
    industry: 'Financial Services',
    situation:
      'Large regional bank. Modernizing customer service with AI agents that can access account info, initiate transactions, and pull credit reports. Regulatory pressure from OCC on AI governance. Current agents use shared service accounts with broad database access.',
    hesitation: 'Regulatory fear. Shared service account dependency. Complex legacy integration.',
    relevantPatterns: [
      'Banks replacing shared service accounts with per-agent identities using Agent Identity',
      'Token Vault managing credential rotation for banking API connections (core banking, credit bureau)',
      'ISPM providing the regulatory audit trails OCC examiners expect',
      'FGA implementing transaction-level authorization (amount limits, account scope)',
    ],
    analogies: [
      'Shared service accounts for AI agents are like giving every bank teller the vault combination — you need individual accountability',
      'OCC expects the same access controls for AI agents as they do for human employees',
      'Similar to how SOX compliance drove identity governance adoption — AI regulation is driving agent identity',
    ],
  },
  {
    id: 'pp-saas-platform',
    industry: 'Technology',
    situation:
      "B2B SaaS platform company. Adding AI-powered features to their product (smart search, auto-categorization, AI assistant). Their customers are enterprise — they're getting security questionnaires asking about AI data handling. Engineering team wants to build identity in-house.",
    hesitation: 'Build vs buy. Customer security questionnaire pressure. Engineering confidence.',
    relevantPatterns: [
      'SaaS companies using Auth for GenAI to add AI features without rebuilding auth',
      'Token Vault enabling secure third-party API access for AI features',
      'FGA letting their enterprise customers define their own AI access policies',
      'Auth0 integration reducing security questionnaire response time from weeks to days',
    ],
    analogies: [
      'Like how SaaS companies stopped building their own auth and adopted Auth0 — same evolution happening for AI identity',
      'Security questionnaires are the enterprise buying signal — answering them well accelerates deals',
      'Building identity in-house means maintaining it forever — engineering time better spent on product differentiation',
    ],
  },
  {
    id: 'pp-manufacturing-iot',
    industry: 'Manufacturing',
    situation:
      'Global manufacturer. Deploying AI agents to monitor production lines, predict maintenance, and optimize supply chain. Agents need access to IoT sensor data, ERP systems, and supplier portals. Operations across 12 countries. IT team is small and stretched thin.',
    hesitation: 'Operational scale. Small IT team. Multi-country complexity.',
    relevantPatterns: [
      'Manufacturing companies using Workforce Identity for AI to manage AI tool access across global operations',
      'ISPM discovering shadow AI usage across 12-country operations',
      'Token Vault managing credentials for IoT platform and ERP system connections',
      'Agent Identity providing per-factory agent scoping for compliance in different jurisdictions',
    ],
    analogies: [
      'Like how a small IT team uses Okta to manage 10,000 employees across 12 countries — same approach for AI agent identity at scale',
      'IoT sensor access + AI agent access = two layers of non-human identity that need governance',
      'Different countries have different AI regulations — agent identity scoping handles jurisdictional compliance',
    ],
  },
  {
    id: 'pp-government-contractor',
    industry: 'Government',
    situation:
      'Defense contractor building AI-powered document analysis for classified and unclassified materials. Need to handle CUI (Controlled Unclassified Information) and potentially classified data. FedRAMP requirements. Zero trust architecture mandate. Evaluating AI copilots for their analysts.',
    hesitation: 'FedRAMP/CMMC compliance. Classification-level access control. Zero trust mandate.',
    relevantPatterns: [
      'Government contractors using FGA for classification-level access boundaries in AI systems',
      'Okta FedRAMP authorization supporting compliant AI agent identity',
      'ISPM providing continuous monitoring aligned with zero trust principles',
      'Agent Identity implementing need-to-know access for AI document analysis',
    ],
    analogies: [
      'AI agents need security clearance levels just like human analysts — Agent Identity creates the equivalent',
      'Zero trust for AI means verifying every agent action, not just initial authentication',
      'CUI handling rules apply whether a human or AI agent accesses the document — identity controls enforce this',
    ],
  },
]
