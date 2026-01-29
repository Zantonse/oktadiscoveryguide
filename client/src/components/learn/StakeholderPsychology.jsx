import React, { useState } from 'react';
import { stakeholderPsychology } from '../../data/learningContent.js';

export function StakeholderPsychology() {
  const [activeSection, setActiveSection] = useState('interest-levels');
  const section = stakeholderPsychology.sections.find(s => s.id === activeSection);

  return (
    <div className="learn-topic">
      <div className="learn-topic-header">
        <h1>{stakeholderPsychology.title}</h1>
        <p className="learn-topic-description">{stakeholderPsychology.description}</p>
      </div>

      <div className="psychology-nav">
        {stakeholderPsychology.sections.map((s) => (
          <button
            key={s.id}
            className={`psychology-nav-btn ${activeSection === s.id ? 'active' : ''}`}
            onClick={() => setActiveSection(s.id)}
          >
            {s.title}
          </button>
        ))}
      </div>

      <div className="psychology-content">
        <h2>{section.title}</h2>
        <p className="section-description">{section.description}</p>

        {section.levels && (
          <div className="interest-levels">
            {section.levels.map((level, index) => (
              <div key={index} className={`interest-level-card level-${level.range.split('-')[0]}`}>
                <div className="level-header">
                  <span className="level-range">{level.range}</span>
                  <span className="level-label">{level.label}</span>
                </div>
                <div className="level-behaviors">
                  <h5>Typical Behaviors</h5>
                  <ul>
                    {level.behaviors.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
                <div className="level-response">
                  <h5>Your Response</h5>
                  <p>{level.response}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {section.behaviors && section.id === 'what-increases' && (
          <div className="behaviors-list positive">
            {section.behaviors.map((item, index) => (
              <div key={index} className="behavior-card">
                <div className="behavior-header">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <h4>{item.behavior}</h4>
                </div>
                <p className="behavior-why">{item.why}</p>
                <div className="behavior-example">
                  <strong>Example:</strong> {item.example}
                </div>
              </div>
            ))}
          </div>
        )}

        {section.behaviors && section.id === 'what-decreases' && (
          <div className="behaviors-list negative">
            {section.behaviors.map((item, index) => (
              <div key={index} className="behavior-card">
                <div className="behavior-header">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="15" y1="9" x2="9" y2="15"/>
                    <line x1="9" y1="9" x2="15" y2="15"/>
                  </svg>
                  <h4>{item.behavior}</h4>
                </div>
                <p className="behavior-why">{item.why}</p>
                <div className="behavior-example">
                  <strong>Example:</strong> {item.example}
                </div>
              </div>
            ))}
          </div>
        )}

        {section.signals && (
          <div className="buying-signals">
            {section.signals.map((signal, index) => (
              <div key={index} className="signal-card">
                <div className="signal-header">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                  </svg>
                  <h4>{signal.signal}</h4>
                </div>
                <p className="signal-meaning">{signal.meaning}</p>
                <div className="signal-examples">
                  <strong>Examples:</strong>
                  <ul>
                    {signal.examples.map((ex, i) => (
                      <li key={i}>{ex}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}

        {section.objections && (
          <div className="objections-list">
            {section.objections.map((obj, index) => (
              <div key={index} className="objection-card">
                <div className="objection-header">
                  <span className="objection-quote">"{obj.objection}"</span>
                </div>
                <div className="objection-meaning">
                  <strong>What they mean:</strong> {obj.meaning}
                </div>
                <div className="objection-response">
                  <strong>How to respond:</strong> {obj.response}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
