import React, { useState, useEffect } from 'react';
import ReactFlow, {
  addEdge,
  ReactFlowProvider,
  Controls,
  MiniMap,
} from 'react-flow-renderer';
import CustomNode from './CustomNode'; // Import custom node component
import { NodeToolbar } from './NodeToolbar';
import { NodeEditor } from './NodeEditor';
import '../styles/flow.css';

const initialNodes = [
  {
    id: '1',
    type: 'custom',
    position: { x: 250, y: 5 },
    data: { label: 'Node 1', description: 'This is the first node.' },
  },
  {
    id: '2',
    type: 'custom',
    position: { x: 250, y: 150 },
    data: { label: 'Node 2', description: 'This is the second node.' },
  },
];

const initialEdges = [{ id: 'e1-2', source: '1', target: '2', animated: true }];

const FlowEditor = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    const savedFlow = localStorage.getItem('flowData');
    if (savedFlow) {
      const { nodes: savedNodes, edges: savedEdges } = JSON.parse(savedFlow);
      setNodes(savedNodes);
      setEdges(savedEdges);
    }
  }, []);

  const showToast = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  };

  const onConnect = (params: any) => {
    const updatedEdges = addEdge(params, edges);
    setEdges(updatedEdges);
    saveFlow(updatedEdges, nodes);
    showToast('Flow updated successfully!');
  };

  const onAddNode = () => {
    const newNode = {
      id: `${nodes.length + 1}`,
      type: 'custom',
      position: { x: Math.random() * 300, y: Math.random() * 300 },
      data: {
        label: `Node ${nodes.length + 1}`,
        description: `Description for Node ${nodes.length + 1}`,
      },
    };

    const updatedNodes = [...nodes, newNode];
    setNodes(updatedNodes);
    saveFlow(edges, updatedNodes);
    showToast('Node added successfully!');
  };

  const onDeleteNode = (nodeId: string) => {
    const updatedNodes = nodes.filter((node) => node.id !== nodeId);
    const updatedEdges = edges.filter(
      (edge) => edge.source !== nodeId && edge.target !== nodeId
    );

    setNodes(updatedNodes);
    setEdges(updatedEdges);
    saveFlow(updatedEdges, updatedNodes);
    showToast('Node deleted successfully!');
  };

  const onSaveFlow = () => {
    saveFlow(edges, nodes);
    showToast('Flow Saved!');
  };

  const saveFlow = (edges: any, nodes: any) => {
    const flowData = { nodes, edges };
    localStorage.setItem('flowData', JSON.stringify(flowData));
  };

  const nodeTypes = {
    custom: (props) => <CustomNode {...props} onDeleteNode={onDeleteNode} /> // Pass onDeleteNode here
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
            const updatedNodes = nodes.map((n) =>
              n.id === node.id ? { ...n, position: node.position } : n
            );
            setNodes(updatedNodes);
            saveFlow(edges, updatedNodes);
          }}
        >
          <Controls />
          <MiniMap />
        </ReactFlow>

        <div className="toolbar">
          <NodeToolbar onAddNode={onAddNode} onSaveFlow={onSaveFlow} />
        </div>
      </ReactFlowProvider>

      <NodeEditor nodes={nodes} setNodes={setNodes} />

      {toastVisible && (
        <div className="toast">
          {toastMessage}
        </div>
      )}
    </div>
  );
};

export default FlowEditor;
