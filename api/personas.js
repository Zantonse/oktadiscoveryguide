import { getAllPersonas } from '../prompts/personas.js';

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
}
