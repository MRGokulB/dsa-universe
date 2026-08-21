"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Parallax effect on scroll
    gsap.to(containerRef.current, {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <div ref={containerRef} className="h-screen w-full flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(50,50,250,0.1)_0,transparent_100%)] pointer-events-none" />
      
      <div className="z-10 text-center max-w-4xl px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-blue-400 font-mono mb-4 tracking-widest uppercase text-xs md:text-sm">Module 01</p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-tight">
            Arrays <br/>
            <span className="text-white/40 font-light">The Foundation</span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-2xl mx-auto px-4">
            A contiguous block of memory to store collections of data. Everything in computer science builds upon this simple concept. Let&apos;s see how it actually works.
          </p>
        </motion.div>
        
        <motion.div 
          className="mt-16 text-white/30 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <span className="text-sm tracking-widest uppercase mb-4">Scroll to explore</span>
          <div className="w-px h-16 bg-gradient-to-b from-white/30 to-transparent" />
        </motion.div>
      </div>

      {/* Floating abstract elements in background */}
      <div className="absolute inset-0 perspective-[1000px] pointer-events-none">
        <motion.div 
          initial={{ rotateX: 60, rotateZ: -45, y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 0.2 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 grid grid-cols-8 grid-rows-8"
        >
          {Array.from({ length: 64 }).map((_, i) => (
            <div key={i} className="border border-white/5" />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
