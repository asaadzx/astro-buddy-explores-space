
import React, { useState } from "react";
import { planetData } from "../data/planetData";
import { Globe, ChevronLeft, ChevronRight } from "lucide-react";  // Using Globe icon instead of Planet
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { askAI } from "../services/aiService";
import { cn } from "@/lib/utils";

interface PlanetListProps {
  apiKey: string;
  onSelectPlanet: (planetName: string) => void;
}

const PlanetList: React.FC<PlanetListProps> = ({ apiKey, onSelectPlanet }) => {
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);
  const [planetInfo, setPlanetInfo] = useState<string>("");
  const [isCollapsed, setIsCollapsed] = useState(false);

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
    <div className={cn(
      "transition-all duration-300 ease-in-out flex items-start gap-2",
      isCollapsed ? "translate-x-[-280px]" : "translate-x-0"
    )}>
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
                className={cn(
                  "text-white border-white/30 hover:bg-white/10",
                  selectedPlanet === planet.name && "bg-white/20 border-white"
                )}
                onClick={() => handlePlanetClick(planet.name)}
              >
                {planet.name}
              </Button>
            ))}
          </div>

          {selectedPlanet && (
            <div className="mt-4 p-3 bg-white/10 rounded-lg">
              <h3 className="font-bold mb-2">{selectedPlanet} Information</h3>
              <p className="text-sm">{planetInfo || "Loading information..."}</p>
            </div>
          )}
        </CardContent>
      </Card>
      <Button
        variant="outline"
        size="icon"
        className="bg-black/70 backdrop-blur-md text-white border-white/30 hover:bg-white/10"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
      </Button>
    </div>
  );
};

export default PlanetList;
