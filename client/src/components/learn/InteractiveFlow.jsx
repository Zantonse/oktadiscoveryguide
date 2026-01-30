import React from 'react';
import { FlowNode } from './FlowNode.jsx';

export function InteractiveFlow({ track }) {
  if (!track || !track.flow || !track.areas) {
    return null;
  }

  // Create a map of area IDs to area details
  const areaMap = {};
  track.areas.forEach(area => {
    areaMap[area.id] = area;
  });

  return (
    <div className="interactive-flow">
      <div className="interactive-flow-header">
        <h3>Discovery Flow</h3>
        <p>Click each step to see questions and signals</p>
      </div>
      <div className="flow-diagram">
        {track.flow.map((step, index) => {
          const area = areaMap[step.area];
          if (!area) return null;

          return (
            <FlowNode
              key={step.area}
              step={step}
              area={area}
              isLast={index === track.flow.length - 1}
            />
          );
        })}
      </div>
    </div>
  );
}
