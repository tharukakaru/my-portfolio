import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const codeSnippets = [
  'const ai = await model.generate()',
  'async function deploy() {}',
  'import { neural } from "core"',
  '// Building intelligent systems',
  'return <Component {...props} />',
  'type Result = Promise<T>',
  'export default Agent',
  'await train(dataset)',
  'const [state, setState] = useState()',
  'git push origin main',
  'npm run build',
  'docker compose up -d',
  'SELECT * FROM users',
  'fetch("/api/data")',
  'useEffect(() => {}, [])',
  'interface Props { }',
  'export const handler = async () =>',
  'const response = await fetch()',
  'className="flex items-center"',
  'onClick={() => handleClick()}',
  '.reduce((acc, val) => acc + val)',
  'const { data } = useQuery()',
  'try { await exec() } catch {}',
];

interface FloatingCodeProps {
  count?: number;
  className?: string;
}

const FloatingCode = ({ count = 8, className = '' }: FloatingCodeProps) => {
  const [fragments, setFragments] = useState<Array<{
    id: number;
    text: string;
    x: number;
    y: number;
    size: number;
    delay: number;
    duration: number;
    opacity: number;
    direction: 'up' | 'down' | 'left' | 'right';
  }>>([]);

  useEffect(() => {
    const directions: Array<'up' | 'down' | 'left' | 'right'> = ['up', 'down', 'left', 'right'];
    setFragments(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        text: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
        x: Math.random() * 90 + 5,
        y: Math.random() * 85 + 5,
        size: Math.random() * 3 + 9,
        delay: Math.random() * 8,
        duration: Math.random() * 12 + 18,
        opacity: Math.random() * 0.15 + 0.08,
        direction: directions[Math.floor(Math.random() * directions.length)],
      }))
    );
  }, [count]);

  const getAnimation = (direction: string) => {
    switch (direction) {
      case 'up':
        return { y: [-20, -80, -140] };
      case 'down':
        return { y: [20, 80, 140] };
      case 'left':
        return { x: [20, -40, -100] };
      case 'right':
        return { x: [-20, 40, 100] };
      default:
        return { y: [-20, -80, -140] };
    }
  };

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {fragments.map((fragment) => (
        <motion.div
          key={fragment.id}
          className="absolute font-mono text-accent/30 whitespace-nowrap select-none"
          style={{
            left: `${fragment.x}%`,
            top: `${fragment.y}%`,
            fontSize: `${fragment.size}px`,
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, fragment.opacity, fragment.opacity, 0],
            ...getAnimation(fragment.direction),
          }}
          transition={{
            duration: fragment.duration,
            delay: fragment.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <span className="text-silver/20">{`{`}</span>
          <span className="text-accent/25">{fragment.text}</span>
          <span className="text-silver/20">{`}`}</span>
        </motion.div>
      ))}
      
      {/* Typing cursor effects */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`cursor-${i}`}
          className="absolute w-2 h-4 bg-accent/30"
          style={{
            left: `${20 + i * 30}%`,
            top: `${30 + i * 20}%`,
          }}
          animate={{
            opacity: [0, 0.4, 0],
            scaleY: [1, 1.2, 1],
          }}
          transition={{
            duration: 0.8,
            delay: i * 2.5,
            repeat: Infinity,
            repeatDelay: 5,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingCode;
