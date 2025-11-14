import { Volume2, VolumeX } from "lucide-react";
import { Button } from "./ui/button";

interface GameUIProps {
  score: number;
  highScore: number;
  isMuted: boolean;
  onToggleMute: () => void;
}

export default function GameUI({ score, highScore, isMuted, onToggleMute }: GameUIProps) {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        padding: "20px",
        zIndex: 5,
        pointerEvents: "none",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div
          style={{
            background: "rgba(0, 0, 0, 0.7)",
            padding: "15px 30px",
            borderRadius: "10px",
            color: "white",
          }}
        >
          <div style={{ fontSize: "1.2rem", opacity: 0.8 }}>Score</div>
          <div style={{ fontSize: "3rem", fontWeight: "bold" }}>{score}</div>
          <div style={{ fontSize: "0.9rem", opacity: 0.6, marginTop: "5px" }}>
            Best: {highScore}
          </div>
        </div>

        <Button
          onClick={onToggleMute}
          size="icon"
          variant="secondary"
          style={{
            pointerEvents: "auto",
            background: "rgba(0, 0, 0, 0.7)",
            color: "white",
            border: "none",
            width: "50px",
            height: "50px",
          }}
        >
          {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </Button>
      </div>
    </div>
  );
}
