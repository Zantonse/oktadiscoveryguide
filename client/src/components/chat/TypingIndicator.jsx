import React from 'react'
import { Avatar } from '../common/Avatar.jsx'

export function TypingIndicator({ stakeholder }) {
  return (
    <div className="chat-message assistant typing">
      <div className="message-avatar">
        <Avatar icon={stakeholder?.avatar || 'user'} size="small" />
      </div>

      <div className="message-content">
        <div className="message-header">
          <span className="message-sender">{stakeholder?.title || 'Stakeholder'}</span>
        </div>

        <div className="message-bubble typing-bubble">
          <div className="typing-dots">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>
      </div>
    </div>
  )
}
