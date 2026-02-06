import React, { useState } from 'react'
import { aiSecurityProducts } from '../../data/aiSecurityProducts.js'

export function ProductPanel() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [expandedProduct, setExpandedProduct] = useState(null)

  const toggleProduct = (productId) => {
    setExpandedProduct(expandedProduct === productId ? null : productId)
  }

  return (
    <div className={`product-panel ${isCollapsed ? 'collapsed' : ''}`}>
      <button
        className="product-panel-toggle"
        onClick={() => setIsCollapsed(!isCollapsed)}
        title={isCollapsed ? 'Show Product Reference' : 'Hide Product Reference'}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          {isCollapsed ? (
            <polyline points="15 18 9 12 15 6" />
          ) : (
            <polyline points="9 18 15 12 9 6" />
          )}
        </svg>
      </button>

      {!isCollapsed && (
        <div className="product-panel-content">
          <div className="product-panel-header">
            <h3>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>
              Product Quick Reference
            </h3>
            <p className="product-panel-subtitle">Identity-focused AI security products</p>
          </div>

          <div className="product-list">
            {aiSecurityProducts.map((product) => (
              <div
                key={product.id}
                className={`product-card ${expandedProduct === product.id ? 'expanded' : ''}`}
              >
                <button className="product-card-header" onClick={() => toggleProduct(product.id)}>
                  <div className="product-card-title">
                    <span
                      className="product-indicator"
                      style={{ backgroundColor: product.color }}
                    />
                    <span className="product-name">{product.shortName}</span>
                  </div>
                  <svg
                    className="product-expand-icon"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline
                      points={expandedProduct === product.id ? '18 15 12 9 6 15' : '6 9 12 15 18 9'}
                    />
                  </svg>
                </button>

                <div className="product-card-preview">
                  <span className="product-identity-focus">{product.identityFocus}</span>
                </div>

                {expandedProduct === product.id && (
                  <div className="product-card-details">
                    <p className="product-description">{product.description}</p>

                    <div className="product-pain-points">
                      <span className="pain-points-label">Pain Points to Listen For:</span>
                      <div className="pain-points-list">
                        {product.painPoints.map((point, idx) => (
                          <span key={idx} className="pain-point-tag">
                            "{point}"
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="product-use-cases">
                      <span className="use-cases-label">Use Cases:</span>
                      <ul>
                        {product.useCases.map((useCase, idx) => (
                          <li key={idx}>{useCase}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
