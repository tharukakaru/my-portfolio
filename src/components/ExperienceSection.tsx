import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase } from "lucide-react";

const experiences = [
  {
    title: "Junior Software Engineer",
    company: "AbsolX Core AI",
    type: "Current",
    description: "Building AI-powered solutions and intelligent automation systems.",
  },
  {
    title: "Junior Software Engineer",
    company: "CodeGen International",
    type: "Current",
    description: "Full-stack development and enterprise software solutions.",
  },
  {
    title: "Software Developer Intern",
    company: "Dodget Lawyer",
    type: "Internship",
    description: "Legal tech solutions and document automation systems.",
  },
  {
    title: "Full Stack Developer Intern",
    company: "Adventa",
    type: "Internship",
    description: "End-to-end application development and cloud integration.",
  },
  {
    title: "Full Stack Developer Intern",
    company: "Codex Harbor",
    type: "Internship",
    description: "Modern web applications and API development.",
  },
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="relative py-32 overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/30 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-primary text-sm tracking-[0.2em] uppercase mb-4">Career Journey</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Professional <span className="gradient-text">Experience</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px timeline-line transform md:-translate-x-1/2" />

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className={`relative flex items-center mb-12 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.15 }}
            >
              {/* Timeline dot */}
              <motion.div
                className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-primary transform md:-translate-x-1/2 glow-border"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
              />

              {/* Content card */}
              <div
                className={`ml-8 md:ml-0 md:w-[45%] ${
                  index % 2 === 0 ? "md:pr-12" : "md:pl-12"
                }`}
              >
                <motion.div
                  className="glass-panel p-6 group hover:glow-border transition-all duration-500"
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Briefcase className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs px-2 py-1 rounded-full bg-accent/20 text-accent">
                          {exp.type}
                        </span>
                      </div>
                      <h3 className="font-display text-lg font-semibold mb-1">
                        {exp.title}
                      </h3>
                      <p className="text-primary text-sm mb-2">{exp.company}</p>
                      <p className="text-muted-foreground text-sm">{exp.description}</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
