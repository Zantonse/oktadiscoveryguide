import React from 'react'
import { ChatContainer } from '../chat/ChatContainer.jsx'
import { BottomPanel } from './BottomPanel.jsx'
import { ReportCard } from '../features/ReportCard.jsx'
import { ProductPanel } from '../features/ProductPanel.jsx'
import { LearnSection } from '../learn/LearnSection.jsx'
import { DrillMode } from '../drill/DrillMode.jsx'
import { AnalyzeSection } from '../analyze/AnalyzeSection.jsx'
import { useSession } from '../../contexts/SessionContext.jsx'
import { useTheme } from '../../App.jsx'

export function MainContent() {
  const { conversationStarted, conversationEnded } = useSession()
  const { activeView } = useTheme()

  // Render Learn section based on activeView
  if (activeView === 'learn') {
    return (
      <main className="main-content learn-view">
        <LearnSection />
      </main>
    )
  }

  // Render Drill mode based on activeView
  if (activeView === 'drill') {
    return (
      <main className="main-content drill-view">
        <DrillMode />
      </main>
    )
  }

  // Render Analyze section based on activeView
  if (activeView === 'analyze') {
    return (
      <main className="main-content analyze-view">
        <AnalyzeSection />
      </main>
    )
  }

  return (
    <main className="main-content">
      {conversationStarted ? (
        <>
          <div className="practice-view-with-panel">
            <ChatContainer />
            <ProductPanel />
          </div>
          <BottomPanel />
          {conversationEnded && <ReportCard />}
        </>
      ) : (
        <WelcomeScreen />
      )}
    </main>
  )
}

function WelcomeScreen() {
  return (
    <div className="welcome-screen">
      <div className="welcome-content">
        <div className="welcome-icon">
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </div>
        <h2>Welcome to the Discovery Guide</h2>
        <p>
          Practice your discovery conversations with realistic AI-powered stakeholder simulations.
          Select an industry, choose a stakeholder persona, and pick a discovery phase to begin.
        </p>

        <div className="welcome-features">
          <div className="feature">
            <div className="feature-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="3" y1="9" x2="21" y2="9" />
                <line x1="9" y1="21" x2="9" y2="9" />
              </svg>
            </div>
            <h3>12+ Industries</h3>
            <p>Financial Services, Healthcare, Technology, and more</p>
          </div>

          <div className="feature">
            <div className="feature-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <h3>6 Stakeholder Personas</h3>
            <p>From CISO to IAM Engineer, each with unique perspectives</p>
          </div>

          <div className="feature">
            <div className="feature-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="12" y1="20" x2="12" y2="10" />
                <line x1="18" y1="20" x2="18" y2="4" />
                <line x1="6" y1="20" x2="6" y2="16" />
              </svg>
            </div>
            <h3>Two Discovery Tracks</h3>
            <p>Sales-focused and Technical IGA discovery phases</p>
          </div>
        </div>

        <div className="welcome-tip">
          <strong>Tip:</strong> Start with the Sales Track's Initial Discovery phase to practice
          understanding customer challenges, or dive into the Technical Track for deeper
          architecture discussions.
        </div>
      </div>
    </div>
  )
}
