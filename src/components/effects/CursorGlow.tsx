import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect } from 'react';

interface CursorGlowProps {
  size?: number;
  color?: string;
  opacity?: number;
}

const CursorGlow = ({ size = 400, color = '220, 50%, 70%', opacity = 0.1 }: CursorGlowProps) => {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed pointer-events-none z-50 mix-blend-screen"
      style={{
        x: smoothX,
        y: smoothY,
        width: size,
        height: size,
        marginLeft: -size / 2,
        marginTop: -size / 2,
        background: `radial-gradient(circle, hsla(${color}, ${opacity}) 0%, transparent 70%)`,
      }}
    />
  );
};

export default CursorGlow;
