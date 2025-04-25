import { useRef, useState, useEffect } from "react";
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
  selectedPlanet?: string | null;  // Add this prop
}

const SolarSystemContent = ({ 
  isPaused, 
  speed, 
  showOrbits, 
  showLabels, 
  selectedPlanet 
}: SolarSystemProps) => {
  // Use refs for animating planet positions
  const planetsRef = useRef<any[]>(Array(planetData.length).fill(null));
  const [cameraTarget, setCameraTarget] = useState<{ x: number, z: number } | null>(null);
  const [selectedPlanetName, setSelectedPlanetName] = useState<string | null>(null);

  useEffect(() => {
    if (selectedPlanet) {
      const planetIndex = planetData.findIndex(p => p.name === selectedPlanet);
      if (planetIndex !== -1) {
        const planet = planetData[planetIndex];
        setCameraTarget({ 
          x: Math.cos((Math.PI * 2 * 0) / 8) * planet.distanceFromSun, 
          z: Math.sin((Math.PI * 2 * 0) / 8) * planet.distanceFromSun 
        });
        setSelectedPlanetName(selectedPlanet);
      }
    } else {
      setCameraTarget(null);
      setSelectedPlanetName(null);
    }
  }, [selectedPlanet]);

  // Animation frame
  useFrame(({ clock, camera }) => {
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

    // Update camera position if a planet is selected
    if (cameraTarget) {
      camera.position.x += (cameraTarget.x - camera.position.x) * 0.02;
      camera.position.z += (cameraTarget.z - camera.position.z) * 0.02;
    }
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
          isSelected={selectedPlanetName === planet.name}
          onClick={() => setSelectedPlanetName(selectedPlanetName === planet.name ? null : planet.name)}
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
