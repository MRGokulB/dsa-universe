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
        <div className="ram-grid opacity-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex flex-col items-center">

          <div className="cpu-status opacity-0 flex items-center gap-4 mb-8 md:mb-12 bg-white/5 border border-white/10 px-4 md:px-6 py-2 md:py-3 rounded-full backdrop-blur-md">
            <Cpu className="text-blue-400 w-4 h-4 md:w-6 md:h-6" />
            <span className="text-xs md:text-sm text-white/80">Computer wants to find: <span className="text-blue-400 font-bold">arr[3]</span> (the 4th item)</span>
          </div>

          <div className="relative w-full max-w-full overflow-hidden flex justify-center">
            {/* The pointer arrow position needs to be calculated based on the block width.
                On desktop a block is w-20 (80px) + gap-4 (16px) = 96px. Center of 4th item (index 3).
                We will just place it statically and center the grid. */}
            <div className="flex gap-2 md:gap-4 px-4 overflow-x-auto pb-4 max-w-full snap-x justify-start md:justify-center">
              
              {/* Arrow relative to the wrapper */}
              <div className="pointer-arrow absolute -top-12 md:-top-16 left-1/2 transform -translate-x-1/2 flex flex-col items-center transition-transform">
                <span className="bg-blue-500 text-white text-[10px] md:text-xs px-2 py-1 rounded mb-1 md:mb-2 shadow-[0_0_15px_rgba(56,189,248,0.5)] whitespace-nowrap">Looking here</span>
                <div className="w-0.5 h-4 md:h-6 bg-gradient-to-b from-blue-500 to-transparent" />
              </div>

              {memoryBlocks.map((block, i) => (
                <div key={i} className="flex flex-col items-center gap-2 md:gap-3 shrink-0 snap-center">
                  <span className="font-mono text-[10px] md:text-xs text-white/40">Slot {block.address}</span>
                  <div className={`block-${i} w-16 h-20 md:w-20 md:h-24 rounded-lg border border-white/10 bg-white/5 flex flex-col items-center justify-center relative transition-colors`}>
                    <span className="text-white/20 text-[8px] md:text-[10px] absolute top-1 md:top-2 left-1.5 md:left-2">[{i}]</span>
                    <span className={`font-mono text-xs md:text-sm ${block.val === '42' ? 'text-blue-400 font-bold' : 'text-white/30'}`}>{block.val}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="math-hud opacity-0 translate-y-8 mt-8 md:mt-16 flex flex-col items-center gap-4 md:gap-6 px-4">
            <div className="bg-black/50 border border-blue-500/30 p-4 md:p-6 rounded-2xl backdrop-blur-xl shadow-2xl w-full max-w-md">
              <p className="text-white/50 text-xs md:text-sm mb-3 text-center">How does the computer jump straight to slot 3?</p>
              <div className="font-mono text-sm md:text-lg text-center space-y-2">
                <div className="hidden md:block"><span className="text-white/40">Target</span> = <span className="text-green-400">Start</span> + (<span className="text-yellow-400">Pos</span> × <span className="text-purple-400">Size</span>)</div>
                <div className="text-base md:text-xl border-t border-white/10 pt-2 md:mt-2">
                  <span className="text-white font-bold">112</span> = <span className="text-green-400">100</span> + (<span className="text-yellow-400">3</span> × <span className="text-purple-400">4</span>)
                </div>
              </div>
            </div>

            <div className="conclusion opacity-0 text-center max-w-2xl bg-white/5 border border-white/10 p-3 md:p-4 rounded-lg">
              <p className="text-green-400 text-sm md:text-base font-medium mb-1">Instant Lookup — No Scanning Needed</p>
              <p className="text-xs md:text-sm text-white/60">The computer doesn&apos;t check slots one by one. It does simple multiplication and jumps directly to the answer. Accessing any item is always equally fast.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
