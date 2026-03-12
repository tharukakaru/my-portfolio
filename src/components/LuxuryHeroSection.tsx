import { motion, useScroll, useTransform, useMotionValue, useSpring, animate } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import OceanCanvas from "./effects/OceanCanvas";
import FloatingCode from "./effects/FloatingCode";

const LuxuryHeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  
  const cursorX = useMotionValue(0.5);
  const cursorY = useMotionValue(0.5);
  const smoothX = useSpring(cursorX, { damping: 30, stiffness: 100 });
  const smoothY = useSpring(cursorY, { damping: 30, stiffness: 100 });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      cursorX.set(x);
      cursorY.set(y);
      setMousePos({ x, y });
    }
  };

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  // Light sweep animation for name reveal
  const lightSweep = useMotionValue(0);
  const lightSweepX = useTransform(lightSweep, [0, 1], ["-100%", "200%"]);
  
  useEffect(() => {
    if (isLoaded) {
      animate(lightSweep, 1, { duration: 2, delay: 0.5, ease: [0.23, 1, 0.32, 1] });
    }
  }, [isLoaded, lightSweep]);

  return (
    <section 
      ref={containerRef} 
      className="relative h-screen overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Base dark background */}
      <motion.div 
        className="absolute inset-0 z-0 bg-[hsl(220,40%,4%)]"
        style={{ scale }}
      />

      {/* Live ocean video background - PRIMARY ELEMENT */}
      <OceanCanvas 
        intensity="dynamic" 
        cursorX={mousePos.x} 
        cursorY={mousePos.y}
        className="z-5"
      />
      
      {/* Floating code snippets */}
      <FloatingCode count={10} className="z-10 opacity-60" />

      {/* Nebula glow in upper portion */}
      <motion.div
        className="absolute inset-0 z-12 pointer-events-none"
        animate={{
          background: `radial-gradient(ellipse 80% 50% at ${50 + (mousePos.x - 0.5) * 20}% 20%, 
            hsla(235, 50%, 35%, 0.08) 0%, 
            hsla(220, 45%, 25%, 0.04) 40%, 
            transparent 70%)`,
        }}
        transition={{ duration: 1, ease: "easeOut" }}
      />

      {/* Top fade for navbar blend */}
      <div className="absolute inset-0 z-20 bg-gradient-to-b from-background/60 via-transparent to-background/80 pointer-events-none" />

      {/* Content */}
      <motion.div 
        className="relative z-30 h-full flex flex-col justify-center items-center px-6"
        style={{ y, opacity }}
      >
        <div className="text-center max-w-6xl mx-auto">
          {/* Subtitle with staggered blur reveal */}
          <motion.div
            className="mb-10 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 1.5 }}
          >
            <motion.p
              className="text-xs tracking-[0.5em] uppercase text-silver/70 font-sans font-light"
              initial={{ opacity: 0, filter: "blur(20px)", y: 20 }}
              animate={isLoaded ? { opacity: 1, filter: "blur(0px)", y: 0 } : {}}
              transition={{ delay: 0.6, duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
            >
              Junior Software Engineer • UI/UX Designer • AI Enthusiast
            </motion.p>
          </motion.div>

          {/* Main name with mask + light sweep reveal */}
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-light leading-[0.9] mb-8">
            {isLoaded && (
              <>
                <div className="overflow-hidden relative">
                  <motion.div
                    className="relative"
                    initial={{ y: "120%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1.4, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
                  >
                    {/* Light sweep effect */}
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      style={{ x: lightSweepX }}
                    />
                    <span className="text-metallic relative z-10">Tharuka</span>
                  </motion.div>
                </div>
                <div className="overflow-hidden mt-2 relative">
                  <motion.div
                    initial={{ y: "120%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1.4, delay: 0.7, ease: [0.23, 1, 0.32, 1] }}
                  >
                    <span className="text-editorial">Karunarathne</span>
                  </motion.div>
                </div>
              </>
            )}
          </h1>

          {/* Description with opacity + blur interpolation */}
          <motion.p
            className="max-w-xl mx-auto text-muted-foreground/80 font-sans font-light text-lg leading-relaxed mt-16"
            initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
            animate={isLoaded ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ delay: 1.6, duration: 1.4, ease: [0.23, 1, 0.32, 1] }}
          >
            Crafting intelligent systems and elegant interfaces 
            at the intersection of AI and design.
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-16 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : {}}
            transition={{ delay: 2.5, duration: 1 }}
          >
            <motion.div
              className="w-px h-20 relative overflow-hidden"
              style={{ background: 'linear-gradient(to bottom, transparent, hsl(var(--silver) / 0.3), transparent)' }}
            >
              <motion.div
                className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-silver to-transparent"
                animate={{ y: [0, 60, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Editorial corner accents */}
      
    </section>
  );
};

export default LuxuryHeroSection;
