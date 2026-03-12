import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useMagneticEffect } from "@/hooks/useLuxuryEffects";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

const MagneticNavLink = ({
  href,
  children,
  delay,
}: {
  href: string;
  children: string;
  delay: number;
}) => {
  const { offset, handleMouseMove, handleMouseLeave } = useMagneticEffect(0.3);

  return (
    <motion.a
      href={href}
      className="relative text-sm font-light text-muted-foreground hover:text-foreground transition-colors duration-500 group"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.23, 1, 0.32, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: offset.x, y: offset.y }}
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-px bg-silver/50 transition-all duration-500 group-hover:w-full" />
    </motion.a>
  );
};

const LuxuryNavigation = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  const navOpacity = useTransform(scrollY, [0, 100], [0, 1]);
  const navBlur = useTransform(scrollY, [0, 100], [0, 10]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100 && !mobileMenuOpen) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, mobileMenuOpen]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 px-6 py-5"
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      >
        <motion.div
          className="absolute inset-0 border-b border-silver/5"
          style={{
            opacity: navOpacity,
            backdropFilter: `blur(${navBlur}px)`,
            backgroundColor: "hsl(228 25% 4% / 0.8)",
          }}
        />

        <div className="container mx-auto relative z-10">
          <div className="flex items-center justify-between">
            <motion.a
              href="#"
              className="font-serif text-xl font-light text-metallic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              T
            </motion.a>

            <div className="hidden md:flex items-center gap-10">
              {navLinks.map((link, index) => (
                <MagneticNavLink
                  key={link.label}
                  href={link.href}
                  delay={0.6 + index * 0.1}
                >
                  {link.label}
                </MagneticNavLink>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <motion.div
                className="hidden sm:flex items-center gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
              >
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-xs font-mono text-muted-foreground/60">
                  AVAILABLE FOR WORK
                </span>
              </motion.div>

              <button
                type="button"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="md:hidden inline-flex items-center justify-center rounded-full border border-silver/15 bg-background/30 p-2 text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-md md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
            />

            <motion.div
              className="fixed top-[76px] left-4 right-4 z-50 rounded-2xl border border-silver/10 bg-[hsl(228_25%_6%_/_0.96)] p-6 shadow-2xl md:hidden"
              initial={{ opacity: 0, y: -20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.96 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <div className="flex flex-col gap-5">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={closeMobileMenu}
                    className="border-b border-silver/10 pb-3 text-sm font-light tracking-wide text-muted-foreground hover:text-foreground transition-colors duration-300"
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {link.label}
                  </motion.a>
                ))}

                <motion.a
                  href="#contact"
                  onClick={closeMobileMenu}
                  className="mt-2 inline-flex items-center justify-center rounded-full border border-silver/15 px-4 py-3 text-sm font-medium text-foreground transition-all duration-300 hover:border-silver/30 hover:bg-white/5"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: 0.2 }}
                >
                  Let&apos;s Talk
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default LuxuryNavigation;
