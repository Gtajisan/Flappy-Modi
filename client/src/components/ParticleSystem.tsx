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

export function createExplosionParticles(x: number, y: number, color: string = "#FF5722"): Particle[] {
  const particles: Particle[] = [];
  const count = 20;
  
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count;
    const speed = 3 + Math.random() * 3;
    
    particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 1,
      maxLife: 1,
      color,
      size: 3 + Math.random() * 3,
    });
  }
  
  return particles;
}

export function createScoreParticles(x: number, y: number): Particle[] {
  const particles: Particle[] = [];
  const count = 10;
  
  for (let i = 0; i < count; i++) {
    particles.push({
      x: x + (Math.random() - 0.5) * 30,
      y: y + (Math.random() - 0.5) * 30,
      vx: (Math.random() - 0.5) * 2,
      vy: -2 - Math.random() * 2,
      life: 1,
      maxLife: 1,
      color: `hsl(${45 + Math.random() * 30}, 100%, 50%)`,
      size: 4 + Math.random() * 4,
    });
  }
  
  return particles;
}

export function updateParticles(particles: Particle[], deltaTime: number = 0.016): Particle[] {
  return particles
    .map(p => ({
      ...p,
      x: p.x + p.vx,
      y: p.y + p.vy,
      vy: p.vy + 0.2,
      life: p.life - deltaTime,
    }))
    .filter(p => p.life > 0);
}

export function renderParticles(ctx: CanvasRenderingContext2D, particles: Particle[]) {
  particles.forEach(p => {
    const alpha = p.life / p.maxLife;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });
}
