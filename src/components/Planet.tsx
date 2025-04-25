
import { forwardRef, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Text } from "@react-three/drei";
import { PlanetType } from "../types/types";

interface PlanetProps {
  planet: PlanetType;
  isSelected: boolean;
  onClick: () => void;
  showLabel: boolean;
}

const Planet = forwardRef<THREE.Mesh, PlanetProps>(({ planet, isSelected, onClick, showLabel }, ref) => {
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
        <meshPhongMaterial 
          color={color}
          shininess={30}
          specular={new THREE.Color(0x444444)}
          bumpScale={0.05}
          emissive={isSelected ? "white" : "black"}
          emissiveIntensity={isSelected ? 0.2 : 0}
        />
      </mesh>

      {hasRings && (
        <mesh ref={ringRef} position={[0, 0, 0]}>
          <ringGeometry args={[size + 0.5, size + 2, 64]} />
          <meshPhongMaterial 
            color="#A49D88"
            transparent
            opacity={0.7}
            side={THREE.DoubleSide}
            shininess={30}
          />
        </mesh>
      )}

      {showLabel && (
        <Text
          position={[0, size * 1.5, 0]}
          fontSize={size * 0.5}
          color="white"
          anchorX="center"
          anchorY="middle"
          renderOrder={1}
          depthOffset={1}
        >
          {name}
        </Text>
      )}
    </group>
  );
});

Planet.displayName = "Planet";

export default Planet;
