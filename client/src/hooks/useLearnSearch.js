import { useState, useEffect, useMemo, useCallback } from 'react'
import {
  discoveryFundamentals,
  discoveryFramework,
  goldenQuestions,
  stakeholderPsychology,
  competitorGuide,
  scenarioPlaybooks,
} from '../data/learningContent.js'

// Build a searchable index from all learning content
function buildSearchIndex() {
  const index = []

  // Index Discovery Fundamentals
  discoveryFundamentals.sections.forEach((section) => {
    // Section content
    index.push({
      id: `fundamentals-${section.id}`,
      type: 'fundamentals',
      topic: 'fundamentals',
      topicName: 'Discovery Fundamentals',
      sectionId: section.id,
      title: section.title,
      content: section.content,
      searchText: `${section.title} ${section.content}`.toLowerCase(),
    })

    // Key points
    if (section.keyPoints) {
      section.keyPoints.forEach((point, idx) => {
        index.push({
          id: `fundamentals-${section.id}-keypoint-${idx}`,
          type: 'keypoint',
          topic: 'fundamentals',
          topicName: 'Discovery Fundamentals',
          sectionId: section.id,
          title: section.title,
          content: point,
          searchText: point.toLowerCase(),
        })
      })
    }

    // Mistakes
    if (section.mistakes) {
      section.mistakes.forEach((mistake, idx) => {
        index.push({
          id: `fundamentals-${section.id}-mistake-${idx}`,
          type: 'mistake',
          topic: 'fundamentals',
          topicName: 'Discovery Fundamentals',
          sectionId: section.id,
          title: mistake.mistake,
          content: `${mistake.why} Instead: ${mistake.instead}`,
          searchText: `${mistake.mistake} ${mistake.why} ${mistake.instead}`.toLowerCase(),
        })
      })
    }
  })

  // Index Discovery Framework (all tracks)
  Object.entries(discoveryFramework.tracks).forEach(([trackKey, track]) => {
    track.areas.forEach((area) => {
      // Area description
      index.push({
        id: `framework-${trackKey}-${area.id}`,
        type: 'framework-area',
        topic: 'framework',
        topicName: 'Discovery Framework',
        track: trackKey,
        trackName: track.name,
        sectionId: area.id,
        title: area.name,
        content: area.description,
        searchText: `${track.name} ${area.name} ${area.description}`.toLowerCase(),
      })

      // Questions
      area.questions.forEach((question, idx) => {
        index.push({
          id: `framework-${trackKey}-${area.id}-q-${idx}`,
          type: 'framework-question',
          topic: 'framework',
          topicName: 'Discovery Framework',
          track: trackKey,
          trackName: track.name,
          sectionId: area.id,
          title: area.name,
          content: question,
          searchText: `${track.name} ${area.name} ${question}`.toLowerCase(),
        })
      })

      // Signals
      area.signals.forEach((signal, idx) => {
        index.push({
          id: `framework-${trackKey}-${area.id}-signal-${idx}`,
          type: 'framework-signal',
          topic: 'framework',
          topicName: 'Discovery Framework',
          track: trackKey,
          trackName: track.name,
          sectionId: area.id,
          title: `${area.name} - Signal`,
          content: signal,
          searchText: `${track.name} ${area.name} signal ${signal}`.toLowerCase(),
        })
      })
    })
  })

  // Index Golden Questions
  Object.entries(goldenQuestions.tracks).forEach(([trackKey, track]) => {
    track.questions.forEach((q, idx) => {
      index.push({
        id: `golden-${trackKey}-${idx}`,
        type: 'golden-question',
        topic: 'golden-questions',
        topicName: 'Golden Questions',
        track: trackKey,
        title: 'Golden Question',
        content: q.question,
        why: q.why,
        searchText: `${trackKey} ${q.question} ${q.why} ${q.unlocks.join(' ')}`.toLowerCase(),
      })
    })
  })

  // Index Stakeholder Psychology
  stakeholderPsychology.sections.forEach((section) => {
    // Interest levels
    if (section.levels) {
      section.levels.forEach((level) => {
        index.push({
          id: `psychology-level-${level.range}`,
          type: 'psychology-level',
          topic: 'psychology',
          topicName: 'Stakeholder Psychology',
          sectionId: section.id,
          title: `Interest Level ${level.range}: ${level.label}`,
          content: level.behaviors.join('. '),
          response: level.response,
          searchText: `${level.label} ${level.behaviors.join(' ')} ${level.response}`.toLowerCase(),
        })
      })
    }

    // Behaviors (what increases/decreases interest)
    if (section.behaviors) {
      section.behaviors.forEach((behavior, idx) => {
        index.push({
          id: `psychology-${section.id}-behavior-${idx}`,
          type: 'psychology-behavior',
          topic: 'psychology',
          topicName: 'Stakeholder Psychology',
          sectionId: section.id,
          sectionTitle: section.title,
          title: behavior.behavior,
          content: behavior.why,
          example: behavior.example,
          searchText:
            `${section.title} ${behavior.behavior} ${behavior.why} ${behavior.example || ''}`.toLowerCase(),
        })
      })
    }

    // Buying signals
    if (section.signals) {
      section.signals.forEach((signal, idx) => {
        index.push({
          id: `psychology-signal-${idx}`,
          type: 'psychology-signal',
          topic: 'psychology',
          topicName: 'Stakeholder Psychology',
          sectionId: section.id,
          title: signal.signal,
          content: signal.meaning,
          examples: signal.examples,
          searchText:
            `${signal.signal} ${signal.meaning} ${signal.examples.join(' ')}`.toLowerCase(),
        })
      })
    }

    // Objections
    if (section.objections) {
      section.objections.forEach((obj, idx) => {
        index.push({
          id: `psychology-objection-${idx}`,
          type: 'psychology-objection',
          topic: 'psychology',
          topicName: 'Stakeholder Psychology',
          sectionId: section.id,
          title: obj.objection,
          content: obj.meaning,
          response: obj.response,
          searchText: `${obj.objection} ${obj.meaning} ${obj.response}`.toLowerCase(),
        })
      })
    }
  })

  // Index Competitor Guide
  Object.entries(competitorGuide.categories).forEach(([categoryKey, category]) => {
    // Handle categories with competitors (like 'ai')
    if (category.competitors) {
      category.competitors.forEach((competitor) => {
        // Build differentiators text from oktaAdvantages and auth0Advantages
        const oktaAdvantagesText = competitor.oktaAdvantages
          ? competitor.oktaAdvantages.join(' ')
          : ''
        const auth0AdvantagesText = competitor.auth0Advantages
          ? competitor.auth0Advantages.join(' ')
          : ''
        const differentiatorsText = competitor.differentiators
          ? competitor.differentiators.join(' ')
          : ''
        const allAdvantages = `${oktaAdvantagesText} ${auth0AdvantagesText} ${differentiatorsText}`

        // Main competitor entry
        index.push({
          id: `competitor-${categoryKey}-${competitor.name}`,
          type: 'competitor',
          topic: 'competitors',
          topicName: 'Competitive Intelligence',
          category: categoryKey,
          categoryName: category.name,
          title: competitor.name,
          competitorType: competitor.type,
          content: `Strengths: ${competitor.strengths.join(', ')}. Weaknesses: ${competitor.weaknesses.join(', ')}`,
          oktaAdvantages: competitor.oktaAdvantages,
          auth0Advantages: competitor.auth0Advantages,
          searchText:
            `${competitor.name} ${competitor.type} ${competitor.strengths.join(' ')} ${competitor.weaknesses.join(' ')} ${allAdvantages}`.toLowerCase(),
        })

        // Handlers
        Object.entries(competitor.handlers).forEach(([objection, response], idx) => {
          index.push({
            id: `competitor-${categoryKey}-${competitor.name}-handler-${idx}`,
            type: 'competitor-handler',
            topic: 'competitors',
            topicName: 'Competitive Intelligence',
            category: categoryKey,
            competitorName: competitor.name,
            title: objection,
            content: response,
            searchText: `${competitor.name} ${objection} ${response}`.toLowerCase(),
          })
        })
      })
    }

    // Handle categories with positioning scenarios (like 'oktaVsAuth0')
    if (category.positioning) {
      category.positioning.forEach((scenario, idx) => {
        index.push({
          id: `positioning-${categoryKey}-${idx}`,
          type: 'positioning',
          topic: 'competitors',
          topicName: 'Competitive Intelligence',
          category: categoryKey,
          categoryName: category.name,
          title: scenario.scenario,
          content: scenario.description,
          recommendation: scenario.recommendation,
          products: scenario.products,
          reasoning: scenario.reasoning,
          buyer: scenario.buyer,
          searchText:
            `${scenario.scenario} ${scenario.description} ${scenario.recommendation} ${scenario.products.join(' ')} ${scenario.reasoning} ${scenario.buyer}`.toLowerCase(),
        })
      })
    }
  })

  // Index Scenario Playbooks
  Object.entries(scenarioPlaybooks.tracks).forEach(([trackKey, track]) => {
    track.scenarios.forEach((scenario) => {
      index.push({
        id: `playbook-${trackKey}-${scenario.id}`,
        type: 'playbook',
        topic: 'playbooks',
        topicName: 'Scenario Playbooks',
        track: trackKey,
        trackName: track.name,
        title: scenario.name,
        content: scenario.description,
        tips: scenario.tips,
        avoid: scenario.avoid,
        probeAreas: scenario.probeAreas,
        searchText:
          `${track.name} ${scenario.name} ${scenario.description} ${scenario.tips.join(' ')} ${scenario.avoid.join(' ')} ${scenario.probeAreas.join(' ')}`.toLowerCase(),
      })
    })
  })

  return index
}

// Debounce helper
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}

// Highlight matching text
function highlightMatch(text, query) {
  if (!query || !text) return text

  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(`(${escapedQuery})`, 'gi')
  const parts = text.split(regex)

  return parts.map((part, i) =>
    regex.test(part) ? { text: part, highlight: true } : { text: part, highlight: false }
  )
}

export function useLearnSearch() {
  const [query, setQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)

  const debouncedQuery = useDebounce(query, 300)

  // Build search index once
  const searchIndex = useMemo(() => buildSearchIndex(), [])

  /**
   * Perform full-text search across all learning content with relevance scoring.
   *
   * Scoring Algorithm:
   * - Exact match in title: +100 points (highest priority - user likely looking for this specific topic)
   * - Exact phrase match in content: +50 points (full query appears together in content)
   * - Individual term in title: +20 points per term (title matches are more relevant than body)
   * - Individual term in content: +10 points per term (baseline relevance)
   * - Type boosts: Golden questions (x1.2), objections (x1.1), competitor handlers (x1.1)
   *
   * The scoring prioritizes exact matches and title matches to surface the most relevant content first.
   * Multiple term matches accumulate points, so content matching more query terms ranks higher.
   */
  const results = useMemo(() => {
    if (!debouncedQuery || debouncedQuery.length < 2) {
      return []
    }

    const queryLower = debouncedQuery.toLowerCase()
    const queryTerms = queryLower.split(/\s+/).filter((t) => t.length > 1)

    // Score and filter results
    const scored = searchIndex
      .map((item) => {
        let score = 0

        // Exact match in title (highest priority - +100 points)
        // User likely searching for this specific topic or section
        if (item.title.toLowerCase().includes(queryLower)) {
          score += 100
        }

        // Exact phrase match in content (+50 points)
        // Full query appears together, indicating strong relevance
        if (item.searchText.includes(queryLower)) {
          score += 50
        }

        // Individual term matches (accumulate across all terms)
        queryTerms.forEach((term) => {
          // Term in title: +20 points (titles are more important than body text)
          if (item.title.toLowerCase().includes(term)) {
            score += 20
          }
          // Term in content: +10 points (baseline relevance)
          if (item.searchText.includes(term)) {
            score += 10
          }
        })

        // Boost high-value content types
        // Golden questions are critical learning content
        if (item.type === 'golden-question') score *= 1.2
        // Objections and competitor handlers are practical, immediately actionable
        if (item.type === 'psychology-objection') score *= 1.1
        if (item.type === 'competitor-handler') score *= 1.1

        return { ...item, score }
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 15) // Limit to top 15 results for performance and UI clarity

    // Add highlighted content
    return scored.map((item) => ({
      ...item,
      highlightedTitle: highlightMatch(item.title, debouncedQuery),
      highlightedContent: highlightMatch(
        item.content.length > 150 ? item.content.substring(0, 150) + '...' : item.content,
        debouncedQuery
      ),
    }))
  }, [debouncedQuery, searchIndex])

  // Track searching state
  useEffect(() => {
    if (query !== debouncedQuery) {
      setIsSearching(true)
    } else {
      setIsSearching(false)
    }
  }, [query, debouncedQuery])

  const clearSearch = useCallback(() => {
    setQuery('')
  }, [])

  return {
    query,
    setQuery,
    results,
    isSearching,
    clearSearch,
    hasResults: results.length > 0,
    hasQuery: query.length > 0,
  }
}
