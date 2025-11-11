import React, { useMemo } from "react";
import * as THREE from "three";

export default function OrbitRing({ radius }) {
  const geometry = useMemo(() => {
    const points = [];
    for (let i = 0; i <= 128; i++) {
      const angle = (i / 128) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [radius]);

  return (
    <line geometry={geometry}>
      <lineBasicMaterial color="#666" />
    </line>
  );
}
