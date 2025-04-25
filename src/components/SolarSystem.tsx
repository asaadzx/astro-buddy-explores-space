
import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, OrbitControls, Text } from "@react-three/drei";
import { planetData } from "../data/planetData";
import Planet from "./Planet";
import Sun from "./Sun";

interface SolarSystemProps {
  isPaused: boolean;
  speed: number;
  showOrbits: boolean;
  showLabels: boolean;
}

const SolarSystemContent = ({ isPaused, speed, showOrbits, showLabels }: SolarSystemProps) => {
  // Use refs for animating planet positions
  const planetsRef = useRef<any[]>(Array(planetData.length).fill(null));
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);

  // Animation frame
  useFrame(({ clock }) => {
    if (isPaused) return;

    const elapsedTime = clock.getElapsedTime();

    planetData.forEach((planet, index) => {
      if (!planetsRef.current[index]) return;
      
      const angle = (elapsedTime * speed * planet.orbitSpeed) % (Math.PI * 2);
      const x = Math.cos(angle) * planet.distanceFromSun;
      const z = Math.sin(angle) * planet.distanceFromSun;
      
      planetsRef.current[index].position.x = x;
      planetsRef.current[index].position.z = z;
      
      // Rotate the planet on its axis
      planetsRef.current[index].rotation.y += planet.rotationSpeed * 0.01 * speed;
    });
  });

  return (
    <>
      <ambientLight intensity={1.5} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#FDB813" />
      <Stars radius={100} depth={50} count={5000} factor={4} fade speed={1} />
      
      {/* Sun at the center */}
      <Sun />
      
      {/* Planets */}
      {planetData.map((planet, index) => (
        <Planet 
          key={planet.name}
          ref={el => planetsRef.current[index] = el}
          planet={planet}
          isSelected={selectedPlanet === planet.name}
          onClick={() => setSelectedPlanet(selectedPlanet === planet.name ? null : planet.name)}
          showLabel={showLabels}
        />
      ))}

      {/* Orbit rings */}
      {showOrbits && planetData.map((planet) => (
        <mesh key={`orbit-${planet.name}`} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[planet.distanceFromSun, planet.distanceFromSun + -0.05, 64]} />
          <meshBasicMaterial color="#ffffff" opacity={0.6} transparent />
        </mesh>
      ))}
    </>
  );
};

const SolarSystem = (props: SolarSystemProps) => {
  return (
    <Canvas className="h-full w-full" camera={{ position: [0, 30, 0], fov: 60 }}>
      <OrbitControls 
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={5}
        maxDistance={100}
      />
      <SolarSystemContent {...props} />
    </Canvas>
  );
};

export default SolarSystem;
