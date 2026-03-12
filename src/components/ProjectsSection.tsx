import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Bot, FileText, Search, ShoppingCart, CheckSquare, Gamepad2 } from "lucide-react";

const projects = [
  {
    title: "AI Task Agent",
    description: "Intelligent autonomous agent for task automation and workflow optimization powered by advanced LLMs.",
    icon: Bot,
    tags: ["AI", "Python", "LangChain"],
    gradient: "from-violet to-primary",
  },
  {
    title: "AI-Powered Resume Builder",
    description: "Smart resume generation system that crafts tailored, ATS-optimized resumes using AI.",
    icon: FileText,
    tags: ["React", "OpenAI", "Node.js"],
    gradient: "from-primary to-accent",
  },
  {
    title: "Information-Retrieving Agent",
    description: "RAG-based intelligent agent for contextual information retrieval and knowledge synthesis.",
    icon: Search,
    tags: ["Python", "Vector DB", "AI"],
    gradient: "from-accent to-violet",
  },
  {
    title: "E-Commerce Platform",
    description: "Full-featured online marketplace with real-time inventory, payments, and analytics.",
    icon: ShoppingCart,
    tags: ["Next.js", "Stripe", "PostgreSQL"],
    gradient: "from-violet to-accent",
  },
  {
    title: "To-Do App",
    description: "Cross-platform task management application with sync, reminders, and collaboration features.",
    icon: CheckSquare,
    tags: ["React", "Flutter", "Firebase"],
    gradient: "from-primary to-violet",
  },
  {
    title: "Trivia Quest Game",
    description: "Engaging multiplayer trivia game with real-time scoring and competitive leaderboards.",
    icon: Gamepad2,
    tags: ["React", "WebSocket", "Node.js"],
    gradient: "from-accent to-primary",
  },
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="relative py-32 overflow-hidden" ref={ref}>
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/10 via-transparent to-transparent opacity-50" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-primary text-sm tracking-[0.2em] uppercase mb-4">Featured Work</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Selected <span className="gradient-text">Projects</span>
          </h2>
        </motion.div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className="group relative"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <motion.div
                className="glass-panel p-6 h-full flex flex-col relative overflow-hidden"
                whileHover={{ scale: 1.02, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${project.gradient} p-3 mb-5 group-hover:scale-110 transition-transform duration-500`}>
                  <project.icon className="w-full h-full text-background" />
                </div>

                {/* Content */}
                <h3 className="font-display text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm flex-1 mb-4">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full bg-secondary text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Link */}
                <div className="flex items-center gap-2 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>View Project</span>
                  <ExternalLink className="w-4 h-4" />
                </div>

                {/* Glow effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none glow-border" />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
