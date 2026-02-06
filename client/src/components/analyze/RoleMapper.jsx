import React from 'react'

export function RoleMapper({
  speakers,
  roleAssignments,
  confidence,
  signals,
  onSwapRoles,
  onAssignRole,
}) {
  const { sellers, prospects } = roleAssignments

  const getConfidenceBadge = () => {
    switch (confidence) {
      case 'high':
        return { text: 'High confidence', class: 'confidence-high' }
      case 'medium':
        return { text: 'Medium confidence', class: 'confidence-medium' }
      case 'manual':
        return { text: 'Manually set', class: 'confidence-manual' }
      default:
        return { text: 'Low confidence', class: 'confidence-low' }
    }
  }

  const badge = getConfidenceBadge()

  return (
    <div className="role-mapper">
      <div className="role-mapper-header">
        <h3>Verify Speaker Roles</h3>
        <div className="role-mapper-subtitle">
          <span className={`confidence-badge ${badge.class}`}>{badge.text}</span>
          <span>in role detection</span>
        </div>
      </div>

      <div className="role-mapper-content">
        {/* Seller side */}
        <div className="role-group seller-group">
          <div className="role-group-header">
            <div className="role-icon seller-icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div>
              <h4>Salesperson</h4>
              <p>AE/SE asking questions</p>
            </div>
          </div>
          <div className="role-speakers">
            {sellers.map((speaker) => (
              <div key={speaker} className="speaker-chip seller-chip">
                <span>{speaker}</span>
                <button
                  className="move-speaker"
                  onClick={() => onAssignRole(speaker, 'prospect')}
                  title="Move to Prospect side"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            ))}
            {sellers.length === 0 && <div className="no-speakers">No speakers assigned</div>}
          </div>
        </div>

        {/* Swap button */}
        <button className="swap-roles-btn" onClick={onSwapRoles} title="Swap roles">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="m7 16 4-4-4-4" />
            <path d="m17 8-4 4 4 4" />
          </svg>
        </button>

        {/* Prospect side */}
        <div className="role-group prospect-group">
          <div className="role-group-header">
            <div className="role-icon prospect-icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <path d="M2 10h20" />
              </svg>
            </div>
            <div>
              <h4>Prospect</h4>
              <p>Customer being discovered</p>
            </div>
          </div>
          <div className="role-speakers">
            {prospects.map((speaker) => (
              <div key={speaker} className="speaker-chip prospect-chip">
                <button
                  className="move-speaker"
                  onClick={() => onAssignRole(speaker, 'seller')}
                  title="Move to Salesperson side"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <span>{speaker}</span>
              </div>
            ))}
            {prospects.length === 0 && <div className="no-speakers">No speakers assigned</div>}
          </div>
        </div>
      </div>

      {/* Detection signals (collapsed by default) */}
      {signals && Object.keys(signals).length > 0 && (
        <details className="detection-signals">
          <summary>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            Detection signals
          </summary>
          <div className="signals-content">
            {Object.entries(signals).map(([speaker, data]) => (
              <div key={speaker} className="speaker-signals">
                <strong>{speaker}:</strong>
                <span>Seller score: {data.sellerScore}</span>
                <span>Prospect score: {data.prospectScore}</span>
                <span>Question ratio: {(data.questionRatio * 100).toFixed(0)}%</span>
              </div>
            ))}
          </div>
        </details>
      )}
    </div>
  )
}
