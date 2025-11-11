import React from "react";
import { Line } from "@react-three/drei";

export default function PlanetAxes({ size, tilt = 23.5 }) {
  const tiltRadians = (tilt * Math.PI) / 180;

  // Axis line (rotation tilt)
  const axisPoints = [
    [0, -size * 1.5, 0],
    [0, size * 1.5, 0],
  ];

  // Equator ring
  const equatorPoints = [];
  for (let i = 0; i <= 64; i++) {
    const angle = (i / 64) * Math.PI * 2;
    equatorPoints.push([Math.cos(angle) * size, 0, Math.sin(angle) * size]);
  }

  return (
    <group rotation={[tiltRadians, 0, 0]}>
      {/* Tilt Axis (red) */}
      <Line
        points={axisPoints}
        color="red"
        lineWidth={2}
        transparent
        opacity={0.8}
      />

      {/* Equator ring (blue) */}
      <Line
        points={equatorPoints}
        color="cyan"
        lineWidth={1}
        transparent
        opacity={0.6}
      />
    </group>
  );
}
