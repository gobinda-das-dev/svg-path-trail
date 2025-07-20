import { useFrame } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react'

const TRAIL_POINTS = 32;

const Trail = () => {
  const ref = useRef(null);
  const positions = useRef(
    Array.from({ length: TRAIL_POINTS }, () => [0, 0, 0])
  );

  useFrame(({ mouse }) => {
    if (!ref.current) return;
    const geometry = ref.current.geometry;
    const posAttr = geometry.attributes.position;

    // Shift all points back, insert new mouse position at the front
    for (let i = TRAIL_POINTS - 1; i > 0; i--) {
      positions.current[i][0] = positions.current[i - 1][0];
      positions.current[i][1] = positions.current[i - 1][1];
      positions.current[i][2] = 0;
    }
    // Set the first point to the current mouse position (in NDC, scale to mesh)
    positions.current[0][0] = mouse.x;
    positions.current[0][1] = mouse.y;
    positions.current[0][2] = 0;

    // Update geometry positions
    for (let i = 0; i < TRAIL_POINTS; i++) {
      posAttr.setXYZ(i, positions.current[i][0], positions.current[i][1], positions.current[i][2]);
    }
    posAttr.needsUpdate = true;
  });

  return (
    <line ref={ref} scale={2}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={TRAIL_POINTS}
          array={new Float32Array(TRAIL_POINTS * 3)}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="white" />
    </line>
  );
};

export default Trail;
