"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Cpu } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function MemoryScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#memory-pin-wrapper",
          start: "top top",
          end: "+=3000",
          scrub: 1,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1
        }
      });

      tl.to(".intro-text", { opacity: 0, y: -20, duration: 1 })
        .fromTo(".address-explainer",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 2 }
        );

      tl.to(".address-explainer", { opacity: 0, y: -20, duration: 1 })
        .fromTo(".ram-grid",
          { opacity: 0, scale: 0.9, y: 50 },
          { opacity: 1, scale: 1, y: 0, duration: 2 }
        );

      tl.to(".cpu-status", { opacity: 1, duration: 0.5 })
        .to(".pointer-arrow", { x: 3 * (80 + 16), duration: 2, ease: "power2.inOut" })
        .to(".block-3", { backgroundColor: "rgba(56, 189, 248, 0.3)", borderColor: "rgba(56, 189, 248, 1)", scale: 1.1, duration: 0.5 });

      tl.to(".math-hud", { opacity: 1, y: 0, duration: 1 })
        .to(".conclusion", { opacity: 1, duration: 1 });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const memoryBlocks = Array.from({ length: 8 }).map((_, i) => ({
    address: 100 + (i * 4),
    index: i,
    val: i === 3 ? "42" : "—"
  }));

  return (
    <div ref={containerRef} className="w-full relative bg-[#09090b]">
      <div id="memory-pin-wrapper" className="h-[100dvh] w-full flex flex-col items-center justify-center relative overflow-hidden">

        {/* Step 1: Plain English Intro */}
        <div className="intro-text absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl text-center px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Where Does Your Data Actually Live?</h2>
          <p className="text-xl text-white/60">When you create an array, your computer reserves a row of numbered slots in its memory (RAM). These slots sit right next to each other — no gaps.</p>
        </div>

        {/* Step 2: Address Explainer */}
        <div className="address-explainer opacity-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl text-center px-4">
          <h3 className="text-3xl font-bold mb-6">Every Slot Has a Number</h3>
          <p className="text-lg text-white/60 mb-8">Just like houses on a street have addresses (101, 102, 103...), every memory slot has a unique number. The computer uses these numbers to find your data instantly.</p>
          <div className="flex justify-center gap-3">
            {["Slot 100", "Slot 104", "Slot 108", "Slot 112"].map((label, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="w-20 h-16 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center">
                  <span className="text-white/30 font-mono text-sm">{i === 0 ? "\"Hi\"" : "..."}</span>
                </div>
                <span className="text-xs text-blue-400 font-mono">{label}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-white/40 mt-6">Each slot is 4 numbers apart because each piece of data takes up 4 bytes of space.</p>
        </div>

        {/* Step 3: RAM Visualization */}
        <div className="ram-grid opacity-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl flex flex-col items-center">

          <div className="cpu-status opacity-0 flex items-center gap-4 mb-12 bg-white/5 border border-white/10 px-6 py-3 rounded-full backdrop-blur-md">
            <Cpu className="text-blue-400" />
            <span className="text-sm text-white/80">Computer wants to find: <span className="text-blue-400 font-bold">arr[3]</span> (the 4th item)</span>
          </div>

          <div className="relative w-full flex justify-center">
            <div className="pointer-arrow absolute -top-16 left-[calc(50%-336px)] flex flex-col items-center transform transition-transform">
              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded mb-2 shadow-[0_0_15px_rgba(56,189,248,0.5)]">Looking here</span>
              <div className="w-0.5 h-6 bg-gradient-to-b from-blue-500 to-transparent" />
            </div>

            <div className="flex gap-4">
              {memoryBlocks.map((block, i) => (
                <div key={i} className="flex flex-col items-center gap-3">
                  <span className="font-mono text-xs text-white/40">Slot {block.address}</span>
                  <div className={`block-${i} w-20 h-24 rounded-lg border border-white/10 bg-white/5 flex flex-col items-center justify-center relative transition-colors`}>
                    <span className="text-white/20 text-[10px] absolute top-2 left-2">[{i}]</span>
                    <span className={`font-mono text-sm ${block.val === '42' ? 'text-blue-400 font-bold' : 'text-white/30'}`}>{block.val}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="math-hud opacity-0 translate-y-8 mt-16 flex flex-col items-center gap-6">
            <div className="bg-black/50 border border-blue-500/30 p-6 rounded-2xl backdrop-blur-xl shadow-2xl">
              <p className="text-white/50 text-sm mb-3 text-center">How does the computer jump straight to slot 3?</p>
              <div className="font-mono text-lg text-center space-y-2">
                <div><span className="text-white/40">Target Slot</span> = <span className="text-green-400">Starting Slot</span> + (<span className="text-yellow-400">Position</span> × <span className="text-purple-400">Slot Size</span>)</div>
                <div className="text-xl border-t border-white/10 pt-2 mt-2">
                  <span className="text-white font-bold">Slot 112</span> = <span className="text-green-400">100</span> + (<span className="text-yellow-400">3</span> × <span className="text-purple-400">4</span>)
                </div>
              </div>
            </div>

            <div className="conclusion opacity-0 text-center max-w-2xl bg-white/5 border border-white/10 p-4 rounded-lg">
              <p className="text-green-400 font-medium mb-1">Instant Lookup — No Scanning Needed</p>
              <p className="text-sm text-white/60">The computer doesn&apos;t check slots one by one. It does simple multiplication and jumps directly to the answer. This is why accessing any item in an array is always equally fast, no matter how big the array is.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
