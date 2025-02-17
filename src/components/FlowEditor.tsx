import React, { useState } from 'react';
import ReactFlow, {
  addEdge,
  ReactFlowProvider,
  Controls,
  MiniMap,
  Handle,
  Position,
} from 'react-flow-renderer';
import CustomNode from './CustomNode'; // Import custom node component
import { NodeToolbar } from './NodeToolbar';
import { NodeEditor } from './NodeEditor';
import '../styles/flow.css';

const initialNodes = [
  {
    id: '1',
    type: 'custom', // Custom node type
    position: { x: 250, y: 5 },
    data: { label: 'Node 1', description: 'This is the first node.' },
  },
  {
    id: '2',
    type: 'custom', // Custom node type
    position: { x: 250, y: 150 },
    data: { label: 'Node 2', description: 'This is the second node.' },
  },
];

const initialEdges = [{ id: 'e1-2', source: '1', target: '2', animated: true }];

const FlowEditor = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onConnect = (params: any) => setEdges((eds) => addEdge(params, eds));

  const onAddNode = () => {
    const newNode = {
      id: `${nodes.length + 1}`,
      type: 'custom', // Use the custom type for the node
      position: { x: Math.random() * 300, y: Math.random() * 300 },
      data: {
        label: `Node ${nodes.length + 1}`,
        description: `Description for Node ${nodes.length + 1}`,
      },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const onSaveFlow = () => {
    const flowData = { nodes, edges };
    console.log('Flow Saved:', flowData);
  };

  const nodeTypes = {
    custom: CustomNode, // Register custom node type
  };

  return (
    <div className="flow-container">
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          onNodeDragStop={(event, node) => {
            setNodes((nds) =>
              nds.map((n) =>
                n.id === node.id ? { ...n, position: node.position } : n
              )
            );
          }}
        >
          <Controls />
          <MiniMap />
        </ReactFlow>

        <div className="toolbar">
          <NodeToolbar onAddNode={onAddNode} onSaveFlow={onSaveFlow} />
        </div>
      </ReactFlowProvider>

      {/* Optionally add a node editor */}
      <NodeEditor nodes={nodes} setNodes={setNodes} />
    </div>
  );
};

export default FlowEditor;
