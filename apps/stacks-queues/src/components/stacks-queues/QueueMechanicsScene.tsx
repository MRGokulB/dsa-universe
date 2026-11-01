"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RefreshCw, ArrowRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function QueueMechanicsScene() {
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

        tl.to(".queue-intro", { opacity: 0, y: -20, duration: 1 })
          .to(".queue-ring-stage", { opacity: 1, y: 0, duration: 1 }, "<")
          .to(".slot-rear", { scale: 1.1, borderColor: "rgba(6,182,212,1)", duration: 1 })
          .to(".modulo-badge", { opacity: 1, scale: 1.05, duration: 0.8 });

      }, containerRef);
    }, 400);

    return () => {
      clearTimeout(timer);
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-transparent">
      <div className="queue-intro absolute max-w-2xl text-center px-4">
        <span className="text-cyan-400 font-mono text-xs uppercase tracking-widest block mb-3">Chapter 03 &middot; High Performance Buffering</span>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Circular Queues &amp; Ring Buffers</h2>
        <p className="text-white/60 text-lg leading-relaxed">
          In a naive array, removing from index 0 forces every item to shift left in O(n) time. Ring buffers turn both enqueue and dequeue into pure O(1) operations.
        </p>
      </div>

      <div className="queue-ring-stage opacity-0 absolute w-full max-w-4xl px-4 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-mono uppercase mb-6">
          <RefreshCw size={14} /> Constant O(1) Time Guarantee
        </div>

        <h3 className="text-2xl md:text-3xl font-bold mb-3">Modulo Pointer Arithmetic</h3>
        <p className="text-sm text-white/50 max-w-lg mb-10">
          When the rear pointer reaches the end of allocated memory, it wraps seamlessly around to index 0. No memory moves. Only pointers advance.
        </p>

        <div className="grid grid-cols-4 md:grid-cols-6 gap-3 mb-8 w-full max-w-xl">
          {[
            { idx: 0, val: "P1", status: "Served" },
            { idx: 1, val: "P2", status: "Front", highlight: "border-cyan-400 bg-cyan-500/20 text-cyan-300" },
            { idx: 2, val: "P3", status: "Active" },
            { idx: 3, val: "P4", status: "Active" },
            { idx: 4, val: "P5", status: "Rear", highlight: "slot-rear border-emerald-400 bg-emerald-500/20 text-emerald-300" },
            { idx: 5, val: "—", status: "Empty" },
          ].map((item) => (
            <div
              key={item.idx}
              className={`p-3 rounded-2xl border transition-all ${
                item.highlight || "border-white/10 bg-white/5 text-white/60"
              }`}
            >
              <span className="text-[10px] font-mono text-white/30 block mb-1">[{item.idx}]</span>
              <span className="text-base font-bold font-mono block">{item.val}</span>
              <span className="text-[9px] font-mono uppercase tracking-wider opacity-70 mt-1 block">{item.status}</span>
            </div>
          ))}
        </div>

        <div className="modulo-badge opacity-0 inline-flex items-center gap-3 px-5 py-2.5 rounded-xl bg-black/60 border border-cyan-500/30 text-xs font-mono text-cyan-300 shadow-[0_0_25px_rgba(6,182,212,0.2)]">
          <span>tail = (tail + 1) % capacity</span>
          <ArrowRight size={14} />
          <span className="text-emerald-400 font-bold">Never shifts elements</span>
        </div>
      </div>
    </div>
  );
}
