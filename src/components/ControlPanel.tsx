
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, ZoomIn, ZoomOut } from "lucide-react";

interface ControlPanelProps {
  isPaused: boolean;
  speed: number;
  onTogglePause: () => void;
  onSpeedChange: (speed: number) => void;
}

const ControlPanel = ({
  isPaused,
  speed,
  onTogglePause,
  onSpeedChange,
}: ControlPanelProps) => {
  return (
    <div className="flex items-center gap-4 p-4 bg-card/80 backdrop-blur-sm rounded-lg animate-fade-in">
      <Button
        variant="outline"
        size="icon"
        onClick={onTogglePause}
        aria-label={isPaused ? "Play" : "Pause"}
      >
        {isPaused ? <Play className="h-5 w-5" /> : <Pause className="h-5 w-5" />}
      </Button>

      <div className="flex items-center gap-2">
        <ZoomOut className="h-4 w-4 text-muted-foreground" />
        <Slider
          className="w-32"
          value={[speed]}
          min={0.1}
          max={5}
          step={0.1}
          onValueChange={(value) => onSpeedChange(value[0])}
        />
        <ZoomIn className="h-4 w-4 text-muted-foreground" />
      </div>

      <span className="text-xs text-muted-foreground">
        Speed: {speed.toFixed(1)}x
      </span>
    </div>
  );
};

export default ControlPanel;
