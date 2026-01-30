import React, { useState } from 'react';

const FlipIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 1l4 4-4 4"/>
    <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
    <path d="M7 23l-4-4 4-4"/>
    <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
  </svg>
);

export function ObjectionCard({ objection }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={`objection-card ${isFlipped ? 'flipped' : ''}`}
      onClick={() => setIsFlipped(!isFlipped)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setIsFlipped(!isFlipped);
        }
      }}
    >
      <div className="objection-card-inner">
        <div className="objection-card-face objection-card-front">
          <div className="objection-card-content">
            <div className="objection-label">When they say:</div>
            <div className="objection-text">{objection.objection}</div>
            <div className="objection-meaning">
              <strong>This means:</strong> {objection.meaning}
            </div>
          </div>
          <div className="objection-flip-hint">
            <FlipIcon />
            <span>Click to see response</span>
          </div>
        </div>
        <div className="objection-card-face objection-card-back">
          <div className="objection-card-content">
            <div className="objection-label success">How to respond:</div>
            <div className="objection-response">{objection.response}</div>
          </div>
          <div className="objection-flip-hint">
            <FlipIcon />
            <span>Click to flip back</span>
          </div>
        </div>
      </div>
    </div>
  );
}
