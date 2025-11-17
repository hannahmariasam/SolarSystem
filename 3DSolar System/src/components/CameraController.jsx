import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef, useEffect } from "react";

export default function CameraController({ target, planetSize, zoomOutTrigger }) {
  const { camera } = useThree();

  const targetPos = useRef(new THREE.Vector3());
  const desiredPos = useRef(new THREE.Vector3());
  const lastTarget = useRef(null);

  const zoomingOut = useRef(false);
  const freeMode = useRef(true);   // ⭐ NEW — allows OrbitControls to work

  // When a planet or moon is clicked
  useEffect(() => {
    if (target) {
      freeMode.current = false;  // camera is locked to focus
      zoomingOut.current = false;
      lastTarget.current = target;
    }
  }, [target]);

  // When zoom-out button is pressed
  useEffect(() => {
    if (!target && lastTarget.current) {
      zoomingOut.current = true;
      freeMode.current = false;   // still controlling camera until zoom-out ends
    }
  }, [zoomOutTrigger]);

  useFrame(() => {
    // ============================================
    // 1) Follow selected planet (zoom-in)
    // ============================================
    if (target) {
      target.getWorldPosition(targetPos.current);

      const distance = planetSize * 6;

      desiredPos.current.set(
        targetPos.current.x + distance,
        targetPos.current.y + distance * 0.4,
        targetPos.current.z + distance
      );

      camera.position.lerp(desiredPos.current, 0.08);
      camera.lookAt(targetPos.current);
      return;
    }

    // ============================================
    // 2) One-time zoom out
    // ============================================
    if (zoomingOut.current && lastTarget.current) {
      lastTarget.current.getWorldPosition(targetPos.current);

      const dir = camera.position.clone().sub(targetPos.current).normalize();
      camera.position.addScaledVector(dir, 4);

      camera.lookAt(targetPos.current);

      zoomingOut.current = false;

      // ⭐ IMPORTANT — After finishing zoom-out, free camera!
      freeMode.current = true;
      return;
    }

    // ============================================
    // 3) Free movement — OrbitControls take over
    // ============================================
    if (freeMode.current) {
      // Do nothing → allows OrbitControls to work normally
      return;
    }
  });

  return null;
}
