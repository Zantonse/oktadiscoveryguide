import React, { useState } from 'react';
import { TranscriptInput } from './TranscriptInput.jsx';
import { RoleMapper } from './RoleMapper.jsx';
import { TranscriptPreview } from './TranscriptPreview.jsx';
import { AnalysisReport } from './AnalysisReport.jsx';
import { parseAndAnalyze, swapRoles, assignSpeakerRole } from '../../utils/transcriptParser.js';

export function AnalyzeSection() {
  // View state: 'input' | 'mapping' | 'analyzing' | 'results'
  const [viewState, setViewState] = useState('input');
  const [analysisType, setAnalysisType] = useState('sales'); // 'sales' | 'technical'
  const [rawTranscript, setRawTranscript] = useState('');
  const [parseResult, setParseResult] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState(null);

  const handleTranscriptSubmit = (transcript) => {
    setError(null);
    setRawTranscript(transcript);

    try {
      const result = parseAndAnalyze(transcript);
      setParseResult(result);

      // If confidence is high, skip role mapping
      if (result.confidence === 'high') {
        setViewState('mapping'); // Still show for confirmation
      } else {
        setViewState('mapping');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSwapRoles = () => {
    if (parseResult) {
      setParseResult(swapRoles(parseResult));
    }
  };

  const handleAssignRole = (speaker, role) => {
    if (parseResult) {
      setParseResult(assignSpeakerRole(parseResult, speaker, role));
    }
  };

  const handleAnalyze = async () => {
    setViewState('analyzing');
    setError(null);

    try {
      const response = await fetch('/api/analyze-transcript', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: parseResult.messages,
          analysisType
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Analysis failed');
      }

      const result = await response.json();
      setAnalysisResult(result);
      setViewState('results');
    } catch (err) {
      setError(err.message);
      setViewState('mapping');
    }
  };

  const handleReset = () => {
    setViewState('input');
    setRawTranscript('');
    setParseResult(null);
    setAnalysisResult(null);
    setError(null);
  };

  return (
    <div className="analyze-section">
      {/* Header */}
      <div className="analyze-header">
        <div className="analyze-title">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.3-4.3"/>
            <path d="M11 8v6"/>
            <path d="M8 11h6"/>
          </svg>
          <div>
            <h2>Analyze Discovery Call</h2>
            <p>Upload or paste a transcript to get coaching feedback</p>
          </div>
        </div>

        {viewState !== 'results' && (
          <div className="analysis-type-toggle">
            <button
              className={`type-btn ${analysisType === 'sales' ? 'active' : ''}`}
              onClick={() => setAnalysisType('sales')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 3v18h18"/>
                <path d="m19 9-5 5-4-4-3 3"/>
              </svg>
              Sales Discovery
            </button>
            <button
              className={`type-btn ${analysisType === 'technical' ? 'active' : ''}`}
              onClick={() => setAnalysisType('technical')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect width="18" height="18" x="3" y="3" rx="2"/>
                <path d="M7 7h.01"/>
                <path d="M7 12h.01"/>
                <path d="M7 17h.01"/>
                <path d="M12 7h5"/>
                <path d="M12 12h5"/>
                <path d="M12 17h5"/>
              </svg>
              Technical Discovery
            </button>
          </div>
        )}
      </div>

      {/* Error display */}
      {error && (
        <div className="analyze-error">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <span>{error}</span>
          <button className="dismiss-error" onClick={() => setError(null)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      )}

      {/* Content based on view state */}
      <div className="analyze-content">
        {viewState === 'input' && (
          <TranscriptInput onSubmit={handleTranscriptSubmit} />
        )}

        {viewState === 'mapping' && parseResult && (
          <div className="mapping-view">
            <RoleMapper
              speakers={parseResult.rawSpeakers}
              roleAssignments={parseResult.roleAssignments}
              confidence={parseResult.confidence}
              signals={parseResult.signals}
              onSwapRoles={handleSwapRoles}
              onAssignRole={handleAssignRole}
            />
            <TranscriptPreview
              messages={parseResult.parsedMessages}
              roleAssignments={parseResult.roleAssignments}
            />
            <div className="mapping-actions">
              <button className="btn-secondary" onClick={handleReset}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6"/>
                </svg>
                Back
              </button>
              <button className="btn-primary" onClick={handleAnalyze}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.3-4.3"/>
                </svg>
                Analyze Transcript
              </button>
            </div>
          </div>
        )}

        {viewState === 'analyzing' && (
          <div className="analyzing-state">
            <div className="analyzing-spinner">
              <div className="spinner"></div>
            </div>
            <h3>Analyzing transcript...</h3>
            <ul className="analyzing-steps">
              <li className="step active">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Parsing conversation
              </li>
              <li className="step active">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Detecting roles
              </li>
              <li className="step pending">
                <div className="step-spinner"></div>
                Evaluating discovery quality
              </li>
              <li className="step pending">
                <div className="step-spinner"></div>
                Generating recommendations
              </li>
            </ul>
          </div>
        )}

        {viewState === 'results' && analysisResult && (
          <AnalysisReport
            result={analysisResult}
            analysisType={analysisType}
            onAnalyzeAnother={handleReset}
          />
        )}
      </div>
    </div>
  );
}
