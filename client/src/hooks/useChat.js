import { useState, useCallback, useRef, useEffect } from 'react'

export function useChat() {
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef(null)
  const messagesEndRef = useRef(null)

  // Auto-scroll to bottom when messages change
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  // Focus input
  const focusInput = useCallback(() => {
    inputRef.current?.focus()
  }, [])

  // Handle input change
  const handleInputChange = useCallback((e) => {
    setInputValue(e.target.value)
  }, [])

  // Clear input
  const clearInput = useCallback(() => {
    setInputValue('')
  }, [])

  // Insert text at cursor position
  const insertText = useCallback(
    (text) => {
      setInputValue(text)
      focusInput()
    },
    [focusInput]
  )

  return {
    inputValue,
    setInputValue,
    inputRef,
    messagesEndRef,
    scrollToBottom,
    focusInput,
    handleInputChange,
    clearInput,
    insertText,
  }
}
