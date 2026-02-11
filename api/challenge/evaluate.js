import OpenAI from 'openai';
import { getArchitectureLabPrompt, getBriefingRoomPrompt, getProofPointMatchPrompt } from '../../prompts/challengePrompts.js';

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

function parseChallengeResponse(rawMessage) {
  const scorecardMatch = rawMessage.match(/\[SCORECARD\]([\s\S]*?)\[\/SCORECARD\]/);
  const feedbackMatch = rawMessage.match(/\[FEEDBACK\]([\s\S]*?)\[\/FEEDBACK\]/);
  const missedMatch = rawMessage.match(/\[MISSED\]([\s\S]*?)\[\/MISSED\]/);
  const idealMatch = rawMessage.match(/\[IDEAL_RESPONSE\]([\s\S]*?)\[\/IDEAL_RESPONSE\]/);
  const altProofMatch = rawMessage.match(/\[ALTERNATIVE_PROOF_POINTS\]([\s\S]*?)\[\/ALTERNATIVE_PROOF_POINTS\]/);

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

  return {
    scores,
    feedback: feedbackMatch ? feedbackMatch[1].trim() : '',
    missed: missedMatch ? missedMatch[1].trim() : '',
    idealResponse: idealMatch ? idealMatch[1].trim() : '',
    alternativeProofPoints: altProofMatch ? altProofMatch[1].trim() : '',
    hasScorecard: Object.keys(scores).length > 0
  };
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const { mode, scenario, response: userResponse } = req.body;

  if (!mode || !scenario || !userResponse) {
    return res.status(400).json({
      success: false,
      error: 'mode, scenario, and response are required'
    });
  }

  const openai = getOpenAIClient();

  if (!openai) {
    return res.json({
      success: true,
      scores: { gap_identification: 7, product_mapping: 6, articulation: 7 },
      feedback: 'Demo mode: Connect to LiteLLM for real AI-powered evaluation.',
      missed: '',
      idealResponse: '',
      alternativeProofPoints: '',
      hasScorecard: true,
      demo: true
    });
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
      return res.status(400).json({ success: false, error: 'Invalid mode' });
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

    const parsed = parseChallengeResponse(response.choices[0].message.content);
    return res.json({ success: true, ...parsed, usage: response.usage });
  } catch (error) {
    console.error('Challenge evaluate error:', error);
    return res.json({
      success: true,
      scores: { gap_identification: 7, product_mapping: 6, articulation: 7 },
      feedback: 'Evaluation temporarily unavailable. Please try again.',
      missed: '',
      idealResponse: '',
      alternativeProofPoints: '',
      hasScorecard: true,
      demo: true
    });
  }
}
