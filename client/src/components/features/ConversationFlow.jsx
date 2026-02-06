import React, { useState } from 'react'
import { useSession } from '../../contexts/SessionContext.jsx'

// Map discovered areas to flow phases
const salesPhaseAreas = {
  Opening: [],
  'Current State': ['current_state'],
  'Pain Discovery': ['pain_points', 'business_impact'],
  Qualification: ['budget', 'timeline', 'decision_process'],
  'Value Mapping': ['success_criteria'],
  'Next Steps': [],
}

const technicalPhaseAreas = {
  Opening: [],
  'Architecture Review': ['architecture', 'integrations'],
  'Pain Points': ['pain_points'],
  Requirements: ['requirements', 'compliance'],
  'Solution Fit': [],
  Roadmap: ['resources', 'migration'],
}

const aiAgentsPhaseAreas = {
  Opening: [],
  'AI Landscape': ['ai_initiatives', 'current_approach'],
  'Use Cases': ['agent_use_cases'],
  'Security Concerns': ['security_concerns', 'governance_needs'],
  Qualification: ['timeline', 'decision_process'],
  'Next Steps': [],
}

const salesFlow = [
  {
    phase: 'Opening',
    goal: 'Build rapport',
    actions: ['Introduce yourself', 'Thank them for their time', 'Set agenda expectations'],
    questions: ['What prompted you to take this meeting?'],
  },
  {
    phase: 'Current State',
    goal: 'Understand situation',
    actions: ['Listen actively', 'Take notes', 'Show genuine curiosity'],
    questions: ['How do you handle access management today?', "What's working well?"],
  },
  {
    phase: 'Pain Discovery',
    goal: 'Uncover challenges',
    actions: ['Dig into specifics', 'Quantify impact', 'Get examples'],
    questions: ['What keeps you up at night?', "What's the cost of that problem?"],
  },
  {
    phase: 'Qualification',
    goal: 'Assess fit',
    actions: ['Understand decision process', 'Identify stakeholders', 'Gauge urgency'],
    questions: ['Who else is involved?', "What's driving the timeline?"],
  },
  {
    phase: 'Value Mapping',
    goal: 'Connect solutions',
    actions: ['Use their language', 'Reference their pain points', 'Show relevant capabilities'],
    questions: ['If you could solve X, what would that mean for you?'],
  },
  {
    phase: 'Next Steps',
    goal: 'Advance deal',
    actions: ['Summarize key points', 'Propose clear next action', 'Confirm commitment'],
    questions: ['What would be helpful as a next step?'],
  },
]

const technicalFlow = [
  {
    phase: 'Opening',
    goal: 'Establish credibility',
    actions: [
      'Show technical understanding',
      'Acknowledge their expertise',
      'Focus on solving problems',
    ],
    questions: ["What's your current IAM architecture look like?"],
  },
  {
    phase: 'Architecture Review',
    goal: 'Map current state',
    actions: ['Diagram systems', 'Identify integrations', 'Note dependencies'],
    questions: ['What directories are you running?', 'How does provisioning work today?'],
  },
  {
    phase: 'Pain Points',
    goal: 'Find technical gaps',
    actions: ['Get specific examples', 'Understand workarounds', 'Quantify manual effort'],
    questions: ['Where are the biggest gaps?', 'What takes too long?'],
  },
  {
    phase: 'Requirements',
    goal: 'Define must-haves',
    actions: ['Separate needs vs wants', 'Understand compliance drivers', 'Identify constraints'],
    questions: ["What's non-negotiable?", 'What compliance frameworks apply?'],
  },
  {
    phase: 'Solution Fit',
    goal: 'Show technical value',
    actions: ['Demo relevant features', 'Discuss integration patterns', 'Address concerns'],
    questions: ['How would you see this fitting in?', 'What concerns do you have?'],
  },
  {
    phase: 'Roadmap',
    goal: 'Plan implementation',
    actions: ['Discuss phasing', 'Identify quick wins', 'Set realistic expectations'],
    questions: ['What would phase 1 look like?', 'What resources are available?'],
  },
]

const aiAgentsFlow = [
  {
    phase: 'Opening',
    goal: 'Establish AI context',
    actions: ['Show understanding of AI landscape', 'Be curious about their journey', 'Avoid hype'],
    questions: ['How is your organization thinking about AI and automation?'],
  },
  {
    phase: 'AI Landscape',
    goal: 'Understand AI initiatives',
    actions: ['Map current AI projects', 'Identify AI champions', 'Understand maturity'],
    questions: ['What AI initiatives are in flight?', 'Are you using copilots or building agents?'],
  },
  {
    phase: 'Use Cases',
    goal: 'Identify agent scenarios',
    actions: ['Get specific examples', 'Understand data access needs', 'Map agent capabilities'],
    questions: ['What tasks would your agents perform?', 'What systems would they access?'],
  },
  {
    phase: 'Security Concerns',
    goal: 'Uncover AI security gaps',
    actions: ['Discuss agent permissions', 'Explore audit needs', 'Address governance'],
    questions: ['How do you control what agents can do?', 'How do you audit agent actions?'],
  },
  {
    phase: 'Qualification',
    goal: 'Assess opportunity',
    actions: ['Understand timeline', 'Identify decision makers', 'Gauge urgency'],
    questions: ['When are these agents going to production?', 'Who owns AI security?'],
  },
  {
    phase: 'Next Steps',
    goal: 'Advance conversation',
    actions: ['Summarize findings', 'Propose relevant demo', 'Align on follow-up'],
    questions: ['Would a technical deep-dive on agent identity be helpful?'],
  },
]

export function FlowGuideButton({ onClick }) {
  return (
    <button className="flow-guide-button" onClick={onClick}>
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
      View Flow Guide
    </button>
  )
}

// Helper to get flow and areas based on track
function getFlowConfig(track) {
  switch (track) {
    case 'technical':
      return { flow: technicalFlow, phaseAreas: technicalPhaseAreas }
    case 'aiAgents':
      return { flow: aiAgentsFlow, phaseAreas: aiAgentsPhaseAreas }
    default:
      return { flow: salesFlow, phaseAreas: salesPhaseAreas }
  }
}

// Helper to check if a phase has any discovered areas
function isPhaseDiscovered(phaseName, track, discoveredAreas) {
  const { phaseAreas } = getFlowConfig(track)
  const areasForPhase = phaseAreas[phaseName] || []
  if (areasForPhase.length === 0) return false
  return areasForPhase.some((area) => discoveredAreas.includes(area))
}

// Helper to check if a phase is fully discovered
function isPhaseFullyDiscovered(phaseName, track, discoveredAreas) {
  const { phaseAreas } = getFlowConfig(track)
  const areasForPhase = phaseAreas[phaseName] || []
  if (areasForPhase.length === 0) return false
  return areasForPhase.every((area) => discoveredAreas.includes(area))
}

// Get track display name
function getTrackName(track) {
  switch (track) {
    case 'technical':
      return 'IGA Technical'
    case 'aiAgents':
      return 'AI Agents'
    default:
      return 'IGA Sales'
  }
}

export function ConversationFlowOverlay({ isOpen, onClose }) {
  const { selectedTrack, discoveredAreas } = useSession()
  const { flow, phaseAreas } = getFlowConfig(selectedTrack)

  if (!isOpen) return null

  return (
    <div className="flow-overlay" onClick={onClose}>
      <div className="flow-modal" onClick={(e) => e.stopPropagation()}>
        <div className="flow-modal-header">
          <div>
            <h2>{getTrackName(selectedTrack)} Discovery Flow</h2>
            <p>Follow this guide for effective discovery conversations</p>
          </div>
          <button className="flow-close" onClick={onClose}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="flow-modal-content">
          <div className="flow-timeline">
            {flow.map((step, index) => {
              const isPartial = isPhaseDiscovered(step.phase, selectedTrack, discoveredAreas)
              const isFull = isPhaseFullyDiscovered(step.phase, selectedTrack, discoveredAreas)
              const areasForPhase = phaseAreas[step.phase] || []

              return (
                <div
                  key={step.phase}
                  className={`flow-timeline-step ${isFull ? 'discovered-full' : isPartial ? 'discovered-partial' : ''}`}
                >
                  <div className="flow-timeline-marker">
                    {isFull ? (
                      <span className="flow-step-check">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                    ) : (
                      <span className={`flow-step-num ${isPartial ? 'partial' : ''}`}>
                        {index + 1}
                      </span>
                    )}
                    {index < flow.length - 1 && (
                      <div className={`flow-timeline-line ${isFull ? 'discovered' : ''}`} />
                    )}
                  </div>
                  <div className="flow-timeline-content">
                    <div className="flow-step-header">
                      <h3>{step.phase}</h3>
                      <span className="flow-step-goal">{step.goal}</span>
                      {areasForPhase.length > 0 && (
                        <div className="flow-step-areas">
                          {areasForPhase.map((area) => (
                            <span
                              key={area}
                              className={`flow-area-tag ${discoveredAreas.includes(area) ? 'discovered' : ''}`}
                            >
                              {area.replace(/_/g, ' ')}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flow-step-body">
                      <div className="flow-step-actions">
                        <h4>Key Actions</h4>
                        <ul>
                          {step.actions.map((action, i) => (
                            <li key={i}>{action}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="flow-step-questions">
                        <h4>Example Questions</h4>
                        <ul>
                          {step.questions.map((q, i) => (
                            <li key={i}>"{q}"</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
