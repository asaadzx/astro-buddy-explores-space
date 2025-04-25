import { useState, useEffect } from "react";
import SolarSystem from "../components/SolarSystem";
import ControlPanel from "../components/ControlPanel";
import ChatInterface from "../components/ChatInterface";
import ApiKeyModal from "../components/ApiKeyModal";
import SettingsPanel from "../components/SettingsPanel";
import PlanetList from "../components/PlanetList";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [showOrbits, setShowOrbits] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [apiKey, setApiKey] = useState<string | null>(
    localStorage.getItem("gemini_api_key")
  );
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "You'll need to set your Google Gemini API key to use the chat feature",
        duration: 5000,
      });
    }
  }, []);

  const handleSpeedChange = (newSpeed: number) => {
    setSpeed(newSpeed);
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const toggleChat = () => {
    setShowChat(!showChat);
    
    if (showChat === false && !apiKey) {
      setShowApiKeyModal(true);
    }
  };

  const saveApiKey = (key: string) => {
    localStorage.setItem("gemini_api_key", key);
    setApiKey(key);
    setShowApiKeyModal(false);
    toast({
      title: "API Key Saved",
      description: "Your Gemini API key has been saved",
      duration: 3000,
    });
  };

  const handlePlanetSelect = (planetName: string) => {
    setSelectedPlanet(planetName);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-background">
      <div className="absolute inset-0 z-0">
        <SolarSystem 
          isPaused={isPaused} 
          speed={speed} 
          showOrbits={showOrbits}
          showLabels={showLabels}
          selectedPlanet={selectedPlanet}
        />
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
        <ControlPanel
          isPaused={isPaused}
          speed={speed}
          onSpeedChange={handleSpeedChange}
          onTogglePause={togglePause}
        />
      </div>

      <SettingsPanel
        speed={speed}
        onSpeedChange={handleSpeedChange}
        showOrbits={showOrbits}
        onToggleOrbits={() => setShowOrbits(!showOrbits)}
        showLabels={showLabels}
        onToggleLabels={() => setShowLabels(!showLabels)}
      />

      <div className="absolute top-4 right-4 z-10">
        <Button
          variant="secondary"
          className="flex items-center gap-2 animate-fade-in"
          onClick={toggleChat}
        >
          {showChat ? "Hide" : "Show"} AI Assistant
        </Button>
      </div>

      {showChat && (
        <div className="absolute right-4 top-16 w-96 max-w-[90vw] z-10">
          <ChatInterface apiKey={apiKey} onRequestApiKey={() => setShowApiKeyModal(true)} />
        </div>
      )}

      {showApiKeyModal && (
        <ApiKeyModal 
          onSave={saveApiKey} 
          onClose={() => setShowApiKeyModal(false)}
          existingKey={apiKey || ""}
        />
      )}

      <div className="absolute top-4 left-4 z-10">
        <h1 className="text-2xl font-bold text-white animate-fade-in">
          Astro Buddy's<br/>
          <span className="text-accent">Solar System</span>
        </h1>
      </div>

      <div className="absolute top-4 left-16 z-10">
        <PlanetList 
          apiKey={apiKey || ""} 
          onSelectPlanet={handlePlanetSelect} 
        />
      </div>

      <Toaster />
    </div>
  );
};

export default Index;
