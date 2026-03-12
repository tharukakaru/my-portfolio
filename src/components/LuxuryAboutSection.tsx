import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import portraitPlaceholder from "@/assets/img3.png";
import FloatingCode from "./effects/FloatingCode";

const LuxuryAboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  
  const isInView = useInView(sectionRef, { once: true, margin: "-20%" });
  const isTextInView = useInView(textRef, { once: true, margin: "-10%" });
  
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const glowX = useMotionValue(0.5);
  const glowY = useMotionValue(0.5);
  const smoothGlowX = useSpring(glowX, { damping: 20, stiffness: 80 });
  const smoothGlowY = useSpring(glowY, { damping: 20, stiffness: 80 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (rect) {
      glowX.set((e.clientX - rect.left) / rect.width);
      glowY.set((e.clientY - rect.top) / rect.height);
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    }
  };

  const imageY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 1.04]);
  const imageRotate = useTransform(scrollYProgress, [0, 1], [-2, 2]);
  const textY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const words = "I architect intelligent systems that bridge the gap between human intuition and machine precision. My work exists at the intersection of aesthetic excellence and technical depth—where every line of code serves both function and form.".split(" ");

  return (
    <section 
      ref={sectionRef} 
      id="about" 
      className="relative min-h-screen py-20 lg:py-28 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Dark ocean/space background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[hsl(228,30%,6%)] to-background" />
      
      {/* Floating holographic code - more dense */}
      <FloatingCode count={12} className="opacity-50" />
      
      {/* Subtle horizontal mist drift */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%"],
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          background: "linear-gradient(90deg, transparent 0%, hsla(235, 50%, 30%, 0.03) 25%, transparent 50%, hsla(220, 50%, 40%, 0.02) 75%, transparent 100%)",
          backgroundSize: "200% 100%",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Editorial layout - asymmetric */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* Portrait - with enhanced parallax and cursor glow */}
          <motion.div 
            ref={imageRef}
            className="lg:col-span-5 lg:col-start-1"
            style={{ y: imageY }}
          >
            <motion.div
              className="relative aspect-[3/4] max-w-md mx-auto lg:mx-0"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1.8, ease: [0.23, 1, 0.32, 1] }}
            >
              {/* Cursor-reactive glow halo */}
              <motion.div 
                className="absolute -inset-8 -z-10 blur-3xl opacity-50"
                style={{
                  background: `radial-gradient(ellipse at ${smoothGlowX.get() * 100}% ${smoothGlowY.get() * 100}%, 
                    hsla(235, 60%, 50%, 0.2) 0%, 
                    hsla(210, 50%, 40%, 0.1) 40%, 
                    transparent 70%)`,
                }}
              />
              
              {/* Image container with float animation */}
              <motion.div 
                className="relative overflow-hidden rounded-sm"
                style={{ 
                  scale: imageScale,
                  rotateZ: imageRotate,
                }}
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <img
                  src={portraitPlaceholder}
                  alt="Tharuka Karunarathne"
                  className="w-full h-full object-cover"
                />
                
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />
                
                {/* Editorial frame lines */}
                <motion.div 
                  className="absolute top-4 left-4 w-12 h-px bg-silver/40"
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ delay: 0.8, duration: 1, ease: [0.23, 1, 0.32, 1] }}
                  style={{ originX: 0 }}
                />
                <motion.div 
                  className="absolute top-4 left-4 w-px h-12 bg-silver/40"
                  initial={{ scaleY: 0 }}
                  animate={isInView ? { scaleY: 1 } : {}}
                  transition={{ delay: 0.9, duration: 1, ease: [0.23, 1, 0.32, 1] }}
                  style={{ originY: 0 }}
                />
                <motion.div 
                  className="absolute bottom-4 right-4 w-12 h-px bg-silver/40"
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ delay: 1, duration: 1, ease: [0.23, 1, 0.32, 1] }}
                  style={{ originX: 1 }}
                />
                <motion.div 
                  className="absolute bottom-4 right-4 w-px h-12 bg-silver/40"
                  initial={{ scaleY: 0 }}
                  animate={isInView ? { scaleY: 1 } : {}}
                  transition={{ delay: 1.1, duration: 1, ease: [0.23, 1, 0.32, 1] }}
                  style={{ originY: 1 }}
                />
              </motion.div>

              {/* Caption with mask reveal */}
              <motion.p
                className="mt-8 text-xs tracking-[0.4em] text-muted-foreground/50 font-mono"
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={isInView ? { clipPath: "inset(0 0% 0 0)" } : {}}
                transition={{ delay: 1.2, duration: 1, ease: [0.23, 1, 0.32, 1] }}
              >
                [ FULL STACK DEVELOPER · AI ENTHUSIAST · UI/UX DESIGNER ]
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Text content - editorial typography */}
          <motion.div 
            ref={textRef}
            className="lg:col-span-6 lg:col-start-7"
            style={{ y: textY }}
          >
            {/* Section label with mask reveal */}
            <motion.div
              className="mb-14"
              initial={{ opacity: 0 }}
              animate={isTextInView ? { opacity: 1 } : {}}
              transition={{ duration: 1 }}
            >
              <motion.span 
                className="text-xs tracking-[0.5em] uppercase text-accent/70 font-mono inline-block"
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={isTextInView ? { clipPath: "inset(0 0% 0 0)" } : {}}
                transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
              >
                 About
              </motion.span>
              <motion.div 
                className="editorial-line w-32 mt-5"
                initial={{ scaleX: 0 }}
                animate={isTextInView ? { scaleX: 1 } : {}}
                transition={{ delay: 0.3, duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
                style={{ originX: 0 }}
              />
            </motion.div>

            {/* Main heading with light emerge effect */}
            <motion.h2
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] mb-14"
            >
              <motion.span
                className="text-metallic block overflow-hidden"
                initial={{ y: "100%", filter: "blur(10px)" }}
                animate={isTextInView ? { y: 0, filter: "blur(0px)" } : {}}
                transition={{ delay: 0.2, duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
              >
                Building the future,
              </motion.span>
              <motion.span
                className="text-editorial block overflow-hidden mt-2"
                initial={{ y: "100%", filter: "blur(10px)" }}
                animate={isTextInView ? { y: 0, filter: "blur(0px)" } : {}}
                transition={{ delay: 0.4, duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
              >
                one system at a time.
              </motion.span>
            </motion.h2>

            {/* Word-by-word reveal paragraph - emerging from light */}
            <div className="text-lg text-muted-foreground font-sans font-light leading-relaxed mb-14">
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-[0.35em]"
                  initial={{ opacity: 0, y: 25, filter: "blur(6px)" }}
                  animate={isTextInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                  transition={{
                    delay: 0.6 + i * 0.025,
                    duration: 0.7,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </div>

            {/* Stats with staggered reveal */}
            <motion.div
              className="grid grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={isTextInView ? { opacity: 1 } : {}}
              transition={{ delay: 1.5, duration: 1 }}
            >
              {[
                { number: "3+", label: "Years Experience" },
                { number: "30+", label: "Projects Shipped" },
                { number: "5+", label: "AI Systems Built" },
              ].map((stat, i) => (
                <motion.div 
                  key={stat.label} 
                  className="text-center lg:text-left"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isTextInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1.6 + i * 0.15, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                >
                  <span className="block font-serif text-3xl lg:text-4xl text-metallic mb-2">
                    {stat.number}
                  </span>
                  <span className="text-xs tracking-[0.25em] uppercase text-muted-foreground/50">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LuxuryAboutSection;
