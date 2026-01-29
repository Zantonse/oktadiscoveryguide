import OpenAI from 'openai';
import { getIndustryContext } from '../prompts/industries.js';
import { getPersonaContext } from '../prompts/personas.js';
import { getPhasePrompt } from '../prompts/systemPrompt.js';

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

function generateDemoSuggestedQuestions(config, track, phaseId) {
  const questions = {
    sales: {
      'initial-discovery': [
        "What prompted you to take this meeting today?",
        "Can you tell me about your current approach to managing user access?",
        "What are the biggest challenges you're facing with identity and access management?",
        "How is your organization handling access reviews today?",
        "What would success look like for you in this area?"
      ],
      'qualification': [
        "Is there budget allocated for an initiative like this?",
        "Who else would be involved in evaluating a solution?",
        "What's your timeline for making a decision?",
        "Are you looking at other solutions as well?",
        "What would need to happen to make this a priority?"
      ],
      'solution-mapping': [
        "What specific use cases are most important to address first?",
        "What systems would need to integrate with an IGA solution?",
        "Are there any deal-breakers or must-have features?",
        "How do you handle access requests today?",
        "What's your current access certification process?"
      ],
      'roi-value': [
        "How much time does your team spend on access-related tasks?",
        "What's the cost of an access-related audit finding?",
        "How do you currently measure the effectiveness of access controls?",
        "What would efficiency gains in this area mean for your team?",
        "How would you present the value of this to leadership?"
      ]
    },
    technical: {
      'current-state': [
        "What IAM solutions are you currently using?",
        "How are identities provisioned and deprovisioned today?",
        "What directory services are in your environment?",
        "How do you handle access to cloud applications?",
        "What's working well with your current setup?"
      ],
      'requirements': [
        "What are your must-have technical requirements?",
        "What compliance frameworks do you need to support?",
        "What are your scalability and performance requirements?",
        "What level of customization do you typically need?",
        "How important is API access for automation?"
      ],
      'pain-points': [
        "What's the most painful part of your current access management process?",
        "Can you give me an example of a recent access-related incident?",
        "Where are the biggest gaps in your current capabilities?",
        "What manual processes are causing the most friction?",
        "What keeps you up at night regarding identity and access?"
      ],
      'use-cases': [
        "What's your highest priority use case to address?",
        "How do you handle joiner-mover-leaver processes today?",
        "What does your access certification process look like?",
        "Do you have segregation of duties requirements?",
        "How do you manage contractor and third-party access?"
      ],
      'architecture': [
        "How do you see this fitting into your overall architecture?",
        "What's your preferred integration pattern?",
        "What's a realistic timeline for implementation?",
        "What internal resources would be available for the project?",
        "How would you want to phase the rollout?"
      ]
    }
  };

  return {
    success: true,
    questions: questions[track]?.[phaseId] || questions.sales['initial-discovery'],
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

  const { config, conversationHistory = [] } = req.body;

  if (!config || !config.industryId || !config.personaId || !config.track || !config.phaseId) {
    return res.status(400).json({
      success: false,
      error: 'Config with industryId, personaId, track, and phaseId is required'
    });
  }

  const { industryId, personaId, track, phaseId } = config;
  const openai = getOpenAIClient();

  // Return demo response if no API key
  if (!openai) {
    return res.json(generateDemoSuggestedQuestions(config, track, phaseId));
  }

  const industryContext = getIndustryContext(industryId);
  const personaContext = getPersonaContext(personaId);
  const phaseContext = getPhasePrompt(track, phaseId);

  const prompt = `Based on the current conversation context and discovery phase, suggest 5 relevant questions that a solutions consultant should ask this stakeholder.

Industry: ${industryId}
Persona: ${personaId}
Track: ${track}
Phase: ${phaseId}

Recent conversation:
${conversationHistory.slice(-4).map(m => `${m.role}: ${m.content}`).join('\n')}

Generate 5 questions that:
1. Are appropriate for this discovery phase
2. Are relevant to this stakeholder's role and concerns
3. Would help uncover valuable information
4. Build on what's been discussed

Return ONLY a JSON array of 5 question strings, no other text.`;

  try {
    const response = await openai.chat.completions.create({
      model: MODEL_NAME,
      messages: [
        { role: 'system', content: 'You are a helpful assistant that generates discovery questions. Return only valid JSON.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    const content = response.choices[0].message.content;
    const questions = JSON.parse(content);

    return res.json({
      success: true,
      questions
    });
  } catch (error) {
    console.error('Error generating questions:', error);
    return res.json(generateDemoSuggestedQuestions(config, track, phaseId));
  }
}
