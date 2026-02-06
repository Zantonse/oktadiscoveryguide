import React, { useState } from 'react'
import { competitorGuide } from '../../data/learningContent.js'

export function CompetitorGuide() {
  const [activeCategory, setActiveCategory] = useState('ai')
  const category = competitorGuide.categories[activeCategory]

  return (
    <div className="learn-topic">
      <div className="learn-topic-header">
        <h1>{competitorGuide.title}</h1>
        <p className="learn-topic-description">{competitorGuide.description}</p>
      </div>

      <div className="learn-card intro-card">
        <p>{competitorGuide.intro}</p>
      </div>

      <div className="competitors-content">
        <div className="category-intro">
          <h2>{category.name}</h2>
          <p>{category.description}</p>
        </div>

        <div className="competitors-list">
          {category.competitors.map((competitor, index) => (
            <div key={index} className="competitor-card">
              <div className="competitor-header">
                <div className="competitor-info">
                  <h3>{competitor.name}</h3>
                  <span className="competitor-type">{competitor.type}</span>
                </div>
              </div>

              <div className="competitor-details">
                <div className="competitor-section">
                  <h4>
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
                    Strengths
                  </h4>
                  <ul>
                    {competitor.strengths.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>

                <div className="competitor-section">
                  <h4>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                    Weaknesses
                  </h4>
                  <ul>
                    {competitor.weaknesses.map((w, i) => (
                      <li key={i}>{w}</li>
                    ))}
                  </ul>
                </div>

                {competitor.oktaAdvantages && (
                  <div className="competitor-section differentiators okta-advantages">
                    <h4>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                      Why Okta Wins
                    </h4>
                    <ul>
                      {competitor.oktaAdvantages.map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {competitor.auth0Advantages && (
                  <div className="competitor-section differentiators auth0-advantages">
                    <h4>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                      Why Auth0 Wins
                    </h4>
                    <ul>
                      {competitor.auth0Advantages.map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {competitor.handlers && (
                <div className="competitor-handlers">
                  <h4>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    Objection Handlers
                  </h4>
                  <div className="handlers-list">
                    {Object.entries(competitor.handlers).map(([objection, response], i) => (
                      <div key={i} className="handler-item">
                        <div className="handler-objection">"{objection}"</div>
                        <div className="handler-response">{response}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
