import React, { useState, useRef, useEffect } from 'react';
import { useSession } from '../../contexts/SessionContext.jsx';

export function ChatInput() {
  const [inputValue, setInputValue] = useState('');
  const { sendMessage, isLoading, conversationEnded } = useSession();
  const inputRef = useRef(null);

  useEffect(() => {
    if (!conversationEnded) {
      inputRef.current?.focus();
    }
  }, [conversationEnded]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading || conversationEnded) return;

    sendMessage(inputValue.trim());
    setInputValue('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const isDisabled = isLoading || conversationEnded;

  return (
    <form className={`chat-input-container ${conversationEnded ? 'ended' : ''}`} onSubmit={handleSubmit}>
      {conversationEnded ? (
        <div className="conversation-ended-banner">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
          <span>Discovery session complete - view your report card above</span>
        </div>
      ) : (
        <>
          <div className="chat-input-wrapper">
            <textarea
              ref={inputRef}
              className="chat-input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              rows={1}
              disabled={isDisabled}
            />
            <button
              type="submit"
              className="send-button"
              disabled={!inputValue.trim() || isDisabled}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </div>
          <div className="input-hint">
            Press Enter to send, Shift+Enter for new line
          </div>
        </>
      )}
    </form>
  );
}

// Export a way to programmatically set input value
export function useChatInput() {
  const [externalValue, setExternalValue] = useState('');

  return {
    setInputValue: setExternalValue,
    externalValue
  };
}
