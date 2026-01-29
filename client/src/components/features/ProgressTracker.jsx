import React from 'react';
import { Card } from '../common/Card.jsx';
import { useSession } from '../../contexts/SessionContext.jsx';
import { phases } from '../../data/phases.js';

export function ProgressTracker() {
  const {
    messages,
    selectedTrack,
    selectedPhase,
    completedPhases
  } = useSession();

  const currentPhases = phases[selectedTrack];
  const completedCount = completedPhases.length;
  const totalPhases = currentPhases.length;

  // Calculate rough progress based on messages and topics covered
  const messageCount = messages.filter(m => m.role === 'user').length;
  const conversationProgress = Math.min(messageCount * 10, 100);

  // Calculate insights (messages that contain key terms)
  const keyTerms = ['challenge', 'problem', 'concern', 'need', 'want', 'require', 'budget', 'timeline'];
  const insightMessages = messages.filter(m =>
    m.role === 'assistant' &&
    keyTerms.some(term => m.content.toLowerCase().includes(term))
  );

  return (
    <Card title="Progress" className="progress-tracker" collapsible defaultCollapsed={false}>
      <div className="progress-section">
        <div className="progress-item">
          <div className="progress-label">
            <span>Phase Progress</span>
            <span className="progress-value">{completedCount}/{totalPhases}</span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${(completedCount / totalPhases) * 100}%` }}
            />
          </div>
        </div>

        <div className="progress-item">
          <div className="progress-label">
            <span>Conversation Depth</span>
            <span className="progress-value">{messageCount} exchanges</span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill secondary"
              style={{ width: `${conversationProgress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="progress-stats">
        <div className="stat">
          <span className="stat-value">{insightMessages.length}</span>
          <span className="stat-label">Insights Uncovered</span>
        </div>
        <div className="stat">
          <span className="stat-value">{selectedPhase?.name || '-'}</span>
          <span className="stat-label">Current Phase</span>
        </div>
      </div>

      <div className="phase-checklist">
        {currentPhases.map((phase, index) => {
          const isCompleted = completedPhases.includes(phase.id);
          const isCurrent = selectedPhase?.id === phase.id;

          return (
            <div
              key={phase.id}
              className={`phase-check ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}`}
            >
              <span className="phase-check-indicator">
                {isCompleted ? (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                ) : isCurrent ? (
                  <span className="current-dot" />
                ) : (
                  <span className="empty-dot" />
                )}
              </span>
              <span className="phase-check-name">{phase.name}</span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
