import OpenAI from 'openai';
import { getTechnicalDeepDivePrompt } from '../../prompts/challengePrompts.js';
import { technicalTopics } from '../../client/src/data/challenges.js';

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
  const greatAnswersMatch = rawMessage.match(/\[GREAT_ANSWERS\]([\s\S]*?)\[\/GREAT_ANSWERS\]/);

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
    .trim();

  return {
    message,
    scores,
    feedback: feedbackMatch ? feedbackMatch[1].trim() : '',
    greatAnswers: greatAnswersMatch ? greatAnswersMatch[1].trim() : '',
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

  const { topicId, messages } = req.body;

  if (!topicId || !messages || !Array.isArray(messages)) {
    return res.status(400).json({
      success: false,
      error: 'topicId and messages array are required'
    });
  }

  const topic = technicalTopics.find(t => t.id === topicId);
  if (!topic) {
    return res.status(404).json({
      success: false,
      error: 'Topic not found'
    });
  }

  const openai = getOpenAIClient();

  if (!openai) {
    return res.json({
      success: true,
      message: 'Demo mode: Connect to LiteLLM for real technical challenges. In a real session, an AI would play a skeptical technical persona testing your knowledge of ' + topic.topic + '.',
      scores: null,
      feedback: '',
      hasScorecard: false,
      demo: true
    });
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

    return res.json({
      success: true,
      ...parsed,
      usage: response.usage
    });
  } catch (error) {
    console.error('Technical challenge error:', error);
    return res.json({
      success: true,
      message: 'Demo mode: Technical challenge temporarily unavailable.',
      scores: null,
      feedback: '',
      hasScorecard: false,
      demo: true
    });
  }
}
