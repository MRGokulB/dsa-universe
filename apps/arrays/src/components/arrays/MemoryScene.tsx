"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Cpu } from "lucide-react";

export function MemoryScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: "#memory-pin-wrapper",
            start: "top top",
            end: "+=2500",
            scrub: 1,
            pin: true,
            anticipatePin: 1
          }
        });

        // Step 1: Text fade out, Explainer fade in
        tl.to(".intro-text", { opacity: 0, y: -20, duration: 1 })
          .fromTo(".address-explainer", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 2 });

        // Step 2: Explainer fade out, RAM SVG fade in
        tl.to(".address-explainer", { opacity: 0, y: -20, duration: 1 })
          .fromTo(".ram-svg-wrapper", { opacity: 0, scale: 0.9, y: 50 }, { opacity: 1, scale: 1, y: 0, duration: 2 });

        // Step 3: Math and CPU jump
        tl.to(".cpu-status", { opacity: 1, duration: 0.5 })
          .to(".pointer-arrow", { x: 3 * 100, duration: 2, ease: "power2.inOut" }) // 3 slots over
          .to(".slot-3-highlight", { opacity: 1, duration: 0.5 })
          .to(".math-hud", { opacity: 1, y: 0, duration: 1 })
          .to(".conclusion", { opacity: 1, duration: 1 });

      }, containerRef);
      return () => ctx.revert();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div ref={containerRef} className="w-full relative bg-transparent text-white font-sans">
      <div id="memory-pin-wrapper" className="h-[100dvh] w-full flex flex-col items-center justify-center relative overflow-hidden">
        
        {/* Step 1: Intro */}
        <div className="intro-text absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl text-center px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Where Does Your Data Actually Live?</h2>
          <p className="text-xl text-white/60">When you create an array, your computer reserves a row of numbered slots in its memory (RAM). These slots sit right next to each other — no gaps.</p>
        </div>

        {/* Step 2: Address Explainer */}
        <div className="address-explainer opacity-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl text-center px-4">
          <h3 className="text-3xl font-bold mb-6">Every Slot Has a Number</h3>
          <p className="text-lg text-white/60 mb-8">Just like houses on a street have addresses, every memory slot has a unique number. The computer uses these numbers to find your data instantly.</p>
        </div>

        {/* Step 3: Hardware RAM Vis */}
        <div className="ram-svg-wrapper opacity-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex flex-col items-center max-w-6xl">
          
          <div className="cpu-status opacity-0 flex items-center gap-4 mb-4 bg-white/5 border border-white/10 px-6 py-3 rounded-full backdrop-blur-md z-10">
            <Cpu className="text-blue-400 w-6 h-6" />
            <span className="text-sm text-white/80">Computer wants to find: <span className="text-blue-400 font-bold">arr[3]</span> (the 4th item)</span>
          </div>

          <div className="w-full aspect-[21/9] relative bg-[#0a0a0a] rounded-3xl border border-white/5 p-4 flex flex-col overflow-hidden shadow-2xl">
            <svg viewBox="0 0 1000 400" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="pcb" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#081008" />
                  <stop offset="100%" stopColor="#111c11" />
                </linearGradient>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <rect width="20" height="20" fill="none" stroke="#ffffff" strokeOpacity="0.03" />
                </pattern>
                <marker id="arrow-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6" />
                </marker>
              </defs>

              <rect width="1000" height="400" fill="url(#grid)" rx="20" />

              {/* HORIZONTAL RAM STICK */}
              <g transform="translate(50, 150)">
                <rect x="0" y="0" width="900" height="120" rx="6" fill="url(#pcb)" stroke="#1a2f1a" strokeWidth="2" />
                <path d="M 0 110 L 900 110 L 900 120 L 0 120 Z" fill="#b48600" />
                <rect x="0" y="110" width="900" height="10" fill="none" stroke="#cca42b" strokeWidth="1" strokeDasharray="4 2" />
                <rect x="400" y="110" width="10" height="10" fill="#050505" />
                
                <text x="450" y="-15" fill="#4ade80" fontSize="14" fontWeight="bold" textAnchor="middle" letterSpacing="2">PHYSICAL RAM (CONTIGUOUS ARRAY ALLOCATION)</text>
                
                {/* 8 Array Slots */}
                {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <g key={i} transform={`translate(${i * 100 + 50}, 20)`}>
                    <rect x="0" y="0" width="80" height="70" rx="4" fill="#0f0f0f" stroke="#222" strokeWidth="2" />
                    <text x="40" y="25" fill="#444" fontSize="10" fontFamily="monospace" textAnchor="middle">{100 + i*4}</text>
                    <text x="40" y="55" fill={i === 3 ? "#3b82f6" : "#666"} fontSize="18" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                      {i === 3 ? "42" : "—"}
                    </text>
                    <text x="40" y="-5" fill="#666" fontSize="10" fontFamily="monospace" textAnchor="middle">[{i}]</text>
                    
                    {/* Highlight for slot 3 */}
                    {i === 3 && (
                      <rect className="slot-3-highlight" opacity="0" x="-4" y="-4" width="88" height="78" rx="6" fill="#3b82f620" stroke="#3b82f6" strokeWidth="2" />
                    )}
                  </g>
                ))}

                {/* Animated CPU Pointer */}
                <g className="pointer-arrow" transform="translate(90, -70)">
                  <rect x="-40" y="0" width="80" height="30" rx="4" fill="#3b82f6" />
                  <text x="0" y="20" fill="#fff" fontSize="14" fontWeight="bold" textAnchor="middle">arr[i]</text>
                  <path d="M 0 30 L 0 70" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow-blue)" />
                </g>
              </g>

            </svg>
          </div>

          <div className="math-hud opacity-0 translate-y-8 mt-8 flex flex-col items-center gap-4 w-full px-4 z-10">
            <div className="bg-black/50 border border-blue-500/30 p-6 rounded-2xl backdrop-blur-xl shadow-2xl w-full max-w-md">
              <p className="text-white/50 text-sm mb-3 text-center">How does the computer jump straight to slot 3?</p>
              <div className="font-mono text-lg text-center space-y-2">
                <div><span className="text-white/40">Target</span> = <span className="text-green-400">Start</span> + (<span className="text-yellow-400">Pos</span> × <span className="text-purple-400">Size</span>)</div>
                <div className="text-xl border-t border-white/10 pt-2 mt-2">
                  <span className="text-white font-bold">112</span> = <span className="text-green-400">100</span> + (<span className="text-yellow-400">3</span> × <span className="text-purple-400">4</span>)
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
