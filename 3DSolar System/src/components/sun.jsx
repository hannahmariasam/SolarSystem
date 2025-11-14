import React, { useRef } from "react";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

export default function Sun({ onClick }) {
  const texture = useLoader(THREE.TextureLoader, "/textures/sun.jpg");
  const sunRef = useRef();

  const info = {
    type: "Star (G-type Main Sequence)",
    diameter: "1,391,000 km",
    surfaceTemp: "5,500°C",
    coreTemp: "15,000,000°C",
    age: "4.6 billion years",
    composition: "Hydrogen (74%), Helium (24%)",
    lightTravelTime: "8 min 20 sec",
    description:
      "The Sun is the central star of the Solar System. Its gravity holds the planets in orbit, and its fusion reactions power all life on Earth."
  };

  return (
    <group>
      {/* MAIN SUN (clickable) */}
      <mesh
        ref={sunRef}
       onClick={() =>
  onClick({
    name: "Sun",
    size: 3.5,
    ref: sunRef,
    tilt: 0,
    info: {
      type: "Star",
      diameter: "1,391,000 km",
      surfaceTemp: "5,500°C",
      gravity: "274 m/s²",
      description: "The Sun is the center of the Solar System and the primary source of light and energy."
    }
  })
}

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

      {/* GLOW (non-clickable) */}
      <mesh raycast={() => null}>
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

