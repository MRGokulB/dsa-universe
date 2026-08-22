"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Book, Map } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AnalogyScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);
  const text4Ref = useRef<HTMLDivElement>(null);

  const visualContainerRef = useRef<HTMLDivElement>(null);

  const beat1Ref = useRef<HTMLDivElement>(null);
  const beat2Ref = useRef<HTMLDivElement>(null);
  const beat2InsightRef = useRef<HTMLDivElement>(null);
  const beat3Ref = useRef<HTMLDivElement>(null);
  const beat4Ref = useRef<HTMLDivElement>(null);

  const svgRef = useRef<SVGSVGElement>(null);
  const arrow1Ref = useRef<SVGLineElement>(null);
  const arrow2Ref = useRef<SVGLineElement>(null);
  const arrow3Ref = useRef<SVGLineElement>(null);
  const newArrowRef = useRef<SVGLineElement>(null);
  const arrow2RedirectRef = useRef<SVGLineElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const container = containerRef.current;
      if (!container) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=1800",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to(beat1Ref.current, { opacity: 0, scale: 0.9, duration: 1 })
        .to(text1Ref.current, { opacity: 0, y: -20, duration: 1 }, "<")
        .to(text2Ref.current, { opacity: 1, y: 0, duration: 1 })
        .to(beat2Ref.current, { opacity: 1, duration: 1 }, "<")
        .to(svgRef.current, { opacity: 1, duration: 0.1 }, "<")
        .fromTo(arrow1Ref.current, { strokeDasharray: 300, strokeDashoffset: 300 }, { strokeDashoffset: 0, duration: 1 })
        .fromTo(arrow2Ref.current, { strokeDasharray: 300, strokeDashoffset: 300 }, { strokeDashoffset: 0, duration: 1 })
        .fromTo(arrow3Ref.current, { strokeDasharray: 300, strokeDashoffset: 300 }, { strokeDashoffset: 0, duration: 1 })
        .to(beat2InsightRef.current, { opacity: 1, y: 0, duration: 1 })
        .to(text2Ref.current, { opacity: 0, y: -20, duration: 1 })
        .to(beat2InsightRef.current, { opacity: 0, duration: 1 }, "<")
        .to(text3Ref.current, { opacity: 1, y: 0, duration: 1 })
        .to(beat3Ref.current, { opacity: 1, scale: 1, duration: 1 }, "<")
        .fromTo(newArrowRef.current, { strokeDasharray: 300, strokeDashoffset: 300 }, { strokeDashoffset: 0, duration: 1 })
        .to(arrow2Ref.current, { opacity: 0, duration: 0.5 })
        .fromTo(arrow2RedirectRef.current, { strokeDasharray: 300, strokeDashoffset: 300 }, { strokeDashoffset: 0, opacity: 1, duration: 1 })
        .to(beat2Ref.current, { opacity: 0, duration: 1 })
        .to(beat3Ref.current, { opacity: 0, duration: 1 }, "<")
        .to(svgRef.current, { opacity: 0, duration: 1 }, "<")
        .to(text3Ref.current, { opacity: 0, y: -20, duration: 1 }, "<")
        .to(text4Ref.current, { opacity: 1, y: 0, duration: 1 })
        .to(beat4Ref.current, { opacity: 1, y: 0, duration: 1 }, "<");

      return () => {
        tl.kill();
        ScrollTrigger.getAll().forEach((st) => st.kill());
      };
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div ref={containerRef} className="h-screen w-full bg-transparent overflow-hidden">
      <div className="absolute inset-0 max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div ref={textContainerRef} className="grid [grid-template-areas:'stack'] max-w-2xl mx-auto text-center mb-16 h-32">
          <div ref={text1Ref} className="[grid-area:stack] opacity-100 transform translate-y-0 text-white text-xl md:text-2xl font-medium">
            A linked list is like a scavenger hunt. Each clue contains two things: some information, and directions to the next clue.
          </div>
          <div ref={text2Ref} className="[grid-area:stack] opacity-0 transform translate-y-8 text-white text-xl md:text-2xl font-medium">
            The clues aren't lined up neatly. They're scattered everywhere. But each one tells you exactly where the next one is.
          </div>
          <div ref={text3Ref} className="[grid-area:stack] opacity-0 transform translate-y-8 text-white text-xl md:text-2xl font-medium">
            To add a new clue, you don't move anything. Just change two sets of directions. Connect the new clue FIRST, then redirect the old one.
          </div>
          <div ref={text4Ref} className="[grid-area:stack] opacity-0 transform translate-y-8 text-white text-xl md:text-2xl font-medium">
            Arrays trade flexibility for speed. Linked lists trade access speed for flexibility.
          </div>
        </div>

        <div ref={visualContainerRef} className="relative w-full h-[600px] max-w-4xl mx-auto">
          <div ref={beat1Ref} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center gap-3 text-purple-400 mb-4">
              <Mail className="w-6 h-6" />
              <span className="font-semibold text-lg">Clue #1</span>
            </div>
            <div className="space-y-4">
              <div className="bg-[#0d1117] rounded-lg p-3 border border-white/5">
                <span className="text-white/50 text-sm block mb-1">Data:</span>
                <span className="text-white font-mono">Start here</span>
              </div>
              <div className="bg-[#0d1117] rounded-lg p-3 border border-white/5">
                <span className="text-white/50 text-sm block mb-1">Next:</span>
                <span className="text-pink-400 font-mono text-sm">Park Bench #7</span>
              </div>
            </div>
          </div>

          <svg ref={svgRef} className="absolute inset-0 w-full h-full opacity-0 pointer-events-none z-0">
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#c084fc" />
              </marker>
              <marker id="arrowhead-green" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#4ade80" />
              </marker>
            </defs>
            <line ref={arrow1Ref} x1="280" y1="100" x2="620" y2="180" stroke="#c084fc" strokeWidth="2" strokeDasharray="6,6" markerEnd="url(#arrowhead)" />
            <line ref={arrow2Ref} x1="720" y1="260" x2="280" y2="420" stroke="#c084fc" strokeWidth="2" strokeDasharray="6,6" markerEnd="url(#arrowhead)" />
            <line ref={arrow3Ref} x1="280" y1="460" x2="620" y2="480" stroke="#c084fc" strokeWidth="2" strokeDasharray="6,6" markerEnd="url(#arrowhead)" />
            <line ref={newArrowRef} x1="450" y1="360" x2="280" y2="420" stroke="#4ade80" strokeWidth="2" strokeDasharray="6,6" markerEnd="url(#arrowhead-green)" />
            <line ref={arrow2RedirectRef} opacity="0" x1="720" y1="260" x2="450" y2="360" stroke="#4ade80" strokeWidth="2" strokeDasharray="6,6" markerEnd="url(#arrowhead-green)" />
          </svg>

          <div ref={beat2Ref} className="absolute inset-0 opacity-0 z-10">
            <div className="absolute left-[80px] top-[40px] w-48 bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl p-4">
              <div className="text-purple-400 font-semibold mb-2">Clue #1</div>
              <div className="bg-[#0d1117] rounded p-2 text-xs font-mono text-white mb-2">Data: A</div>
              <div className="bg-[#0d1117] rounded p-2 text-xs font-mono text-pink-400">Next: Clue #2</div>
            </div>
            
            <div className="absolute left-[640px] top-[140px] w-48 bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl p-4">
              <div className="text-purple-400 font-semibold mb-2">Clue #2</div>
              <div className="bg-[#0d1117] rounded p-2 text-xs font-mono text-white mb-2">Data: B</div>
              <div className="bg-[#0d1117] rounded p-2 text-xs font-mono text-pink-400">Next: Clue #3</div>
            </div>
            
            <div className="absolute left-[80px] top-[380px] w-48 bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl p-4">
              <div className="text-purple-400 font-semibold mb-2">Clue #3</div>
              <div className="bg-[#0d1117] rounded p-2 text-xs font-mono text-white mb-2">Data: C</div>
              <div className="bg-[#0d1117] rounded p-2 text-xs font-mono text-pink-400">Next: Clue #4</div>
            </div>

            <div className="absolute left-[640px] top-[440px] w-48 bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl p-4">
              <div className="text-purple-400 font-semibold mb-2">Clue #4</div>
              <div className="bg-[#0d1117] rounded p-2 text-xs font-mono text-white mb-2">Data: D</div>
              <div className="bg-[#0d1117] rounded p-2 text-xs font-mono text-pink-400">Next: null</div>
            </div>

            <div ref={beat2InsightRef} className="absolute left-1/2 bottom-0 -translate-x-1/2 opacity-0 transform translate-y-8 w-full max-w-lg bg-white/[0.05] backdrop-blur-xl border border-white/10 rounded-xl p-6 text-center text-white/80">
              <span className="font-semibold text-white">Arrays</span> = numbered lockers in a row.<br />
              <span className="font-semibold text-purple-400">Linked Lists</span> = scattered clues connected by directions.
            </div>
          </div>

          <div ref={beat3Ref} className="absolute left-[350px] top-[260px] w-48 bg-green-500/[0.05] backdrop-blur-xl border border-green-500/30 rounded-xl p-4 opacity-0 z-20 shadow-[0_0_30px_rgba(74,222,128,0.2)]">
            <div className="text-green-400 font-semibold mb-2">New Clue</div>
            <div className="bg-[#0d1117] rounded p-2 text-xs font-mono text-white mb-2">Data: X</div>
            <div className="bg-[#0d1117] rounded p-2 text-xs font-mono text-green-400">Next: Clue #3</div>
          </div>

          <div ref={beat4Ref} className="absolute inset-0 opacity-0 transform flex gap-8 z-30">
            <div className="flex-1 bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8 h-fit">
              <div className="flex items-center gap-3 text-blue-400 mb-6">
                <Book className="w-8 h-8" />
                <h3 className="text-xl font-semibold text-white">Bookshelf (Array)</h3>
              </div>
              <ul className="space-y-4 text-white/70">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0" />
                  <span>Jump instantly to any slot (O(1) access)</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                  <span>Inserting means pushing everything else over (O(n) insert)</span>
                </li>
              </ul>
            </div>
            
            <div className="flex-1 bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8 h-fit">
              <div className="flex items-center gap-3 text-purple-400 mb-6">
                <Map className="w-8 h-8" />
                <h3 className="text-xl font-semibold text-white">Scavenger Hunt (Linked List)</h3>
              </div>
              <ul className="space-y-4 text-white/70">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 shrink-0" />
                  <span>Adding is instant once you're there (O(1) insert)</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                  <span>Finding clue #5 means following 1→2→3→4→5 (O(n) access)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
