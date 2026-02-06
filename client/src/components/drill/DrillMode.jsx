import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { Flashcard } from './Flashcard.jsx'
import { DrillProgress } from './DrillProgress.jsx'
import {
  flashcards,
  objectionFlashcards,
  mistakeFlashcards,
  competitorFlashcards,
  shuffleArray,
} from '../../data/flashcards.js'

// Filter options
const TRACK_OPTIONS = [
  { value: 'all', label: 'All Tracks' },
  { value: 'sales', label: 'Sales Discovery' },
  { value: 'technical', label: 'Technical Discovery' },
  { value: 'aiAgents', label: 'AI Agents Discovery' },
]

const TYPE_OPTIONS = [
  { value: 'all', label: 'All Types' },
  { value: 'golden', label: 'Golden Questions' },
  { value: 'discovery', label: 'Discovery Questions' },
  { value: 'objection', label: 'Objection Handlers' },
  { value: 'mistake', label: 'Common Mistakes' },
  { value: 'competitor', label: 'Competitor Handlers' },
]

function buildCardDeck(trackFilter, typeFilter) {
  let cards = []

  // Helper to add track context to cards
  const addTrackCards = (trackKey, trackData) => {
    if (trackFilter === 'all' || trackFilter === trackKey) {
      // Golden questions
      if (typeFilter === 'all' || typeFilter === 'golden') {
        cards.push(
          ...trackData.golden.map((card) => ({
            ...card,
            type: 'golden',
            track: trackKey,
          }))
        )
      }

      // Discovery questions
      if (typeFilter === 'all' || typeFilter === 'discovery') {
        cards.push(
          ...trackData.discovery.map((card) => ({
            ...card,
            type: 'discovery',
            track: trackKey,
          }))
        )
      }
    }
  }

  // Add track-specific cards
  if (flashcards.sales) addTrackCards('sales', flashcards.sales)
  if (flashcards.technical) addTrackCards('technical', flashcards.technical)
  if (flashcards.aiAgents) addTrackCards('aiAgents', flashcards.aiAgents)

  // Add objection cards (not track-specific)
  if (typeFilter === 'all' || typeFilter === 'objection') {
    cards.push(
      ...objectionFlashcards.map((card) => ({
        ...card,
        type: 'objection',
      }))
    )
  }

  // Add mistake cards (not track-specific)
  if (typeFilter === 'all' || typeFilter === 'mistake') {
    cards.push(
      ...mistakeFlashcards.map((card) => ({
        ...card,
        type: 'mistake',
      }))
    )
  }

  // Add competitor handler cards
  if (typeFilter === 'all' || typeFilter === 'competitor') {
    Object.entries(competitorFlashcards).forEach(([competitorKey, handlers]) => {
      cards.push(
        ...handlers.map((card) => ({
          ...card,
          type: 'competitor',
          competitor: competitorKey,
        }))
      )
    })
  }

  return cards
}

export function DrillMode() {
  const [trackFilter, setTrackFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [deck, setDeck] = useState([])

  // Build initial deck
  useEffect(() => {
    const newDeck = buildCardDeck(trackFilter, typeFilter)
    setDeck(newDeck)
    setCurrentIndex(0)
    setIsFlipped(false)
  }, [trackFilter, typeFilter])

  // Current card
  const currentCard = deck[currentIndex] || null

  // Navigation handlers
  const goToNext = useCallback(() => {
    if (currentIndex < deck.length - 1) {
      setCurrentIndex((prev) => prev + 1)
      setIsFlipped(false)
    }
  }, [currentIndex, deck.length])

  const goToPrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
      setIsFlipped(false)
    }
  }, [currentIndex])

  const handleShuffle = useCallback(() => {
    setDeck((prev) => shuffleArray(prev))
    setCurrentIndex(0)
    setIsFlipped(false)
  }, [])

  const handleRestart = useCallback(() => {
    setCurrentIndex(0)
    setIsFlipped(false)
  }, [])

  const handleFlip = useCallback(() => {
    setIsFlipped((prev) => !prev)
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't handle if user is typing in an input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return
      }

      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault()
          goToNext()
          break
        case 'ArrowLeft':
          e.preventDefault()
          goToPrev()
          break
        case ' ':
        case 'Enter':
          e.preventDefault()
          handleFlip()
          break
        case 'r':
        case 'R':
          if (!e.ctrlKey && !e.metaKey) {
            handleRestart()
          }
          break
        case 's':
        case 'S':
          if (!e.ctrlKey && !e.metaKey) {
            handleShuffle()
          }
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goToNext, goToPrev, handleFlip, handleRestart, handleShuffle])

  // Stats for display
  const stats = useMemo(() => {
    const byType = {}
    deck.forEach((card) => {
      byType[card.type] = (byType[card.type] || 0) + 1
    })
    return byType
  }, [deck])

  if (deck.length === 0) {
    return (
      <div className="drill-mode">
        <div className="drill-empty">
          <h2>No Cards Available</h2>
          <p>Try adjusting your filters to see more cards.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="drill-mode">
      <div className="drill-header">
        <div className="drill-title">
          <h1>Drill Mode</h1>
          <p>Practice your discovery questions with flashcards</p>
        </div>
        <div className="drill-filters">
          <div className="drill-filter">
            <label htmlFor="track-filter">Track</label>
            <select
              id="track-filter"
              value={trackFilter}
              onChange={(e) => setTrackFilter(e.target.value)}
            >
              {TRACK_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div className="drill-filter">
            <label htmlFor="type-filter">Type</label>
            <select
              id="type-filter"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              {TYPE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="drill-stats">
        <span className="drill-stat">{deck.length} cards</span>
        {Object.entries(stats).map(([type, count]) => (
          <span key={type} className={`drill-stat-badge ${type}`}>
            {count} {type}
          </span>
        ))}
      </div>

      <div className="drill-card-container">
        {currentCard && <Flashcard card={currentCard} isFlipped={isFlipped} onFlip={handleFlip} />}
      </div>

      <DrillProgress
        current={currentIndex + 1}
        total={deck.length}
        onPrev={goToPrev}
        onNext={goToNext}
        onShuffle={handleShuffle}
        onRestart={handleRestart}
        canGoPrev={currentIndex > 0}
        canGoNext={currentIndex < deck.length - 1}
      />
    </div>
  )
}
