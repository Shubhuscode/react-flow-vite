import React from 'react';
import { Handle } from 'react-flow-renderer';

const CustomNode = ({ id, data, onDeleteNode }) => {
  return (
    <div className="custom-node">
      <div className="node-header">
        <span>{data.label}</span>
        {/* Delete button inside the header */}
        <button onClick={() => onDeleteNode(id)} className="delete-btn">
          X
        </button>
      </div>
      <div className="node-content">
        <p>{data.description}</p>
      </div>

      {/* Input/output handles (if needed) */}
      <Handle
        type="target"
        position="top"
        style={{ background: '#555' }}
      />
      <Handle
        type="source"
        position="bottom"
        style={{ background: '#555' }}
      />
    </div>
  );
};

export default CustomNode;
