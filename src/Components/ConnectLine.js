import React from 'react';
import { useStore } from 'reactflow';

const CustomConnection = ({ fromX, fromY, toX, toY }) => {
  const { connectionHandleId } = useStore();
  const colors = { color: "green" };

  return (
    <g>
      <path
        fill="none"
        stroke={colors.color}
        strokeWidth={4.5}
        className="animated"
        d={`M${fromX},${fromY} C ${fromX} ${toY} ${fromX} ${toY} ${toX},${toY}`}
      />
      <circle
        cx={toX}
        cy={toY}
        fill={colors.color}
        r={15}
        stroke={connectionHandleId}
        strokeWidth={1.5}
      />
    </g>
  );
};

export default CustomConnection;
