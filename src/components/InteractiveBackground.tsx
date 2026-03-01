import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
export default function InteractiveBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-gradient-to-br from-black via-[#1a0a00] to-[#4a1c00]">
      {/* Background Shapes */}
      <motion.div
        className="absolute top-[10%] left-[10%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] bg-[#ff6a00]/10 rounded-full blur-[100px]"
        animate={{
          x: mousePosition.x * 0.05,
          y: mousePosition.y * 0.05,
        }}
        transition={{ type: 'spring', damping: 50, stiffness: 400 }}
      />
      <motion.div
        className="absolute bottom-[10%] right-[10%] w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] bg-[#ff8533]/5 rounded-full blur-[120px]"
        animate={{
          x: mousePosition.x * -0.03,
          y: mousePosition.y * -0.03,
        }}
        transition={{ type: 'spring', damping: 50, stiffness: 400 }}
      />
      <motion.div
        className="absolute top-[40%] left-[40%] w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] bg-[#ff6a00]/15 rounded-full blur-[80px]"
        animate={{
          x: mousePosition.x * 0.08,
          y: mousePosition.y * 0.08,
        }}
        transition={{ type: 'spring', damping: 50, stiffness: 400 }}
      />

      {/* Subtle Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
    </div>
  );
}
