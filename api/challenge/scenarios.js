import {
  technicalTopics,
  architectureScenarios,
  briefingPrompts,
  proofPointScenarios
} from '../../client/src/data/challenges.js';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  // Get mode from query parameter
  const mode = req.query.mode || (req.body && req.body.mode);

  if (!mode) {
    return res.status(400).json({
      success: false,
      error: 'mode query parameter is required'
    });
  }

  const scenarioMap = {
    technical: technicalTopics,
    architecture: architectureScenarios,
    briefing: briefingPrompts,
    proofpoint: proofPointScenarios
  };

  const scenarios = scenarioMap[mode];
  if (!scenarios) {
    return res.status(404).json({
      success: false,
      error: 'Unknown challenge mode. Use: technical, architecture, briefing, proofpoint'
    });
  }

  return res.json({ success: true, mode, scenarios });
}
