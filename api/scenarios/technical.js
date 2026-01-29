import { scenarios } from '../../prompts/scenarios.js';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const trackScenarios = scenarios.technical || [];

  const scenarioList = trackScenarios.map(({ id, name, shortName, icon, description }) => ({
    id,
    name,
    shortName,
    icon,
    description
  }));

  return res.json({
    success: true,
    track: 'technical',
    scenarios: scenarioList
  });
}
