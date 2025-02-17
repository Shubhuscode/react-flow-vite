// src/components/CustomEdge.tsx
import React from 'react';
import { EdgeProps, getBezierPath } from 'react-flow-renderer';

const CustomEdge: React.FC<EdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
}) => {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  return (
    <path
      id={id}
      className="custom-edge" // Add custom class for hover effects
      style={{ stroke: 'steelblue', strokeWidth: 2 }}
      d={edgePath}
      fill="transparent"
    />
  );
};

export default CustomEdge;
