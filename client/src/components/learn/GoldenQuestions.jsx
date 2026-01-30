import React, { useState } from 'react';
import { goldenQuestions } from '../../data/learningContent.js';
import { questionTrees } from '../../data/questionTrees.js';
import { QuestionTreeList } from './QuestionTree.jsx';

export function GoldenQuestions() {
  const [activeTrack, setActiveTrack] = useState('sales');
  const [showTrees, setShowTrees] = useState(false);
  const trackQuestions = goldenQuestions.tracks[activeTrack];
  const trackTrees = questionTrees[activeTrack]?.trees || [];

  return (
    <div className="learn-topic">
      <div className="learn-topic-header">
        <h1>{goldenQuestions.title}</h1>
        <p className="learn-topic-description">{goldenQuestions.description}</p>
      </div>

      <div className="learn-card intro-card">
        <p>{goldenQuestions.intro}</p>
      </div>

      <div className="learn-track-toggle">
        <button
          className={`track-btn ${activeTrack === 'sales' ? 'active' : ''}`}
          onClick={() => setActiveTrack('sales')}
        >
          Sales Track
        </button>
        <button
          className={`track-btn ${activeTrack === 'technical' ? 'active' : ''}`}
          onClick={() => setActiveTrack('technical')}
        >
          Technical Track
        </button>
        <button
          className={`track-btn ${activeTrack === 'aiAgents' ? 'active' : ''}`}
          onClick={() => setActiveTrack('aiAgents')}
        >
          AI Agents Track
        </button>
      </div>

      <div className="golden-section-toggle">
        <button
          className={`section-toggle-btn ${!showTrees ? 'active' : ''}`}
          onClick={() => setShowTrees(false)}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
          Golden Questions
        </button>
        <button
          className={`section-toggle-btn ${showTrees ? 'active' : ''}`}
          onClick={() => setShowTrees(true)}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 3v18"/>
            <path d="M8 7l4-4 4 4"/>
            <path d="M8 17l-4 4"/>
            <path d="M16 17l4 4"/>
            <path d="M4 13h4"/>
            <path d="M16 13h4"/>
          </svg>
          Question Trees
        </button>
      </div>

      {!showTrees ? (
        <div className="golden-questions-list">
          {trackQuestions.questions.map((item, index) => (
            <div key={index} className="golden-question-card">
              <div className="golden-question-header">
                <span className="golden-number">{index + 1}</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              </div>
              <blockquote className="golden-question-text">
                "{item.question}"
              </blockquote>
              <div className="golden-question-why">
                <h5>Why it works</h5>
                <p>{item.why}</p>
              </div>
              <div className="golden-question-unlocks">
                <h5>Unlocks these areas</h5>
                <div className="unlocks-tags">
                  {item.unlocks.map((area, i) => (
                    <span key={i} className="unlock-tag">{area.replace('_', ' ')}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <QuestionTreeList trees={trackTrees} />
      )}
    </div>
  );
}
