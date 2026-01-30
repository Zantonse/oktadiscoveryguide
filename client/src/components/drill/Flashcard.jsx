import React from 'react';

const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

const QuestionIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);

const AlertIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="12"/>
    <line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);

const FlipIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 1l4 4-4 4"/>
    <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
    <path d="M7 23l-4-4 4-4"/>
    <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
  </svg>
);

function getTypeConfig(type) {
  const configs = {
    golden: {
      icon: <StarIcon />,
      label: 'Golden Question',
      className: 'golden'
    },
    discovery: {
      icon: <QuestionIcon />,
      label: 'Discovery Question',
      className: 'discovery'
    },
    objection: {
      icon: <AlertIcon />,
      label: 'Objection Handler',
      className: 'objection'
    },
    mistake: {
      icon: <AlertIcon />,
      label: 'Common Mistake',
      className: 'mistake'
    }
  };
  return configs[type] || configs.discovery;
}

function getTrackLabel(track) {
  const labels = {
    sales: 'Sales',
    technical: 'Technical',
    aiAgents: 'AI Agents'
  };
  return labels[track] || track;
}

export function Flashcard({ card, isFlipped, onFlip }) {
  const typeConfig = getTypeConfig(card.type);

  const renderFront = () => {
    // Different front content based on card type
    if (card.type === 'objection') {
      return (
        <div className="flashcard-front-content">
          <div className="flashcard-prompt">When they say:</div>
          <div className="flashcard-main-text">{card.objection}</div>
          <div className="flashcard-hint">Click to reveal response</div>
        </div>
      );
    }

    if (card.type === 'mistake') {
      return (
        <div className="flashcard-front-content">
          <div className="flashcard-prompt">Avoid this mistake:</div>
          <div className="flashcard-main-text">{card.mistake}</div>
          <div className="flashcard-hint">Click to learn why and what to do instead</div>
        </div>
      );
    }

    // Golden and discovery questions
    return (
      <div className="flashcard-front-content">
        <div className="flashcard-prompt">Question prompt:</div>
        <div className="flashcard-main-text">{card.front}</div>
        <div className="flashcard-hint">Click to reveal the question</div>
      </div>
    );
  };

  const renderBack = () => {
    // Different back content based on card type
    if (card.type === 'objection') {
      return (
        <div className="flashcard-back-content">
          <div className="flashcard-section">
            <div className="flashcard-section-label">What this means:</div>
            <div className="flashcard-section-text">{card.meaning}</div>
          </div>
          <div className="flashcard-section">
            <div className="flashcard-section-label">How to respond:</div>
            <div className="flashcard-section-text flashcard-highlight">{card.response}</div>
          </div>
          {card.avoid && (
            <div className="flashcard-section">
              <div className="flashcard-section-label warning">Avoid:</div>
              <div className="flashcard-section-text">{card.avoid}</div>
            </div>
          )}
        </div>
      );
    }

    if (card.type === 'mistake') {
      return (
        <div className="flashcard-back-content">
          <div className="flashcard-section">
            <div className="flashcard-section-label warning">Why it's a mistake:</div>
            <div className="flashcard-section-text">{card.why}</div>
          </div>
          <div className="flashcard-section">
            <div className="flashcard-section-label success">Instead:</div>
            <div className="flashcard-section-text flashcard-highlight">{card.instead}</div>
          </div>
        </div>
      );
    }

    // Golden questions have more detail
    if (card.type === 'golden') {
      return (
        <div className="flashcard-back-content">
          <div className="flashcard-question">{card.back}</div>
          <div className="flashcard-section">
            <div className="flashcard-section-label">Why this works:</div>
            <div className="flashcard-section-text">{card.why}</div>
          </div>
          {card.unlocks && card.unlocks.length > 0 && (
            <div className="flashcard-unlocks">
              <span className="flashcard-unlocks-label">Unlocks:</span>
              {card.unlocks.map((area, idx) => (
                <span key={idx} className="flashcard-unlock-tag">
                  {area.replace(/_/g, ' ')}
                </span>
              ))}
            </div>
          )}
        </div>
      );
    }

    // Discovery questions
    return (
      <div className="flashcard-back-content">
        <div className="flashcard-question">{card.back}</div>
        {card.area && (
          <div className="flashcard-area">
            <span className="flashcard-area-label">Discovery Area:</span>
            <span className="flashcard-area-value">{card.area.replace(/_/g, ' ')}</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className={`flashcard ${isFlipped ? 'flipped' : ''}`}
      onClick={onFlip}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onFlip();
        }
      }}
    >
      <div className="flashcard-inner">
        <div className={`flashcard-face flashcard-front ${typeConfig.className}`}>
          <div className="flashcard-header">
            <div className={`flashcard-type ${typeConfig.className}`}>
              {typeConfig.icon}
              <span>{typeConfig.label}</span>
            </div>
            {card.track && (
              <div className="flashcard-track">{getTrackLabel(card.track)}</div>
            )}
          </div>
          {renderFront()}
          <div className="flashcard-flip-hint">
            <FlipIcon />
            <span>Tap to flip</span>
          </div>
        </div>
        <div className={`flashcard-face flashcard-back ${typeConfig.className}`}>
          <div className="flashcard-header">
            <div className={`flashcard-type ${typeConfig.className}`}>
              {typeConfig.icon}
              <span>{typeConfig.label}</span>
            </div>
            {card.track && (
              <div className="flashcard-track">{getTrackLabel(card.track)}</div>
            )}
          </div>
          {renderBack()}
          <div className="flashcard-flip-hint">
            <FlipIcon />
            <span>Tap to flip back</span>
          </div>
        </div>
      </div>
    </div>
  );
}
