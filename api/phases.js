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

  res.json({
    success: true,
    phases
  });
}
