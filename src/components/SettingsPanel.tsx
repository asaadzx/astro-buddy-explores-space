
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Settings, X } from "lucide-react";

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
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SettingsPanel;
