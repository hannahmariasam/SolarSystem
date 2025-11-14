// components/AsteroidBelt.jsx
import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { planets } from "../data/planets";

export default function AsteroidBelt({
  count = 1200,        // reduced count → less visible
  thickness = 0.4,     // thinner band
  tilt = 0.2,          // slight tilt for realism
  fade = 0.25          // transparency
}) {
  const groupRef = useRef();

  // Distances from your planets list
  const mars = planets.find(p => p.name === "Mars");
  const jupiter = planets.find(p => p.name === "Jupiter");

  const inner = (mars?.distance ?? 12) + 0.8;
  const outer = (jupiter?.distance ?? 15) - 0.8;

  // Create asteroid rocks
  const asteroids = useMemo(() => {
    const arr = [];

    for (let i = 0; i < count; i++) {
      // radius between inner & outer
      const r = THREE.MathUtils.lerp(inner, outer, Math.random());

      // angle & elliptical variation
      const angle = Math.random() * Math.PI * 2;
      const ellipse = 1 + (Math.random() * 0.03 - 0.015);

      const x = r * Math.cos(angle) * ellipse;
      const z = r * Math.sin(angle);
      const y = (Math.random() - 0.5) * thickness; // thin belt

      // very small asteroid sizes
      const size = Math.random() * 0.12 + 0.03;

      // darker rocky colors
      const base = 0.25 + Math.random() * 0.2;
      const color = new THREE.Color(base, base * 0.9, base * 0.8);

      arr.push({ pos: [x, y, z], size, color });
    }

    return arr;
  }, [count, inner, outer, thickness]);

  // Rotate belt
  useFrame(() => {
    if (groupRef.current) groupRef.current.rotation.y += 0.00015;
  });

  return (
    <group ref={groupRef} rotation={[tilt, 0, 0]}>
      {asteroids.map((a, i) => (
        <mesh key={i} position={a.pos}>
          <icosahedronGeometry args={[a.size, 0]} />
          <meshStandardMaterial
            color={a.color}
            roughness={1}
            metalness={0.05}
            transparent
            opacity={fade}     // ← fades the asteroids (less visible)
          />
        </mesh>
      ))}
    </group>
  );
}
