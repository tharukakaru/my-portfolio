import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import FloatingCode from "./effects/FloatingCode";

const skillCategories = [
  {
    title: "Languages",
    skills: ["TypeScript", "Python", "JavaScript", "Dart", "Java", "C#"],
  },
  {
    title: "Web Development",
    skills: ["React", "Next.js", "Node.js", "Express", "Tailwind", "GraphQL"],
  },
  {
    title: "Mobile",
    skills: ["Flutter", "React Native", "Swift", "Kotlin"],
  },
  {
    title: "AI & Machine Learning",
    skills: ["TensorFlow", "PyTorch", "LangChain", "OpenAI", "Hugging Face", "RAG"],
  },
  {
    title: "Cloud & Infrastructure",
    skills: ["AWS", "Azure", "Docker", "Kubernetes", "CI/CD", "Terraform"],
  },
  {
    title: "Data & Storage",
    skills: ["PostgreSQL", "MongoDB", "Redis", "Firebase", "Supabase", "Prisma"],
  },
];

const LuxurySkillsSection = () => {
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
      id="skills" 
      className="relative py-20 lg:py-28 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Background with moving gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[hsl(230,28%,6%)] to-background" />
      
      {/* Floating code */}
      <FloatingCode count={8} className="opacity-30" />
      
      {/* Moving light gradient */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 40% at ${mousePos.x * 100}% ${mousePos.y * 100}%, 
            hsla(235, 50%, 45%, 0.08) 0%, 
            transparent 50%)`,
        }}
      />

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
            Expertise
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
              Technical
            </motion.span>
            <motion.span
              className="text-editorial block mt-2"
              initial={{ y: "100%", filter: "blur(12px)" }}
              animate={isInView ? { y: 0, filter: "blur(0px)" } : {}}
              transition={{ delay: 0.4, duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
            >
              Proficiency
            </motion.span>
          </h2>
        </motion.div>

        {/* Skills grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-14 gap-y-18">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 35 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                delay: 0.4 + categoryIndex * 0.12, 
                duration: 1.1, 
                ease: [0.23, 1, 0.32, 1] 
              }}
            >
              <motion.h3 
                className="text-xs tracking-[0.4em] uppercase text-accent/70 font-mono mb-7"
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={isInView ? { clipPath: "inset(0 0% 0 0)" } : {}}
                transition={{ delay: 0.5 + categoryIndex * 0.12, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              >
                {category.title}
              </motion.h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    className="group relative px-4 py-2.5 text-sm font-light text-foreground/70 border border-silver/10 hover:border-silver/30 transition-all duration-600 cursor-default overflow-hidden"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{
                      delay: 0.5 + categoryIndex * 0.1 + skillIndex * 0.04,
                      duration: 0.6,
                      ease: [0.23, 1, 0.32, 1],
                    }}
                    whileHover={{ 
                      y: -4,
                      boxShadow: "0 0 35px -8px hsl(220 15% 75% / 0.25)",
                      color: "hsl(var(--silver))",
                    }}
                  >
                    <span className="relative z-10">{skill}</span>
                    <motion.span 
                      className="absolute inset-0 bg-gradient-to-r from-silver/5 to-accent/5"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.4 }}
                    />
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LuxurySkillsSection;
