import React from 'react';

const ShuffleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="16 3 21 3 21 8"/>
    <line x1="4" y1="20" x2="21" y2="3"/>
    <polyline points="21 16 21 21 16 21"/>
    <line x1="15" y1="15" x2="21" y2="21"/>
    <line x1="4" y1="4" x2="9" y2="9"/>
  </svg>
);

const PrevIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
);

const NextIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);

const RestartIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="1 4 1 10 7 10"/>
    <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
  </svg>
);

export function DrillProgress({
  current,
  total,
  onPrev,
  onNext,
  onShuffle,
  onRestart,
  canGoPrev,
  canGoNext
}) {
  const progress = total > 0 ? ((current) / total) * 100 : 0;

  return (
    <div className="drill-progress">
      <div className="drill-progress-bar-container">
        <div className="drill-progress-bar" style={{ width: `${progress}%` }} />
      </div>

      <div className="drill-controls">
        <div className="drill-controls-left">
          <button
            className="drill-btn secondary"
            onClick={onShuffle}
            title="Shuffle cards"
          >
            <ShuffleIcon />
            <span>Shuffle</span>
          </button>
          <button
            className="drill-btn secondary"
            onClick={onRestart}
            title="Restart from beginning"
          >
            <RestartIcon />
            <span>Restart</span>
          </button>
        </div>

        <div className="drill-navigation">
          <button
            className="drill-nav-btn"
            onClick={onPrev}
            disabled={!canGoPrev}
            aria-label="Previous card"
          >
            <PrevIcon />
          </button>

          <div className="drill-counter">
            <span className="drill-counter-current">{current}</span>
            <span className="drill-counter-separator">/</span>
            <span className="drill-counter-total">{total}</span>
          </div>

          <button
            className="drill-nav-btn"
            onClick={onNext}
            disabled={!canGoNext}
            aria-label="Next card"
          >
            <NextIcon />
          </button>
        </div>

        <div className="drill-controls-right">
          <div className="drill-keyboard-hints">
            <span className="keyboard-hint"><kbd>Space</kbd> flip</span>
            <span className="keyboard-hint"><kbd>&larr;</kbd> <kbd>&rarr;</kbd> navigate</span>
          </div>
        </div>
      </div>
    </div>
  );
}
