import React, { useEffect, useRef } from 'react'
import { ChatMessage } from './ChatMessage.jsx'
import { ChatInput } from './ChatInput.jsx'
import { TypingIndicator } from './TypingIndicator.jsx'
import { useSession } from '../../contexts/SessionContext.jsx'
import { getProductByName } from '../../data/aiSecurityProducts.js'

export function ChatContainer() {
  const {
    messages,
    isLoading,
    selectedStakeholder,
    selectedIndustry,
    coachingHint,
    productHints,
    streamingMessage,
    endConversation,
    conversationEnded,
    discoveryProgress,
    phase,
    enterBridgeMode,
  } = useSession()
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading, streamingMessage])

  return (
    <div className={`chat-container ${conversationEnded ? 'conversation-ended' : ''}`}>
      <div className="chat-header">
        <div className="chat-context">
          <span className="context-label">Talking with:</span>
          <span className="context-value">{selectedStakeholder?.fullTitle}</span>
          <span className="context-separator">|</span>
          <span className="context-label">Industry:</span>
          <span className="context-value">{selectedIndustry?.name}</span>
        </div>
        {messages.length > 0 && !conversationEnded && (
          <button className="end-conversation-btn" onClick={endConversation} disabled={isLoading}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
            </svg>
            End Conversation
          </button>
        )}
        {conversationEnded && (
          <div className="conversation-ended-badge">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            Session Complete
          </div>
        )}
      </div>

      <div className={`chat-messages ${conversationEnded ? 'greyed-out' : ''}`}>
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} stakeholder={selectedStakeholder} />
        ))}

        {isLoading && streamingMessage !== null && (
          <ChatMessage
            message={{
              id: 'streaming',
              role: 'assistant',
              content: streamingMessage || '...',
              timestamp: new Date().toISOString(),
            }}
            stakeholder={selectedStakeholder}
            isStreaming={true}
          />
        )}
        {isLoading && streamingMessage === null && (
          <TypingIndicator stakeholder={selectedStakeholder} />
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Bridge mode trigger - show when discovery >= 60% and still in discovery phase */}
      {!conversationEnded && !isLoading && phase === 'discovery' && discoveryProgress >= 60 && (
        <div className="bridge-mode-trigger">
          <div className="bridge-mode-progress">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <span className="bridge-mode-progress-text">
              Discovery <strong>{discoveryProgress}%</strong> complete
            </span>
          </div>
          <div className="bridge-mode-actions">
            <button className="btn-bridge-mode" onClick={enterBridgeMode}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="16" />
                <line x1="8" y1="12" x2="16" y2="12" />
              </svg>
              Bridge to Solution
            </button>
            <button className="btn-continue-discovery">Continue Discovery</button>
          </div>
        </div>
      )}

      {/* Bridge mode active indicator */}
      {!conversationEnded && phase === 'bridge' && (
        <div className="bridge-mode-active">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
          </svg>
          <span className="bridge-mode-active-text">
            Solution Bridging Mode - Connect pain points to Okta products
          </span>
        </div>
      )}

      {coachingHint && !isLoading && !conversationEnded && (
        <div className="coaching-hint">
          <div className="coaching-hint-icon">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
          </div>
          <div className="coaching-hint-content">
            <span className="coaching-hint-label">Coach Tip</span>
            <p className="coaching-hint-text">{coachingHint}</p>
            {productHints && productHints.length > 0 && (
              <div className="coaching-hint-products">
                <span className="coaching-hint-products-label">Maps to:</span>
                <div className="product-hint-badges">
                  {productHints.map((productName) => {
                    const product = getProductByName(productName)
                    return (
                      <span key={productName} className="product-hint-badge">
                        <span
                          className="product-dot"
                          style={{ backgroundColor: product?.color || '#6366f1' }}
                        />
                        {productName}
                      </span>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <ChatInput />
    </div>
  )
}
