// components/AsteroidBelt.jsx
import React, { useRef, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Html } from "@react-three/drei";
import { planets } from "../data/planets";

export default function AsteroidBelt({ count = 1200, thickness = 0.4, isZoomedOut }) {
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);

  const mars = planets.find(p => p.name === "Mars");
  const jupiter = planets.find(p => p.name === "Jupiter");

  const inner = mars.distance + 0.8;
  const outer = jupiter.distance - 0.8;

  const asteroids = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      const r = THREE.MathUtils.lerp(inner, outer, Math.random());
      const angle = Math.random() * Math.PI * 2;
      const x = r * Math.cos(angle);
      const z = r * Math.sin(angle);
      const y = (Math.random() - 0.5) * thickness;

      arr.push({ pos: [x, y, z], size: Math.random() * 0.05 + 0.02 });
    }
    return arr;
  }, []);

  useFrame(() => {
    if (groupRef.current) groupRef.current.rotation.y += 0.00015;
  });

  return (
    <group
      ref={groupRef}
      rotation={[0.2, 0, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {asteroids.map((a, i) => (
        <mesh key={i} position={a.pos}>
          <icosahedronGeometry args={[a.size, 0]} />
          <meshStandardMaterial color="#444" />
        </mesh>
      ))}

      {/* Hover label only */}
      {isZoomedOut && (
  <Html position={[inner + (outer - inner) / 2, 0.2, 0]} className="belt-label">
    Asteroid Belt
  </Html>
)}

    </group>
  );
}
