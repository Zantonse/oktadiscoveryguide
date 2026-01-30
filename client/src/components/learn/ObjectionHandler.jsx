import React from 'react';
import { ObjectionCard } from './ObjectionCard.jsx';

export function ObjectionHandler({ objections }) {
  if (!objections || objections.length === 0) {
    return null;
  }

  return (
    <div className="objection-handler">
      <div className="objection-handler-header">
        <h3>Practice Handling Objections</h3>
        <p>Click any objection to reveal the recommended response</p>
      </div>
      <div className="objection-grid">
        {objections.map((objection, index) => (
          <ObjectionCard key={index} objection={objection} />
        ))}
      </div>
    </div>
  );
}
