import React from 'react'
import { Avatar } from '../common/Avatar.jsx'

export function ChatMessage({ message, stakeholder, isStreaming }) {
  const isUser = message.role === 'user'

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div
      className={`chat-message ${isUser ? 'user' : 'assistant'} ${isStreaming ? 'streaming' : ''}`}
    >
      {!isUser && (
        <div className="message-avatar">
          <Avatar icon={stakeholder?.avatar || 'user'} size="small" />
        </div>
      )}

      <div className="message-content">
        {!isUser && (
          <div className="message-header">
            <span className="message-sender">{stakeholder?.title || 'Stakeholder'}</span>
            {message.timestamp && (
              <span className="message-timestamp">{formatTime(message.timestamp)}</span>
            )}
          </div>
        )}

        <div className="message-bubble">
          <p>{message.content}</p>
          {isStreaming && (
            <span className="streaming-cursor" aria-label="AI is typing">
              ▋
            </span>
          )}
        </div>

        {isUser && message.timestamp && (
          <div className="message-timestamp">{formatTime(message.timestamp)}</div>
        )}
      </div>

      {isUser && (
        <div className="message-avatar">
          <div className="avatar avatar-small user-avatar-circle">
            <span>You</span>
          </div>
        </div>
      )}
    </div>
  )
}
