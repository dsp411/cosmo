import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hide default cursor on body
    document.body.style.cursor = 'none';
    
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };
    
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.body.style.cursor = 'auto';
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div 
      ref={cursorRef} 
      className="w-5 h-5 bg-white/40 rounded-full fixed pointer-events-none -translate-x-1/2 -translate-y-1/2 z-[9999]"
    ></div>
  );
}
