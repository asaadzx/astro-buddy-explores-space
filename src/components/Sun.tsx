
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

  // Create a custom shader material with a gradient effect
  const sunMaterial = new THREE.MeshBasicMaterial({
    color: "#FDB813",
    emissive: "#FF4500",
    emissiveIntensity: 0.5,
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
