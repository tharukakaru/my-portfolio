import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Github, Linkedin, ArrowUpRight } from "lucide-react";
import OceanCanvas from "./effects/OceanCanvas";

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: "tharukakarunarathne60@gmail.com",
    href: "mailto:tharukakarunarathne60@gmail.com",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "https://github.com/tharukakaru",
    href: "https://github.com/tharukakaru",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "www.linkedin.com/in/tkarunarathne",
    href: "https://www.linkedin.com/in/tkarunarathne",
  },
];

const MagneticButton = ({ children, href }: { children: React.ReactNode; href: string }) => {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { damping: 15, stiffness: 150 });
  const smoothY = useSpring(y, { damping: 15, stiffness: 150 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  // Glow trail effect
  const glowOpacity = useTransform(smoothX, [-30, 0, 30], [0.4, 0.2, 0.4]);

  return (
    <motion.a
      ref={buttonRef}
      href={href}
      target={href.startsWith("mailto") ? undefined : "_blank"}
      rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
      className="group relative inline-flex items-center gap-4 px-10 py-5 border border-silver/20 hover:border-silver/40 transition-colors duration-700 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ x: smoothX, y: smoothY }}
    >
      {/* Background glow */}
      <motion.span 
        className="absolute inset-0 bg-silver/5"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      />
      
      {/* Glow trail */}
      <motion.span 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${50 + smoothX.get()}% ${50 + smoothY.get()}%, hsla(220, 50%, 70%, ${glowOpacity.get()}) 0%, transparent 60%)`,
          opacity: isHovered ? 1 : 0,
        }}
      />
      
      <span className="relative z-10 font-light tracking-wide">{children}</span>
      <ArrowUpRight className="w-5 h-5 relative z-10 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
    </motion.a>
  );
};

const LuxuryContactSection = () => {
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
      id="contact" 
      className="relative min-h-screen py-20 lg:py-28 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Calm ocean background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-background via-[hsl(225,30%,5%)] to-background" />
      
      {/* Live calm ocean */}
      <OceanCanvas 
        intensity="calm" 
        cursorX={mousePos.x} 
        cursorY={mousePos.y}
        className="opacity-40"
      />

      {/* Moon reflection overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: `radial-gradient(ellipse 50% 35% at ${30 + mousePos.x * 40}% ${40 + mousePos.y * 20}%, 
            hsla(210, 40%, 85%, 0.08) 0%, 
            hsla(220, 30%, 70%, 0.03) 40%, 
            transparent 70%)`,
        }}
      />
      
      {/* Top gradient overlay */}
      <div className="absolute inset-0 z-15 bg-gradient-to-b from-background via-transparent to-background/90 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-20">
        {/* Section header */}
        <motion.div
          className="mb-20"
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
            Contact
          </motion.span>
          <motion.div 
            className="editorial-line w-32 mt-5"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.3, duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
            style={{ originX: 0 }}
          />
        </motion.div>

        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-end">
          {/* Left - Heading */}
          <motion.div
            initial={{ opacity: 0, y: 70 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 1.4, ease: [0.23, 1, 0.32, 1] }}
          >
            <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl font-light leading-[1.05]">
              <motion.span
                className="text-metallic block"
                initial={{ y: "100%", filter: "blur(15px)" }}
                animate={isInView ? { y: 0, filter: "blur(0px)" } : {}}
                transition={{ delay: 0.3, duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
              >
                Let's create
              </motion.span>
              <motion.span
                className="text-editorial block mt-2"
                initial={{ y: "100%", filter: "blur(15px)" }}
                animate={isInView ? { y: 0, filter: "blur(0px)" } : {}}
                transition={{ delay: 0.5, duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
              >
                something
              </motion.span>
              <motion.span
                className="text-metallic block mt-2"
                initial={{ y: "100%", filter: "blur(15px)" }}
                animate={isInView ? { y: 0, filter: "blur(0px)" } : {}}
                transition={{ delay: 0.7, duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
              >
                remarkable.
              </motion.span>
            </h2>

            <motion.p
              className="mt-10 text-muted-foreground/70 font-light text-lg max-w-md"
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1, duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
            >
              Open to collaborations, opportunities, and conversations about the future of technology.
            </motion.p>
          </motion.div>

          {/* Right - Contact panel with moving reflection */}
          <motion.div
            className="relative p-10 lg:p-12 overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 1.4, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* Glass panel background */}
            <div className="absolute inset-0 luxury-glass" />
            
            {/* Moving reflection on glass */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(135deg, 
                  transparent 0%, 
                  hsla(220, 30%, 80%, 0.03) ${mousePos.x * 100}%, 
                  transparent 100%)`,
              }}
            />

            {/* Cursor-based light shift */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, 
                  hsla(235, 50%, 60%, 0.05) 0%, 
                  transparent 50%)`,
              }}
            />

            <div className="relative z-10 space-y-8">
              {contactLinks.map((link, index) => (
                <motion.div
                  key={link.label}
                  className="group flex items-center justify-between py-5 border-b border-silver/10 last:border-0"
                  initial={{ opacity: 0, x: 25 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.9 + index * 0.12, duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
                >
                  <div className="flex items-center gap-5">
                    <link.icon className="w-5 h-5 text-muted-foreground/60 group-hover:text-foreground transition-colors duration-600" />
                    <div>
                      <p className="text-xs text-muted-foreground/50 font-mono mb-1">{link.label}</p>
                      <p className="font-light group-hover:text-metallic transition-colors duration-600">
                        {link.value}
                      </p>
                    </div>
                  </div>
                  <motion.a
                    href={link.href}
                    target={link.label !== "Email" ? "_blank" : undefined}
                    rel={link.label !== "Email" ? "noopener noreferrer" : undefined}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    whileHover={{ x: 5, y: -3 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowUpRight className="w-5 h-5 text-silver/60" />
                  </motion.a>
                </motion.div>
              ))}
            </div>

            {/* CTA Button with magnetic effect */}
            <motion.div
              className="relative z-10 mt-12"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1.4, duration: 1 }}
            >
              <MagneticButton href="mailto:hello@tharuka.dev">
                Start a Conversation
              </MagneticButton>
            </motion.div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer
          className="mt-36 pt-10 border-t border-silver/10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.6, duration: 1 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs font-mono text-muted-foreground/40 tracking-widest">
              ©2026_THARUKA_KARUNARATHNE
            </p>
            <p className="text-xs font-mono text-muted-foreground/30 tracking-wide">
              CRAFTED WITH PRECISION
            </p>
          </div>
        </motion.footer>
      </div>
    </section>
  );
};

export default LuxuryContactSection;
