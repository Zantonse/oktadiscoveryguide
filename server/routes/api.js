import express from 'express';
import { industries, getIndustryById } from '../prompts/industries.js';
import { personas, getAllPersonas, getPersonaById } from '../prompts/personas.js';
import { scenarios, getScenariosByTrack, getScenario } from '../prompts/scenarios.js';
import { generateResponse, generateResponseStream, generateOpeningMessage, generateSuggestedQuestions, endConversation, analyzeTranscript } from '../services/openai.js';

const router = express.Router();

// Discovery phases data
const phases = {
  sales: [
    {
      id: 'initial-discovery',
      name: 'Initial Discovery',
      description: 'Understanding current state and challenges',
      order: 1
    },
    {
      id: 'qualification',
      name: 'Qualification',
      description: 'Identifying budget, authority, need, timeline',
      order: 2
    },
    {
      id: 'solution-mapping',
      name: 'Solution Mapping',
      description: 'Aligning Okta IGA capabilities to needs',
      order: 3
    },
    {
      id: 'roi-value',
      name: 'ROI & Value',
      description: 'Building business case and demonstrating value',
      order: 4
    }
  ],
  technical: [
    {
      id: 'current-state',
      name: 'Current State Assessment',
      description: 'Existing IAM landscape review',
      order: 1
    },
    {
      id: 'requirements',
      name: 'Requirements Gathering',
      description: 'Technical and business requirements',
      order: 2
    },
    {
      id: 'pain-points',
      name: 'Pain Points Analysis',
      description: 'Identifying gaps and challenges',
      order: 3
    },
    {
      id: 'use-cases',
      name: 'Use Case Definition',
      description: 'Specific IGA scenarios to address',
      order: 4
    },
    {
      id: 'architecture',
      name: 'Architecture & Roadmap',
      description: 'Technical design and phasing',
      order: 5
    }
  ]
};

// GET /api/industries - Return list of industries
router.get('/industries', (req, res) => {
  const industryList = industries.map(({ id, name, icon, sector, description }) => ({
    id,
    name,
    icon,
    sector,
    description
  }));

  res.json({
    success: true,
    industries: industryList
  });
});

// GET /api/industries/:id - Return specific industry details
router.get('/industries/:id', (req, res) => {
  const industry = getIndustryById(req.params.id);

  if (!industry) {
    return res.status(404).json({
      success: false,
      error: 'Industry not found'
    });
  }

  res.json({
    success: true,
    industry
  });
});

// GET /api/personas - Return list of stakeholder personas
router.get('/personas', (req, res) => {
  const allPersonas = getAllPersonas();

  // Return personas without full context (for listing)
  const personaList = {};
  for (const [level, list] of Object.entries(allPersonas)) {
    personaList[level] = list.map(({ id, title, fullTitle, level, description, avatar }) => ({
      id,
      title,
      fullTitle,
      level,
      description,
      avatar
    }));
  }

  res.json({
    success: true,
    personas: personaList
  });
});

// GET /api/personas/:id - Return specific persona details
router.get('/personas/:id', (req, res) => {
  const persona = getPersonaById(req.params.id);

  if (!persona) {
    return res.status(404).json({
      success: false,
      error: 'Persona not found'
    });
  }

  res.json({
    success: true,
    persona
  });
});

// GET /api/phases - Return discovery phases for both tracks
router.get('/phases', (req, res) => {
  res.json({
    success: true,
    phases
  });
});

// GET /api/phases/:track - Return phases for specific track
router.get('/phases/:track', (req, res) => {
  const track = req.params.track;

  if (!phases[track]) {
    return res.status(404).json({
      success: false,
      error: 'Track not found. Use "sales" or "technical"'
    });
  }

  res.json({
    success: true,
    track,
    phases: phases[track]
  });
});

// GET /api/scenarios - Return all scenarios grouped by track
router.get('/scenarios', (req, res) => {
  res.json({
    success: true,
    scenarios
  });
});

// GET /api/scenarios/:track - Return scenarios for specific track
router.get('/scenarios/:track', (req, res) => {
  const track = req.params.track;
  const trackScenarios = getScenariosByTrack(track);

  if (!trackScenarios || trackScenarios.length === 0) {
    return res.status(404).json({
      success: false,
      error: 'No scenarios found for track. Use "sales", "technical", or "aiAgents"'
    });
  }

  // Return scenarios without full context for listing
  const scenarioList = trackScenarios.map(({ id, name, shortName, icon, description }) => ({
    id,
    name,
    shortName,
    icon,
    description
  }));

  res.json({
    success: true,
    track,
    scenarios: scenarioList
  });
});

// GET /api/scenarios/:track/:id - Return specific scenario details
router.get('/scenarios/:track/:id', (req, res) => {
  const { track, id } = req.params;
  const scenario = getScenario(track, id);

  if (!scenario) {
    return res.status(404).json({
      success: false,
      error: 'Scenario not found'
    });
  }

  res.json({
    success: true,
    scenario
  });
});

// POST /api/chat - Send message and get AI response
router.post('/chat', async (req, res) => {
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

  try {
    const response = await generateResponse(messages, config);
    res.json(response);
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate response'
    });
  }
});

// POST /api/chat/stream - Send message and get streaming AI response
router.post('/chat/stream', async (req, res) => {
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

  // Set up SSE headers
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  try {
    const stream = generateResponseStream(messages, config);

    for await (const chunk of stream) {
      res.write(`data: ${JSON.stringify(chunk)}\n\n`);
    }

    res.end();
  } catch (error) {
    console.error('Stream error:', error);
    res.write(`data: ${JSON.stringify({ type: 'error', error: 'Stream failed' })}\n\n`);
    res.end();
  }
});

// POST /api/chat/start - Start a new conversation and get opening message
router.post('/chat/start', async (req, res) => {
  const { config } = req.body;

  if (!config || !config.industryId || !config.personaId || !config.track || !config.phaseId) {
    return res.status(400).json({
      success: false,
      error: 'Config with industryId, personaId, track, and phaseId is required'
    });
  }

  try {
    const response = await generateOpeningMessage(config);
    res.json(response);
  } catch (error) {
    console.error('Chat start error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate opening message'
    });
  }
});

// POST /api/suggestions - Get suggested questions based on context
router.post('/suggestions', async (req, res) => {
  const { config, conversationHistory = [], discoveredAreas = [], discoveryProgress = 0 } = req.body;

  if (!config || !config.industryId || !config.personaId || !config.track || !config.phaseId) {
    return res.status(400).json({
      success: false,
      error: 'Config with industryId, personaId, track, and phaseId is required'
    });
  }

  try {
    const response = await generateSuggestedQuestions(config, conversationHistory, discoveredAreas, discoveryProgress);
    res.json(response);
  } catch (error) {
    console.error('Suggestions error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate suggestions'
    });
  }
});

// POST /api/chat/end - Manually end conversation and get report card
router.post('/chat/end', async (req, res) => {
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

  try {
    const response = await endConversation(messages, config, interestLevel || 5, discoveredAreas);
    res.json(response);
  } catch (error) {
    console.error('End conversation error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to end conversation'
    });
  }
});

// POST /api/analyze-transcript - Analyze a discovery call transcript
router.post('/analyze-transcript', async (req, res) => {
  const { messages, analysisType = 'sales' } = req.body;

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

  if (!['sales', 'technical'].includes(analysisType)) {
    return res.status(400).json({
      success: false,
      error: 'analysisType must be "sales" or "technical"'
    });
  }

  try {
    const response = await analyzeTranscript(messages, analysisType);
    if (!response.success) {
      return res.status(500).json(response);
    }
    res.json(response);
  } catch (error) {
    console.error('Analyze transcript error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to analyze transcript'
    });
  }
});

// GET /api/health - Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    success: true,
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

export default router;
