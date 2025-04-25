
import { forwardRef, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { PlanetType } from "../types/types";
import { Text } from "@react-three/drei";

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
      {/* Planet sphere */}
      <mesh ref={ref} onClick={onClick}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial 
          color={color} 
          emissive={isSelected ? "white" : "black"} 
          emissiveIntensity={isSelected ? 0.2 : 0}
        />
      </mesh>

      {/* Saturn's rings */}
      {hasRings && (
        <mesh ref={ringRef} position={[0, 0, 0]}>
          <ringGeometry args={[size + 0.5, size + 2, 32]} />
          <meshStandardMaterial 
            color="#A49D88" 
            side={2} 
            transparent 
            opacity={0.7} 
          />
        </mesh>
      )}

      {/* Label */}
      <Text
        position={[0, size + 0.5, 0]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {name}
      </Text>
    </group>
  );
});

Planet.displayName = "Planet";

export default Planet;
