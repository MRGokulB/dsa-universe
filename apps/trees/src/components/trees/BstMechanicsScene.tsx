"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GitBranch, Search, ArrowDownLeft, ArrowDownRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function BstMechanicsScene() {
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

        tl.to(".bst-intro", { opacity: 0, y: -20, duration: 1 })
          .to(".bst-canvas", { opacity: 1, y: 0, duration: 1 }, "<")
          .to(".node-root", { borderColor: "rgba(245,158,11,1)", scale: 1.1, duration: 1 })
          .to(".node-25", { borderColor: "rgba(245,158,11,1)", scale: 1.1, duration: 1 })
          .to(".node-35", { borderColor: "rgba(34,197,94,1)", backgroundColor: "rgba(34,197,94,0.2)", scale: 1.15, duration: 1 })
          .to(".lookup-badge", { opacity: 1, scale: 1.05, duration: 0.8 });

      }, containerRef);
    }, 400);

    return () => {
      clearTimeout(timer);
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-transparent">
      <div className="bst-intro absolute max-w-2xl text-center px-4">
        <span className="text-amber-400 font-mono text-xs uppercase tracking-widest block mb-3">Chapter 02 &middot; The Invariant</span>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Binary Search Trees (BST)</h2>
        <p className="text-white/60 text-lg leading-relaxed">
          Every node enforces a strict law: everything in its left subtree is smaller, and everything in its right subtree is larger.
        </p>
      </div>

      <div className="bst-canvas opacity-0 absolute w-full max-w-4xl px-4 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-mono uppercase mb-4">
          <GitBranch size={14} /> Left &lt; Root &lt; Right
        </div>

        <h3 className="text-2xl md:text-3xl font-bold mb-2">Searching for Target Value: 35</h3>
        <p className="text-sm text-white/50 max-w-lg mb-8">
          Compare with root 50 (35 &lt; 50 &rarr; go left). Compare with 25 (35 &gt; 25 &rarr; go right). Target located in 3 steps!
        </p>

        <div className="relative w-full max-w-md flex flex-col items-center gap-6 p-6 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl">
          <div className="node-root w-14 h-14 rounded-2xl border-2 border-white/20 bg-white/5 flex items-center justify-center font-mono font-bold text-sm text-white">
            50
          </div>

          <div className="grid grid-cols-2 gap-16 w-full">
            <div className="flex flex-col items-center gap-4">
              <div className="node-25 w-12 h-12 rounded-xl border-2 border-white/20 bg-white/5 flex items-center justify-center font-mono font-bold text-xs text-white">
                25
              </div>
              <div className="node-35 w-12 h-12 rounded-xl border-2 border-white/20 bg-white/5 flex items-center justify-center font-mono font-bold text-xs text-white">
                35
              </div>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 rounded-xl border-2 border-white/10 bg-white/5 flex items-center justify-center font-mono text-xs text-white/40">
                75
              </div>
              <div className="w-12 h-12 rounded-xl border-2 border-white/10 bg-white/5 flex items-center justify-center font-mono text-xs text-white/40">
                90
              </div>
            </div>
          </div>

          <div className="lookup-badge opacity-0 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 text-xs font-mono">
            <Search size={14} /> O(log n) Halving Each Level &middot; Found in 3 hops
          </div>
        </div>
      </div>
    </div>
  );
}
