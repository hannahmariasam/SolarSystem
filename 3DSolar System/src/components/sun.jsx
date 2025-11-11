import React, { useRef } from "react";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber"; // ✅ This is required
import { EffectComposer, Bloom } from "@react-three/postprocessing";
export default function Sun({ onClick }) {
  const texture = useLoader(THREE.TextureLoader, "/textures/sun.jpg");
  const sunRef = useRef();
  

  return (
    <group>
      <mesh
        ref={sunRef}
        onClick={() => onClick({ name: "Sun", size: 3.5, ref: sunRef })}
      >
        <sphereGeometry args={[3.5, 64, 64]} />
        <meshStandardMaterial
          map={texture}
          emissive={new THREE.Color(0xffaa33)}
          emissiveIntensity={1.5}
          roughness={0.5}
          metalness={0.3}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[3.8, 64, 64]} />
        <meshBasicMaterial
          color={new THREE.Color(0xffcc66)}
          transparent
          opacity={0.2}
          side={THREE.BackSide}
        />
      </mesh>

      <pointLight intensity={5} distance={500} decay={2} color={0xffeeaa} />

      <EffectComposer>
        <Bloom intensity={1.2} luminanceThreshold={0.3} luminanceSmoothing={0.8} />
      </EffectComposer>
    </group>
  );
}
