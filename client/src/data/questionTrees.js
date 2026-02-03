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
                insight: 'Strong pain point - they have a compliance deadline'
              },
              {
                responseType: 'segregation',
                responseLabel: 'Segregation of Duties',
                example: '"We have SOD conflicts we can\'t easily track..."',
                followUp: 'Which applications have the most critical SOD requirements?',
                insight: 'Good opportunity for policy automation'
              }
            ]
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
                insight: 'Quantify the pain - time and productivity impact'
              },
              {
                responseType: 'visibility',
                responseLabel: 'Visibility Issues',
                example: '"We don\'t really know who has access to what..."',
                followUp: 'When was the last time you did a full access review?',
                insight: 'Risk angle - unknown exposure'
              }
            ]
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
                insight: 'High urgency - they have executive attention'
              },
              {
                responseType: 'strategic-initiative',
                responseLabel: 'Strategic Initiative',
                example: '"It\'s part of our Zero Trust roadmap..."',
                followUp: 'Where does IGA fit in that roadmap?',
                insight: 'Align to their broader vision'
              }
            ]
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
                insight: 'They were testing you - now engage deeply'
              },
              {
                responseType: 'stays-closed',
                responseLabel: 'Stays Guarded',
                example: '"We\'re still figuring that out..."',
                followUp: 'What would need to be true for this to become a priority?',
                insight: 'Low priority - try to understand what would change that'
              }
            ]
          }
        ]
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
                insight: 'They know their pain points - dig into current gaps'
              }
            ]
          },
          {
            responseType: 'efficiency',
            responseLabel: 'Operational Efficiency',
            example: '"We want to cut down access request time..."',
            sentiment: 'positive',
            followUp: 'What\'s the current turnaround time?',
            nextBranches: [
              {
                responseType: 'numbers',
                responseLabel: 'Provides Metrics',
                example: '"It takes about 3-5 days on average..."',
                followUp: 'What do you think it should be?',
                insight: 'Build the business case with their numbers'
              }
            ]
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
                insight: 'Security-focused buyer - lead with risk reduction'
              }
            ]
          }
        ]
      }
    ]
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
                insight: 'Multi-cloud complexity is an opportunity'
              },
              {
                responseType: 'centralized',
                responseLabel: 'Centralized Identity',
                example: '"Everything goes through Okta/Azure AD..."',
                followUp: 'How are you handling access reviews and certifications?',
                insight: 'Already have IdP - IGA is the natural next step'
              }
            ]
          },
          {
            responseType: 'hybrid',
            responseLabel: 'Hybrid Environment',
            example: '"We have on-prem AD but are moving to cloud..."',
            sentiment: 'neutral',
            followUp: 'What\'s driving the migration timeline?',
            nextBranches: [
              {
                responseType: 'migration-in-progress',
                responseLabel: 'Active Migration',
                example: '"We\'re moving workloads over the next year..."',
                followUp: 'How are you handling identity during the transition?',
                insight: 'Good timing - can help with migration'
              },
              {
                responseType: 'hybrid-long-term',
                responseLabel: 'Hybrid Long-Term',
                example: '"Some things will stay on-prem..."',
                followUp: 'Which workloads need to stay on-prem?',
                insight: 'Need solution that works across both'
              }
            ]
          },
          {
            responseType: 'legacy',
            responseLabel: 'Mostly On-Prem',
            example: '"We\'re still primarily on-premises..."',
            sentiment: 'neutral',
            followUp: 'What\'s your cloud strategy looking like?',
            nextBranches: [
              {
                responseType: 'cloud-curious',
                responseLabel: 'Planning Cloud Move',
                example: '"We\'re starting to look at cloud options..."',
                followUp: 'What\'s driving the interest in cloud?',
                insight: 'Position IGA as part of their modernization'
              },
              {
                responseType: 'staying-on-prem',
                responseLabel: 'Committed to On-Prem',
                example: '"We have regulatory requirements to stay on-prem..."',
                followUp: 'What compliance frameworks are driving that?',
                insight: 'Need to address their specific constraints'
              }
            ]
          }
        ]
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
                insight: 'Good opportunity for custom connector discussion'
              },
              {
                responseType: 'saas-apps',
                responseLabel: 'SaaS Applications',
                example: '"Some of our SaaS tools aren\'t supported..."',
                followUp: 'Which SaaS apps are the highest priority?',
                insight: 'Check connector availability - may have good news'
              }
            ]
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
                insight: 'Opportunity to differentiate on performance'
              }
            ]
          },
          {
            responseType: 'complexity',
            responseLabel: 'Too Complex',
            example: '"It takes too long to configure policies..."',
            sentiment: 'negative',
            followUp: 'What\'s the most frustrating part of the configuration?',
            nextBranches: [
              {
                responseType: 'ps-dependency',
                responseLabel: 'PS Dependency',
                example: '"We need professional services for everything..."',
                followUp: 'How much are you spending on PS annually?',
                insight: 'TCO angle - compare to self-service model'
              }
            ]
          }
        ]
      }
    ]
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
                productRecommendation: 'Auth0 for GenAI + Token Vault'
              },
              {
                responseType: 'internal',
                responseLabel: 'Internal Automation',
                example: '"Internal process automation agents..."',
                followUp: 'What systems do they need to interact with?',
                insight: 'Okta Workforce Identity or Okta Agent Identity depending on user vs machine identity',
                productRecommendation: 'Okta Workforce Identity / Agent Identity'
              }
            ]
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
                insight: 'Position security as enabler, not blocker'
              }
            ]
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
                insight: 'Help them think through the security implications early'
              }
            ]
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
                insight: 'Lead with governance and control'
              },
              {
                responseType: 'regulatory',
                responseLabel: 'Regulatory Concerns',
                example: '"We\'re waiting to see how regulations develop..."',
                followUp: 'Are you tracking the EU AI Act?',
                insight: 'Position as compliance enabler'
              }
            ]
          }
        ]
      },
      {
        id: 'product-selection',
        rootQuestion: 'Who are the users of your AI applications - your employees or your customers?',
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
                productRecommendation: 'Okta Workforce Identity + ISPM for AI'
              },
              {
                responseType: 'no-okta',
                responseLabel: 'No Okta today',
                example: '"No, we use Microsoft Entra / Azure AD..."',
                followUp: 'Do you have visibility into what AI tools employees are using?',
                insight: 'Position Okta ISPM for shadow AI discovery',
                productRecommendation: 'Okta ISPM for AI (shadow AI discovery)'
              }
            ]
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
                productRecommendation: 'Auth0 for GenAI + Token Vault + FGA'
              },
              {
                responseType: 'rag-pipeline',
                responseLabel: 'RAG Pipeline',
                example: '"We have a RAG system that needs permission-aware filtering..."',
                followUp: 'How do you ensure users only see documents they have access to?',
                insight: 'Auth0 FGA (Fine-Grained Authorization) for ReBAC',
                productRecommendation: 'Auth0 FGA + Token Vault'
              }
            ]
          },
          {
            responseType: 'both',
            responseLabel: 'Both Employees and Customers',
            example: '"We have internal AI tools AND customer-facing AI in our product..."',
            sentiment: 'positive',
            followUp: 'Who owns the budget for each - CISO for internal, or CTO for customer-facing?',
            productRecommendation: 'Both Okta and Auth0',
            products: ['Okta Workforce Identity + ISPM', 'Auth0 for GenAI + Token Vault'],
            nextBranches: [
              {
                responseType: 'separate-budgets',
                responseLabel: 'Separate Budgets',
                example: '"IT budget for internal, Product budget for customer-facing..."',
                followUp: 'Should we have separate conversations with each team?',
                insight: 'Dual sale - Okta to CISO/IT, Auth0 to CTO/Product',
                productRecommendation: 'Okta (workforce) + Auth0 (customer)'
              }
            ]
          },
          {
            responseType: 'autonomous-agents',
            responseLabel: 'Autonomous Agents / Machine Identity',
            example: '"We have production agents that run autonomously..."',
            sentiment: 'neutral',
            followUp: 'What\'s more important - governance and compliance, or developer speed?',
            productRecommendation: 'Okta or Auth0 (depends on priority)',
            products: ['Okta Identity for AI Agents', 'Auth0 Token Vault + XAA'],
            nextBranches: [
              {
                responseType: 'governance-focus',
                responseLabel: 'Governance Priority',
                example: '"We need audit trails and policy enforcement..."',
                followUp: 'How are you handling agent credential rotation today?',
                insight: 'Okta Identity for AI Agents (enterprise governance)',
                productRecommendation: 'Okta Identity for AI Agents'
              },
              {
                responseType: 'developer-focus',
                responseLabel: 'Developer Speed Priority',
                example: '"We need something developer-friendly and fast..."',
                followUp: 'Are you using LangChain, CrewAI, or custom frameworks?',
                insight: 'Auth0 Token Vault + XAA (developer experience)',
                productRecommendation: 'Auth0 Token Vault + XAA'
              }
            ]
          }
        ]
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
                insight: 'Clear need for systematic governance'
              }
            ]
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
                productRecommendation: 'Okta ISPM for AI'
              }
            ]
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
                insight: 'Policy-based access control is the answer'
              }
            ]
          }
        ]
      }
    ]
  }
};

export function getTreesForTrack(track) {
  return questionTrees[track]?.trees || [];
}

export function getAllTrees() {
  return Object.entries(questionTrees).flatMap(([track, data]) =>
    data.trees.map(tree => ({ ...tree, track, trackName: data.name }))
  );
}
