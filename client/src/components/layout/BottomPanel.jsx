import React, { useState } from 'react'
import { SessionNotes } from '../features/SessionNotes.jsx'
import { SuggestedQuestions } from '../features/SuggestedQuestions.jsx'
import { FlowGuideButton, ConversationFlowOverlay } from '../features/ConversationFlow.jsx'

export function BottomPanel() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState('notes')
  const [showFlowGuide, setShowFlowGuide] = useState(false)

  return (
    <>
      <div className={`bottom-panel ${isCollapsed ? 'collapsed' : ''}`}>
        <div className="bottom-panel-header">
          <div className="bottom-panel-tabs">
            <button
              className={`tab ${activeTab === 'notes' ? 'active' : ''}`}
              onClick={() => setActiveTab('notes')}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              Notes
            </button>
            <button
              className={`tab ${activeTab === 'questions' ? 'active' : ''}`}
              onClick={() => setActiveTab('questions')}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              Questions
            </button>
          </div>

          <div className="bottom-panel-actions">
            <FlowGuideButton onClick={() => setShowFlowGuide(true)} />
            <button className="collapse-toggle" onClick={() => setIsCollapsed(!isCollapsed)}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{ transform: isCollapsed ? 'rotate(180deg)' : 'rotate(0deg)' }}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          </div>
        </div>

        {!isCollapsed && (
          <div className="bottom-panel-content">
            {activeTab === 'notes' && <SessionNotes />}
            {activeTab === 'questions' && <SuggestedQuestions inline />}
          </div>
        )}
      </div>

      <ConversationFlowOverlay isOpen={showFlowGuide} onClose={() => setShowFlowGuide(false)} />
    </>
  )
}
