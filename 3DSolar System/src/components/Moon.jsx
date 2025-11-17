import React, { useRef, useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

export default function Moon({ textureUrl, size, distance, speed, onClick }) {
  const moonRef = useRef();
  const texture = useLoader(THREE.TextureLoader, textureUrl);

  const angle = useRef(Math.random() * Math.PI * 2);
  const orbitTilt = THREE.MathUtils.degToRad(5); // small natural tilt

  // ⭐ IMPORTANT: mark moon as non-zoom target for camera
  useEffect(() => {
    if (moonRef.current) {
      moonRef.current.userData.noZoomTarget = true;
    }
  }, []);

  useFrame((_, delta) => {
    if (!moonRef.current) return;

    // Slow & close orbit
    angle.current += speed * delta * 0.15; // smoother & slower

    const x = distance * Math.cos(angle.current);
    const z = distance * Math.sin(angle.current);
    const y = Math.sin(angle.current) * (distance * 0.1); // slight wobble

    moonRef.current.position.set(x, y, z);

    // Slow moon rotation
    moonRef.current.rotation.y += 0.0015;
    moonRef.current.rotation.x = orbitTilt;
  });

  return (
    <mesh
      ref={moonRef}
      onClick={(e) => {
        e.stopPropagation(); // prevent clicking Earth behind Moon

        onClick({
          name: "Moon",
          size,
          ref: moonRef,
          noZoom: true, // ⭐ DO NOT MOVE CAMERA
          info: {
            type: "Natural Satellite",
            diameter: "3,474 km",
            gravity: "1.62 m/s²",
            surfaceTemp: "-53°C average",
            description:
              "The Moon is Earth's only natural satellite. It stabilizes Earth's tilt and causes ocean tides."
          }
        });
      }}
    >
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}
