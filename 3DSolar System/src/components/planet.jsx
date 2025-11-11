import React, { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import PlanetAxis from "./PlanetAxis";

export default function Planet({
  name,
  textureUrl,
  size,
  distance,
  speed,
  tilt = 23.5,
  info,
  onClick,
  selected,
}) {
  const meshRef = useRef();
  const texture = useLoader(THREE.TextureLoader, textureUrl);
  const angleRef = useRef(Math.random() * Math.PI * 2);

  useFrame(() => {
    angleRef.current += speed * 0.01;
    meshRef.current.position.x = distance * Math.cos(angleRef.current);
    meshRef.current.position.z = distance * Math.sin(angleRef.current);
    meshRef.current.rotation.y += 0.01;
  });

  return (
    <group ref={meshRef}>
      <mesh onClick={() => onClick({ name, size, ref: meshRef, tilt, info })}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial map={texture} />
      </mesh>

      {/* Show tilt + axis if this planet is selected */}
      {selected?.name === name && <PlanetAxis size={size} tilt={tilt} />}
    </group>
  );
}
