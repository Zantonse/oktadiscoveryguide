import React, { useState, useEffect } from 'react'
import { IndustrySelector } from '../selectors/IndustrySelector.jsx'
import { StakeholderSelector } from '../selectors/StakeholderSelector.jsx'
import { ScenarioSelector } from '../selectors/ScenarioSelector.jsx'
import { SuggestedQuestions } from '../features/SuggestedQuestions.jsx'
import { useSession } from '../../contexts/SessionContext.jsx'
import { Button } from '../common/Button.jsx'

export function Sidebar() {
  // Load collapse state from localStorage, default to false
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebarCollapsed')
    return saved === 'true'
  })
  const {
    canStartConversation,
    startConversation,
    conversationStarted,
    isLoading,
    interestLevel,
    discoveryProgress,
    timerStarted,
    timeRemaining,
  } = useSession()

  // Format time remaining as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const timerPercent = (timeRemaining / (30 * 60)) * 100
  const timerUrgent = timeRemaining <= 5 * 60 // Last 5 minutes
  const timerWarning = timeRemaining <= 10 * 60 && !timerUrgent // 5-10 minutes

  // Save collapse state to localStorage
  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', isCollapsed.toString())
  }, [isCollapsed])

  // Toggle sidebar collapse
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  // Close sidebar when clicking overlay on mobile
  const handleOverlayClick = () => {
    if (window.innerWidth <= 768) {
      setIsCollapsed(true)
    }
  }

  return (
    <>
      {/* Mobile drawer overlay */}
      {!isCollapsed && (
        <div className="sidebar-overlay" onClick={handleOverlayClick} aria-hidden="true" />
      )}

      <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
        {/* Mobile collapsed summary bar */}
        <div className="sidebar-collapsed-summary">
          <div className="collapsed-badges">
            <span className="collapsed-badge">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {formatTime(timeRemaining)}
            </span>
            {conversationStarted && (
              <>
                <span
                  className={`collapsed-badge status-${interestLevel <= 3 ? 'low' : interestLevel <= 6 ? 'mid' : 'high'}`}
                >
                  Interest: {interestLevel}/10
                </span>
                <span className="collapsed-badge">Progress: {discoveryProgress}%</span>
              </>
            )}
          </div>
        </div>

        <div className="sidebar-content">
          <IndustrySelector />
          <StakeholderSelector />
          <ScenarioSelector />

          {!conversationStarted && (
            <div className="start-section">
              <Button
                variant="primary"
                size="large"
                disabled={!canStartConversation || isLoading}
                onClick={startConversation}
                className="start-button"
              >
                {isLoading ? 'Starting...' : 'Start Conversation'}
              </Button>
              {!canStartConversation && (
                <p className="start-hint">Select industry and stakeholder to begin</p>
              )}
            </div>
          )}

          {conversationStarted && (
            <>
              {/* Timer Card */}
              <div
                className={`status-card timer-card ${timerUrgent ? 'timer-urgent' : timerWarning ? 'timer-warning' : ''}`}
              >
                <div className="status-card-header">
                  <span className="status-card-title">Time Remaining</span>
                  <span
                    className={`status-value timer-value ${timerUrgent ? 'timer-urgent' : timerWarning ? 'timer-warning' : ''}`}
                  >
                    {formatTime(timeRemaining)}
                  </span>
                </div>
                <div className="timer-bar-large">
                  <div
                    className={`timer-fill ${timerUrgent ? 'timer-urgent' : timerWarning ? 'timer-warning' : ''}`}
                    style={{ width: `${timerPercent}%` }}
                  />
                </div>
                <span className="status-hint">
                  {!timerStarted
                    ? 'Timer starts when you send your first message'
                    : timerUrgent
                      ? 'Wrap up - time is almost up!'
                      : timerWarning
                        ? 'Start summarizing key findings'
                        : 'Discovery meeting in progress'}
                </span>
              </div>

              <div className="status-card">
                <div className="status-card-header">
                  <span className="status-card-title">Buyer Interest</span>
                  <span
                    className={`status-value status-${interestLevel <= 3 ? 'low' : interestLevel <= 6 ? 'mid' : 'high'}`}
                  >
                    {interestLevel}/10
                  </span>
                </div>
                <div className="interest-bar-large">
                  <div
                    className={`interest-fill interest-level-${interestLevel <= 3 ? 'low' : interestLevel <= 6 ? 'mid' : 'high'}`}
                    style={{ width: `${interestLevel * 10}%` }}
                  />
                </div>
                <span className="status-hint">
                  {interestLevel <= 3
                    ? 'Losing them - change approach'
                    : interestLevel <= 6
                      ? 'Neutral - build more value'
                      : 'Engaged - keep it up!'}
                </span>
              </div>

              <div className="status-card">
                <div className="status-card-header">
                  <span className="status-card-title">Discovery Progress</span>
                  <span className="status-value">{discoveryProgress}%</span>
                </div>
                <div className="progress-bar-large">
                  <div className="progress-fill" style={{ width: `${discoveryProgress}%` }} />
                </div>
                <span className="status-hint">
                  {discoveryProgress < 25
                    ? 'Keep asking questions to uncover needs'
                    : discoveryProgress < 50
                      ? 'Good start - dig deeper into pain points'
                      : discoveryProgress < 75
                        ? 'Making progress - explore implications'
                        : 'Great discovery - ready to summarize'}
                </span>
              </div>

              <SuggestedQuestions />
            </>
          )}
        </div>

        {/* Mobile toggle button */}
        <button
          className="sidebar-toggle"
          onClick={toggleSidebar}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-expanded={!isCollapsed}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </button>
      </aside>
    </>
  )
}
