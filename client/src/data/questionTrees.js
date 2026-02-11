// Question Trees - Interactive branching question paths based on stakeholder responses
// These show how to navigate discovery conversations based on different response types

export const questionTrees = {
  sales: {
    name: 'Sales Discovery',
    trees: [
      {
        id: 'sales-opening',
        rootQuestion: 'What prompted you to look at this now?',
        description: 'Opening question to understand timing and triggers',
        branches: [
          {
            responseType: 'audit',
            responseLabel: 'Audit Finding',
            example: '"We had some findings in our last SOC 2 audit..."',
            sentiment: 'urgent',
            followUp: 'What specific findings came up?',
            nextBranches: [
              {
                responseType: 'access-controls',
                responseLabel: 'Access Control Issues',
                example: '"We couldn\'t demonstrate proper access reviews..."',
                followUp: 'How are you handling access reviews today?',
                insight: 'Strong pain point - they have a compliance deadline',
              },
              {
                responseType: 'segregation',
                responseLabel: 'Segregation of Duties',
                example: '"We have SOD conflicts we can\'t easily track..."',
                followUp: 'Which applications have the most critical SOD requirements?',
                insight: 'Good opportunity for policy automation',
              },
            ],
          },
          {
            responseType: 'growing-pains',
            responseLabel: 'Growing Pains / Manual Processes',
            example: '"We\'ve grown a lot and can\'t keep up manually..."',
            sentiment: 'neutral',
            followUp: 'Can you walk me through the current process?',
            nextBranches: [
              {
                responseType: 'access-requests',
                responseLabel: 'Access Request Backlog',
                example: '"It takes days to get new employees set up..."',
                followUp: 'How many access requests do you process per month?',
                insight: 'Quantify the pain - time and productivity impact',
              },
              {
                responseType: 'visibility',
                responseLabel: 'Visibility Issues',
                example: '"We don\'t really know who has access to what..."',
                followUp: 'When was the last time you did a full access review?',
                insight: 'Risk angle - unknown exposure',
              },
            ],
          },
          {
            responseType: 'leadership',
            responseLabel: 'Leadership Mandate',
            example: '"Our new CISO is prioritizing identity..."',
            sentiment: 'positive',
            followUp: 'What specifically is driving that priority?',
            nextBranches: [
              {
                responseType: 'security-incident',
                responseLabel: 'After a Security Incident',
                example: '"We had a breach related to excessive access..."',
                followUp: 'What changes came out of that incident review?',
                insight: 'High urgency - they have executive attention',
              },
              {
                responseType: 'strategic-initiative',
                responseLabel: 'Strategic Initiative',
                example: '"It\'s part of our Zero Trust roadmap..."',
                followUp: 'Where does IGA fit in that roadmap?',
                insight: 'Align to their broader vision',
              },
            ],
          },
          {
            responseType: 'vague',
            responseLabel: 'Vague / Deflecting',
            example: '"Just exploring options..." or "Someone suggested we look..."',
            sentiment: 'skeptical',
            followUp: 'Help me understand - what would a successful outcome look like for you?',
            nextBranches: [
              {
                responseType: 'opens-up',
                responseLabel: 'Opens Up',
                example: '"Well, honestly we\'ve been struggling with..."',
                followUp: 'Tell me more about that challenge.',
                insight: 'They were testing you - now engage deeply',
              },
              {
                responseType: 'stays-closed',
                responseLabel: 'Stays Guarded',
                example: '"We\'re still figuring that out..."',
                followUp: 'What would need to be true for this to become a priority?',
                insight: 'Low priority - try to understand what would change that',
              },
            ],
          },
        ],
      },
      {
        id: 'sales-success',
        rootQuestion: 'What would success look like for this initiative?',
        description: 'Understanding their vision and success criteria',
        branches: [
          {
            responseType: 'compliance',
            responseLabel: 'Pass Audits',
            example: '"We need to pass our SOC 2 without findings..."',
            sentiment: 'neutral',
            followUp: 'What specific controls are you most concerned about?',
            nextBranches: [
              {
                responseType: 'specific',
                responseLabel: 'Names Specific Controls',
                example: '"Access certifications and user provisioning..."',
                followUp: 'How are you handling those controls today?',
                insight: 'They know their pain points - dig into current gaps',
              },
            ],
          },
          {
            responseType: 'efficiency',
            responseLabel: 'Operational Efficiency',
            example: '"We want to cut down access request time..."',
            sentiment: 'positive',
            followUp: "What's the current turnaround time?",
            nextBranches: [
              {
                responseType: 'numbers',
                responseLabel: 'Provides Metrics',
                example: '"It takes about 3-5 days on average..."',
                followUp: 'What do you think it should be?',
                insight: 'Build the business case with their numbers',
              },
            ],
          },
          {
            responseType: 'visibility',
            responseLabel: 'Better Visibility',
            example: '"We need to know who has access to what..."',
            sentiment: 'neutral',
            followUp: 'What decisions would you make differently with that visibility?',
            nextBranches: [
              {
                responseType: 'risk',
                responseLabel: 'Risk Reduction',
                example: '"We could identify and remove excessive access..."',
                followUp: 'What applications have the most sensitive access?',
                insight: 'Security-focused buyer - lead with risk reduction',
              },
            ],
          },
        ],
      },
    ],
  },
  technical: {
    name: 'Technical Discovery',
    trees: [
      {
        id: 'tech-architecture',
        rootQuestion: 'Walk me through your current architecture.',
        description: 'Understanding their technical environment',
        branches: [
          {
            responseType: 'cloud-native',
            responseLabel: 'Cloud-Native',
            example: '"We\'re all in AWS/Azure/GCP..."',
            sentiment: 'positive',
            followUp: 'How are you managing identities across your cloud environment?',
            nextBranches: [
              {
                responseType: 'native-iam',
                responseLabel: 'Using Cloud IAM',
                example: '"We use AWS IAM roles and Azure AD..."',
                followUp: 'How do you handle cross-cloud access governance?',
                insight: 'Multi-cloud complexity is an opportunity',
              },
              {
                responseType: 'centralized',
                responseLabel: 'Centralized Identity',
                example: '"Everything goes through Okta/Azure AD..."',
                followUp: 'How are you handling access reviews and certifications?',
                insight: 'Already have IdP - IGA is the natural next step',
              },
            ],
          },
          {
            responseType: 'hybrid',
            responseLabel: 'Hybrid Environment',
            example: '"We have on-prem AD but are moving to cloud..."',
            sentiment: 'neutral',
            followUp: "What's driving the migration timeline?",
            nextBranches: [
              {
                responseType: 'migration-in-progress',
                responseLabel: 'Active Migration',
                example: '"We\'re moving workloads over the next year..."',
                followUp: 'How are you handling identity during the transition?',
                insight: 'Good timing - can help with migration',
              },
              {
                responseType: 'hybrid-long-term',
                responseLabel: 'Hybrid Long-Term',
                example: '"Some things will stay on-prem..."',
                followUp: 'Which workloads need to stay on-prem?',
                insight: 'Need solution that works across both',
              },
            ],
          },
          {
            responseType: 'legacy',
            responseLabel: 'Mostly On-Prem',
            example: '"We\'re still primarily on-premises..."',
            sentiment: 'neutral',
            followUp: "What's your cloud strategy looking like?",
            nextBranches: [
              {
                responseType: 'cloud-curious',
                responseLabel: 'Planning Cloud Move',
                example: '"We\'re starting to look at cloud options..."',
                followUp: "What's driving the interest in cloud?",
                insight: 'Position IGA as part of their modernization',
              },
              {
                responseType: 'staying-on-prem',
                responseLabel: 'Committed to On-Prem',
                example: '"We have regulatory requirements to stay on-prem..."',
                followUp: 'What compliance frameworks are driving that?',
                insight: 'Need to address their specific constraints',
              },
            ],
          },
        ],
      },
      {
        id: 'tech-limitations',
        rootQuestion: 'What limitations are you hitting with your current solution?',
        description: 'Identifying technical pain points',
        branches: [
          {
            responseType: 'connectors',
            responseLabel: 'Integration Challenges',
            example: '"We can\'t connect to all our applications..."',
            sentiment: 'neutral',
            followUp: 'Which applications are the biggest gaps?',
            nextBranches: [
              {
                responseType: 'custom-apps',
                responseLabel: 'Custom Applications',
                example: '"Our internal apps don\'t have standard APIs..."',
                followUp: 'How are you managing access to those apps today?',
                insight: 'Good opportunity for custom connector discussion',
              },
              {
                responseType: 'saas-apps',
                responseLabel: 'SaaS Applications',
                example: '"Some of our SaaS tools aren\'t supported..."',
                followUp: 'Which SaaS apps are the highest priority?',
                insight: 'Check connector availability - may have good news',
              },
            ],
          },
          {
            responseType: 'performance',
            responseLabel: 'Performance Issues',
            example: '"Access reviews take forever to load..."',
            sentiment: 'negative',
            followUp: 'How many users and applications are in your environment?',
            nextBranches: [
              {
                responseType: 'scale',
                responseLabel: 'Scale Issues',
                example: '"We have 50k users across 200 apps..."',
                followUp: 'How long does a typical access review take?',
                insight: 'Opportunity to differentiate on performance',
              },
            ],
          },
          {
            responseType: 'complexity',
            responseLabel: 'Too Complex',
            example: '"It takes too long to configure policies..."',
            sentiment: 'negative',
            followUp: "What's the most frustrating part of the configuration?",
            nextBranches: [
              {
                responseType: 'ps-dependency',
                responseLabel: 'PS Dependency',
                example: '"We need professional services for everything..."',
                followUp: 'How much are you spending on PS annually?',
                insight: 'TCO angle - compare to self-service model',
              },
            ],
          },
        ],
      },
    ],
  },
  aiAgents: {
    name: 'AI Agents Discovery',
    trees: [
      {
        id: 'ai-initiatives',
        rootQuestion: 'What AI or GenAI initiatives are you working on?',
        description: 'Understanding their AI journey',
        branches: [
          {
            responseType: 'production',
            responseLabel: 'Production AI',
            example: '"We have agents in production already..."',
            sentiment: 'positive',
            followUp: 'What are those agents doing?',
            nextBranches: [
              {
                responseType: 'customer-facing',
                responseLabel: 'Customer-Facing Agents',
                example: '"Customer service chatbots with system access..."',
                followUp: 'How are you controlling what those agents can access?',
                insight: 'Auth0 for GenAI Applications + Token Vault for customer-facing agents',
                productRecommendation: 'Auth0 for GenAI + Token Vault',
              },
              {
                responseType: 'internal',
                responseLabel: 'Internal Automation',
                example: '"Internal process automation agents..."',
                followUp: 'What systems do they need to interact with?',
                insight:
                  'Okta Workforce Identity or Okta Agent Identity depending on user vs machine identity',
                productRecommendation: 'Okta Workforce Identity / Agent Identity',
              },
            ],
          },
          {
            responseType: 'piloting',
            responseLabel: 'Pilots / POCs',
            example: '"We\'re running some pilots..."',
            sentiment: 'neutral',
            followUp: 'What use cases are you testing?',
            nextBranches: [
              {
                responseType: 'expanding',
                responseLabel: 'Planning to Expand',
                example: '"We want to roll out more broadly..."',
                followUp: 'What needs to be true before you can scale?',
                insight: 'Position security as enabler, not blocker',
              },
            ],
          },
          {
            responseType: 'exploring',
            responseLabel: 'Early Exploration',
            example: '"We\'re still figuring out where AI fits..."',
            sentiment: 'neutral',
            followUp: 'What areas are you most interested in?',
            nextBranches: [
              {
                responseType: 'interested',
                responseLabel: 'Shows Interest',
                example: '"We\'re looking at automating our help desk..."',
                followUp: 'What systems would that agent need to access?',
                insight: 'Help them think through the security implications early',
              },
            ],
          },
          {
            responseType: 'cautious',
            responseLabel: 'Cautious / Skeptical',
            example: '"We\'re being very careful about AI..."',
            sentiment: 'skeptical',
            followUp: 'What are your biggest concerns?',
            nextBranches: [
              {
                responseType: 'security-concerns',
                responseLabel: 'Security Worries',
                example: '"We\'re worried about data exposure..."',
                followUp: 'How are you thinking about controlling agent access?',
                insight: 'Lead with governance and control',
              },
              {
                responseType: 'regulatory',
                responseLabel: 'Regulatory Concerns',
                example: '"We\'re waiting to see how regulations develop..."',
                followUp: 'Are you tracking the EU AI Act?',
                insight: 'Position as compliance enabler',
              },
            ],
          },
        ],
      },
      {
        id: 'product-selection',
        rootQuestion:
          'Who are the users of your AI applications - your employees or your customers?',
        description: 'Determining Okta vs Auth0 product fit',
        branches: [
          {
            responseType: 'employees',
            responseLabel: 'Employees / Workforce',
            example: '"Our employees are using AI tools like ChatGPT Enterprise..."',
            sentiment: 'positive',
            followUp: 'Do you have existing Okta Workforce Identity deployed?',
            productRecommendation: 'Okta',
            products: ['Okta Workforce Identity for AI', 'Okta ISPM for AI'],
            nextBranches: [
              {
                responseType: 'existing-okta',
                responseLabel: 'Yes, existing Okta',
                example: '"Yes, we use Okta for employee SSO..."',
                followUp: 'Are you concerned about shadow AI usage by employees?',
                insight: 'Easy upsell - extend existing Okta deployment',
                productRecommendation: 'Okta Workforce Identity + ISPM for AI',
              },
              {
                responseType: 'no-okta',
                responseLabel: 'No Okta today',
                example: '"No, we use Microsoft Entra / Azure AD..."',
                followUp: 'Do you have visibility into what AI tools employees are using?',
                insight: 'Position Okta ISPM for shadow AI discovery',
                productRecommendation: 'Okta ISPM for AI (shadow AI discovery)',
              },
            ],
          },
          {
            responseType: 'customers',
            responseLabel: 'Customers / End Users',
            example: '"We\'re building AI chatbots for our customers..."',
            sentiment: 'positive',
            followUp: 'Are these AI features embedded in your product, or separate applications?',
            productRecommendation: 'Auth0',
            products: ['Auth0 for GenAI Applications', 'Auth0 Token Vault', 'Auth0 FGA'],
            nextBranches: [
              {
                responseType: 'embedded',
                responseLabel: 'Embedded in Product',
                example: '"It\'s part of our SaaS product..."',
                followUp: 'How are your AI agents accessing customer data securely?',
                insight: 'Auth0 Token Vault for agent credential storage',
                productRecommendation: 'Auth0 for GenAI + Token Vault + FGA',
              },
              {
                responseType: 'rag-pipeline',
                responseLabel: 'RAG Pipeline',
                example: '"We have a RAG system that needs permission-aware filtering..."',
                followUp: 'How do you ensure users only see documents they have access to?',
                insight: 'Auth0 FGA (Fine-Grained Authorization) for ReBAC',
                productRecommendation: 'Auth0 FGA + Token Vault',
              },
            ],
          },
          {
            responseType: 'both',
            responseLabel: 'Both Employees and Customers',
            example: '"We have internal AI tools AND customer-facing AI in our product..."',
            sentiment: 'positive',
            followUp:
              'Who owns the budget for each - CISO for internal, or CTO for customer-facing?',
            productRecommendation: 'Both Okta and Auth0',
            products: ['Okta Workforce Identity + ISPM', 'Auth0 for GenAI + Token Vault'],
            nextBranches: [
              {
                responseType: 'separate-budgets',
                responseLabel: 'Separate Budgets',
                example: '"IT budget for internal, Product budget for customer-facing..."',
                followUp: 'Should we have separate conversations with each team?',
                insight: 'Dual sale - Okta to CISO/IT, Auth0 to CTO/Product',
                productRecommendation: 'Okta (workforce) + Auth0 (customer)',
              },
            ],
          },
          {
            responseType: 'autonomous-agents',
            responseLabel: 'Autonomous Agents / Machine Identity',
            example: '"We have production agents that run autonomously..."',
            sentiment: 'neutral',
            followUp: "What's more important - governance and compliance, or developer speed?",
            productRecommendation: 'Okta or Auth0 (depends on priority)',
            products: ['Okta Identity for AI Agents', 'Auth0 Token Vault + XAA'],
            nextBranches: [
              {
                responseType: 'governance-focus',
                responseLabel: 'Governance Priority',
                example: '"We need audit trails and policy enforcement..."',
                followUp: 'How are you handling agent credential rotation today?',
                insight: 'Okta Identity for AI Agents (enterprise governance)',
                productRecommendation: 'Okta Identity for AI Agents',
              },
              {
                responseType: 'developer-focus',
                responseLabel: 'Developer Speed Priority',
                example: '"We need something developer-friendly and fast..."',
                followUp: 'Are you using LangChain, CrewAI, or custom frameworks?',
                insight: 'Auth0 Token Vault + XAA (developer experience)',
                productRecommendation: 'Auth0 Token Vault + XAA',
              },
            ],
          },
        ],
      },
      {
        id: 'ai-already-building',
        rootQuestion: "Can you walk me through what you've built so far for agent authentication?",
        description: 'Discovery path for customers who have already started building',
        branches: [
          {
            responseType: 'mcp-gateway',
            responseLabel: 'Built MCP Gateway',
            example:
              '"We built an MCP gateway that validates tokens and routes to downstream MCP servers..."',
            sentiment: 'positive',
            followUp:
              'How does your gateway validate the tokens — does it check scopes, or just verify the JWT signature?',
            nextBranches: [
              {
                responseType: 'scope-based',
                responseLabel: 'Scope-Based Routing',
                example:
                  '"We exchange the token for the right scopes, then the gateway routes based on that..."',
                followUp:
                  "Are you passing the user's ID token all the way through, or do you exchange it at each hop?",
                insight:
                  'They may be losing the workload principal relationship. Key gap for XAA with ID-JAG.',
                productRecommendation: 'XAA with ID-JAG for token exchange',
              },
              {
                responseType: 'basic-jwt',
                responseLabel: 'Basic JWT Validation',
                example: '"We just validate the JWT and pass it through..."',
                followUp:
                  'How do you handle the case where different users should have different access to the same MCP server?',
                insight:
                  'No scoped authorization — opportunity for custom auth server with access policies.',
                productRecommendation: 'Okta custom authorization servers + access policies',
              },
            ],
          },
          {
            responseType: 'token-exchange',
            responseLabel: 'Built Token Exchange',
            example:
              '"We exchange the user token to get tokens with the right scopes for downstream services..."',
            sentiment: 'positive',
            followUp: 'How is what you built different from a regular OAuth client ID and secret?',
            nextBranches: [
              {
                responseType: 'confused',
                responseLabel: 'Struggles to Articulate Difference',
                example: '"That\'s actually what we\'re trying to understand..."',
                followUp:
                  'Let me explain the key difference — with Okta, the agent is a first-class identity with its own workload principal...',
                insight:
                  'Perfect teaching moment. Explain workload principal, managed connections, and ID-JAG.',
                productRecommendation: 'Okta Agent Identity + XAA',
              },
              {
                responseType: 'understands-gap',
                responseLabel: 'Sees the Gap',
                example: '"We lose the user context when we pass through the gateway..."',
                followUp:
                  "That's exactly the problem ID-JAG solves. Would a hands-on POC environment help your team evaluate?",
                insight: "They're ready for a POC. Offer Colab notebook and preview tenant.",
                productRecommendation: 'XAA with ID-JAG + POC environment',
              },
            ],
          },
          {
            responseType: 'third-party-services',
            responseLabel: 'Third-Party Services Outside IDP',
            example: '"We have Salesforce and Asana MCP servers where users log in separately..."',
            sentiment: 'neutral',
            followUp:
              'How do you handle the ongoing refresh of those third-party tokens? Is it per-user or shared?',
            nextBranches: [
              {
                responseType: 'per-user',
                responseLabel: 'Per-User Authorization',
                example: '"Each user authorizes once and we store the token..."',
                followUp:
                  "Brokered consent through Okta would automate that — user authorizes once, Okta manages the refresh. That's coming in Q2.",
                insight: 'Clear fit for brokered consent. Be transparent about timing.',
                productRecommendation: 'Brokered consent (Q2 roadmap)',
              },
              {
                responseType: 'shared-creds',
                responseLabel: 'Shared Service Account',
                example: '"We use a shared service account for the integration..."',
                followUp:
                  'How do you audit what each user accessed through that shared credential?',
                insight:
                  'Shared creds = no user-level audit trail. Opportunity for managed connections with per-user scoping.',
                productRecommendation: 'Managed connections (secrets + service accounts)',
              },
            ],
          },
          {
            responseType: 'piece-by-piece',
            responseLabel: 'Built Incrementally / Needs Reset',
            example:
              '"The team built it piece by piece... we realized we need to step back and evaluate..."',
            sentiment: 'neutral',
            followUp: 'What prompted you to pause and take a step back?',
            nextBranches: [
              {
                responseType: 'scaling-concerns',
                responseLabel: 'Scaling Concerns',
                example: '"It works for our two services but we\'re about to add more..."',
                followUp:
                  'Let us set up a preview tenant and Colab notebook so your team can evaluate the full pattern.',
                insight: 'They need a holistic architecture view. Offer guided POC, not just docs.',
                productRecommendation: 'Full Okta for AI Agents evaluation',
              },
              {
                responseType: 'doc-confusion',
                responseLabel: 'Confused by Documentation',
                example: '"We read through the docs and got confused..."',
                followUp:
                  "Let's do a working session where we walk through your specific architecture with the Okta tools.",
                insight: "Docs aren't enough. Offer hands-on checkpoint call in 1-2 weeks.",
                productRecommendation: 'Guided enablement + checkpoint sessions',
              },
            ],
          },
          {
            responseType: 'entra-based',
            responseLabel: 'Using Microsoft Entra for Agents',
            example: '"We use Entra workload identities for our agents..."',
            sentiment: 'neutral',
            followUp:
              'How do you handle agent discovery — knowing which agents exist and what they can access?',
            nextBranches: [
              {
                responseType: 'no-discovery',
                responseLabel: 'No Agent Discovery',
                example: '"We don\'t really have that visibility..."',
                followUp:
                  "That's where ISPM comes in. It works alongside Entra — no need to replace your IDP.",
                insight:
                  'ISPM is IDP-agnostic. Position as complement, not replacement. Never say "you need to switch to Okta."',
                productRecommendation: 'Okta ISPM for AI (alongside Entra)',
              },
              {
                responseType: 'manual-tracking',
                responseLabel: 'Manual Tracking',
                example: '"We have a spreadsheet of registered agents..."',
                followUp:
                  'How often does that get updated? What about agents teams spin up without telling IT?',
                insight:
                  "Shadow AI gap even in Microsoft shops. ISPM automates what spreadsheets can't.",
                productRecommendation: 'Okta ISPM for AI',
              },
            ],
          },
        ],
      },
      {
        id: 'ai-security',
        rootQuestion: 'What keeps you up at night about AI security?',
        description: 'Understanding their fears and priorities',
        branches: [
          {
            responseType: 'data-access',
            responseLabel: 'Data Access Concerns',
            example: '"Agents accessing data they shouldn\'t..."',
            sentiment: 'urgent',
            followUp: 'How are you controlling agent data access today?',
            nextBranches: [
              {
                responseType: 'ad-hoc',
                responseLabel: 'Ad-Hoc Controls',
                example: '"We\'re doing it manually or case by case..."',
                followUp: 'How do you audit what agents have accessed?',
                insight: 'Clear need for systematic governance',
              },
            ],
          },
          {
            responseType: 'shadow-ai',
            responseLabel: 'Shadow AI',
            example: '"We don\'t know what AI people are using..."',
            sentiment: 'urgent',
            followUp: 'What visibility do you have into AI tool usage?',
            productRecommendation: 'Okta ISPM for AI',
            nextBranches: [
              {
                responseType: 'no-visibility',
                responseLabel: 'No Visibility',
                example: '"Honestly, very little..."',
                followUp: 'How are you discovering new AI deployments?',
                insight: 'Okta ISPM for AI - shadow AI discovery via OAuth grant monitoring',
                productRecommendation: 'Okta ISPM for AI',
              },
            ],
          },
          {
            responseType: 'agent-behavior',
            responseLabel: 'Agent Behavior',
            example: '"What if an agent goes rogue..."',
            sentiment: 'neutral',
            followUp: 'What controls would you want in place?',
            nextBranches: [
              {
                responseType: 'guardrails',
                responseLabel: 'Wants Guardrails',
                example: '"We need to limit what agents can do..."',
                followUp: 'How do you envision setting those limits?',
                insight: 'Policy-based access control is the answer',
              },
            ],
          },
        ],
      },
      {
        id: 'ai-maturity',
        rootQuestion: 'How many AI agents exist in your organization today?',
        description: 'Assessing agent maturity level - the universal opener from real calls',
        branches: [
          {
            responseType: 'unknown',
            responseLabel: "We Don't Know",
            example: '"We don\'t really have visibility into that..."',
            sentiment: 'neutral',
            followUp:
              "That's actually very common. Would visibility into agent deployments be valuable?",
            nextBranches: [
              {
                responseType: 'visibility-yes',
                responseLabel: "Yes, That's a Concern",
                example: '"Yes, that\'s something we\'ve been worried about..."',
                followUp: 'What would you do with that visibility?',
                insight: 'ISPM is the entry point. Shadow AI discovery and agent governance.',
                productRecommendation: 'Okta ISPM for AI',
              },
              {
                responseType: 'visibility-no',
                responseLabel: 'Not Really a Priority',
                example: '"Not really a priority right now..."',
                followUp: 'What IS the priority for AI right now?',
                insight: 'Redirect to their actual pain. May need a different entry point.',
              },
            ],
          },
          {
            responseType: 'few-pilots',
            responseLabel: 'We Have a Few in Pilot',
            example: '"We have a couple of pilots running..."',
            sentiment: 'positive',
            followUp: 'What use cases are they covering?',
            nextBranches: [
              {
                responseType: 'customer-service',
                responseLabel: 'Customer Service / Help Desk',
                example: '"Customer service chatbots, help desk automation..."',
                followUp: 'How do those agents authenticate to your backend systems?',
                insight: 'Auth0 for customer-facing, Token Vault for agent credential storage',
                productRecommendation: 'Auth0 for GenAI + Token Vault',
              },
              {
                responseType: 'internal-productivity',
                responseLabel: 'Internal Productivity',
                example: '"Internal Copilots and productivity tools..."',
                followUp: 'Are those Copilot/ChatGPT Enterprise, or custom-built agents?',
                insight: 'Copilot = ISPM play for shadow AI. Custom = full agent identity stack.',
                productRecommendation: 'Okta Workforce Identity + Agent Identity or ISPM',
              },
            ],
          },
          {
            responseType: 'advanced',
            responseLabel: '50+ Agents, Hundreds of Developers',
            example:
              '"We have dozens of agents in production, teams building across the organization..."',
            sentiment: 'positive',
            followUp: 'How are you handling identity for those agents at scale?',
            nextBranches: [
              {
                responseType: 'client-ids',
                responseLabel: 'Each Agent Gets a Client ID',
                example: '"Each agent gets its own OAuth client ID..."',
                followUp:
                  'How is that different from a regular OAuth app? What makes it work for agents specifically?',
                insight:
                  'They may not understand workload principals yet. Teaching moment on managed identity.',
                productRecommendation: 'Okta Agent Identity for managed workload principals',
              },
              {
                responseType: 'custom-system',
                responseLabel: 'We Built Our Own System',
                example: '"We built our own agent identity and token exchange system..."',
                followUp: 'What prompted you to look at Okta?',
                insight:
                  "They hit scaling limits. Opportunity to show how we handle complexity they've discovered.",
                productRecommendation: 'Full Okta for AI Agents (XAA, ID-JAG, ISPM)',
              },
            ],
          },
          {
            responseType: 'policy-against',
            responseLabel: 'We Have a Policy Against AI',
            example: '"We\'ve restricted AI usage..."',
            sentiment: 'skeptical',
            followUp: 'How are you enforcing that policy?',
            nextBranches: [
              {
                responseType: 'training-docs',
                responseLabel: 'Training and Policy Docs',
                example: '"Training, policy documentation, and governance reviews..."',
                followUp: 'Do you have technical enforcement, or is it trust-based?',
                insight: 'Shadow AI gap even with policy. ISPM can automate detection.',
                productRecommendation: 'Okta ISPM for AI (detect shadow AI)',
              },
              {
                responseType: 'network-block',
                responseLabel: 'Block at Network Level',
                example: '"We block it at the network level..."',
                followUp:
                  "What about browser-based AI tools that don't need special network access?",
                insight: 'Chrome extensions + OAuth grant monitoring will catch shadow AI.',
                productRecommendation: 'Okta ISPM for AI (OAuth-based detection)',
              },
            ],
          },
        ],
      },
      {
        id: 'ai-permissions',
        rootQuestion:
          'When an agent acts on behalf of a user, does it inherit the full user permissions or do you scope it down?',
        description: 'The #1 discovery question - FGA is universally needed',
        branches: [
          {
            responseType: 'full-permissions',
            responseLabel: 'Full User Permissions',
            example: '"The agent inherits whatever permissions the user has..."',
            sentiment: 'urgent',
            followUp: 'So if the agent makes a mistake, it has the same blast radius as the user?',
            nextBranches: [
              {
                responseType: 'concern-acknowledged',
                responseLabel: "Yes, That's a Concern",
                example: '"Yeah, that\'s something we\'re worried about..."',
                followUp:
                  "That's exactly what fine-grained authorization solves. Want me to show you how FGA works?",
                insight: "Direct FGA pitch opportunity. They're ready to hear the solution.",
                productRecommendation: 'Auth0 FGA for fine-grained authorization',
              },
              {
                responseType: 'trust-guardrails',
                responseLabel: 'We Trust the Guardrails',
                example: '"We trust the AI guardrails to prevent bad actions..."',
                followUp:
                  'What if the model hallucinates and calls the wrong API or accesses the wrong data?',
                insight:
                  "Technical guardrails aren't enough. Identity-layer controls are mandatory.",
                productRecommendation: 'Auth0 FGA for technical authorization enforcement',
              },
            ],
          },
          {
            responseType: 'scoped-manually',
            responseLabel: 'We Scope It Down Manually',
            example: '"We manually create scoped tokens or service accounts for each agent..."',
            sentiment: 'neutral',
            followUp: 'How do you manage that across multiple agents and multiple systems?',
            nextBranches: [
              {
                responseType: 'getting-unwieldy',
                responseLabel: "It's Getting Unwieldy",
                example: '"It\'s getting hard to track and manage as we add more agents..."',
                followUp:
                  "That's the pattern we see at scale. FGA with Relationship-Based Access Control automates that.",
                insight:
                  "They're feeling the pain of manual scoping. Ready for structured authorization.",
                productRecommendation: 'Auth0 FGA with ReBAC',
              },
              {
                responseType: 'works-for-now',
                responseLabel: 'It Works for Now',
                example: '"It\'s manageable at our current scale..."',
                followUp: 'How many agents and how many systems is that across?',
                insight: 'Probe for scale concerns. When do they hit the wall?',
              },
            ],
          },
          {
            responseType: 'not-thought-through',
            responseLabel: "We Haven't Thought About It",
            example: '"We haven\'t really addressed this yet..."',
            sentiment: 'neutral',
            followUp:
              "That's common for teams just getting started. Most teams discover this need when they move from pilot to production.",
            nextBranches: [
              {
                responseType: 'early-stage',
                responseLabel: "We're Far From Production",
                example: '"We\'re still in early pilots..."',
                followUp: 'What would need to be true security-wise before you go to production?',
                insight: 'Plant the seed now. FGA becomes critical when they scale.',
                productRecommendation: 'Position FGA as production requirement',
              },
              {
                responseType: 'production-soon',
                responseLabel: "Actually We're Going to Production Soon",
                example: '"Actually, we\'re planning to scale in the next few months..."',
                followUp:
                  'Then this is the right time to think about it. What systems will agents access?',
                insight: 'Urgency - they need to solve this now before production scaling.',
                productRecommendation: 'Auth0 FGA (urgent implementation before scale)',
              },
            ],
          },
        ],
      },
      {
        id: 'ai-evaluation',
        rootQuestion: 'Are you evaluating other vendors for AI security?',
        description: 'Competitive and budget discovery - handle price-first buyers',
        branches: [
          {
            responseType: 'price-first',
            responseLabel: 'What Does This Cost?',
            example: '"Before we go further, what\'s the pricing model?"',
            sentiment: 'neutral',
            followUp:
              'Happy to get into pricing. First, help me understand which capabilities matter most so I can give you an accurate picture.',
            nextBranches: [
              {
                responseType: 'ballpark-only',
                responseLabel: 'Just Give Me a Ballpark',
                example: '"Just give me a rough order of magnitude..."',
                followUp:
                  'For agent identity and FGA, it depends on agent count and authorization volume. Can you share those numbers?',
                insight: "Don't deflect entirely - give a framework for pricing.",
                productRecommendation: 'Pricing framework based on agent count and volume',
              },
              {
                responseType: 'budget-constrained',
                responseLabel: 'We Have a Specific Budget',
                example: '"We have a budget of X for this..."',
                followUp:
                  "What's the range you're working with? I want to make sure we scope appropriately.",
                insight: 'Work backward from budget to solution.',
                productRecommendation: 'Scope solution to fit budget',
              },
            ],
          },
          {
            responseType: 'competitor-transmit',
            responseLabel: 'Evaluating Transmit Security',
            example: '"We\'re looking at Transmit Security for AI security..."',
            sentiment: 'neutral',
            followUp: 'What specifically attracted you to Transmit?',
            nextBranches: [
              {
                responseType: 'ai-native',
                responseLabel: 'AI-Native Security Positioning',
                example: '"They position as AI-native security..."',
                followUp:
                  "Transmit is strong on runtime security. Are you also looking for agent discovery (ISPM) and identity management? That's where we differentiate.",
                insight: 'Position breadth vs point solution. We cover full lifecycle.',
                productRecommendation: 'Okta for full AI security lifecycle',
              },
              {
                responseType: 'recommended',
                responseLabel: 'They Were Recommended',
                example: '"Someone recommended them..."',
                followUp:
                  "What capabilities are you evaluating them on? I want to make sure we're comparing apples to apples.",
                insight: 'Get the eval criteria before comparing.',
              },
            ],
          },
          {
            responseType: 'market-timing',
            responseLabel: "We'll Wait Until Market Matures",
            example: '"We\'re going to wait until the market stabilizes..."',
            sentiment: 'skeptical',
            followUp:
              'What happens to your agent deployments in the meantime? Are they shipping without security controls?',
            nextBranches: [
              {
                responseType: 'paused-agents',
                responseLabel: "We've Paused Agent Work",
                example: '"We\'ve actually paused agent projects..."',
                followUp: 'What would restart them?',
                insight: 'Security may be the blocker. Position as enabler, not constraint.',
                productRecommendation: 'Position Okta/Auth0 as enabler for agent projects',
              },
              {
                responseType: 'agents-shipping',
                responseLabel: 'Agents Shipping Anyway',
                example: '"Agents are shipping, but without formal security architecture..."',
                followUp:
                  'So the risk is growing while you wait. Would a lightweight start with ISPM for visibility make sense?',
                insight: 'ISPM as low-commitment entry point.',
                productRecommendation: 'Okta ISPM for AI (low-commitment starting point)',
              },
            ],
          },
          {
            responseType: 'budget-timing',
            responseLabel: 'Budget is Locked This Year',
            example: '"Our budget cycle is already closed for this year..."',
            sentiment: 'neutral',
            followUp: 'When does your next planning cycle start?',
            nextBranches: [
              {
                responseType: 'future-planning',
                responseLabel: 'Q3/Q4 Planning Cycle',
                example: '"We do planning again in Q3..."',
                followUp:
                  "Let's do a POC now so you have data for the business case. No commitment needed.",
                insight: 'POC as bridge to next budget cycle.',
                productRecommendation: 'POC + business case development',
              },
              {
                responseType: 'already-submitted',
                responseLabel: 'Already Submitted for Next Year',
                example: '"We already have our initial request in for next year..."',
                followUp: 'Is AI security in that plan?',
                insight:
                  "May need to get added to next year's budget. Help build the business case.",
                productRecommendation: 'Help develop business case for next budget cycle',
              },
            ],
          },
        ],
      },
    ],
  },
}

export function getTreesForTrack(track) {
  return questionTrees[track]?.trees || []
}

export function getAllTrees() {
  return Object.entries(questionTrees).flatMap(([track, data]) =>
    data.trees.map((tree) => ({ ...tree, track, trackName: data.name }))
  )
}
