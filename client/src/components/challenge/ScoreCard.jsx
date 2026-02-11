import React from 'react' // eslint-disable-line no-unused-vars

export function ScoreCard({ evaluation, mode, onNext, onBack }) {
  if (!evaluation || !evaluation.scores) return null

  const dimensionLabels = {
    technical: ['Technical Accuracy', 'Depth', 'Credibility'],
    architecture: ['Gap Identification', 'Product Mapping', 'Articulation'],
    briefing: ['Positioning', 'Accuracy', 'Composure', 'Bridge to Value'],
    proofpoint: ['Relevance', 'Specificity', 'Persuasiveness', 'Adaptation'],
  }

  const labels = dimensionLabels[mode] || []
  const scores = evaluation.scores || []
  const averageScore =
    scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : 0

  const getScoreClass = (score) => {
    if (score >= 7) return 'score-high'
    if (score >= 4) return 'score-mid'
    return 'score-low'
  }

  const getModeDebriefKey = () => {
    switch (mode) {
      case 'technical':
        return 'missedItems'
      case 'architecture':
        return 'idealResponse'
      case 'briefing':
        return 'alternativeApproaches'
      case 'proofpoint':
        return 'greatAnswers'
      default:
        return 'feedback'
    }
  }

  const debriefKey = getModeDebriefKey()

  return (
    <div className="score-card">
      <h3>Your Results</h3>

      {/* Score Dimensions */}
      <div className="score-dimensions">
        {scores.map((score, index) => (
          <div key={index} className="score-dimension">
            <div className="dimension-label">{labels[index] || `Dimension ${index + 1}`}</div>
            <div className="dimension-bar">
              <div
                className={`dimension-fill ${getScoreClass(score)}`}
                style={{ width: `${Math.min(score * 10, 100)}%` }}
              />
            </div>
            <div className="dimension-value">{score}/10</div>
          </div>
        ))}
      </div>

      {/* Average Score */}
      <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-lg)' }}>
        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Average Score</div>
        <div
          style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: 'var(--text-primary)',
            marginTop: 'var(--spacing-xs)',
          }}
        >
          {averageScore}/10
        </div>
      </div>

      {/* Feedback Section */}
      <div className="score-feedback">
        <h4>Feedback</h4>
        <p>{evaluation.feedback}</p>

        {/* Mode-specific debrief */}
        {evaluation[debriefKey] && (
          <div style={{ marginTop: 'var(--spacing-md)' }}>
            <h4>
              {debriefKey === 'missedItems'
                ? 'Missed Items'
                : debriefKey === 'idealResponse'
                  ? 'Ideal Response'
                  : debriefKey === 'alternativeApproaches'
                    ? 'Alternative Approaches'
                    : 'Great Answers'}
            </h4>
            <div className="debrief-text">{evaluation[debriefKey]}</div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="score-actions">
        {onBack && (
          <button className="btn-secondary" onClick={onBack}>
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
            Back to Modes
          </button>
        )}
        {onNext && (
          <button className="btn-primary" onClick={onNext}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
            Next Scenario
          </button>
        )}
      </div>
    </div>
  )
}
