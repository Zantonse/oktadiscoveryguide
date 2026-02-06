import React, { useState, useCallback, useEffect } from 'react'
import { learningTopics } from '../../data/learningContent.js'
import { DiscoveryFundamentals } from './DiscoveryFundamentals.jsx'
import { DiscoveryFramework } from './DiscoveryFramework.jsx'
import { GoldenQuestions } from './GoldenQuestions.jsx'
import { StakeholderPsychology } from './StakeholderPsychology.jsx'
import { CompetitorGuide } from './CompetitorGuide.jsx'
import { ScenarioPlaybooks } from './ScenarioPlaybooks.jsx'
import { LearnSearch } from './LearnSearch.jsx'
import { useLearnSearch } from '../../hooks/useLearnSearch.js'

const TopicIcon = ({ icon }) => {
  const icons = {
    compass: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      </svg>
    ),
    map: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
        <line x1="8" y1="2" x2="8" y2="18" />
        <line x1="16" y1="6" x2="16" y2="22" />
      </svg>
    ),
    star: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    brain: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
        <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
        <path d="M12 5v13" />
        <path d="M9.5 8.5h5" />
        <path d="M8 13h8" />
      </svg>
    ),
    target: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
    book: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        <line x1="8" y1="6" x2="16" y2="6" />
        <line x1="8" y1="10" x2="14" y2="10" />
      </svg>
    ),
  }
  return icons[icon] || icons.book
}

export function LearnSection() {
  const [activeTopic, setActiveTopic] = useState('fundamentals')
  const [sidebarVisible, setSidebarVisible] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const search = useLearnSearch()

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Map topic names from search results to topic IDs
  const topicNameToId = {
    'Discovery Fundamentals': 'fundamentals',
    'Discovery Framework': 'framework',
    'Golden Questions': 'golden-questions',
    'Stakeholder Psychology': 'psychology',
    'Competitive Intelligence': 'competitors',
    'Scenario Playbooks': 'playbooks',
  }

  // Handle topic selection with auto-hide on mobile
  const handleTopicClick = useCallback(
    (topicId) => {
      setActiveTopic(topicId)

      // Auto-hide sidebar on mobile after selection
      if (isMobile) {
        setSidebarVisible(false)
      }
    },
    [isMobile]
  )

  const handleResultClick = useCallback(
    (result) => {
      // Navigate to the appropriate topic
      const topicId = result.topic || topicNameToId[result.topicName]
      if (topicId) {
        handleTopicClick(topicId)
      }
      // Clear the search after navigation
      search.clearSearch()
    },
    [search, handleTopicClick]
  )

  const renderContent = () => {
    switch (activeTopic) {
      case 'fundamentals':
        return <DiscoveryFundamentals />
      case 'framework':
        return <DiscoveryFramework />
      case 'golden-questions':
        return <GoldenQuestions />
      case 'psychology':
        return <StakeholderPsychology />
      case 'competitors':
        return <CompetitorGuide />
      case 'playbooks':
        return <ScenarioPlaybooks />
      default:
        return <DiscoveryFundamentals />
    }
  }

  return (
    <div className="learn-section">
      {/* Toggle button - only show when sidebar hidden on mobile */}
      {isMobile && !sidebarVisible && (
        <button
          className="learn-nav-toggle"
          onClick={() => setSidebarVisible(true)}
          aria-label="Show navigation"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
          <span>Topics</span>
        </button>
      )}

      <div className={`learn-sidebar ${!sidebarVisible ? 'collapsed' : ''}`}>
        <div className="learn-sidebar-header">
          <h2>Discovery Training</h2>
          <p>Master discovery conversations with these resources</p>
        </div>
        <LearnSearch
          query={search.query}
          setQuery={search.setQuery}
          results={search.results}
          isSearching={search.isSearching}
          clearSearch={search.clearSearch}
          onResultClick={handleResultClick}
        />
        <nav className="learn-nav">
          {learningTopics.map((topic) => (
            <button
              key={topic.id}
              className={`learn-nav-item ${activeTopic === topic.id ? 'active' : ''}`}
              onClick={() => handleTopicClick(topic.id)}
            >
              <span className="learn-nav-icon">
                <TopicIcon icon={topic.icon} />
              </span>
              <span className="learn-nav-text">{topic.name}</span>
              {activeTopic === topic.id && (
                <svg
                  className="learn-nav-arrow"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              )}
            </button>
          ))}
        </nav>
      </div>
      <div className="learn-content">{renderContent()}</div>
    </div>
  )
}
