// components/KuiperBelt.jsx
import React, { useRef, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { planets } from "../data/planets";

export default function KuiperBelt({isZoomedOut}) {
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);

  const neptune = planets.find(p => p.name === "Neptune");
  const inner = neptune.distance + 4;
  const outer = inner + 6;

  const objects = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 2000; i++) {
      const r = THREE.MathUtils.lerp(inner, outer, Math.random());
      const ang = Math.random() * Math.PI * 2;
      arr.push({
        pos: [r * Math.cos(ang), (Math.random() - 0.5) * 1.2, r * Math.sin(ang)],
        size: Math.random() * 0.05 + 0.02
      });
    }
    return arr;
  }, []);

  useFrame(() => {
    if (groupRef.current) groupRef.current.rotation.y += 0.00005;
  });

  return (
    <group
      ref={groupRef}
      rotation={[0.15, 0, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {objects.map((o, i) => (
        <mesh key={i} position={o.pos}>
          <icosahedronGeometry args={[o.size, 0]} />
          <meshStandardMaterial color="#88ccee" />
        </mesh>
      ))}

      {isZoomedOut && (
  <Html position={[inner + (outer - inner) / 2, 0.2, 0]} className="belt-label">
    Kuiper Belt
  </Html>
)}

    </group>
  );
}
