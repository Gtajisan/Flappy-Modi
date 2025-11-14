import { useEffect, useRef, useState } from "react";
import { useGame } from "@/lib/stores/useGame";
import { useAudio } from "@/lib/stores/useAudio";
import { getLocalStorage, setLocalStorage } from "@/lib/utils";
import GameMenu from "./GameMenu";
import GameUI from "./GameUI";
import GameOver from "./GameOver";
import { 
  createExplosionParticles, 
  createScoreParticles, 
  updateParticles, 
  renderParticles 
} from "./ParticleSystem";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

const GRAVITY = 0.6;
const JUMP_FORCE = -10;
const BIRD_SIZE = 50;
const PIPE_WIDTH = 90;
const PIPE_GAP = 200;
const PIPE_SPEED = 3.5;
const GROUND_HEIGHT = 120;

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
  const { playHit, playSuccess, playSwing, backgroundMusic, isMuted, toggleMute } = useAudio();
  
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => getLocalStorage("flappyModiHighScore") || 0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  
  const birdRef = useRef<Bird>({ x: 150, y: 300, velocity: 0, rotation: 0 });
  const pipesRef = useRef<Pipe[]>([]);
  const frameRef = useRef<number>(0);
  const animationRef = useRef<number>(0);
  const bgScrollRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  
  const modiImgRef = useRef<HTMLImageElement | null>(null);
  const bgImgRef = useRef<HTMLImageElement | null>(null);
  const pipeImgRef = useRef<HTMLImageElement | null>(null);
  const groundImgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const modiImg = new Image();
    const bgImg = new Image();
    const pipeImg = new Image();
    const groundImg = new Image();
    
    let loadedCount = 0;
    const totalImages = 4;
    
    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount === totalImages) {
        setImagesLoaded(true);
      }
    };
    
    modiImg.onload = checkAllLoaded;
    bgImg.onload = checkAllLoaded;
    pipeImg.onload = checkAllLoaded;
    groundImg.onload = checkAllLoaded;
    
    modiImg.src = "/images/modi.png";
    bgImg.src = "/images/bg.png";
    pipeImg.src = "/images/dr.png";
    groundImg.src = "/images/br.jpg";
    
    modiImgRef.current = modiImg;
    bgImgRef.current = bgImg;
    pipeImgRef.current = pipeImg;
    groundImgRef.current = groundImg;
  }, []);

  const resetGame = () => {
    birdRef.current = { x: 150, y: 300, velocity: 0, rotation: 0 };
    pipesRef.current = [];
    frameRef.current = 0;
    bgScrollRef.current = 0;
    particlesRef.current = [];
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
      if (backgroundMusic && !isMuted) {
        backgroundMusic.play().catch(() => {});
      }
    }
    
    if (phase === "playing") {
      birdRef.current.velocity = JUMP_FORCE;
      playSwing();
    }
  };

  const handleToggleMute = () => {
    const newMutedState = !isMuted;
    toggleMute();
    if (backgroundMusic) {
      if (newMutedState) {
        backgroundMusic.pause();
      } else {
        backgroundMusic.play().catch(() => {});
      }
    }
  };

  useEffect(() => {
    if (!imagesLoaded) return;
    
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
        const birdLeft = bird.x - BIRD_SIZE / 2;
        const birdRight = bird.x + BIRD_SIZE / 2;
        const birdTop = bird.y - BIRD_SIZE / 2;
        const birdBottom = bird.y + BIRD_SIZE / 2;
        
        if (birdRight > pipe.x && birdLeft < pipe.x + PIPE_WIDTH) {
          if (birdTop < pipe.topHeight || birdBottom > pipe.topHeight + PIPE_GAP) {
            return true;
          }
        }
      }
      return false;
    };

    const gameLoop = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (phase === "playing") {
        bgScrollRef.current = (bgScrollRef.current + 0.5) % canvas.width;
      }

      if (bgImgRef.current) {
        const bgWidth = canvas.width;
        const bgHeight = canvas.height;
        const pattern = ctx.createPattern(bgImgRef.current, "repeat");
        if (pattern) {
          ctx.save();
          ctx.translate(-bgScrollRef.current, 0);
          ctx.fillStyle = pattern;
          ctx.fillRect(0, 0, bgWidth + bgScrollRef.current, bgHeight);
          ctx.fillRect(bgWidth, 0, bgWidth, bgHeight);
          ctx.restore();
        }
      } else {
        const skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        skyGradient.addColorStop(0, "#4EC0CA");
        skyGradient.addColorStop(1, "#87CEEB");
        ctx.fillStyle = skyGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      if (phase === "playing") {
        const bird = birdRef.current;
        bird.velocity += GRAVITY;
        bird.y += bird.velocity;
        bird.rotation = Math.min(Math.max(bird.velocity * 2.5, -25), 90);

        frameRef.current++;
        if (frameRef.current % 90 === 0) {
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
            particlesRef.current.push(...createScoreParticles(pipes[i].x + PIPE_WIDTH, pipes[i].topHeight + PIPE_GAP / 2));
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
          particlesRef.current.push(...createExplosionParticles(bird.x, bird.y, "#FF5722"));
          end();
          playHit();
          if (backgroundMusic) {
            backgroundMusic.pause();
            backgroundMusic.currentTime = 0;
          }
        }
      }

      particlesRef.current = updateParticles(particlesRef.current);

      const pipes = pipesRef.current;
      for (const pipe of pipes) {
        if (pipeImgRef.current) {
          ctx.save();
          ctx.translate(pipe.x + PIPE_WIDTH / 2, pipe.topHeight);
          ctx.scale(1, -1);
          ctx.drawImage(
            pipeImgRef.current,
            -PIPE_WIDTH / 2,
            0,
            PIPE_WIDTH,
            pipe.topHeight + 50
          );
          ctx.restore();
          
          ctx.drawImage(
            pipeImgRef.current,
            pipe.x,
            pipe.topHeight + PIPE_GAP,
            PIPE_WIDTH,
            canvas.height - GROUND_HEIGHT - pipe.topHeight - PIPE_GAP + 50
          );
        } else {
          ctx.fillStyle = "#2ECC71";
          ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.topHeight);
          ctx.fillRect(pipe.x, pipe.topHeight + PIPE_GAP, PIPE_WIDTH, canvas.height - GROUND_HEIGHT - pipe.topHeight - PIPE_GAP);
        }
      }

      if (groundImgRef.current) {
        const pattern = ctx.createPattern(groundImgRef.current, "repeat-x");
        if (pattern) {
          ctx.fillStyle = pattern;
          ctx.fillRect(0, canvas.height - GROUND_HEIGHT, canvas.width, GROUND_HEIGHT);
        }
      } else {
        ctx.fillStyle = "#8B4513";
        ctx.fillRect(0, canvas.height - GROUND_HEIGHT, canvas.width, GROUND_HEIGHT);
      }

      const bird = birdRef.current;
      ctx.save();
      ctx.translate(bird.x, bird.y);
      ctx.rotate((bird.rotation * Math.PI) / 180);
      
      if (modiImgRef.current) {
        ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 3;
        ctx.shadowOffsetY = 3;
        ctx.drawImage(
          modiImgRef.current,
          -BIRD_SIZE / 2,
          -BIRD_SIZE / 2,
          BIRD_SIZE,
          BIRD_SIZE
        );
      } else {
        ctx.fillStyle = "#FF9800";
        ctx.beginPath();
        ctx.ellipse(0, 0, BIRD_SIZE / 2, BIRD_SIZE / 2.5, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      
      ctx.restore();

      renderParticles(ctx, particlesRef.current);

      animationRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoop();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [phase, end, playHit, playSuccess, highScore, backgroundMusic, imagesLoaded]);

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
    <div style={{ width: "100vw", height: "100vh", position: "relative", overflow: "hidden", background: "#4EC0CA" }}>
      <canvas ref={canvasRef} style={{ display: "block", touchAction: "none" }} />
      
      {phase === "ready" && <GameMenu onStart={handleJump} />}
      
      {phase === "playing" && (
        <GameUI score={score} highScore={highScore} isMuted={isMuted} onToggleMute={handleToggleMute} />
      )}
      
      {phase === "ended" && (
        <GameOver score={score} highScore={highScore} onRestart={resetGame} />
      )}
      
      {!imagesLoaded && (
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#4EC0CA",
          color: "white",
          fontSize: "2rem",
          fontWeight: "bold"
        }}>
          Loading Game...
        </div>
      )}
    </div>
  );
}
