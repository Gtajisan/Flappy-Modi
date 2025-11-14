import { useEffect, useRef, useState } from "react";
import { useGame } from "@/lib/stores/useGame";
import { useAudio } from "@/lib/stores/useAudio";
import { getLocalStorage, setLocalStorage } from "@/lib/utils";
import GameMenu from "./GameMenu";
import GameUI from "./GameUI";
import GameOver from "./GameOver";

const GRAVITY = 0.5;
const JUMP_FORCE = -9;
const BIRD_SIZE = 40;
const PIPE_WIDTH = 80;
const PIPE_GAP = 180;
const PIPE_SPEED = 3;
const GROUND_HEIGHT = 100;

interface Bird {
  x: number;
  y: number;
  velocity: number;
  rotation: number;
}

interface Pipe {
  x: number;
  topHeight: number;
  scored: boolean;
}

export default function FlappyGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { phase, start, end, restart } = useGame();
  const { playHit, playSuccess, backgroundMusic, isMuted, toggleMute } = useAudio();
  
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => getLocalStorage("flappyModiHighScore") || 0);
  
  const birdRef = useRef<Bird>({ x: 150, y: 300, velocity: 0, rotation: 0 });
  const pipesRef = useRef<Pipe[]>([]);
  const frameRef = useRef<number>(0);
  const animationRef = useRef<number>(0);

  const resetGame = () => {
    birdRef.current = { x: 150, y: 300, velocity: 0, rotation: 0 };
    pipesRef.current = [];
    frameRef.current = 0;
    setScore(0);
    restart();
    if (backgroundMusic && !isMuted) {
      backgroundMusic.currentTime = 0;
      backgroundMusic.play().catch(() => {});
    }
  };

  const handleJump = () => {
    if (phase === "ready") {
      start();
      if (backgroundMusic && isMuted === false) {
        backgroundMusic.play().catch(() => {});
      }
    }
    
    if (phase === "playing") {
      birdRef.current.velocity = JUMP_FORCE;
    }
  };

  const handleToggleMute = () => {
    toggleMute();
    if (backgroundMusic) {
      if (!isMuted) {
        backgroundMusic.pause();
      } else {
        if (phase === "playing") {
          backgroundMusic.play().catch(() => {});
        }
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const checkCollision = (bird: Bird, pipes: Pipe[], canvasHeight: number): boolean => {
      if (bird.y + BIRD_SIZE / 2 >= canvasHeight - GROUND_HEIGHT || bird.y - BIRD_SIZE / 2 <= 0) {
        return true;
      }

      for (const pipe of pipes) {
        if (
          bird.x + BIRD_SIZE / 2 > pipe.x &&
          bird.x - BIRD_SIZE / 2 < pipe.x + PIPE_WIDTH
        ) {
          if (bird.y - BIRD_SIZE / 2 < pipe.topHeight || bird.y + BIRD_SIZE / 2 > pipe.topHeight + PIPE_GAP) {
            return true;
          }
        }
      }
      return false;
    };

    const gameLoop = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      skyGradient.addColorStop(0, "#4EC0CA");
      skyGradient.addColorStop(1, "#87CEEB");
      ctx.fillStyle = skyGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (phase === "playing") {
        const bird = birdRef.current;
        bird.velocity += GRAVITY;
        bird.y += bird.velocity;
        bird.rotation = Math.min(Math.max(bird.velocity * 3, -30), 90);

        frameRef.current++;
        if (frameRef.current % 100 === 0) {
          const minHeight = 100;
          const maxHeight = canvas.height - GROUND_HEIGHT - PIPE_GAP - 100;
          const topHeight = Math.random() * (maxHeight - minHeight) + minHeight;
          pipesRef.current.push({ x: canvas.width, topHeight, scored: false });
        }

        const pipes = pipesRef.current;
        for (let i = pipes.length - 1; i >= 0; i--) {
          pipes[i].x -= PIPE_SPEED;
          
          if (!pipes[i].scored && pipes[i].x + PIPE_WIDTH < bird.x - BIRD_SIZE / 2) {
            pipes[i].scored = true;
            setScore(prev => {
              const newScore = prev + 1;
              if (newScore > highScore) {
                setHighScore(newScore);
                setLocalStorage("flappyModiHighScore", newScore);
              }
              return newScore;
            });
            playSuccess();
          }

          if (pipes[i].x + PIPE_WIDTH < 0) {
            pipes.splice(i, 1);
          }
        }

        if (checkCollision(bird, pipes, canvas.height)) {
          end();
          playHit();
          if (backgroundMusic) {
            backgroundMusic.pause();
            backgroundMusic.currentTime = 0;
          }
        }
      }

      const pipes = pipesRef.current;
      for (const pipe of pipes) {
        ctx.fillStyle = "#2ECC71";
        ctx.strokeStyle = "#27AE60";
        ctx.lineWidth = 3;
        
        ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.topHeight);
        ctx.strokeRect(pipe.x, 0, PIPE_WIDTH, pipe.topHeight);
        
        ctx.fillRect(pipe.x, pipe.topHeight + PIPE_GAP, PIPE_WIDTH, canvas.height - GROUND_HEIGHT - pipe.topHeight - PIPE_GAP);
        ctx.strokeRect(pipe.x, pipe.topHeight + PIPE_GAP, PIPE_WIDTH, canvas.height - GROUND_HEIGHT - pipe.topHeight - PIPE_GAP);
        
        ctx.fillStyle = "#239B56";
        ctx.fillRect(pipe.x - 5, pipe.topHeight - 30, PIPE_WIDTH + 10, 30);
        ctx.strokeRect(pipe.x - 5, pipe.topHeight - 30, PIPE_WIDTH + 10, 30);
        ctx.fillRect(pipe.x - 5, pipe.topHeight + PIPE_GAP, PIPE_WIDTH + 10, 30);
        ctx.strokeRect(pipe.x - 5, pipe.topHeight + PIPE_GAP, PIPE_WIDTH + 10, 30);
      }

      const groundGradient = ctx.createLinearGradient(0, canvas.height - GROUND_HEIGHT, 0, canvas.height);
      groundGradient.addColorStop(0, "#8B4513");
      groundGradient.addColorStop(1, "#654321");
      ctx.fillStyle = groundGradient;
      ctx.fillRect(0, canvas.height - GROUND_HEIGHT, canvas.width, GROUND_HEIGHT);
      
      ctx.strokeStyle = "#3E2723";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(0, canvas.height - GROUND_HEIGHT);
      ctx.lineTo(canvas.width, canvas.height - GROUND_HEIGHT);
      ctx.stroke();

      const bird = birdRef.current;
      ctx.save();
      ctx.translate(bird.x, bird.y);
      ctx.rotate((bird.rotation * Math.PI) / 180);
      
      ctx.fillStyle = "#FF9800";
      ctx.beginPath();
      ctx.ellipse(0, 0, BIRD_SIZE / 2, BIRD_SIZE / 2.5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#F57C00";
      ctx.lineWidth = 2;
      ctx.stroke();
      
      ctx.fillStyle = "#FFF";
      ctx.beginPath();
      ctx.arc(-8, -8, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#000";
      ctx.beginPath();
      ctx.arc(-6, -8, 4, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = "#FF5722";
      ctx.beginPath();
      ctx.moveTo(BIRD_SIZE / 3, 0);
      ctx.lineTo(BIRD_SIZE / 2 + 5, -3);
      ctx.lineTo(BIRD_SIZE / 2 + 5, 3);
      ctx.closePath();
      ctx.fill();
      
      ctx.restore();

      animationRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoop();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [phase, end, playHit, playSuccess, highScore, backgroundMusic]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        handleJump();
      }
    };

    const handleClick = (e: MouseEvent | TouchEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "BUTTON" || target.closest("button")) {
        return;
      }
      handleJump();
    };

    window.addEventListener("keydown", handleKeyPress);
    window.addEventListener("click", handleClick);
    window.addEventListener("touchstart", handleClick as EventListener);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("touchstart", handleClick as EventListener);
    };
  }, [phase, start, isMuted]);

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative", overflow: "hidden" }}>
      <canvas ref={canvasRef} style={{ display: "block", touchAction: "none" }} />
      
      {phase === "ready" && <GameMenu onStart={handleJump} />}
      
      {phase === "playing" && (
        <GameUI score={score} highScore={highScore} isMuted={isMuted} onToggleMute={handleToggleMute} />
      )}
      
      {phase === "ended" && (
        <GameOver score={score} highScore={highScore} onRestart={resetGame} />
      )}
    </div>
  );
}
