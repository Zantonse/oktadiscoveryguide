import React, { useState, useRef, useEffect } from 'react';

export function Dropdown({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  searchable = true,
  groupBy = null,
  renderOption = null,
  className = '',
  clearable = false
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter options by search term
  const filteredOptions = options.filter(option =>
    option.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    option.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group options if groupBy is provided
  const groupedOptions = groupBy
    ? filteredOptions.reduce((acc, option) => {
        const group = option[groupBy] || 'Other';
        if (!acc[group]) acc[group] = [];
        acc[group].push(option);
        return acc;
      }, {})
    : { all: filteredOptions };

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onChange(null);
  };

  const selectedLabel = value?.name || placeholder;

  return (
    <div className={`dropdown ${className}`} ref={dropdownRef}>
      <div
        className={`dropdown-trigger ${isOpen ? 'open' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          if (className.includes('disabled')) return;
          setIsOpen(!isOpen);
          if (!isOpen && searchable) {
            setTimeout(() => inputRef.current?.focus(), 0);
          }
        }}
      >
        <span className={`dropdown-value ${!value ? 'placeholder' : ''}`}>
          {selectedLabel}
        </span>
        <div className="dropdown-actions">
          {clearable && value && (
            <span className="dropdown-clear" onClick={handleClear} title="Clear selection">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </span>
          )}
          <span className="dropdown-arrow">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </span>
        </div>
      </div>

      {isOpen && (
        <div className="dropdown-menu">
          {searchable && (
            <div className="dropdown-search">
              <input
                ref={inputRef}
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}

          <div className="dropdown-options">
            {Object.entries(groupedOptions).map(([group, groupOptions]) => (
              <div key={group} className="dropdown-group">
                {groupBy && group !== 'all' && (
                  <div className="dropdown-group-label">{group}</div>
                )}
                {groupOptions.map(option => (
                  <div
                    key={option.id}
                    className={`dropdown-option ${value?.id === option.id ? 'selected' : ''}`}
                    onClick={() => handleSelect(option)}
                  >
                    {renderOption ? renderOption(option) : (
                      <div className="dropdown-option-content">
                        <span className="dropdown-option-name">{option.name}</span>
                        {option.description && (
                          <span className="dropdown-option-description">{option.description}</span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}

            {filteredOptions.length === 0 && (
              <div className="dropdown-empty">No results found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
