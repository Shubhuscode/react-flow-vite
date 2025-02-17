// src/contexts/FlowContext.tsx

import React, { createContext, useState, useContext } from 'react';

interface FlowContextType {
  nodes: any[];
  edges: any[];
  setNodes: React.Dispatch<React.SetStateAction<any[]>>;
  setEdges: React.Dispatch<React.SetStateAction<any[]>>;
}

const FlowContext = createContext<FlowContextType | undefined>(undefined);

const FlowProvider: React.FC = ({ children }) => {
  const [nodes, setNodes] = useState<any[]>([]);
  const [edges, setEdges] = useState<any[]>([]);

  return (
    <FlowContext.Provider value={{ nodes, edges, setNodes, setEdges }}>
      {children}
    </FlowContext.Provider>
  );
};

const useFlow = (): FlowContextType => {
  const context = useContext(FlowContext);
  if (!context) {
    throw new Error('useFlow must be used within a FlowProvider');
  }
  return context;
};

export { FlowProvider, useFlow };
