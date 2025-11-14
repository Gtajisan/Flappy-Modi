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
        background: "linear-gradient(to bottom, rgba(78, 192, 202, 0.9), rgba(135, 206, 235, 0.95))",
        backdropFilter: "blur(5px)",
        color: "white",
        zIndex: 10,
      }}
    >
      <div style={{ textAlign: "center", padding: "20px" }}>
        <img 
          src="/images/app_icon.png" 
          alt="Flappy Modi" 
          style={{ 
            width: "150px", 
            height: "150px", 
            marginBottom: "20px",
            borderRadius: "20px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
          }}
        />
        <h1 style={{ 
          fontSize: "4rem", 
          fontWeight: "bold", 
          marginBottom: "0.5rem", 
          textShadow: "4px 4px 8px rgba(0,0,0,0.8), 0 0 20px rgba(255,255,255,0.5)",
          background: "linear-gradient(45deg, #FFD700, #FFA500, #FF8C00)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.5))"
        }}>
          Flappy Modi
        </h1>
        <p style={{ 
          fontSize: "1.5rem", 
          marginBottom: "2rem", 
          textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
          fontWeight: "600"
        }}>
          Tap or Press Space to Fly
        </p>
        <Button
          onClick={onStart}
          size="lg"
          style={{
            fontSize: "1.5rem",
            padding: "1.5rem 3rem",
            background: "linear-gradient(135deg, #FF6B35, #F7931E, #FDC830)",
            color: "white",
            border: "3px solid white",
            borderRadius: "50px",
            cursor: "pointer",
            boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
            transform: "scale(1)",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.1)";
            e.currentTarget.style.boxShadow = "0 12px 25px rgba(0,0,0,0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.3)";
          }}
        >
          START GAME
        </Button>
        <p style={{ marginTop: "2rem", fontSize: "0.9rem", opacity: 0.9, textShadow: "1px 1px 2px rgba(0,0,0,0.6)" }}>
          Made by Gtajisan (Farhan)
        </p>
      </div>
    </div>
  );
}
