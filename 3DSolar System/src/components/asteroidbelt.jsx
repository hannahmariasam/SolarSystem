// src/components/asteroidbelt.jsx

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
  
  // Safety check for planets
  if (!mars || !jupiter) return null;

  const inner = mars.distance + 0.8;
  const outer = jupiter.distance - 0.8;

  const avgRadius = (inner + outer) / 2;
  // ⭐ CHANGE: Reduced beltHeight for the invisible hitbox to constrain the hover area
  const beltHeight = 0.5; 

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
    >
      {/* 1. INVISIBLE HITBOX MESH (Hover Anywhere Fix) */}
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
        position={[0, 0, 0]}
        rotation={[-Math.PI / 2, 0, 0]} 
      >
        <cylinderGeometry args={[outer, inner, beltHeight, 64, 1, true]} /> 
        <meshBasicMaterial 
          transparent 
          opacity={0} 
          side={THREE.DoubleSide} 
        /> 
      </mesh>
      
      {/* 2. ASTEROID PARTICLES (Unchanged) */}
      {asteroids.map((asteroid, index) => (
        <mesh
          key={index}
          position={asteroid.pos}
          raycast={() => null} 
        >
          <sphereGeometry args={[asteroid.size, 8, 8]} />
          <meshBasicMaterial color="#784f37" />
        </mesh>
      ))}

      {/* 3. HOVER LABEL (Unchanged) */}
      {isZoomedOut && hovered && (
        <Html 
            position={[avgRadius, 0, 0]} 
            center
            className="hover-label"
            distanceFactor={30} 
            wrapperClass="planet-label"
        >
          Asteroid Belt
        </Html>
      )}
    </group>
  );
}
