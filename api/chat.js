import OpenAI from 'openai';
import { getIndustryContext } from '../prompts/industries.js';
import { getPersonaContext } from '../prompts/personas.js';
import { getPhasePrompt, buildSystemPrompt } from '../prompts/systemPrompt.js';

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

// Parse interest level, progress, discovered areas from response
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

function getOpenAIClient() {
  if (!process.env.OPENAI_API_KEY) {
    return null;
  }

  const config = { apiKey: process.env.OPENAI_API_KEY };
  if (process.env.OPENAI_API_BASE) {
    config.baseURL = process.env.OPENAI_API_BASE;
  }

  return new OpenAI(config);
}

function generateDemoResponse(messages, config) {
  const lastMessage = messages[messages.length - 1]?.content || '';
  const { personaId } = config;

  const responses = {
    ciso: "That's an interesting question. From a security leadership perspective, I'm primarily concerned about reducing our attack surface and demonstrating compliance to the board. We've had some audit findings related to access management that I need to address. What I really need to understand is how this would impact our overall risk posture and what kind of visibility I'd have into access across the organization.",
    cio: "I appreciate you asking about that. We're in the middle of a major cloud transformation, and identity is definitely a piece of that puzzle. My concern is making sure any new solution fits with our broader IT strategy and doesn't create more operational overhead for my teams. How does this integrate with our existing ServiceNow environment?",
    'iam-engineer': "Let me dig into the technical details here. We're currently running a mix of on-prem AD and some cloud-based solutions. The challenge is that we have a lot of custom integrations that have been built over the years. What I need to understand is how the connector architecture works and whether we can extend it for our home-grown applications.",
    default: "That's a good question. Let me think about how that applies to our situation. We definitely have challenges in that area, but I'd want to understand more about how the solution actually works before I can tell you if it would address our needs."
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

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const { messages, config } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({
      success: false,
      error: 'Messages array is required'
    });
  }

  if (!config || !config.industryId || !config.personaId || !config.track || !config.phaseId) {
    return res.status(400).json({
      success: false,
      error: 'Config with industryId, personaId, track, and phaseId is required'
    });
  }

  const openai = getOpenAIClient();

  // Return demo response if no API key
  if (!openai) {
    return res.json(generateDemoResponse(messages, config));
  }

  const { industryId, personaId, track, phaseId } = config;

  const industryContext = getIndustryContext(industryId);
  const personaContext = getPersonaContext(personaId);
  const phaseContext = getPhasePrompt(track, phaseId);

  const systemPrompt = buildSystemPrompt(
    industryContext,
    personaContext,
    track,
    phaseContext
  );

  try {
    const response = await openai.chat.completions.create({
      model: MODEL_NAME,
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages
      ],
      temperature: 0.8,
      max_tokens: 1000,
      presence_penalty: 0.1,
      frequency_penalty: 0.1
    });

    const rawMessage = response.choices[0].message.content;
    const { message, interestLevel, discoveryProgress, discoveredAreas, conversationEnded } = parseInterestLevel(rawMessage);

    // Generate product hints based on discovered areas
    const productHints = getProductHints(discoveredAreas);

    return res.json({
      success: true,
      message,
      interestLevel,
      discoveryProgress,
      discoveredAreas,
      conversationEnded,
      productHints,
      usage: response.usage
    });
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return res.json(generateDemoResponse(messages, config));
  }
}
