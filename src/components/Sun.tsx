
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

  return (
    <mesh ref={sunRef}>
      <sphereGeometry args={[2.5, 64, 64]} />
      <meshBasicMaterial>
        <color attach="value" args={["#FDB813"]} />
        <gradientTexture
          attach="map"
          args={[["#FF4500", "#FDB813", "#FFD700"]]}
          stops={[0, 0.5, 1]}
        />
      </meshBasicMaterial>
      <pointLight color="#FDB813" intensity={1.5} distance={100} decay={2} />
    </mesh>
  );
};

export default Sun;
