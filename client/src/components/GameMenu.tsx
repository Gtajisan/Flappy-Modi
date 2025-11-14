import { Button } from "./ui/button";

interface GameMenuProps {
  onStart: () => void;
}

export default function GameMenu({ onStart }: GameMenuProps) {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0, 0, 0, 0.5)",
        color: "white",
        zIndex: 10,
      }}
    >
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h1 style={{ fontSize: "4rem", fontWeight: "bold", marginBottom: "1rem", textShadow: "4px 4px 8px rgba(0,0,0,0.8)" }}>
          Flappy Modi
        </h1>
        <p style={{ fontSize: "1.5rem", marginBottom: "2rem", textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}>
          Click or Press Space to Fly
        </p>
        <Button
          onClick={onStart}
          size="lg"
          style={{
            fontSize: "1.5rem",
            padding: "1.5rem 3rem",
            background: "#FF9800",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Start Game
        </Button>
        <p style={{ marginTop: "2rem", fontSize: "0.9rem", opacity: 0.8 }}>
          Made by Gtajisan (Farhan)
        </p>
      </div>
    </div>
  );
}
