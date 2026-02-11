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
        'It builds trust and positions you as a partner, not a vendor',
      ],
    },
    {
      id: 'discovery-mindset',
      title: 'The Discovery Mindset',
      content: `Approach every conversation with genuine curiosity. Your job is to be a detective, not a salesperson. The best discoveries feel like conversations, not interrogations.`,
      keyPoints: [
        'Be genuinely curious about their business',
        'Listen more than you talk (aim for 70/30)',
        'Ask follow-up questions based on what they say',
        "Don't assume you know their problems",
        'Be patient - trust takes time to build',
        "Take notes and reference what they've shared",
      ],
    },
    {
      id: 'common-mistakes',
      title: 'Common Mistakes to Avoid',
      content: `Even experienced sellers fall into these traps. Awareness is the first step to improvement.`,
      mistakes: [
        {
          mistake: 'Jumping to pitching too early',
          why: "You haven't earned the right to pitch yet. Without understanding their problems, your pitch is just noise.",
          instead:
            "Stay in discovery mode until you fully understand their situation and they've expressed genuine interest.",
        },
        {
          mistake: 'Asking generic questions',
          why: 'Generic questions get generic answers. "What keeps you up at night?" signals you didn\'t prepare.',
          instead: 'Ask specific questions that show you understand their industry and role.',
        },
        {
          mistake: 'Talking more than listening',
          why: "Every minute you talk is a minute you're not learning. Stakeholders notice when you're not listening.",
          instead:
            'Practice active listening. Pause before responding. Reference what they just said.',
        },
        {
          mistake: 'Not following up on vague answers',
          why: 'Vague answers hide the real story. Accepting them means missing critical information.',
          instead: 'Dig deeper with "Tell me more about that" or "Can you give me an example?"',
        },
        {
          mistake: 'Asking about budget too early',
          why: 'Budget questions feel transactional before trust is established.',
          instead:
            "Wait until you've established value and they're engaged before discussing budget.",
        },
        {
          mistake: 'Badmouthing competitors',
          why: 'It makes you look insecure and unprofessional. Stakeholders may have relationships with those vendors.',
          instead: 'Acknowledge competitors professionally and differentiate on your strengths.',
        },
        {
          mistake: 'Chasing every tangent',
          why: 'You lose focus and control of the conversation. Some tangents are tests.',
          instead: 'Acknowledge tangents briefly, note them, and redirect back to the main topic.',
        },
      ],
    },
    {
      id: 'real-call-donts',
      title: "Don'ts from Real Discovery Calls",
      content: `These anti-patterns were observed in actual Okta customer discovery calls. Even experienced technical sellers fall into these traps — awareness is the first step.`,
      mistakes: [
        {
          mistake: 'Monologuing through the demo without asking questions',
          why: 'In a real call, the Okta SE talked for 10+ minutes straight about ISPM, admin console, and agent configuration without pausing to ask the customer a single question. The customer had to interrupt to show their own architecture. Discovery should be 70% listening.',
          instead:
            'After every 2-3 minutes of explanation, stop and ask: "Does this map to what you\'re seeing?" or "How does this compare to your current setup?"',
        },
        {
          mistake: "Jumping to demo before understanding the customer's architecture",
          why: 'The Okta team launched into a demo before asking what the customer had already built. The customer interrupted mid-demo to share their MCP gateway architecture — which turned out to be the most productive part of the call.',
          instead:
            'Always ask "Can you walk me through what you have today?" BEFORE demoing. Start from their architecture, not yours.',
        },
        {
          mistake: 'Not probing deeper when the customer asks the key differentiating question',
          why: 'The customer asked the most important question of the call — "How is this agent different from a regular client ID and secret?" — and the initial response deflected to showing the demo instead of directly addressing the architectural difference.',
          instead:
            'When a customer asks "how is this different from what we already do?", stop everything and answer that question directly. This is the moment that determines whether they see value.',
        },
        {
          mistake: 'Being vague about roadmap timelines when the customer needs specifics',
          why: 'Multiple times the Okta team said features were "on the roadmap" or "coming" without giving dates. The customer had to press for specifics. Vague roadmap answers erode trust — the customer needs to plan.',
          instead:
            'Be transparent: "Brokered consent is targeting Q2 this year. Agent-to-agent is Q3. Here\'s what you can do today." Show the preliminary roadmap if you have one.',
        },
        {
          mistake: "Not asking about the customer's existing implementation details",
          why: "The Okta team didn't ask about the MCP gateway implementation, how tokens were being exchanged, or what specific third-party services were involved. The customer volunteered all of this information. Good discovery would have uncovered it proactively.",
          instead:
            'Ask specific technical questions: "How does your MCP gateway validate tokens?" "Which downstream services require separate OAuth?" "Where in the chain do you lose user context?"',
        },
        {
          mistake: 'Saying "that\'s exactly what we have" without acknowledging the gap',
          why: 'When the customer showed their architecture, the initial response was "that\'s exactly what we have in place." But there were important differences (workload principal, brokered consent) that a team member had to clarify. Agreement without nuance is misleading.',
          instead:
            'Acknowledge the similarities, then highlight the specific gaps: "Your flow is similar, but there\'s a key difference in how user context is preserved. Let me show you where."',
        },
        {
          mistake: "Using filler phrases that waste the customer's time",
          why: 'Phrases like "That\'s a great question", "Absolutely", "Correct, correct" repeated multiple times signal that you\'re stalling or not adding value. Busy technical stakeholders notice.',
          instead:
            'Answer directly. Replace "That\'s a great question" with the actual answer. Replace "Absolutely, correct" with specific details.',
        },
        {
          mistake: "Not following up on the customer's acquisition mention",
          why: "The customer mentioned acquiring a browser extension company (SquareX) which was directly relevant to the agent discovery discussion. The Okta team noted it but didn't explore the implications for the customer's architecture or strategy.",
          instead:
            'When a customer reveals a strategic acquisition or initiative, probe: "How does that acquisition change your approach to agent discovery?" "Does SquareX overlap with or complement what we showed you?"',
        },
        {
          mistake:
            "Walking through the full product suite without asking about the customer's specific needs first",
          why: "In a real call, the SE presented Token Vault, async auth, FGA, and MCP auth end-to-end before asking a single question about the customer's architecture. The customer was building prototypes with Keycloak and only needed specific pieces — much of the presentation was irrelevant.",
          instead:
            'Start by asking: "What are you building today and what problems are you running into?" Then tailor the walkthrough to only the pieces that address their specific needs.',
        },
        {
          mistake: 'AE unable to answer basic questions about how the product works',
          why: 'When a customer asked "How does Okta differentiate between a user logged in and the AI agent behind the scenes doing something?" — the AE said "I probably would want to have a solutions engineer answer that." This damages credibility and signals the AE didn\'t prepare.',
          instead:
            "AEs should be able to explain the core value prop: agents are first-class identities in Universal Directory separate from users, with their own credentials and managed connections. You don't need to explain ID-JAG — but you need to explain the concept.",
        },
        {
          mistake: 'Excessive rapport-building that eats into discovery time',
          why: "In real calls, 5-7 minutes were spent on Super Bowl chat, cupcakes, and personal updates before any discovery began. On a 22-minute call, that's 30% of the meeting wasted. On a 31-minute call, that's still 20%. Stakeholders notice when you waste their time.",
          instead:
            "Keep rapport to 1-2 minutes max. Transition with purpose: \"Well I appreciate you making time — I know you're busy. I'd love to learn about what you're doing with AI before I show you anything.\"",
        },
        {
          mistake: 'Discussing internal company changes on a customer call',
          why: 'On a real call, the SDR spent several minutes discussing leaving Okta for another company, territory changes, and internal reorganization — while the customer was waiting. This is unprofessional and signals the team is disorganized.',
          instead:
            'Keep internal discussions completely off customer calls. If there are team changes, communicate them via email. The customer call should be 100% focused on the customer.',
        },
        {
          mistake: 'Not having a solutions engineer on the call when technical depth is needed',
          why: 'On a call with a Director of Infrastructure who asked technical questions about agent identity, the AE had no SE present and had to defer every technical question. The meeting ended with "send me resources" — a polite brush-off.',
          instead:
            "If the customer is technical (engineering, security, infrastructure), always have an SE on the call. If you can't, at least prepare 2-3 answers to the most common technical questions.",
        },
        {
          mistake:
            'Presenting the solution as requiring IDP migration when the customer uses a competitor',
          why: 'When a customer using Entra (Microsoft) asked how Okta helps with AI agents, the AE said "we would need to be the IDP." The customer immediately cooled — they weren\'t looking to replace Entra. The AE missed that ISPM works with any IDP.',
          instead:
            'Lead with what works alongside their existing IDP (ISPM is IDP-agnostic). Position Okta as complementary, not a rip-and-replace. Mention ISPM integrates with Entra, Google, and Okta.',
        },
        {
          mistake:
            "Not asking about the customer's existing auth solution when they mention open-source alternatives",
          why: 'When a customer said "we went with Keycloak for cost reasons," the team moved on without exploring what Keycloak can\'t do for them. They missed the chance to understand gaps that would justify the switch.',
          instead:
            'Ask: "What are the limitations you\'re running into with Keycloak as you scale AI?" or "Is Keycloak handling the agent-specific use cases you need, or are there gaps?"',
        },
        {
          mistake: 'Talking to the wrong person and not qualifying authority',
          why: 'In a real call with Tapestry, the entire meeting was with an outside consultant who explicitly said "I\'m definitely not a decision maker." At Restoration Hardware, the call was 14 minutes with a single platform engineer — no exec sponsor. Discovery with non-decision-makers rarely converts.',
          instead:
            'Within the first 5 minutes, ask: "Who else on your team is involved in evaluating solutions like this?" and "What does your decision process look like?" If you\'re talking to a consultant or individual contributor, ask how to engage the internal team directly.',
        },
        {
          mistake: 'Admitting ignorance about your own product on camera',
          why: 'In a real call, an AE said "I don\'t know the damn thing about AI" before the customer joined. Another AE said "I\'ve been on pat leave, still catching up on AI" mid-call when asked about AI products. Both undermined positioning as the expert the customer needs.',
          instead:
            "If you're not the AI expert, brief yourself before the call or bring an SE who is. Never signal to the customer that you're behind on your own product knowledge.",
        },
        {
          mistake: 'Spending 20-35% of a short call on personal chitchat',
          why: "In a 29-minute Amphenol call, 10+ minutes were spent on Cincinnati family connections and weather. In a 20-minute Tapestry call, 4 minutes were weather chat. In a 14-minute Restoration Hardware call, the AE discussed his SDR's soju business before the customer joined. Rapport matters, but not at the expense of discovery.",
          instead:
            'Cap personal rapport at 2-3 minutes max, especially on calls under 30 minutes. Transition with: "Great catching up — I want to make sure we use your time well. Let me jump into what we wanted to cover."',
        },
        {
          mistake: 'Not asking about competitors the customer is evaluating',
          why: 'At Dropbox, the customer mentioned a "third-party SaaS relationship" but nobody asked who it was. At Qualtrics, the customer volunteered Transmit Security as strong in agentic AI — gold intel. At Amphenol, they\'re evaluating multiple PAM vendors but nobody asked who. Competitive intelligence shapes your positioning.',
          instead:
            'Always ask: "Who else are you looking at for this?" and "What criteria matter most in your evaluation?" If they mention a competitor, ask what impressed them and where they see gaps.',
        },
        {
          mistake: 'Deferring pricing until "later" when the customer explicitly asks',
          why: 'In nearly every call where budget came up, the Okta team deferred — "circle over email" (Dropbox), "business evaluation team will handle that" (CCB), "everything is always negotiable" (Qualtrics). Some customers are price-first buyers who won\'t engage further without a ballpark.',
          instead:
            'When a customer asks about pricing, give a directional answer: "For an organization your size, customers typically invest in the range of X-Y. But let me understand your requirements better so I can give you something specific." Don\'t dodge.',
        },
        {
          mistake: 'Having technical/audio disasters that eat meeting time',
          why: "At Accelya, the first 15-17 minutes were complete audio/video chaos — people couldn't join Zoom, audio cut out repeatedly, IT had to set up the room. At CCB, the SE was dialing in from a parking lot. Lost momentum and first impressions.",
          instead:
            "Join meetings 5 minutes early. Test audio/video. Have a backup dial-in number ready. If you're on-site, coordinate room setup with the customer beforehand.",
        },
      ],
    },
  ],
}

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
            "What's driving your interest in AI?",
            'Are you adding AI capabilities into your customer-facing product, or is this mostly internal productivity?',
            'Do you have an AI committee or approval process for new AI use cases?',
            'How many AI agents do you have running in your environment today?',
            'Are your agents mostly productivity tools like Copilot, or are they connecting to internal systems and taking actions?',
          ],
          signals: [
            'Describes AI projects',
            'Mentions AI strategy',
            'References leadership priorities',
            'Distinguishes between customer-facing AI product and internal AI tools',
            'Mentions AI committee or use case approval process',
            'Says "we have prototypes working internally"',
          ],
        },
        {
          id: 'agent_use_cases',
          name: 'Agent Use Cases',
          description: 'Identify specific agent scenarios',
          questions: [
            'What specific AI agent use cases are you exploring?',
            'Are these customer-facing or internal agents?',
            'What systems would agents need to access?',
            'How autonomous would these agents be?',
            'Do you have a chatbot or AI assistant that needs to act on behalf of logged-in users?',
            'Are any of your agents already in non-prod or production environments?',
            'Walk me through how one of your agents actually works today — what does it connect to, what actions can it take?',
            'Are your agents accessing third-party services like Salesforce or Jira? How do they authenticate to those services?',
          ],
          signals: [
            'Names specific use cases',
            'Describes autonomy level',
            'Lists system access needs',
            'Already has agents in non-prod or production',
            'Mentions MCP gateway or orchestration layer',
          ],
        },
        {
          id: 'mcp_tool_access',
          name: 'MCP & Tool Access',
          description: 'Understand agent-tool patterns',
          questions: [
            'Are you familiar with MCP (Model Context Protocol)?',
            'How are your agents accessing tools and data sources?',
            'What patterns are you using for agent tool access?',
            'How do you manage agent credentials for tool access?',
            'Have you built or are you building an MCP gateway to route between different MCP servers?',
            'Which third-party MCP servers are you connecting to — Salesforce, Asana, Slack, others?',
          ],
          signals: [
            'Mentions MCP',
            'Describes tool access patterns',
            'Identifies credential challenges',
            'Has built or is building an MCP gateway',
            'Names specific third-party MCP servers (Salesforce, Asana, etc.)',
          ],
        },
        {
          id: 'security_concerns',
          name: 'Security Concerns',
          description: 'Uncover AI security worries',
          questions: [
            'What are your biggest security concerns around AI agents?',
            'How are you thinking about data access controls for agents?',
            'What happens if an agent goes rogue or misbehaves?',
            'How do you audit what agents are doing?',
            'How do you differentiate between a user action and an AI agent action in your logs?',
            "Does authorization happen when the agent makes the API call, or earlier when it's analyzing the prompt to decide what tools to use?",
            'Are you relying on training and policy, or do you have technical controls to prevent data being uploaded to AI tools?',
            "When an agent acts on behalf of a user, does it inherit the user's full permissions or is it scoped down?",
            "If an agent could access something it shouldn't, how would you know?",
          ],
          signals: [
            'Describes security worries',
            'Mentions data concerns',
            'Asks about controls',
            'Asks how to differentiate user vs agent actions',
            'Questions when authorization checks fire (prompt time vs API call time)',
            'Admits governance is mostly training-based, not technical',
          ],
        },
        {
          id: 'governance_needs',
          name: 'Governance & Compliance',
          description: 'Understand regulatory requirements',
          questions: [
            'What compliance requirements apply to your AI initiatives?',
            'Are you tracking the EU AI Act or other regulations?',
            'How are auditors asking about AI governance?',
            'What documentation do you need for AI systems?',
            'Are you adding lifecycle reviews for agents the way you do for human access?',
            'Who owns AI security decisions — is it the CISO, CTO, or the platform team?',
          ],
          signals: [
            'Names regulations',
            'Describes audit requirements',
            'Mentions documentation needs',
          ],
        },
        {
          id: 'shadow_ai',
          name: 'Shadow AI',
          description: 'Discover ungoverned AI deployments',
          questions: [
            'Do you have visibility into all AI tools in your organization?',
            'Are teams deploying AI without going through IT?',
            'How do you discover new AI agents being created?',
            "What's your policy on AI tool usage?",
            'Do you know how many AI agents exist in your organization today?',
            'Are you using a managed Chrome browser where you could deploy extensions for discovery?',
          ],
          signals: [
            'Admits visibility gaps',
            'Describes shadow AI concerns',
            'Mentions discovery needs',
            'Says "we know of some, we don\'t know of some"',
            'Asks how Okta discovers agents',
          ],
        },
        {
          id: 'timeline',
          name: 'AI Deployment Timeline',
          description: 'Understand urgency',
          questions: [
            "What's your timeline for AI agent deployments?",
            'Are any agents already in production?',
            'When do you need security controls in place?',
            "What's driving your timeline?",
          ],
          signals: [
            'Sets specific dates',
            'Describes urgency drivers',
            'Mentions production timelines',
          ],
        },
        {
          id: 'decision_process',
          name: 'Decision Process',
          description: 'Map AI security stakeholders',
          questions: [
            'Who owns AI security decisions in your organization?',
            'How do CISO, CTO, and AI Platform teams coordinate?',
            'Who else should be part of this conversation?',
            "What's the approval process for AI security tools?",
          ],
          signals: ['Names stakeholders', 'Describes org structure', 'Identifies decision makers'],
        },
        {
          id: 'current_approach',
          name: 'Current Approach',
          description: 'Understand how they handle AI auth today',
          questions: [
            'How are you handling AI authentication today?',
            'What identity systems are your agents using?',
            'Are you building custom auth or using existing solutions?',
            "What's working and what's not?",
            'How is what you built for agents different from a regular OAuth client ID and secret?',
            'Did your team build this incrementally, or did you design the architecture up front?',
            'Have you read through the Okta AI docs and if so, what was confusing?',
          ],
          signals: [
            'Describes current state',
            'Names existing tools',
            'Identifies gaps',
            'Asks how agent identity differs from regular OAuth apps',
            'Admits they built incrementally and need to step back and evaluate',
            'Says they got confused by docs and want hands-on help',
          ],
        },
        {
          id: 'product_fit',
          name: 'Product Fit (Okta vs Auth0)',
          description: 'Determine which products fit their use cases',
          questions: [
            'Who are the users of your AI applications - employees or customers?',
            'Are you building internal AI tools for your workforce, or customer-facing AI products, or both?',
            'Do you have existing Okta Workforce Identity deployed today?',
            "What's more important to you - governance and compliance, or developer speed and flexibility?",
            'How are you thinking about multi-cloud vs single-cloud for AI deployments?',
          ],
          signals: [
            'Identifies workforce vs customer use cases',
            'Mentions existing identity infrastructure',
            'Describes budget and decision criteria',
          ],
          productGuidance: {
            oktaIndicators: [
              'Employees using AI tools (ChatGPT Enterprise, Copilot)',
              'Shadow AI discovery needs',
              'Compliance and governance focus (CISO-driven)',
              'Existing Okta Workforce Identity deployment',
              'Enterprise with formal procurement process',
            ],
            auth0Indicators: [
              'Customer-facing AI applications (B2C, B2B2C)',
              'Developer-led AI product development',
              'Need for Token Vault (agent credential storage)',
              'RAG pipeline security requirements (Auth0 FGA)',
              'Fast-moving startups or product teams',
            ],
            bothIndicators: [
              'Large enterprise with both workforce and customer AI',
              'Internal AI governance + customer-facing AI products',
              'Different buyers (CISO for Okta, CTO for Auth0)',
            ],
          },
        },
        // Discovery areas based on real customer transcript analysis
        {
          id: 'token_exchange_patterns',
          name: 'Token Exchange Patterns',
          description:
            'Understand their token exchange needs (ID-JAG, OBO, CIBA, Brokered Consent)',
          questions: [
            'How are you handling token exchange when agents access APIs on behalf of users?',
            'Do you need to preserve user context when services call other services?',
            'Are there scenarios where you need step-up authentication for sensitive operations?',
            'How do agents get tokens to access downstream services?',
            'What happens when an agent needs to act on behalf of a user who initiated the request?',
            'When your user logs in and enters a prompt, how does that token get exchanged to access downstream resources like Salesforce or Asana?',
            'Are you passing the ID token all the way through to MCP servers, or do you exchange it along the way?',
          ],
          signals: [
            'Mentions OBO flows',
            'Describes token exchange needs',
            'Asks about user context preservation',
            'Needs step-up auth for sensitive ops',
            'Describes passing ID tokens to MCP servers (losing workload principal relationship)',
            'Asks about brokered consent for third-party services',
          ],
          technicalContext: {
            idJag: {
              name: 'ID-JAG (Identity Assertion JWT)',
              description:
                'Short-lived, one-time token for AI agent token exchange via Cross App Access (XAA). Two authorization servers trust each other within Okta — the user ID token is presented to a resource authorization server which issues a scoped access token.',
              useCase:
                'Agent needs to access a resource on behalf of a user with scoped permissions',
              flow: 'User OIDC login → ID token + Agent JWT → ID-JAG to resource auth server → Scoped access token → API call with bearer token',
            },
            obo: {
              name: 'On-Behalf-Of Token Exchange',
              description:
                'Retain user context when service-to-service calls occur. Critical: without OBO, you lose the relationship between the human user and the workload principal.',
              useCase: 'Microservice architecture where user identity must flow through the chain',
              flow: 'User token → Service A → OBO exchange → Service B (with user context preserved)',
            },
            ciba: {
              name: 'CIBA (Client-Initiated Backchannel Authentication)',
              description:
                'Step-up authentication requiring human approval on separate device. Used for gating access to sensitive content (e.g., advanced financial advice requires consent acceptance).',
              useCase:
                'Sensitive operations (PII access, financial transactions) requiring out-of-band approval',
              flow: 'Agent requests sensitive op → CIBA push to user device → User approves → Tuple entered in FGA → Agent proceeds',
            },
            brokeredConsent: {
              name: 'Brokered Consent',
              description:
                "OAuth consent brokered through Okta for third-party resources (Salesforce, Asana, etc.) that don't natively use your IDP. User authorizes once, Okta manages the refresh token ongoing.",
              useCase:
                "Agent accessing third-party MCP servers where the resource server doesn't talk to Okta for validation",
              flow: 'User grants OAuth consent once → Okta brokers and stores refresh token → Agent uses token for ongoing access',
              status: 'On Okta roadmap (Q2 target)',
            },
          },
        },
        {
          id: 'multi_agent_architecture',
          name: 'Multi-Agent Architecture',
          description: 'Understand their agent-to-agent patterns',
          questions: [
            'Do you have agents that need to call other agents?',
            'How do agents verify other agents are legitimate before trusting them?',
            "What's your orchestration layer for multi-agent workflows?",
            'How do you handle chain-of-custody for requests that flow through multiple agents?',
            'Are you using any agent frameworks like LangGraph, CrewAI, or AutoGen?',
            'How do you discover agents that are autonomous — talking to each other without a user in the loop?',
          ],
          signals: [
            'Describes multi-agent patterns',
            'Asks about agent-to-agent trust',
            'Mentions orchestration challenges',
            'Uses agent frameworks',
            'Asks about autonomous agents that are not user-in-the-flow',
            'Distinguishes between on-behalf-of and autonomous patterns',
          ],
          technicalContext: {
            workloadPrinciple:
              'Each agent has its own identity (client_id in tokens) — the Workload Principle. Agents are first-class identities in Universal Directory alongside people and groups.',
            managedConnections:
              'IT admin defines which resources each agent can access via Managed Connections. Three types: custom authorization servers, secrets, and shared service accounts.',
            resourceTypes: [
              'Custom authorization server (OAuth scopes mapped to MCP tools)',
              'Secret (API keys for external services)',
              'Shared service account (impersonation for legacy systems)',
            ],
            trustPatterns: [
              "Agent verifies calling agent's client_id",
              'Scope-based authorization (coarse-grained)',
              'FGA relationship checks (fine-grained)',
              'Audit trail in syslog of all agent actions including no-match policy denials',
            ],
            agentToAgent:
              'Agent-to-agent enablement is on the Okta roadmap (Q3 target). Currently agents act on behalf of users or service accounts. Full autonomous agent-to-agent trust is the next frontier.',
          },
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
            "What happens when a third-party MCP server returns data the user shouldn't see?",
            'For services like Salesforce or Asana — do users have to log in separately and authorize once, or is that handled through your IDP?',
            'How does your MCP gateway validate tokens and decide which downstream MCP server to route to?',
          ],
          signals: [
            'Names third-party MCP providers',
            'Describes ACL translation challenges',
            'Worried about data leakage',
            'Needs external tool governance',
            'Describes separate OAuth flows for third-party services outside their IDP',
            'Has built an MCP gateway that validates JWT tokens for routing',
          ],
          technicalContext: {
            challenge:
              "Third-party MCP servers (Salesforce, Asana, etc.) don't talk to your IDP for validation. Users have to log into each service and authorize separately.",
            solution:
              'Brokered consent through Okta: user authorizes once per third-party service, Okta manages the ongoing refresh token. Combined with XAA for cross-app access.',
            mcpGatewayPattern:
              'Common pattern: chatbot → MCP gateway (validates JWT, routes to downstream) → individual MCP servers (Salesforce, Asana, internal tools)',
            aclTranslation:
              'Map internal roles/permissions to third-party-specific scopes via custom authorization server policies',
            auditNeeds:
              'Log all third-party tool access for compliance. Syslog captures no-match policy denials, scope grants, and workload principal identity.',
            discoveryMethods:
              'ISPM connectors for Microsoft, AWS, Google platforms discover agents via read-only API. Chrome browser extension captures OAuth grants for local/user-in-the-flow agents.',
          },
        },
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
        { step: 13, area: 'decision_process', goal: 'Map stakeholders' },
      ],
    },
  },
}

export const goldenQuestions = {
  title: 'Golden Questions',
  description:
    'High-impact questions that unlock multiple discovery areas and lead to product recommendations',
  intro:
    'Golden questions are open-ended questions that encourage stakeholders to share context, reveal priorities, and open new conversation threads. They work because they show genuine curiosity and give stakeholders control over what to share. The best questions naturally lead to Okta or Auth0 product fit.',
  tracks: {
    aiAgents: {
      questions: [
        {
          question: 'Where is AI in your technology roadmap?',
          why: 'Reveals strategic priority and leadership buy-in. Shows if AI is a priority or experiment.',
          unlocks: ['ai_initiatives', 'timeline', 'decision_process'],
          productHint:
            'Early stage → Okta ISPM for shadow AI. Advanced stage → Okta Agent Identity or Auth0 Token Vault.',
        },
        {
          question: 'Who are the users of your AI applications - your employees or your customers?',
          why: 'Critical for product selection. Workforce = Okta, Customers = Auth0, Both = Both products.',
          unlocks: ['agent_use_cases', 'product_fit', 'decision_process'],
          productHint:
            'Employees → Okta Workforce Identity for AI. Customers → Auth0 for GenAI Applications. Both → Recommend both products.',
        },
        {
          question: 'What specific agent use cases are you exploring?',
          why: 'Gets concrete examples instead of abstract discussions. Reveals maturity level and product fit.',
          unlocks: ['agent_use_cases', 'security_concerns', 'current_approach', 'product_fit'],
          productHint:
            'Internal agents → Okta. Customer-facing agents → Auth0. Autonomous agents → Either (depends on governance vs developer focus).',
        },
        {
          question: 'What keeps you up at night about AI security?',
          why: 'Reveals their specific fears and priorities. Shows what to address first.',
          unlocks: ['security_concerns', 'governance_needs', 'shadow_ai'],
          productHint:
            'Shadow AI → Okta ISPM. Data exposure → Auth0 FGA. Credential management → Auth0 Token Vault.',
        },
        {
          question: 'How are your agents accessing tools and data today?',
          why: 'Gets into technical implementation. Reveals MCP usage and credential patterns.',
          unlocks: ['mcp_tool_access', 'current_approach', 'security_concerns'],
          productHint:
            'Hardcoded credentials → Auth0 Token Vault. DIY OAuth → Okta Agent Identity. MCP servers → Auth0 XAA.',
        },
        {
          question: 'Do you have visibility into all AI tools in your organization?',
          why: "Opens shadow AI discussion. Usually reveals gaps they're concerned about.",
          unlocks: ['shadow_ai', 'governance_needs', 'security_concerns'],
          productHint:
            'No visibility → Okta ISPM for AI (OAuth grant monitoring). Clear Okta product fit.',
        },
        {
          question: "What happens when an agent needs to access something it shouldn't?",
          why: 'Tests their thinking about agent governance. Reveals maturity of approach.',
          unlocks: ['security_concerns', 'governance_needs', 'current_approach'],
          productHint:
            'Need policy engine → Okta AI Governance. Need fine-grained permissions → Auth0 FGA.',
        },
        {
          question:
            'Are you building this AI application for internal use or as a product feature for your customers?',
          why: 'Direct product selection question. Internal = Okta territory, Product = Auth0 territory.',
          unlocks: ['agent_use_cases', 'product_fit', 'decision_process'],
          productHint:
            'Internal → Okta Workforce Identity + ISPM. Product → Auth0 for GenAI + Token Vault + FGA.',
        },
        {
          question:
            'Do you already have Okta Workforce Identity or another enterprise identity platform?',
          why: 'Existing Okta deployment makes Okta AI products easier to justify (extend existing investment).',
          unlocks: ['current_approach', 'product_fit', 'decision_process'],
          productHint:
            'Existing Okta → Easy upsell for Okta AI products. No Okta → Consider Auth0 for developer-friendly approach.',
        },
        // New golden questions based on Robinhood transcript
        {
          question:
            'How do you handle token exchange when an agent needs to access a downstream service on behalf of a user?',
          why: 'Reveals their token exchange sophistication. Most teams struggle with OBO flows and preserving user context.',
          unlocks: ['token_exchange_patterns', 'current_approach', 'security_concerns'],
          productHint:
            'Custom DIY → XAA with ID-JAG. User context needed → OBO Token Exchange. Sensitive ops → CIBA for step-up auth.',
        },
        {
          question:
            'What happens when one agent needs to call another agent - how do you establish trust?',
          why: 'Multi-agent architectures are common but agent-to-agent auth is often overlooked. Opens product conversations.',
          unlocks: ['multi_agent_architecture', 'security_concerns', 'agent_use_cases'],
          productHint:
            'No agent-to-agent trust → Agent Identity for each workload. Orchestrator patterns → XAA for delegation.',
        },
        {
          question:
            'What third-party MCP servers are you integrating with, and how do you govern that access?',
          why: 'External tools like Atlassian, PagerDuty MCP servers need governance. Often reveals compliance gaps.',
          unlocks: ['third_party_integrations', 'mcp_tool_access', 'governance_needs'],
          productHint:
            'No governance → ISPM for visibility. ACL translation challenges → XAA for controlled access.',
        },
        {
          question:
            'Are there scenarios where your agent needs human approval before proceeding with a sensitive operation?',
          why: 'Step-up auth for AI is an emerging need. CIBA enables out-of-band approval without blocking the agent.',
          unlocks: ['token_exchange_patterns', 'security_concerns', 'governance_needs'],
          productHint:
            'Sensitive ops need approval → CIBA for transactional verification. Audit requirements → Agent Identity with logging.',
        },
        // New golden questions based on real customer discovery transcripts
        {
          question:
            "How is what you've built for AI agent auth different from a regular OAuth client ID and secret?",
          why: "This is the #1 question real customers ask. It reveals whether they understand the workload principal concept and on-behalf-of patterns, or if they're just treating agents like regular OAuth apps.",
          unlocks: ['current_approach', 'token_exchange_patterns', 'agent_use_cases'],
          productHint:
            "If they can't articulate the difference → Educate on workload principal + managed connections. If they built DIY → Show how Okta handles this natively.",
        },
        {
          question:
            'For third-party services like Salesforce or Asana, do users log in and authorize separately, or does that go through your identity provider?',
          why: 'Exposes the brokered consent gap. Most organizations have agents accessing third-party services with separate OAuth flows that bypass their IDP entirely.',
          unlocks: ['third_party_integrations', 'token_exchange_patterns', 'security_concerns'],
          productHint:
            'Separate OAuth per service → Brokered consent via Okta. No IDP integration → XAA + managed connections. Already using Okta → Easy extension.',
        },
        {
          question:
            'Did your team design the agent security architecture up front, or did it evolve piece by piece?',
          why: 'Most teams build incrementally and realize they need to step back and evaluate. This validates their experience and opens the door to a holistic conversation.',
          unlocks: ['current_approach', 'agent_use_cases', 'security_concerns'],
          productHint:
            'Built piece by piece → Help them see the full picture with Okta agent identity. Designed up front → Validate and refine with Okta capabilities.',
        },
        {
          question:
            'When you look at your agent architecture, do you have visibility into the user who initiated the request all the way through to the downstream resource?',
          why: 'Tests whether they understand the workload principal + subject relationship. Many teams lose user context when passing tokens through their agent chain.',
          unlocks: ['token_exchange_patterns', 'security_concerns', 'multi_agent_architecture'],
          productHint:
            'Losing user context → XAA with ID-JAG preserves subject + actor. No visibility → Syslog telemetry shows full audit trail.',
        },
        // Golden questions from Aryaka and Hunter transcripts
        {
          question:
            'What value would justify moving from your current auth solution to something purpose-built for AI agents?',
          why: 'Customers using open-source (Keycloak) or basic auth have already decided on cost. You need to find gaps in their current solution that create real pain as they scale AI.',
          unlocks: ['current_approach', 'agent_use_cases', 'product_fit'],
          productHint:
            "Basic auth working → Show Token Vault, FGA, MCP auth as value-add. Cost-driven → Position FGA as standalone (works with any IDP). Open-source gaps → Agent-specific capabilities they'd have to build.",
        },
        {
          question:
            'Does your authorization check happen when the agent analyzes the prompt to decide which tools to use, or when it actually makes the API call?',
          why: 'This is a sophisticated question that reveals the customer understands the authz pipeline. Most teams only think about API-time checks and miss prompt-time tool filtering.',
          unlocks: ['security_concerns', 'mcp_tool_access', 'token_exchange_patterns'],
          productHint:
            'Only API-time → Show how FGA can also filter which tools the agent even considers at prompt analysis time. Neither → They have an authz gap.',
        },
        {
          question:
            'Are your AI governance controls mostly training and policy, or do you have technical enforcement?',
          why: 'Many organizations rely on training employees not to upload sensitive data to AI tools. Training-only governance is a gap that technical controls can fill.',
          unlocks: ['governance_needs', 'shadow_ai', 'security_concerns'],
          productHint:
            "Training only → ISPM for shadow AI discovery gives visibility that training can't. DLP in place → Complement with agent-specific governance.",
        },
        {
          question:
            'Are your agents just being used as productivity tools today, or are any of them actually integrated with internal applications and data?',
          why: "Many organizations are using AI tools (Copilot, ChatGPT) for productivity but haven't connected agents to internal apps yet. This reveals their maturity level and timeline.",
          unlocks: ['agent_use_cases', 'ai_initiatives', 'timeline'],
          productHint:
            'Productivity only → Early stage, focus on ISPM for visibility. Connected to apps → They need Token Vault, agent identity, and proper authz now.',
        },
      ],
    },
  },
}

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
            "Won't elaborate even on follow-ups",
            'Phrases like "Look...", "I\'m not sure this is...", "We\'re doing fine..."',
            'May start wrapping up the conversation',
          ],
          response:
            "They're ready to end the meeting. You need to ask a question that resonates with their actual problems, not generic discovery.",
        },
        {
          range: '4-5',
          label: 'Neutral/Evaluating',
          behaviors: [
            'Direct answers but no volunteered information',
            'Professional but reserved',
            'Needs convincing before opening up',
            'Phrases like "It depends...", "We\'re looking at options...", "That\'s one consideration..."',
          ],
          response:
            "They're giving you a chance but haven't seen value yet. Focus on understanding their specific situation.",
        },
        {
          range: '6-7',
          label: 'Engaged/Interested',
          behaviors: [
            'Sharing more context unprompted',
            'Asking clarifying questions back',
            'Showing genuine curiosity',
            'Phrases like "That\'s interesting...", "We\'ve been thinking about...", "Tell me more..."',
            'May mention pain points proactively',
          ],
          response: "They see value. Keep building on what's working. Don't jump to pitching yet.",
        },
        {
          range: '8-10',
          label: 'Very Engaged/Ready to Act',
          behaviors: [
            'Volunteering information freely',
            'Asking about next steps, timelines, pricing',
            'Sharing internal politics and decision dynamics',
            'Phrases like "This is exactly what we need...", "Who else should be in this conversation?"',
            'May mention budget availability or urgency',
          ],
          response: "They're bought in. Start transitioning to next steps and action items.",
        },
      ],
    },
    {
      id: 'what-increases',
      title: 'What Increases Interest',
      description: 'Behaviors that build engagement and trust',
      behaviors: [
        {
          behavior: 'Asking thoughtful follow-up questions',
          why: "Shows you're listening and care about understanding their specific situation",
          example: 'When they mention an audit finding, ask "How did leadership respond to that?"',
        },
        {
          behavior: 'Referencing what they said earlier',
          why: 'Demonstrates active listening and makes them feel heard',
          example: '"Earlier you mentioned the reorg. How has that affected this initiative?"',
        },
        {
          behavior: 'Uncovering real pain points',
          why: 'Shows you understand their world and can potentially help',
          example: 'Probing until you understand the specific business impact of their challenges',
        },
        {
          behavior: 'Demonstrating industry knowledge',
          why: 'Builds credibility and reduces the burden on them to explain basics',
          example: 'Referencing relevant compliance frameworks or industry-specific challenges',
        },
        {
          behavior: 'Building rapport naturally',
          why: 'Makes the conversation feel collaborative rather than transactional',
          example: 'Showing genuine curiosity, appropriate humor, and respect for their time',
        },
        {
          behavior: 'Handling objections professionally',
          why: 'Shows maturity and confidence without being defensive',
          example: 'Acknowledging concerns, asking clarifying questions, then addressing directly',
        },
        {
          behavior: 'Staying focused despite tangents',
          why: 'Shows professionalism and respect for the limited meeting time',
          example: 'Acknowledging a tangent briefly, noting it for follow-up, then redirecting',
        },
      ],
    },
    {
      id: 'what-decreases',
      title: 'What Decreases Interest',
      description: 'Mistakes that damage engagement',
      behaviors: [
        {
          behavior: 'Asking generic questions',
          why: "Signals you didn't prepare and don't understand their situation",
          example: '"What keeps you up at night?" with no specific context',
        },
        {
          behavior: 'Jumping to pitching',
          why: 'Shows you care more about selling than understanding their needs',
          example: 'Launching into a product demo before understanding their problems',
        },
        {
          behavior: 'Ignoring what they said',
          why: 'Makes them feel unheard and wastes their time',
          example: 'Asking about something they already addressed',
        },
        {
          behavior: 'Using too much jargon',
          why: 'Creates distance and can feel condescending',
          example: 'Overusing product terminology they might not know',
        },
        {
          behavior: 'Talking more than listening',
          why: "Every minute you talk is a minute you're not learning",
          example: 'Monologuing about features instead of asking questions',
        },
        {
          behavior: 'Being pushy or aggressive',
          why: 'Creates resistance and damages trust',
          example: "Pressing for commitments before they're ready",
        },
        {
          behavior: 'Badmouthing competitors',
          why: 'Looks insecure and unprofessional',
          example: "Criticizing a competitor's product or company directly",
        },
        {
          behavior: 'Getting distracted by tangents',
          why: 'Loses control of the conversation and wastes time',
          example: 'Chasing every side topic instead of staying focused',
        },
      ],
    },
    {
      id: 'buying-signals',
      title: 'Reading Buying Signals',
      description: 'Signs that indicate readiness to move forward',
      signals: [
        {
          signal: 'Asking about implementation',
          meaning: "They're envisioning the solution in their environment",
          examples: [
            '"What would implementation look like?"',
            '"How long does deployment typically take?"',
          ],
        },
        {
          signal: 'Introducing other stakeholders',
          meaning: 'They want others to hear what you have to say',
          examples: [
            '"Who else should be in this conversation?"',
            '"Can we get Sarah from security on the next call?"',
          ],
        },
        {
          signal: 'Asking about pricing',
          meaning: "They're mentally budgeting for this solution",
          examples: ['"What\'s the pricing model?"', '"What would this cost for our size?"'],
        },
        {
          signal: 'Discussing internal processes',
          meaning: "They're thinking about how to make this happen",
          examples: [
            '"We\'d need to run this by legal..."',
            '"Our procurement process usually takes..."',
          ],
        },
        {
          signal: 'Sharing confidential information',
          meaning: 'They trust you and see you as a potential partner',
          examples: [
            'Sharing budget details',
            'Discussing internal politics',
            'Mentioning upcoming changes',
          ],
        },
        {
          signal: 'Asking for references',
          meaning: 'They want validation from similar organizations',
          examples: [
            '"Who else in our industry is using this?"',
            '"Can we talk to a reference customer?"',
          ],
        },
        {
          signal: 'Showing their architecture',
          meaning:
            'They trust you enough to reveal their current implementation and want your input',
          examples: [
            '"Let me show you what we have..." (shares diagrams)',
            '"The team already started building this..."',
            '"Here\'s a raw diagram of our current setup"',
          ],
        },
        {
          signal: 'Requesting hands-on POC environments',
          meaning: 'They want to evaluate with their own hands — strong buying intent',
          examples: [
            '"Can we get a preview tenant to try this out?"',
            '"If we get our hands dirty, it\'ll be better"',
            '"Can you send us sample code and a Colab notebook?"',
          ],
        },
        {
          signal: 'Admitting confusion with existing docs',
          meaning:
            "They've already invested time researching — they're serious but need guided enablement",
          examples: [
            '"We read through the docs and got confused"',
            '"We got lost in the preview environment"',
            '"This is where we got confused — hoping to dig deeper"',
          ],
        },
      ],
    },
    {
      id: 'handling-skepticism',
      title: 'Handling Skepticism',
      description: 'Common objections and how to address them',
      objections: [
        {
          objection: '"Every vendor says that..."',
          meaning: "They've heard pitches before and are tired of empty claims",
          response:
            "Acknowledge the skepticism. Ask what specifically they've been disappointed by. Offer specific proof points.",
        },
        {
          objection: '"We\'re not ready for this yet"',
          meaning: "They don't see the urgency or haven't connected the problem to your solution",
          response: "Ask what would make them ready. Understand what's higher priority and why.",
        },
        {
          objection: '"We\'ll probably build this ourselves"',
          meaning: "They haven't seen clear differentiation or don't trust vendors",
          response:
            'Ask about their build vs buy criteria. Understand the TCO of building internally.',
        },
        {
          objection: '"Our current solution handles this"',
          meaning: "They haven't connected their pain to the limitations of their current solution",
          response:
            'Ask specific questions about how they handle particular scenarios. Dig into gaps.',
        },
        {
          objection: '"I don\'t have budget for this"',
          meaning: "Either truly constrained or you haven't established enough value",
          response: 'Ask about what they do have budget for. Understand their priority framework.',
        },
        {
          objection: '"Send me some information"',
          meaning: "Polite way of ending without commitment. You haven't earned a next meeting.",
          response:
            "Ask what specific information would be helpful. Try to understand what's missing.",
        },
        {
          objection: '"How is this different from what we already have with regular OAuth apps?"',
          meaning:
            "They've already implemented OAuth for agents and don't see why they need something new. This is the most common real-world objection.",
          response:
            'Acknowledge their OAuth implementation. Then explain the gap: with regular OAuth, you lose the relationship between the human user and the workload principal. Ask them to walk through their token flow — the gap usually becomes clear.',
        },
        {
          objection:
            '"We already started building this ourselves — the team built it piece by piece"',
          meaning:
            "They've invested effort and don't want to feel that was wasted. But they're open to evaluating because they realize they need to step back.",
          response:
            "Validate their work — they're ahead of most organizations. Ask what prompted them to pause and evaluate. Offer to help them assess gaps in what they've built vs. what Okta provides natively.",
        },
        {
          objection: '"We read through the docs and got confused"',
          meaning:
            "They're genuinely interested but the technical complexity is a barrier. They need hands-on enablement, not more documentation.",
          response:
            'Offer a hands-on POC environment with a guided onboarding notebook. Suggest a checkpoint call in 1-2 weeks to work through specific questions together.',
        },
        {
          objection: '"That feature is on your roadmap — what do we do today?"',
          meaning:
            "They have a real need now and roadmap items don't solve it. They need to know what's available today.",
          response:
            "Be transparent about what's available today vs. roadmap. Offer workarounds or design patterns that work with current capabilities. Show the preliminary roadmap with target dates.",
        },
        {
          objection: '"We went with open-source (Keycloak/etc.) for cost reasons"',
          meaning:
            "They evaluated commercial solutions and couldn't justify the cost for basic auth. They need to see value BEYOND authentication to justify switching.",
          response:
            "Don't try to compete on basic auth — they've decided. Instead, show value they can't get from Keycloak: Token Vault for agent credentials, FGA for fine-grained permissions, ISPM for shadow AI discovery. Position as complementary, not replacement.",
        },
        {
          objection: '"We\'re a Microsoft shop — we use Entra for identity"',
          meaning:
            "They see Entra as sufficient and don't want to rip and replace their IDP. They need to understand what Okta adds that Entra doesn't.",
          response:
            "Don't position as IDP replacement. Lead with ISPM (works with any IDP including Entra). Show agent discovery, shadow AI visibility, and AI-specific governance that Entra doesn't have.",
        },
        {
          objection:
            '"I was wondering if there was something Okta was doing outside of normal authentication"',
          meaning:
            "They already have auth solved. They're looking for the AI-specific value prop — agent identity, discovery, governance — not another SSO solution.",
          response:
            "Skip the auth pitch entirely. Lead with: agent discovery (ISPM), agent-as-first-class-identity (Agent Identity), and fine-grained authorization (FGA). These are things their current auth can't do.",
        },
        {
          objection: '"How does your fine-grained authorization model actually get defined?"',
          meaning:
            "They understand RBAC but haven't seen ReBAC in practice. They need concrete examples and hands-on access, not conceptual explanations.",
          response:
            'Show the FGA modeling playground. Walk through a concrete example relevant to their use case (file system permissions, expense approval, or RAG document filtering). Offer sandbox access.',
        },
        {
          objection:
            '"Does authorization check happen at API call time or when analyzing the prompt?"',
          meaning:
            'Sophisticated technical customer thinking about where authz fires in the agent pipeline. This is a nuanced question that shows they understand the architecture deeply.',
          response:
            'Explain both layers: coarse-grained (scopes at token exchange time) controls which tools/APIs the agent can call. Fine-grained (FGA at API time) controls what data the user can see through those tools. You can also use FGA to filter tools shown to the agent at prompt analysis time.',
        },
      ],
    },
    {
      id: 'customer-language',
      title: 'Real Customer Language',
      description:
        'Direct quotes from real customer discovery calls showing how stakeholders think about AI security',
      quotes: [
        {
          quote:
            'Agent can behave like fuzzy testing — randomly issuing different strange values to the API endpoint just to see how it will behave. I want to avoid that.',
          source: 'Qualtrics Identity Architect',
          insight:
            'Security professionals see agents as potential attack surfaces, not just productivity tools',
        },
        {
          quote:
            'If I want something from the agent, I want the permission to be exactly to just do the job, nothing more.',
          source: 'Qualtrics Identity Architect',
          insight:
            'Least privilege for agents is the universal concern across all customer maturity levels',
        },
        {
          quote:
            'We are not even on the design phase of the security. We are more focused on the business case first.',
          source: 'Accelya Director of Data & AI',
          insight:
            'Most customers are business-case-first, security-design-second — meet them where they are',
        },
        {
          quote:
            "We don't have huge investments in coming up with nirvana state and north star goal. We learn from vendors.",
          source: 'Restoration Hardware Director, Platform Engineering',
          insight:
            'Lean teams rely on vendors for best practices — position yourself as the trusted advisor',
        },
        {
          quote: "You've got 19 minutes. You're talking to the converted.",
          source: 'PROS CISO',
          insight: 'Advanced customers want you to skip the pitch and get to specifics immediately',
        },
        {
          quote:
            'Should we even be trying to figure out the solution to authorization or should we wait for the industry to define it?',
          source: 'Trend Micro Senior PM',
          insight:
            'Some sophisticated buyers question whether to build now or wait for standards maturity',
        },
      ],
    },
  ],
}

export const competitorGuide = {
  title: 'Competitive Intelligence',
  description: 'Know your competition and how to differentiate Okta & Auth0',
  intro:
    'Understanding competitors helps you anticipate objections and position Okta and Auth0 effectively. Never badmouth competitors - acknowledge them professionally and differentiate on your strengths. Know when to recommend Okta (workforce/governance) vs Auth0 (CIAM/developer) vs both.',
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
            'Familiar to IT teams',
          ],
          weaknesses: [
            'No AI-specific features (no agent identity, no shadow AI discovery)',
            'Limited CIAM capabilities (not for customer-facing AI apps)',
            'Complex to configure for agentic workflows',
            'Microsoft ecosystem lock-in',
          ],
          oktaAdvantages: [
            'Okta ISPM for AI - purpose-built shadow AI discovery (OAuth grant monitoring)',
            'Okta Agent Identity - machine identity management for autonomous agents',
            'Cloud-agnostic (works across AWS, Azure, GCP)',
            'Better for multi-cloud AI deployments',
          ],
          auth0Advantages: [
            'Auth0 for customer-facing AI apps (B2C, B2B2C) - Entra is workforce-focused',
            'Auth0 Token Vault - purpose-built for AI agent credentials',
            'Auth0 FGA - fine-grained authorization for RAG pipelines',
            'Developer-friendly (Entra has steep learning curve)',
          ],
          handlers: {
            'We already have Microsoft Entra':
              'Entra is great for workforce identity. But does it discover shadow AI usage? Does it have purpose-built agent identity? Does it handle customer-facing AI apps?',
            'Entra is included with Microsoft 365':
              'Workforce identity is included. AI-specific features like shadow AI discovery, agent credential management, and CIAM for AI apps are different requirements.',
            "We're a Microsoft shop":
              'Okta integrates with Microsoft 365. Auth0 complements Entra for customer-facing AI. You can have both - Entra for employees, Okta/Auth0 for AI.',
          },
        },
        {
          name: 'AWS IAM + Cognito',
          type: 'Cloud Platform Security',
          strengths: [
            'Native AWS integration',
            'No additional vendor required',
            'Included in cloud spend',
            'Familiar to AWS teams',
          ],
          weaknesses: [
            'AWS-only (no cross-cloud support)',
            'Not purpose-built for AI agents',
            'Cognito is complex for developers',
            'No shadow AI discovery or governance',
          ],
          oktaAdvantages: [
            'Cross-cloud support (AWS, Azure, GCP)',
            'Okta Agent Identity works with any cloud provider',
            'Okta ISPM discovers shadow AI across all environments',
            'Unified governance across multi-cloud AI deployments',
          ],
          auth0Advantages: [
            'Auth0 is cloud-agnostic (not locked to AWS)',
            'Auth0 Token Vault - better developer experience than AWS Secrets Manager',
            'Auth0 for customer-facing AI apps - Cognito is complex and limited',
            'Auth0 FGA for RAG security - purpose-built for AI, not generic IAM',
          ],
          handlers: {
            'We use AWS IAM for everything':
              'That works for AWS resources. But what about agents accessing Azure, GCP, or on-prem systems? What about customer-facing AI apps?',
            'Cognito handles user auth':
              'Cognito is for user authentication. Auth0 is purpose-built for AI agent workflows - Token Vault, async auth, agent delegation.',
            "We don't want another vendor":
              "Fair concern. But AWS IAM isn't designed for agentic workflows. What's the cost of building custom solutions vs using purpose-built tools?",
          },
        },
        {
          name: 'Ping Identity',
          type: 'Legacy IAM Vendor',
          strengths: [
            'Established enterprise vendor',
            'On-prem deployment options',
            'Federal compliance (FedRAMP)',
          ],
          weaknesses: [
            'Legacy architecture (not cloud-native)',
            'No AI-specific features',
            'Poor developer experience',
            'Slow innovation cycle',
            'Complex and expensive',
          ],
          oktaAdvantages: [
            'Modern, cloud-native architecture',
            'Purpose-built AI features (ISPM, Agent Identity, AI Governance)',
            'Faster innovation cycle (quarterly releases)',
            'Better user experience for admins and developers',
          ],
          auth0Advantages: [
            'Developer-first approach (Ping is IT-admin focused)',
            "Auth0 Token Vault and FGA don't exist in Ping",
            'Modern APIs and SDKs (Ping is legacy)',
            'Purpose-built for customer-facing AI apps',
          ],
          handlers: {
            "We're a Ping customer already":
              'Ping is solid for traditional IAM. But does it have shadow AI discovery? Agent identity? Token Vault? You can complement Ping with Okta/Auth0 for AI.',
            'Ping is FedRAMP certified':
              'Okta is also FedRAMP authorized. Auth0 is for commercial/CIAM use cases. Which AI workloads need FedRAMP vs commercial security?',
            "We don't want to switch vendors":
              "You don't have to. Okta/Auth0 can complement Ping for AI-specific use cases. Keep Ping for legacy, add Okta/Auth0 for AI.",
          },
        },
        {
          name: 'Pangea (API Security Startup)',
          type: 'AI Security Startup',
          strengths: [
            'Developer-friendly APIs',
            'Purpose-built for AI',
            'Fast integration',
            'AI Guard feature (prompt injection protection)',
          ],
          weaknesses: [
            'Small startup (funding risk, longevity unclear)',
            'Limited enterprise governance features',
            'No workforce identity (only CIAM)',
            'Point solution (not full identity platform)',
            'Limited compliance certifications',
          ],
          oktaAdvantages: [
            'Enterprise-grade platform with proven scale',
            'Comprehensive AI governance (not just API security)',
            "Okta Workforce Identity for employee AI tools (Pangea doesn't have)",
            'SOC2, ISO 27001, FedRAMP certified',
          ],
          auth0Advantages: [
            'Auth0 is Okta-owned (enterprise backing, not startup risk)',
            'More comprehensive CIAM platform (not just AI)',
            'Better ecosystem (integrations, marketplace)',
            'Proven at scale (thousands of production customers)',
          ],
          handlers: {
            'Pangea is purpose-built for AI':
              'So is Auth0 Token Vault and Okta Agent Identity. But Pangea is a point solution. What about workforce identity? Shadow AI discovery? Audit compliance?',
            'Pangea has AI Guard for prompt injection':
              "That's application security, not identity security. Different layers. Auth0/Okta handle identity, authentication, authorization.",
            'Pangea is cheaper':
              "Lower cost upfront, but is it enterprise-ready? What's the risk of a startup pivot or shutdown? What about compliance certifications?",
          },
        },
        {
          name: 'Cloud Provider Native (AWS/Azure/GCP)',
          type: 'Platform Security',
          strengths: [
            'Native integration with their AI services',
            'No additional vendor required',
            'Included in cloud spend',
            'Familiar to cloud teams',
          ],
          weaknesses: [
            'Siloed per cloud - no cross-cloud view',
            'Basic identity governance',
            'No purpose-built agent security',
            "Doesn't handle multi-cloud or hybrid",
          ],
          oktaAdvantages: [
            'Unified identity across all clouds',
            'Purpose-built agent identity management',
            'Cross-cloud visibility and governance',
            'Works with any LLM provider',
          ],
          auth0Advantages: [
            'Auth0 is cloud-agnostic',
            'Better for customer-facing AI apps (AWS Cognito is complex)',
            'Auth0 Token Vault - purpose-built for agents',
            'Developer-friendly vs cloud-native IAM complexity',
          ],
          handlers: {
            'We use AWS/Azure native security':
              'That works for one cloud. What about agents accessing systems across clouds? Or using multiple LLM providers?',
            "It's included with our cloud spend":
              'Basic IAM is included. Agent-specific identity, governance, and compliance are different requirements.',
          },
        },
        {
          name: 'Platform Native (Salesforce, ServiceNow)',
          type: 'Embedded Security',
          strengths: [
            'Native integration with their platform',
            'Leverages existing permissions',
            'No additional cost',
            'Fast to deploy within that platform',
          ],
          weaknesses: [
            'Only works within that platform',
            'No cross-system agent governance',
            'Limited visibility into agent actions',
            "Can't handle multi-platform agents",
          ],
          oktaAdvantages: [
            "Agents don't stay within platform boundaries",
            'Cross-platform agent identity and governance',
            'Unified audit trail across all agent actions',
            'Handle agent-to-agent trust relationships',
          ],
          auth0Advantages: [
            'Auth0 for customer-facing agents (Salesforce is internal-only)',
            'Auth0 Token Vault for agents accessing multiple platforms',
            'Auth0 XAA for cross-app agent delegation',
          ],
          handlers: {
            'Salesforce Agentforce handles security':
              'Within Salesforce, yes. But when agents need to access ServiceNow, Workday, or external APIs?',
            'Our platforms have their own security':
              'They do for their own data. But modern agents are cross-functional. How do you govern an agent that touches 5 different systems?',
          },
        },
        {
          name: 'Open Source (Keycloak, FusionAuth)',
          type: 'Open Source Identity',
          strengths: [
            'Low cost / free',
            'Full control over configuration',
            'Active community and documentation',
            'OIDC/SAML standards compliant',
          ],
          weaknesses: [
            'No AI-specific features (no agent identity, no shadow AI discovery)',
            'No Token Vault or MCP auth capabilities',
            'Limited fine-grained authorization (no ReBAC)',
            'Self-managed operational burden (upgrades, scaling, security patches)',
            'No ISPM or AI governance features',
          ],
          oktaAdvantages: [
            'Okta ISPM works alongside Keycloak (IDP-agnostic) for shadow AI discovery',
            "Okta Agent Identity for machine identity management that Keycloak can't do",
            'Enterprise-grade SLA and support vs self-managed open source',
          ],
          auth0Advantages: [
            'Auth0 FGA works standalone (no IDP switch required) for fine-grained AI permissions',
            'Auth0 Token Vault for agent credential storage — Keycloak has no equivalent',
            'Auth0 MCP auth for agent-to-tool connections — purpose-built for AI workflows',
            'Developer experience far superior to Keycloak for AI use cases',
          ],
          handlers: {
            'We use Keycloak and it works fine':
              'For basic auth, Keycloak is solid. But does it handle agent identity, token vault for AI credentials, or fine-grained authorization for RAG? Auth0 FGA works alongside Keycloak.',
            'We chose open-source for cost reasons':
              'Understandable. But consider the TCO: self-managed Keycloak + building AI agent auth vs Auth0 Token Vault which is purpose-built. FGA also works standalone.',
            "We don't want vendor lock-in":
              'Auth0 uses OAuth/OIDC standards. FGA can work with any IDP including Keycloak. ISPM integrates with Keycloak, Entra, or Okta.',
          },
        },
        {
          name: 'DIY / LangChain Auth',
          type: 'Build Your Own',
          strengths: [
            'Full control and customization',
            'No additional vendor cost',
            'Developer flexibility',
          ],
          weaknesses: [
            'Security burden on dev team',
            'No governance or compliance',
            'Maintenance overhead',
            'No audit trail',
            'Inconsistent implementation',
            'Risk of credential exposure',
          ],
          oktaAdvantages: [
            "Don't reinvent the wheel on security",
            'Enterprise-grade from day one',
            'Compliance and audit built-in',
            'Okta Agent Identity - proven at scale',
          ],
          auth0Advantages: [
            'Auth0 Token Vault - purpose-built for agent credentials',
            'Let devs focus on AI, not auth plumbing',
            "Auth0 FGA - don't build custom authorization logic",
            'Developer-friendly but enterprise-secure',
          ],
          handlers: {
            "We'll build it ourselves":
              "You can, but should you? Your devs should focus on AI capabilities, not reinventing identity. What's the TCO of DIY auth long-term?",
            'LangChain handles auth':
              'LangChain provides patterns, not enterprise identity management. Who manages credentials? Who audits access? Auth0 Token Vault integrates with LangChain.',
            "We don't want vendor lock-in":
              'Fair. But building custom auth creates technical debt. Auth0 uses OAuth standards - you can migrate if needed. DIY auth is harder to migrate.',
          },
        },
      ],
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
            'Okta AI Governance - Audit and compliance for internal AI',
          ],
          reasoning:
            'Okta is purpose-built for workforce identity. Extends existing Okta deployment. Focused on governance and compliance.',
          buyer: 'CISO, VP of IT, Compliance Officer',
        },
        {
          scenario: 'Customer-Facing AI Applications',
          description: 'AI chatbots, customer service agents, B2C/B2B2C AI products',
          recommendation: 'Auth0',
          products: [
            'Auth0 for GenAI Applications - User authentication for AI apps',
            'Auth0 Token Vault - Secure agent credentials for customer data access',
            'Auth0 FGA - Fine-grained authorization for multi-tenant AI',
          ],
          reasoning:
            'Auth0 is purpose-built for CIAM (Customer Identity and Access Management). Developer-friendly, fast integration, scales for consumer apps.',
          buyer: 'CTO, VP Engineering, Product Manager, CAIO',
        },
        {
          scenario: 'Autonomous AI Agents (Machine Identity)',
          description: 'Production agents with their own identity, agent-to-service auth',
          recommendation: 'Okta or Auth0',
          products: [
            'Okta Identity for AI Agents - Enterprise-grade machine identity, governance',
            'Auth0 Token Vault + XAA - Developer-friendly agent credentials and delegation',
          ],
          reasoning:
            'Choose Okta for enterprise governance focus. Choose Auth0 for developer experience focus. Both support machine identity for agents.',
          buyer: 'CTO, Platform Engineer, AI Platform Lead',
        },
        {
          scenario: 'Hybrid: Internal + Customer AI',
          description: 'Enterprise with both employee AI tools AND customer-facing AI products',
          recommendation: 'Both Okta and Auth0',
          products: [
            'Okta Workforce Identity + ISPM for internal AI governance',
            'Auth0 for GenAI + Token Vault + FGA for customer-facing AI',
          ],
          reasoning:
            'Large enterprises often need both. Okta for workforce, Auth0 for customers. Two distinct identity domains.',
          buyer: 'CISO + CTO + CAIO (cross-functional decision)',
        },
        {
          scenario: 'RAG Pipeline Security',
          description: 'Secure retrieval augmented generation with permission-aware filtering',
          recommendation: 'Auth0',
          products: [
            'Auth0 FGA (Fine-Grained Authorization) - Relationship-based access control',
            'Auth0 Token Vault - Secure agent access to vector databases',
          ],
          reasoning:
            'Auth0 FGA is purpose-built for dynamic, relationship-based permissions. ReBAC model handles "show user only documents they can access."',
          buyer: 'Data Science Manager, AI Platform Lead, ML Engineer',
        },
        {
          scenario: 'Shadow AI Discovery',
          description: 'Find out what AI tools employees are using without IT approval',
          recommendation: 'Okta',
          products: [
            'Okta ISPM for AI - Browser OAuth grant monitoring',
            'Okta Workforce Identity - Enforce SSO for approved AI tools',
          ],
          reasoning:
            'Okta ISPM discovers shadow AI through OAuth grant visibility. Then enforce governance with Okta Workforce Identity.',
          buyer: 'CISO, VP of IT, Compliance Officer',
        },
      ],
    },
  },
}

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
            "Don't push AI adoption - focus on governance of existing AI",
            'Acknowledge their concerns are valid',
          ],
          avoid: [
            'Being too bullish on AI benefits',
            'Dismissing their security concerns',
            "Pushing faster AI adoption than they're ready for",
          ],
          probeAreas: [
            'Specific security concerns',
            'Regulatory requirements',
            'Shadow AI already happening',
            'Board/leadership concerns',
          ],
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
            'Be prepared for them to have built some of this already',
          ],
          avoid: [
            'Explaining AI fundamentals',
            'Generic security pitches',
            "Ignoring what they've already built",
          ],
          probeAreas: [
            'Production agent challenges',
            'Credential management approach',
            'Multi-agent orchestration',
            'MCP adoption plans',
          ],
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
            'Offer ways to govern without blocking innovation',
          ],
          avoid: [
            "Scaring them more about what they don't know",
            'Suggesting heavy-handed blocking approaches',
            'Ignoring the business pressure to move fast on AI',
          ],
          probeAreas: [
            "What they've discovered so far",
            'Business teams involved',
            'Current visibility tools',
            'Governance philosophy',
          ],
        },
        {
          id: 'already-building',
          name: 'Already Building (Incremental)',
          description:
            'Team has already built agent auth piece by piece and needs to step back and evaluate',
          tips: [
            "Validate their work — they're ahead of most organizations, not behind",
            "Ask them to walk you through what they've built (chatbot, MCP gateway, token exchange)",
            'Ask the key differentiating question: "How is this different from a regular OAuth client app?"',
            "Help them see the gap: they're likely losing the user-to-workload-principal relationship",
            'Offer a hands-on POC environment with a Colab notebook, not just docs',
            'Suggest a checkpoint call in 1-2 weeks after they explore the environment',
            "Be transparent about what's available today vs. roadmap (brokered consent, agent-to-agent)",
            'Ask about third-party services (Salesforce, Asana) that bypass their IDP — this is usually a gap',
          ],
          avoid: [
            'Making them feel their existing work was wasted',
            'Being vague about roadmap timelines (they need specific dates)',
            'Pitching the full product suite when they have a specific implementation question',
            'Sending only documentation — they already tried docs and got confused',
          ],
          probeAreas: [
            "What they've built so far (MCP gateway, token exchange, chatbot)",
            'Where they got confused or stuck',
            'Third-party services outside their IDP',
            'User context preservation through the agent chain',
            'Coarse-grained vs fine-grained authorization needs',
            'Agent-to-agent vs user-in-the-flow patterns',
          ],
        },
        {
          id: 'early-ai-copilot',
          name: 'Early AI Adopter (Copilot/ChatGPT Only)',
          description:
            'Organization using AI tools for productivity but no agent-to-app integration yet',
          tips: [
            "Don't pitch agent identity — they don't have agents connecting to internal apps yet",
            'Lead with shadow AI discovery (ISPM) — do they know what AI tools employees are using?',
            'Ask about their AI committee or approval process — many have informal governance',
            'Understand their corporate-sanctioned tools (Copilot, ChatGPT, Claude) and who pays',
            'Ask whether agents are connecting to internal data yet — this is the maturity dividing line',
            "Position ISPM as the starting point, with agent identity as the next step when they're ready",
            'For Microsoft shops, acknowledge Entra and position ISPM as complementary (IDP-agnostic)',
          ],
          avoid: [
            "Pitching Token Vault or XAA to customers who aren't building agents yet",
            'Saying "we need to be the IDP" to Microsoft/Entra customers',
            'Overcomplicating the conversation with MCP, workload principals, and token exchange',
            "Making them feel behind — they're at a normal stage of AI adoption",
          ],
          probeAreas: [
            'Which AI tools are sanctioned and who pays for them',
            'Whether AI tools connect to any internal applications or data',
            'Governance approach (training only vs technical controls)',
            'Shadow AI visibility (do they know what tools employees use?)',
            'Plans for agents connected to internal systems',
          ],
        },
        {
          id: 'open-source-competitor',
          name: 'Open Source IDP Competitor (Keycloak)',
          description:
            'Customer using Keycloak or similar open-source for auth, needs value justification to adopt commercial',
          tips: [
            "Don't compete on basic auth — they chose open-source for cost and it works for their current needs",
            'Show value BEYOND authentication: Token Vault, FGA, MCP auth, ISPM',
            'FGA can work standalone without replacing their IDP — position it as additive',
            "Ask about their AI agent prototypes and what auth gaps they're hitting",
            'When they ask "what value add justifies the cost?", answer with specific AI capabilities Keycloak lacks',
            "If they're building customer-facing AI, Auth0 developer experience is a strong differentiator",
            'Send docs, sample apps, and quick-start guides — technical buyers want to evaluate hands-on',
          ],
          avoid: [
            "Positioning as a Keycloak replacement — they've already chosen it",
            'Leading with enterprise governance for a cost-conscious buyer',
            'Presenting the full product suite when they only need specific pieces',
            'Being dismissive of open-source — they have a working solution',
          ],
          probeAreas: [
            "What AI agent prototypes they're building",
            'Whether agents are customer-facing or internal',
            "Gaps they're hitting with Keycloak as they scale AI agents",
            'Interest in FGA for fine-grained permissions (standalone)',
            'MCP server auth requirements',
          ],
        },
        {
          id: 'technical-deep-dive',
          name: 'Technical Deep Dive Request',
          description:
            'Customer requesting a detailed technical walkthrough or demo of specific capabilities',
          tips: [
            'Start with their specific architecture, not a generic demo',
            'Use their language — if they say "MCP gateway", call it that',
            'Show the Okta admin console with real agent configuration (profiles, credentials, managed connections)',
            'Demonstrate scope-to-MCP-tool mapping with their actual use cases',
            'Show the syslog with real policy grant/deny events',
            'Explain both coarse-grained (scopes) AND fine-grained (FGA/Zanzibar) authorization layers',
            'Be ready with a sequence diagram showing the IDJAG token exchange flow',
            'Offer to share sample code and a self-service onboarding guide',
          ],
          avoid: [
            'Starting with slides when they want to see the product',
            'Glossing over "what\'s available today" vs "what\'s on the roadmap"',
            'Demoing features that are irrelevant to their specific use case',
            'Using marketing language when they want technical precision',
          ],
          probeAreas: [
            'Specific token exchange patterns they need',
            'Authorization server configuration needs',
            'Audit and compliance requirements',
            'Integration with their specific agent frameworks',
            'Performance and latency requirements',
          ],
        },
      ],
    },
  },
}

export const learningTopics = [
  { id: 'fundamentals', name: 'Discovery Fundamentals', icon: 'compass' },
  { id: 'framework', name: 'Discovery Framework', icon: 'map' },
  { id: 'golden-questions', name: 'Golden Questions', icon: 'star' },
  { id: 'psychology', name: 'Stakeholder Psychology', icon: 'brain' },
  { id: 'competitors', name: 'Competitive Intelligence', icon: 'target' },
  { id: 'playbooks', name: 'Scenario Playbooks', icon: 'book' },
]
