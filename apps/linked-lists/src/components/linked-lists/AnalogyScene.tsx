"use client";

import React, { useEffect, useRef } from "react";
import { Mail, Map, Book } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ClueCard = ({ num, data, next, className = "", isNew = false }: any) => (
  <div className={`absolute -translate-x-1/2 -translate-y-1/2 w-36 md:w-48 bg-[#0d1117] border shadow-2xl rounded-xl p-3 md:p-4 z-20 flex flex-col gap-2 ${className} ${isNew ? 'border-green-500/50 shadow-[0_0_20px_rgba(74,222,128,0.2)]' : 'border-white/10'}`}>
    <div className={`font-semibold text-xs md:text-sm flex items-center gap-2 ${isNew ? 'text-green-400' : 'text-purple-400'}`}>
      <Mail className="w-4 h-4 md:w-5 md:h-5 shrink-0" />
      {isNew ? 'New Clue' : `Clue #${num}`}
    </div>
    <div className="bg-white/5 rounded p-1.5 md:p-2 text-[10px] md:text-xs font-mono text-white">
      <span className="text-white/50">Data:</span> {data}
    </div>
    <div className="bg-white/5 rounded p-1.5 md:p-2 text-[10px] md:text-xs font-mono text-pink-400">
      <span className="text-white/50">Next:</span> <span className={isNew ? 'text-green-400' : ''}>{next}</span>
    </div>
  </div>
);

const ArrowHead = ({ left, top, rotate, color = "text-purple-500", className = "" }: any) => (
  <div className={`absolute z-30 ${color} ${className}`} style={{ left, top, transform: `translate(-50%, -50%) rotate(${rotate}deg)` }}>
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="24,12 0,24 0,0"/>
    </svg>
  </div>
);

export default function AnalogyScene() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: gsap.Context;
    const timer = setTimeout(() => {
      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top top",
            end: "+=2500",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        });

        tl.to(".text-beat-1", { opacity: 0, y: -20, duration: 1 })
          .to(".text-beat-2", { opacity: 1, y: 0, duration: 1 }, "<")
          .to(".clue-1", { left: "20%", top: "20%", duration: 1, ease: "power2.inOut" }, "<")
          .to(".clue-rest", { opacity: 1, duration: 1 }, "<0.5")
          .to(".svg-arrows-1", { opacity: 1, duration: 1 }, "<")
          .to(".insight-card", { opacity: 1, y: 0, duration: 1 }, "<");

        tl.to(".text-beat-2", { opacity: 0, y: -20, duration: 1 })
          .to(".text-beat-3", { opacity: 1, y: 0, duration: 1 }, "<")
          .to(".insight-card", { opacity: 0, y: 20, duration: 1 }, "<")
          .to(".clue-new", { opacity: 1, scale: 1, duration: 0.5 }, "<")
          .to(".arrow-new", { opacity: 1, duration: 0.5 })
          .to(".arrow-2", { opacity: 0, duration: 0.5 }, "<")
          .to(".arrow-redirect", { opacity: 1, duration: 0.5 }, "<");

        tl.to(".text-beat-3", { opacity: 0, y: -20, duration: 1 })
          .to(".visual-container", { opacity: 0, scale: 0.9, duration: 1 }, "<")
          .to(".text-beat-4", { opacity: 1, y: 0, duration: 1 }, "<")
          .to(".comparison-panels", { opacity: 1, y: 0, duration: 1 }, "<");

      }, wrapperRef);
    }, 500);

    return () => {
      clearTimeout(timer);
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <div ref={wrapperRef} className="w-full h-screen bg-[#000000] relative overflow-hidden flex flex-col pt-24 md:pt-32 px-4 text-white">
      <div className="relative w-full max-w-3xl mx-auto h-24 md:h-32 text-center z-30 shrink-0">
        <p className="text-beat-1 absolute inset-0 text-base md:text-2xl font-light text-white opacity-100 px-4">
          A linked list is like a scavenger hunt. Each clue contains two things: some information, and directions to the next clue.
        </p>
        <p className="text-beat-2 absolute inset-0 text-base md:text-2xl font-light text-white opacity-0 translate-y-5 px-4">
          The clues aren't lined up neatly. They're scattered everywhere. But each one tells you exactly where the next one is.
        </p>
        <p className="text-beat-3 absolute inset-0 text-base md:text-2xl font-light text-white opacity-0 translate-y-5 px-4">
          To add a new clue, you don't move anything. Just change two sets of directions. Connect the new clue FIRST, then redirect the old one.
        </p>
        <p className="text-beat-4 absolute inset-0 text-base md:text-2xl font-light text-white opacity-0 translate-y-5 px-4">
          Arrays trade flexibility for speed. Linked lists trade access speed for flexibility.
        </p>
      </div>

      <div className="visual-container relative w-full flex-1 max-h-[60vh] max-w-5xl mx-auto z-10">
        {/* SVG Lines spanning center to center */}
        <div className="svg-arrows-1 absolute inset-0 opacity-0 z-0">
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <line x1="20%" y1="20%" x2="80%" y2="20%" stroke="#a855f7" strokeWidth="2" strokeDasharray="6,6" />
            <line className="arrow-2" x1="80%" y1="20%" x2="20%" y2="80%" stroke="#a855f7" strokeWidth="2" strokeDasharray="6,6" />
            <line x1="20%" y1="80%" x2="80%" y2="80%" stroke="#a855f7" strokeWidth="2" strokeDasharray="6,6" />
            
            <line className="arrow-new opacity-0" x1="50%" y1="50%" x2="20%" y2="80%" stroke="#4ade80" strokeWidth="2" strokeDasharray="6,6" />
            <line className="arrow-redirect opacity-0" x1="80%" y1="20%" x2="50%" y2="50%" stroke="#4ade80" strokeWidth="2" strokeDasharray="6,6" />
          </svg>

          {/* HTML Arrowheads placed at card borders */}
          <ArrowHead left="calc(80% - 90px)" top="20%" rotate={0} />
          <ArrowHead className="arrow-2" left="calc(20% + 50px)" top="calc(80% - 40px)" rotate={135} />
          <ArrowHead left="calc(80% - 90px)" top="80%" rotate={0} />
          
          <ArrowHead className="arrow-new opacity-0" color="text-green-400" left="calc(20% + 50px)" top="calc(80% - 40px)" rotate={135} />
          <ArrowHead className="arrow-redirect opacity-0" color="text-green-400" left="calc(50% + 50px)" top="calc(50% - 40px)" rotate={135} />
        </div>

        <div className="clue-1" style={{ position: 'absolute', left: '50%', top: '50%' }}>
          <ClueCard num={1} data="Start" next="Clue #2" />
        </div>
        
        <div className="clue-rest opacity-0">
          <div style={{ position: 'absolute', left: '80%', top: '20%' }}>
            <ClueCard num={2} data="B" next="Clue #3" />
          </div>
          <div style={{ position: 'absolute', left: '20%', top: '80%' }}>
            <ClueCard num={3} data="C" next="Clue #4" />
          </div>
          <div style={{ position: 'absolute', left: '80%', top: '80%' }}>
            <ClueCard num={4} data="D" next="null" />
          </div>
        </div>

        <div className="clue-new opacity-0" style={{ position: 'absolute', left: '50%', top: '50%', transform: 'scale(0.8)' }}>
          <ClueCard num={0} isNew data="X" next="Clue #3" />
        </div>
      </div>

      <div className="insight-card absolute bottom-12 left-1/2 -translate-x-1/2 opacity-0 translate-y-8 w-full max-w-[90%] md:max-w-lg bg-white/[0.05] backdrop-blur-xl border border-white/10 rounded-xl p-4 text-center text-sm md:text-base text-white/80 z-30 shadow-2xl">
        <span className="font-semibold text-white">Arrays</span> = numbered lockers in a row.<br />
        <span className="font-semibold text-purple-400">Linked Lists</span> = scattered clues connected by directions.
      </div>

      <div className="comparison-panels absolute inset-0 top-32 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 px-4 opacity-0 translate-y-8 z-40 pointer-events-none">
        <div className="w-full max-w-sm bg-[#0d1117] border border-white/10 rounded-2xl p-6 shadow-2xl pointer-events-auto">
          <div className="flex items-center gap-3 text-blue-400 mb-4">
            <Book className="w-6 h-6 shrink-0" />
            <h3 className="text-lg font-semibold text-white">Bookshelf (Array)</h3>
          </div>
          <ul className="space-y-3 text-sm text-white/70">
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
              <span>Jump instantly to any slot (O(1) access)</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
              <span>Inserting means pushing everything else over (O(n) insert)</span>
            </li>
          </ul>
        </div>
        
        <div className="w-full max-w-sm bg-[#0d1117] border border-white/10 rounded-2xl p-6 shadow-2xl pointer-events-auto">
          <div className="flex items-center gap-3 text-purple-400 mb-4">
            <Map className="w-6 h-6 shrink-0" />
            <h3 className="text-lg font-semibold text-white">Scavenger Hunt</h3>
          </div>
          <ul className="space-y-3 text-sm text-white/70">
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5 shrink-0" />
              <span>Adding is instant once you're there (O(1) insert)</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
              <span>Finding clue #5 means following 1→2→3→4→5 (O(n) access)</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
