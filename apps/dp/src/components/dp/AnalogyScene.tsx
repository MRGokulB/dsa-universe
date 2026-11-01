"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, Brain, Plus } from "lucide-react";

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

        tl.to(".dp-intro", { opacity: 0, y: -20, duration: 1 })
          .to(".dp-analogy-box", { opacity: 1, y: 0, duration: 1 }, "<")
          .to(".equation-base", { scale: 1.05, duration: 0.8 })
          .to(".equation-plus-one", { opacity: 1, x: 0, duration: 0.8 })
          .to(".cached-badge", { opacity: 1, scale: 1.1, duration: 0.8 })
          .to(".dp-punchline", { opacity: 1, y: 0, duration: 0.8 });

      }, containerRef);
    }, 400);

    return () => {
      clearTimeout(timer);
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-transparent">
      <div className="dp-intro absolute max-w-2xl text-center px-4">
        <span className="text-purple-400 font-mono text-xs uppercase tracking-widest block mb-3">
          Chapter 01 &middot; The Metaphor
        </span>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Remembering the Past</h2>
        <p className="text-white/60 text-lg leading-relaxed">
          Dynamic Programming isn't complex math—it is the art of never calculating the exact same thing twice.
        </p>
      </div>

      <div className="dp-analogy-box opacity-0 absolute w-full max-w-3xl px-4 flex flex-col items-center text-center">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-xs font-mono uppercase mb-6">
          <Brain size={14} /> The 1 + 1 + 1 Principle
        </div>

        <h3 className="text-2xl md:text-3xl font-bold mb-3">What is 1 + 1 + 1 + 1 + 1?</h3>
        <p className="text-sm text-white/50 max-w-md mb-8">
          You count 5 ones and answer: <span className="text-purple-300 font-mono font-bold">5</span>.
        </p>

        <div className="flex flex-col items-center gap-6 w-full max-w-md p-8 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl">
          <div className="equation-base flex items-center gap-2 text-2xl font-mono font-bold text-white/90">
            <span>1 + 1 + 1 + 1 + 1</span>
            <span className="text-purple-400">=</span>
            <span className="px-3 py-1 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-300">5</span>
          </div>

          <div className="equation-plus-one opacity-0 translate-x-4 flex items-center gap-2 text-xl font-mono text-white/80">
            <span className="text-fuchsia-400 flex items-center gap-1"><Plus size={16} /> 1</span>
            <span className="text-white/40">&rarr;</span>
            <span className="text-white font-bold">What is it now?</span>
          </div>

          <div className="cached-badge opacity-0 px-4 py-2 rounded-2xl bg-fuchsia-500/20 border border-fuchsia-400/50 text-fuchsia-300 font-mono text-sm font-bold shadow-[0_0_20px_rgba(217,70,239,0.3)]">
            Instant answer: 6!
          </div>

          <div className="dp-punchline opacity-0 translate-y-2 text-xs font-sans text-white/60 leading-relaxed text-center">
            You didn't count all 6 ones from zero. You simply took the <strong className="text-purple-300">cached result (5)</strong> and added 1. That is Dynamic Programming.
          </div>
        </div>
      </div>
    </div>
  );
}
