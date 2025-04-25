
import React, { useState } from "react";
import { planetData } from "../data/planetData";
import { Globe } from "lucide-react";  // Replaced Planet with a suitable icon
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { askAI } from "../services/aiService";

interface PlanetListProps {
  apiKey: string;
  onSelectPlanet: (planetName: string) => void;
}

const PlanetList: React.FC<PlanetListProps> = ({ apiKey, onSelectPlanet }) => {
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);
  const [planetInfo, setPlanetInfo] = useState<string>("");

  const handlePlanetClick = async (planetName: string) => {
    setSelectedPlanet(planetName);
    
    try {
      const aiResponse = await askAI(`Tell me interesting facts about the planet ${planetName}`, apiKey);
      setPlanetInfo(aiResponse);
      onSelectPlanet(planetName);
    } catch (error) {
      console.error("Error fetching planet info:", error);
      setPlanetInfo("Could not fetch planet information.");
    }
  };

  return (
    <Card className="w-[300px] bg-black/70 backdrop-blur-md text-white">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Globe className="mr-2" /> Solar System Planets
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          {planetData.map((planet) => (
            <Button
              key={planet.name}
              variant="outline"
              className="text-white border-white/30 hover:bg-white/10"
              onClick={() => handlePlanetClick(planet.name)}
            >
              {planet.name}
            </Button>
          ))}
        </div>

        {selectedPlanet && (
          <div className="mt-4 p-3 bg-white/10 rounded-lg">
            <h3 className="font-bold mb-2">{selectedPlanet} Information</h3>
            <p>{planetInfo || "Loading information..."}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PlanetList;

