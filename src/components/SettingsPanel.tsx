
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Settings, X, Key } from "lucide-react";
import ApiKeyModal from "./ApiKeyModal";

interface SettingsPanelProps {
  speed: number;
  onSpeedChange: (speed: number) => void;
  showOrbits: boolean;
  onToggleOrbits: () => void;
  showLabels: boolean;
  onToggleLabels: () => void;
}

const SettingsPanel = ({
  speed,
  onSpeedChange,
  showOrbits,
  onToggleOrbits,
  showLabels,
  onToggleLabels,
}: SettingsPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [apiKey, setApiKey] = useState<string>(
    localStorage.getItem("gemini_api_key") || ""
  );

  const handleSaveApiKey = (key: string) => {
    localStorage.setItem("gemini_api_key", key);
    setApiKey(key);
    setShowApiKeyModal(false);
  };

  return (
    <div className="absolute left-4 top-20 z-10">
      {!isOpen && (
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsOpen(true)}
          className="bg-card/80 backdrop-blur-sm"
        >
          <Settings className="h-5 w-5" />
        </Button>
      )}

      {isOpen && (
        <Card className="w-72 bg-card/90 backdrop-blur-md animate-fade-in">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">Settings</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="speed">Simulation Speed</Label>
                <span className="text-xs text-muted-foreground">
                  {speed.toFixed(1)}x
                </span>
              </div>
              <Slider
                id="speed"
                value={[speed]}
                min={0.1}
                max={5}
                step={0.1}
                onValueChange={(value) => onSpeedChange(value[0])}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="show-orbits">Show Orbit Paths</Label>
              <Switch
                id="show-orbits"
                checked={showOrbits}
                onCheckedChange={onToggleOrbits}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="show-labels">Show Planet Labels</Label>
              <Switch
                id="show-labels"
                checked={showLabels}
                onCheckedChange={onToggleLabels}
              />
            </div>

            <div className="pt-2 border-t">
              <Button 
                variant="outline" 
                className="w-full flex justify-between items-center"
                onClick={() => setShowApiKeyModal(true)}
              >
                <span>Google Gemini API Key</span>
                <Key className="h-4 w-4" />
              </Button>
              {apiKey && (
                <p className="text-xs text-muted-foreground mt-1 text-center">
                  API key is set
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {showApiKeyModal && (
        <ApiKeyModal
          onSave={handleSaveApiKey}
          onClose={() => setShowApiKeyModal(false)}
          existingKey={apiKey}
        />
      )}
    </div>
  );
};

export default SettingsPanel;
