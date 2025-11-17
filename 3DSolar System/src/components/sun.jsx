import React, { useState, useRef } from "react";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

export default function Sun({ onClick }) {
  const sunRef = useRef();
  const [hovered, setHovered] = useState(false);
  const texture = useLoader(THREE.TextureLoader, "/textures/sun.jpg");

  return (
    <group
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
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
              description:
                "The Sun is the center of the Solar System and the primary source of energy."
            }
          })
        }
      >
        <sphereGeometry args={[3.5, 64, 64]} />
        <meshStandardMaterial
          map={texture}
          emissive={new THREE.Color(0xffaa33)}
          emissiveIntensity={1.5}
        />
      </mesh>

      {/* Hover Label */}
      {hovered && (
        <Html position={[0, 4.8, 0]} distanceFactor={25}>
          <div className="hover-label">Sun</div>
        </Html>
      )}

      <mesh raycast={() => null}>
        <sphereGeometry args={[3.8, 64, 64]} />
        <meshBasicMaterial
          color={new THREE.Color(0xffcc66)}
          opacity={0.2}
          transparent
          side={THREE.BackSide}
        />
      </mesh>

      <pointLight intensity={5} distance={500} color={0xffeeaa} />

      <EffectComposer>
        <Bloom intensity={1.2} luminanceThreshold={0.3} luminanceSmoothing={0.8} />
      </EffectComposer>
    </group>
  );
}
