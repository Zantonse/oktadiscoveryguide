import OpenAI from 'openai';
import { getIndustryContext } from '../../prompts/industries.js';
import { getPersonaContext } from '../../prompts/personas.js';
import { getScenarioContext } from '../../prompts/scenarios.js';
import { getPhasePrompt, buildSystemPrompt } from '../../prompts/systemPrompt.js';

const MODEL_NAME = process.env.OPENAI_MODEL || 'gpt-5.2';

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
    message: responses[personaId] || responses.default,
    interestLevel: 5,
    discoveryProgress: 10,
    discoveredAreas: [],
    conversationEnded: false
  };
}

function getDefaultCoachingHint(track, phaseId) {
  const hints = {
    sales: {
      'initial-discovery': "Ask open-ended questions to understand their current challenges.",
      'qualification': "Explore budget, timeline, and decision-making process conversationally.",
      'solution-mapping': "Connect their pain points to Okta capabilities using their language.",
      'roi-value': "Help them quantify the cost of their current problems."
    },
    technical: {
      'current-state': "Map out their current architecture and pain points.",
      'requirements': "Distinguish must-haves from nice-to-haves.",
      'pain-points': "Get specific examples and quantify impact.",
      'use-cases': "Prioritize use cases and understand dependencies.",
      'architecture': "Discuss implementation approach and timeline."
    },
    aiAgents: {
      'ai-discovery': "Explore their AI initiatives and agent use cases."
    }
  };

  return hints[track]?.[phaseId] || "Listen actively and ask follow-up questions.";
}

async function generateCoachingHint(openai, lastResponse, config) {
  const { track, phaseId, personaId } = config;

  if (!openai) {
    return getDefaultCoachingHint(track, phaseId);
  }

  const coachingPrompt = `Sales coach for Okta IGA discovery practice.

Stakeholder (${personaId}) just said: "${lastResponse.slice(0, 300)}"

Give ONE punchy coaching tip (max 15 words). Focus on the single most important next move.

Format: Direct action, no fluff. Start with a verb.

Good examples:
- "Probe the audit finding - ask what specific gaps were cited."
- "They're guarded on budget. Shift to understanding priorities first."
- "Good opening - ask what's broken in their current process."`;

  try {
    const response = await openai.chat.completions.create({
      model: MODEL_NAME,
      messages: [{ role: 'user', content: coachingPrompt }],
      temperature: 0.7,
      max_tokens: 60
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error generating coaching hint:', error);
    return getDefaultCoachingHint(track, phaseId);
  }
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
    const demo = generateDemoResponse(messages, config);
    const coachingHint = getDefaultCoachingHint(config.track, config.phaseId);
    return res.json({
      success: true,
      message: demo.message,
      interestLevel: demo.interestLevel,
      discoveryProgress: demo.discoveryProgress,
      discoveredAreas: demo.discoveredAreas,
      conversationEnded: demo.conversationEnded,
      coachingHint,
      nonStreaming: true,
      demo: true
    });
  }

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

  if (scenarioContext) {
    systemPrompt += `\n\n${scenarioContext}`;
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
    const { message, interestLevel, discoveryProgress, discoveredAreas, conversationEnded } = parseInterestLevel(rawMessage);

    const coachingHint = await generateCoachingHint(openai, message, config);

    return res.json({
      success: true,
      message,
      interestLevel,
      discoveryProgress,
      discoveredAreas,
      conversationEnded,
      coachingHint,
      nonStreaming: true,
      usage: response.usage
    });
  } catch (error) {
    console.error('OpenAI API Error:', error);
    const demo = generateDemoResponse(messages, config);
    return res.json({
      success: true,
      message: demo.message,
      interestLevel: demo.interestLevel,
      discoveryProgress: demo.discoveryProgress,
      discoveredAreas: demo.discoveredAreas,
      conversationEnded: demo.conversationEnded,
      coachingHint: getDefaultCoachingHint(config.track, config.phaseId),
      nonStreaming: true,
      demo: true
    });
  }
}
