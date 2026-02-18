import React, { useState, useCallback } from 'react'
import { discoveryFramework } from '../../data/learningContent.js'
import { InteractiveFlow } from './InteractiveFlow.jsx'

function ChevronIcon({ expanded }) {
  return (
    <svg
      className={`ks-chevron ${expanded ? 'ks-chevron-expanded' : ''}`}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

function KeyPointsList({ points }) {
  return (
    <ul className="ks-key-points">
      {points.map((point, i) => (
        <li key={i}>{point}</li>
      ))}
    </ul>
  )
}

function AgentTypeCards({ items }) {
  return (
    <div className="ks-agent-types">
      {items.map((item, i) => (
        <div key={i} className="ks-agent-type-card">
          <h5 className="ks-agent-type-name">{item.name}</h5>
          <p className="ks-agent-type-desc">{item.description}</p>
          <div className="ks-identity-need">
            <span className="ks-identity-need-label">Identity need:</span>
            <span>{item.identityNeed}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

function ArchitectureLayers({ layers }) {
  return (
    <div className="ks-layers">
      {layers.map((layer, i) => (
        <div key={i} className="ks-layer-card">
          <div className="ks-layer-header">
            <span className="ks-layer-number">{i + 1}</span>
            <div>
              <h5 className="ks-layer-name">{layer.name}</h5>
              <span className="ks-layer-product">{layer.oktaProduct}</span>
            </div>
          </div>
          <p className="ks-layer-desc">{layer.description}</p>
          <p className="ks-layer-identity">{layer.identity}</p>
        </div>
      ))}
    </div>
  )
}

function ProductMappingTable({ mappings }) {
  return (
    <div className="ks-product-mappings">
      {mappings.map((m, i) => (
        <div key={i} className="ks-mapping-row">
          <div className="ks-mapping-challenge">{m.challenge}</div>
          <div className="ks-mapping-product">{m.product}</div>
          <div className="ks-mapping-solution">{m.solution}</div>
        </div>
      ))}
    </div>
  )
}

function ComparisonTable({ comparison }) {
  return (
    <div className="ks-comparison-table-wrapper">
      <table className="ks-comparison-table">
        <thead>
          <tr>
            <th>Capability</th>
            <th>Generative AI</th>
            <th>Agentic AI</th>
          </tr>
        </thead>
        <tbody>
          {comparison.map((row, i) => (
            <tr key={i}>
              <td className="ks-comparison-capability">{row.capability}</td>
              <td>{row.generative}</td>
              <td className="ks-comparison-agentic">{row.agentic}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function RiskCards({ risks }) {
  return (
    <div className="ks-risks">
      {risks.map((r, i) => (
        <div key={i} className="ks-risk-card">
          <div className="ks-risk-label">{r.risk}</div>
          <div className="ks-risk-approach">
            <span className="ks-risk-approach-label">Okta approach:</span>
            <span>{r.oktaApproach}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

function SubsectionContent({ subsection }) {
  if (subsection.keyPoints) return <KeyPointsList points={subsection.keyPoints} />
  if (subsection.items) return <AgentTypeCards items={subsection.items} />
  if (subsection.layers) return <ArchitectureLayers layers={subsection.layers} />
  if (subsection.mappings) return <ProductMappingTable mappings={subsection.mappings} />
  if (subsection.comparison) return <ComparisonTable comparison={subsection.comparison} />
  if (subsection.risks) return <RiskCards risks={subsection.risks} />
  return null
}

export function DiscoveryFramework() {
  const [activeTrack, setActiveTrack] = useState('aiAgents')
  const [showInteractiveFlow, setShowInteractiveFlow] = useState(true)
  const [expandedSubsections, setExpandedSubsections] = useState(new Set())
  const track = discoveryFramework.tracks[activeTrack]

  const toggleSubsection = useCallback((id) => {
    setExpandedSubsections((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }, [])

  const expandAll = useCallback((subsections) => {
    setExpandedSubsections(new Set(subsections.map((s) => s.id)))
  }, [])

  const collapseAll = useCallback(() => {
    setExpandedSubsections(new Set())
  }, [])

  return (
    <div className="learn-topic">
      <div className="learn-topic-header">
        <h1>{discoveryFramework.title}</h1>
        <p className="learn-topic-description">{discoveryFramework.description}</p>
      </div>

      <div className="learn-track-content">
        <div className="track-intro">
          <h2>{track.name}</h2>
          <p>{track.description}</p>
        </div>

        <div className="learn-card flow-card">
          <div className="flow-card-header">
            <div>
              <h3>Recommended Discovery Flow</h3>
              <p className="learn-card-subtitle">Follow this sequence for structured discovery</p>
            </div>
            <button
              className={`flow-toggle-btn ${showInteractiveFlow ? 'active' : ''}`}
              onClick={() => setShowInteractiveFlow(!showInteractiveFlow)}
            >
              {showInteractiveFlow ? 'Simple View' : 'Interactive View'}
            </button>
          </div>

          {showInteractiveFlow ? (
            <InteractiveFlow track={track} />
          ) : (
            <div className="discovery-flow">
              {track.flow.map((step, index) => {
                const area = track.areas.find((a) => a.id === step.area)
                return (
                  <div key={step.step} className="flow-step-item">
                    <div className="flow-step-number">{step.step}</div>
                    <div className="flow-step-info">
                      <span className="flow-step-area">{area?.name || step.area}</span>
                      <span className="flow-step-goal">{step.goal}</span>
                    </div>
                    {index < track.flow.length - 1 && (
                      <svg
                        className="flow-arrow"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <polyline points="19 12 12 19 5 12" />
                      </svg>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>

        <h3 className="areas-header">Discovery Areas</h3>
        <div className="discovery-areas">
          {track.areas.map((area) => (
            <div key={area.id} className="area-card">
              <div className="area-header">
                <h4>{area.name}</h4>
                <span className="area-id">{area.id}</span>
              </div>
              <p className="area-description">{area.description}</p>

              <div className="area-questions">
                <h5>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                  Suggested Questions
                </h5>
                <ul>
                  {area.questions.map((q, i) => (
                    <li key={i}>{q}</li>
                  ))}
                </ul>
              </div>

              {area.signals && (
                <div className="area-signals">
                  <h5>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                    </svg>
                    Positive Signals
                  </h5>
                  <ul>
                    {area.signals.map((signal, i) => (
                      <li key={i}>{signal}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {track.knowledgeSections?.map((section) => (
          <div key={section.id} className="ks-section">
            <div className="ks-section-header">
              <div>
                <h3 className="ks-section-title">{section.title}</h3>
                <p className="ks-section-description">{section.description}</p>
              </div>
              <div className="ks-section-actions">
                <button
                  className="ks-expand-all-btn"
                  onClick={() =>
                    expandedSubsections.size === section.subsections.length
                      ? collapseAll()
                      : expandAll(section.subsections)
                  }
                >
                  {expandedSubsections.size === section.subsections.length
                    ? 'Collapse All'
                    : 'Expand All'}
                </button>
              </div>
            </div>

            <div className="ks-subsections">
              {section.subsections.map((sub) => {
                const isExpanded = expandedSubsections.has(sub.id)
                return (
                  <div
                    key={sub.id}
                    className={`ks-subsection ${isExpanded ? 'ks-subsection-expanded' : ''}`}
                  >
                    <button
                      className="ks-subsection-toggle"
                      onClick={() => toggleSubsection(sub.id)}
                      aria-expanded={isExpanded}
                    >
                      <h4 className="ks-subsection-title">{sub.title}</h4>
                      <ChevronIcon expanded={isExpanded} />
                    </button>
                    {isExpanded && (
                      <div className="ks-subsection-body">
                        <p className="ks-subsection-content">{sub.content}</p>
                        <SubsectionContent subsection={sub} />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
