"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Terminal, Cpu, ArrowUpRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function StackMechanicsScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: gsap.Context;
    const timer = setTimeout(() => {
      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=2400",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        });

        tl.to(".callstack-intro", { opacity: 0, y: -20, duration: 1 })
          .to(".callstack-visual", { opacity: 1, y: 0, duration: 1 }, "<")
          .fromTo(".frame-main", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 })
          .fromTo(".frame-auth", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 })
          .fromTo(".frame-fetch", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 })
          .to(".frame-fetch", { scale: 1.05, borderColor: "rgba(52,211,153,0.8)", duration: 0.8 })
          .to(".callstack-pointer", { y: -120, duration: 1.5 }, "<");

      }, containerRef);
    }, 400);

    return () => {
      clearTimeout(timer);
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-transparent">
      <div className="callstack-intro absolute max-w-2xl text-center px-4">
        <span className="text-emerald-400 font-mono text-xs uppercase tracking-widest block mb-3">Chapter 02 &middot; Runtime Architecture</span>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">The Engine Call Stack</h2>
        <p className="text-white/60 text-lg leading-relaxed">
          Every time your code invokes a function, your CPU pushes a stack frame containing local variables and return addresses.
        </p>
      </div>

      <div className="callstack-visual opacity-0 absolute w-full max-w-4xl px-4 flex flex-col md:flex-row items-center justify-center gap-8">
        <div className="w-full md:w-1/2 p-6 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl">
          <div className="flex items-center gap-2 mb-4 text-xs font-mono text-white/50">
            <Terminal size={14} className="text-emerald-400" />
            <span>call_stack.ts</span>
          </div>
          <pre className="text-xs md:text-sm font-mono text-white/80 leading-relaxed bg-black/40 p-4 rounded-2xl border border-white/5">
            <span className="text-purple-400">function</span> <span className="text-emerald-400">fetchData</span>() &#123;<br />
            &nbsp;&nbsp;<span className="text-white/40">// active stack frame</span><br />
            &nbsp;&nbsp;<span className="text-purple-400">return</span> response;<br />
            &#125;<br /><br />
            <span className="text-purple-400">function</span> <span className="text-emerald-400">authenticate</span>() &#123;<br />
            &nbsp;&nbsp;fetchData();<br />
            &#125;<br /><br />
            <span className="text-purple-400">function</span> <span className="text-emerald-400">main</span>() &#123;<br />
            &nbsp;&nbsp;authenticate();<br />
            &#125;
          </pre>
        </div>

        <div className="w-full md:w-1/2 flex flex-col items-center">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-4">
            <Cpu size={14} /> RAM Frame Allocation (LIFO)
          </div>

          <div className="relative w-64 flex flex-col-reverse gap-3 p-4 border-2 border-emerald-500/20 rounded-2xl bg-black/50">
            <div className="frame-main p-3 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-center text-white/60">
              <span className="text-[10px] text-white/30 block">0x7FFF0010</span>
              main() [return 0]
            </div>

            <div className="frame-auth p-3 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-center text-white/70">
              <span className="text-[10px] text-white/30 block">0x7FFF0024</span>
              authenticate()
            </div>

            <div className="frame-fetch p-3 rounded-xl bg-emerald-500/20 border border-emerald-400/50 text-xs font-mono text-center text-emerald-300 font-bold shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <span className="text-[10px] text-emerald-400/70 block">0x7FFF0038 &middot; TOP</span>
              fetchData()
            </div>

            <div className="callstack-pointer absolute -right-24 top-6 flex items-center gap-2 text-emerald-400 text-xs font-mono">
              <ArrowUpRight size={16} /> Stack Pointer (ESP)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
