import React from 'react' // eslint-disable-line no-unused-vars

export function ScenarioCard({ scenario, mode }) {
  if (!scenario) return null

  const renderContent = () => {
    switch (mode) {
      case 'architecture':
        return (
          <>
            <div className="scenario-badges">
              <span className="badge">{scenario.industry}</span>
              <span className="badge">{scenario.complexity}</span>
            </div>
            <h3>{scenario.title}</h3>
            <div className="scenario-quote">{scenario.description}</div>
          </>
        )
      case 'briefing':
        return (
          <>
            <div className="scenario-badges">
              <span className="badge">{scenario.category}</span>
            </div>
            <div className="scenario-quote">{scenario.prompt}</div>
            {scenario.context && (
              <div className="scenario-context">
                <strong>Context:</strong> {scenario.context}
              </div>
            )}
          </>
        )
      case 'proofpoint':
        return (
          <>
            <div className="scenario-badges">
              <span className="badge">{scenario.industry}</span>
            </div>
            <div className="scenario-quote">{scenario.situation}</div>
            {scenario.hesitation && (
              <div className="scenario-context">
                <strong>What&apos;s making them hesitate:</strong> {scenario.hesitation}
              </div>
            )}
          </>
        )
      case 'technical':
        return (
          <>
            <div className="scenario-badges">
              <span className="badge">{scenario.difficulty}</span>
            </div>
            <h3>{scenario.topic}</h3>
            <div className="scenario-quote">{scenario.description}</div>
            <div className="scenario-context">
              <strong>Opening prompt:</strong> {scenario.openingPrompt}
            </div>
          </>
        )
      default:
        return null
    }
  }

  return <div className="scenario-card">{renderContent()}</div>
}
