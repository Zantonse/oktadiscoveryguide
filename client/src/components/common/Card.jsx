import React from 'react'

export function Card({
  children,
  className = '',
  title,
  collapsible = false,
  defaultCollapsed = false,
}) {
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed)

  return (
    <div className={`card ${className}`}>
      {title && (
        <div
          className={`card-header ${collapsible ? 'collapsible' : ''}`}
          onClick={collapsible ? () => setCollapsed(!collapsed) : undefined}
        >
          <h3 className="card-title">{title}</h3>
          {collapsible && (
            <span className={`collapse-icon ${collapsed ? 'collapsed' : ''}`}>
              <ChevronIcon />
            </span>
          )}
        </div>
      )}
      {!collapsed && <div className="card-content">{children}</div>}
    </div>
  )
}

function ChevronIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  )
}
