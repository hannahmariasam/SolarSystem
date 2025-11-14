import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef } from "react";

export default function CameraController({ target, planetSize, zoomOutTrigger }) {
  const { camera } = useThree();
  const worldPos = useRef(new THREE.Vector3());
  const offset = useRef(new THREE.Vector3());
  const isZoomingOut = useRef(false);

  // Trigger one-time zoom out when button is clicked
  if (zoomOutTrigger) {
    isZoomingOut.current = true;
  }

  useFrame(() => {
    if (target) {
      // Zoom in on selected planet/Sun
      target.getWorldPosition(worldPos.current);
      const distanceMultiplier = target.userData.isSun ? 12 : planetSize * 5;

      offset.current.set(
        worldPos.current.x + distanceMultiplier,
        worldPos.current.y + distanceMultiplier / 2,
        worldPos.current.z + distanceMultiplier
      );

      camera.position.lerp(offset.current, 0.05);
      camera.lookAt(worldPos.current);

      // Stop zoom out if it was active
      isZoomingOut.current = false;

    } else if (isZoomingOut.current) {
      // Slight zoom out: move camera away from its current target, not toward Sun
      // Calculate vector from last selected planet to camera
      const lastTargetPos = worldPos.current.clone();
      const zoomDirection = camera.position.clone().sub(lastTargetPos).normalize();

      // Move camera slightly along that vector
      camera.position.addScaledVector(zoomDirection, 5); // tweak distance
      camera.lookAt(lastTargetPos); // keep looking at last planet
      isZoomingOut.current = false; // only do once
    }

    // Otherwise (no target, no zooming) do nothing → free orbit controls
  });

  return null;
}

