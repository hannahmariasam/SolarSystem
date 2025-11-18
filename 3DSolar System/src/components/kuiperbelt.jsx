// src/components/kuiperbelt.jsx

import React, { useRef, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { planets } from "../data/planets";

export default function KuiperBelt({isZoomedOut}) {
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);

  const neptune = planets.find(p => p.name === "Neptune");
  
  if (!neptune) return null;

  const neptuneDistance = neptune.distance || 30; 
  
  const inner = neptuneDistance + 4; 
  const outer = inner + 6;            

  const avgRadius = (inner + outer) / 2;
  // ⭐ CHANGE: Reduced beltHeight for the invisible hitbox to constrain the hover area
  const beltHeight = 1.5; 

  const objects = useMemo(() => {
    const arr = [];
    // Balanced count and size for visibility without obscuring Pluto
    for (let i = 0; i < 1500; i++) { 
      const r = THREE.MathUtils.lerp(inner, outer, Math.random());
      const ang = Math.random() * Math.PI * 2;
      arr.push({
        pos: [r * Math.cos(ang), (Math.random() - 0.5) * 1.2, r * Math.sin(ang)],
        size: Math.random() * 0.08 + 0.02 
      });
    }
    return arr;
  }, [inner, outer]);

  useFrame(() => {
    if (groupRef.current) groupRef.current.rotation.y += 0.00005;
  });

  return (
    <group
      ref={groupRef}
      rotation={[0.15, 0, 0]}
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
      
      {/* 2. KUIPER BELT PARTICLES (Unchanged) */}
      {objects.map((o, i) => (
        <mesh key={i} position={o.pos} raycast={() => null}>
          <icosahedronGeometry args={[o.size, 0]} />
          <meshBasicMaterial color="#99aacc" /> 
        </mesh>
      ))}

      {/* 3. HOVER LABEL (Unchanged) */}
      {isZoomedOut && hovered && (
        <Html
          position={[avgRadius, 0.1, 0]} 
          className="hover-label"
          distanceFactor={40} 
        >
          Kuiper Belt
        </Html>
      )}
    </group>
  );
}
