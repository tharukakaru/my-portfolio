import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiFlutter,
  SiDocker,
  SiTensorflow,
  SiPytorch,
  SiOpenai,
  SiFigma,
  SiGithub,
  SiTypescript,
  SiPython,
  SiTailwindcss,
  SiPostgresql,
  SiMongodb,
  SiKubernetes,
} from "react-icons/si";

const techIcons = [
  { Icon: SiReact, name: "React", depth: 1 },
  { Icon: SiNextdotjs, name: "Next.js", depth: 0.8 },
  { Icon: SiNodedotjs, name: "Node.js", depth: 1.2 },
  { Icon: SiTypescript, name: "TypeScript", depth: 0.9 },
  { Icon: SiPython, name: "Python", depth: 1.1 },
  { Icon: SiFlutter, name: "Flutter", depth: 0.7 },
  { Icon: SiDocker, name: "Docker", depth: 1.3 },
  { Icon: SiKubernetes, name: "K8s", depth: 0.85 },
  { Icon: SiTensorflow, name: "TensorFlow", depth: 1.15 },
  { Icon: SiPytorch, name: "PyTorch", depth: 0.95 },
  { Icon: SiOpenai, name: "OpenAI", depth: 1.05 },
  { Icon: SiFigma, name: "Figma", depth: 0.75 },
  { Icon: SiGithub, name: "GitHub", depth: 1.25 },
  { Icon: SiTailwindcss, name: "Tailwind", depth: 0.9 },
  { Icon: SiPostgresql, name: "PostgreSQL", depth: 1.1 },
  { Icon: SiMongodb, name: "MongoDB", depth: 0.8 },
];

const TechIcon = ({ 
  tech, 
  index,
  mouseX 
}: { 
  tech: typeof techIcons[0]; 
  index: number;
  mouseX: number;
}) => {
  const iconRef = useRef<HTMLDivElement>(null);
  const [isNear, setIsNear] = useState(false);
  const floatOffset = useMotionValue(0);

  // Individual floating animation with different timing
  useEffect(() => {
    const duration = 3 + (index % 5) * 0.5;
    const delay = index * 0.2;
    
    const animation = animate(floatOffset, [0, -8, 0], {
      duration,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    });

    return () => animation.stop();
  }, [floatOffset, index]);

  // Check proximity to cursor
  useEffect(() => {
    if (!iconRef.current) return;
    const rect = iconRef.current.getBoundingClientRect();
    const iconCenter = rect.left + rect.width / 2;
    const distance = Math.abs(mouseX - iconCenter);
    setIsNear(distance < 150);
  }, [mouseX]);

  const y = useTransform(floatOffset, (v) => v * tech.depth);

  return (
    <motion.div
      ref={iconRef}
      className="flex flex-col items-center gap-3 min-w-[100px] mx-8"
      style={{ y }}
    >
      <motion.div
        className="w-14 h-14 flex items-center justify-center rounded-xl border border-silver/10 bg-card/30 backdrop-blur-sm transition-all duration-500"
        animate={{
          scale: isNear ? 1.2 : 1,
          borderColor: isNear ? "hsl(220 15% 75% / 0.3)" : "hsl(220 15% 75% / 0.1)",
          boxShadow: isNear 
            ? "0 0 40px -10px hsl(220 15% 75% / 0.4)" 
            : "0 0 0px 0px transparent",
        }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      >
        <tech.Icon 
          className="w-7 h-7 text-foreground/60 transition-all duration-500"
          style={{
            filter: isNear ? "brightness(1.3)" : "brightness(1)",
          }}
        />
      </motion.div>
      <motion.span 
        className="text-xs font-mono text-muted-foreground/50 transition-all duration-500"
        animate={{
          opacity: isNear ? 1 : 0.5,
          color: isNear ? "hsl(220 15% 75%)" : "hsl(220 10% 55%)",
        }}
      >
        {tech.name}
      </motion.span>
    </motion.div>
  );
};

const LuxuryTechStripSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouseX, setMouseX] = useState(0);
  const baseX = useMotionValue(0);

  // Handle mouse move for proximity effect
  const handleMouseMove = (e: React.MouseEvent) => {
    setMouseX(e.clientX);
  };

  // Infinite scroll animation
  useEffect(() => {
    const controls = animate(baseX, -50 * techIcons.length, {
      duration: 40,
      repeat: Infinity,
      ease: "linear",
    });

    return () => controls.stop();
  }, [baseX]);

  // Double the icons for seamless loop
  const doubledIcons = [...techIcons, ...techIcons];

  return (
    <section 
      className="relative py-12 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Top and bottom lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-silver/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-silver/20 to-transparent" />

      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-secondary/20 to-background" />

      {/* Scrolling content */}
      <div ref={containerRef} className="relative overflow-hidden">
        <motion.div
          className="flex items-center"
          style={{ x: baseX }}
        >
          {doubledIcons.map((tech, index) => (
            <TechIcon
              key={`${tech.name}-${index}`}
              tech={tech}
              index={index}
              mouseX={mouseX}
            />
          ))}
        </motion.div>
      </div>

      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
    </section>
  );
};

export default LuxuryTechStripSection;