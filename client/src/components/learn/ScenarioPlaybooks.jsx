import React, { useState } from 'react';
import { scenarioPlaybooks } from '../../data/learningContent.js';

export function ScenarioPlaybooks() {
  const [activeTrack, setActiveTrack] = useState('aiAgents');
  const track = scenarioPlaybooks.tracks[activeTrack];

  return (
    <div className="learn-topic">
      <div className="learn-topic-header">
        <h1>{scenarioPlaybooks.title}</h1>
        <p className="learn-topic-description">{scenarioPlaybooks.description}</p>
      </div>

      <div className="scenarios-content">
        <h2>{track.name}</h2>

        <div className="scenarios-list">
          {track.scenarios.map((scenario) => (
            <div key={scenario.id} className="playbook-card">
              <div className="playbook-header">
                <h3>{scenario.name}</h3>
                <p className="playbook-description">{scenario.description}</p>
              </div>

              <div className="playbook-body">
                <div className="playbook-section tips">
                  <h4>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    What To Do
                  </h4>
                  <ul>
                    {scenario.tips.map((tip, i) => (
                      <li key={i}>{tip}</li>
                    ))}
                  </ul>
                </div>

                <div className="playbook-section avoid">
                  <h4>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="15" y1="9" x2="9" y2="15"/>
                      <line x1="9" y1="9" x2="15" y2="15"/>
                    </svg>
                    What To Avoid
                  </h4>
                  <ul>
                    {scenario.avoid.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="playbook-section probe">
                  <h4>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8"/>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                    Areas to Probe
                  </h4>
                  <div className="probe-areas">
                    {scenario.probeAreas.map((area, i) => (
                      <span key={i} className="probe-tag">{area}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
