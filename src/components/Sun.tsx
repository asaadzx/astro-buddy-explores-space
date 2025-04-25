
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const Sun = () => {
  const sunRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.001;
    }
  });

  return (
    <mesh ref={sunRef}>
      <sphereGeometry args={[2.5, 32, 32]} />
      <meshBasicMaterial color="#FDB813" />
      <pointLight color="#FDB813" intensity={1.5} distance={100} decay={2} />
    </mesh>
  );
};

export default Sun;
