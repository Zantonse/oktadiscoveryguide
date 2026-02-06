import React, { useState, useMemo } from 'react'
import { useSession } from '../../contexts/SessionContext.jsx'
import { Button } from '../common/Button.jsx'
import {
  areaToProductMap,
  getProductByName,
  aiSecurityProducts,
} from '../../data/aiSecurityProducts.js'

// Discovery areas for AI Security
const trackAreas = {
  aiAgents: {
    name: 'AI Security Discovery',
    areas: [
      {
        id: 'ai_initiatives',
        name: 'AI Initiatives',
        description: 'Current AI/GenAI projects and roadmap',
      },
      {
        id: 'agent_use_cases',
        name: 'Agent Use Cases',
        description: 'Customer service, copilots, autonomous agents',
      },
      {
        id: 'mcp_tool_access',
        name: 'MCP & Tool Access',
        description: 'Model Context Protocol and tool access patterns',
      },
      {
        id: 'security_concerns',
        name: 'Security Concerns',
        description: 'Data exposure, permissions, credential risks',
      },
      {
        id: 'governance_needs',
        name: 'Governance Needs',
        description: 'EU AI Act, SOC2, audit requirements',
      },
      { id: 'shadow_ai', name: 'Shadow AI', description: 'Ungoverned or unknown AI deployments' },
      {
        id: 'current_approach',
        name: 'Current Approach',
        description: 'How they handle AI auth today',
      },
      { id: 'timeline', name: 'Timeline', description: 'Pilot, production, scale timeline' },
      {
        id: 'decision_process',
        name: 'Decision Process',
        description: 'CISO, CTO, Platform team ownership',
      },
    ],
  },
}

export function ReportCard() {
  const {
    reportCard,
    interestLevel,
    resetSession,
    selectedTrack,
    discoveredAreas,
    discoveryProgress,
    phase,
    messages,
  } = useSession()
  const [showFlowGuide, setShowFlowGuide] = useState(false)
  const [copied, setCopied] = useState(false)

  // Analyze solution bridging - which products were mentioned and if they were relevant
  const solutionBridgingAnalysis = useMemo(() => {
    if (phase !== 'bridge') return null

    // Get relevant products based on discovered areas
    const relevantProducts = new Set()
    discoveredAreas.forEach((area) => {
      const products = areaToProductMap[area] || []
      products.forEach((p) => relevantProducts.add(p))
    })

    // Get all product names for matching
    const allProductNames = aiSecurityProducts.flatMap((p) => [
      p.name.toLowerCase(),
      p.shortName.toLowerCase(),
      p.id.toLowerCase(),
    ])

    // Find products mentioned in user messages
    const userMessages = messages
      .filter((m) => m.role === 'user')
      .map((m) => m.content.toLowerCase())
    const mentionedProducts = new Set()

    aiSecurityProducts.forEach((product) => {
      const patterns = [
        product.name.toLowerCase(),
        product.shortName.toLowerCase(),
        product.id.replace(/-/g, ' '),
      ]

      for (const msg of userMessages) {
        for (const pattern of patterns) {
          if (msg.includes(pattern)) {
            mentionedProducts.add(product.shortName)
            break
          }
        }
      }
    })

    // Categorize mentioned products
    const relevantMentioned = []
    const irrelevantMentioned = []

    mentionedProducts.forEach((productName) => {
      if (relevantProducts.has(productName)) {
        relevantMentioned.push(productName)
      } else {
        irrelevantMentioned.push(productName)
      }
    })

    // Calculate score
    const relevantCount = relevantMentioned.length
    const irrelevantCount = irrelevantMentioned.length
    const totalRelevant = relevantProducts.size

    let score = 0
    if (totalRelevant > 0) {
      // Points for mentioning relevant products
      score += Math.round((relevantCount / totalRelevant) * 60)
    }
    // Bonus for not mentioning irrelevant products
    if (irrelevantCount === 0 && relevantCount > 0) {
      score += 20
    }
    // Bonus for mentioning multiple relevant products
    if (relevantCount >= 2) {
      score += 20
    } else if (relevantCount === 1) {
      score += 10
    }
    // Penalty for irrelevant products
    score -= irrelevantCount * 10

    score = Math.max(0, Math.min(100, score))
    const grade =
      score >= 80 ? 'A' : score >= 60 ? 'B' : score >= 40 ? 'C' : score >= 20 ? 'D' : 'F'

    return {
      score,
      grade,
      relevantProducts: Array.from(relevantProducts),
      relevantMentioned,
      irrelevantMentioned,
      summary:
        relevantCount > 0
          ? `Referenced ${relevantCount} relevant product${relevantCount > 1 ? 's' : ''} for discovered pain points.`
          : 'No relevant products were mentioned during solution positioning.',
    }
  }, [phase, discoveredAreas, messages])

  if (!reportCard) return null

  const handleCopyReport = async () => {
    const trackConfig = trackAreas[selectedTrack] || trackAreas.aiAgents
    const coveredCount = discoveredAreas.length
    const totalAreas = trackConfig.areas.length
    const coveragePercent = Math.round((coveredCount / totalAreas) * 100)

    const reportText = `
DISCOVERY SESSION REPORT CARD
=============================
Track: ${trackConfig.name}
Grade: ${reportCard.grade} (${reportCard.score}/100)
Final Interest Level: ${interestLevel}/10

SUMMARY
-------
${reportCard.summary}

DISCOVERY COVERAGE: ${coveragePercent}% (${coveredCount}/${totalAreas} areas)
${trackConfig.areas
  .map((area) => {
    const isDiscovered = discoveredAreas.includes(area.id)
    return `${isDiscovered ? '✓' : '○'} ${area.name}: ${area.description}`
  })
  .join('\n')}

STRENGTHS
---------
${reportCard.strengths?.map((s) => `• ${s}`).join('\n') || 'None identified'}

AREAS TO IMPROVE
----------------
${reportCard.improvements?.map((s) => `• ${s}`).join('\n') || 'None identified'}

${
  reportCard.goldenQuestions?.length > 0
    ? `GOLDEN QUESTIONS
----------------
${reportCard.goldenQuestions.map((q) => `• "${q}..."`).join('\n')}
`
    : ''
}
TIPS FOR NEXT TIME
------------------
${reportCard.tips?.map((s) => `• ${s}`).join('\n') || 'None'}

---
Generated by AI Security Discovery Guide
`.trim()

    try {
      await navigator.clipboard.writeText(reportText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const gradeColors = {
    A: '#10b981',
    B: '#22c55e',
    C: '#f59e0b',
    D: '#f97316',
    F: '#ef4444',
  }

  const gradeColor = gradeColors[reportCard.grade] || '#64748b'
  const trackConfig = trackAreas[selectedTrack] || trackAreas.aiAgents
  const coveredCount = discoveredAreas.length
  const totalAreas = trackConfig.areas.length
  const coveragePercent = Math.round((coveredCount / totalAreas) * 100)

  return (
    <div className="report-card-overlay">
      <div className="report-card">
        <div className="report-card-header">
          <h2>Session Report Card</h2>
          <p className="report-subtitle">Discovery Conversation Analysis</p>
        </div>

        <div className="report-grade-section">
          <div className="report-grade" style={{ backgroundColor: gradeColor }}>
            {reportCard.grade}
          </div>
          <div className="report-score">
            <span className="score-value">{reportCard.score}</span>
            <span className="score-label">/100</span>
          </div>
          <div className="report-interest">
            <span className="interest-label">Final Interest:</span>
            <span className="interest-value">{interestLevel}/10</span>
          </div>
        </div>

        <p className="report-summary">{reportCard.summary}</p>

        {/* Discovery Coverage Section */}
        <div className="report-section coverage">
          <h3>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 3v18h18" />
              <path d="M18 17V9" />
              <path d="M13 17V5" />
              <path d="M8 17v-3" />
            </svg>
            Discovery Coverage
          </h3>
          <div className="coverage-summary">
            <div className="coverage-stat">
              <span className="coverage-percent">{coveragePercent}%</span>
              <span className="coverage-label">Areas Covered</span>
            </div>
            <div className="coverage-bar-container">
              <div className="coverage-bar" style={{ width: `${coveragePercent}%` }} />
            </div>
            <span className="coverage-count">
              {coveredCount} of {totalAreas} areas
            </span>
          </div>
          <button className="flow-guide-toggle" onClick={() => setShowFlowGuide(!showFlowGuide)}>
            {showFlowGuide ? 'Hide Details' : 'Show Details'}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points={showFlowGuide ? '18 15 12 9 6 15' : '6 9 12 15 18 9'} />
            </svg>
          </button>

          {showFlowGuide && (
            <div className="flow-guide-details">
              <div className="flow-guide-track-name">{trackConfig.name}</div>
              <div className="flow-guide-areas">
                {trackConfig.areas.map((area) => {
                  const isDiscovered = discoveredAreas.includes(area.id)
                  return (
                    <div
                      key={area.id}
                      className={`flow-guide-area ${isDiscovered ? 'discovered' : 'missed'}`}
                    >
                      <div className="area-status">
                        {isDiscovered ? (
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                            <polyline points="22 4 12 14.01 9 11.01" />
                          </svg>
                        ) : (
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <line x1="15" y1="9" x2="9" y2="15" />
                            <line x1="9" y1="9" x2="15" y2="15" />
                          </svg>
                        )}
                      </div>
                      <div className="area-info">
                        <span className="area-name">{area.name}</span>
                        <span className="area-desc">{area.description}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        <div className="report-section">
          <h3>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            Strengths
          </h3>
          <ul>
            {reportCard.strengths?.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>

        <div className="report-section">
          <h3>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            Areas to Improve
          </h3>
          <ul>
            {reportCard.improvements?.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>

        {/* Discovery Flow Analysis */}
        {(reportCard.discoveryFlowFeedback || reportCard.flowAnalysis) && (
          <div className="report-section flow-analysis">
            <h3>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
              Discovery Flow
            </h3>
            {reportCard.discoveryFlowFeedback && (
              <p className="flow-feedback">{reportCard.discoveryFlowFeedback}</p>
            )}
            {reportCard.flowAnalysis && (
              <div className="flow-details">
                <div className="flow-score">
                  <span className="flow-score-label">Flow Score:</span>
                  <span
                    className={`flow-score-value ${reportCard.flowAnalysis.score >= 70 ? 'good' : 'needs-work'}`}
                  >
                    {reportCard.flowAnalysis.score}/100
                  </span>
                </div>
                {reportCard.flowAnalysis.issues?.length > 0 && (
                  <div className="flow-issues">
                    <span className="issues-label">Flow Issues:</span>
                    <ul>
                      {reportCard.flowAnalysis.issues.map((issue, i) => (
                        <li key={i}>{issue}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {reportCard.flowAnalysis.goodTransitions?.length > 0 && (
                  <div className="flow-good">
                    <span className="good-label">Good Transitions:</span>
                    <ul>
                      {reportCard.flowAnalysis.goodTransitions.slice(0, 3).map((t, i) => (
                        <li key={i}>{t}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
            {reportCard.discoveryOrder?.length > 0 && (
              <div className="discovery-order">
                <span className="order-label">Your Discovery Path:</span>
                <div className="order-flow">
                  {reportCard.discoveryOrder.map((area, i) => (
                    <span key={area} className="order-item">
                      {area.replace(/_/g, ' ')}
                      {i < reportCard.discoveryOrder.length - 1 && (
                        <span className="order-arrow">→</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Golden Questions */}
        {(reportCard.goldenQuestionsFeedback || reportCard.goldenQuestions?.length > 0) && (
          <div className="report-section golden-questions">
            <h3>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              Golden Questions
            </h3>
            {reportCard.goldenQuestionsFeedback && (
              <p className="golden-feedback">{reportCard.goldenQuestionsFeedback}</p>
            )}
            {reportCard.goldenQuestions?.length > 0 && (
              <div className="golden-list">
                <span className="golden-label">High-impact questions you asked:</span>
                <ul>
                  {reportCard.goldenQuestions.map((q, i) => (
                    <li key={i}>"{q}..."</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Solution Bridging - only shown if user entered bridge mode */}
        {solutionBridgingAnalysis && (
          <div className="report-section solution-bridging">
            <h3>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>
              Solution Bridging
            </h3>
            <div className="solution-bridging-score">
              <div className="solution-bridging-grade">{solutionBridgingAnalysis.grade}</div>
              <div className="solution-bridging-details">
                <p className="solution-bridging-summary">{solutionBridgingAnalysis.summary}</p>
                <div className="products-mentioned">
                  {solutionBridgingAnalysis.relevantMentioned.length > 0 && (
                    <>
                      <span className="products-mentioned-label">Relevant:</span>
                      {solutionBridgingAnalysis.relevantMentioned.map((name) => {
                        const product = getProductByName(name)
                        return (
                          <span key={name} className="product-mentioned-badge relevant">
                            <span
                              className="product-dot"
                              style={{ backgroundColor: product?.color || '#10b981' }}
                            />
                            {name}
                          </span>
                        )
                      })}
                    </>
                  )}
                  {solutionBridgingAnalysis.irrelevantMentioned.length > 0 && (
                    <>
                      <span className="products-mentioned-label" style={{ marginLeft: '8px' }}>
                        Off-topic:
                      </span>
                      {solutionBridgingAnalysis.irrelevantMentioned.map((name) => {
                        const product = getProductByName(name)
                        return (
                          <span key={name} className="product-mentioned-badge irrelevant">
                            <span
                              className="product-dot"
                              style={{ backgroundColor: product?.color || '#ef4444' }}
                            />
                            {name}
                          </span>
                        )
                      })}
                    </>
                  )}
                </div>
              </div>
            </div>
            {solutionBridgingAnalysis.relevantProducts.length > 0 &&
              solutionBridgingAnalysis.relevantMentioned.length === 0 && (
                <div className="solution-bridging-tip">
                  <strong>Tip:</strong> Based on discovered pain points, relevant products were:{' '}
                  {solutionBridgingAnalysis.relevantProducts.join(', ')}
                </div>
              )}
          </div>
        )}

        <div className="report-section tips">
          <h3>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            Tips for Next Time
          </h3>
          <ul>
            {reportCard.tips?.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>

        <div className="report-actions">
          <button className="btn-copy-report" onClick={handleCopyReport}>
            {copied ? (
              <>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                </svg>
                Copy Report
              </>
            )}
          </button>
          <Button variant="primary" size="large" onClick={resetSession}>
            Try Again
          </Button>
        </div>
      </div>
    </div>
  )
}
