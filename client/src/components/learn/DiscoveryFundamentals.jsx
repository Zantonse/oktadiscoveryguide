import React from 'react'
import { discoveryFundamentals } from '../../data/learningContent.js'

export function DiscoveryFundamentals() {
  return (
    <div className="learn-topic">
      <div className="learn-topic-header">
        <h1>{discoveryFundamentals.title}</h1>
        <p className="learn-topic-description">{discoveryFundamentals.description}</p>
      </div>

      <div className="learn-sections">
        {discoveryFundamentals.sections.map((section) => (
          <div key={section.id} className="learn-card">
            <h2>{section.title}</h2>
            <p className="learn-card-content">{section.content}</p>

            {section.keyPoints && (
              <div className="learn-key-points">
                <h4>Key Points</h4>
                <ul>
                  {section.keyPoints.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>
            )}

            {section.mistakes && (
              <div className="learn-mistakes">
                {section.mistakes.map((item, index) => (
                  <div key={index} className="mistake-card">
                    <div className="mistake-header">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="15" y1="9" x2="9" y2="15" />
                        <line x1="9" y1="9" x2="15" y2="15" />
                      </svg>
                      <span className="mistake-name">{item.mistake}</span>
                    </div>
                    <div className="mistake-why">
                      <strong>Why it hurts:</strong> {item.why}
                    </div>
                    <div className="mistake-instead">
                      <strong>Instead:</strong> {item.instead}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
