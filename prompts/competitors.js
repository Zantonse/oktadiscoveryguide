// Competitor information for realistic discovery conversations
// The AI stakeholder can reference these when mentioning competitors

export const competitors = {
  // IGA (Identity Governance & Administration) Competitors
  iga: {
    sailpoint: {
      name: 'SailPoint',
      type: 'IGA Leader',
      description: 'Market leader in enterprise IGA. Recently went private (acquired by Thoma Bravo in 2022). Known for deep functionality and enterprise-grade capabilities.',
      products: ['IdentityNow (SaaS)', 'Identity Security Cloud', 'IdentityIQ (on-prem legacy)'],
      strengths: [
        'Most mature IGA platform with deep functionality',
        'Strong enterprise customer base (Fortune 500)',
        'Extensive connector library (300+)',
        'AI-driven identity security (AI Recommendations)',
        'Role mining and access modeling capabilities',
        'Strong compliance and audit features'
      ],
      weaknesses: [
        'Complex implementations - long deployment times',
        'Higher total cost of ownership',
        'IdentityIQ (on-prem) vs IdentityNow (cloud) creates customer confusion',
        'Not unified with workforce identity (SSO/MFA separate)',
        'Heavy professional services dependency',
        'Slower innovation pace since going private'
      ],
      pricing: 'Enterprise pricing, typically $15-40 per user/year depending on modules',
      customers: 'Large enterprises, regulated industries (financial services, healthcare)',
      battlecard: {
        why_okta_wins: [
          'Unified platform (IGA + Workforce Identity in one)',
          'Faster time to value - cloud-native from start',
          'Modern UX - better admin and end-user experience',
          'Lower TCO without heavy PS requirements',
          'Continuous innovation as public company'
        ],
        objection_handlers: {
          'SailPoint is the market leader': 'SailPoint has legacy market share, but the market is shifting to unified identity platforms. Many SailPoint customers are evaluating consolidation.',
          'SailPoint has more features': 'Feature depth matters, but so does time to value. Ask: How long did your SailPoint implementation take? How much do you spend on PS annually?',
          'We already have SailPoint': 'Many customers run both - Okta for workforce identity, then evaluate consolidating IGA. What\'s your renewal timeline?'
        }
      }
    },
    saviynt: {
      name: 'Saviynt',
      type: 'Cloud-Native IGA Challenger',
      description: 'Cloud-native IGA platform with strong convergence story (IGA + PAM + CPAM). Known for healthcare and financial services focus.',
      products: ['Enterprise Identity Cloud (EIC)', 'Identity Governance', 'Cloud PAM', 'Application Access Governance'],
      strengths: [
        'True cloud-native architecture',
        'Converged IGA + PAM in one platform',
        'Strong cloud infrastructure governance (AWS, Azure, GCP)',
        'Good healthcare vertical expertise',
        'Identity analytics and risk scoring',
        'Competitive pricing vs SailPoint'
      ],
      weaknesses: [
        'Smaller market presence than SailPoint/Okta',
        'Less mature ecosystem and integrations',
        'Variable implementation quality',
        'Support can be inconsistent',
        'UI/UX not as polished',
        'Limited workforce identity capabilities (SSO/MFA)'
      ],
      pricing: 'Competitive enterprise pricing, typically $12-30 per user/year',
      customers: 'Mid-market to enterprise, strong in healthcare and financial services',
      battlecard: {
        why_okta_wins: [
          'Okta has stronger workforce identity foundation',
          'Better ecosystem and marketplace integrations',
          'More consistent global support',
          'Proven at larger scale deployments',
          'Clearer product roadmap and R&D investment'
        ],
        objection_handlers: {
          'Saviynt has PAM too': 'Converged doesn\'t mean best-of-breed. How are you handling workforce identity? Most Saviynt customers still need separate SSO/MFA.',
          'Saviynt is cheaper': 'Compare total cost including implementation, customization, and ongoing maintenance. What\'s included in that price?',
          'Saviynt is cloud-native too': 'Both are cloud-native. The question is ecosystem - Okta\'s 7000+ integrations vs Saviynt\'s more limited connector library.'
        }
      }
    },
    oneidentity: {
      name: 'One Identity (Quest)',
      type: 'Traditional IGA Vendor',
      description: 'Part of Quest Software (owned by Francisco Partners). Traditional IGA with both on-prem and cloud offerings. Strong in Active Directory environments.',
      products: ['Identity Manager', 'One Identity Manager (cloud)', 'Safeguard (PAM)', 'Active Roles'],
      strengths: [
        'Deep Active Directory integration',
        'Strong on-premises capabilities',
        'Lower cost than SailPoint',
        'Good for Microsoft-centric environments',
        'Includes PAM capabilities (Safeguard)'
      ],
      weaknesses: [
        'Legacy architecture - not cloud-native',
        'Dated user interface',
        'Slower cloud transformation',
        'Limited modern SaaS app integrations',
        'Complex licensing model',
        'Less innovation investment'
      ],
      pricing: 'Lower than SailPoint, typically $10-25 per user/year',
      customers: 'Mid-market, Microsoft-heavy environments, organizations with significant on-prem',
      battlecard: {
        why_okta_wins: [
          'Modern cloud-native architecture vs legacy',
          'Far superior SaaS application integration',
          'Better end-user experience',
          'Stronger identity-first security approach',
          'More active development and innovation'
        ],
        objection_handlers: {
          'One Identity is cheaper': 'Initial license cost is one factor. What about implementation time, ongoing maintenance, and the cost of not having modern integrations?',
          'We\'re a Microsoft shop': 'Okta has deep Microsoft integrations while also supporting your non-Microsoft apps. One Identity struggles outside the Microsoft ecosystem.',
          'We need on-premises': 'What\'s driving the on-prem requirement? Most compliance frameworks now accept cloud solutions. Let\'s discuss your specific needs.'
        }
      }
    },
    microsoft: {
      name: 'Microsoft Entra ID Governance',
      type: 'Platform Bundling Play',
      description: 'Microsoft\'s IGA offering as part of Entra ID (formerly Azure AD). Bundled with E5 licensing. Growing capabilities but still maturing.',
      products: ['Entra ID Governance', 'Access Reviews', 'Entitlement Management', 'Lifecycle Workflows', 'Privileged Identity Management (PIM)'],
      strengths: [
        'Bundled with Microsoft 365 E5 (perceived as "free")',
        'Native integration with Microsoft ecosystem',
        'Growing feature set with active investment',
        'Familiar UI for Microsoft admins',
        'PIM included for Azure/M365 privileged access'
      ],
      weaknesses: [
        'Limited non-Microsoft application support',
        'Basic governance compared to dedicated IGA',
        'No deep SaaS app provisioning',
        'Access reviews are simplistic',
        'Role management is limited',
        'Reporting and analytics are basic',
        'Not suitable for complex governance needs'
      ],
      pricing: 'Bundled with E5 (~$57/user/month) or standalone Entra ID Governance ($7/user/month)',
      customers: 'Microsoft-centric organizations, those seeking to maximize E5 investment',
      battlecard: {
        why_okta_wins: [
          'Okta provides governance across ALL apps, not just Microsoft',
          'Deeper IGA capabilities for complex requirements',
          'Better for heterogeneous environments',
          'True enterprise-grade governance features',
          'Avoid Microsoft lock-in'
        ],
        objection_handlers: {
          'We get it free with E5': 'It\'s included, but is it sufficient? What about your non-Microsoft apps? Salesforce, Workday, ServiceNow? Those need governance too.',
          'We\'re standardizing on Microsoft': 'Most enterprises have 200+ apps, majority non-Microsoft. Entra ID Governance only covers a fraction. What\'s your plan for the rest?',
          'Microsoft is good enough': 'For basic access reviews maybe. But for lifecycle automation, deep SaaS governance, or complex compliance? Let\'s compare capabilities.'
        }
      }
    },
    ibm: {
      name: 'IBM Security Verify Governance',
      type: 'Enterprise Legacy Vendor',
      description: 'IBM\'s IGA offering, formerly IBM Security Identity Governance. Part of IBM Security portfolio. Strong in large enterprise but legacy architecture.',
      products: ['Security Verify Governance', 'Identity Governance and Intelligence'],
      strengths: [
        'Deep enterprise functionality',
        'Strong compliance and audit capabilities',
        'Good for mainframe/legacy system integration',
        'IBM services and support',
        'Risk-based access certification'
      ],
      weaknesses: [
        'Very complex implementation',
        'Legacy architecture',
        'Poor user experience',
        'High total cost of ownership',
        'Slow innovation pace',
        'Diminishing market investment'
      ],
      pricing: 'Enterprise pricing, often $20-50 per user/year plus significant services',
      customers: 'Large enterprises, IBM shops, mainframe environments',
      battlecard: {
        why_okta_wins: [
          'Modern cloud-native vs legacy on-prem',
          'Dramatically better user experience',
          'Faster time to value',
          'Lower total cost of ownership',
          'Active product investment and roadmap'
        ],
        objection_handlers: {
          'We\'re an IBM shop': 'Many IBM customers are diversifying their identity stack. Cloud transformation requires modern identity platforms.',
          'IBM has more features': 'Features matter less if they take years to implement. What\'s your current IBM IGA implementation timeline been?'
        }
      }
    },
    oracle: {
      name: 'Oracle Identity Governance',
      type: 'Enterprise Legacy Vendor',
      description: 'Oracle\'s IGA solution. Part of Oracle Identity Management suite. Strong in Oracle application environments but struggling in cloud transformation.',
      products: ['Oracle Identity Governance (OIG)', 'Oracle Access Governance (OAG - cloud)'],
      strengths: [
        'Deep Oracle application integration',
        'Strong for Oracle ERP/HCM environments',
        'Comprehensive on-premises capabilities',
        'Oracle support and services'
      ],
      weaknesses: [
        'Complex and dated architecture',
        'Very long implementation times',
        'Limited cloud/SaaS capabilities',
        'Poor user experience',
        'High cost and Oracle lock-in',
        'Minimal modern app integrations'
      ],
      pricing: 'Complex Oracle licensing, typically expensive',
      customers: 'Oracle ERP/HCM customers, large enterprises with Oracle investments',
      battlecard: {
        why_okta_wins: [
          'Okta governs Oracle apps plus everything else',
          'Modern cloud architecture',
          'Dramatically simpler deployment',
          'Better user experience',
          'Avoid Oracle lock-in'
        ],
        objection_handlers: {
          'We\'re an Oracle shop': 'Okta has great Oracle integrations. But you also have non-Oracle apps that need governance. Okta covers your entire ecosystem.',
          'Oracle includes governance': 'Included doesn\'t mean optimal. What\'s your implementation timeline and how does it handle your cloud apps?'
        }
      }
    }
  },

  // Workforce Identity / IAM Competitors (relevant to technical discovery)
  iam: {
    ping: {
      name: 'Ping Identity',
      type: 'Enterprise IAM',
      description: 'Enterprise-focused identity provider. Strong in complex federation and financial services. Recently merged with ForgeRock (2023).',
      products: ['PingOne', 'PingFederate', 'PingAccess', 'PingID', 'PingDirectory'],
      strengths: [
        'Strong federation capabilities',
        'Good for complex enterprise requirements',
        'Financial services expertise',
        'Flexible deployment options',
        'Strong API security capabilities'
      ],
      weaknesses: [
        'Fragmented product portfolio',
        'Complex to implement and manage',
        'ForgeRock merger causing uncertainty',
        'Higher cost than Okta',
        'Less intuitive UI'
      ],
      relevance_to_iga: 'Competes on workforce identity. Some customers consider Ping for SSO + SailPoint/Saviynt for IGA.',
      battlecard: {
        why_okta_wins: [
          'Unified platform vs point products',
          'Better admin and user experience',
          'Stronger ecosystem and marketplace',
          'More predictable pricing',
          'Clearer roadmap post-ForgeRock merger'
        ]
      }
    },
    forgerock: {
      name: 'ForgeRock',
      type: 'Developer-Focused IAM',
      description: 'Developer-focused identity platform. Merged with Ping Identity in 2023. Known for customization and CIAM capabilities.',
      products: ['ForgeRock Identity Platform', 'ForgeRock Identity Cloud'],
      strengths: [
        'Highly customizable',
        'Good for developers',
        'Strong CIAM capabilities',
        'Open standards support'
      ],
      weaknesses: [
        'Requires significant development effort',
        'Merger uncertainty with Ping',
        'Less turnkey than Okta',
        'Smaller market presence'
      ],
      relevance_to_iga: 'More CIAM focused, limited IGA play.',
      battlecard: {
        why_okta_wins: [
          'Faster time to value',
          'Less development required',
          'More turnkey solution',
          'Stable company trajectory'
        ]
      }
    }
  },

  // PAM Competitors (often comes up in IGA conversations)
  pam: {
    cyberark: {
      name: 'CyberArk',
      type: 'PAM Leader',
      description: 'Market leader in Privileged Access Management. Has expanded into IGA and workforce identity but PAM remains core.',
      products: ['Privileged Access Manager', 'Identity (SSO)', 'Workforce Identity', 'Conjur (DevOps secrets)'],
      strengths: [
        'PAM market leader',
        'Strong security heritage',
        'Good for highly regulated environments',
        'Comprehensive secrets management',
        'Identity security platform vision'
      ],
      weaknesses: [
        'Complex and expensive',
        'IGA capabilities are immature',
        'Workforce identity is catch-up play',
        'Not a unified platform',
        'High professional services costs'
      ],
      relevance_to_iga: 'Often comes up as "we have CyberArk for privileged access, considering them for IGA too." CyberArk acquired Idaptive for workforce identity.',
      battlecard: {
        why_okta_wins: [
          'CyberArk is PAM-first, IGA is bolt-on',
          'Okta has more mature IGA and workforce identity',
          'Better user experience',
          'Stronger integration ecosystem',
          'CyberArk IGA is unproven at scale'
        ],
        objection_handlers: {
          'CyberArk does IGA too': 'They acquired it recently. How proven is their IGA at enterprise scale? Their PAM is mature, but IGA is new territory for them.',
          'We want one vendor for PAM + IGA': 'That\'s a reasonable goal. Compare IGA maturity - Okta\'s been doing IGA much longer. You can integrate Okta with CyberArk PAM.'
        }
      }
    },
    beyondtrust: {
      name: 'BeyondTrust',
      type: 'PAM Vendor',
      description: 'PAM vendor focused on endpoint privilege management and secure remote access.',
      products: ['Privilege Management', 'Remote Support', 'Password Safe'],
      strengths: ['Strong endpoint privilege management', 'Good secure remote access'],
      weaknesses: ['Limited IGA capabilities', 'Not a platform play'],
      relevance_to_iga: 'Rarely competes directly, but may come up in privileged access discussions.'
    },
    delinea: {
      name: 'Delinea',
      type: 'PAM Vendor',
      description: 'Formed from merger of Thycotic and Centrify. PAM focused with some workforce identity.',
      products: ['Secret Server', 'Server PAM', 'Privilege Manager', 'DevOps Secrets Vault'],
      strengths: ['Good secrets management', 'Simpler than CyberArk'],
      weaknesses: ['Limited IGA', 'Merger integration challenges'],
      relevance_to_iga: 'May come up as existing PAM vendor when discussing privileged access governance.'
    }
  },

  // AI/Agent Security Competitors (for AI Agents track)
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
    }
  }
};

// Competitive phrases the stakeholder might use
export const competitorMentions = {
  sales: [
    "We've been talking to SailPoint about this...",
    "Saviynt showed us a demo last week...",
    "Our current vendor is One Identity, and they say they can do this...",
    "Microsoft Entra has some governance features now, and we already pay for E5...",
    "CyberArk pitched us on their IGA capabilities...",
    "IBM is offering to bundle this with our other security tools...",
    "We're looking at whether Oracle can handle this since we're already Oracle shop..."
  ],
  technical: [
    "SailPoint's connectors seem more mature...",
    "Saviynt claims they can do this out of the box...",
    "We're evaluating Ping Identity as well for the SSO piece...",
    "CyberArk wants us to use their platform for both PAM and IGA...",
    "Microsoft is telling us Entra ID Governance can handle our needs..."
  ],
  aiAgents: [
    "We're looking at what AWS and Azure offer natively...",
    "Our security vendor says they're adding AI governance features...",
    "The LangChain team mentioned they have auth capabilities...",
    "Salesforce says Agentforce handles all the security...",
    "ServiceNow claims their AI is secure by default...",
    "We're evaluating Pangea for API security...",
    "Our cloud team wants to use native IAM for everything...",
    "We figured we'd just build custom auth into our agents..."
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
  return competitorMentions[track] || [];
}
