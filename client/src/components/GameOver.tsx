import { Button } from "./ui/button";
import { useEffect, useState } from "react";

interface GameOverProps {
  score: number;
  highScore: number;
  onRestart: () => void;
}

export default function GameOver({ score, highScore, onRestart }: GameOverProps) {
  const isNewHighScore = score === highScore && score > 0;
  const [showConfetti, setShowConfetti] = useState(isNewHighScore);

  useEffect(() => {
    if (isNewHighScore) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isNewHighScore]);

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
        background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.92))",
        backdropFilter: "blur(8px)",
        color: "white",
        zIndex: 10,
      }}
    >
      <div style={{ textAlign: "center", padding: "20px", maxWidth: "500px" }}>
        <img 
          src="/images/end.png" 
          alt="Game Over" 
          style={{ 
            width: "80px", 
            height: "80px",
            marginBottom: "1rem",
            filter: "drop-shadow(0 4px 10px rgba(255,0,0,0.5))"
          }}
        />
        
        <h1 style={{ 
          fontSize: "3.5rem", 
          fontWeight: "bold", 
          marginBottom: "1rem", 
          color: "#FF5722",
          textShadow: "3px 3px 6px rgba(0,0,0,0.8)",
          animation: showConfetti ? "pulse 0.5s ease-in-out" : "none"
        }}>
          Game Over
        </h1>
        
        {isNewHighScore && (
          <div style={{
            fontSize: "1.8rem",
            color: "#FFD700",
            marginBottom: "1rem",
            textShadow: "2px 2px 4px rgba(0,0,0,0.8), 0 0 20px rgba(255,215,0,0.8)",
            fontWeight: "bold",
            animation: "glow 1s ease-in-out infinite"
          }}>
            🏆 NEW HIGH SCORE! 🏆
          </div>
        )}
        
        <div
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))",
            padding: "30px",
            borderRadius: "20px",
            marginBottom: "2rem",
            minWidth: "300px",
            border: "2px solid rgba(255,255,255,0.2)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
          }}
        >
          <div style={{ marginBottom: "1.5rem" }}>
            <div style={{ fontSize: "1rem", opacity: 0.8, marginBottom: "8px" }}>Your Score</div>
            <div style={{ fontSize: "3.5rem", fontWeight: "bold", color: "#FDC830" }}>{score}</div>
          </div>
          
          <div style={{ 
            borderTop: "2px solid rgba(255,255,255,0.2)", 
            paddingTop: "1.5rem" 
          }}>
            <div style={{ fontSize: "1rem", opacity: 0.8, marginBottom: "8px" }}>Best Score</div>
            <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#FFD700" }}>{highScore}</div>
          </div>
        </div>

        <Button
          onClick={onRestart}
          size="lg"
          style={{
            fontSize: "1.5rem",
            padding: "1.5rem 3rem",
            background: "linear-gradient(135deg, #2ECC71, #27AE60)",
            color: "white",
            border: "3px solid white",
            borderRadius: "50px",
            cursor: "pointer",
            boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
            marginBottom: "1rem",
            transform: "scale(1)",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.1)";
            e.currentTarget.style.boxShadow = "0 12px 25px rgba(0,0,0,0.5)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.4)";
          }}
        >
          PLAY AGAIN
        </Button>

        <p style={{ marginTop: "1rem", fontSize: "0.9rem", opacity: 0.6 }}>
          Click or Press Space to restart
        </p>
      </div>
      
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes glow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}
