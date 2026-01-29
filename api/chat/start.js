import OpenAI from 'openai';
import { getIndustryContext } from '../../prompts/industries.js';
import { getPersonaContext } from '../../prompts/personas.js';
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

function generateDemoOpeningMessage(config) {
  const { personaId } = config;

  const openings = {
    ciso: "Thanks for coming in today. I'm the CISO here, and I've got about 30 minutes before my next meeting. I agreed to take this call because we've been getting some pressure from the board about our access management practices. Let's see what you've got.",
    cio: "Good to meet you. As CIO, I'm always interested in solutions that can help us modernize our IT operations. We're going through a significant transformation right now, so timing could be good if this makes sense for us.",
    'it-director': "Hi there. I manage our IT operations team, and identity management has been on my radar for a while. We're definitely feeling some pain in this area, so I'm curious to hear what you're proposing.",
    'security-manager': "Thanks for setting this up. I handle our security operations and compliance activities. We just wrapped up an audit that had some findings related to access controls, so this topic is very relevant right now.",
    'iam-engineer': "Hey, thanks for the meeting. I'm the one who has to actually implement and maintain whatever we end up using, so I've got a lot of technical questions. Let's dive in.",
    default: "Thanks for taking the time to meet. I've heard a bit about what you do, but I'm interested in understanding how it might apply to our specific situation here."
  };

  return {
    success: true,
    message: openings[personaId] || openings.default,
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

  const { config } = req.body;

  if (!config || !config.industryId || !config.personaId || !config.track || !config.phaseId) {
    return res.status(400).json({
      success: false,
      error: 'Config with industryId, personaId, track, and phaseId is required'
    });
  }

  const openai = getOpenAIClient();

  // Return demo response if no API key
  if (!openai) {
    return res.json(generateDemoOpeningMessage(config));
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

  const openingPrompt = `Generate a realistic opening statement for this stakeholder at the start of a discovery meeting.

The stakeholder should:
- Briefly introduce themselves and their role
- Set the tone for the conversation (busy but willing to engage)
- Perhaps mention why they agreed to take this meeting
- Keep it to 2-3 sentences

This is the first message in the conversation.`;

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

    return res.json({
      success: true,
      message: response.choices[0].message.content
    });
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return res.json(generateDemoOpeningMessage(config));
  }
}
