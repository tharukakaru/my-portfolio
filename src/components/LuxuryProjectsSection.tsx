import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import FloatingCode from "./effects/FloatingCode";

const projects = [
  {
    title: "AI Task Agent",
    category: "Artificial Intelligence",
    description: "Autonomous agent for workflow optimization powered by advanced LLMs.",
    year: "2025",
  },
  {
    title: "Resume Builder",
    category: "AI / Web Platform",
    description: "Intelligent resume generation with ATS optimization.",
    year: "2025",
  },
  {
    title: "RAG Agent",
    category: "Machine Learning",
    description: "Contextual information retrieval and knowledge synthesis.",
    year: "2024",
  },
  {
    title: "E-Commerce",
    category: "Full-Stack Platform",
    description: "Complete marketplace with real-time inventory and analytics.",
    year: "2023",
  },
  {
    title: "Task Manager",
    category: "Cross-Platform App",
    description: "Web and mobile task management with seamless sync.",
    year: "2023",
  },
  {
    title: "Trivia Quest",
    category: "Real-time Gaming",
    description: "Multiplayer trivia with competitive leaderboards.",
    year: "2022",
  },
];

const ProjectItem = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(itemRef, { once: true, margin: "-10%" });
  const [isHovered, setIsHovered] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 25, stiffness: 150 });
  const smoothY = useSpring(mouseY, { damping: 25, stiffness: 150 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = itemRef.current?.getBoundingClientRect();
    if (rect) {
      mouseX.set((e.clientX - rect.left - rect.width / 2) * 0.1);
      mouseY.set((e.clientY - rect.top - rect.height / 2) * 0.1);
    }
  };

  // Light sweep effect on hover
  const lightX = useTransform(smoothX, [-30, 30], [-50, 150]);

  return (
    <motion.div
      ref={itemRef}
      className="group relative border-t border-silver/5 cursor-pointer overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 1, delay: index * 0.1 }}
    >
      {/* Background depth shift on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-transparent pointer-events-none"
        animate={{
          opacity: isHovered ? 1 : 0,
          x: isHovered ? 0 : -100,
        }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      />
      
      {/* Light sweep across title on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(90deg, 
            transparent 0%, 
            hsla(220, 50%, 80%, 0.08) 45%, 
            hsla(220, 50%, 80%, 0.12) 50%, 
            hsla(220, 50%, 80%, 0.08) 55%, 
            transparent 100%)`,
          x: lightX,
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Depth layer that shifts on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-accent/3 to-transparent pointer-events-none"
        animate={{
          scale: isHovered ? 1.5 : 1,
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.6 }}
      />

      <motion.div 
        className="relative py-10 lg:py-14 grid grid-cols-12 gap-4 items-center"
        style={{
          x: smoothX,
          y: smoothY,
        }}
      >
        {/* Number */}
        <motion.span
          className="col-span-1 text-xs font-mono text-muted-foreground/30"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.1 + 0.2, duration: 0.6 }}
        >
          0{index + 1}
        </motion.span>

        {/* Title with delayed opacity + blur reveal */}
        <motion.h3
          className="col-span-4 lg:col-span-3 font-serif text-xl lg:text-2xl font-light"
          initial={{ clipPath: "inset(0 100% 0 0)", filter: "blur(8px)" }}
          animate={isInView ? { clipPath: "inset(0 0% 0 0)", filter: "blur(0px)" } : {}}
          transition={{ delay: index * 0.1 + 0.3, duration: 1, ease: [0.23, 1, 0.32, 1] }}
        >
          <motion.span
            className="inline-block"
            animate={{ 
              x: isHovered ? 15 : 0,
              color: isHovered ? "hsl(var(--silver))" : "hsl(var(--foreground))",
            }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          >
            {project.title}
          </motion.span>
        </motion.h3>

        {/* Category */}
        <motion.span
          className="col-span-3 lg:col-span-2 text-xs tracking-[0.2em] uppercase text-muted-foreground/50 font-mono hidden sm:block"
          initial={{ opacity: 0, filter: "blur(4px)" }}
          animate={isInView ? { opacity: 1, filter: "blur(0px)" } : {}}
          transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
        >
          {project.category}
        </motion.span>

        {/* Description - hidden layer that reveals on hover */}
        <motion.p
          className="col-span-5 lg:col-span-4 text-sm text-muted-foreground/60 font-light hidden lg:block"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.1 + 0.6, duration: 0.6 }}
        >
          <motion.span
            animate={{ opacity: isHovered ? 1 : 0.6 }}
            transition={{ duration: 0.4 }}
          >
            {project.description}
          </motion.span>
        </motion.p>

        {/* Year */}
        <motion.span
          className="col-span-1 text-xs font-mono text-muted-foreground/40 text-right"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.1 + 0.7, duration: 0.6 }}
        >
          {project.year}
        </motion.span>

        {/* Arrow indicator */}
        <motion.div
          className="col-span-1 flex justify-end"
          initial={{ opacity: 0, x: -15 }}
          animate={{ 
            opacity: isHovered ? 1 : 0, 
            x: isHovered ? 0 : -15 
          }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        >
          <span className="text-silver/70 text-lg">→</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const LuxuryProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="projects" 
      className="relative py-20 lg:py-28 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Deep galaxy background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[hsl(235,30%,6%)] to-background" />
      
      {/* Floating code snippets */}
      <FloatingCode count={10} className="opacity-40" />

      {/* Cursor-distorted layer */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 40% 30% at ${mousePos.x * 100}% ${mousePos.y * 100}%, 
            hsla(235, 50%, 40%, 0.06) 0%, 
            transparent 50%)`,
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.4, ease: [0.23, 1, 0.32, 1] }}
        >
          <motion.span 
            className="text-xs tracking-[0.5em] uppercase text-muted-foreground/60 font-mono"
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={isInView ? { clipPath: "inset(0 0% 0 0)" } : {}}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          >
            Selected Work
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
              Featured
            </motion.span>
            <motion.span
              className="text-editorial block mt-2"
              initial={{ y: "100%", filter: "blur(12px)" }}
              animate={isInView ? { y: 0, filter: "blur(0px)" } : {}}
              transition={{ delay: 0.4, duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
            >
              Projects
            </motion.span>
          </h2>
        </motion.div>

        {/* Projects list */}
        <div className="border-b border-silver/5">
          {projects.map((project, index) => (
            <ProjectItem key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LuxuryProjectsSection;
