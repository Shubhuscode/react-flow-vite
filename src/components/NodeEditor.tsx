import React from 'react';

export const NodeEditor = ({ nodes, setNodes }: any) => {
  const onNodeChange = (id: string, newLabel: string) => {
    setNodes((nds: any) =>
      nds.map((node: any) =>
        node.id === id
          ? { ...node, data: { ...node.data, label: newLabel } }
          : node
      )
    );
  };

  return (
    <div className="node-editor">
      {nodes.map((node: any) => (
        <div key={node.id}>
          <input
            type="text"
            value={node.data.label}
            onChange={(e) => onNodeChange(node.id, e.target.value)}
            placeholder="Edit Node Label"
          />
        </div>
      ))}
    </div>
  );
};
