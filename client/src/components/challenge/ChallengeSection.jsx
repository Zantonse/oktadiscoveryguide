import { useState, useMemo } from 'react'
import { ScenarioCard } from './ScenarioCard.jsx'
import { ScoreCard } from './ScoreCard.jsx'
import { ChallengeHistory } from './ChallengeHistory.jsx'
import {
  technicalTopics,
  architectureScenarios,
  briefingPrompts,
  proofPointScenarios,
} from '../../data/challenges.js'

const STORAGE_KEY = 'challenge-scores'
const MAX_HISTORY = 20

function loadScores() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}
  } catch {
    return {}
  }
}

function saveScore(mode, entry) {
  const scores = loadScores()
  if (!scores[mode]) scores[mode] = []
  scores[mode].unshift({ ...entry, timestamp: Date.now() })
  scores[mode] = scores[mode].slice(0, MAX_HISTORY)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(scores))
}

function getRandomScenario(array) {
  return array[Math.floor(Math.random() * array.length)]
}

export function ChallengeSection() {
  // Main state
  const [activeMode, setActiveMode] = useState(null)
  const [viewState, setViewState] = useState('select') // 'select' | 'scenario' | 'loading' | 'results' | 'chat' | 'topic'
  const [showHistory, setShowHistory] = useState(null)

  // Single-turn state (architecture, briefing, proofpoint)
  const [currentScenario, setCurrentScenario] = useState(null)
  const [userResponse, setUserResponse] = useState('')
  const [evaluation, setEvaluation] = useState(null)

  // Multi-turn state (technical)
  const [currentTopic, setCurrentTopic] = useState(null)
  const [messages, setMessages] = useState([])
  const [chatInput, setChatInput] = useState('')

  // Loading state
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Get scores for a mode (to show history button)
  const modeScores = useMemo(() => {
    const scores = loadScores()
    return scores
  }, [])

  // ============ Mode Selection ============
  const handleStartMode = (mode) => {
    setActiveMode(mode)
    setError(null)
    setUserResponse('')
    setEvaluation(null)
    setMessages([])
    setChatInput('')

    if (mode === 'technical') {
      // Show topic selector for technical
      setViewState('topic')
    } else {
      // Pick random scenario for single-turn modes
      let scenario
      if (mode === 'architecture') {
        scenario = getRandomScenario(architectureScenarios)
      } else if (mode === 'briefing') {
        scenario = getRandomScenario(briefingPrompts)
      } else if (mode === 'proofpoint') {
        scenario = getRandomScenario(proofPointScenarios)
      }
      setCurrentScenario(scenario)
      setViewState('scenario')
    }
  }

  // ============ Technical Deep Dive (Multi-turn) ============
  const handleSelectTopic = (topic) => {
    setCurrentTopic(topic)
    // Initialize with AI's opening prompt
    const openingMessage = {
      role: 'assistant',
      content: topic.openingPrompt,
    }
    setMessages([openingMessage])
    setViewState('chat')
  }

  const handleSendMessage = async () => {
    if (!chatInput.trim() || isLoading) return

    const userMsg = { role: 'user', content: chatInput }
    const updatedMessages = [...messages, userMsg]
    setMessages(updatedMessages)
    setChatInput('')
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/challenge/technical', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topicId: currentTopic.id,
          messages: updatedMessages,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to get response')
      }

      const result = await response.json()

      // Add AI response
      const aiMsg = { role: 'assistant', content: result.response }
      setMessages((prev) => [...prev, aiMsg])

      // If evaluation is ready, show it
      if (result.evaluation && result.evaluation.hasScorecard) {
        setEvaluation(result.evaluation)
        saveScore(activeMode, {
          scenarioId: currentTopic.id,
          scenarioTitle: currentTopic.topic,
          scores: result.evaluation.scores,
          feedback: result.evaluation.feedback,
        })
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleNextScenario = () => {
    if (activeMode === 'technical') {
      // For technical, go back to topic selector
      setCurrentTopic(null)
      setMessages([])
      setEvaluation(null)
      setViewState('topic')
    } else {
      // Pick new random scenario
      let scenario
      if (activeMode === 'architecture') {
        scenario = getRandomScenario(architectureScenarios)
      } else if (activeMode === 'briefing') {
        scenario = getRandomScenario(briefingPrompts)
      } else if (activeMode === 'proofpoint') {
        scenario = getRandomScenario(proofPointScenarios)
      }
      setCurrentScenario(scenario)
      setUserResponse('')
      setEvaluation(null)
      setViewState('scenario')
    }
  }

  // ============ Single-turn Submission ============
  const handleSubmitResponse = async () => {
    if (!userResponse.trim() || isLoading) return

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/challenge/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: activeMode,
          scenario: currentScenario,
          response: userResponse,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Evaluation failed')
      }

      const result = await response.json()
      setEvaluation(result)

      // Save score
      saveScore(activeMode, {
        scenarioId: currentScenario.id,
        scenarioTitle: currentScenario.title || currentScenario.prompt || currentScenario.situation,
        scores: result.scores,
        feedback: result.feedback,
      })

      setViewState('results')
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  // ============ Back handlers ============
  const handleBackToModes = () => {
    setActiveMode(null)
    setViewState('select')
    setCurrentScenario(null)
    setCurrentTopic(null)
    setUserResponse('')
    setEvaluation(null)
    setMessages([])
    setChatInput('')
    setError(null)
  }

  const handleBackFromHistory = () => {
    setShowHistory(null)
  }

  // ============ Main Render ============
  return (
    <div className="challenge-section">
      {/* Header */}
      <div className="challenge-header">
        <h2>Challenge Modes</h2>
        <p>Practice your discovery and sales skills with AI-powered scenarios</p>
      </div>

      {error && (
        <div className="analyze-error">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{error}</span>
          <button className="dismiss-error" onClick={() => setError(null)}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      )}

      {/* Mode Selection View */}
      {viewState === 'select' && !showHistory && (
        <div className="challenge-mode-grid">
          {/* Technical Deep Dive */}
          <div className="challenge-mode-card">
            <div className="mode-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                <text x="8" y="16" fontSize="8" fill="currentColor">
                  AI
                </text>
              </svg>
            </div>
            <h3>Technical Deep Dive</h3>
            <p>
              Multi-turn conversation with increasingly sophisticated questions on AI security
              topics
            </p>
            <div className="mode-actions">
              <button
                className="btn-primary btn-small"
                onClick={() => handleStartMode('technical')}
              >
                Start
              </button>
              {modeScores.technical && modeScores.technical.length > 0 && (
                <button
                  className="btn-secondary btn-small"
                  onClick={() => setShowHistory('technical')}
                >
                  History
                </button>
              )}
            </div>
          </div>

          {/* Architecture Lab */}
          <div className="challenge-mode-card">
            <div className="mode-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="9" y1="3" x2="9" y2="21" />
                <line x1="15" y1="3" x2="15" y2="21" />
              </svg>
            </div>
            <h3>Architecture Lab</h3>
            <p>
              Analyze complex customer scenarios and identify security gaps and product mappings
            </p>
            <div className="mode-actions">
              <button
                className="btn-primary btn-small"
                onClick={() => handleStartMode('architecture')}
              >
                Start
              </button>
              {modeScores.architecture && modeScores.architecture.length > 0 && (
                <button
                  className="btn-secondary btn-small"
                  onClick={() => setShowHistory('architecture')}
                >
                  History
                </button>
              )}
            </div>
          </div>

          {/* Briefing Room */}
          <div className="challenge-mode-card">
            <div className="mode-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <h3>Briefing Room</h3>
            <p>Handle competitive and market objections with positioning and key points</p>
            <div className="mode-actions">
              <button className="btn-primary btn-small" onClick={() => handleStartMode('briefing')}>
                Start
              </button>
              {modeScores.briefing && modeScores.briefing.length > 0 && (
                <button
                  className="btn-secondary btn-small"
                  onClick={() => setShowHistory('briefing')}
                >
                  History
                </button>
              )}
            </div>
          </div>

          {/* Proof Point Match */}
          <div className="challenge-mode-card">
            <div className="mode-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 12l2 2 4-4" />
                <circle cx="12" cy="12" r="10" />
              </svg>
            </div>
            <h3>Proof Point Match</h3>
            <p>Match customer situations to relevant proof points and success stories</p>
            <div className="mode-actions">
              <button
                className="btn-primary btn-small"
                onClick={() => handleStartMode('proofpoint')}
              >
                Start
              </button>
              {modeScores.proofpoint && modeScores.proofpoint.length > 0 && (
                <button
                  className="btn-secondary btn-small"
                  onClick={() => setShowHistory('proofpoint')}
                >
                  History
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* History View */}
      {showHistory && <ChallengeHistory mode={showHistory} onBack={handleBackFromHistory} />}

      {/* Topic Selector (Technical) */}
      {viewState === 'topic' && activeMode === 'technical' && (
        <div>
          <div style={{ marginBottom: 'var(--spacing-lg)' }}>
            <h3 style={{ color: 'var(--text-primary)', marginBottom: 'var(--spacing-sm)' }}>
              Choose a Topic
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              Select an AI security topic to dive deep into multi-turn discussion
            </p>
          </div>

          <div className="topic-selector">
            {technicalTopics.map((topic) => (
              <button
                key={topic.id}
                className="topic-card"
                onClick={() => handleSelectTopic(topic)}
                type="button"
                style={{
                  textAlign: 'left',
                  cursor: 'pointer',
                  background: 'none',
                  border: 'none',
                  padding: 0,
                }}
              >
                <h4>{topic.topic}</h4>
                <p>{topic.description}</p>
                <div className={`difficulty-badge ${topic.difficulty}`}>
                  {topic.difficulty.charAt(0).toUpperCase() + topic.difficulty.slice(1)}
                </div>
              </button>
            ))}
          </div>

          <div style={{ marginTop: 'var(--spacing-lg)', textAlign: 'right' }}>
            <button className="btn-secondary" onClick={handleBackToModes}>
              Back to Modes
            </button>
          </div>
        </div>
      )}

      {/* Scenario View (Single-turn modes) */}
      {viewState === 'scenario' && currentScenario && activeMode !== 'technical' && (
        <div>
          <ScenarioCard scenario={currentScenario} mode={activeMode} />

          <div className="challenge-response-area">
            <label
              htmlFor="challenge-response-input"
              style={{
                display: 'block',
                marginBottom: 'var(--spacing-sm)',
                fontSize: '0.875rem',
                color: 'var(--text-secondary)',
                fontWeight: '500',
              }}
            >
              Your Response
            </label>
            <textarea
              id="challenge-response-input"
              value={userResponse}
              onChange={(e) => setUserResponse(e.target.value)}
              placeholder={
                activeMode === 'architecture'
                  ? 'Identify gaps and map relevant Okta products...'
                  : activeMode === 'briefing'
                    ? 'Provide your positioning response...'
                    : 'Match this situation to a relevant proof point...'
              }
              disabled={isLoading}
            />

            <div className="response-actions">
              <button className="btn-secondary" onClick={handleBackToModes} disabled={isLoading}>
                Cancel
              </button>
              <button
                className="btn-primary"
                onClick={handleSubmitResponse}
                disabled={!userResponse.trim() || isLoading}
              >
                {isLoading ? 'Evaluating...' : 'Submit Response'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat View (Technical Deep Dive) */}
      {viewState === 'chat' && activeMode === 'technical' && currentTopic && (
        <div>
          <div style={{ marginBottom: 'var(--spacing-lg)' }}>
            <h3 style={{ color: 'var(--text-primary)', margin: 0 }}>{currentTopic.topic}</h3>
            <p
              style={{
                color: 'var(--text-secondary)',
                fontSize: '0.875rem',
                margin: 'var(--spacing-xs) 0 0',
              }}
            >
              Multi-turn discussion
            </p>
          </div>

          <div className="challenge-chat">
            <div className="challenge-chat-messages">
              {messages.map((msg, idx) => (
                <div key={idx} className={`challenge-chat-message ${msg.role}`}>
                  {msg.content}
                </div>
              ))}
              {isLoading && (
                <div className="challenge-chat-message assistant">
                  <div
                    style={{
                      display: 'flex',
                      gap: 'var(--spacing-xs)',
                      alignItems: 'center',
                    }}
                  >
                    <span
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: 'var(--color-primary)',
                        animation: 'pulse 1.5s infinite',
                      }}
                    />
                    <span
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: 'var(--color-primary)',
                        animation: 'pulse 1.5s infinite 0.3s',
                      }}
                    />
                    <span
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: 'var(--color-primary)',
                        animation: 'pulse 1.5s infinite 0.6s',
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="challenge-chat-input">
              <textarea
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
                placeholder="Type your response..."
                disabled={isLoading}
              />
              <button
                className="btn-primary"
                onClick={handleSendMessage}
                disabled={!chatInput.trim() || isLoading}
                style={{ flexShrink: 0 }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
          </div>

          {/* Show scorecard if available */}
          {evaluation && evaluation.hasScorecard && (
            <ScoreCard
              evaluation={evaluation}
              mode={activeMode}
              onNext={handleNextScenario}
              onBack={handleBackToModes}
            />
          )}

          {!evaluation && !isLoading && (
            <div style={{ marginTop: 'var(--spacing-lg)', textAlign: 'right' }}>
              <button className="btn-secondary" onClick={handleBackToModes}>
                Exit Challenge
              </button>
            </div>
          )}
        </div>
      )}

      {/* Loading View */}
      {viewState === 'loading' && (
        <div className="challenge-loading">
          <div className="spinner" />
          <p>Evaluating your response...</p>
        </div>
      )}

      {/* Results View */}
      {viewState === 'results' && evaluation && (
        <ScoreCard
          evaluation={evaluation}
          mode={activeMode}
          onNext={handleNextScenario}
          onBack={handleBackToModes}
        />
      )}
    </div>
  )
}
