import React, { useState, useRef } from 'react';

export function TranscriptInput({ onSubmit }) {
  const [inputTab, setInputTab] = useState('paste'); // 'paste' | 'upload'
  const [transcript, setTranscript] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handlePaste = (e) => {
    setTranscript(e.target.value);
    setUploadedFile(null);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (file) => {
    const validTypes = ['.txt', '.json', '.vtt'];
    const extension = '.' + file.name.split('.').pop().toLowerCase();

    if (!validTypes.includes(extension)) {
      alert('Please upload a TXT, JSON, or VTT file');
      return;
    }

    try {
      const content = await file.text();
      setTranscript(content);
      setUploadedFile(file);
      setInputTab('paste'); // Switch to paste tab to show content
    } catch (err) {
      alert('Error reading file: ' + err.message);
    }
  };

  const handleSubmit = () => {
    if (transcript.trim()) {
      onSubmit(transcript.trim());
    }
  };

  const clearInput = () => {
    setTranscript('');
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const isValid = transcript.trim().length > 0;

  return (
    <div className="transcript-input">
      {/* Tab bar */}
      <div className="input-tabs">
        <button
          className={`input-tab ${inputTab === 'paste' ? 'active' : ''}`}
          onClick={() => setInputTab('paste')}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect width="8" height="4" x="8" y="2" rx="1" ry="1"/>
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
          </svg>
          Paste Text
        </button>
        <button
          className={`input-tab ${inputTab === 'upload' ? 'active' : ''}`}
          onClick={() => setInputTab('upload')}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/>
            <line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
          Upload File
        </button>
      </div>

      {/* Paste tab content */}
      {inputTab === 'paste' && (
        <div className="paste-input">
          {uploadedFile && (
            <div className="uploaded-file-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
              <span>{uploadedFile.name}</span>
              <button onClick={clearInput} title="Clear">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
          )}
          <textarea
            placeholder="Paste your discovery call transcript here...

Supported formats:
• Speaker-labeled: 'John: Hello, how are you?'
• Bracketed: '[John] Hello, how are you?'
• VTT subtitles
• JSON array"
            value={transcript}
            onChange={handlePaste}
            className="transcript-textarea"
          />
          <div className="input-footer">
            <span className="char-count">
              {transcript.length.toLocaleString()} characters
            </span>
            {transcript && (
              <button className="clear-btn" onClick={clearInput}>
                Clear
              </button>
            )}
          </div>
        </div>
      )}

      {/* Upload tab content */}
      {inputTab === 'upload' && (
        <div
          className={`upload-zone ${dragActive ? 'drag-active' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".txt,.json,.vtt"
            onChange={handleFileChange}
            className="file-input"
          />
          <div className="upload-content">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="17 8 12 3 7 8"/>
              <line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
            <p className="upload-primary">
              Drop your transcript file here
            </p>
            <p className="upload-secondary">
              or <button onClick={() => fileInputRef.current?.click()}>browse files</button>
            </p>
            <p className="upload-formats">
              Supports TXT, JSON, VTT
            </p>
          </div>
        </div>
      )}

      {/* Submit button */}
      <button
        className="analyze-submit-btn"
        onClick={handleSubmit}
        disabled={!isValid}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
        Continue to Role Mapping
      </button>

      {/* Help text */}
      <div className="input-help">
        <h4>Tips for best results</h4>
        <ul>
          <li>Include speaker names/labels in your transcript</li>
          <li>Include both sides of the conversation</li>
          <li>Transcripts from Zoom, Teams, Gong, or similar tools work well</li>
        </ul>
      </div>
    </div>
  );
}
