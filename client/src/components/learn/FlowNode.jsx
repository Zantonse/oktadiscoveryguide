import React, { useState } from 'react';

const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

const ChevronUpIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="18 15 12 9 6 15"/>
  </svg>
);

export function FlowNode({ step, area, isLast }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`flow-node ${isExpanded ? 'expanded' : ''}`}>
      <div className="flow-node-connector">
        <div className="flow-node-number">{step.step}</div>
        {!isLast && <div className="flow-node-line" />}
      </div>
      <div className="flow-node-content">
        <button
          className="flow-node-header"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
        >
          <div className="flow-node-info">
            <span className="flow-node-area">{area.name}</span>
            <span className="flow-node-goal">{step.goal}</span>
          </div>
          <span className="flow-node-toggle">
            {isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </span>
        </button>
        {isExpanded && (
          <div className="flow-node-details">
            <p className="flow-node-description">{area.description}</p>

            <div className="flow-node-section">
              <h5>Key Questions</h5>
              <ul>
                {area.questions.slice(0, 4).map((question, idx) => (
                  <li key={idx}>{question}</li>
                ))}
              </ul>
            </div>

            <div className="flow-node-section">
              <h5>Listen For</h5>
              <div className="flow-node-signals">
                {area.signals.map((signal, idx) => (
                  <span key={idx} className="flow-signal-tag">{signal}</span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
