import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

const education = [
  {
    degree: "BSc (Hons) Software Engineering",
    institution: "SLTC Research University",
    status: "Undergraduate",
    focus: "AI Systems & Software Architecture",
  },
  {
    degree: "Diploma in Information Technology",
    institution: "University of Hertfordshire",
    status: "Completed",
    focus: "Computer Science Foundations",
  },
];

const LuxuryEducationSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const gradientY = useTransform(scrollYProgress, [0, 1], [0, 200]);

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
      id="education" 
      className="relative py-20 lg:py-28 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Space/ocean blend background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[hsl(228,28%,6%)] to-background" />
      
      {/* Moving light gradient */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: gradientY }}
      >
        <motion.div
          className="absolute w-[800px] h-[400px] opacity-20"
          style={{
            left: `${mousePos.x * 60}%`,
            top: `${mousePos.y * 60}%`,
            background: "radial-gradient(ellipse, hsla(235, 50%, 50%, 0.15) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <motion.div
          className="absolute w-[600px] h-[300px] opacity-15"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            left: "30%",
            top: "40%",
            background: "radial-gradient(ellipse, hsla(210, 60%, 45%, 0.1) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header with mask reveal */}
        <motion.div
          className="mb-24"
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
            Education
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
              Academic
            </motion.span>
            <motion.span
              className="text-editorial block mt-2"
              initial={{ y: "100%", filter: "blur(12px)" }}
              animate={isInView ? { y: 0, filter: "blur(0px)" } : {}}
              transition={{ delay: 0.4, duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
            >
              Background
            </motion.span>
          </h2>
        </motion.div>

        {/* Education items */}
        <div className="max-w-3xl space-y-20">
          {education.map((edu, index) => (
            <motion.div
              key={edu.degree}
              className="group relative"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ 
                delay: 0.5 + index * 0.25, 
                duration: 1.2, 
                ease: [0.23, 1, 0.32, 1] 
              }}
            >
              {/* Status badge with mask reveal */}
              <motion.span
                className="inline-block text-xs tracking-[0.3em] uppercase text-accent/70 font-mono mb-5"
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={isInView ? { clipPath: "inset(0 0% 0 0)" } : {}}
                transition={{ delay: 0.6 + index * 0.25, duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
              >
                {edu.status}
              </motion.span>

              {/* Degree with blur reveal */}
              <motion.h3
                className="font-serif text-2xl lg:text-4xl font-light mb-4"
                initial={{ opacity: 0, filter: "blur(12px)" }}
                animate={isInView ? { opacity: 1, filter: "blur(0px)" } : {}}
                transition={{ delay: 0.7 + index * 0.25, duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
              >
                {edu.degree}
              </motion.h3>

              {/* Institution */}
              <motion.p
                className="text-muted-foreground/70 font-light text-lg mb-3"
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8 + index * 0.25, duration: 0.9 }}
              >
                {edu.institution}
              </motion.p>

              {/* Focus area */}
              <motion.p
                className="text-sm text-muted-foreground/50 font-mono"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.9 + index * 0.25, duration: 0.9 }}
              >
                Focus: {edu.focus}
              </motion.p>

              {/* Animated glow divider */}
              <motion.div
                className="absolute left-0 -bottom-10 h-px w-0 overflow-hidden"
                animate={isInView ? { width: "100%" } : {}}
                transition={{ delay: 1 + index * 0.25, duration: 1.8, ease: [0.23, 1, 0.32, 1] }}
              >
                <motion.div
                  className="h-full w-full"
                  style={{
                    background: "linear-gradient(90deg, hsla(235, 50%, 50%, 0.3) 0%, hsla(220, 40%, 60%, 0.2) 50%, transparent 100%)",
                  }}
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 2 + index * 0.5,
                  }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LuxuryEducationSection;
