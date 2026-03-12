import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap } from "lucide-react";

const education = [
  {
    degree: "BSc (Hons) Software Engineering",
    institution: "SLTC Research University",
    status: "Undergraduate",
    description: "Specializing in AI systems, software architecture, and modern development practices.",
  },
  {
    degree: "Diploma in Information Technology",
    institution: "University of Hertfordshire",
    status: "Completed",
    description: "Foundation in computer science, programming fundamentals, and IT systems.",
  },
];

const EducationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="relative py-32 overflow-hidden" ref={ref}>
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-primary text-sm tracking-[0.2em] uppercase mb-4">Academic Background</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            <span className="gradient-text">Education</span>
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-8">
          {education.map((edu, index) => (
            <motion.div
              key={edu.degree}
              className="glass-panel p-8 group hover:glow-border transition-all duration-500"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10 group-hover:from-primary/30 group-hover:to-accent/20 transition-all duration-500">
                  <GraduationCap className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="text-xs px-3 py-1 rounded-full bg-accent/20 text-accent">
                      {edu.status}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-2">
                    {edu.degree}
                  </h3>
                  <p className="text-primary text-sm mb-3">{edu.institution}</p>
                  <p className="text-muted-foreground text-sm">{edu.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
