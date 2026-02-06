import React, { useState, useRef, useEffect } from 'react'
import { useSession } from '../../contexts/SessionContext.jsx'

export function ChatInput() {
  const [inputValue, setInputValue] = useState('')
  const { sendMessage, isLoading, conversationEnded } = useSession()
  const inputRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    if (!conversationEnded) {
      inputRef.current?.focus()
    }
  }, [conversationEnded])

  // Handle iOS keyboard resize using visualViewport API
  useEffect(() => {
    const viewport = window.visualViewport
    if (!viewport) return

    const handleResize = () => {
      // Calculate the keyboard height
      const keyboardHeight = window.innerHeight - viewport.height

      // Only adjust if keyboard is visible (height > 0) and on mobile
      if (keyboardHeight > 0 && window.innerWidth <= 768) {
        // Scroll the input into view when keyboard appears
        if (containerRef.current) {
          containerRef.current.style.paddingBottom = `${keyboardHeight}px`
        }
      } else {
        if (containerRef.current) {
          containerRef.current.style.paddingBottom = ''
        }
      }
    }

    viewport.addEventListener('resize', handleResize)
    return () => viewport.removeEventListener('resize', handleResize)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!inputValue.trim() || isLoading || conversationEnded) return

    sendMessage(inputValue.trim())
    setInputValue('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const isDisabled = isLoading || conversationEnded

  return (
    <form
      ref={containerRef}
      className={`chat-input-container ${conversationEnded ? 'ended' : ''}`}
      onSubmit={handleSubmit}
    >
      {conversationEnded ? (
        <div className="conversation-ended-banner">
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
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
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
              aria-label="Message input"
            />
            <button
              type="submit"
              className="send-button"
              disabled={!inputValue.trim() || isDisabled}
              aria-label="Send message"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
          <div className="input-hint">
            <span className="input-hint-desktop">
              Press Enter to send, Shift+Enter for new line
            </span>
            <span className="input-hint-mobile">Tap send button to send message</span>
          </div>
        </>
      )}
    </form>
  )
}

// Export a way to programmatically set input value
export function useChatInput() {
  const [externalValue, setExternalValue] = useState('')

  return {
    setInputValue: setExternalValue,
    externalValue,
  }
}
