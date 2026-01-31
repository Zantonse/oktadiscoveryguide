// Competitor information for AI Security discovery conversations
// The AI stakeholder can reference these when mentioning competitors

export const competitors = {
  // AI/Agent Security Competitors
  ai: {
    cloud_native: {
      name: 'Cloud Provider Native (AWS/Azure/GCP)',
      type: 'Platform Security',
      description: 'Native security controls from cloud providers for AI workloads. Often first consideration for cloud-native teams.',
      products: {
        aws: ['AWS IAM', 'AWS Bedrock Security', 'Amazon Cognito', 'AWS Secrets Manager'],
        azure: ['Azure AI Security', 'Microsoft Entra', 'Azure Key Vault', 'Azure Managed Identity'],
        gcp: ['Google Cloud IAM', 'Vertex AI Security', 'Secret Manager', 'Workload Identity']
      },
      strengths: [
        'Native integration with their AI services',
        'No additional vendor required',
        'Familiar to cloud teams',
        'Included in cloud spend'
      ],
      weaknesses: [
        'Siloed per cloud - no cross-cloud view',
        'Basic identity governance',
        'No purpose-built agent security',
        'Limited audit and compliance features',
        'Doesn\'t handle multi-cloud or hybrid'
      ],
      battlecard: {
        why_okta_wins: [
          'Unified identity across all clouds and platforms',
          'Purpose-built agent identity management',
          'Cross-cloud visibility and governance',
          'Specialized AI security controls',
          'Works with any LLM provider'
        ],
        objection_handlers: {
          'We use AWS/Azure native security': 'That works for one cloud. What about agents accessing systems across clouds? Or using multiple LLM providers?',
          'It\'s included with our cloud spend': 'Basic IAM is included. Agent-specific identity, governance, and compliance are different requirements. What\'s your plan for agent credential management?'
        }
      }
    },
    pangea: {
      name: 'Pangea',
      type: 'API Security Startup',
      description: 'Security services company offering APIs for authentication, secrets, and security. Targets developers building AI applications.',
      products: ['AuthN', 'AuthZ', 'Vault', 'Secure Audit Log', 'AI Guard'],
      strengths: [
        'Developer-friendly APIs',
        'Quick to integrate',
        'Purpose-built for AI apps',
        'Modern approach'
      ],
      weaknesses: [
        'Small startup - scale unproven',
        'Limited enterprise governance',
        'No IGA capabilities',
        'Point solution not platform',
        'Limited compliance features'
      ],
      battlecard: {
        why_okta_wins: [
          'Enterprise-proven at scale',
          'Complete identity platform',
          'Governance and compliance included',
          'Established vendor vs startup risk',
          'Integration with enterprise systems'
        ],
        objection_handlers: {
          'Pangea is purpose-built for AI': 'Purpose-built for developer use cases. What about enterprise governance, compliance, and audit requirements?',
          'Pangea is easier to integrate': 'For simple use cases maybe. But agents need to access enterprise systems - that requires enterprise integration.'
        }
      }
    },
    platform_native: {
      name: 'Agentic Platform Native Security',
      type: 'Platform-Embedded Security',
      description: 'Built-in security from agentic AI platforms like Salesforce Agentforce, ServiceNow, Workday AI.',
      platforms: {
        salesforce: {
          name: 'Salesforce Agentforce',
          claim: 'Agents are secure within Salesforce trust boundary',
          reality: 'Limited to Salesforce data, no cross-system governance'
        },
        servicenow: {
          name: 'ServiceNow Now Assist',
          claim: 'Native ServiceNow security and access controls',
          reality: 'Good within ServiceNow, but agents often need to access external systems'
        },
        workday: {
          name: 'Workday AI',
          claim: 'Built on Workday security model',
          reality: 'Limited to Workday HR data access'
        }
      },
      strengths: [
        'Native integration with their platform',
        'Leverages existing permissions',
        'No additional cost',
        'Fast to deploy'
      ],
      weaknesses: [
        'Only works within that platform',
        'No cross-system agent governance',
        'Limited visibility into agent actions',
        'Can\'t handle multi-platform agents',
        'Compliance gaps for external access'
      ],
      battlecard: {
        why_okta_wins: [
          'Agents don\'t stay within platform boundaries',
          'Cross-platform agent identity and governance',
          'Unified audit trail across all agent actions',
          'Handle agent-to-agent trust relationships',
          'Compliance visibility across the organization'
        ],
        objection_handlers: {
          'Salesforce Agentforce handles security': 'Within Salesforce, yes. But when agents need to access ServiceNow, Workday, or external APIs? That\'s where you need unified identity.',
          'Our platforms have their own security': 'They do for their own data. But modern agents are cross-functional. How do you govern an agent that touches 5 different systems?',
          'We trust our platform vendors': 'So do we. But you need a layer that works across all of them for unified governance and compliance.'
        }
      }
    },
    langchain_auth: {
      name: 'LangChain/Framework Auth',
      type: 'Open Source/DIY',
      description: 'Organizations building custom auth into agent frameworks like LangChain, CrewAI, AutoGen.',
      examples: ['LangChain authentication patterns', 'Custom OAuth implementations', 'DIY token management'],
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
        'Credential management is DIY'
      ],
      battlecard: {
        why_okta_wins: [
          'Don\'t reinvent the wheel on security',
          'Enterprise-grade from day one',
          'Compliance and audit built-in',
          'Reduce security risk',
          'Let devs focus on AI, not auth'
        ],
        objection_handlers: {
          'We\'ll build it ourselves': 'You can, but should you? Your devs should focus on AI capabilities, not reinventing identity. What\'s the TCO of DIY auth long-term?',
          'LangChain handles auth': 'LangChain provides patterns, not enterprise identity management. Who manages credentials? Who audits access? Who handles compliance?'
        }
      }
    },
    startup_security: {
      name: 'AI Security Startups',
      type: 'Emerging Vendors',
      description: 'Venture-backed startups building AI-specific security solutions. Fast-moving but unproven at scale.',
      examples: ['Protect AI', 'CalypsoAI', 'Lakera', 'Robust Intelligence'],
      strengths: [
        'AI-native approach',
        'Fast innovation',
        'Modern architecture',
        'Focus on specific AI risks'
      ],
      weaknesses: [
        'Unproven at enterprise scale',
        'Vendor stability risk',
        'Limited integrations',
        'Narrow functionality',
        'May not be around in 3 years'
      ],
      battlecard: {
        why_okta_wins: [
          'Enterprise-proven stability',
          'Comprehensive identity platform',
          'Established ecosystem and integrations',
          'Long-term partnership confidence',
          'Regulatory and compliance expertise'
        ],
        objection_handlers: {
          'This startup is more innovative': 'Innovation matters, but so does scale and stability. Can they support your enterprise requirements? Will they be around in 3 years?',
          'They\'re purpose-built for AI': 'Purpose-built is good. But you also need enterprise identity infrastructure. Most startups lack that foundation.'
        }
      }
    }
  }
};

// Competitive phrases the stakeholder might use
export const competitorMentions = {
  aiAgents: [
    "We're looking at what AWS and Azure offer natively...",
    "Our security vendor says they're adding AI governance features...",
    "The LangChain team mentioned they have auth capabilities...",
    "Salesforce says Agentforce handles all the security...",
    "ServiceNow claims their AI is secure by default...",
    "We're evaluating Pangea for API security...",
    "Our cloud team wants to use native IAM for everything...",
    "We figured we'd just build custom auth into our agents...",
    "We're looking at some AI security startups...",
    "Microsoft Entra should be able to handle this..."
  ]
};

// Get competitor by ID for quick lookup
export function getCompetitor(category, id) {
  return competitors[category]?.[id] || null;
}

// Get all competitors for a category
export function getCompetitorsByCategory(category) {
  return competitors[category] || {};
}

// Get competitive mentions for a track
export function getCompetitorMentions(track) {
  return competitorMentions[track] || competitorMentions.aiAgents;
}
