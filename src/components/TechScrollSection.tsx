import { motion } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiFlutter,
  SiDocker,
  SiAmazon,
  SiMongodb,
  SiTensorflow,
  SiPytorch,
  SiOpenai,
  SiFigma,
  SiGithub,
  SiTypescript,
  SiPython,
  SiTailwindcss,
  SiPostgresql,
} from "react-icons/si";

const techIcons = [
  { Icon: SiReact, name: "React", color: "#61DAFB" },
  { Icon: SiNextdotjs, name: "Next.js", color: "#FFFFFF" },
  { Icon: SiNodedotjs, name: "Node.js", color: "#339933" },
  { Icon: SiTypescript, name: "TypeScript", color: "#3178C6" },
  { Icon: SiPython, name: "Python", color: "#3776AB" },
  { Icon: SiFlutter, name: "Flutter", color: "#02569B" },
  { Icon: SiDocker, name: "Docker", color: "#2496ED" },
  { Icon: SiAmazon, name: "AWS", color: "#FF9900" },
  { Icon: SiMongodb, name: "MongoDB", color: "#47A248" },
  { Icon: SiTensorflow, name: "TensorFlow", color: "#FF6F00" },
  { Icon: SiPytorch, name: "PyTorch", color: "#EE4C2C" },
  { Icon: SiOpenai, name: "OpenAI", color: "#412991" },
  { Icon: SiFigma, name: "Figma", color: "#F24E1E" },
  { Icon: SiGithub, name: "GitHub", color: "#FFFFFF" },
  { Icon: SiTailwindcss, name: "Tailwind", color: "#06B6D4" },
  { Icon: SiPostgresql, name: "PostgreSQL", color: "#4169E1" },
];

const TechScrollSection = () => {
  // Double the icons for seamless loop
  const doubledIcons = [...techIcons, ...techIcons];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-secondary/30 to-background" />
      
      {/* Top fade */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

      <div className="relative">
        <motion.div
          className="flex gap-16"
          animate={{ x: [0, -50 * techIcons.length] }}
          transition={{
            x: {
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          {doubledIcons.map((tech, index) => (
            <motion.div
              key={`${tech.name}-${index}`}
              className="flex flex-col items-center gap-3 min-w-[100px]"
              whileHover={{ scale: 1.2, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className="w-16 h-16 flex items-center justify-center rounded-2xl glass-panel hover:glow-border transition-all duration-500"
                style={{
                  boxShadow: `0 0 30px -10px ${tech.color}40`,
                }}
              >
                <tech.Icon
                  className="w-8 h-8 transition-all duration-300"
                  style={{ color: tech.color }}
                />
              </div>
              <span className="text-xs text-muted-foreground font-medium opacity-70">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechScrollSection;
