import React from 'react';
import { Handle, Position } from 'react-flow-renderer';

const CustomNode = ({ data }: any) => {
  return (
    <div className="custom-node">
      <div className="node-header">
        <h3>{data.label}</h3>
      </div>
      <div className="node-content">
        <p>{data.description}</p>
      </div>
      <Handle
        type="target"
        position={Position.Top}
        style={{ borderRadius: '50%', background: '#555' }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ borderRadius: '50%', background: '#555' }}
      />
    </div>
  );
};

export default CustomNode;
