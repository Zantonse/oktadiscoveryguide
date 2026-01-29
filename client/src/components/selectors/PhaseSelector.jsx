import React from 'react';
import { Card } from '../common/Card.jsx';
import { useSession } from '../../contexts/SessionContext.jsx';

const tracks = {
  sales: {
    id: 'sales',
    name: 'IGA Sales Discovery',
    description: 'Practice uncovering business pain, budget, and decision process for Identity Governance',
    icon: 'briefcase'
  },
  technical: {
    id: 'technical',
    name: 'IGA Technical Discovery',
    description: 'Practice understanding architecture, requirements, and integration needs for IGA',
    icon: 'code'
  },
  aiAgents: {
    id: 'aiAgents',
    name: 'AI Agents Discovery',
    description: 'Discover customer needs for Okta AI security, agent authentication, and agentic AI',
    icon: 'bot'
  }
};

export function PhaseSelector() {
  const {
    selectedTrack,
    setSelectedTrack,
    conversationStarted
  } = useSession();

  const handleTrackSelect = (trackId) => {
    if (conversationStarted) return;
    setSelectedTrack(trackId);
  };

  return (
    <Card title="Discovery Track" className="selector-card track-selector">
      <div className="track-options">
        {Object.values(tracks).map((track) => (
          <button
            key={track.id}
            className={`track-card ${selectedTrack === track.id ? 'selected' : ''} ${conversationStarted ? 'disabled' : ''}`}
            onClick={() => handleTrackSelect(track.id)}
          >
            <div className="track-icon">
              {track.icon === 'briefcase' ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                </svg>
              ) : track.icon === 'code' ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="16 18 22 12 16 6"/>
                  <polyline points="8 6 2 12 8 18"/>
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="12" rx="2"/>
                  <path d="M9 8h.01"/>
                  <path d="M15 8h.01"/>
                  <path d="M9 12a3 3 0 0 0 6 0"/>
                  <path d="M8 16v2"/>
                  <path d="M16 16v2"/>
                  <path d="M12 16v4"/>
                </svg>
              )}
            </div>
            <div className="track-info">
              <span className="track-name">{track.name}</span>
              <span className="track-desc">{track.description}</span>
            </div>
            {selectedTrack === track.id && (
              <div className="track-check">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>
    </Card>
  );
}
