
import { forwardRef, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Text } from "@react-three/drei";
import { PlanetType } from "../types/types";

interface PlanetProps {
  planet: PlanetType;
  isSelected: boolean;
  onClick: () => void;
}

const Planet = forwardRef<THREE.Mesh, PlanetProps>(({ planet, isSelected, onClick }, ref) => {
  const { name, size, color, hasRings } = planet;
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (ringRef.current && hasRings) {
      ringRef.current.rotation.x = Math.PI / 2;
    }
  });

  return (
    <group>
      <mesh ref={ref} onClick={onClick}>
        <sphereGeometry args={[size, 64, 64]} />
        <meshStandardMaterial 
          color={color}
          metalness={0.2}
          roughness={0.8}
          emissive={isSelected ? "white" : "black"}
          emissiveIntensity={isSelected ? 0.2 : 0}
        />
      </mesh>

      {hasRings && (
        <mesh ref={ringRef} position={[0, 0, 0]}>
          <ringGeometry args={[size + 0.5, size + 2, 64]} />
          <meshStandardMaterial 
            color="#A49D88"
            transparent
            opacity={0.7}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      <Text
        position={[0, size + 0.5, 0]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-var.woff2"
      >
        {name}
      </Text>
    </group>
  );
});

Planet.displayName = "Planet";

export default Planet;
