import React from 'react';

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

const ClearIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const SpinnerIcon = () => (
  <svg className="search-spinner" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" strokeOpacity="0.25"/>
    <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round"/>
  </svg>
);

// Type-specific icons
const TypeIcons = {
  fundamentals: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
    </svg>
  ),
  'framework-area': (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/>
      <line x1="8" y1="2" x2="8" y2="18"/>
      <line x1="16" y1="6" x2="16" y2="22"/>
    </svg>
  ),
  'framework-question': (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
      <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  ),
  'golden-question': (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  'psychology-objection': (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="12"/>
      <line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  ),
  competitor: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="6"/>
      <circle cx="12" cy="12" r="2"/>
    </svg>
  ),
  playbook: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    </svg>
  ),
  default: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
    </svg>
  )
};

function getTypeIcon(type) {
  if (type.startsWith('psychology')) return TypeIcons['psychology-objection'];
  if (type.startsWith('framework')) return TypeIcons['framework-area'];
  if (type.startsWith('competitor')) return TypeIcons.competitor;
  return TypeIcons[type] || TypeIcons.default;
}

function getTypeBadge(result) {
  const badges = {
    'golden-question': 'Golden',
    'framework-question': 'Question',
    'framework-area': 'Framework',
    'framework-signal': 'Signal',
    'psychology-objection': 'Objection',
    'psychology-level': 'Interest',
    'psychology-behavior': 'Behavior',
    'psychology-signal': 'Buying Signal',
    'competitor': 'Competitor',
    'competitor-handler': 'Handler',
    'playbook': 'Playbook',
    fundamentals: 'Fundamentals',
    keypoint: 'Key Point',
    mistake: 'Mistake'
  };

  return badges[result.type] || 'Content';
}

// Render highlighted text
function HighlightedText({ parts }) {
  if (!Array.isArray(parts)) return parts;

  return (
    <>
      {parts.map((part, i) =>
        part.highlight ? (
          <mark key={i} className="search-highlight">{part.text}</mark>
        ) : (
          <span key={i}>{part.text}</span>
        )
      )}
    </>
  );
}

function SearchResult({ result, onClick }) {
  return (
    <button className="search-result" onClick={onClick}>
      <div className="search-result-icon">
        {getTypeIcon(result.type)}
      </div>
      <div className="search-result-content">
        <div className="search-result-header">
          <span className="search-result-title">
            <HighlightedText parts={result.highlightedTitle} />
          </span>
          <span className="search-result-badge">{getTypeBadge(result)}</span>
        </div>
        <p className="search-result-excerpt">
          <HighlightedText parts={result.highlightedContent} />
        </p>
        <div className="search-result-meta">
          <span className="search-result-topic">{result.topicName}</span>
          {result.trackName && (
            <span className="search-result-track">{result.trackName}</span>
          )}
        </div>
      </div>
    </button>
  );
}

export function LearnSearch({ query, setQuery, results, isSearching, clearSearch, onResultClick }) {
  return (
    <div className="learn-search">
      <div className="search-input-wrapper">
        <span className="search-icon">
          {isSearching ? <SpinnerIcon /> : <SearchIcon />}
        </span>
        <input
          type="text"
          className="search-input"
          placeholder="Search all content..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button className="search-clear" onClick={clearSearch} aria-label="Clear search">
            <ClearIcon />
          </button>
        )}
      </div>

      {query.length > 0 && (
        <div className="search-results">
          {query.length < 2 ? (
            <div className="search-hint">
              Type at least 2 characters to search...
            </div>
          ) : results.length === 0 && !isSearching ? (
            <div className="search-no-results">
              <p>No results found for "{query}"</p>
              <span>Try different keywords or check spelling</span>
            </div>
          ) : (
            <>
              <div className="search-results-header">
                {results.length} result{results.length !== 1 ? 's' : ''} found
              </div>
              <div className="search-results-list">
                {results.map((result) => (
                  <SearchResult
                    key={result.id}
                    result={result}
                    onClick={() => onResultClick(result)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
