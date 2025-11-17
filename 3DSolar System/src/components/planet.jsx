import React, { useRef, useState, useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import PlanetAxis from "./PlanetAxis";
import Moon from "./moon";

export default function Planet({
  name,
  textureUrl,
  size,
  distance,
  speed,
  tilt = 23.5,
  info,
  moons = [],
  onClick,
  selected,
  isZoomedOut,
}) {
  const meshRef = useRef();
  const texture = useLoader(THREE.TextureLoader, textureUrl);

  const [hovered, setHovered] = useState(false);
  const orbitAngle = useRef(Math.random() * Math.PI * 2);

  // ⭐ Important: let camera know this is a real planet (zoomable)
  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.userData.noZoomTarget = false;
    }
  }, []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Orbit movement
    orbitAngle.current += speed * delta * 0.8;

    meshRef.current.position.x = distance * Math.cos(orbitAngle.current);
    meshRef.current.position.z = distance * Math.sin(orbitAngle.current);

    // Self rotation
    meshRef.current.rotation.y += 0.01 * (1 / size);
  });

  return (
    <group
      ref={meshRef}
      rotation={[0, 0, THREE.MathUtils.degToRad(tilt)]}
    >
      {/* MAIN PLANET SPHERE */}
      <mesh
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={(e) => {
          e.stopPropagation(); // prevents Moon click passing through
          setHovered(false);

          onClick({
            name,
            size,
            ref: meshRef,
            tilt,
            info,
            moons,
            textureUrl,
            noZoom: false, // ⭐ planets are zoomable
          });
        }}
      >
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial map={texture} />
      </mesh>

      {/* 🌙 SHOW MOON ONLY WHEN ZOOMED IN ON EARTH */}
          {!isZoomedOut &&
      (
        selected?.name === name || selected?.name === "Moon"
      ) &&
      moons.map((m, i) => (
        <Moon
  key={i}
  {...m}
  onClick={onClick}
  planetRef={meshRef}   // ⭐ pass parent planet
/>

      ))
    }


      {/* LABEL — ONLY WHEN ZOOMED OUT */}
      {isZoomedOut && hovered && (
        <Html
          center
          className="hover-label"
          distanceFactor={22}
          pointerEvents="none"
        >
          {name}
        </Html>
      )}

      {/* AXIS — ONLY ON SELECTED PLANET */}
      {selected?.name === name && <PlanetAxis size={size} tilt={tilt} />}
    </group>
  );
}
