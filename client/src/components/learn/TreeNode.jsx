import React, { useState } from 'react'

const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)

const MinusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)

const SentimentIndicator = ({ sentiment }) => {
  const sentimentConfig = {
    positive: { className: 'positive', label: 'Positive' },
    neutral: { className: 'neutral', label: 'Neutral' },
    urgent: { className: 'urgent', label: 'Urgent' },
    skeptical: { className: 'skeptical', label: 'Skeptical' },
    negative: { className: 'negative', label: 'Negative' },
  }

  const config = sentimentConfig[sentiment] || sentimentConfig.neutral

  return (
    <span className={`sentiment-indicator ${config.className}`} title={config.label}>
      <span className="sentiment-dot" />
    </span>
  )
}

export function TreeNode({ branch, depth = 0, isLast = false }) {
  const [isExpanded, setIsExpanded] = useState(depth < 1)
  const hasChildren = branch.nextBranches && branch.nextBranches.length > 0

  return (
    <div className={`tree-node depth-${Math.min(depth, 3)}`}>
      <div className="tree-node-connector">
        {depth > 0 && (
          <>
            <div className="tree-node-vertical" />
            <div className="tree-node-horizontal" />
          </>
        )}
      </div>
      <div className="tree-node-content">
        <button
          className={`tree-node-header ${hasChildren ? 'has-children' : ''}`}
          onClick={() => hasChildren && setIsExpanded(!isExpanded)}
          disabled={!hasChildren}
        >
          {hasChildren && (
            <span className="tree-node-toggle">{isExpanded ? <MinusIcon /> : <PlusIcon />}</span>
          )}
          <div className="tree-node-label">
            <span className="tree-node-response-label">
              {branch.responseLabel}
              {branch.sentiment && <SentimentIndicator sentiment={branch.sentiment} />}
            </span>
          </div>
        </button>

        <div className="tree-node-body">
          {branch.example && (
            <div className="tree-node-example">
              <span className="tree-example-label">Example:</span>
              <span className="tree-example-text">{branch.example}</span>
            </div>
          )}

          <div className="tree-node-followup">
            <span className="tree-followup-label">Follow up:</span>
            <span className="tree-followup-question">{branch.followUp}</span>
          </div>

          {branch.insight && (
            <div className="tree-node-insight">
              <span className="tree-insight-label">Insight:</span>
              <span className="tree-insight-text">{branch.insight}</span>
            </div>
          )}
        </div>

        {hasChildren && isExpanded && (
          <div className="tree-node-children">
            {branch.nextBranches.map((child, index) => (
              <TreeNode
                key={child.responseType || index}
                branch={child}
                depth={depth + 1}
                isLast={index === branch.nextBranches.length - 1}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
