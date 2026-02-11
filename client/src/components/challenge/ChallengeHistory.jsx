import React from 'react'

export function ChallengeHistory({ mode, onBack }) {
  const [history, setHistory] = React.useState([])

  React.useEffect(() => {
    const STORAGE_KEY = 'challenge-scores'
    try {
      const scores = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}
      setHistory(scores[mode] || [])
    } catch {
      setHistory([])
    }
  }, [mode])

  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getScoreClass = (score) => {
    if (score >= 7) return 'score-high'
    if (score >= 4) return 'score-mid'
    return 'score-low'
  }

  const calculateAverage = (scores) => {
    if (!scores || scores.length === 0) return 0
    return (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1)
  }

  return (
    <div className="challenge-history">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 'var(--spacing-lg)',
        }}
      >
        <div>
          <h2
            style={{ margin: 0, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}
          >
            Challenge History
          </h2>
          <p
            style={{
              margin: 'var(--spacing-xs) 0 0',
              color: 'var(--text-secondary)',
              fontSize: '0.875rem',
            }}
          >
            Last 20 attempts for {mode}
          </p>
        </div>
        {onBack && (
          <button
            className="btn-secondary"
            onClick={onBack}
            style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: 'var(--spacing-3xl)',
            color: 'var(--text-secondary)',
          }}
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            style={{ opacity: 0.3, marginBottom: 'var(--spacing-md)' }}
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
          <p>No attempts yet. Start a challenge to see your history!</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
          {history.map((entry, index) => (
            <div key={index} className="challenge-history-entry">
              <div className="entry-header">
                <div>
                  <div className="entry-title">{entry.scenarioTitle}</div>
                  <div className="entry-date">{formatDate(entry.timestamp)}</div>
                </div>
                <div style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                  {calculateAverage(entry.scores)}/10
                </div>
              </div>

              {entry.scores && (
                <div className="entry-scores">
                  {entry.scores.map((score, idx) => (
                    <div key={idx} className="mini-score">
                      <div className="mini-bar">
                        <div
                          className={`mini-fill ${getScoreClass(score)}`}
                          style={{ width: `${Math.min(score * 10, 100)}%` }}
                        />
                      </div>
                      <span>{score}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
