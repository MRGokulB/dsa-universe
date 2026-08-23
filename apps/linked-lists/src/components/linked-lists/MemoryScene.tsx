"use client";

import React, { useEffect, useRef } from "react";
import { Cpu } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from 'framer-motion'

export default function MemoryScene() {
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: 'top top',
            end: '+=2500',
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          }
        })

        // Beat 1: Intro arrays
        tl.to('.text-beat-1', { opacity: 0, y: -20, duration: 1 })
          .to('.text-beat-2', { opacity: 1, y: 0, duration: 1 }, '<')
          
          // Scatter nodes
          .to('.node-extra', { opacity: 0, scale: 0.5, duration: 0.5, stagger: 0.05 }, '<')
          .to('.node-1', { x: 100, y: -60, duration: 1 }, '<')
          .to('.node-2', { x: 300, y: -60, duration: 1 }, '<')
          .to('.node-3', { x: -100, y: 150, duration: 1 }, '<')
          .to('.node-4', { x: 350, y: 150, duration: 1 }, '<')
          .to('.node-5', { x: 100, y: 300, duration: 1 }, '<')
          
          // Hide decimal, show hex
          .to('.address-dec', { opacity: 0, duration: 0.5 }, '<0.5')
          .to('.address-hex', { opacity: 1, duration: 0.5 }, '<')

        // Beat 2: Zoom on node 1
        tl.to('.text-beat-2', { opacity: 0, y: -20, duration: 1 })
          .to('.text-beat-3', { opacity: 1, y: 0, duration: 1 }, '<')
          .to('.node-1', { x: 300, y: 100, scale: 2, duration: 1, ease: 'power2.inOut' }, '<')
          .to('.node-other', { opacity: 0.2, duration: 1 }, '<')
          .to('.node-next-compartment', { opacity: 1, x: 0, width: 60, duration: 0.5 }, '<0.5')
          .to('.callout-card', { opacity: 1, y: 0, duration: 0.5 })

        // Beat 3: Trace pointers
        tl.to('.text-beat-3', { opacity: 0, y: -20, duration: 1 })
          .to('.callout-card', { opacity: 0, y: -20, duration: 1 }, '<')
          .to('.text-beat-4', { opacity: 1, y: 0, duration: 1 }, '<')
          .to('.node-1', { x: 100, y: -60, scale: 1, duration: 1, ease: 'power2.inOut' }, '<')
          .to('.node-other', { opacity: 1, duration: 1 }, '<')
          
          // Show links
          .to('.svg-lines', { opacity: 1, duration: 1 }, '<0.5')
          .to('.head-label', { opacity: 1, y: 0, duration: 0.5 })
          .to('.cpu-status', { opacity: 1, y: 0, duration: 0.5 }, '<')

        // Pointer traversal
        tl.to('.traversal-cursor', { x: 100, y: -60, opacity: 1, duration: 0.5 })
          .to('.traversal-cursor', { x: 300, y: -60, duration: 1 })
          .to('.traversal-cursor', { x: -100, y: 150, duration: 1 })
          .to('.traversal-cursor', { x: 350, y: 150, duration: 1 })

      }, wrapperRef)
      return () => ctx.revert()
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div ref={wrapperRef} className="w-full h-screen bg-transparent relative overflow-hidden text-white flex flex-col pt-24 md:pt-32 px-4">
      <div className="relative w-full max-w-3xl mx-auto h-24 md:h-32 text-center z-30 shrink-0">
        <p className="text-beat-1 absolute inset-0 text-base md:text-2xl font-light text-white opacity-100">
          Remember: arrays live in a tidy row of consecutive memory addresses.
        </p>
        <p className="text-beat-2 absolute inset-0 text-base md:text-2xl font-light text-white opacity-0 translate-y-5">
          Linked list nodes can live ANYWHERE in memory. They don't need to be next to each other.
        </p>
        <p className="text-beat-3 absolute inset-0 text-base md:text-2xl font-light text-white opacity-0 translate-y-5">
          Each node carries two things: its data, and the memory address of the next node. That address IS the pointer.
        </p>
        <p className="text-beat-4 absolute inset-0 text-base md:text-2xl font-light text-white opacity-0 translate-y-5">
          To find the 4th node, you must hop through 1, 2, 3 first. No shortcut. That's why access is O(n).
        </p>
      </div>

      <div className="callout-card absolute top-32 md:top-48 left-1/2 -translate-x-1/2 opacity-0 translate-y-5 bg-[#0d1117] border border-white/10 p-3 md:p-4 rounded-lg backdrop-blur-xl z-50 text-white/80 font-mono text-xs md:text-sm max-w-[90%] md:max-w-md text-center flex flex-col items-center gap-2 shadow-2xl">
        A pointer is just a number - a memory address. It's not magic.
      </div>

      <div className="cpu-status absolute bottom-24 md:bottom-12 left-1/2 -translate-x-1/2 opacity-0 translate-y-5 bg-[#0d1117] border border-white/10 p-2 md:p-3 rounded-full backdrop-blur-xl z-50 flex items-center gap-2 md:gap-3 shadow-2xl">
        <Cpu className="w-4 h-4 md:w-5 md:h-5 text-blue-400 shrink-0" />
        <span className="font-mono text-xs md:text-sm text-white/80">
          0x2A4 → 0x7F0 → 0x110 → 0xBC8 → null
        </span>
      </div>

      {/* HARDWARE SVG VIZ */}
      <div className="visual-container relative w-full flex-1 max-h-[60vh] max-w-5xl mx-auto z-20 flex justify-center items-center">
        <div className="w-full aspect-[21/9] relative bg-[#0a0a0a] rounded-3xl border border-white/5 p-4 flex flex-col overflow-hidden shadow-2xl">
          <svg viewBox="0 0 1000 400" className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id="heapPcb" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#0a0f1a" />
                <stop offset="100%" stopColor="#111827" />
              </linearGradient>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <rect width="20" height="20" fill="none" stroke="#ffffff" strokeOpacity="0.03" />
              </pattern>
              <marker id="arrow-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6" />
              </marker>
            </defs>

            <rect width="1000" height="400" fill="url(#grid)" rx="20" />

            <g transform="translate(100, 50)">
              <rect x="0" y="0" width="800" height="300" rx="12" fill="url(#heapPcb)" stroke="#1e293b" strokeWidth="2" />
              <text x="400" y="-15" fill="#60a5fa" fontSize="14" fontWeight="bold" textAnchor="middle" letterSpacing="2">HEAP STORAGE (SCATTERED ALLOCATION)</text>

              {/* Connecting Lines */}
              <g className="svg-lines opacity-0">
                <path d="M 180 -25 L 300 -25" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 4" markerEnd="url(#arrow-blue)" />
                <path d="M 380 -25 L -20 185" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 4" markerEnd="url(#arrow-blue)" />
                <path d="M 60 185 L 350 185" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 4" markerEnd="url(#arrow-blue)" />
              </g>

              {/* Cursor */}
              <circle className="traversal-cursor opacity-0" cx="140" cy="-25" r="30" fill="none" stroke="#fbbf24" strokeWidth="4" />

              {/* Node 1 */}
              <g className="node-1" transform="translate(10, 120)">
                <rect x="0" y="0" width="80" height="70" rx="4" fill="#0f0f0f" stroke="#3b82f6" strokeWidth="2" />
                <text x="40" y="25" fill="#444" fontSize="10" fontFamily="monospace" textAnchor="middle" className="address-dec">100</text>
                <text x="40" y="25" fill="#60a5fa" fontSize="10" fontFamily="monospace" textAnchor="middle" className="address-hex opacity-0">0x2A4</text>
                <text x="40" y="55" fill="#fff" fontSize="18" fontWeight="bold" fontFamily="monospace" textAnchor="middle">42</text>
                <g className="node-next-compartment opacity-0" transform="translate(80, 0)">
                  <rect x="0" y="0" width="60" height="70" rx="4" fill="#3b82f620" stroke="#3b82f6" strokeWidth="2" />
                  <text x="30" y="25" fill="#60a5fa" fontSize="10" fontFamily="monospace" textAnchor="middle">Next</text>
                  <text x="30" y="45" fill="#fff" fontSize="12" fontFamily="monospace" textAnchor="middle">0x7F0</text>
                </g>
              </g>

              {/* Node 2 */}
              <g className="node-2 node-other" transform="translate(110, 120)">
                <rect x="0" y="0" width="80" height="70" rx="4" fill="#0f0f0f" stroke="#3b82f6" strokeWidth="2" />
                <text x="40" y="25" fill="#444" fontSize="10" fontFamily="monospace" textAnchor="middle" className="address-dec">104</text>
                <text x="40" y="25" fill="#60a5fa" fontSize="10" fontFamily="monospace" textAnchor="middle" className="address-hex opacity-0">0x7F0</text>
                <text x="40" y="55" fill="#fff" fontSize="18" fontWeight="bold" fontFamily="monospace" textAnchor="middle">17</text>
                <g className="node-next-compartment opacity-0" transform="translate(80, 0)">
                  <rect x="0" y="0" width="60" height="70" rx="4" fill="#3b82f620" stroke="#3b82f6" strokeWidth="2" />
                  <text x="30" y="45" fill="#fff" fontSize="12" fontFamily="monospace" textAnchor="middle">0x110</text>
                </g>
              </g>

              {/* Node 3 */}
              <g className="node-3 node-other" transform="translate(210, 120)">
                <rect x="0" y="0" width="80" height="70" rx="4" fill="#0f0f0f" stroke="#3b82f6" strokeWidth="2" />
                <text x="40" y="25" fill="#444" fontSize="10" fontFamily="monospace" textAnchor="middle" className="address-dec">108</text>
                <text x="40" y="25" fill="#60a5fa" fontSize="10" fontFamily="monospace" textAnchor="middle" className="address-hex opacity-0">0x110</text>
                <text x="40" y="55" fill="#fff" fontSize="18" fontWeight="bold" fontFamily="monospace" textAnchor="middle">99</text>
                <g className="node-next-compartment opacity-0" transform="translate(80, 0)">
                  <rect x="0" y="0" width="60" height="70" rx="4" fill="#3b82f620" stroke="#3b82f6" strokeWidth="2" />
                  <text x="30" y="45" fill="#fff" fontSize="12" fontFamily="monospace" textAnchor="middle">0xBC8</text>
                </g>
              </g>

              {/* Node 4 */}
              <g className="node-4 node-other" transform="translate(310, 120)">
                <rect x="0" y="0" width="80" height="70" rx="4" fill="#0f0f0f" stroke="#3b82f6" strokeWidth="2" />
                <text x="40" y="25" fill="#444" fontSize="10" fontFamily="monospace" textAnchor="middle" className="address-dec">112</text>
                <text x="40" y="25" fill="#60a5fa" fontSize="10" fontFamily="monospace" textAnchor="middle" className="address-hex opacity-0">0xBC8</text>
                <text x="40" y="55" fill="#fff" fontSize="18" fontWeight="bold" fontFamily="monospace" textAnchor="middle">3</text>
                <g className="node-next-compartment opacity-0" transform="translate(80, 0)">
                  <rect x="0" y="0" width="60" height="70" rx="4" fill="#3b82f620" stroke="#3b82f6" strokeWidth="2" />
                  <text x="30" y="45" fill="#fff" fontSize="12" fontFamily="monospace" textAnchor="middle">null</text>
                </g>
              </g>

              {/* Extra Nodes to delete later */}
              <g className="node-extra" transform="translate(410, 120)">
                <rect x="0" y="0" width="80" height="70" rx="4" fill="#0f0f0f" stroke="#222" strokeWidth="2" />
                <text x="40" y="25" fill="#444" fontSize="10" fontFamily="monospace" textAnchor="middle" className="address-dec">116</text>
              </g>
              <g className="node-extra" transform="translate(510, 120)">
                <rect x="0" y="0" width="80" height="70" rx="4" fill="#0f0f0f" stroke="#222" strokeWidth="2" />
                <text x="40" y="25" fill="#444" fontSize="10" fontFamily="monospace" textAnchor="middle" className="address-dec">120</text>
              </g>
              <g className="node-extra" transform="translate(610, 120)">
                <rect x="0" y="0" width="80" height="70" rx="4" fill="#0f0f0f" stroke="#222" strokeWidth="2" />
                <text x="40" y="25" fill="#444" fontSize="10" fontFamily="monospace" textAnchor="middle" className="address-dec">124</text>
              </g>

            </g>
          </svg>
        </div>
      </div>
    </div>
  )
}
