import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface OceanCanvasProps {
  className?: string;
  intensity?: 'calm' | 'medium' | 'dynamic';
  cursorX?: number;
  cursorY?: number;
}

const OceanCanvas = ({ className = '', cursorX = 0.5, cursorY = 0.5 }: OceanCanvasProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  
  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Realistic ocean video - using Pexels CDN which is reliable */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onCanPlayThrough={() => setVideoLoaded(true)}
        onLoadedData={() => setVideoLoaded(true)}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          filter: 'brightness(0.3) saturate(0.85) contrast(1.15) hue-rotate(-10deg)',
          transform: `scale(1.2) translate(${(cursorX - 0.5) * -20}px, ${(cursorY - 0.5) * -15}px)`,
          transition: 'transform 1s cubic-bezier(0.23, 1, 0.32, 1)',
          opacity: videoLoaded ? 1 : 0,
        }}
      >
        {/* High quality ocean videos from reliable CDNs */}
        <source 
          src="https://videos.pexels.com/video-files/1918465/1918465-uhd_2560_1440_24fps.mp4" 
          type="video/mp4" 
        />
        <source 
          src="https://videos.pexels.com/video-files/857195/857195-hd_1920_1080_25fps.mp4" 
          type="video/mp4" 
        />
      </video>

      {/* Beautiful animated fallback gradient while video loads */}
      <motion.div 
        className="absolute inset-0"
        initial={{ opacity: 1 }}
        animate={{ opacity: videoLoaded ? 0 : 1 }}
        transition={{ duration: 1.5 }}
      >
        {/* Animated ocean-like gradient */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'linear-gradient(180deg, hsl(220 45% 6%) 0%, hsl(205 55% 12%) 40%, hsl(200 50% 18%) 70%, hsl(210 45% 10%) 100%)',
              'linear-gradient(180deg, hsl(225 45% 7%) 0%, hsl(200 55% 14%) 40%, hsl(195 50% 16%) 70%, hsl(215 45% 11%) 100%)',
              'linear-gradient(180deg, hsl(220 45% 6%) 0%, hsl(205 55% 12%) 40%, hsl(200 50% 18%) 70%, hsl(210 45% 10%) 100%)',
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Animated wave patterns */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[200%] h-32"
            style={{
              top: `${30 + i * 12}%`,
              left: '-50%',
              background: `linear-gradient(90deg, 
                transparent 0%, 
                hsla(200, 60%, ${40 + i * 5}%, ${0.03 + i * 0.01}) 25%, 
                hsla(195, 70%, ${50 + i * 3}%, ${0.05 + i * 0.01}) 50%, 
                hsla(200, 60%, ${40 + i * 5}%, ${0.03 + i * 0.01}) 75%, 
                transparent 100%)`,
              borderRadius: '100%',
            }}
            animate={{
              x: ['-25%', '25%', '-25%'],
              scaleY: [1, 1.2, 1],
            }}
            transition={{
              duration: 6 + i * 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </motion.div>
      
      {/* Primary moonlight reflection - follows cursor */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: `radial-gradient(ellipse 35% 45% at ${cursorX * 100}% ${cursorY * 45 + 20}%, 
            hsla(195, 80%, 90%, 0.25) 0%, 
            hsla(205, 70%, 75%, 0.12) 25%,
            hsla(210, 60%, 60%, 0.05) 45%, 
            transparent 65%)`,
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />

      {/* Secondary reflection shimmer */}
      <motion.div 
        className="absolute inset-0 pointer-events-none mix-blend-overlay"
        animate={{
          background: `radial-gradient(ellipse 25% 35% at ${cursorX * 70 + 15}% ${cursorY * 35 + 30}%, 
            hsla(185, 90%, 85%, 0.15) 0%, 
            transparent 45%)`,
        }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      />
      
      {/* Animated horizontal light streaks on water */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px"
            style={{
              top: `${35 + i * 8}%`,
              left: 0,
              right: 0,
              background: `linear-gradient(90deg, 
                transparent 0%, 
                hsla(195, 80%, 85%, ${0.1 + (i % 3) * 0.05}) 20%,
                hsla(200, 85%, 90%, ${0.15 + (i % 2) * 0.08}) 50%,
                hsla(195, 80%, 85%, ${0.1 + (i % 3) * 0.05}) 80%,
                transparent 100%)`,
            }}
            animate={{
              x: ['-100%', '100%'],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              delay: i * 1.2,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Gentle sparkle particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${10 + (i * 17) % 80}%`,
              top: `${30 + (i * 13) % 50}%`,
              background: 'hsla(195, 100%, 90%, 0.8)',
              boxShadow: '0 0 6px 2px hsla(195, 100%, 85%, 0.4)',
            }}
            animate={{
              opacity: [0, 0.9, 0],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 3 + (i % 4),
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      
      {/* Cinematic color grade overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, 
            hsla(220, 50%, 5%, 0.75) 0%, 
            hsla(210, 40%, 8%, 0.25) 30%, 
            hsla(205, 45%, 12%, 0.2) 60%,
            hsla(215, 50%, 6%, 0.85) 100%)`,
        }}
      />

      {/* Subtle film grain texture */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 75% 75% at 50% 50%, transparent 25%, hsla(220, 45%, 4%, 0.7) 100%)',
        }}
      />
    </div>
  );
};

export default OceanCanvas;