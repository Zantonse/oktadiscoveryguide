import OpenAI from 'openai';
import { getIndustryContext } from '../prompts/industries.js';
import { getPersonaContext } from '../prompts/personas.js';
import { getScenarioContext } from '../prompts/scenarios.js';
import { getPhasePrompt, buildSystemPrompt } from '../prompts/systemPrompt.js';
import { getTechnicalDeepDivePrompt, getArchitectureLabPrompt, getBriefingRoomPrompt, getProofPointMatchPrompt } from '../prompts/challengePrompts.js';

let openai = null;

// Model configuration - uses gpt-5.2-pro via LiteLLM
const MODEL_NAME = process.env.OPENAI_MODEL || 'gpt-5.2';

// Map discovery areas to relevant Okta products for coaching hints
const areaToProductMap = {
  security_concerns: ['Token Vault', 'Agent Identity'],
  shadow_ai: ['ISPM'],
  mcp_tool_access: ['MCP Security', 'XAA'],
  agent_use_cases: ['Auth for GenAI', 'Agent Identity'],
  governance_needs: ['ISPM', 'Token Vault'],
  current_approach: ['Token Vault', 'Agent Identity'],
  ai_initiatives: ['Auth for GenAI'],
  timeline: [],
  decision_process: []
};

// Get products relevant to discovered areas
function getProductHints(discoveredAreas) {
  const products = new Set();
  for (const area of discoveredAreas) {
    const areaProducts = areaToProductMap[area] || [];
    areaProducts.forEach(p => products.add(p));
  }
  return Array.from(products);
}

// Discovery area dependencies - some areas should naturally follow others
const discoveryDependencies = {
  aiAgents: {
    // Area: [areas that should ideally come before]
    agent_use_cases: ['ai_initiatives'],
    mcp_tool_access: ['ai_initiatives', 'agent_use_cases'],
    security_concerns: ['ai_initiatives', 'agent_use_cases'],
    governance_needs: ['security_concerns'],
    shadow_ai: ['ai_initiatives', 'security_concerns'],
    timeline: ['ai_initiatives', 'agent_use_cases', 'security_concerns'],
    decision_process: ['security_concerns', 'governance_needs'],
    current_approach: ['agent_use_cases']
  },
  sales: {
    pain_points: ['current_state'],
    business_impact: ['pain_points'],
    budget: ['pain_points', 'business_impact'],
    timeline: ['pain_points'],
    decision_process: ['budget'],
    success_criteria: ['pain_points', 'business_impact']
  },
  technical: {
    integrations: ['architecture'],
    pain_points: ['architecture'],
    requirements: ['architecture', 'pain_points'],
    compliance: ['requirements'],
    resources: ['requirements'],
    migration: ['architecture', 'requirements']
  }
};

// Golden questions - questions that unlock multiple areas or show excellent discovery skills
const goldenQuestionPatterns = {
  aiAgents: [
    { pattern: /what keeps you up at night.*(ai|agent|security)/i, unlocks: ['security_concerns', 'governance_needs'], bonus: 2 },
    { pattern: /shadow.*(ai|agent)|ungoverned|unauthorized.*(ai|agent)/i, unlocks: ['shadow_ai', 'governance_needs'], bonus: 2 },
    { pattern: /what would happen if.*(agent|ai).*(unauthorized|wrong|breach)/i, unlocks: ['security_concerns', 'governance_needs'], bonus: 2 },
    { pattern: /who.*(own|decide|responsible).*(ai|agent).*(security|governance)/i, unlocks: ['decision_process', 'governance_needs'], bonus: 1 },
    { pattern: /how.*(audit|track|monitor).*(agent|ai)/i, unlocks: ['governance_needs', 'security_concerns'], bonus: 1 },
    { pattern: /credential.*(manage|store|rotate).*(agent|ai)/i, unlocks: ['security_concerns', 'current_approach', 'mcp_tool_access'], bonus: 2 },
    { pattern: /mcp|model context protocol/i, unlocks: ['mcp_tool_access'], bonus: 1 },
    { pattern: /what.*(business|competitive).*(pressure|driver).*(ai|agent)/i, unlocks: ['ai_initiatives', 'timeline'], bonus: 1 }
  ],
  sales: [
    { pattern: /what keeps you up at night.*(access|identity|governance)/i, unlocks: ['pain_points', 'business_impact'], bonus: 2 },
    { pattern: /what.*(cost|impact).*(current|problem|challenge)/i, unlocks: ['business_impact', 'pain_points'], bonus: 2 },
    { pattern: /audit.*(finding|fail|gap)/i, unlocks: ['pain_points', 'business_impact', 'compliance'], bonus: 2 },
    { pattern: /who.*(decide|approve|sign.*off)/i, unlocks: ['decision_process'], bonus: 1 },
    { pattern: /what would success look like/i, unlocks: ['success_criteria'], bonus: 1 },
    { pattern: /what.*(trigger|prompt|cause).*(look|evaluate|consider)/i, unlocks: ['pain_points', 'timeline'], bonus: 2 }
  ],
  technical: [
    { pattern: /walk.*through.*(architecture|current|environment)/i, unlocks: ['architecture'], bonus: 1 },
    { pattern: /what.*(break|fail|challenge).*(current|today)/i, unlocks: ['pain_points', 'architecture'], bonus: 2 },
    { pattern: /integration.*(challenge|pain|difficult)/i, unlocks: ['integrations', 'pain_points'], bonus: 2 },
    { pattern: /compliance.*(require|need|framework)/i, unlocks: ['compliance', 'requirements'], bonus: 1 },
    { pattern: /migration.*(concern|challenge|worry)/i, unlocks: ['migration', 'requirements'], bonus: 1 }
  ]
};

// Check if a question matches golden question patterns
function checkGoldenQuestion(question, track) {
  const patterns = goldenQuestionPatterns[track] || [];
  for (const { pattern, unlocks, bonus } of patterns) {
    if (pattern.test(question)) {
      return { isGolden: true, unlocks, bonus };
    }
  }
  return { isGolden: false, unlocks: [], bonus: 0 };
}

// Check if discovered areas follow good flow
function analyzeDiscoveryFlow(discoveredAreas, track) {
  const deps = discoveryDependencies[track] || {};
  let flowScore = 100;
  const flowIssues = [];
  const goodTransitions = [];

  for (let i = 1; i < discoveredAreas.length; i++) {
    const currentArea = discoveredAreas[i];
    const previousAreas = discoveredAreas.slice(0, i);
    const requiredDeps = deps[currentArea] || [];

    // Check if dependencies were discovered before this area
    const missingDeps = requiredDeps.filter(dep => !previousAreas.includes(dep));

    if (missingDeps.length > 0 && requiredDeps.length > 0) {
      flowScore -= 10;
      flowIssues.push(`Discovered "${currentArea}" before exploring: ${missingDeps.join(', ')}`);
    } else if (requiredDeps.length > 0 && missingDeps.length === 0) {
      goodTransitions.push(`Good flow: ${previousAreas[previousAreas.length - 1]} → ${currentArea}`);
    }
  }

  return {
    flowScore: Math.max(0, flowScore),
    flowIssues,
    goodTransitions,
    isLogicalFlow: flowScore >= 70
  };
}

// Parse interest level, progress, discovered areas, and conversation ended flag from response
function parseInterestLevel(rawMessage) {
  const interestMatch = rawMessage.match(/\[INTEREST:(\d+)\]/);
  const progressMatch = rawMessage.match(/\[PROGRESS:(\d+)\]/);
  const discoveredMatch = rawMessage.match(/\[DISCOVERED:([^\]]*)\]/);
  const interestLevel = interestMatch ? parseInt(interestMatch[1], 10) : 5;
  const discoveryProgress = progressMatch ? parseInt(progressMatch[1], 10) : 0;
  const discoveredAreas = discoveredMatch
    ? discoveredMatch[1].split(',').map(s => s.trim()).filter(Boolean)
    : [];
  const conversationEnded = rawMessage.includes('[CONVERSATION_ENDED]');
  const message = rawMessage
    .replace(/\n?\[INTEREST:\d+\]/, '')
    .replace(/\n?\[PROGRESS:\d+\]/, '')
    .replace(/\n?\[DISCOVERED:[^\]]*\]/, '')
    .replace(/\n?\[CONVERSATION_ENDED\]/, '')
    .trim();
  return {
    message,
    interestLevel: Math.min(10, Math.max(1, interestLevel)),
    discoveryProgress: Math.min(100, Math.max(0, discoveryProgress)),
    discoveredAreas,
    conversationEnded
  };
}

export function initializeOpenAI() {
  if (!process.env.OPENAI_API_KEY) {
    console.warn('Warning: OPENAI_API_KEY not set. Chat functionality will be limited.');
    return false;
  }

  const config = {
    apiKey: process.env.OPENAI_API_KEY
  };

  // Support LiteLLM proxy endpoint
  if (process.env.OPENAI_API_BASE) {
    config.baseURL = process.env.OPENAI_API_BASE;
  }

  openai = new OpenAI(config);

  return true;
}

export async function generateResponse(messages, config) {
  const { industryId, personaId, track, phaseId, scenarioId } = config;

  // Build the system prompt with all context
  const industryContext = getIndustryContext(industryId);
  const personaContext = getPersonaContext(personaId);
  const phaseContext = getPhasePrompt(track, phaseId);
  const scenarioContext = scenarioId ? getScenarioContext(track, scenarioId) : '';

  let systemPrompt = buildSystemPrompt(
    industryContext,
    personaContext,
    track,
    phaseContext
  );

  // Add scenario context if provided
  if (scenarioContext) {
    systemPrompt += `\n\n${scenarioContext}`;
  }

  // If OpenAI is not configured, return a demo response
  if (!openai) {
    return generateDemoResponse(messages, config);
  }

  try {
    const response = await openai.chat.completions.create({
      model: MODEL_NAME,
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages
      ],
      temperature: 0.8,
      max_tokens: 500,
      presence_penalty: 0.1,
      frequency_penalty: 0.1
    });

    const rawMessage = response.choices[0].message.content;

    // Parse interest level from response
    const { message: stakeholderMessage, interestLevel, discoveryProgress, discoveredAreas, conversationEnded } = parseInterestLevel(rawMessage);

    // Generate coaching hint for the salesperson
    const coachingHint = await generateCoachingHint(messages, stakeholderMessage, config);

    // Generate product hints based on discovered areas
    const productHints = getProductHints(discoveredAreas);

    // Generate report card if conversation ended
    let reportCard = null;
    if (conversationEnded) {
      reportCard = await generateReportCard(messages, config, interestLevel, discoveredAreas);
    }

    return {
      success: true,
      message: stakeholderMessage,
      interestLevel,
      discoveryProgress,
      discoveredAreas,
      conversationEnded,
      reportCard,
      coachingHint,
      productHints,
      usage: response.usage
    };
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Streaming version of generateResponse
export async function* generateResponseStream(messages, config) {
  const { industryId, personaId, track, phaseId, scenarioId } = config;

  const industryContext = getIndustryContext(industryId);
  const personaContext = getPersonaContext(personaId);
  const phaseContext = getPhasePrompt(track, phaseId);
  const scenarioContext = scenarioId ? getScenarioContext(track, scenarioId) : '';

  let systemPrompt = buildSystemPrompt(
    industryContext,
    personaContext,
    track,
    phaseContext
  );

  // Add scenario context if provided
  if (scenarioContext) {
    systemPrompt += `\n\n${scenarioContext}`;
  }

  // If OpenAI is not configured, yield demo response
  if (!openai) {
    const demo = generateDemoResponse(messages, config);
    yield { type: 'content', content: demo.message };
    yield { type: 'done', coachingHint: getDefaultCoachingHint(track, phaseId) };
    return;
  }

  try {
    const stream = await openai.chat.completions.create({
      model: MODEL_NAME,
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages
      ],
      temperature: 0.8,
      max_tokens: 500,
      presence_penalty: 0.1,
      frequency_penalty: 0.1,
      stream: true
    });

    let fullMessage = '';

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      if (content) {
        fullMessage += content;
        yield { type: 'content', content };
      }
    }

    // Parse interest level and generate coaching hint after streaming completes
    const { message: cleanMessage, interestLevel, discoveryProgress, discoveredAreas, conversationEnded } = parseInterestLevel(fullMessage);
    const coachingHint = await generateCoachingHint(messages, cleanMessage, config);

    // Generate product hints based on discovered areas
    const productHints = getProductHints(discoveredAreas);

    // Generate report card if conversation ended
    let reportCard = null;
    if (conversationEnded) {
      reportCard = await generateReportCard(messages, config, interestLevel, discoveredAreas);
    }

    yield { type: 'done', coachingHint, interestLevel, discoveryProgress, discoveredAreas, cleanMessage, conversationEnded, reportCard, productHints };

  } catch (error) {
    console.error('OpenAI Streaming Error:', error);
    yield { type: 'error', error: error.message };
  }
}

async function generateCoachingHint(messages, lastResponse, config) {
  const { track, phaseId, personaId, phase } = config;

  // Different coaching prompt for bridge phase
  const isBridgePhase = phase === 'bridge' || phaseId === 'bridge';

  const coachingPrompt = isBridgePhase
    ? `Sales coach for Okta AI security solution positioning.

Stakeholder (${personaId}) just said: "${lastResponse.slice(0, 300)}"

The salesperson has completed discovery and is now positioning Okta products.

Give ONE punchy coaching tip (max 15 words) on how to POSITION SOLUTIONS effectively.

Focus on:
- Connecting discovered pain points to specific Okta products
- Using the stakeholder's own language
- Avoiding generic pitches
- Handling objections or skepticism

Format: Direct action, no fluff. Start with a verb.

Good examples:
- "Connect their 'credential sprawl' concern to Token Vault - use their words."
- "They seem skeptical - ask what would make this relevant for them."
- "Good connection! Now ask how they'd measure success."
- "Don't pitch ISPM yet - they didn't mention shadow AI concerns."

Bad examples (too generic):
- "Tell them about Okta's great features..."
- "You might want to mention the product benefits..."`
    : `Sales coach for Okta IGA discovery practice.

Stakeholder (${personaId}) just said: "${lastResponse.slice(0, 300)}"

Give ONE punchy coaching tip (max 15 words). Focus on the single most important next move.

Format: Direct action, no fluff. Start with a verb.

Good examples:
- "Probe the audit finding - ask what specific gaps were cited."
- "They're guarded on budget. Shift to understanding priorities first."
- "Good opening - ask what's broken in their current process."

Bad examples (too long/vague):
- "That's interesting, you might want to consider asking more about..."
- "It would be helpful to explore their concerns further by..."`;

  try {
    const response = await openai.chat.completions.create({
      model: MODEL_NAME,
      messages: [
        { role: 'user', content: coachingPrompt }
      ],
      temperature: 0.7,
      max_tokens: 60
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error generating coaching hint:', error);
    return getDefaultCoachingHint(track, phaseId);
  }
}

function getDefaultCoachingHint(track, phaseId) {
  const hints = {
    sales: {
      'initial-discovery': "Ask open-ended questions to understand their current challenges and what prompted this conversation.",
      'qualification': "Explore budget, timeline, and decision-making process - but do it conversationally, not as an interrogation.",
      'solution-mapping': "Connect their specific pain points to Okta capabilities. Use their language, not product jargon.",
      'roi-value': "Help them quantify the cost of their current problems and the value of solving them."
    },
    technical: {
      'current-state': "Map out their current architecture - systems, integrations, and pain points with existing tools.",
      'requirements': "Distinguish must-haves from nice-to-haves. Understand the 'why' behind each requirement.",
      'pain-points': "Get specific examples and stories. Quantify the impact where possible.",
      'use-cases': "Prioritize use cases together. Understand dependencies and quick wins.",
      'architecture': "Discuss implementation approach, timeline expectations, and resource requirements."
    },
    aiAgents: {
      'ai-discovery': "Explore their AI initiatives, agent use cases, and security concerns. Listen for identity pain points.",
      'bridge': "Connect their pain points to Okta products. Use their language - reference what they told you."
    }
  };

  return hints[track]?.[phaseId] || "Listen actively and ask follow-up questions based on what they share.";
}

async function generateReportCard(messages, config, finalInterestLevel, discoveredAreas = []) {
  const { track, phaseId, personaId } = config;

  // Extract just the user messages for analysis
  const userMessages = messages.filter(m => m.role === 'user').map(m => m.content);

  // Analyze discovery flow
  const flowAnalysis = analyzeDiscoveryFlow(discoveredAreas, track);

  // Detect golden questions
  const goldenQuestions = [];
  let goldenQuestionBonus = 0;
  for (const msg of userMessages) {
    const result = checkGoldenQuestion(msg, track);
    if (result.isGolden) {
      goldenQuestions.push({ question: msg.slice(0, 100), bonus: result.bonus });
      goldenQuestionBonus += result.bonus;
    }
  }

  // Calculate coverage percentage
  const totalAreas = Object.keys(discoveryDependencies[track] || {}).length + 1; // +1 for the root area
  const coveragePercent = Math.round((discoveredAreas.length / Math.max(totalAreas, 7)) * 100);

  const reportPrompt = `You are a sales training evaluator. Analyze this discovery conversation and provide a detailed report card.

Conversation with: ${personaId} (${track} track, ${phaseId} phase)
Final interest level: ${finalInterestLevel}/10
Discovery coverage: ${coveragePercent}% (${discoveredAreas.length} areas)
Areas discovered (in order): ${discoveredAreas.join(' → ') || 'None'}
Discovery flow score: ${flowAnalysis.flowScore}/100
Golden questions asked: ${goldenQuestions.length}

${flowAnalysis.flowIssues.length > 0 ? `Flow issues:\n${flowAnalysis.flowIssues.map(i => `- ${i}`).join('\n')}` : 'Flow: Good logical progression'}

${goldenQuestions.length > 0 ? `Golden questions (excellent discovery):\n${goldenQuestions.map(g => `- "${g.question}..."`).join('\n')}` : ''}

Salesperson's messages:
${userMessages.map((m, i) => `${i + 1}. "${m}"`).join('\n')}

Provide a JSON response with this exact structure:
{
  "grade": "A/B/C/D/F",
  "score": 0-100,
  "summary": "One sentence overall assessment",
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "improvements": ["improvement 1", "improvement 2", "improvement 3"],
  "tips": ["specific tip 1", "specific tip 2"],
  "discoveryFlowFeedback": "Feedback on how they navigated discovery areas",
  "goldenQuestionsFeedback": "Feedback on their best questions (or what golden questions they missed)"
}

Grading criteria:
- A (90-100): Excellent discovery - built rapport, uncovered pain, listened well, logical flow, golden questions
- B (80-89): Good discovery - solid questions, some missed opportunities, decent flow
- C (70-79): Average - basic questions, didn't dig deep enough, scattered flow
- D (60-69): Below average - too salesy, missed cues, poor listening, no flow
- F (below 60): Failed - lost the prospect, talked too much, no rapport

SCORING ADJUSTMENTS:
- Add ${goldenQuestionBonus} points for golden questions asked
- Add/subtract up to 10 points based on discovery flow (current: ${flowAnalysis.flowScore}/100)
- Coverage bonus: ${coveragePercent >= 70 ? '+5' : coveragePercent >= 50 ? '+2' : '0'} points for ${coveragePercent}% coverage

Be specific and actionable in your feedback. Reference actual things they said.`;

  if (!openai) {
    const baseScore = finalInterestLevel * 10 + goldenQuestionBonus + Math.round((flowAnalysis.flowScore - 70) / 3);
    const adjustedScore = Math.min(100, Math.max(0, baseScore));
    const grade = adjustedScore >= 90 ? 'A' : adjustedScore >= 80 ? 'B' : adjustedScore >= 70 ? 'C' : adjustedScore >= 60 ? 'D' : 'F';

    return {
      grade,
      score: adjustedScore,
      summary: 'Demo mode - limited analysis available.',
      strengths: goldenQuestions.length > 0
        ? ['Asked impactful discovery questions', 'Showed curiosity about the prospect']
        : ['Participated in the conversation'],
      improvements: flowAnalysis.flowIssues.length > 0
        ? flowAnalysis.flowIssues.slice(0, 2).concat(['Ask more open-ended questions'])
        : ['Ask more open-ended questions', 'Listen and reference what the buyer says', 'Avoid jumping to solutions too quickly'],
      tips: ['Start with "what" and "how" questions', 'Summarize what you heard before moving on'],
      discoveryFlowFeedback: flowAnalysis.isLogicalFlow
        ? 'Good progression through discovery areas.'
        : 'Consider following a more logical flow - explore current state before diving into specific concerns.',
      goldenQuestionsFeedback: goldenQuestions.length > 0
        ? `Great job asking ${goldenQuestions.length} high-impact question(s)!`
        : 'Try asking questions like "What keeps you up at night?" or "What would happen if this isn\'t solved?"',
      flowAnalysis: {
        score: flowAnalysis.flowScore,
        issues: flowAnalysis.flowIssues,
        goodTransitions: flowAnalysis.goodTransitions
      },
      goldenQuestions: goldenQuestions.map(g => g.question)
    };
  }

  try {
    const response = await openai.chat.completions.create({
      model: MODEL_NAME,
      messages: [
        { role: 'user', content: reportPrompt }
      ],
      temperature: 0.7,
      max_tokens: 700
    });

    const content = response.choices[0].message.content;
    // Extract JSON from response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const reportCard = JSON.parse(jsonMatch[0]);
      // Add our analysis to the report card
      reportCard.flowAnalysis = {
        score: flowAnalysis.flowScore,
        issues: flowAnalysis.flowIssues,
        goodTransitions: flowAnalysis.goodTransitions
      };
      reportCard.goldenQuestions = goldenQuestions.map(g => g.question);
      reportCard.discoveryOrder = discoveredAreas;
      return reportCard;
    }
    throw new Error('No JSON found in response');
  } catch (error) {
    console.error('Error generating report card:', error);
    return {
      grade: finalInterestLevel >= 7 ? 'B' : finalInterestLevel >= 4 ? 'C' : 'D',
      score: finalInterestLevel * 10,
      summary: 'Unable to generate detailed analysis.',
      strengths: ['Completed the conversation'],
      improvements: ['Practice active listening', 'Ask follow-up questions', 'Build rapport before pitching'],
      tips: ['Focus on understanding before being understood'],
      discoveryFlowFeedback: 'Analysis unavailable',
      goldenQuestionsFeedback: 'Analysis unavailable',
      flowAnalysis: flowAnalysis,
      goldenQuestions: goldenQuestions.map(g => g.question)
    };
  }
}

export async function generateOpeningMessage(config) {
  const { industryId, personaId, track, phaseId, scenarioId } = config;

  const industryContext = getIndustryContext(industryId);
  const personaContext = getPersonaContext(personaId);
  const phaseContext = getPhasePrompt(track, phaseId);
  const scenarioContext = scenarioId ? getScenarioContext(track, scenarioId) : '';

  let systemPrompt = buildSystemPrompt(
    industryContext,
    personaContext,
    track,
    phaseContext
  );

  // Add scenario context if provided
  if (scenarioContext) {
    systemPrompt += `\n\n${scenarioContext}`;
  }

  const openingPrompt = `Generate a brief, casual greeting for this stakeholder at the start of a discovery meeting.

Keep it SHORT and natural - just 1-2 sentences max. Examples:
- "Hi, thanks for meeting with me. I'm [role] here at [company type]."
- "Hey, good to connect. [Name], [role]. What can I help you with?"
- "Thanks for setting this up. I handle [brief role description] here."

The stakeholder should:
- Give a quick, friendly greeting
- Mention their role briefly
- Then hand it over to the salesperson to lead the conversation

DO NOT:
- Give a long introduction
- Start asking questions
- Mention why they took the meeting
- Set up the whole conversation context

Just a simple hello and role mention, then let the other person take the lead.`;

  if (!openai) {
    return generateDemoOpeningMessage(config);
  }

  try {
    const response = await openai.chat.completions.create({
      model: MODEL_NAME,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: openingPrompt }
      ],
      temperature: 0.9,
      max_tokens: 300
    });

    return {
      success: true,
      message: response.choices[0].message.content
    };
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Discovery areas and suggested questions by track
const discoveryAreaQuestions = {
  aiAgents: {
    ai_initiatives: {
      name: 'AI Initiatives',
      priority: 1,
      questions: [
        "What AI or GenAI initiatives are you currently working on or planning?",
        "Where is your organization on the AI adoption journey - exploring, piloting, or in production?",
        "Which teams are leading your AI initiatives?",
        "What business problems are you hoping AI will solve?",
        "What's driving the urgency around AI adoption in your organization?"
      ]
    },
    agent_use_cases: {
      name: 'Agent Use Cases',
      priority: 2,
      questions: [
        "What specific AI agent use cases are you building or considering?",
        "Are you looking at customer-facing agents, internal copilots, or autonomous agents?",
        "Which agentic platforms are you evaluating - Salesforce Agentforce, ServiceNow, custom builds?",
        "How autonomous do you need these agents to be - will they take actions or just assist?",
        "What data and systems do these agents need to access to be effective?"
      ]
    },
    mcp_tool_access: {
      name: 'MCP & Tool Access',
      priority: 3,
      questions: [
        "How are your AI agents currently connecting to tools and data sources?",
        "Are you familiar with Model Context Protocol (MCP) for agent-tool integration?",
        "What tools and APIs do your agents need to access to perform their tasks?",
        "How do you manage credentials that agents use to access external systems?",
        "What frameworks are you using for agent development - LangChain, CrewAI, AutoGen?"
      ]
    },
    security_concerns: {
      name: 'Security Concerns',
      priority: 4,
      questions: [
        "What security concerns keep you up at night regarding AI agents?",
        "How worried are you about data exposure through AI systems?",
        "What happens if an agent accesses data it shouldn't or takes unauthorized actions?",
        "How do you think about credential management for AI agents?",
        "What's your biggest fear about AI agents in production?"
      ]
    },
    governance_needs: {
      name: 'Governance Needs',
      priority: 5,
      questions: [
        "What compliance requirements affect your AI deployments - EU AI Act, SOC2, HIPAA?",
        "How would you audit what an AI agent did and why?",
        "What governance processes do you have in place for AI today?",
        "How do you demonstrate compliance to auditors for AI systems?",
        "What would a governance framework for AI agents look like for you?"
      ]
    },
    shadow_ai: {
      name: 'Shadow AI',
      priority: 6,
      questions: [
        "Do you have visibility into all the AI agents and tools being used across your organization?",
        "Are teams spinning up AI agents without going through formal approval processes?",
        "How would you know if someone deployed an AI agent that accessed sensitive data?",
        "What's your strategy for discovering ungoverned AI deployments?",
        "How do you balance enabling innovation with maintaining control over AI?"
      ]
    },
    timeline: {
      name: 'Timeline',
      priority: 7,
      questions: [
        "What's your timeline for getting AI agents into production?",
        "Are you under pressure to accelerate AI adoption?",
        "What milestones or deadlines are driving your AI initiatives?",
        "How does AI security fit into your overall project timeline?",
        "What would need to happen to move faster on AI agent deployments?"
      ]
    },
    decision_process: {
      name: 'Decision Process',
      priority: 8,
      questions: [
        "Who owns AI security decisions in your organization - CISO, CTO, AI Platform team?",
        "What's the approval process for new AI security tools?",
        "Who else would be involved in evaluating a solution like this?",
        "How do you typically make build vs buy decisions for AI infrastructure?",
        "What would success look like for an AI security initiative?"
      ]
    },
    current_approach: {
      name: 'Current Approach',
      priority: 9,
      questions: [
        "How are you handling authentication and authorization for AI agents today?",
        "What identity infrastructure are you using for machine-to-machine access?",
        "How do agents get credentials to access systems they need?",
        "What's working and not working about your current approach?",
        "Are you using OAuth, API keys, service accounts, or something else for agent auth?"
      ]
    }
  },
  sales: {
    current_state: {
      name: 'Current State',
      priority: 1,
      questions: [
        "Can you walk me through how you manage user access today?",
        "What tools and systems are you currently using for identity governance?",
        "How do you handle access requests and approvals currently?",
        "What's working well with your current approach?",
        "What prompted you to look at new solutions?"
      ]
    },
    pain_points: {
      name: 'Pain Points',
      priority: 2,
      questions: [
        "What are the biggest challenges you're facing with access management?",
        "Where does your current process break down most often?",
        "Can you give me an example of a recent access-related incident or issue?",
        "What manual processes are causing the most pain for your team?",
        "What would make the biggest impact if you could fix it tomorrow?"
      ]
    },
    business_impact: {
      name: 'Business Impact',
      priority: 3,
      questions: [
        "What's the cost of these access management challenges to your organization?",
        "How do access issues affect your compliance posture?",
        "What's the impact when access isn't provisioned or revoked on time?",
        "Have you had any audit findings related to access management?",
        "How does this affect productivity across the organization?"
      ]
    },
    budget: {
      name: 'Budget',
      priority: 4,
      questions: [
        "Is there budget allocated for solving these access management challenges?",
        "How do you typically fund security and identity initiatives?",
        "What would the investment need to deliver to get approved?",
        "Are there other projects competing for the same budget?",
        "What's the typical range for projects like this in your organization?"
      ]
    },
    timeline: {
      name: 'Timeline',
      priority: 5,
      questions: [
        "What's driving the timing on this initiative?",
        "Do you have any deadlines - compliance, audit, or business - that we should know about?",
        "When would you ideally want to have a solution in place?",
        "What would need to happen to move faster or slower?",
        "How does this fit into your broader IT roadmap?"
      ]
    },
    decision_process: {
      name: 'Decision Process',
      priority: 6,
      questions: [
        "Who else would be involved in making this decision?",
        "What does your typical evaluation process look like?",
        "Who would need to sign off on a project like this?",
        "What criteria will you use to compare solutions?",
        "What's worked well in past vendor evaluations?"
      ]
    },
    success_criteria: {
      name: 'Success Criteria',
      priority: 7,
      questions: [
        "What would success look like 12 months from now?",
        "How will you measure whether this initiative was worth it?",
        "What outcomes matter most to your leadership?",
        "What would make you a hero internally?",
        "If we solve this, what becomes possible that isn't possible today?"
      ]
    }
  },
  technical: {
    architecture: {
      name: 'Architecture',
      priority: 1,
      questions: [
        "Can you walk me through your current IAM architecture?",
        "What directory services and identity providers are in your environment?",
        "How do you handle cloud vs on-prem identity today?",
        "What's your target architecture for the next few years?",
        "Where do you see the biggest architectural gaps?"
      ]
    },
    integrations: {
      name: 'Integrations',
      priority: 2,
      questions: [
        "What systems would need to integrate with an IGA solution?",
        "Which applications are most critical to support first?",
        "How do you handle custom applications and homegrown systems?",
        "What HR systems are you using for identity data?",
        "What's your integration approach - APIs, connectors, custom development?"
      ]
    },
    pain_points: {
      name: 'Pain Points',
      priority: 3,
      questions: [
        "What's the most painful technical gap in your current setup?",
        "Where do things break down from an operational standpoint?",
        "What's causing the most support tickets or escalations?",
        "Which manual processes are you most eager to automate?",
        "What keeps your team working nights and weekends?"
      ]
    },
    requirements: {
      name: 'Requirements',
      priority: 4,
      questions: [
        "What are your must-have technical requirements?",
        "Are there any deal-breakers or non-negotiables?",
        "What level of customization do you typically need?",
        "How important is API access and programmability?",
        "What performance and scalability requirements do you have?"
      ]
    },
    compliance: {
      name: 'Compliance',
      priority: 5,
      questions: [
        "What compliance frameworks do you need to support?",
        "How do you handle access certification and reviews today?",
        "What's your audit cadence and what evidence do you need?",
        "Are there specific security requirements - SOC2, HIPAA, PCI?",
        "How do you demonstrate compliance to auditors?"
      ]
    },
    resources: {
      name: 'Resources',
      priority: 6,
      questions: [
        "What team and resources would be available for implementation?",
        "Do you have internal IAM expertise or would you need support?",
        "What's a realistic timeline given your team's capacity?",
        "How do you typically handle change management?",
        "What's your appetite for ongoing administration?"
      ]
    },
    migration: {
      name: 'Migration',
      priority: 7,
      questions: [
        "What would a migration path look like from your current state?",
        "Are there any systems that would be challenging to migrate?",
        "How do you think about phasing the rollout?",
        "What's your rollback strategy if something goes wrong?",
        "Have you done similar migrations before? What worked?"
      ]
    }
  }
};

export async function generateSuggestedQuestions(config, conversationHistory, discoveredAreas = [], discoveryProgress = 0) {
  const { industryId, personaId, track, phaseId } = config;

  const industryContext = getIndustryContext(industryId);
  const personaContext = getPersonaContext(personaId);
  const phaseContext = getPhasePrompt(track, phaseId);

  // Get areas config for this track
  const trackAreas = discoveryAreaQuestions[track] || discoveryAreaQuestions.sales;

  // Find uncovered areas, sorted by priority
  const allAreas = Object.keys(trackAreas);
  const uncoveredAreas = allAreas
    .filter(area => !discoveredAreas.includes(area))
    .sort((a, b) => trackAreas[a].priority - trackAreas[b].priority);

  // Determine the current stage based on progress
  let stage = 'opening';
  if (discoveryProgress >= 75) stage = 'closing';
  else if (discoveryProgress >= 50) stage = 'deepening';
  else if (discoveryProgress >= 25) stage = 'exploring';
  else if (discoveredAreas.length > 0) stage = 'building';

  if (!openai) {
    return generateStageAwareDemoQuestions(config, track, phaseId, uncoveredAreas, stage, trackAreas);
  }

  // Build a smarter prompt that considers discovery progress
  const prompt = `You are helping a solutions consultant conduct effective discovery. Generate 5 contextual follow-up questions.

CONTEXT:
- Industry: ${industryId}
- Persona: ${personaId}
- Track: ${track}
- Discovery Progress: ${discoveryProgress}%
- Stage: ${stage}

AREAS ALREADY DISCOVERED: ${discoveredAreas.length > 0 ? discoveredAreas.join(', ') : 'None yet'}

AREAS NOT YET COVERED (prioritized): ${uncoveredAreas.slice(0, 4).map(a => `${a} (${trackAreas[a].name})`).join(', ')}

RECENT CONVERSATION:
${conversationHistory.slice(-4).map(m => `${m.role}: ${m.content}`).join('\n')}

STAGE-SPECIFIC GUIDANCE:
${stage === 'opening' ? 'Focus on rapport-building and open-ended questions about current state and initiatives.' :
  stage === 'building' ? 'Build on what you learned. Go deeper into areas mentioned, probe for specifics.' :
  stage === 'exploring' ? 'Explore uncovered areas. Ask about pain points, use cases, and security concerns.' :
  stage === 'deepening' ? 'Dig into business impact, timeline, decision process. Understand urgency and stakeholders.' :
  'Start summarizing findings and confirming understanding. Ask about next steps and success criteria.'}

PRIORITY AREAS TO EXPLORE NEXT:
${uncoveredAreas.slice(0, 3).map(area => {
  const areaConfig = trackAreas[area];
  return `- ${areaConfig.name}: ${areaConfig.questions[0]}`;
}).join('\n')}

Generate 5 questions that:
1. Naturally flow from the conversation so far
2. Prioritize uncovered discovery areas
3. Match the current stage (${stage})
4. Are appropriate for the stakeholder's role (${personaId})
5. Would help uncover actionable insights

Return ONLY a JSON array of 5 question strings, no other text.`;

  try {
    const response = await openai.chat.completions.create({
      model: MODEL_NAME,
      messages: [
        { role: 'system', content: 'You are a discovery coaching expert. Generate contextual, stage-appropriate discovery questions. Return only valid JSON.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    const content = response.choices[0].message.content;
    const questions = JSON.parse(content);

    return {
      success: true,
      questions,
      stage,
      nextPriorityAreas: uncoveredAreas.slice(0, 3)
    };
  } catch (error) {
    console.error('Error generating questions:', error);
    return generateStageAwareDemoQuestions(config, track, phaseId, uncoveredAreas, stage, trackAreas);
  }
}

// Stage-aware demo questions when OpenAI is not configured
function generateStageAwareDemoQuestions(config, track, phaseId, uncoveredAreas, stage, trackAreas) {
  // Get questions from the top uncovered areas
  const questions = [];

  for (const area of uncoveredAreas.slice(0, 3)) {
    const areaConfig = trackAreas[area];
    if (areaConfig && areaConfig.questions) {
      // Pick 1-2 questions from each priority area
      questions.push(...areaConfig.questions.slice(0, 2));
    }
  }

  // If we don't have enough, add stage-specific general questions
  if (questions.length < 5) {
    const stageQuestions = {
      opening: [
        "What prompted you to take this meeting today?",
        "Can you tell me a bit about your role and responsibilities?",
        "What's top of mind for you right now?",
        "What would make this conversation valuable for you?"
      ],
      building: [
        "Can you tell me more about that?",
        "What's driving that priority?",
        "How is that impacting your team?",
        "What have you tried so far?"
      ],
      exploring: [
        "What are the biggest risks you see?",
        "Who else is affected by this?",
        "What would happen if you did nothing?",
        "What does the ideal solution look like?"
      ],
      deepening: [
        "What's the timeline for making a decision?",
        "Who else would be involved in evaluating this?",
        "What would success look like?",
        "What budget is allocated for this?"
      ],
      closing: [
        "Based on our conversation, what resonated most with you?",
        "What questions do you still have?",
        "What would the next step look like?",
        "Is there anyone else I should be talking to?"
      ]
    };

    questions.push(...(stageQuestions[stage] || stageQuestions.opening));
  }

  return {
    success: true,
    questions: questions.slice(0, 5),
    stage,
    nextPriorityAreas: uncoveredAreas.slice(0, 3),
    demo: true
  };
}

// Demo responses when OpenAI is not configured
function generateDemoResponse(messages, config) {
  const { personaId } = config;

  const responses = {
    ciso: "We've had audit findings around access management. I need to understand how this impacts our risk posture.",
    cio: "We're mid-cloud transformation. How does this fit our IT strategy without adding overhead?",
    'security-manager': "I'm always prepping for audits. How does this help with access reviews and evidence collection?",
    'it-director': "My team is stretched thin. What resources do I need and what's the implementation timeline?",
    'iam-engineer': "We have a mix of AD and cloud solutions with custom integrations. How do the connectors work?",
    'systems-architect': "I need to understand how this fits our architecture. What's the integration pattern?",
    default: "We have challenges in that area. How would your solution address our needs?"
  };

  return {
    success: true,
    message: responses[personaId] || responses.default,
    interestLevel: 5,
    discoveryProgress: 10,
    discoveredAreas: [],
    conversationEnded: false,
    demo: true
  };
}

function generateDemoOpeningMessage(config) {
  const { personaId } = config;

  const openings = {
    ciso: "Hi, CISO here. What did you want to cover?",
    cio: "Hey, I'm the CIO. How can I help?",
    'security-manager': "Hi, I manage security operations. What's this about?",
    'it-director': "Hey, IT Director here. What can I do for you?",
    'iam-engineer': "Hi, IAM engineer. What's up?",
    'systems-architect': "Hey, systems architect. What can I help with?",
    default: "Hi, thanks for meeting. How can I help?"
  };

  return {
    success: true,
    message: openings[personaId] || openings.default,
    demo: true
  };
}

// End conversation manually and generate report card
export async function endConversation(messages, config, interestLevel, discoveredAreas = []) {
  try {
    const reportCard = await generateReportCard(messages, config, interestLevel, discoveredAreas);
    return {
      success: true,
      reportCard
    };
  } catch (error) {
    console.error('Error ending conversation:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Parse challenge scorecard tags from AI response
function parseChallengeResponse(rawMessage) {
  const scorecardMatch = rawMessage.match(/\[SCORECARD\]([\s\S]*?)\[\/SCORECARD\]/);
  const feedbackMatch = rawMessage.match(/\[FEEDBACK\]([\s\S]*?)\[\/FEEDBACK\]/);
  const greatAnswersMatch = rawMessage.match(/\[GREAT_ANSWERS\]([\s\S]*?)\[\/GREAT_ANSWERS\]/);
  const missedMatch = rawMessage.match(/\[MISSED\]([\s\S]*?)\[\/MISSED\]/);
  const idealMatch = rawMessage.match(/\[IDEAL_RESPONSE\]([\s\S]*?)\[\/IDEAL_RESPONSE\]/);
  const altProofMatch = rawMessage.match(/\[ALTERNATIVE_PROOF_POINTS\]([\s\S]*?)\[\/ALTERNATIVE_PROOF_POINTS\]/);

  // Parse scorecard into key-value pairs
  const scores = {};
  if (scorecardMatch) {
    const lines = scorecardMatch[1].trim().split('\n');
    for (const line of lines) {
      const match = line.match(/(\w+):\s*(\d+)/);
      if (match) {
        scores[match[1].toLowerCase()] = parseInt(match[2], 10);
      }
    }
  }

  // Clean the conversational message (remove all tags)
  const message = rawMessage
    .replace(/\[SCORECARD\][\s\S]*?\[\/SCORECARD\]/, '')
    .replace(/\[FEEDBACK\][\s\S]*?\[\/FEEDBACK\]/, '')
    .replace(/\[GREAT_ANSWERS\][\s\S]*?\[\/GREAT_ANSWERS\]/, '')
    .replace(/\[MISSED\][\s\S]*?\[\/MISSED\]/, '')
    .replace(/\[IDEAL_RESPONSE\][\s\S]*?\[\/IDEAL_RESPONSE\]/, '')
    .replace(/\[ALTERNATIVE_PROOF_POINTS\][\s\S]*?\[\/ALTERNATIVE_PROOF_POINTS\]/, '')
    .trim();

  return {
    message,
    scores,
    feedback: feedbackMatch ? feedbackMatch[1].trim() : '',
    greatAnswers: greatAnswersMatch ? greatAnswersMatch[1].trim() : '',
    missed: missedMatch ? missedMatch[1].trim() : '',
    idealResponse: idealMatch ? idealMatch[1].trim() : '',
    alternativeProofPoints: altProofMatch ? altProofMatch[1].trim() : '',
    hasScorecard: Object.keys(scores).length > 0
  };
}

// Challenge: Technical Deep Dive (multi-turn)
export async function generateTechnicalChallenge(topic, messages) {
  if (!openai) {
    return {
      success: true,
      message: 'Demo mode: Connect to LiteLLM for real technical challenges. In a real session, an AI would play a skeptical technical persona testing your knowledge of ' + topic.topic + '.',
      scores: null,
      feedback: '',
      hasScorecard: false,
      demo: true
    };
  }

  const systemPrompt = getTechnicalDeepDivePrompt(topic);

  try {
    const response = await openai.chat.completions.create({
      model: MODEL_NAME,
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages
      ],
      temperature: 0.8,
      max_tokens: 1500
    });

    const rawMessage = response.choices[0].message.content;
    const parsed = parseChallengeResponse(rawMessage);

    return {
      success: true,
      ...parsed,
      usage: response.usage
    };
  } catch (error) {
    console.error('Technical challenge error:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Challenge: Single-turn evaluation (Architecture Lab, Briefing Room, Proof Point Match)
export async function evaluateChallenge(mode, scenario, userResponse) {
  if (!openai) {
    return {
      success: true,
      scores: { gap_identification: 7, product_mapping: 6, articulation: 7 },
      feedback: 'Demo mode: Connect to LiteLLM for real AI-powered evaluation of your responses.',
      missed: '',
      idealResponse: '',
      alternativeProofPoints: '',
      hasScorecard: true,
      demo: true
    };
  }

  let systemPrompt;
  switch (mode) {
    case 'architecture':
      systemPrompt = getArchitectureLabPrompt(scenario);
      break;
    case 'briefing':
      systemPrompt = getBriefingRoomPrompt(scenario);
      break;
    case 'proofpoint':
      systemPrompt = getProofPointMatchPrompt(scenario);
      break;
    default:
      throw new Error(`Unknown challenge mode: ${mode}`);
  }

  try {
    const response = await openai.chat.completions.create({
      model: MODEL_NAME,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userResponse }
      ],
      temperature: 0.7,
      max_tokens: 2000
    });

    const rawMessage = response.choices[0].message.content;
    const parsed = parseChallengeResponse(rawMessage);

    return {
      success: true,
      ...parsed,
      usage: response.usage
    };
  } catch (error) {
    console.error('Challenge evaluate error:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Analyze a real discovery call transcript
export async function analyzeTranscript(messages, analysisType = 'aiAgents') {
  // Discovery areas for AI Security
  const discoveryAreas = {
    aiAgents: ['ai_initiatives', 'agent_use_cases', 'mcp_tool_access', 'security_concerns', 'governance_needs', 'shadow_ai', 'current_approach', 'timeline', 'decision_process']
  };

  const areas = discoveryAreas.aiAgents;

  const analysisPrompt = `You are an expert sales coach analyzing an AI security discovery call transcript. Your job is to provide constructive feedback to help salespeople improve their discovery skills for Okta's AI security products.

Analyze this AI security discovery conversation and provide a detailed evaluation. The conversation is about AI agents, GenAI security, MCP (Model Context Protocol), token vault, and related agentic AI identity topics.

**Discovery Areas to Evaluate:**
${areas.map(area => `- ${area.replace(/_/g, ' ')}`).join('\n')}

**IMPORTANT: Respond ONLY with valid JSON in this exact format (no markdown, no code blocks, just raw JSON):**
{
  "score": <number 0-100>,
  "grade": "<A/B/C/D/F>",
  "summary": "<2-3 sentence overall assessment>",
  "discoveredAreas": [<array of area IDs that were adequately explored>],
  "talkRatio": {
    "salesperson": <percentage 0-100>,
    "prospect": <percentage 0-100>,
    "verdict": "<excellent/good/needs_work/poor>"
  },
  "questionAnalysis": {
    "totalQuestions": <number>,
    "openEndedPercent": <number 0-100>,
    "followUpPercent": <number 0-100>,
    "bestQuestions": [<up to 3 best questions asked>]
  },
  "strengths": [<3-5 specific things done well>],
  "improvements": [<3-5 specific areas to improve>],
  "recommendations": [<3-5 actionable recommendations for next time>]
}

**Scoring Guidelines:**
- A (90-100): Exceptional discovery - covered most areas deeply, excellent questions, ideal talk ratio
- B (80-89): Good discovery - covered key areas, good questions, reasonable talk ratio
- C (70-79): Adequate discovery - covered some areas, mix of good/poor questions
- D (60-69): Weak discovery - missed key areas, too many closed questions, poor talk ratio
- F (<60): Poor discovery - significant issues with technique or coverage

**Talk Ratio Guidelines:**
- Ideal: 30-40% salesperson, 60-70% prospect
- Good: Within 10% of ideal
- Needs work: Within 20% of ideal
- Poor: More than 20% off ideal

Analyze the following conversation where "user" is the salesperson and "assistant" is the prospect:`;

  // If OpenAI is not configured, return demo analysis
  if (!openai) {
    return generateDemoAnalysis(messages, analysisType, areas);
  }

  try {
    const response = await openai.chat.completions.create({
      model: MODEL_NAME,
      messages: [
        { role: 'system', content: analysisPrompt },
        ...messages.map(m => ({
          role: m.role,
          content: `[${m.role === 'user' ? 'Salesperson' : 'Prospect'}]: ${m.content}`
        }))
      ],
      temperature: 0.3,
      max_tokens: 1500
    });

    const rawResponse = response.choices[0].message.content;

    // Parse JSON from response
    try {
      // Try to extract JSON from the response (handle potential markdown wrapping)
      let jsonStr = rawResponse;
      const jsonMatch = rawResponse.match(/```(?:json)?\s*([\s\S]*?)```/);
      if (jsonMatch) {
        jsonStr = jsonMatch[1];
      }

      const result = JSON.parse(jsonStr.trim());
      return {
        success: true,
        ...result
      };
    } catch (parseError) {
      console.error('Failed to parse analysis response:', parseError, rawResponse);
      return {
        success: false,
        error: 'Failed to parse analysis response'
      };
    }
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Generate demo analysis when OpenAI is not configured
function generateDemoAnalysis(messages, analysisType, areas) {
  // Calculate basic stats from messages
  const sellerMessages = messages.filter(m => m.role === 'user');
  const prospectMessages = messages.filter(m => m.role === 'assistant');

  const sellerChars = sellerMessages.reduce((sum, m) => sum + m.content.length, 0);
  const prospectChars = prospectMessages.reduce((sum, m) => sum + m.content.length, 0);
  const totalChars = sellerChars + prospectChars;

  const sellerPercent = totalChars > 0 ? Math.round((sellerChars / totalChars) * 100) : 50;
  const prospectPercent = 100 - sellerPercent;

  // Count questions
  const questionCount = sellerMessages.reduce((count, m) => {
    return count + (m.content.match(/\?/g) || []).length;
  }, 0);

  // Generate demo response
  return {
    success: true,
    score: 72,
    grade: 'C',
    summary: 'This is a demo analysis. Connect to OpenAI/LiteLLM to get real AI-powered feedback on your discovery calls.',
    discoveredAreas: areas.slice(0, 3),
    talkRatio: {
      salesperson: sellerPercent,
      prospect: prospectPercent,
      verdict: prospectPercent >= 60 ? 'good' : 'needs_work'
    },
    questionAnalysis: {
      totalQuestions: questionCount,
      openEndedPercent: 60,
      followUpPercent: 30,
      bestQuestions: ['Example question from your transcript']
    },
    strengths: [
      'Connected API for personalized feedback',
      'Established rapport at the start',
      'Showed genuine curiosity'
    ],
    improvements: [
      'Could dig deeper on pain points',
      'Ask more follow-up questions',
      'Explore budget and timeline earlier'
    ],
    recommendations: [
      'Practice the "tell me more" technique',
      'Use the 3-second pause to encourage elaboration',
      'Connect challenges to business outcomes'
    ],
    demo: true
  };
}
