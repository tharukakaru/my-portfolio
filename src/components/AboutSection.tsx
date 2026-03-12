import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Sparkles, Code2, Brain } from "lucide-react";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    { icon: Code2, label: "Full-Stack Development" },
    { icon: Brain, label: "AI & Machine Learning" },
    { icon: Sparkles, label: "UI/UX Design" },
  ];

  return (
    <section id="about" className="relative py-32 overflow-hidden" ref={ref}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent opacity-50" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Visual */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Glowing orb background */}
              <div className="absolute inset-0 rounded-full bg-gradient-radial from-primary/20 via-accent/10 to-transparent animate-glow-pulse" />
              
              {/* Glass panel with code aesthetic */}
              <div className="absolute inset-8 glass-panel rounded-3xl p-8 flex flex-col justify-center">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-destructive" />
                    <div className="w-3 h-3 rounded-full bg-accent" />
                    <div className="w-3 h-3 rounded-full bg-primary" />
                  </div>
                  <div className="font-mono text-sm text-muted-foreground space-y-2">
                    <p><span className="text-violet">const</span> developer = {"{"}</p>
                    <p className="pl-4"><span className="text-accent">name</span>: <span className="text-primary">"Tharuka"</span>,</p>
                    <p className="pl-4"><span className="text-accent">passion</span>: <span className="text-primary">"AI Systems"</span>,</p>
                    <p className="pl-4"><span className="text-accent">focus</span>: <span className="text-primary">"Excellence"</span></p>
                    <p>{"}"}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          >
            <motion.p
              className="text-primary text-sm tracking-[0.2em] uppercase mb-4"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              About Me
            </motion.p>
            
            <motion.h2
              className="font-display text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Crafting the <span className="gradient-text">Future</span> of Digital Experiences
            </motion.h2>

            <motion.p
              className="text-muted-foreground text-lg leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              As an Undergraduate Software Engineer, I specialize in building intelligent, 
              full-stack applications powered by cutting-edge AI. My passion lies in creating 
              agentic systems, seamless automation, and beautiful user experiences that push 
              the boundaries of what's possible.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.label}
                  className="glass-panel px-5 py-3 flex items-center gap-3 hover:glow-border transition-all duration-500"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <feature.icon className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">{feature.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
