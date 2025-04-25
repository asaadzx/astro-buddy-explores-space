
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Sun = () => {
  const sunRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.001;
    }
  });

  // Create a custom material with a bright color to simulate sun's glow
  const sunMaterial = new THREE.MeshBasicMaterial({
    color: "#FDB813",  // Bright golden yellow
  });

  return (
    <mesh ref={sunRef}>
      <sphereGeometry args={[2.5, 64, 64]} />
      <primitive object={sunMaterial} />
      <pointLight color="#FDB813" intensity={1.5} distance={100} decay={2} />
    </mesh>
  );
};

export default Sun;
