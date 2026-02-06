// AI Security Products - Identity-focused product data for discovery practice

export const aiSecurityProducts = [
  {
    id: 'auth-for-genai',
    name: 'Auth for GenAI',
    shortName: 'Auth for GenAI',
    identityFocus: 'User authentication for AI applications',
    description: 'OAuth/OIDC authentication for generative AI applications. Enables secure user access to AI tools with SSO, MFA, and lifecycle management.',
    painPoints: [
      'users accessing AI tools',
      'SSO for AI',
      'AI app authentication',
      'shadow AI access',
      'employee AI tool access'
    ],
    useCases: [
      'SSO for ChatGPT Enterprise, Claude Pro, Microsoft Copilot',
      'User authentication for internal AI platforms',
      'B2C authentication for customer-facing AI apps'
    ],
    color: '#6366f1' // indigo
  },
  {
    id: 'token-vault',
    name: 'Token Vault',
    shortName: 'Token Vault',
    identityFocus: 'Secure credential storage for AI agents',
    description: 'Secure storage for user API tokens that AI agents need to access on behalf of users. Prevents credential exposure and enables token lifecycle management.',
    painPoints: [
      'credential sprawl',
      'API keys in code',
      'secrets management',
      'hard-coded credentials',
      'token security',
      'credential exposure',
      'agent credentials'
    ],
    useCases: [
      'Storing user tokens for agent-to-service calls',
      'Token exchange for async agent tasks',
      'Secure delegation for long-running agents'
    ],
    color: '#10b981' // emerald
  },
  {
    id: 'agent-identity',
    name: 'Agent Identity',
    shortName: 'Agent Identity',
    identityFocus: 'Machine identity for AI agents',
    description: 'OAuth 2.0 machine identity management for autonomous AI agents. Enables secure agent-to-service authentication with policy-based authorization.',
    painPoints: [
      'how do agents authenticate',
      'agent permissions',
      'machine identity',
      'agent authorization',
      'agent-to-service auth',
      'agent access control'
    ],
    useCases: [
      'Production AI agent identity',
      'Agent-to-agent trust relationships',
      'Policy-based agent authorization'
    ],
    color: '#8b5cf6' // violet
  },
  {
    id: 'cross-app-access',
    name: 'Cross App Access',
    shortName: 'XAA',
    identityFocus: 'Agent delegation across systems',
    description: 'Secure agent-to-app and app-to-app access delegation using OAuth extensions. Enables agents to act across multiple enterprise systems on behalf of users.',
    painPoints: [
      'agents accessing multiple apps',
      'cross-system access',
      'agent delegation',
      'multi-app agents',
      'agent-to-app access',
      'enterprise system access'
    ],
    useCases: [
      'Agent accessing Salesforce, ServiceNow, and SAP',
      'Multi-agent system delegation',
      'Cross-application agentic workflows'
    ],
    color: '#f59e0b' // amber
  },
  {
    id: 'ispm',
    name: 'ISPM',
    shortName: 'ISPM',
    identityFocus: 'Identity posture & shadow AI discovery',
    description: 'Identity Security Posture Management for AI workloads. Discovers shadow AI, monitors OAuth grants, and provides visibility into AI agent permissions.',
    painPoints: [
      'shadow AI',
      'unauthorized OAuth grants',
      'ungoverned AI',
      'AI visibility',
      'unknown AI deployments',
      'OAuth grant monitoring',
      'AI posture'
    ],
    useCases: [
      'Shadow AI discovery across organization',
      'Browser OAuth grant monitoring',
      'Risk scoring for overprivileged agents'
    ],
    color: '#ef4444' // red
  },
  {
    id: 'mcp-security',
    name: 'MCP Security',
    shortName: 'MCP Security',
    identityFocus: 'Model Context Protocol access control',
    description: 'Security for Model Context Protocol (MCP) agent-tool connections. Provides authentication, scoped permissions, and audit logging for agent tool access.',
    painPoints: [
      'MCP tools',
      'agent tool access',
      'function calling security',
      'tool authentication',
      'agent-tool connections',
      'MCP server security'
    ],
    useCases: [
      'Securing MCP server connections',
      'Agent tool access control',
      'Audit logging for tool usage'
    ],
    color: '#06b6d4' // cyan
  }
];

// Map discovery areas to relevant Okta products
export const areaToProductMap = {
  security_concerns: ['Token Vault', 'Agent Identity'],
  shadow_ai: ['ISPM'],
  mcp_tool_access: ['MCP Security', 'XAA'],
  agent_use_cases: ['Auth for GenAI', 'Agent Identity'],
  governance_needs: ['ISPM', 'Token Vault'],
  current_approach: ['Token Vault', 'Agent Identity'],
  ai_initiatives: ['Auth for GenAI'],
  timeline: [],
  decision_process: [],
  // New discovery areas based on real customer needs (Robinhood transcript)
  token_exchange_patterns: ['XAA', 'Token Vault', 'Agent Identity'],
  multi_agent_architecture: ['Agent Identity', 'XAA', 'MCP Security'],
  third_party_integrations: ['MCP Security', 'XAA', 'ISPM']
};

// Get products relevant to discovered areas
export function getProductsForAreas(discoveredAreas) {
  const products = new Set();
  for (const area of discoveredAreas) {
    const areaProducts = areaToProductMap[area] || [];
    areaProducts.forEach(p => products.add(p));
  }
  return Array.from(products);
}

// Get product by short name
export function getProductByName(shortName) {
  return aiSecurityProducts.find(p => p.shortName === shortName || p.name === shortName);
}

// Get all product short names
export function getProductShortNames() {
  return aiSecurityProducts.map(p => p.shortName);
}
