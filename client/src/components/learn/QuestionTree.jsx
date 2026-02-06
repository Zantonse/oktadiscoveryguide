import React, { useState } from 'react'
import { TreeNode } from './TreeNode.jsx'

const ExpandAllIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="15 3 21 3 21 9" />
    <polyline points="9 21 3 21 3 15" />
    <line x1="21" y1="3" x2="14" y2="10" />
    <line x1="3" y1="21" x2="10" y2="14" />
  </svg>
)

const CollapseAllIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="4 14 10 14 10 20" />
    <polyline points="20 10 14 10 14 4" />
    <line x1="14" y1="10" x2="21" y2="3" />
    <line x1="3" y1="21" x2="10" y2="14" />
  </svg>
)

export function QuestionTree({ tree }) {
  const [key, setKey] = useState(0)

  // Force re-render to reset expansion state
  const handleExpandAll = () => {
    // This is a simple approach - in a real app, you'd use context or state management
    setKey((prev) => prev + 1)
  }

  if (!tree || !tree.branches) {
    return null
  }

  return (
    <div className="question-tree" key={key}>
      <div className="question-tree-header">
        <div className="question-tree-info">
          <h4>{tree.rootQuestion}</h4>
          <p>{tree.description}</p>
        </div>
      </div>
      <div className="question-tree-content">
        {tree.branches.map((branch, index) => (
          <TreeNode
            key={branch.responseType || index}
            branch={branch}
            depth={0}
            isLast={index === tree.branches.length - 1}
          />
        ))}
      </div>
    </div>
  )
}

export function QuestionTreeList({ trees }) {
  if (!trees || trees.length === 0) {
    return null
  }

  return (
    <div className="question-tree-list">
      <div className="question-tree-list-header">
        <h3>Question Branching Trees</h3>
        <p>Explore how to navigate different stakeholder responses</p>
      </div>
      {trees.map((tree) => (
        <QuestionTree key={tree.id} tree={tree} />
      ))}
    </div>
  )
}
