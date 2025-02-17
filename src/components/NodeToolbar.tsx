// src/components/NodeToolbar.tsx

import React from 'react';

interface NodeToolbarProps {
  onAddNode: () => void;
  onSaveFlow: () => void;
}

const NodeToolbar: React.FC<NodeToolbarProps> = ({ onAddNode, onSaveFlow }) => {
  return (
    <div className="node-toolbar">
      <button onClick={onAddNode}>Add Node</button>
      <button onClick={onSaveFlow}>Save Flow</button>
    </div>
  );
};

export { NodeToolbar };
