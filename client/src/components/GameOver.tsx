import { Button } from "./ui/button";

interface GameOverProps {
  score: number;
  highScore: number;
  onRestart: () => void;
}

export default function GameOver({ score, highScore, onRestart }: GameOverProps) {
  const isNewHighScore = score === highScore && score > 0;

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
        background: "rgba(0, 0, 0, 0.7)",
        color: "white",
        zIndex: 10,
      }}
    >
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h1 style={{ fontSize: "3rem", fontWeight: "bold", marginBottom: "1rem", color: "#FF5722" }}>
          Game Over
        </h1>
        
        {isNewHighScore && (
          <p style={{ fontSize: "1.5rem", color: "#FFD700", marginBottom: "1rem" }}>
            New High Score!
          </p>
        )}
        
        <div
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            padding: "30px",
            borderRadius: "15px",
            marginBottom: "2rem",
            minWidth: "300px",
          }}
        >
          <div style={{ marginBottom: "1rem" }}>
            <div style={{ fontSize: "1rem", opacity: 0.8, marginBottom: "5px" }}>Your Score</div>
            <div style={{ fontSize: "3rem", fontWeight: "bold" }}>{score}</div>
          </div>
          
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.2)", paddingTop: "1rem" }}>
            <div style={{ fontSize: "1rem", opacity: 0.8, marginBottom: "5px" }}>High Score</div>
            <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#FFD700" }}>{highScore}</div>
          </div>
        </div>

        <Button
          onClick={onRestart}
          size="lg"
          style={{
            fontSize: "1.5rem",
            padding: "1.5rem 3rem",
            background: "#2ECC71",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Play Again
        </Button>

        <p style={{ marginTop: "1.5rem", fontSize: "0.9rem", opacity: 0.6 }}>
          Click or Press Space to restart
        </p>
      </div>
    </div>
  );
}
