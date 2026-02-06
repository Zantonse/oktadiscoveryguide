import React, { useEffect, useRef, useState } from 'react'
import { Card } from '../common/Card.jsx'
import { useSession } from '../../contexts/SessionContext.jsx'

const stageLabels = {
  opening: { label: 'Opening', description: 'Build rapport, understand context' },
  building: { label: 'Building', description: 'Dig deeper into initial topics' },
  exploring: { label: 'Exploring', description: 'Uncover pain points and use cases' },
  deepening: { label: 'Deepening', description: 'Understand impact and stakeholders' },
  closing: { label: 'Closing', description: 'Confirm findings, discuss next steps' },
}

export function SuggestedQuestions({ inline = false }) {
  const {
    suggestedQuestions,
    fetchSuggestedQuestions,
    sendMessage,
    isLoading,
    discoveryStage,
    nextPriorityAreas,
  } = useSession()
  const [isRefreshing, setIsRefreshing] = useState(false)
  const initialized = useRef(false)

  const stageInfo = stageLabels[discoveryStage] || stageLabels.opening

  useEffect(() => {
    if (!initialized.current && suggestedQuestions.length === 0) {
      initialized.current = true
      fetchSuggestedQuestions()
    }
  }, [])

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await fetchSuggestedQuestions()
    setIsRefreshing(false)
  }

  const handleQuestionClick = (question) => {
    if (isLoading) return
    sendMessage(question)
  }

  const content = (
    <div className="suggested-questions">
      {/* Stage indicator */}
      <div className="discovery-stage-indicator">
        <div className="stage-badge">
          <span className="stage-label">{stageInfo.label}</span>
        </div>
        <span className="stage-description">{stageInfo.description}</span>
      </div>

      {/* Priority areas hint */}
      {nextPriorityAreas.length > 0 && (
        <div className="priority-areas-hint">
          <span className="hint-label">Focus on:</span>
          <span className="hint-areas">
            {nextPriorityAreas
              .slice(0, 2)
              .map((a) => a.replace(/_/g, ' '))
              .join(', ')}
          </span>
        </div>
      )}

      {suggestedQuestions.length === 0 ? (
        <div className="questions-loading">
          <span>Loading suggestions...</span>
        </div>
      ) : (
        <>
          <ul className="questions-list">
            {suggestedQuestions.slice(0, inline ? 3 : 5).map((question, index) => (
              <li key={index}>
                <button
                  className="question-btn"
                  onClick={() => handleQuestionClick(question)}
                  disabled={isLoading}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                  <span>{question}</span>
                </button>
              </li>
            ))}
          </ul>
          <button
            className="refresh-btn"
            onClick={handleRefresh}
            disabled={isRefreshing || isLoading}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={isRefreshing ? 'spinning' : ''}
            >
              <polyline points="23 4 23 10 17 10" />
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
            </svg>
            <span>{isRefreshing ? 'Refreshing...' : 'More suggestions'}</span>
          </button>
        </>
      )}
    </div>
  )

  if (inline) {
    return content
  }

  return (
    <Card
      title="Suggested Questions"
      className="suggested-questions-card"
      collapsible
      defaultCollapsed={true}
    >
      {content}
    </Card>
  )
}
