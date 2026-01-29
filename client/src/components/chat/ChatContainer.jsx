import React, { useEffect, useRef } from 'react';
import { ChatMessage } from './ChatMessage.jsx';
import { ChatInput } from './ChatInput.jsx';
import { TypingIndicator } from './TypingIndicator.jsx';
import { useSession } from '../../contexts/SessionContext.jsx';

export function ChatContainer() {
  const {
    messages,
    isLoading,
    selectedStakeholder,
    selectedIndustry,
    coachingHint,
    streamingMessage,
    endConversation,
    conversationEnded
  } = useSession();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading, streamingMessage]);

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
          <button
            className="end-conversation-btn"
            onClick={endConversation}
            disabled={isLoading}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
            </svg>
            End Conversation
          </button>
        )}
        {conversationEnded && (
          <div className="conversation-ended-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            Session Complete
          </div>
        )}
      </div>

      <div className={`chat-messages ${conversationEnded ? 'greyed-out' : ''}`}>
        {messages.map(message => (
          <ChatMessage
            key={message.id}
            message={message}
            stakeholder={selectedStakeholder}
          />
        ))}

        {isLoading && streamingMessage !== null && (
          <ChatMessage
            message={{
              id: 'streaming',
              role: 'assistant',
              content: streamingMessage || '...',
              timestamp: new Date().toISOString()
            }}
            stakeholder={selectedStakeholder}
            isStreaming={true}
          />
        )}
        {isLoading && streamingMessage === null && <TypingIndicator stakeholder={selectedStakeholder} />}

        <div ref={messagesEndRef} />
      </div>

      {coachingHint && !isLoading && !conversationEnded && (
        <div className="coaching-hint">
          <div className="coaching-hint-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 16v-4"/>
              <path d="M12 8h.01"/>
            </svg>
          </div>
          <div className="coaching-hint-content">
            <span className="coaching-hint-label">Coach Tip</span>
            <p className="coaching-hint-text">{coachingHint}</p>
          </div>
        </div>
      )}

      <ChatInput />
    </div>
  );
}
