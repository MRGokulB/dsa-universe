"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Layers, Users, ArrowDown, ArrowRight } from "lucide-react";

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

        tl.to(".analogy-intro", { opacity: 0, y: -20, duration: 1 })
          .to(".analogy-stack-stage", { opacity: 1, y: 0, duration: 1 }, "<")
          .fromTo(".plate-3", { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 1 })
          .to(".plate-peek", { scale: 1.05, borderColor: "rgba(16,185,129,0.8)", duration: 0.8 });

        tl.to(".analogy-stack-stage", { opacity: 0, y: -20, duration: 1 })
          .to(".analogy-queue-stage", { opacity: 1, y: 0, duration: 1 }, "<")
          .fromTo(".customer-new", { x: 80, opacity: 0 }, { x: 0, opacity: 1, duration: 1 })
          .to(".customer-first", { x: -80, opacity: 0, duration: 1 });

      }, containerRef);
    }, 400);

    return () => {
      clearTimeout(timer);
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-transparent">
      <div className="analogy-intro absolute max-w-2xl text-center px-4">
        <span className="text-emerald-400 font-mono text-xs uppercase tracking-widest block mb-3">Chapter 01 &middot; The Metaphors</span>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">LIFO vs FIFO</h2>
        <p className="text-white/60 text-lg leading-relaxed">
          Two everyday physical concepts define how programs buffer, schedule, and unwind data.
        </p>
      </div>

      <div className="analogy-stack-stage opacity-0 absolute flex flex-col items-center max-w-3xl px-4 text-center">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono uppercase mb-4">
          <Layers size={14} /> Stack &middot; Last-In First-Out
        </div>
        <h3 className="text-2xl md:text-3xl font-bold mb-2">The Spring-Loaded Plate Stack</h3>
        <p className="text-sm text-white/50 max-w-md mb-8">
          You place plates on top. When someone takes one, they take from the top. The first plate loaded sits at the bottom until everything above is cleared.
        </p>

        <div className="w-56 h-64 border-b-4 border-l-2 border-r-2 border-white/20 rounded-b-2xl p-4 flex flex-col-reverse items-center gap-3 bg-white/[0.02]">
          <div className="w-full py-3 rounded-xl bg-white/10 border border-white/20 text-xs font-mono text-white/50 flex items-center justify-center">
            Plate #1 &middot; Base
          </div>
          <div className="w-full py-3 rounded-xl bg-white/10 border border-white/20 text-xs font-mono text-white/60 flex items-center justify-center">
            Plate #2
          </div>
          <div className="plate-3 plate-peek w-full py-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-xs font-mono text-emerald-300 font-bold flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.2)]">
            Plate #3 &middot; Top
          </div>
        </div>
        <span className="text-xs text-emerald-400/80 font-mono mt-4 flex items-center gap-1">
          <ArrowDown size={14} /> Push adds to Top &middot; Pop removes from Top
        </span>
      </div>

      <div className="analogy-queue-stage opacity-0 absolute flex flex-col items-center max-w-3xl px-4 text-center">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-mono uppercase mb-4">
          <Users size={14} /> Queue &middot; First-In First-Out
        </div>
        <h3 className="text-2xl md:text-3xl font-bold mb-2">The Fair Ticket Line</h3>
        <p className="text-sm text-white/50 max-w-md mb-8">
          First person in line buys their ticket first. New arrivals stand at the rear. Order is strictly preserved with no line jumping.
        </p>

        <div className="flex items-center gap-3 p-4 rounded-2xl border border-white/10 bg-white/[0.02]">
          <div className="customer-first px-4 py-3 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-bold flex items-center gap-2">
            Front &middot; User 1
          </div>
          <ArrowRight size={14} className="text-white/20" />
          <div className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white/60 font-mono text-xs">
            User 2
          </div>
          <ArrowRight size={14} className="text-white/20" />
          <div className="customer-new px-4 py-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-bold">
            Rear &middot; User 3 (New)
          </div>
        </div>
        <span className="text-xs text-cyan-400/80 font-mono mt-4 flex items-center gap-1">
          Enqueue adds at Rear &middot; Dequeue serves from Front
        </span>
      </div>
    </div>
  );
}
