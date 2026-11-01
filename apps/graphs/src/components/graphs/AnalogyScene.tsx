"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plane, Globe2, ArrowRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AnalogyScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: gsap.Context;
    const timer = setTimeout(() => {
      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=2200",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        });

        tl.to(".graph-intro", { opacity: 0, y: -20, duration: 1 })
          .to(".flight-network", { opacity: 1, y: 0, duration: 1 }, "<")
          .fromTo(".flight-jfk", { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8 })
          .fromTo(".flight-lhr", { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8 })
          .fromTo(".flight-hnd", { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8 })
          .fromTo(".flight-dxb", { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8 })
          .to(".network-path", { strokeDashoffset: 0, opacity: 1, duration: 1.2 })
          .to(".network-summary", { opacity: 1, y: 0, duration: 0.8 });

      }, containerRef);
    }, 400);

    return () => {
      clearTimeout(timer);
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-transparent">
      <div className="graph-intro absolute max-w-2xl text-center px-4">
        <span className="text-emerald-400 font-mono text-xs uppercase tracking-widest block mb-3">
          Chapter 01 &middot; The Metaphor
        </span>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">The Global Flight Web</h2>
        <p className="text-white/60 text-lg leading-relaxed">
          Unlike trees where every child has exactly one parent, real-world relationships form arbitrary webs of connections.
        </p>
      </div>

      <div className="flight-network opacity-0 absolute w-full max-w-4xl px-4 flex flex-col items-center text-center">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono uppercase mb-4">
          <Globe2 size={14} /> Vertices (Airports) &middot; Edges (Flight Routes)
        </div>

        <h3 className="text-2xl md:text-3xl font-bold mb-2">No Single Root. Cyclic Pathways.</h3>
        <p className="text-sm text-white/50 max-w-md mb-8">
          You can fly JFK &rarr; LHR &rarr; DXB &rarr; JFK in a cycle. Trees forbid cycles; graphs embrace them.
        </p>

        <div className="relative w-full max-w-lg h-64 p-6 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 240">
            <line x1="80" y1="120" x2="200" y2="50" stroke="rgba(16,185,129,0.4)" strokeWidth="2" strokeDasharray="4 4" className="network-path opacity-40" />
            <line x1="200" y1="50" x2="320" y2="120" stroke="rgba(16,185,129,0.4)" strokeWidth="2" strokeDasharray="4 4" className="network-path opacity-40" />
            <line x1="320" y1="120" x2="200" y2="190" stroke="rgba(16,185,129,0.4)" strokeWidth="2" strokeDasharray="4 4" className="network-path opacity-40" />
            <line x1="200" y1="190" x2="80" y2="120" stroke="rgba(16,185,129,0.4)" strokeWidth="2" strokeDasharray="4 4" className="network-path opacity-40" />
            <line x1="80" y1="120" x2="320" y2="120" stroke="rgba(56,189,248,0.3)" strokeWidth="1.5" strokeDasharray="2 2" className="network-path opacity-40" />
          </svg>

          <div className="flight-jfk absolute left-8 top-1/2 -translate-y-1/2 flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-400 text-emerald-300 font-mono font-bold text-xs flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              JFK
            </div>
            <span className="text-[10px] text-white/50 font-mono mt-1">New York</span>
          </div>

          <div className="flight-lhr absolute top-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 border border-cyan-400 text-cyan-300 font-mono font-bold text-xs flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.3)]">
              LHR
            </div>
            <span className="text-[10px] text-white/50 font-mono mt-1">London</span>
          </div>

          <div className="flight-hnd absolute right-8 top-1/2 -translate-y-1/2 flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-400 text-emerald-300 font-mono font-bold text-xs flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              HND
            </div>
            <span className="text-[10px] text-white/50 font-mono mt-1">Tokyo</span>
          </div>

          <div className="flight-dxb absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-teal-500/20 border border-teal-400 text-teal-300 font-mono font-bold text-xs flex items-center justify-center shadow-[0_0_20px_rgba(20,184,166,0.3)]">
              DXB
            </div>
            <span className="text-[10px] text-white/50 font-mono mt-1">Dubai</span>
          </div>
        </div>

        <div className="network-summary opacity-0 mt-6 flex items-center gap-4 text-xs font-mono text-white/60">
          <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10">Vertices |V| = 4</span>
          <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10">Edges |E| = 5</span>
          <span className="px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Connected Graph</span>
        </div>
      </div>
    </div>
  );
}
