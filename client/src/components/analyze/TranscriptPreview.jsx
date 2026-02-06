import React, { useState } from 'react'

export function TranscriptPreview({ messages, roleAssignments }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const { sellers } = roleAssignments

  // Show first 6 messages in collapsed view
  const displayMessages = isExpanded ? messages : messages.slice(0, 6)
  const hasMore = messages.length > 6

  return (
    <div className="transcript-preview">
      <div className="preview-header">
        <h4>Transcript Preview</h4>
        <span className="message-count">{messages.length} messages</span>
      </div>

      <div className={`preview-messages ${isExpanded ? 'expanded' : ''}`}>
        {displayMessages.map((msg, index) => {
          const isSeller = sellers.includes(msg.speaker)
          const role = msg.detectedRole || (isSeller ? 'seller' : 'prospect')

          return (
            <div
              key={index}
              className={`preview-message ${role === 'seller' ? 'seller-message' : 'prospect-message'}`}
            >
              <div className="message-speaker">
                <span className={`role-indicator ${role}`}>{role === 'seller' ? 'S' : 'P'}</span>
                <span className="speaker-name">{msg.speaker}</span>
              </div>
              <div className="message-content">
                {msg.content.length > 200 && !isExpanded
                  ? msg.content.slice(0, 200) + '...'
                  : msg.content}
              </div>
            </div>
          )
        })}

        {hasMore && !isExpanded && (
          <div className="preview-fade">
            <span>{messages.length - 6} more messages</span>
          </div>
        )}
      </div>

      {hasMore && (
        <button className="preview-toggle" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? (
            <>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="18 15 12 9 6 15" />
              </svg>
              Show less
            </>
          ) : (
            <>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
              Show all {messages.length} messages
            </>
          )}
        </button>
      )}
    </div>
  )
}
