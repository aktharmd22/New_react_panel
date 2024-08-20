import React from 'react';
import {
  BaseEdge,
  EdgeLabelRenderer,
  getSimpleBezierPath,
  useReactFlow,
  getMarkerEnd,
} from 'reactflow';
import { MdCancel } from "react-icons/md";
import 'reactflow/dist/style.css';

export default function CustomEdge({ id, sourceX, sourceY, targetX, targetY }) {
  const { setEdges } = useReactFlow();
  const [edgePath, labelX, labelY] = getSimpleBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      {/* SVG marker definition */}
      <svg width="10%" height="10%">
        <defs>
          <marker
            id={`arrow-${id}`}
            viewBox="0 0 10 10"
            refX="10"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="green" />
          </marker>
        </defs>
      </svg>

      <BaseEdge
        id={id}
        path={edgePath}
        style={{ stroke: 'green', strokeWidth: 3 }} // Change stroke color and width here
        markerEnd={`url(#arrow-${id})`} // Reference the marker ID here
      />

      <EdgeLabelRenderer>
        <button
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: 'all',
            fontSize: "30px",
            marginRight: "20px",
          }}
          className="animated"
          onClick={() => {
            setEdges((es) => es.filter((e) => e.id !== id));
          }}
        >
          <MdCancel className='text-red-600 z-10' />
        </button>
      </EdgeLabelRenderer>
    </>
  );
}
