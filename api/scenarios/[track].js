import { scenarios } from '../../prompts/scenarios.js';

export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const { track } = req.query;
  const trackScenarios = scenarios[track];

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

  return res.json({
    success: true,
    track,
    scenarios: scenarioList
  });
}
