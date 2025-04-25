
import { useState } from "react";
import SolarSystem from "../components/SolarSystem";
import ControlPanel from "../components/ControlPanel";
import ChatInterface from "../components/ChatInterface";
import ApiKeyModal from "../components/ApiKeyModal";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";

const Index = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [showChat, setShowChat] = useState(false);
  const [apiKey, setApiKey] = useState<string | null>(
    localStorage.getItem("openai_api_key")
  );
  const [showApiKeyModal, setShowApiKeyModal] = useState(!apiKey);

  const handleSpeedChange = (newSpeed: number) => {
    setSpeed(newSpeed);
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  const saveApiKey = (key: string) => {
    localStorage.setItem("openai_api_key", key);
    setApiKey(key);
    setShowApiKeyModal(false);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-background">
      <div className="absolute inset-0 z-0">
        <SolarSystem isPaused={isPaused} speed={speed} />
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
        <ControlPanel
          isPaused={isPaused}
          speed={speed}
          onSpeedChange={handleSpeedChange}
          onTogglePause={togglePause}
        />
      </div>

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
      
      <Toaster />
    </div>
  );
};

export default Index;
