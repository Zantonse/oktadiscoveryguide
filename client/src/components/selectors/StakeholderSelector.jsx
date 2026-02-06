import React, { useMemo } from 'react'
import { Card } from '../common/Card.jsx'
import { Dropdown } from '../common/Dropdown.jsx'
import { useSession } from '../../contexts/SessionContext.jsx'
import { getStakeholdersForTrack, levelLabels } from '../../data/stakeholders.js'

// Icons for different avatar types
const avatarIcons = {
  shield: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  monitor: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  clipboard: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    </svg>
  ),
  key: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
    </svg>
  ),
  layers: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  cpu: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
      <rect x="9" y="9" width="6" height="6" />
      <line x1="9" y1="1" x2="9" y2="4" />
      <line x1="15" y1="1" x2="15" y2="4" />
      <line x1="9" y1="20" x2="9" y2="23" />
      <line x1="15" y1="20" x2="15" y2="23" />
      <line x1="20" y1="9" x2="23" y2="9" />
      <line x1="20" y1="14" x2="23" y2="14" />
      <line x1="1" y1="9" x2="4" y2="9" />
      <line x1="1" y1="14" x2="4" y2="14" />
    </svg>
  ),
  bot: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M9 8h.01" />
      <path d="M15 8h.01" />
      <path d="M9 12a3 3 0 0 0 6 0" />
      <path d="M8 16v2" />
      <path d="M16 16v2" />
      <path d="M12 16v4" />
    </svg>
  ),
  chart: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),
  code: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  server: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
      <line x1="6" y1="6" x2="6.01" y2="6" />
      <line x1="6" y1="18" x2="6.01" y2="18" />
    </svg>
  ),
}

export function StakeholderSelector() {
  const { selectedStakeholder, setSelectedStakeholder, selectedTrack, conversationStarted } =
    useSession()

  // Get all available stakeholders
  const trackStakeholders = useMemo(() => {
    const stakeholders = getStakeholdersForTrack()
    return Object.entries(stakeholders).flatMap(([level, personas]) =>
      personas.map((persona) => ({
        ...persona,
        id: persona.id,
        name: persona.fullTitle,
        levelLabel: levelLabels[level],
      }))
    )
  }, [])

  const renderOption = (stakeholder) => (
    <div className="stakeholder-option">
      <span className="stakeholder-icon">
        {avatarIcons[stakeholder.avatar] || avatarIcons.shield}
      </span>
      <div className="stakeholder-info">
        <span className="stakeholder-name">{stakeholder.fullTitle}</span>
        <span className="stakeholder-desc">{stakeholder.description}</span>
      </div>
    </div>
  )

  return (
    <Card title="Stakeholder" className="selector-card">
      <Dropdown
        options={trackStakeholders}
        value={selectedStakeholder}
        onChange={setSelectedStakeholder}
        placeholder="Select a stakeholder..."
        groupBy="levelLabel"
        renderOption={renderOption}
        className={conversationStarted ? 'disabled' : ''}
      />
      {selectedStakeholder && (
        <div className="selection-badge">
          {avatarIcons[selectedStakeholder.avatar] || avatarIcons.shield}
          <span>{selectedStakeholder.fullTitle}</span>
        </div>
      )}
    </Card>
  )
}
