import OpenAI from 'openai';

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

// Discovery areas for AI Security
const discoveryAreas = {
  aiAgents: ['ai_initiatives', 'agent_use_cases', 'mcp_tool_access', 'security_concerns', 'governance_needs', 'shadow_ai', 'current_approach', 'timeline', 'decision_process']
};

function generateDemoAnalysis(messages) {
  const areas = discoveryAreas.aiAgents;

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

  return {
    success: true,
    score: 72,
    grade: 'C',
    summary: 'This is a demo analysis. Connect to OpenAI/LiteLLM to get real AI-powered feedback on your AI security discovery calls.',
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
      'Connect API for personalized feedback',
      'Established rapport at the start',
      'Showed genuine curiosity about AI initiatives'
    ],
    improvements: [
      'Could dig deeper on security concerns',
      'Ask more follow-up questions about MCP usage',
      'Explore governance needs earlier'
    ],
    recommendations: [
      'Ask about specific agent use cases',
      'Explore how they handle agent credentials today',
      'Understand their shadow AI visibility'
    ],
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

  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({
      success: false,
      error: 'Messages array is required'
    });
  }

  if (messages.length === 0) {
    return res.status(400).json({
      success: false,
      error: 'Messages array cannot be empty'
    });
  }

  const openai = getOpenAIClient();

  // Return demo response if no API key
  if (!openai) {
    return res.json(generateDemoAnalysis(messages));
  }

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
      return res.json({
        success: true,
        ...result
      });
    } catch (parseError) {
      console.error('Failed to parse analysis response:', parseError, rawResponse);
      return res.json(generateDemoAnalysis(messages));
    }
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return res.json(generateDemoAnalysis(messages));
  }
}
