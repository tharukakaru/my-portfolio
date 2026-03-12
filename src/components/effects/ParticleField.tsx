import { useRef, useEffect, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  z: number;
  size: number;
  speed: number;
  opacity: number;
  hue: number;
}

interface ParticleFieldProps {
  className?: string;
  particleCount?: number;
  type?: 'stars' | 'mist' | 'code' | 'nebula';
  cursorX?: number;
  cursorY?: number;
}

const ParticleField = ({ 
  className = '', 
  particleCount = 80, 
  type = 'stars',
  cursorX = 0.5,
  cursorY = 0.5 
}: ParticleFieldProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const cursorRef = useRef({ x: cursorX, y: cursorY });

  useEffect(() => {
    cursorRef.current = { x: cursorX, y: cursorY };
  }, [cursorX, cursorY]);

  const initParticles = useCallback((width: number, height: number) => {
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * 3 + 1,
      size: type === 'nebula' ? Math.random() * 100 + 30 : Math.random() * 2 + 0.5,
      speed: Math.random() * 0.5 + 0.1,
      opacity: Math.random() * 0.5 + 0.2,
      hue: type === 'nebula' ? 200 + Math.random() * 60 : 220,
    }));
  }, [particleCount, type]);

  const drawParticles = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
    ctx.clearRect(0, 0, width, height);
    const cursor = cursorRef.current;

    particlesRef.current.forEach((particle, i) => {
      // Update position
      if (type === 'stars') {
        particle.y += particle.speed * particle.z * 0.3;
        particle.opacity = 0.3 + Math.sin(time * 2 + i) * 0.2;
      } else if (type === 'mist') {
        particle.x += Math.sin(time * 0.5 + i * 0.1) * 0.5;
        particle.y -= particle.speed * 0.2;
        particle.opacity = 0.1 + Math.sin(time + i * 0.3) * 0.08;
      } else if (type === 'code') {
        particle.y += particle.speed * 0.8;
        particle.opacity = 0.15 + Math.sin(time * 3 + i) * 0.1;
      } else if (type === 'nebula') {
        particle.x += Math.sin(time * 0.2 + i * 0.05) * 0.3;
        particle.y += Math.cos(time * 0.15 + i * 0.08) * 0.2;
        particle.opacity = 0.03 + Math.sin(time * 0.5 + i) * 0.02;
      }

      // Cursor influence
      const dx = particle.x - cursor.x * width;
      const dy = particle.y - cursor.y * height;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const influence = Math.max(0, 1 - dist / 300) * 0.1;
      particle.opacity += influence;

      // Wrap around
      if (particle.y > height + 50) particle.y = -50;
      if (particle.y < -50) particle.y = height + 50;
      if (particle.x > width + 50) particle.x = -50;
      if (particle.x < -50) particle.x = width + 50;

      // Draw
      if (type === 'nebula') {
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size
        );
        gradient.addColorStop(0, `hsla(${particle.hue}, 60%, 50%, ${particle.opacity})`);
        gradient.addColorStop(0.5, `hsla(${particle.hue}, 50%, 40%, ${particle.opacity * 0.5})`);
        gradient.addColorStop(1, `hsla(${particle.hue}, 40%, 30%, 0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      } else if (type === 'code') {
        ctx.fillStyle = `hsla(${particle.hue}, 60%, 70%, ${particle.opacity})`;
        ctx.font = `${10 + particle.z * 3}px JetBrains Mono`;
        const chars = ['0', '1', '{', '}', '<', '>', '/', '*'];
        ctx.fillText(chars[i % chars.length], particle.x, particle.y);
      } else {
        ctx.fillStyle = `hsla(${particle.hue}, 30%, 80%, ${particle.opacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * particle.z, 0, Math.PI * 2);
        ctx.fill();
        
        // Glow for stars
        if (type === 'stars' && particle.opacity > 0.4) {
          const glow = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.size * particle.z * 4
          );
          glow.addColorStop(0, `hsla(220, 50%, 90%, ${particle.opacity * 0.3})`);
          glow.addColorStop(1, 'transparent');
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * particle.z * 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    });
  }, [type]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      initParticles(window.innerWidth, window.innerHeight);
    };

    resize();
    window.addEventListener('resize', resize);

    let time = 0;
    const animate = () => {
      time += 0.016;
      drawParticles(ctx, window.innerWidth, window.innerHeight, time);
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [initParticles, drawParticles]);

  return (
    <canvas 
      ref={canvasRef} 
      className={`absolute inset-0 pointer-events-none ${className}`}
    />
  );
};

export default ParticleField;
