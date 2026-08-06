import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import FloatingCode from "./effects/FloatingCode";

interface ProjectMedia {
  type: "image" | "video";
  url: string;
  alt: string;
}

interface Project {
  title: string;
  description: string;
  category: string;
  media: ProjectMedia[];
  swipeInterval?: number; // Different timing for each card
}

const projects: Project[] = [
  {
    title: "E-Commerce Platform",
    description: "Full-featured clothing marketplace with real-time inventory management, advanced product filtering, secure payment gateway integration, shopping cart system, wishlist functionality, and comprehensive admin dashboard with sales analytics and order tracking.",
    category: "Full-Stack",
    swipeInterval: 8000,
    media: [
      { type: "image", url: "public/projects/E-Com/artwe6.png", alt: "E-commerce screenshot 1" },
      { type: "image", url: "public/projects/E-Com/artwe2.png", alt: "E-commerce screenshot 2" },
      { type: "image", url: "public/projects/E-Com/artwe3.png", alt: "E-commerce screenshot 3" },
      { type: "image", url: "public/projects/E-Com/artwe4.png", alt: "E-commerce screenshot 4" },
      { type: "image", url: "public/projects/E-Com/artwe5.png", alt: "E-commerce screenshot 5" },
      { type: "image", url: "public/projects/E-Com/artwe1.png", alt: "E-commerce screenshot 6" },
      { type: "image", url: "public/projects/E-Com/artwe7.png", alt: "E-commerce screenshot 7" },
    ],
  },
  {
    title: "AI Resume Intelligence",
    description: "Intelligent resume analysis platform using AI/ML to match candidates with job descriptions, optimize for ATS systems, identify skill gaps, provide personalized skill recommendations, and offer role-specific practice quizzes for career development.",
    category: "AI/Web",
    swipeInterval: 12000,
    media: [
      { type: "video", url: "public/projects/AI Res/internalze.mp4", alt: "Demo" },
      { type: "image", url: "public/projects/AI Res/internalze0.png", alt: "Resume analysis 0" },
      { type: "image", url: "public/projects/AI Res/internalze1.png", alt: "Resume analysis 1" },
      { type: "image", url: "public/projects/AI Res/internalze2.png", alt: "Resume analysis 2" },
      { type: "image", url: "public/projects/AI Res/internalze3.png", alt: "Resume analysis 3" },
      { type: "image", url: "public/projects/AI Res/internalze4.png", alt: "Resume analysis 4" },
      { type: "image", url: "public/projects/AI Res/internalze5.png", alt: "Resume analysis 5" },
      { type: "image", url: "public/projects/AI Res/internalze6.png", alt: "Resume analysis 6" },
      { type: "image", url: "public/projects/AI Res/internalze7.png", alt: "Resume analysis 7" },
      { type: "image", url: "public/projects/AI Res/internalze8.png", alt: "Resume analysis 8" },
      { type: "image", url: "public/projects/AI Res/internalze9.png", alt: "Resume analysis 9" },
    ],
  },
  {
    title: "AI Chatbot",
    description: "Intelligent conversational AI system with contextual understanding, multi-turn dialogue capability, real-time response generation, source attribution for answers, and seamless integration for customer support automation.",
    category: "Machine Learning",
    swipeInterval: 5000,
    media: [
      { type: "video", url: "public/projects/chat/chatbot soul1.mp4", alt: "1" },
      { type: "video", url: "public/projects/chat/chatbot soul2.mp4", alt: "2" },
      { type: "video", url: "public/projects/chat/chatbot soul.mp4", alt: "3" },
      { type: "image", url: "public/projects/chat/chatbot soul.png", alt: "4" },
    ],
  },
  {
    title: "Hair Salon Mobile/Web App",
    description: "Cross-platform booking application for salon services with appointment scheduling, staff management, service catalog with pricing, customer profiles, booking history, payment processing, and real-time availability updates.",
    category: "Full-Stack",
    swipeInterval: 1600,
    media: [
      { type: "image", url: "public/projects/Salon/hairapp0.png", alt: "Salon booking app1" },
      { type: "image", url: "public/projects/Salon/hairapp1.png", alt: "Salon booking app2" },
      { type: "image", url: "public/projects/Salon/hairapp2.png", alt: "Salon booking app3" },
      { type: "image", url: "public/projects/Salon/hairapp3.png", alt: "Salon booking app4" },
      { type: "image", url: "public/projects/Salon/hairapp4.png", alt: "Salon booking app5" },
      { type: "image", url: "public/projects/Salon/hairapp5.png", alt: "Salon booking app6" },
      { type: "image", url: "public/projects/Salon/hairappb1.png", alt: "Salon booking app7" },
      { type: "image", url: "public/projects/Salon/hairappb2.png", alt: "Salon booking app8" },
      { type: "image", url: "public/projects/Salon/hairappb3.png", alt: "Salon booking app9" },
      { type: "image", url: "public/projects/Salon/hairappweb.png", alt: "Salon booking app10" },
      { type: "image", url: "public/projects/Salon/hairappweb1.png", alt: "Salon booking app11" },
      { type: "image", url: "public/projects/Salon/hairappweb2.png", alt: "Salon booking app12" },
      { type: "image", url: "public/projects/Salon/hairappweb3.png", alt: "Salon booking app13" },
      { type: "image", url: "public/projects/Salon/hairappweb4.png", alt: "Salon booking app14" },
      { type: "image", url: "public/projects/Salon/hairappweb5.png", alt: "Salon booking app15" },
      { type: "image", url: "public/projects/Salon/hairappweb6.png", alt: "Salon booking app16" },
      { type: "image", url: "public/projects/Salon/hairappweb7.png", alt: "Salon booking app17" },
      { type: "image", url: "public/projects/Salon/hairappweb8.png", alt: "Salon booking app18" },
    ],
  },
  {
    title: "Multi-Agent Workflow",
    description: "Coordinated multi-agent LLM system orchestrating autonomous AI agents for complex workflow automation, task delegation, intelligent decision-making, and seamless inter-agent communication for enterprise process optimization.",
    category: "AI/Backend",
    swipeInterval: 1400,
    media: [
      { type: "image", url: "public/projects/mob chat/0.png", alt: "Workflow diagram" },
    ],
  },
  {
    title: "RAG Information System",
    description: "Retrieval-Augmented Generation system combining vector databases with LLMs to deliver accurate, source-attributed answers. Ingests documents, creates embeddings, performs semantic search, and provides citations for information retrieval queries.",
    category: "Machine Learning",
    swipeInterval: 1700,
    media: [
      { type: "image", url: "public/projects/14.png", alt: "RAG interface" },
    ],
  },
  {
    title: "Smart Attendance IoT",
    description: "Bluetooth-enabled IoT system for automated attendance marking in educational institutions. Features real-time tracking, proximity-based detection, attendance reports, student location history, and seamless integration with academic management systems.",
    category: "IoT/Hardware",
    swipeInterval: 1900,
    media: [
      { type: "video", url: "public/projects/Multi-Agent/12.mp4", alt: "Iot device" },
    ],
  },
  {
    title: "AI Content Difficulty Classifier",
    description: "Machine learning model that analyzes educational content including text, images, and videos. Automatically chunks materials and assigns difficulty scores (beginner to advanced) using deep learning, aiding in curriculum planning and personalized learning paths.",
    category: "Machine Learning",
    swipeInterval: 1500,
    media: [
      { type: "image", url: "public/projects/AI/nuro1.png", alt: "0" },
      { type: "image", url: "public/projects/AI/nuro1.5.png", alt: "1" },
      { type: "image", url: "public/projects/AI/nuro2.png", alt: "2" },
      { type: "image", url: "public/projects/AI/nuro2.5.png", alt: "3" },
      { type: "image", url: "public/projects/AI/nuro3.png", alt: "4" },
      { type: "image", url: "public/projects/AI/nuro3.5.png", alt: "5" },
      { type: "image", url: "public/projects/AI/nuro4.png", alt: "6" },
      { type: "image", url: "public/projects/AI/nuro4.5.png", alt: "7" },
      { type: "image", url: "public/projects/AI/nuro5.png", alt: "8" },
      { type: "image", url: "public/projects/AI/nuro6.png", alt: "9" },
      { type: "image", url: "public/projects/AI/nuro7.png", alt: "10" },
      { type: "image", url: "public/projects/AI/nuro8.png", alt: "11" },
      { type: "image", url: "public/projects/AI/nuro9.png", alt: "12" },
    ],
  },
  {
    title: "Salon Booking Video Showcase",
    description: "Professional video walkthrough of the complete salon booking platform demonstrating user interface, real-time appointment scheduling, service selection, payment flow, and admin management features in action.",
    category: "Full-Stack",
    swipeInterval: 1800,
    media: [
      { type: "video", url: "public/projects/Salon/salonvid.mp4", alt: "Salon booking appp" },
    ],
  },
  {
    title: "ERP Platform",
    description: "Enterprise Resource Planning system managing customer relationships, sales pipelines, and business analytics. Features CRM capabilities, reporting dashboards, customer segmentation, sales forecasting, and integrated communication tools for enterprise operations.",
    category: "Full-Stack",
    swipeInterval: 1650,
    media: [
      { type: "image", url: "public/projects/CRM/ramaerp0.png", alt: "1" },
      { type: "image", url: "public/projects/CRM/ramaerp1.png", alt: "1" },
      { type: "image", url: "public/projects/CRM/ramaerp2.png", alt: "1" },
      { type: "image", url: "public/projects/CRM/ramaerp3.png", alt: "1" },
      { type: "image", url: "public/projects/CRM/ramaerp4.png", alt: "1" },
      { type: "image", url: "public/projects/CRM/ramaerp5.png", alt: "1" },
      { type: "image", url: "public/projects/CRM/ramaerp6.png", alt: "1" },
      { type: "image", url: "public/projects/CRM/ramaerp7.png", alt: "1" },
      { type: "image", url: "public/projects/CRM/ramaerp8.png", alt: "1" },
      { type: "image", url: "public/projects/CRM/ramaerp9.png", alt: "1" },
      { type: "image", url: "public/projects/CRM/ramaerp10.png", alt: "1" },
      { type: "image", url: "public/projects/CRM/ramaerp11.png", alt: "1" },
      { type: "image", url: "public/projects/CRM/ramaerp12.png", alt: "1" },
      { type: "image", url: "public/projects/CRM/ramaerp13.png", alt: "1" },
    ],
  },
  {
    title: "PDF Editing Tool",
    description: "Comprehensive PDF manipulation application supporting document editing, annotation, form filling, signature integration, multi-page management, and export to various formats. Ideal for document processing and digital workflows.",
    category: "Web Tools",
    swipeInterval: 1550,
    media: [
      { type: "video", url: "public/projects/pdf/velo0.mp4", alt: "1" },
      { type: "image", url: "public/projects/pdf/velo1.png", alt: "2" },
      { type: "image", url: "public/projects/pdf/velo2.png", alt: "3" },
      { type: "image", url: "public/projects/pdf/velo3.png", alt: "4" },
      { type: "image", url: "public/projects/pdf/velo4.png", alt: "5" },
      { type: "image", url: "public/projects/pdf/velo5.png", alt: "6" },
      { type: "image", url: "public/projects/pdf/velo6.png", alt: "7" },
      { type: "image", url: "public/projects/pdf/velo7.png", alt: "8" },
      { type: "image", url: "public/projects/pdf/velo8.png", alt: "9" },
      { type: "image", url: "public/projects/pdf/velo9.png", alt: "10" },
      { type: "image", url: "public/projects/pdf/velo10.png", alt: "11" },
      { type: "image", url: "public/projects/pdf/velo11.png", alt: "12" },
    ],
  },
  {
    title: "Task Manager Pro",
    description: "Full-featured task management application with cross-platform support, real-time synchronization across devices, priority management, deadline tracking, collaborative features, subtask creation, and productivity analytics dashboard.",
    category: "Cross-Platform",
    swipeInterval: 1700,
    media: [
      { type: "image", url: "public/projects/Task Manager/rise3.png", alt: "Task app interface1" },
      { type: "image", url: "public/projects/Task Manager/rise4.png", alt: "Task app interface2" },
      { type: "image", url: "public/projects/Task Manager/rise5.png", alt: "Task app interface3" },
      { type: "image", url: "public/projects/Task Manager/rise6.png", alt: "Task app interface4" },
      { type: "image", url: "public/projects/Task Manager/risemng.png", alt: "Task app interface5" },
      { type: "image", url: "public/projects/Task Manager/rise1.png", alt: "Task app interface6" },
      { type: "image", url: "public/projects/Task Manager/rise2.png", alt: "Task app interface7" },
      { type: "image", url: "public/projects/Task Manager/rise0.png", alt: "Task app interface8" },
    ],
  },
];

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-10%" });
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right">("right");

  const currentMedia = project.media[currentMediaIndex];
  const swipeInterval = project.swipeInterval || 1500;

  // Auto-rotate media with different intervals per card
  useEffect(() => {
    // Don't auto-play if video is playing
    if (!isAutoPlay || isVideoPlaying) return;

    const interval = setInterval(() => {
      setSwipeDirection("right");
      setCurrentMediaIndex((prev) => (prev + 1) % project.media.length);
    }, swipeInterval);

    return () => clearInterval(interval);
  }, [isAutoPlay, swipeInterval, project.media.length, isVideoPlaying]);

  // Track video playback
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handlePlay = () => setIsVideoPlaying(true);
    const handlePause = () => setIsVideoPlaying(false);
    const handleEnded = () => setIsVideoPlaying(false);

    videoElement.addEventListener("play", handlePlay);
    videoElement.addEventListener("pause", handlePause);
    videoElement.addEventListener("ended", handleEnded);

    return () => {
      videoElement.removeEventListener("play", handlePlay);
      videoElement.removeEventListener("pause", handlePause);
      videoElement.removeEventListener("ended", handleEnded);
    };
  }, []);

  const handlePrevMedia = () => {
    setIsAutoPlay(false);
    setSwipeDirection("left");
    setCurrentMediaIndex((prev) =>
      prev === 0 ? project.media.length - 1 : prev - 1
    );
  };

  const handleNextMedia = () => {
    setIsAutoPlay(false);
    setSwipeDirection("right");
    setCurrentMediaIndex((prev) => (prev + 1) % project.media.length);
  };

  return (
    <motion.div
      ref={cardRef}
      className="group relative rounded-xl overflow-hidden border border-silver/10 hover:border-silver/20 transition-all duration-300"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ y: -8 }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-silver/5 via-transparent to-accent/5 pointer-events-none" />

      {/* Media Container */}
      <div className="relative w-full h-64 bg-background/50 overflow-hidden">
        <AnimatePresence mode="wait">
          {currentMedia.type === "image" ? (
            <motion.img
              key={currentMediaIndex}
              src={currentMedia.url}
              alt={currentMedia.alt}
              className="w-full h-full object-cover"
              initial={{ opacity: 0, x: swipeDirection === "right" ? 100 : -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: swipeDirection === "right" ? -100 : 100 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
          ) : (
            <motion.video
              key={currentMediaIndex}
              ref={videoRef}
              src={currentMedia.url}
              className="w-full h-full object-cover"
              autoPlay
              muted
              initial={{ opacity: 0, x: swipeDirection === "right" ? 100 : -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: swipeDirection === "right" ? -100 : 100 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
          )}
        </AnimatePresence>

        {/* Media Navigation Overlay */}
        <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
          <button
            onClick={handlePrevMedia}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all"
            aria-label="Previous media"
          >
            <ChevronLeft size={20} className="text-white" />
          </button>
          <button
            onClick={handleNextMedia}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all"
            aria-label="Next media"
          >
            <ChevronRight size={20} className="text-white" />
          </button>
        </div>

        {/* Media Counter */}
        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/40 text-xs text-white font-mono">
          {currentMediaIndex + 1} / {project.media.length}
        </div>

        {/* Auto-play indicator */}
        {isAutoPlay && !isVideoPlaying && (
          <div className="absolute bottom-4 left-4 flex items-center gap-2 text-xs text-white/70 font-mono">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Auto-playing
          </div>
        )}

        {/* Video Playing indicator */}
        {isVideoPlaying && (
          <div className="absolute bottom-4 left-4 flex items-center gap-2 text-xs text-blue-400 font-mono">
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            Playing Video
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="relative p-6 space-y-4">
        {/* Category Badge */}
        <motion.span
          className="inline-block text-xs tracking-[0.2em] uppercase text-accent/70 font-mono"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.1 + 0.2, duration: 0.6 }}
        >
          {project.category}
        </motion.span>

        {/* Title */}
        <motion.h3
          className="font-serif text-xl lg:text-2xl font-light text-foreground"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
        >
          {project.title}
        </motion.h3>

        {/* Description */}
        <motion.p
          className="text-sm text-muted-foreground/70 font-light leading-relaxed line-clamp-3"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.1 + 0.4, duration: 0.6 }}
        >
          {project.description}
        </motion.p>
      </div>
    </motion.div>
  );
};

const LuxuryProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-20 lg:py-28 overflow-hidden"
    >
      {/* Deep galaxy background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[hsl(235,30%,6%)] to-background" />

      {/* Floating code snippets */}
      <FloatingCode count={10} className="opacity-40" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.4, ease: [0.23, 1, 0.32, 1] }}
        >
          <motion.span
            className="text-xs tracking-[0.5em] uppercase text-muted-foreground/60 font-mono"
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={isInView ? { clipPath: "inset(0 0% 0 0)" } : {}}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          >
            Featured Projects
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
              My Projects
            </motion.span>
            <motion.span
              className="text-editorial block mt-2"
              initial={{ y: "100%", filter: "blur(12px)" }}
              animate={isInView ? { y: 0, filter: "blur(0px)" } : {}}
              transition={{ delay: 0.4, duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
            >
              Showcase
            </motion.span>
          </h2>
        </motion.div>

        {/* Projects Grid - 3 columns */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LuxuryProjectsSection;
