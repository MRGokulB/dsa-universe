"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FolderTree, Folder, FileCode, CornerDownRight } from "lucide-react";

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

        tl.to(".tree-intro", { opacity: 0, y: -20, duration: 1 })
          .to(".tree-filesystem", { opacity: 1, y: 0, duration: 1 }, "<")
          .fromTo(".sub-branch-1", { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 1 })
          .fromTo(".sub-branch-2", { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 1 })
          .to(".leaf-node", { scale: 1.05, borderColor: "rgba(245,158,11,0.8)", duration: 0.8 });

      }, containerRef);
    }, 400);

    return () => {
      clearTimeout(timer);
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-transparent">
      <div className="tree-intro absolute max-w-2xl text-center px-4">
        <span className="text-amber-400 font-mono text-xs uppercase tracking-widest block mb-3">Chapter 01 &middot; The Metaphor</span>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">The File System Tree</h2>
        <p className="text-white/60 text-lg leading-relaxed">
          You already interact with tree data structures every single day. Your computer's file system is a giant hierarchical tree.
        </p>
      </div>

      <div className="tree-filesystem opacity-0 absolute w-full max-w-3xl px-4 flex flex-col items-center text-center">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-mono uppercase mb-6">
          <FolderTree size={14} /> One Root &middot; Multiple Child Branches
        </div>

        <h3 className="text-2xl md:text-3xl font-bold mb-2">Root Directory &rarr; Subdirectories &rarr; Leaf Files</h3>
        <p className="text-sm text-white/50 max-w-md mb-8">
          The root directory has no parent. Subfolders branch downward. Files at the bottom with no children are called leaves.
        </p>

        <div className="flex flex-col items-center gap-6 w-full max-w-md p-6 rounded-3xl border border-white/10 bg-white/[0.02]">
          <div className="px-5 py-2.5 rounded-2xl bg-amber-500/20 border border-amber-400/50 text-amber-300 font-mono text-xs font-bold flex items-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
            <Folder size={14} /> / (Root Node)
          </div>

          <div className="w-px h-6 bg-gradient-to-b from-amber-400/50 to-white/20" />

          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="sub-branch-1 p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center gap-3">
              <span className="text-xs font-mono text-white/70 flex items-center gap-1.5">
                <Folder size={13} className="text-amber-400" /> /src (Subtree)
              </span>
              <div className="leaf-node w-full py-2 rounded-xl bg-white/5 border border-white/10 text-[11px] font-mono text-white/50 flex items-center justify-center gap-1">
                <FileCode size={12} className="text-emerald-400" /> App.tsx (Leaf)
              </div>
            </div>

            <div className="sub-branch-2 p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center gap-3">
              <span className="text-xs font-mono text-white/70 flex items-center gap-1.5">
                <Folder size={13} className="text-amber-400" /> /public (Subtree)
              </span>
              <div className="w-full py-2 rounded-xl bg-white/5 border border-white/10 text-[11px] font-mono text-white/50 flex items-center justify-center gap-1">
                <FileCode size={12} className="text-cyan-400" /> logo.svg (Leaf)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
