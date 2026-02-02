import React, { useState } from 'react';
import { discoveryFramework } from '../../data/learningContent.js';
import { InteractiveFlow } from './InteractiveFlow.jsx';

export function DiscoveryFramework() {
  const [activeTrack, setActiveTrack] = useState('aiAgents');
  const [showInteractiveFlow, setShowInteractiveFlow] = useState(true);
  const track = discoveryFramework.tracks[activeTrack];

  return (
    <div className="learn-topic">
      <div className="learn-topic-header">
        <h1>{discoveryFramework.title}</h1>
        <p className="learn-topic-description">{discoveryFramework.description}</p>
      </div>

      <div className="learn-track-content">
        <div className="track-intro">
          <h2>{track.name}</h2>
          <p>{track.description}</p>
        </div>

        <div className="learn-card flow-card">
          <div className="flow-card-header">
            <div>
              <h3>Recommended Discovery Flow</h3>
              <p className="learn-card-subtitle">Follow this sequence for structured discovery</p>
            </div>
            <button
              className={`flow-toggle-btn ${showInteractiveFlow ? 'active' : ''}`}
              onClick={() => setShowInteractiveFlow(!showInteractiveFlow)}
            >
              {showInteractiveFlow ? 'Simple View' : 'Interactive View'}
            </button>
          </div>

          {showInteractiveFlow ? (
            <InteractiveFlow track={track} />
          ) : (
            <div className="discovery-flow">
              {track.flow.map((step, index) => {
                const area = track.areas.find(a => a.id === step.area);
                return (
                  <div key={step.step} className="flow-step-item">
                    <div className="flow-step-number">{step.step}</div>
                    <div className="flow-step-info">
                      <span className="flow-step-area">{area?.name || step.area}</span>
                      <span className="flow-step-goal">{step.goal}</span>
                    </div>
                    {index < track.flow.length - 1 && (
                      <svg className="flow-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="12" y1="5" x2="12" y2="19"/>
                        <polyline points="19 12 12 19 5 12"/>
                      </svg>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <h3 className="areas-header">Discovery Areas</h3>
        <div className="discovery-areas">
          {track.areas.map((area) => (
            <div key={area.id} className="area-card">
              <div className="area-header">
                <h4>{area.name}</h4>
                <span className="area-id">{area.id}</span>
              </div>
              <p className="area-description">{area.description}</p>

              <div className="area-questions">
                <h5>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                  Suggested Questions
                </h5>
                <ul>
                  {area.questions.map((q, i) => (
                    <li key={i}>{q}</li>
                  ))}
                </ul>
              </div>

              {area.signals && (
                <div className="area-signals">
                  <h5>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                    </svg>
                    Positive Signals
                  </h5>
                  <ul>
                    {area.signals.map((signal, i) => (
                      <li key={i}>{signal}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
