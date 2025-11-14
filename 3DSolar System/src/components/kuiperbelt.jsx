// components/KuiperBelt.jsx
import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { planets } from "../data/planets";

export default function KuiperBelt({
  count = 2000,        // lots of tiny bodies
  thickness = 1.2,     // thin vertical ring
  fade = 0.22,         // faint visibility
  tilt = 0.15          // slight tilt like real Kuiper belt
}) {
  const groupRef = useRef();

  // Get Neptune distance
  const neptune = planets.find(p => p.name === "Neptune");
  const inner = (neptune?.distance ?? 27) + 4;
  const outer = inner + 6; // wide band like real Kuiper belt

  const objects = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      const r = THREE.MathUtils.lerp(inner, outer, Math.random());
      const angle = Math.random() * Math.PI * 2;

      const x = r * Math.cos(angle);
      const z = r * Math.sin(angle);
      const y = (Math.random() - 0.5) * thickness;

      const size = Math.random() * 0.15 + 0.03;

      // Kuiper objects = icy → whites, blues, light grey
      const base = 0.7 + Math.random() * 0.3;
      const color = new THREE.Color(base, base, 1);

      arr.push({ pos: [x, y, z], size, color });
    }
    return arr;
  }, [count, inner, outer, thickness]);

  useFrame(() => {
    if (groupRef.current) groupRef.current.rotation.y += 0.00005;
  });

  return (
    <group ref={groupRef} rotation={[tilt, 0, 0]}>
      {objects.map((o, i) => (
        <mesh key={i} position={o.pos}>
          <icosahedronGeometry args={[o.size, 0]} />
          <meshStandardMaterial
            color={o.color}
            roughness={1}
            metalness={0}
            transparent
            opacity={fade}
          />
        </mesh>
      ))}
    </group>
  );
}
