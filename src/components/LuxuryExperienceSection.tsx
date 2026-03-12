import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import FloatingCode from "./effects/FloatingCode";

const experiences = [
  {
    title: "Junior Software Engineer",
    company: "CodeGen International",
    description: "Full-stack development, Building Agentic solutions and enterprise software architecture.",
  },
  {
    title: "Junior Software Engineer",
    company: "AbsolX Core AI",
    description: "Building AI-powered solutions and intelligent automation systems for enterprise clients.",
  },
  {
    title: "Software Developer Intern",
    company: "Dodget Lawyer",
    description: "Legal tech solutions and intelligent document automation.",
  },
  {
    title: "Full Stack Developer Intern",
    company: "Adventa",
    description: "End-to-end application development and cloud integration.",
  },
  {
    title: "Full Stack Developer Intern",
    company: "Codex Harbor",
    description: "Modern web applications and API development.",
  },
];

const TimelineItem = ({ 
  experience, 
  index, 
  isLast,
  cursorY,
}: { 
  experience: typeof experiences[0]; 
  index: number;
  isLast: boolean;
  cursorY: number;
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(itemRef, { once: true, margin: "-15%" });
  const [isHovered, setIsHovered] = useState(false);

  // Calculate if cursor is near this item
  const itemTop = index * 180;
  const cursorNearness = Math.max(0, 1 - Math.abs(cursorY - itemTop - 90) / 150);

  return (
    <motion.div
      ref={itemRef}
      className="relative grid grid-cols-12 gap-4 lg:gap-8 group"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 1, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Timeline line and dot */}
      <div className="col-span-1 flex flex-col items-center relative">
        {/* Self-drawing line */}
        {!isLast && (
          <motion.div
            className="absolute top-3 left-1/2 -translate-x-1/2 w-px h-full origin-top"
            style={{
              background: `linear-gradient(to bottom, 
                hsla(220, 15%, 75%, ${0.1 + cursorNearness * 0.3}), 
                hsla(220, 15%, 75%, 0.05), 
                transparent)`,
            }}
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ delay: index * 0.1 + 0.5, duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
          />
        )}
        
        {/* Dot with glow */}
        <motion.div
          className="w-3 h-3 rounded-full border relative z-10 bg-background"
          style={{
            borderColor: `hsla(220, 15%, 75%, ${0.3 + cursorNearness * 0.5})`,
          }}
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ delay: index * 0.1 + 0.3, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* Glow effect that responds to cursor */}
          <motion.div
            className="absolute inset-0 rounded-full blur-md"
            style={{
              background: `hsla(220, 30%, 70%, ${cursorNearness * 0.6})`,
              scale: 1 + cursorNearness * 2,
            }}
          />
        </motion.div>
      </div>

      {/* Content with hover glow */}
      <div className="col-span-11 pb-20 relative">
        {/* Hover glow background */}
        <motion.div
          className="absolute -inset-4 rounded-lg pointer-events-none"
          animate={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(ellipse at 30% 50%, hsla(235, 50%, 50%, 0.05) 0%, transparent 70%)`,
          }}
          transition={{ duration: 0.6 }}
        />
        
        {/* Company with clip-path reveal */}
        <motion.p
          className="text-xs tracking-[0.4em] uppercase text-accent/80 font-mono mb-3"
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={isInView ? { clipPath: "inset(0 0% 0 0)" } : {}}
          transition={{ delay: index * 0.1 + 0.2, duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
        >
          {experience.company}
        </motion.p>

        {/* Title with blur + slide */}
        <motion.h3
          className="font-serif text-2xl lg:text-3xl font-light mb-4 text-foreground relative"
          initial={{ opacity: 0, x: -40, filter: "blur(10px)" }}
          animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
          transition={{ delay: index * 0.1 + 0.4, duration: 1.1, ease: [0.23, 1, 0.32, 1] }}
        >
          <motion.span
            animate={{ x: isHovered ? 8 : 0 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="inline-block"
          >
            {experience.title}
          </motion.span>
        </motion.h3>

        {/* Description */}
        <motion.p
          className="text-muted-foreground/70 font-sans font-light text-sm lg:text-base max-w-md"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.1 + 0.6, duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
        >
          {experience.description}
        </motion.p>
      </div>
    </motion.div>
  );
};

const LuxuryExperienceSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });
  
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const glowY = useMotionValue(0);
  const smoothGlowY = useSpring(glowY, { damping: 30, stiffness: 120 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = timelineRef.current?.getBoundingClientRect();
    if (rect) {
      glowY.set(e.clientY - rect.top);
      setCursorPos({
        x: (e.clientX - rect.left) / rect.width,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="experience" 
      className="relative py-20 lg:py-28 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Dark space + ocean blend background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[hsl(230,30%,7%)] to-background" />
      
      {/* Floating code fragments */}
      <FloatingCode count={8} className="opacity-30" />

      {/* Cursor-following glow line on timeline */}
      <motion.div
        className="absolute left-[8.33%] w-px h-32 pointer-events-none z-20 hidden lg:block"
        style={{
          top: smoothGlowY,
          background: "linear-gradient(to bottom, transparent, hsla(235, 60%, 60%, 0.4), hsla(220, 50%, 70%, 0.2), transparent)",
          filter: "blur(2px)",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          className="mb-24 lg:mb-32"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.4, ease: [0.23, 1, 0.32, 1] }}
        >
          <motion.span 
            className="text-xs tracking-[0.5em] uppercase text-muted-foreground/60 font-mono block"
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={isInView ? { clipPath: "inset(0 0% 0 0)" } : {}}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          >
            Experience
          </motion.span>
          <motion.div 
            className="editorial-line w-32 mt-5 mb-10"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.3, duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
            style={{ originX: 0 }}
          />
          
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light">
            <motion.span
              className="text-metallic block"
              initial={{ y: "100%", filter: "blur(12px)" }}
              animate={isInView ? { y: 0, filter: "blur(0px)" } : {}}
              transition={{ delay: 0.2, duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
            >
              Professional
            </motion.span>
            <motion.span
              className="text-editorial block mt-2"
              initial={{ y: "100%", filter: "blur(12px)" }}
              animate={isInView ? { y: 0, filter: "blur(0px)" } : {}}
              transition={{ delay: 0.4, duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
            >
              Journey
            </motion.span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div ref={timelineRef} className="max-w-3xl ml-auto relative">
          {experiences.map((exp, index) => (
            <TimelineItem
              key={exp.company}
              experience={exp}
              index={index}
              isLast={index === experiences.length - 1}
              cursorY={cursorPos.y}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LuxuryExperienceSection;
