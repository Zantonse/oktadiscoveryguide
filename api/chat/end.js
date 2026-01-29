import OpenAI from 'openai';
import { getIndustryContext } from '../../prompts/industries.js';
import { getPersonaContext } from '../../prompts/personas.js';

const MODEL_NAME = process.env.OPENAI_MODEL || 'gpt-5.2';

// Discovery area dependencies for flow analysis
const discoveryDependencies = {
  aiAgents: {
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

// Golden question patterns
const goldenQuestionPatterns = {
  aiAgents: [
    { pattern: /what keeps you up at night.*(ai|agent|security)/i, unlocks: ['security_concerns', 'governance_needs'], bonus: 2 },
    { pattern: /shadow.*(ai|agent)|ungoverned|unauthorized.*(ai|agent)/i, unlocks: ['shadow_ai', 'governance_needs'], bonus: 2 },
    { pattern: /what would happen if.*(agent|ai).*(unauthorized|wrong|breach)/i, unlocks: ['security_concerns', 'governance_needs'], bonus: 2 },
    { pattern: /who.*(own|decide|responsible).*(ai|agent).*(security|governance)/i, unlocks: ['decision_process', 'governance_needs'], bonus: 1 },
    { pattern: /credential.*(manage|store|rotate).*(agent|ai)/i, unlocks: ['security_concerns', 'current_approach', 'mcp_tool_access'], bonus: 2 },
    { pattern: /mcp|model context protocol/i, unlocks: ['mcp_tool_access'], bonus: 1 }
  ],
  sales: [
    { pattern: /what keeps you up at night.*(access|identity|governance)/i, unlocks: ['pain_points', 'business_impact'], bonus: 2 },
    { pattern: /what.*(cost|impact).*(current|problem|challenge)/i, unlocks: ['business_impact', 'pain_points'], bonus: 2 },
    { pattern: /audit.*(finding|fail|gap)/i, unlocks: ['pain_points', 'business_impact', 'compliance'], bonus: 2 },
    { pattern: /who.*(decide|approve|sign.*off)/i, unlocks: ['decision_process'], bonus: 1 }
  ],
  technical: [
    { pattern: /walk.*through.*(architecture|current|environment)/i, unlocks: ['architecture'], bonus: 1 },
    { pattern: /what.*(break|fail|challenge).*(current|today)/i, unlocks: ['pain_points', 'architecture'], bonus: 2 },
    { pattern: /integration.*(challenge|pain|difficult)/i, unlocks: ['integrations', 'pain_points'], bonus: 2 }
  ]
};

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

function checkGoldenQuestion(question, track) {
  const patterns = goldenQuestionPatterns[track] || [];
  for (const { pattern, unlocks, bonus } of patterns) {
    if (pattern.test(question)) {
      return { isGolden: true, unlocks, bonus };
    }
  }
  return { isGolden: false, unlocks: [], bonus: 0 };
}

function analyzeDiscoveryFlow(discoveredAreas, track) {
  const deps = discoveryDependencies[track] || {};
  let flowScore = 100;
  const flowIssues = [];
  const goodTransitions = [];

  for (let i = 1; i < discoveredAreas.length; i++) {
    const currentArea = discoveredAreas[i];
    const previousAreas = discoveredAreas.slice(0, i);
    const requiredDeps = deps[currentArea] || [];

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

async function generateReportCard(openai, messages, config, finalInterestLevel, discoveredAreas = []) {
  const { track, personaId } = config;

  const userMessages = messages.filter(m => m.role === 'user').map(m => m.content);
  const flowAnalysis = analyzeDiscoveryFlow(discoveredAreas, track);

  const goldenQuestions = [];
  let goldenQuestionBonus = 0;
  for (const msg of userMessages) {
    const result = checkGoldenQuestion(msg, track);
    if (result.isGolden) {
      goldenQuestions.push({ question: msg.slice(0, 100), bonus: result.bonus });
      goldenQuestionBonus += result.bonus;
    }
  }

  const totalAreas = Object.keys(discoveryDependencies[track] || {}).length + 1;
  const coveragePercent = Math.round((discoveredAreas.length / Math.max(totalAreas, 7)) * 100);

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

  const reportPrompt = `You are a sales training evaluator. Analyze this discovery conversation and provide a detailed report card.

Conversation with: ${personaId} (${track} track)
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

Be specific and actionable in your feedback. Reference actual things they said.`;

  try {
    const response = await openai.chat.completions.create({
      model: MODEL_NAME,
      messages: [{ role: 'user', content: reportPrompt }],
      temperature: 0.7,
      max_tokens: 700
    });

    const content = response.choices[0].message.content;
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const reportCard = JSON.parse(jsonMatch[0]);
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

  const { messages, config, interestLevel, discoveredAreas = [] } = req.body;

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

  try {
    const reportCard = await generateReportCard(openai, messages, config, interestLevel || 5, discoveredAreas);
    return res.json({
      success: true,
      reportCard
    });
  } catch (error) {
    console.error('End conversation error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to end conversation'
    });
  }
}
